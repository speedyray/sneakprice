# Scan Rate Limiting — Design Spec

**Date:** 2026-04-07
**Status:** Approved

## Overview

Limit the "Scan a Shoe" feature (`/api/ebay`) to 2 free scans per day per registered user. Anonymous users are blocked entirely and prompted to sign in. Registered users who hit the limit see an error message and upgrade options. Counts are tracked in Supabase and reset daily.

---

## Data Model

New table `scan_usage` in Supabase:

| column | type | notes |
|---|---|---|
| `id` | uuid | primary key, auto-generated |
| `user_id` | text | Clerk user ID |
| `ip` | text | request IP address |
| `scan_date` | date | UTC date of scan |
| `count` | int | number of scans today, default 1 |

**Unique constraint:** `(user_id, scan_date)` — one row per user per day.
**Index:** `(ip, scan_date)` — for future IP abuse detection.

The table is created directly in Supabase (no Prisma migration needed since it's a simple operational table used via the Supabase client).

---

## Rate Limit Helper

**File:** `lib/scan-rate-limit.ts`

Single exported function:

```ts
checkAndIncrementScanLimit(userId: string, ip: string): Promise<{ allowed: boolean; remaining: number }>
```

**Logic:**
1. Upsert into `scan_usage` on conflict `(user_id, scan_date)`:
   - On insert: `count = 1`
   - On conflict: `count = count + 1` (only if count < limit, to avoid runaway increments)
2. Read back the resulting `count`
3. If `count > 2`: return `{ allowed: false, remaining: 0 }`
4. If `count <= 2`: return `{ allowed: true, remaining: 2 - count }`

**Daily limit constant:** `DAILY_SCAN_LIMIT = 2` — easy to change later.

Uses the Supabase service role client (already used in `/api/ebay`).

---

## API Changes — `/api/ebay`

Add at the top of the `POST` handler, before any eBay API calls:

1. Call `auth()` from `@clerk/nextjs/server` to get `userId`
2. If no `userId`: return `401 { error: "unauthenticated" }`
3. Extract client IP from `x-forwarded-for` header (falls back to `"unknown"`)
4. Call `checkAndIncrementScanLimit(userId, ip)`
5. If `!allowed`: return `403 { error: "limit_reached", remaining: 0 }`
6. On success: include `remaining` in the existing response payload

```ts
return NextResponse.json({
  activeMarket: activeStats,
  soldMarket: soldStats,
  deal,
  remaining,  // ← new field
});
```

---

## Frontend Changes — Scan Modal (`app/discover/page.tsx`)

### New state
```ts
const [scansRemaining, setScansRemaining] = useState<number | null>(null);
```

### Response handling in `handleScanModel`

| API response | UI behaviour |
|---|---|
| `401` | Show "Sign in to scan sneakers" + `[Sign In]` button (Clerk `openSignIn()`) |
| `403 limit_reached` | Show limit message + two action buttons (see below) |
| Success | Update `scansRemaining` from `response.remaining`; show deal card |

### Limit reached UI (replaces modal error text)

```
You've used your 2 free scans today.

[Come back tomorrow]   [Upgrade for unlimited scans]
```

- **Come back tomorrow** — dismisses the modal
- **Upgrade for unlimited scans** — links to `/pricing` (or wherever the upgrade page lives)

### Scans remaining indicator

Inside the modal form, below the search input, while scans are still available:

```
X scans remaining today
```

Shown only when `scansRemaining !== null`. Updated after each successful scan.

---

## Out of Scope

- IP-only rate limiting (IP is stored for future abuse detection but not enforced independently)
- Paid tier enforcement (upgrade link is a placeholder; billing is a separate spec)
- `/api/live-deals-stream` rate limiting (lower priority; no eBay quota cost)
