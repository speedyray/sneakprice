// Module-level cache: eBay OAuth tokens are valid for ~7200s (2h). Fetching
// every request (a) wastes DNS lookups against api.ebay.com (which has been
// failing intermittently with ENOTFOUND on Vercel), and (b) burns rate limit.
// Cache the token until 60s before its real expiry.
//
// 2026-04-26 incident: eBay's CDN target global-api.ebaycdn.net dropped its
// A records for ~2h, so api.ebay.com was unresolvable. Node's process-level
// DNS cache on warm Vercel containers held the negative result even after
// eBay's DNS recovered, so a redeploy was needed to evict warm containers.
// Long-term, we should consider an undici dispatcher with disabled DNS cache.
let cached: { value: string; expiresAt: number } | null = null;

async function fetchTokenWithRetry(url: string, init: RequestInit, attempt = 0): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (e) {
    const code = (e as { cause?: { code?: string }; code?: string })?.cause?.code
      ?? (e as { code?: string })?.code;
    // Backoff schedule: 500ms, 1s, 2s. Up to 3 retries.
    if (attempt < 3 && (code === "ENOTFOUND" || code === "ECONNRESET" || code === "ETIMEDOUT")) {
      await new Promise((r) => setTimeout(r, 500 * Math.pow(2, attempt)));
      return fetchTokenWithRetry(url, init, attempt + 1);
    }
    throw e;
  }
}

export async function getEbayAccessToken(): Promise<string | undefined> {
  const now = Date.now();
  if (cached && cached.expiresAt > now + 60_000) {
    return cached.value;
  }

  const base =
    process.env.EBAY_ENVIRONMENT === "production"
      ? "https://api.ebay.com"
      : "https://api.sandbox.ebay.com";

  const credentials = Buffer.from(
    `${process.env.EBAY_CLIENT_ID}:${process.env.EBAY_CLIENT_SECRET}`
  ).toString("base64");

  try {
    const res = await fetchTokenWithRetry(`${base}/identity/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
    });

    if (!res.ok) {
      console.error("[lib/ebay] token request failed:", res.status, await res.text().catch(() => ""));
      return undefined;
    }

    const data = (await res.json()) as { access_token?: string; expires_in?: number };
    if (!data.access_token) return undefined;

    const ttlMs = (data.expires_in ?? 7200) * 1000;
    cached = { value: data.access_token, expiresAt: now + ttlMs };
    return data.access_token;
  } catch (e) {
    // Vercel intermittently fails getaddrinfo for api.ebay.com. Don't throw:
    // callers degrade gracefully (e.g. /api/market-prices uses Deal cache).
    console.error("[lib/ebay] token fetch threw:", e);
    return undefined;
  }
}
