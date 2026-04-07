// lib/deal-pipeline.ts
// Runs the full deal discovery pipeline for one sneaker model.
// Buy side: eBay active listings (cheapest fixed-price new).
// Sell side: eBay sold listings median (real market clearing price).
// Calculates P&L, scores, and upserts deals into Postgres.

import { prisma } from "@/lib/prisma";
import { getEbayAccessToken } from "@/lib/ebay";
import { calculatePnL } from "@/lib/profit-calculator";
import { scoreDeal } from "@/lib/deal-scorer";

const EBAY_BASE =
  process.env.EBAY_ENVIRONMENT === "production"
    ? "https://api.ebay.com"
    : "https://api.sandbox.ebay.com";

interface EbayListing {
  itemId: string;
  legacyItemId: string;
  title: string;
  price: number;
}

async function getEbayHeaders() {
  const token = await getEbayAccessToken();
  return {
    Authorization: `Bearer ${token}`,
    "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
  };
}

// Cheapest fixed-price new active listings
async function getEbayActiveListings(query: string): Promise<EbayListing[]> {
  try {
    const headers = await getEbayHeaders();
    const res = await fetch(
      `${EBAY_BASE}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
        query
      )}&limit=10&filter=buyingOptions:{FIXED_PRICE},conditions:{NEW}`,
      { headers }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const items: any[] = data?.itemSummaries ?? [];
    return items
      .map((item) => ({
        itemId: item.itemId ?? "",
        legacyItemId: item.legacyItemId ?? "",
        title: item.title ?? "",
        price: parseFloat(item.price?.value ?? "0"),
      }))
      .filter((item) => item.price > 0 && item.legacyItemId);
  } catch {
    return [];
  }
}

// Median price from recently sold listings — our sell-side market proxy
async function getEbaySoldMedian(query: string): Promise<number | null> {
  try {
    const headers = await getEbayHeaders();
    const res = await fetch(
      `${EBAY_BASE}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
        query
      )}&limit=30&filter=soldItems:{true}`,
      { headers }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const items: any[] = data?.itemSummaries ?? [];
    const prices = items
      .map((item) => parseFloat(item.price?.value ?? "0"))
      .filter((p) => p > 0);
    if (prices.length < 3) return null;
    prices.sort((a, b) => a - b);
    return prices[Math.floor(prices.length / 2)];
  } catch {
    return null;
  }
}

export interface PipelineResult {
  modelName: string;
  dealsFound: number;
  dealsSaved: number;
}

export async function runDealPipeline(
  modelName: string
): Promise<PipelineResult> {
  let dealsSaved = 0;

  // 1. Get active buy-side listings and sold-side market price in parallel
  const [activeListings, soldMedian] = await Promise.all([
    getEbayActiveListings(modelName),
    getEbaySoldMedian(modelName),
  ]);

  if (!activeListings.length || soldMedian === null) {
    return { modelName, dealsFound: 0, dealsSaved: 0 };
  }

  // Cheapest active listing is our buy
  activeListings.sort((a, b) => a.price - b.price);
  const buyListing = activeListings[0];

  // Only proceed if the buy price is meaningfully below the market
  if (buyListing.price >= soldMedian) {
    return { modelName, dealsFound: 0, dealsSaved: 0 };
  }

  const dealsFound = 1;
  const buyUrl = `https://www.ebay.com/itm/${buyListing.legacyItemId}`;
  const sellUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(modelName)}&LH_Sold=1&LH_Complete=1`;

  // 2. Calculate P&L
  const pnl = calculatePnL({
    buyPrice: buyListing.price,
    buyPlatform: "ebay",
    sellPrice: soldMedian,
    sellPlatform: "ebay",
  });

  if (!pnl.isViable) return { modelName, dealsFound, dealsSaved: 0 };

  // 3. Score the deal
  const scoreResult = await scoreDeal({
    modelName,
    pnl,
    buyPrice: buyListing.price,
    sellPrice: soldMedian,
    demandTrend: 0,
    sellThroughRate: 0.5,
    buyListingAge: 24,
  });

  if (scoreResult.label === "skip") return { modelName, dealsFound, dealsSaved: 0 };

  // 4. Upsert into DB — deduplicate by itemId so re-scans refresh prices
  const dealId = `${buyListing.legacyItemId}-ebay-sold`;
  try {
    await prisma.deal.upsert({
      where: { id: dealId },
      create: {
        id: dealId,
        sneaker: modelName,
        roi: pnl.profitMargin,
        profit: pnl.netProfit,
        buyPlatform: "ebay",
        buyPrice: buyListing.price,
        buyUrl: buyUrl,
        buyListingId: buyListing.legacyItemId,
        sellPlatform: "ebay",
        sellPrice: soldMedian,
        sellUrl,
        platformSellFee: pnl.platformSellFee,
        paymentFee: pnl.paymentFee,
        shippingBuy: pnl.shippingBuy,
        shippingSell: pnl.shippingSell,
        authFee: pnl.authFee,
        netProfit: pnl.netProfit,
        profitMargin: pnl.profitMargin,
        dealScore: scoreResult.score,
        dealLabel: scoreResult.label,
        scoredBy: scoreResult.scoredBy,
        isActive: true,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      update: {
        buyUrl: buyUrl,
        buyListingId: buyListing.legacyItemId,
        buyPrice: buyListing.price,
        sellPrice: soldMedian,
        sellUrl,
        roi: pnl.profitMargin,
        profit: pnl.netProfit,
        netProfit: pnl.netProfit,
        profitMargin: pnl.profitMargin,
        platformSellFee: pnl.platformSellFee,
        dealScore: scoreResult.score,
        dealLabel: scoreResult.label,
        scoredBy: scoreResult.scoredBy,
        isActive: true,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
    dealsSaved++;
  } catch (e: any) {
    console.error(`[pipeline] upsert failed for ${modelName}:`, e.message);
  }

  return { modelName, dealsFound, dealsSaved };
}
