// lib/scraper/goat.ts
// Fetches the lowest ask price on GOAT using their Algolia search API.
// Credentials are public read-only keys visible in their web app.

export interface GoatPrice {
  price: number;
  url: string;
  productName: string;
}

// Public read-only Algolia credentials from GOAT's web app
const ALGOLIA_APP_ID = "2FWOTDVM2O";
const ALGOLIA_API_KEY = "ac96de6b4e2f189609ca4e1e3be416a1";
const ALGOLIA_INDEX = "product_variants_v2";

export async function getGoatPrice(
  modelName: string
): Promise<GoatPrice | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(
      `https://${ALGOLIA_APP_ID.toLowerCase()}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX}/query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Algolia-Application-Id": ALGOLIA_APP_ID,
          "X-Algolia-API-Key": ALGOLIA_API_KEY,
        },
        body: JSON.stringify({
          query: modelName,
          hitsPerPage: 3,
          filters: "product_type:shoes",
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = await res.json();
    const hits: any[] = data?.hits ?? [];

    if (!hits.length) return null;

    const top = hits[0];
    // GOAT prices are stored in cents
    const priceCents =
      top?.lowest_price_cents ?? top?.retail_price_cents;
    if (!priceCents || typeof priceCents !== "number") return null;

    const price = priceCents / 100;
    const slug = top?.slug ?? "";

    return {
      price,
      url: `https://www.goat.com/sneakers/${slug}`,
      productName: top?.name ?? modelName,
    };
  } catch {
    return null;
  }
}
