// Summary statistics for a list of prices. Used by both /api/market (real-
// time response) and the capture cron (writes to MarketSnapshot). Extracting
// this so the route and the cron compute identical numbers from identical
// inputs — no drift between "what the user sees now" and "what we persist."

export type Stats = {
  count: number;
  low: number;
  p25: number;
  median: number;
  p75: number;
  high: number;
  trimmedMean: number;
};

function quantile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.floor(p * (sorted.length - 1));
  return sorted[idx];
}

export function summarize(prices: number[]): Stats | null {
  if (prices.length === 0) return null;
  const sorted = [...prices].sort((a, b) => a - b);
  const trimCount = Math.floor(sorted.length * 0.15);
  const trimmed = sorted.slice(trimCount, sorted.length - trimCount);
  const trimmedMean =
    trimmed.length > 0
      ? trimmed.reduce((s, p) => s + p, 0) / trimmed.length
      : sorted.reduce((s, p) => s + p, 0) / sorted.length;
  return {
    count: sorted.length,
    low: sorted[0],
    p25: quantile(sorted, 0.25),
    median: quantile(sorted, 0.5),
    p75: quantile(sorted, 0.75),
    high: sorted[sorted.length - 1],
    trimmedMean: Math.round(trimmedMean * 100) / 100,
  };
}
