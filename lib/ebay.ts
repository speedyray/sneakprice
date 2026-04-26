// Module-level cache: eBay OAuth tokens are valid for ~7200s (2h). Fetching
// every request (a) wastes DNS lookups against api.ebay.com (which has been
// failing intermittently with ENOTFOUND on Vercel), and (b) burns rate limit.
// Cache the token until 60s before its real expiry.
let cached: { value: string; expiresAt: number } | null = null;

async function fetchTokenWithRetry(url: string, init: RequestInit, retries = 1): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (e) {
    const code = (e as { cause?: { code?: string }; code?: string })?.cause?.code
      ?? (e as { code?: string })?.code;
    if (retries > 0 && code === "ENOTFOUND") {
      await new Promise((r) => setTimeout(r, 500));
      return fetchTokenWithRetry(url, init, retries - 1);
    }
    throw e;
  }
}

export async function getEbayAccessToken() {
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
}
