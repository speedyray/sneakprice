// lib/deal-pipeline.ts
// Runs the full deal discovery pipeline for one sneaker model.
// Queries eBay for buy prices, scrapers for sell prices,
// calculates P&L, scores, and upserts deals into Postgres.

import { prisma } from "@/lib/prisma";
import { getEbayAccessToken } from "@/lib/ebay";
import { getPlatformPrices } from "@/lib/scraper/index";
import { calculatePnL } from "@/lib/profit-calculator";
import { scoreDeal } from "@/lib/deal-scorer";
import type { PlatformPrice } from "@/lib/scraper/index";

const EBAY_BASE =
  process.env.EBAY_ENVIRONMENT === "production"
    ? "https://api.ebay.com"
    : "https://api.sandbox.ebay.com";

interface EbayListing {
  itemId: string;
  title: string;
  price: number;
  itemWebUrl: string;
  listingEndDate?: string;
}

async function getEbayListings(query: string): Promise<EbayListing[]> {
  try {
    const token = await getEbayAccessToken();
    const res = await fetch(
      `${EBAY_BASE}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
        query
      )}&limit=10&filter=buyingOptions:{FIXED_PRICE},conditions:{NEW}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
        },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    const items: any[] = data?.itemSummaries ?? [];

    return items
      .map((item) => ({
        itemId: item.itemId ?? "",
        title: item.title ?? "",
        price: parseFloat(item.price?.value ?? "0"),
        itemWebUrl: item.itemWebUrl ?? "",
        listingEndDate: item.itemEndDate,
      }))
      .filter((item) => item.price > 0 && item.itemId);
  } catch {
    return [];
  }
}

function listingAgeHours(endDate?: string): number {
  // eBay returns itemEndDate (future). Approximate age as 24h default.
  return 24;
}

export interface PipelineResult {
  modelName: string;
  dealsFound: number;
  dealsSaved: number;
}

export async function runDealPipeline(
  modelName: string
): Promise<PipelineResult> {
  let dealsFound = 0;
  let dealsSaved = 0;

  // 1. Get eBay buy-side listings (lowest priced new sneakers)
  const ebayListings = await getEbayListings(modelName);
  if (!ebayListings.length) return { modelName, dealsFound: 0, dealsSaved: 0 };

  // Sort by price ascending — cheapest first
  ebayListings.sort((a, b) => a.price - b.price);
  const buyListing = ebayListings[0];

  // 2. Get platform sell prices (StockX, GOAT) + retail buy price (Nike)
  const platformPrices = await getPlatformPrices(modelName);
  const sellPrices = platformPrices.filter((p) => p.role === "sell");
  const retailBuy = platformPrices.find(
    (p) => p.role === "buy" && p.platform === "nike"
  );

  // 3. Build deals: eBay → each sell platform
  const candidatePairs: {
    buyPrice: number;
    buyPlatform: "ebay";
    buyUrl: string;
    buyListingId: string;
    sellPlatform: PlatformPrice["platform"];
    sellPrice: number;
    sellUrl: string;
  }[] = sellPrices.map((sell) => ({
    buyPrice: buyListing.price,
    buyPlatform: "ebay",
    buyUrl: buyListing.itemWebUrl,
    buyListingId: buyListing.itemId,
    sellPlatform: sell.platform,
    sellPrice: sell.price,
    sellUrl: sell.url,
  }));

  // Also: Nike retail → eBay resell (retail arbitrage)
  // Find median eBay sell price (not cheapest — we're the seller here)
  if (retailBuy && ebayListings.length >= 3) {
    const ebayPrices = ebayListings.map((l) => l.price).sort((a, b) => a - b);
    const medianEbay = ebayPrices[Math.floor(ebayPrices.length / 2)];
    if (medianEbay > retailBuy.price) {
      candidatePairs.push({
        buyPrice: retailBuy.price,
        buyPlatform: "ebay", // use "ebay" as stand-in; url points to Nike
        buyUrl: retailBuy.url,
        buyListingId: `nike-${modelName.replace(/\s+/g, "-").toLowerCase()}`,
        sellPlatform: "ebay",
        sellPrice: medianEbay,
        sellUrl: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(modelName)}`,
      });
    }
  }

  dealsFound = candidatePairs.length;

  // 4. Calculate P&L and score each pair
  for (const pair of candidatePairs) {
    const pnl = calculatePnL({
      buyPrice: pair.buyPrice,
      buyPlatform: pair.buyPlatform,
      sellPrice: pair.sellPrice,
      sellPlatform: pair.sellPlatform as any,
    });

    if (!pnl.isViable) continue;

    const scoreResult = await scoreDeal({
      modelName,
      pnl,
      buyPrice: pair.buyPrice,
      sellPrice: pair.sellPrice,
      demandTrend: 0,
      sellThroughRate: 0.5,
      buyListingAge: listingAgeHours(buyListing.listingEndDate),
    });

    if (scoreResult.label === "skip") continue;

    // 5. Upsert into DB (deduplicate by buyListingId + sellPlatform)
    try {
      await prisma.deal.upsert({
        where: {
          id: `${pair.buyListingId}-${pair.sellPlatform}`,
        },
        create: {
          id: `${pair.buyListingId}-${pair.sellPlatform}`,
          sneaker: modelName,
          roi: pnl.profitMargin,
          profit: pnl.netProfit,
          buyPlatform: pair.buyPlatform,
          buyPrice: pair.buyPrice,
          buyUrl: pair.buyUrl,
          buyListingId: pair.buyListingId,
          sellPlatform: pair.sellPlatform,
          sellPrice: pair.sellPrice,
          sellUrl: pair.sellUrl,
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
          sellPrice: pair.sellPrice,
          buyPrice: pair.buyPrice,
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
    } catch {
      // Skip upsert failures silently — don't crash the pipeline
    }
  }

  return { modelName, dealsFound, dealsSaved };
}
