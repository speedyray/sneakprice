// lib/scraper/nike.ts
// Fetches the current retail price from Nike's product search API.

export interface NikePrice {
  price: number;
  url: string;
  productName: string;
}

export async function getNikePrice(
  modelName: string
): Promise<NikePrice | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    // Use Nike's public product browse API (no auth required)
    const url = `https://api.nike.com/cic/browse/v2?queryid=products&anonymousId=anon&country=US&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3DmarketPlace(US)%26filter%3Dlanguage(en)%26filter%3DsearchTerm(${encodeURIComponent(modelName)})%26filter%3DinStock(true)%26count%3D3`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = await res.json();

    // Navigate Nike's nested response structure
    const products =
      data?.data?.products?.products ??
      data?.products?.products ??
      [];

    if (!products.length) return null;

    const top = products[0];
    const priceStr =
      top?.price?.currentPrice ??
      top?.price?.fullPrice;

    if (!priceStr) return null;

    const price =
      typeof priceStr === "string"
        ? parseFloat(priceStr.replace(/[^0-9.]/g, ""))
        : priceStr;

    if (!price || isNaN(price)) return null;

    const slug = top?.url ?? top?.slug ?? "";
    const productUrl = slug.startsWith("http")
      ? slug
      : `https://www.nike.com${slug}`;

    return {
      price,
      url: productUrl,
      productName: top?.title ?? top?.displayName ?? modelName,
    };
  } catch {
    return null;
  }
}
