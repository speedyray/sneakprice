// Hourly cron: writes one MarketSnapshot per catalog symbol. Auth pattern
// matches /api/cron/scan-deals — accepts secret as ?secret= query param OR
// Authorization: Bearer <CRON_SECRET> header. Triggered by the
// .github/workflows/exchange-capture.yml workflow.

import { NextResponse } from "next/server";
import { captureSnapshots } from "@/lib/exchange/capture";
import { aggregateIndexes } from "@/lib/exchange/aggregate";
import { evaluateAlerts } from "@/lib/exchange/alerts";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(req: Request) {
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

  try {
    const capture = await captureSnapshots();
    const aggregate = await aggregateIndexes();
    const alerts = await evaluateAlerts();
    return NextResponse.json({ capture, aggregate, alerts });
  } catch (err) {
    console.error("[/api/cron/exchange-capture] failed:", err);
    return NextResponse.json(
      {
        error: "capture-failed",
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
