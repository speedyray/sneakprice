import { NextResponse } from "next/server";
import { getEbayAccessToken } from "@/lib/ebay";

export async function POST(req: Request) {
  const { query } = await req.json();

  const base =
    process.env.EBAY_ENVIRONMENT === "production"
      ? "https://api.ebay.com"
      : "https://api.sandbox.ebay.com";

  const token = await getEbayAccessToken();
   
    console.log("ACCESS TOKEN:", token);

  const res = await fetch(
    `${base}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
      query
    )}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}

