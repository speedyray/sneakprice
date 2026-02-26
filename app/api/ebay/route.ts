import { NextResponse } from "next/server";
import { getEbayAccessToken } from "@/lib/ebay";



function median(arr: number[]) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function average(arr: number[]) {
  if (arr.length === 0) return 0;
  return arr.reduce((sum, p) => sum + p, 0) / arr.length;
}

export async function POST(req: Request) {
  const { query } = await req.json();

  const base =
    process.env.EBAY_ENVIRONMENT === "production"
      ? "https://api.ebay.com"
      : "https://api.sandbox.ebay.com";

  const token = await getEbayAccessToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
  };

  /* =========================
     1️⃣ ACTIVE LISTINGS
  ========================== */

  const activeRes = await fetch(
    `${base}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
      query
    )}&limit=30&filter=buyingOptions:{FIXED_PRICE}`,
    { headers }
  );

  const activeData = await activeRes.json();
  const activeItems = activeData.itemSummaries || [];

  const activePrices = activeItems
    .map((item: any) => parseFloat(item.price?.value))
    .filter((p: number) => !isNaN(p));

  let activeStats = null;

  if (activePrices.length > 0) {
    activePrices.sort((a: number, b: number) => a - b);

    const trimPercent = 0.15;
    const trimCount = Math.floor(activePrices.length * trimPercent);

    const trimmed = activePrices.slice(
      trimCount,
      activePrices.length - trimCount
    );

    const lowest = trimmed[0];
    const highest = trimmed[trimmed.length - 1];
    const avg = average(trimmed);
    const med = median(trimmed);

    const spread = highest - lowest;
    const volatility = spread / avg;

    let marketLabel = "Active Market";
    if (volatility > 0.5) marketLabel = "High Volatility";
    if (volatility < 0.2) marketLabel = "Stable Blue-Chip";

    activeStats = {
      medianPrice: med,
      averagePrice: avg,
      lowestPrice: lowest,
      highestPrice: highest,
      totalListings: activePrices.length,
      volatility,
      marketLabel,
    };
  }

  /* =========================
     2️⃣ SOLD LISTINGS
  ========================== */

  const soldRes = await fetch(
    `${base}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
      query
    )}&limit=50&filter=soldItems:{true}`,
    { headers }
  );

  const soldData = await soldRes.json();
  const soldItems = soldData.itemSummaries || [];

  const newPrices: number[] = [];
  const usedPrices: number[] = [];

  soldItems.forEach((item: any) => {
    const price = parseFloat(item.price?.value);
    const condition = item.condition?.toLowerCase();

    if (!price || isNaN(price)) return;

    if (condition?.includes("new")) {
      newPrices.push(price);
    } else {
      usedPrices.push(price);
    }
  });

  const allSold = [...newPrices, ...usedPrices];

  let soldStats = null;

  if (allSold.length > 0) {
    soldStats = {
      totalSold: allSold.length,
      overallMedian: median(allSold),
      newCount: newPrices.length,
      newMedian: newPrices.length ? median(newPrices) : null,
      usedCount: usedPrices.length,
      usedMedian: usedPrices.length ? median(usedPrices) : null,
    };
  }

  /* =========================
     3️⃣ SAVE TO DATABASE REMOVED
  ========================== */

  

  /* =========================
     4️⃣ FINAL RESPONSE
  ========================== */

  return NextResponse.json({
    activeMarket: activeStats,
    soldMarket: soldStats,
  });
}
