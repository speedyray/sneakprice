import "server-only";
// lib/scan-rate-limit.ts
// Checks and atomically increments the daily scan count for a registered user.
// Uses a Postgres function to avoid race conditions on concurrent requests.
// Returns { allowed, remaining } — call this before making any eBay API calls.

import { createClient } from "@supabase/supabase-js";

const DAILY_SCAN_LIMIT = 3;

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase env vars in scan-rate-limit");
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export interface ScanLimitResult {
  allowed: boolean;
  remaining: number;
}

export async function checkAndIncrementScanLimit(
  userId: string,
  ip: string
): Promise<ScanLimitResult> {
  const { data, error } = await supabase.rpc("increment_scan_usage", {
    p_user_id: userId,
    p_ip: ip,
    p_limit: DAILY_SCAN_LIMIT,
  });

  if (error || !data) {
    // Fail open on DB error — a transient outage shouldn't block legitimate users.
    // Accepted trade-off: prefer UX over strict enforcement during downtime.
    console.error("[scan-rate-limit] rpc error:", error?.message);
    return { allowed: true, remaining: DAILY_SCAN_LIMIT };
  }

  return {
    allowed: data.allowed as boolean,
    remaining: data.remaining as number,
  };
}
