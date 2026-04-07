// app/api/cron/scan-deals/route.ts
// Background job that scans the watchlist every 20 minutes.
// Protected by CRON_SECRET query param — matches pattern in generate-daily-drafts.

import { NextResponse } from "next/server";
import { WATCHLIST } from "@/lib/watchlist";
import { runDealPipeline } from "@/lib/deal-pipeline";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 min max (Vercel Pro)

export async function GET(req: Request) {
  // Auth check — same pattern as generate-daily-drafts
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  const isAuthorized =
    !!cronSecret &&
    (secret === cronSecret || authHeader === `Bearer ${cronSecret}`);

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Mark deals older than 24h as inactive before scanning
  await prisma.deal.updateMany({
    where: {
      isActive: true,
      expiresAt: { lt: new Date() },
    },
    data: { isActive: false },
  });

  const results = [];
  let totalSaved = 0;

  // Scan each model sequentially to avoid rate-limiting scrapers
  for (const modelName of WATCHLIST) {
    try {
      const result = await runDealPipeline(modelName);
      results.push(result);
      totalSaved += result.dealsSaved;

      // 1-second pause between models to be polite to external APIs
      await new Promise((r) => setTimeout(r, 1000));
    } catch {
      results.push({ modelName, dealsFound: 0, dealsSaved: 0, error: true });
    }
  }

  return NextResponse.json({
    success: true,
    scanned: WATCHLIST.length,
    totalDealsSaved: totalSaved,
    results,
  });
}
