import { fetchEbayMarket, type EbayMarketItem } from "@/lib/ebay";
import { summarize, type Stats } from "@/lib/exchange/stats";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Sold-listing data is unavailable until the eBay Marketplace Insights API
// is approved (separate gated program from Browse). Until then, /api/market
// returns active eBay US listings only and labels them honestly.

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
