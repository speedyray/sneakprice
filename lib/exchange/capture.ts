import { prisma } from "@/lib/prisma";
import { fetchEbayMarket } from "@/lib/ebay";
import { SYMBOLS } from "./catalog";
import { summarize } from "./stats";

// Captures one MarketSnapshot per catalog symbol and persists to Postgres.
// Designed to be called by an hourly cron. Forward-only — no backfill.
//
// Skips symbols with fewer than 5 listings to avoid noise rows that would
// poison index aggregates. Failed symbols are returned in `failed[]` so the
// caller (cron route) can surface them in the GitHub Actions log.

const MIN_LISTINGS_FOR_SNAPSHOT = 5;
const PER_SYMBOL_DELAY_MS = 200;

export type CaptureResult = {
  capturedAt: string;
  total: number;
  succeeded: number;
  failed: Array<{ symbol: string; reason: string }>;
  durationMs: number;
};

export async function captureSnapshots(): Promise<CaptureResult> {
  const startedAt = Date.now();
  const failed: Array<{ symbol: string; reason: string }> = [];
  let succeeded = 0;

  for (const entry of SYMBOLS) {
    try {
      const listings = await fetchEbayMarket(entry.ebayQuery, { limit: 50 });
      const stats = summarize(listings.map((l) => l.price));

      if (!stats) {
        failed.push({ symbol: entry.symbol, reason: "no-listings" });
      } else if (stats.count < MIN_LISTINGS_FOR_SNAPSHOT) {
        failed.push({
          symbol: entry.symbol,
          reason: `low-volume (${stats.count})`,
        });
      } else {
        await prisma.marketSnapshot.create({
          data: {
            symbol: entry.symbol,
            source: "ebay-active",
            count: stats.count,
            low: stats.low,
            p25: stats.p25,
            median: stats.median,
            p75: stats.p75,
            high: stats.high,
            trimmedMean: stats.trimmedMean,
          },
        });
        succeeded++;
      }
    } catch (err) {
      failed.push({
        symbol: entry.symbol,
        reason: err instanceof Error ? err.message : String(err),
      });
    }

    // Be polite to eBay between symbols.
    await new Promise((r) => setTimeout(r, PER_SYMBOL_DELAY_MS));
  }

  return {
    capturedAt: new Date().toISOString(),
    total: SYMBOLS.length,
    succeeded,
    failed,
    durationMs: Date.now() - startedAt,
  };
}
