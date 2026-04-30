// Public read endpoint for the SPX-* indexes ticker. Returns one row per
// configured index with the latest IndexSnapshot values (or nulls when no
// snapshot exists yet). Designed to be polled from the /exchange UI every
// 30-60 seconds.
//
// Optional `?history=N` returns the last N IndexSnapshot rows per index
// (oldest → newest) for mini-chart rendering. N is clamped to [2, 168].

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { INDEXES } from "@/lib/exchange/indexes";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const historyParam = searchParams.get("history");
  const historyN = historyParam
    ? Math.min(168, Math.max(2, parseInt(historyParam, 10) || 0))
    : 0;

  const latestPerIndex = await Promise.all(
    INDEXES.map((idx) =>
      prisma.indexSnapshot.findFirst({
        where: { indexSymbol: idx.symbol },
        orderBy: { capturedAt: "desc" },
      })
    )
  );

  const historyPerIndex = historyN
    ? await Promise.all(
        INDEXES.map((idx) =>
          prisma.indexSnapshot.findMany({
            where: { indexSymbol: idx.symbol },
            orderBy: { capturedAt: "desc" },
            take: historyN,
            select: { capturedAt: true, level: true },
          })
        )
      )
    : null;

  const items = INDEXES.map((idx, i) => {
    const snap = latestPerIndex[i];
    const history = historyPerIndex
      ? historyPerIndex[i]
          .slice()
          .reverse()
          .map((row) => ({
            capturedAt: row.capturedAt,
            level: row.level,
          }))
      : undefined;

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
      ...(history ? { history } : {}),
    };
  });

  return NextResponse.json({ indexes: items });
}
