import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getEbayAccessToken } from "@/lib/ebay";
import { createClient } from "@supabase/supabase-js";
import { checkAndIncrementScanLimit } from "@/lib/scan-rate-limit";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);



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
  // 1. Require authentication
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  // 2. Extract client IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  // 3. Check + increment rate limit
  const { allowed, remaining } = await checkAndIncrementScanLimit(userId, ip);
  if (!allowed) {
    return NextResponse.json({ error: "limit_reached", remaining: 0 }, { status: 403 });
  }

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

  // Note: eBay Browse API rejects filter=buyingOptions:{FIXED_PRICE} (error 12002), so it's omitted.
  const activeRes = await fetch(
    `${base}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
      query
    )}&category_ids=15709&limit=30`,
    { headers }
  );

  const activeData = await activeRes.json();
  const activeItems = activeData.itemSummaries || [];

  const activePrices = activeItems
    .map((item: any) => parseFloat(item.price?.value))
    .filter((p: number) => !isNaN(p));

  // Track cheapest listing's itemId for direct buy link
  const cheapestItem = activeItems
    .filter((item: any) => !isNaN(parseFloat(item.price?.value)))
    .sort((a: any, b: any) => parseFloat(a.price?.value) - parseFloat(b.price?.value))[0];

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

  // Note: eBay Browse API doesn't expose sold listings (that's Marketplace Insights, requires approval).
  // filter=soldItems:{true} was rejected with error 12002 and silently ignored. This fetches a broader
  // active sample (50 vs 30) and treats the median as a market-price proxy — rename field when moving
  // to a real sold-price source.
  const soldRes = await fetch(
    `${base}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
      query
    )}&category_ids=15709&limit=50`,
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

  let deal = null;

if (
  activeStats &&
  soldStats &&
  activeStats.lowestPrice &&
  soldStats.overallMedian &&
  activeStats.lowestPrice < soldStats.overallMedian
) {
  const spread = soldStats.overallMedian - activeStats.lowestPrice;
  const percent = (spread / activeStats.lowestPrice) * 100;

  if (spread > 25) {

     

  deal = {
    buyPrice: activeStats.lowestPrice,
    marketPrice: soldStats.overallMedian,
    profit: spread,
    roi: percent,
    cheapestItemId: cheapestItem?.legacyItemId ?? cheapestItem?.itemId?.split("|")[1] ?? null,
  };

  // 🔥 SAVE DEAL TO SUPABASE
  try {
    await supabase.from("deals").insert({
      sneaker: query,
      buy_price: activeStats.lowestPrice,
      market_price: soldStats.overallMedian,
      profit: spread,
      roi: percent,
      source: "ebay"
    });
  } catch (err) {
    console.error("Deal insert failed:", err);
  }

  }
}



return NextResponse.json({
  activeMarket: activeStats,
  soldMarket: soldStats,
  deal,
  remaining,
});
}
