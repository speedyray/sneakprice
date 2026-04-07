// lib/scan-rate-limit.ts
// Checks and increments the daily scan count for a registered user.
// Returns { allowed, remaining } — call this before making any eBay API calls.

import { createClient } from "@supabase/supabase-js";

const DAILY_SCAN_LIMIT = 3;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface ScanLimitResult {
  allowed: boolean;
  remaining: number;
}

export async function checkAndIncrementScanLimit(
  userId: string,
  ip: string
): Promise<ScanLimitResult> {
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  // First check current count without incrementing
  const { data: existing } = await supabase
    .from("scan_usage")
    .select("count")
    .eq("user_id", userId)
    .eq("scan_date", today)
    .single();

  const currentCount = existing?.count ?? 0;

  if (currentCount >= DAILY_SCAN_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  // Safe to increment — upsert atomically
  const { data, error } = await supabase
    .from("scan_usage")
    .upsert(
      { user_id: userId, ip, scan_date: today, count: currentCount + 1 },
      { onConflict: "user_id,scan_date" }
    )
    .select("count")
    .single();

  if (error || !data) {
    // On DB error, fail open — don't block the user
    console.error("[scan-rate-limit] upsert error:", error?.message);
    return { allowed: true, remaining: DAILY_SCAN_LIMIT - currentCount - 1 };
  }

  const newCount = data.count as number;
  return {
    allowed: newCount <= DAILY_SCAN_LIMIT,
    remaining: Math.max(0, DAILY_SCAN_LIMIT - newCount),
  };
}
