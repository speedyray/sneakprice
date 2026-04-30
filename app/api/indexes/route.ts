// Public read endpoint for the SPX-* indexes ticker. Returns one row per
// configured index with the latest IndexSnapshot values (or nulls when no
// snapshot exists yet). Designed to be polled from the /exchange UI every
// 30-60 seconds.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { INDEXES } from "@/lib/exchange/indexes";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const latestPerIndex = await Promise.all(
    INDEXES.map((idx) =>
      prisma.indexSnapshot.findFirst({
        where: { indexSymbol: idx.symbol },
        orderBy: { capturedAt: "desc" },
      })
    )
  );

  const items = INDEXES.map((idx, i) => {
    const snap = latestPerIndex[i];
    return {
      symbol: idx.symbol,
      name: idx.name,
      description: idx.description,
      level: snap?.level ?? null,
      dayChangePct: snap?.dayChangePct ?? null,
      breadthUpPct: snap?.breadthUpPct ?? null,
      volatility7d: snap?.volatility7d ?? null,
      sentimentScore: snap?.sentimentScore ?? null,
      liquidityCount: snap?.liquidityCount ?? null,
      capturedAt: snap?.capturedAt ?? null,
    };
  });

  return NextResponse.json({ indexes: items });
}
