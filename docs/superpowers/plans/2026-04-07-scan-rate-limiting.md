# Scan Rate Limiting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Limit the "Scan a Shoe" feature to 3 free scans per day for registered users only, blocking anonymous users entirely.

**Architecture:** A `scan_usage` Supabase table tracks (user_id, scan_date, count) per day. A helper `lib/scan-rate-limit.ts` encapsulates all limit logic. `/api/ebay` checks Clerk auth and calls the helper before making any eBay API calls. The frontend modal handles 401/403 responses with specific UI states.

**Tech Stack:** Next.js App Router, Clerk (`@clerk/nextjs/server`), Supabase JS client, TypeScript

---

### Task 1: Create `scan_usage` table in Supabase

**Files:**
- No files — run SQL directly in Supabase SQL Editor

- [ ] **Step 1: Open Supabase SQL Editor**

Go to your Supabase project → SQL Editor → New query.

- [ ] **Step 2: Run the table creation SQL**

```sql
CREATE TABLE IF NOT EXISTS scan_usage (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     text NOT NULL,
  ip          text NOT NULL DEFAULT 'unknown',
  scan_date   date NOT NULL DEFAULT CURRENT_DATE,
  count       int  NOT NULL DEFAULT 1,
  CONSTRAINT scan_usage_user_date_unique UNIQUE (user_id, scan_date)
);

CREATE INDEX IF NOT EXISTS scan_usage_ip_date_idx ON scan_usage (ip, scan_date);
```

- [ ] **Step 3: Verify the table exists**

Run in SQL Editor:
```sql
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'scan_usage'
ORDER BY ordinal_position;
```

Expected output: 5 rows — `id`, `user_id`, `ip`, `scan_date`, `count`.

- [ ] **Step 4: Commit a note**

```bash
git commit --allow-empty -m "chore: scan_usage table created in Supabase (manual SQL)"
```

---

### Task 2: Create rate limit helper

**Files:**
- Create: `lib/scan-rate-limit.ts`

- [ ] **Step 1: Create the file**

```typescript
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
```

- [ ] **Step 2: Verify it type-checks**

```bash
npx tsc --noEmit
```

Expected: no errors related to `scan-rate-limit.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/scan-rate-limit.ts
git commit -m "feat: add scan rate limit helper (3 scans/day per user)"
```

---

### Task 3: Add auth + rate limit check to `/api/ebay`

**Files:**
- Modify: `app/api/ebay/route.ts`

- [ ] **Step 1: Replace the top of `route.ts` with auth + rate limit guard**

Replace the existing `export async function POST(req: Request)` opening with:

```typescript
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getEbayAccessToken } from "@/lib/ebay";
import { createClient } from "@supabase/supabase-js";
import { checkAndIncrementScanLimit } from "@/lib/scan-rate-limit";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ... (keep median and average helpers unchanged) ...

export async function POST(req: Request) {
  // 1. Require authentication
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "unauthenticated" },
      { status: 401 }
    );
  }

  // 2. Extract IP (Vercel sets x-forwarded-for)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  // 3. Check + increment rate limit
  const { allowed, remaining } = await checkAndIncrementScanLimit(userId, ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "limit_reached", remaining: 0 },
      { status: 403 }
    );
  }

  const { query } = await req.json();
  // ... rest of handler unchanged ...
```

- [ ] **Step 2: Add `remaining` to the final response**

Find the `return NextResponse.json({...})` at the bottom of the handler and add `remaining`:

```typescript
return NextResponse.json({
  activeMarket: activeStats,
  soldMarket: soldStats,
  deal,
  remaining,
});
```

- [ ] **Step 3: Verify it type-checks**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Test anonymous request is blocked**

With the dev server running (`npm run dev`):

```bash
curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/ebay \
  -H "Content-Type: application/json" \
  -d '{"query":"Air Jordan 4"}'
```

Expected: `401`

- [ ] **Step 5: Commit**

```bash
git add app/api/ebay/route.ts
git commit -m "feat: require auth and enforce 3 scan/day rate limit on /api/ebay"
```

---

### Task 4: Update scan modal UI

**Files:**
- Modify: `app/discover/page.tsx`

- [ ] **Step 1: Add `scansRemaining` state**

Find the existing state declarations near line 163 and add:

```typescript
const [scansRemaining, setScansRemaining] = useState<number | null>(null);
```

- [ ] **Step 2: Update `handleScanModel` to handle 401 and 403**

Replace the existing `try/catch` inside `handleScanModel` with:

