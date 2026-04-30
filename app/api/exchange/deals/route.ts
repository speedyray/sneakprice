// Live arbitrage deals for the /exchange execution feed. Reads active rows
// from the Deal table (populated by the scan-deals cron via lib/deal-pipeline)
// and optionally filters by SPX index via a name-pattern map.
//
// `?index=SPX-JORDAN` filters the result to deals whose `sneaker` name matches
// the index's pattern. Without `index`, returns all active deals.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const INDEX_PATTERNS: Record<string, RegExp> = {
  "SPX-JORDAN": /AJ\d|Jordan/i,
  "SPX-YEEZY": /Yeezy/i,
  "SPX-NIKE": /Air Force|Air Max|Dunk|^Nike\b/i,
  "SPX-DUNK": /Dunk/i,
  "SPX-LUX": /Travis|Off-?White|Balenciaga/i,
};

const TAKE_DEFAULT = 30;
const TAKE_MAX = 100;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const indexSymbol = searchParams.get("index");
  const takeParam = searchParams.get("take");
  const take = takeParam
    ? Math.min(TAKE_MAX, Math.max(1, parseInt(takeParam, 10) || TAKE_DEFAULT))
    : TAKE_DEFAULT;

  const pattern = indexSymbol ? INDEX_PATTERNS[indexSymbol] : null;

  // Fetch a generous slice of active, scored deals, then apply the index
  // pattern in JS — Prisma can't run a JS regex, and the population is small
  // enough that filtering in Node is cheaper than juggling raw SQL.
  const rows = await prisma.deal.findMany({
    where: {
      isActive: true,
      sellPrice: { not: null },
      buyPrice: { not: null },
    },
    orderBy: [{ dealScore: "desc" }, { created_at: "desc" }],
    take: pattern ? TAKE_MAX : take,
    select: {
      id: true,
      sneaker: true,
      brand: true,
      buyPlatform: true,
      buyPrice: true,
      buyUrl: true,
      sellPlatform: true,
      sellPrice: true,
      sellUrl: true,
      netProfit: true,
      profitMargin: true,
      dealScore: true,
      dealLabel: true,
      created_at: true,
      updatedAt: true,
    },
  });

  const filtered = pattern
    ? rows.filter((r) => (r.sneaker ? pattern.test(r.sneaker) : false))
    : rows;

  const items = filtered.slice(0, take).map((r) => ({
    id: r.id,
    title: r.sneaker ?? "Unknown",
    brand: r.brand,
    buyPlatform: r.buyPlatform,
    buyPrice: r.buyPrice,
    buyUrl: r.buyUrl,
    sellPlatform: r.sellPlatform,
    sellPrice: r.sellPrice,
    sellUrl: r.sellUrl,
    netProfit: r.netProfit,
    profitMargin: r.profitMargin,
    dealScore: r.dealScore,
    dealLabel: r.dealLabel,
    detectedAt: r.created_at,
    updatedAt: r.updatedAt,
  }));

  return NextResponse.json({
    index: indexSymbol ?? null,
    count: items.length,
    deals: items,
  });
}
