import { prisma } from "@/lib/prisma";
import { INDEXES } from "./indexes";
import { SYMBOLS, symbolsForIndex } from "./catalog";

// Aggregates per-symbol MarketSnapshot rows into per-index IndexSnapshot
// rows. Designed to chain immediately after captureSnapshots() in the
// hourly cron — each cron tick produces both per-symbol and per-index
// rows in one request.
//
// Metrics computed in v1: level, dayChangePct, breadthUpPct, liquidityCount.
// volatility7d and sentimentScore are reserved (left null) until we have
// enough history to compute them honestly.

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

export type AggregateResult = {
  capturedAt: string;
  indexes: Array<{
    symbol: string;
    level: number;
    dayChangePct: number | null;
    breadthUpPct: number | null;
    liquidityCount: number;
    constituentsWithData: number;
  }>;
  skipped: Array<{ symbol: string; reason: string }>;
  durationMs: number;
};

type Snapshot = {
  symbol: string;
  capturedAt: Date;
  median: number;
  count: number;
};

async function loadSymbolStats(symbol: string): Promise<{
  latest: Snapshot | null;
  earliest: Snapshot | null;
  dayAgo: Snapshot | null;
}> {
  const target = new Date(Date.now() - ONE_DAY_MS);
  const [latest, earliest, dayAgo] = await Promise.all([
    prisma.marketSnapshot.findFirst({
      where: { symbol },
      orderBy: { capturedAt: "desc" },
      select: { symbol: true, capturedAt: true, median: true, count: true },
    }),
    prisma.marketSnapshot.findFirst({
      where: { symbol },
      orderBy: { capturedAt: "asc" },
      select: { symbol: true, capturedAt: true, median: true, count: true },
    }),
    prisma.marketSnapshot.findFirst({
      where: {
        symbol,
        capturedAt: {
          gte: new Date(target.getTime() - TWO_HOURS_MS),
          lte: new Date(target.getTime() + TWO_HOURS_MS),
        },
      },
      orderBy: { capturedAt: "desc" },
      select: { symbol: true, capturedAt: true, median: true, count: true },
    }),
  ]);
  return { latest, earliest, dayAgo };
}

export async function aggregateIndexes(): Promise<AggregateResult> {
  const startedAt = Date.now();
  const indexes: AggregateResult["indexes"] = [];
  const skipped: AggregateResult["skipped"] = [];

  // Pre-load per-symbol windows once. ~23 symbols × 3 queries = manageable.
  const stats = new Map<string, Awaited<ReturnType<typeof loadSymbolStats>>>();
  for (const s of SYMBOLS) {
    stats.set(s.symbol, await loadSymbolStats(s.symbol));
  }

  for (const idx of INDEXES) {
    const constituents = symbolsForIndex(idx.symbol);
    const normalizedLevels: number[] = [];
    const dayChanges: number[] = [];
    let breadthUp = 0;
    let breadthCount = 0;
    let liquidity = 0;
    let constituentsWithData = 0;

    for (const c of constituents) {
      const s = stats.get(c.symbol);
      if (!s?.latest || !s?.earliest) continue;

      constituentsWithData++;
      liquidity += s.latest.count;
      normalizedLevels.push((s.latest.median / s.earliest.median) * 100);

      if (s.dayAgo) {
        const change = (s.latest.median - s.dayAgo.median) / s.dayAgo.median;
        dayChanges.push(change);
        if (change > 0) breadthUp++;
        breadthCount++;
      }
    }

    if (normalizedLevels.length === 0) {
      skipped.push({ symbol: idx.symbol, reason: "no constituents have data" });
      continue;
    }

    const level =
      normalizedLevels.reduce((s, n) => s + n, 0) / normalizedLevels.length;
    const dayChangePct =
      dayChanges.length > 0
        ? (dayChanges.reduce((s, c) => s + c, 0) / dayChanges.length) * 100
        : null;
    const breadthUpPct =
      breadthCount > 0 ? (breadthUp / breadthCount) * 100 : null;

    await prisma.indexSnapshot.create({
      data: {
        indexSymbol: idx.symbol,
        level,
        dayChangePct,
        breadthUpPct,
        volatility7d: null,
        sentimentScore: null,
        liquidityCount: liquidity,
      },
    });

    indexes.push({
      symbol: idx.symbol,
      level: Math.round(level * 100) / 100,
      dayChangePct:
        dayChangePct !== null ? Math.round(dayChangePct * 100) / 100 : null,
      breadthUpPct:
        breadthUpPct !== null ? Math.round(breadthUpPct * 100) / 100 : null,
      liquidityCount: liquidity,
      constituentsWithData,
    });
  }

  return {
    capturedAt: new Date().toISOString(),
    indexes,
    skipped,
    durationMs: Date.now() - startedAt,
  };
}
