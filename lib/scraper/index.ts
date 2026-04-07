// lib/scraper/index.ts
// Unified price fetcher with 20-minute cache via SneakerPriceCache.
// Call getPlatformPrices(modelName) to get all available platform prices.

import { prisma } from "@/lib/prisma";
import { getStockXPrice } from "./stockx";
import { getGoatPrice } from "./goat";
import { getNikePrice } from "./nike";

export interface PlatformPrice {
  platform: "stockx" | "goat" | "nike" | "ebay";
  price: number;
  url: string;
  productName: string;
  role: "sell" | "buy";
}

const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes

async function getCached(
  modelName: string,
  platform: string
): Promise<PlatformPrice | null> {
  const cached = await prisma.sneakerPriceCache.findUnique({
    where: { modelName_platform_size: { modelName, platform, size: "any" } },
  });

  if (!cached) return null;

  const age = Date.now() - cached.cachedAt.getTime();
  if (age > CACHE_TTL_MS) return null;

  // Return null if cached price or url is missing
  if (cached.price == null || cached.url == null) return null;

  return {
    platform: platform as PlatformPrice["platform"],
    price: cached.price,
    url: cached.url,
    productName: modelName,
    role: platform === "nike" ? "buy" : "sell",
  };
}

async function setCache(
  modelName: string,
  platform: string,
  price: number,
  url: string
): Promise<void> {
  await prisma.sneakerPriceCache.upsert({
    where: { modelName_platform_size: { modelName, platform, size: "any" } },
    create: { modelName, platform, size: "any", price, url, cachedAt: new Date() },
    update: { price, url, cachedAt: new Date() },
  });
}

export async function getPlatformPrices(
  modelName: string
): Promise<PlatformPrice[]> {
  const results: PlatformPrice[] = [];

  // Check cache and scrape each platform in parallel
  const [stockxCached, goatCached, nikeCached] = await Promise.all([
    getCached(modelName, "stockx"),
    getCached(modelName, "goat"),
    getCached(modelName, "nike"),
  ]);

  // StockX
  if (stockxCached) {
    results.push(stockxCached);
  } else {
    const fresh = await getStockXPrice(modelName);
    if (fresh) {
      await setCache(modelName, "stockx", fresh.price, fresh.url);
      results.push({
        platform: "stockx",
        price: fresh.price,
        url: fresh.url,
        productName: fresh.productName,
        role: "sell",
      });
    }
  }

  // GOAT
  if (goatCached) {
    results.push(goatCached);
  } else {
    const fresh = await getGoatPrice(modelName);
    if (fresh) {
      await setCache(modelName, "goat", fresh.price, fresh.url);
      results.push({
        platform: "goat",
        price: fresh.price,
        url: fresh.url,
        productName: fresh.productName,
        role: "sell",
      });
    }
  }

  // Nike (buy-side retail)
  if (nikeCached) {
    results.push(nikeCached);
  } else {
    const fresh = await getNikePrice(modelName);
    if (fresh) {
      await setCache(modelName, "nike", fresh.price, fresh.url);
      results.push({
        platform: "nike",
        price: fresh.price,
        url: fresh.url,
        productName: fresh.productName,
        role: "buy",
      });
    }
  }

  return results;
}
