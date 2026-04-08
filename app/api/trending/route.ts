// app/api/trending/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function demandLabel(count: number): string {
  if (count >= 5) return "Hot";
  if (count >= 3) return "High Demand";
  if (count === 2) return "Trending";
  if (count === 1) return "Growing";
  return "Moderate";
}

export async function GET() {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Trending: most-scanned models in last 30 days
    const scanGroups = await prisma.scan.groupBy({
      by: ["model"],
      where: {
        created_at: { gte: thirtyDaysAgo },
        model: { not: null },
      },
      _count: { model: true },
      orderBy: { _count: { model: "desc" } },
      take: 8,
    });

    const trending = scanGroups
      .filter((g) => g.model)
      .map((g) => ({
        name: g.model as string,
        demand: demandLabel(g._count.model),
      }));

    // Arbitrage signals: top active deals by net profit
    const topDeals = await prisma.deal.findMany({
      where: {
        isActive: true,
        sneaker: { not: null },
        netProfit: { not: null },
      },
      orderBy: { netProfit: "desc" },
      take: 8,
      select: { sneaker: true, netProfit: true },
    });

    const arbitrage = topDeals
      .filter((d) => d.sneaker !== null)
      .map((d) => ({
        name: d.sneaker as string,
        profit: Math.round(d.netProfit ?? 0),
      }));

    return NextResponse.json({ trending, arbitrage });
  } catch (err) {
    console.error("[/api/trending] query failed:", err);
    return NextResponse.json({ trending: [], arbitrage: [] });
  }
}
