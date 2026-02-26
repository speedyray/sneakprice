import { NextResponse } from "next/server";
import { getEbayAccessToken } from "@/lib/ebay";

import { prisma } from "@/lib/prisma";



export async function POST(req: Request) {
  const { query } = await req.json();

  const base =
    process.env.EBAY_ENVIRONMENT === "production"
      ? "https://api.ebay.com"
      : "https://api.sandbox.ebay.com";

  console.log("Base URL:", base);

  const token = await getEbayAccessToken();

  console.log("Token exists:", !!token);

  const res = await fetch(
    `${base}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
     query
     )}&limit=20&filter=buyingOptions:{FIXED_PRICE},conditionIds:{1000}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
      },
    }
  );

  const data = await res.json();

  const items = data.itemSummaries || [];

const prices = items
  .map((item: any) => parseFloat(item.price?.value))
  .filter((p: number) => !isNaN(p));

  const totalListings = items.length;

if (prices.length === 0) {
  return NextResponse.json({
    totalListings: 0,
    message: "No fixed-price new listings found",
  });
}

prices.sort((a: number, b: number) => a - b);

const trimPercent = 0.15;
const trimCount = Math.floor(prices.length * trimPercent);

const trimmedPrices = prices.slice(
  trimCount,
  prices.length - trimCount
);

const lowest = trimmedPrices[0];
const highest = trimmedPrices[trimmedPrices.length - 1];

const average =
  trimmedPrices.reduce((sum: number, p: number) => sum + p, 0) /
  trimmedPrices.length;

const median =
  trimmedPrices.length % 2 === 0
    ? (trimmedPrices[trimmedPrices.length / 2 - 1] +
        trimmedPrices[trimmedPrices.length / 2]) /
      2
    : trimmedPrices[Math.floor(trimmedPrices.length / 2)];

    const spread = highest - lowest;
    const volatility = spread / average;

     let marketLabel = "Active Market";

    if (volatility > 0.5) marketLabel = "High Volatility";
    if (volatility < 0.2) marketLabel = "Stable Blue-Chip";

    await prisma.sneakerScan.create({
  data: {
    query,
    medianPrice: median,
    averagePrice: average,
    lowestPrice: lowest,
    highestPrice: highest,
    volatility,
    marketLabel,
    totalListings,
  },
});


return NextResponse.json({
  medianPrice: median,
  averagePrice: average,
  lowestPrice: lowest,
  highestPrice: highest,
  totalListings,
  volatility,
  marketLabel,
});
};