```typescript
try {
  const ebayRes = await fetch("/api/ebay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: scanQuery }),
  });

  if (ebayRes.status === 401) {
    setScanModalError("unauthenticated");
    return;
  }

  if (ebayRes.status === 403) {
    setScanModalError("limit_reached");
    return;
  }

  const ebayData = await ebayRes.json();

  if (ebayData.deal) {
    if (ebayData.remaining !== undefined) {
      setScansRemaining(ebayData.remaining);
    }
    const newDeal: ArbDeal = {
      id: `scan-${Date.now()}`,
      sneaker: scanQuery,
      buyPlatform: "ebay",
      buyPrice: ebayData.deal.buyPrice,
      buyUrl: ebayData.deal.cheapestItemId
        ? `https://www.ebay.com/itm/${ebayData.deal.cheapestItemId}`
        : `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(scanQuery)}`,
      sellPlatform: "ebay",
      sellPrice: ebayData.deal.marketPrice,
      sellUrl: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(scanQuery)}`,
      netProfit: ebayData.deal.profit,
      profitMargin: ebayData.deal.roi,
      dealLabel:
        ebayData.deal.roi >= 30
          ? "hot"
          : ebayData.deal.roi >= 15
          ? "good"
          : "watch",
      created_at: new Date().toISOString(),
    };
    setArbDeals((prev) => [newDeal, ...prev].slice(0, 50));
    setIsScanModalOpen(false);
  } else {
    setScanModalError(
      "No arbitrage opportunity found for this model right now."
    );
  }
} catch {
  setScanModalError("Scan failed. Please try again.");
} finally {
  setIsScanningModel(false);
}
```

- [ ] **Step 3: Replace the modal error rendering with state-specific UI**

Find where `scanModalError` is rendered in the modal JSX and replace it with:

```tsx
{scanModalError === "unauthenticated" && (
  <div className="text-center space-y-3 py-2">
    <p className="text-white font-semibold">Sign in to scan sneakers</p>
    <p className="text-gray-400 text-sm">Create a free account to get 3 scans per day.</p>
    <button
      onClick={() => openSignIn()}
      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-xl transition-colors"
    >
      Sign In
    </button>
  </div>
)}

{scanModalError === "limit_reached" && (
  <div className="text-center space-y-3 py-2">
    <p className="text-white font-semibold">You&apos;ve used your 3 free scans today</p>
    <p className="text-gray-400 text-sm">Your scans reset at midnight UTC.</p>
    <div className="flex gap-2">
      <button
        onClick={() => setIsScanModalOpen(false)}
        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-xl transition-colors"
      >
        Come back tomorrow
      </button>
      <a
        href="/pricing"
        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-xl transition-colors text-center"
      >
        Upgrade
      </a>
    </div>
  </div>
)}

{scanModalError && scanModalError !== "unauthenticated" && scanModalError !== "limit_reached" && (
  <p className="text-red-400 text-sm text-center">{scanModalError}</p>
)}
```

- [ ] **Step 4: Add scans remaining indicator inside the modal form**

Below the search input (before the submit button), add:

```tsx
{scansRemaining !== null && (
  <p className="text-gray-500 text-xs text-center">
    {scansRemaining} scan{scansRemaining !== 1 ? "s" : ""} remaining today
  </p>
)}
```

- [ ] **Step 5: Add `openSignIn` import**

Ensure `useClerk` is imported at the top of the file and destructure `openSignIn`:

```typescript
import { useUser, useClerk } from "@clerk/nextjs";
// ...inside the component:
const { openSignIn } = useClerk();
```

- [ ] **Step 6: Verify it type-checks**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Manual browser test — anonymous user**

1. Sign out of the app
2. Open the "Scan a Shoe" modal
3. Type any sneaker name and submit
4. Expected: "Sign in to scan sneakers" UI appears with Sign In button

- [ ] **Step 8: Manual browser test — rate limit**

1. Sign in
2. Scan 3 sneakers successfully — after each, confirm remaining count decrements
3. On the 4th scan attempt:
   Expected: "You've used your 3 free scans today" UI with both buttons

- [ ] **Step 9: Commit**

```bash
git add app/discover/page.tsx
git commit -m "feat: update scan modal for auth gate and rate limit UI"
```

---

### Task 5: Reset state when modal closes

**Files:**
- Modify: `app/discover/page.tsx`

- [ ] **Step 1: Reset `scanModalError` when modal is opened**

Find where `setIsScanModalOpen(true)` is called and add a reset alongside it:

```typescript
setScanModalError("");
setScanQuery("");
```

This ensures re-opening the modal doesn't show a stale error from a previous session.

- [ ] **Step 2: Commit**

```bash
git add app/discover/page.tsx
git commit -m "fix: reset scan modal error state on open"
```
