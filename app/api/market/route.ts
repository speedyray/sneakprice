import { fetchEbayMarket, type EbayMarketItem } from "@/lib/ebay";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Sold-listing data is unavailable until the eBay Marketplace Insights API
// is approved (separate gated program from Browse). Until then, /api/market
// returns active eBay US listings only and labels them honestly.

type Stats = {
  count: number;
  low: number;
  p25: number;
  median: number;
  p75: number;
  high: number;
  trimmedMean: number;
};

type MarketResponse = {
  query: string;
  capturedAt: string;
  source: "ebay-active";
  stats: Stats | null;
  listings: EbayMarketItem[];
  notes: { soldData: string; sample: string };
};

const TTL_MS = 60_000;
const cache = new Map<string, { value: MarketResponse; expiresAt: number }>();

function quantile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.floor(p * (sorted.length - 1));
  return sorted[idx];
}

function summarize(prices: number[]): Stats | null {
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("q") ?? "").trim();

  if (!query) {
    return Response.json(
      { error: "Missing required query parameter: q" },
      { status: 400 }
    );
  }

  const key = query.toLowerCase();
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.expiresAt > now) {
    return Response.json(hit.value, {
      headers: { "X-Cache": "HIT" },
    });
  }

  const listings = await fetchEbayMarket(query, { limit: 50 });
  const prices = listings.map((l) => l.price);
  const stats = summarize(prices);

  const body: MarketResponse = {
    query,
    capturedAt: new Date().toISOString(),
    source: "ebay-active",
    stats,
    listings,
    notes: {
      soldData:
        "unavailable — pending eBay Marketplace Insights API approval",
      sample: "active eBay US listings, Athletic Shoes (cat 15709)",
    },
  };

  cache.set(key, { value: body, expiresAt: now + TTL_MS });
  return Response.json(body, { headers: { "X-Cache": "MISS" } });
}
