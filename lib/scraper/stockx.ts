// lib/scraper/stockx.ts
// Fetches the lowest ask price on StockX for a given sneaker model.
// Returns null on any failure — always safe to call.

export interface StockXPrice {
  price: number;
  url: string;
  productName: string;
}

const STOCKX_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://stockx.com/",
  "x-requested-with": "XMLHttpRequest",
};

export async function getStockXPrice(
  modelName: string
): Promise<StockXPrice | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const url = `https://stockx.com/api/browse?productCategory=sneakers&query=${encodeURIComponent(
      modelName
    )}&resultsPerPage=3&page=1&country=US&currency=USD&market=US`;

    const res = await fetch(url, {
      headers: STOCKX_HEADERS,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = await res.json();
    const products: any[] = data?.Products ?? [];

    if (!products.length) return null;

    const top = products[0];
    const lowestAsk = top?.market?.lowestAsk ?? top?.market?.lastSale;
    if (!lowestAsk || typeof lowestAsk !== "number") return null;

    return {
      price: lowestAsk,
      url: `https://stockx.com/${top.urlKey ?? ""}`,
      productName: top.title ?? modelName,
    };
  } catch {
    return null;
  }
}
