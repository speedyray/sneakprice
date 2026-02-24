export async function getEbayAccessToken() {
  const base =
    process.env.EBAY_ENVIRONMENT === "production"
      ? "https://api.ebay.com"
      : "https://api.sandbox.ebay.com";

  const credentials = Buffer.from(
    `${process.env.EBAY_CLIENT_ID}:${process.env.EBAY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${base}/identity/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
  });

  const data = await res.json();
  return data.access_token;
}
