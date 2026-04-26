// app/api/market-prices/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEbayAccessToken } from "@/lib/ebay";

function median(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function fetchEbayPrice(
  sneaker: string,
  base: string,
  token: string
): Promise<{ sneaker: string; medianPrice: number; totalListings: number; marketLabel: string } | null> {
  try {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 8_000);
    // Note: eBay Browse API rejects filter=buyingOptions:{FIXED_PRICE} (error 12002).
    // Removed here to match the cleanup of /api/ebay in commit 2ad6a1a.
    const res = await fetch(
      `${base}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(sneaker)}&limit=30`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
        },
        signal: ac.signal,
      }
    ).finally(() => clearTimeout(timer));

    if (!res.ok) throw new Error(`eBay API error: ${res.status}`);
    const data = await res.json();
    const items = data.itemSummaries ?? [];

    const prices: number[] = items
      .map((item: { price?: { value?: string } }) => parseFloat(item.price?.value ?? ""))
      .filter((p: number) => !isNaN(p));

    if (prices.length === 0) return null;

    prices.sort((a, b) => a - b);
    const trimCount = Math.floor(prices.length * 0.15);
    const trimmed = prices.slice(trimCount, prices.length - trimCount);

    if (trimmed.length === 0) return null;

    const med = median(trimmed);
    const avg = trimmed.reduce((sum, p) => sum + p, 0) / trimmed.length;
    const spread = trimmed[trimmed.length - 1] - trimmed[0];
    const volatility = spread / avg;

    let marketLabel = "Active Market";
    if (volatility > 0.5) marketLabel = "High Volatility";
    if (volatility < 0.2) marketLabel = "Stable Blue-Chip";

    return { sneaker, medianPrice: Math.round(med), totalListings: prices.length, marketLabel };
  } catch (e) {
    console.error("[/api/market-prices] fetch failed for", sneaker, e);
    return null;
  }
}

// Build a price row from a cached Deal record. Used as a fallback when eBay
// live calls fail (Vercel has flaky DNS for api.ebay.com), so the panel
// always renders something useful instead of disappearing.
function dealToPriceRow(d: {
  sneaker: string | null;
  sellPrice: number | null;
  buyPrice: number | null;
}) {
  if (!d.sneaker || d.sellPrice == null) return null;
  const spread = d.buyPrice != null ? Math.abs(d.sellPrice - d.buyPrice) / d.sellPrice : 0;
  let marketLabel = "Active Market";
  if (spread > 0.5) marketLabel = "High Volatility";
  if (spread > 0 && spread < 0.2) marketLabel = "Stable Blue-Chip";
  return {
    sneaker: d.sneaker,
    medianPrice: Math.round(d.sellPrice),
    totalListings: 30,
    marketLabel,
  };
}

export async function GET() {
  try {
    const base =
      process.env.EBAY_ENVIRONMENT === "production"
        ? "https://api.ebay.com"
        : "https://api.sandbox.ebay.com";

    const topDeals = await prisma.deal.findMany({
      where: { isActive: true, sneaker: { not: null }, dealScore: { not: null } },
      orderBy: { dealScore: "desc" },
      take: 5,
      select: { sneaker: true, sellPrice: true, buyPrice: true },
    });

    const sneakers = topDeals
      .filter((d): d is typeof d & { sneaker: string } => d.sneaker !== null)
      .map((d) => d.sneaker);

    if (sneakers.length === 0) {
      return NextResponse.json({ prices: [] });
    }

    // Fallback rows derived from the Deal table (no eBay dependency).
    const fallbackPrices = topDeals
      .map(dealToPriceRow)
      .filter((r): r is NonNullable<typeof r> => r !== null);

    const token = await getEbayAccessToken();
    if (!token) {
      console.error("[/api/market-prices] eBay token unavailable; using Deal cache");
      return NextResponse.json({ prices: fallbackPrices });
    }

    const results = await Promise.all(
      sneakers.map((s) => fetchEbayPrice(s, base, token))
    );

    const livePrices = results.filter(
      (r): r is NonNullable<typeof r> => r !== null
    );

    // If every live fetch failed, fall back to cached data so the panel still renders.
    return NextResponse.json({
      prices: livePrices.length > 0 ? livePrices : fallbackPrices,
    });
  } catch (err) {
    console.error("[/api/market-prices] failed:", err);
    return NextResponse.json({ prices: [] });
  }
}
