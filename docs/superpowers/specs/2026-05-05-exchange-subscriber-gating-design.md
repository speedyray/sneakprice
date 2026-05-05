# Exchange Subscriber Gating — Design Spec

**Date:** 2026-05-05
**Status:** Draft (pending owner review)
**Phase:** Phase 1 step 8 of `project_bloomberg_exchange.md`

## Overview

Add subscriber gating to `/exchange` so non-paying visitors see a useful preview while paid users get the full live trading terminal. Tiers live in Clerk `publicMetadata` and are mirrored to a new `User.subscriptionTier` Prisma column. No payment provider is wired in this epic — paid users are flipped manually via the Clerk dashboard, with `mailto:` upgrade buttons on a new `/pricing` page. Stripe wiring, Premium / Power Seller feature gates, and global per-IP rate-limit floors are explicit follow-ups.

---

## Tier Definitions

Four tiers exist in the schema; only **FREE** vs **paid** is enforced behaviorally in this epic.

| Tier | Price (future) | Behavior in this epic |
|---|---|---|
| `FREE` | $0 | Default for every signed-in user. Email signup via Clerk required. |
| `PRO` | $5–$10/mo | Lifts FREE deal-feed cap, scanner per-account cap, and alert-rule cap. |
| `PREMIUM` | $15–$25/mo | Treated as PRO in this epic. Real feature deltas land in a follow-up. |
| `POWER_SELLER` | $30–$50/mo | Treated as PRO in this epic. Real feature deltas land in a follow-up. |

**Anonymous** (no Clerk session) is treated as a non-tier — hard-walled from dynamic per-listing endpoints; sees indexes + marketing only.

---

## Data Model

New Prisma enum and `User` field:

```prisma
enum SubscriptionTier {
  FREE
  PRO
  PREMIUM
  POWER_SELLER
}

model User {
  // ...existing fields
  subscriptionTier SubscriptionTier @default(FREE)
}
```

**Source of truth:** Clerk `publicMetadata.subscriptionTier` (string, validated against the enum).
**Mirror:** the `User.subscriptionTier` column. Reconciled on every `getCurrentDbUser()` call — same idempotent pattern as the existing admin-promotion logic at `lib/current-user.ts:144-167`. If Clerk metadata is set and differs from the DB row, the DB row is updated to match Clerk before being returned.

**Default for existing users:** every existing `User` row defaults to `FREE` after the migration. No backfill needed. The owner's account and any early test users are flipped to `PRO` by setting `publicMetadata.subscriptionTier = "PRO"` in the Clerk dashboard; the next page load reconciles the DB row.

**Why not pre-add `stripeCustomerId` / `subscriptionEndsAt` columns:** YAGNI. Those columns ship with the Stripe Checkout follow-up; adding them now creates dead schema surface that must be maintained without any consumer.

---

## Tier Resolution Helper

**New file:** `lib/subscription.ts` (server-only).

```ts
import "server-only";
import { getCurrentDbUser } from "@/lib/current-user";

export type SubscriptionTier = "FREE" | "PRO" | "PREMIUM" | "POWER_SELLER";

export const PAID_TIERS: SubscriptionTier[] = ["PRO", "PREMIUM", "POWER_SELLER"];

export function isPaid(tier: SubscriptionTier | null | undefined): boolean {
  return tier ? PAID_TIERS.includes(tier) : false;
}

export function normalizeTier(value: unknown): SubscriptionTier | null {
  if (typeof value !== "string") return null;
  const upper = value.trim().toUpperCase();
  return (PAID_TIERS as string[]).includes(upper) || upper === "FREE"
    ? (upper as SubscriptionTier)
    : null;
}

export async function getCurrentTier(): Promise<SubscriptionTier> {
  const user = await getCurrentDbUser();
  return user?.subscriptionTier ?? "FREE";
}
```

**Reconciliation in `lib/current-user.ts`:** tier reconciliation lives alongside the existing admin-promotion logic. Both code paths that return an existing user — the `clerkUserId`-match branch (lines 143-168) and the email-match branch (lines 186-220) — must apply the same reconciliation.

Strategy: compute `clerkTier` once near the top alongside `shouldBeAdmin`. If either `shouldBeAdmin` or the tier mismatch needs a write, perform a single `prisma.user.update` that updates the relevant fields and returns the row. If neither needs a write, return `existingUser` unchanged.

Pseudocode for the `clerkUserId`-match branch:

```ts
const clerkTier = normalizeTier(
  (clerkUser?.publicMetadata as Record<string, unknown> | undefined)?.subscriptionTier
);
const tierMismatch = clerkTier && existingUser.subscriptionTier !== clerkTier;
const adminMismatch = shouldBeAdmin && existingUser.role !== "ADMIN";

if (tierMismatch || adminMismatch) {
  return prisma.user.update({
    where: { id: existingUser.id },
    data: {
      ...(adminMismatch ? { role: "ADMIN" } : {}),
      ...(tierMismatch ? { subscriptionTier: clerkTier! } : {}),
    },
    include: { sellerProfile: true, buyerProfile: true },
  });
}
```

`normalizeTier()` returns `null` for missing or unrecognized values, leaving the DB column untouched. This avoids accidental downgrades when Clerk metadata is unset.

**No client-side tier checks.** The client receives only data the server has already filtered. This is the only way to prevent DevTools / direct API leaks.

---

## UI Gates

### `app/exchange/page.tsx`

Becomes async, loads tier server-side, passes a single `tier` prop:

```tsx
import { getCurrentTier } from "@/lib/subscription";
import SneakerExchange from "@/components/exchange/SneakerExchange";

export default async function SneakerExchangePage() {
  const tier = await getCurrentTier();
  return <SneakerExchange tier={tier} />;
}
```

### `components/exchange/SneakerExchange.tsx`

Already a client component. Accepts `tier: SubscriptionTier` as a prop. Per-feature behavior:

| Feature | Anonymous | FREE | Paid (PRO+) |
|---|---|---|---|
| Index cards (5 SPX-*) | full | full | full |
| Deal feed | "Sign in to view live deals" CTA — no API call | top 3 + locked teaser rows | full (30) |
| Scanner box | "Sign in to scan" CTA replaces input | full (3/day/IP cap) | full (per-account cap lifted) |
| Alerts CTA tile | links to `/exchange/alerts` (login-gated) | links to `/exchange/alerts` (3 cap) | links to `/exchange/alerts` (unlimited) |

**Deal-feed teaser:** server returns 3 real rows for FREE plus 5 placeholder rows shaped as `{ locked: true }` (no real fields). Client renders the locked rows with blurred text and a single "Unlock full feed →" overlay button → `/pricing#pro`. Anonymous users see no rows at all — only the sign-in CTA — because they cannot call the endpoint.

**Visual lock cue:** small `PRO` pill badge on locked tiles. No marketing modal — keeps the page feeling like a working terminal.

### `app/exchange/alerts/page.tsx`

The hard-coded `FREE_TIER_RULE_CAP = 3` becomes tier-aware:

```ts
import { isPaid } from "@/lib/subscription";

const FREE_TIER_RULE_CAP = 3;
const ruleCap = isPaid(user.subscriptionTier) ? Infinity : FREE_TIER_RULE_CAP;
```

When a FREE user hits the cap, the existing in-page error message gains a "Need more? Go PRO →" inline link to `/pricing#pro`.

---

## API Gates

### `/api/exchange/deals` (`app/api/exchange/deals/route.ts`)

```ts
import { getCurrentDbUser } from "@/lib/current-user";
import { isPaid } from "@/lib/subscription";

export async function GET(req: Request) {
  const user = await getCurrentDbUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  const tier = user.subscriptionTier;
  const FREE_DEAL_CAP = 3;
  const userCap = isPaid(tier) ? TAKE_MAX : FREE_DEAL_CAP;
  // existing index filter + take-clamp logic, but final slice clamped to `userCap`

  return NextResponse.json({ tier, deals: rows });
}
```

The response now includes `tier` so the client knows whether to render locked teaser rows below the live data without a second roundtrip.

### `/api/market` (scanner)

Wrap the existing handler with auth + tier check at the top:

```ts
const user = await getCurrentDbUser();
if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });

if (!isPaid(user.subscriptionTier)) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { allowed } = await checkAndIncrementScanLimit(user.clerkUserId, ip);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limit" }, { status: 429 });
  }
}
// existing scanner logic
```

`checkAndIncrementScanLimit` (already shipped at `lib/scan-rate-limit.ts:25`) is unchanged. PAID tiers simply skip the call. The IP-extraction one-liner mirrors the existing pattern at `app/api/ebay/route.ts:37`; if a third callsite is added later, this should be promoted to a shared helper at that point — not preemptively in this epic.

### `/api/indexes`

No change. Stays public. Indexes are aggregate, low-resolution, and cacheable.

### `/api/exchange/alerts/*`

Already login-gated by `middleware.ts`. The cap-enforcement logic in the route handler now uses `isPaid()` instead of the hard-coded `FREE_TIER_RULE_CAP`.

### `middleware.ts`

No change. Per-route `getCurrentDbUser()` checks are clearer than middleware-side tier rules and let each route choose how to fail (401 JSON vs redirect).

### Defense-in-depth

- UI hides locked features → cosmetic only.
- API returns 401 for anonymous and truncates payload by tier → real enforcement.
- DB column = source of truth → admin / future Stripe webhook writes here.

---

## `/pricing` Page

**New page:** `app/pricing/page.tsx`. Public, server component, ~150 LOC.

Renders the four-tier table with **price ranges visible** (the owner is still pricing-discovering; ranges look honest, not hand-wavy):

| Tier | Price | One-line value |
|---|---|---|
| Free | $0 | 3 scans/day, basic identification, basic price display |
| Pro | $5–$10/mo | Unlimited scans, price history, trend indicators, over/undervalued signals |
| Premium | $15–$25/mo | Resale predictions, flip alerts, early trend detection |
| Power Seller | $30–$50/mo | Bulk scanning, inventory tracking, profit analytics |

**Upgrade CTAs:** all three paid cards call the same handler — a `mailto:` link constructed from a single TypeScript constant, e.g.

```ts
export const UPGRADE_HANDLER = (tier: "PRO" | "PREMIUM" | "POWER_SELLER") =>
  `mailto:speedyray2ray@gmail.com?subject=SneakPrice%20${tier}%20Upgrade%20Request&body=Tier%3A%20${tier}`;
```

The Stripe follow-up replaces this single export with a `<form action="/api/checkout">` POST.

**SEO:** standard metadata, indexable. No `robots: noindex`.

**Internal links into `/pricing`:**

- Locked deal-feed teaser rows → `/pricing#pro`.
- Alerts cap-hit message → `/pricing#pro`.
- Anonymous scanner CTA → `/sign-in?redirect_url=/exchange` (sign in first; upgrade prompts come later, after the user is FREE).

---

## Testing Strategy

**Unit (`lib/subscription.ts`):**
- `isPaid()` truth table across `FREE`, `PRO`, `PREMIUM`, `POWER_SELLER`, `null`, `undefined`, junk strings.
- `normalizeTier()` rejects unknown values; uppercases mixed case; trims whitespace.

**Integration (`lib/current-user.ts`):**
- Clerk metadata `subscriptionTier: "PRO"` + DB row `FREE` → returned user has `subscriptionTier: "PRO"` AND DB row is updated. Same fixture style as the existing admin-promotion test path.
- Missing Clerk metadata → DB row left untouched.
- Junk Clerk metadata (`subscriptionTier: "GOLD"`) → DB row left untouched.

**Route tests:**
- `GET /api/exchange/deals` returns 401 for anonymous; ≤3 rows for FREE; full rows for PRO; response payload includes `tier`.
- `GET /api/market` returns 401 for anonymous; FREE path consumes the existing scan quota; PRO path bypasses it.

**Manual smoke test before merge:**
1. Sign in as the owner; confirm `/exchange` shows the FREE preview (3 deals + locked teasers).
2. Set `publicMetadata.subscriptionTier = "PRO"` in the Clerk dashboard; reload `/exchange`; confirm full deal feed and no locked teasers.
3. Flip back to `"FREE"`; reload; confirm the wall returns.
4. Hit `/api/exchange/deals` directly while signed out — confirm 401.
5. Hit `/api/market` directly while signed out — confirm 401.

---

## Future Direction (Non-Binding Appendix)

The four-tier roadmap below is captured for design continuity but is explicitly **not shipped in this epic**. No code in this epic checks for `PREMIUM` or `POWER_SELLER` distinct from `PRO`.

**Free Tier (Growth engine)**
- 3–5 free scans/day
- Basic identification
- Basic price display

**Pro Tier (~$5–$10/month)**
- Unlimited scans
- Price history charts
- Trend indicators
- Over/undervalued signals

**Premium Tier (~$15–$25/month)**
- Resale predictions
- Flip opportunities
- Smart alerts: "this sneaker just dropped in price", "early trend detection"

**Power Seller Tier (~$30–$50/month)**
- Bulk scanning
- Inventory tracking
- Profit analytics

When these tiers ship, behavior gates use the existing `subscriptionTier` column with new `is*Plus()` helpers in `lib/subscription.ts`.

---

## Follow-Up Tickets

1. **Stripe Checkout integration** — replace `mailto:` upgrade handler. Adds `stripeCustomerId`, `stripeSubscriptionId`, `subscriptionEndsAt` columns. Webhook writes to both Clerk metadata and DB column.
2. **3/min/IP global rate-limit floor** — applies to `/api/market` and `/api/exchange/deals` regardless of tier; layered above existing per-account quotas.
3. **FingerprintJS browser fingerprinting** — backstops the IP rate-limit against VPN-hoppers.
4. **Premium / Power Seller feature wiring** — gate prediction signals, bulk scanning, inventory analytics behind the new tier checks once those features exist.
5. **Admin tier-flip UI** — small page in `/admin` to toggle a user's `subscriptionTier` without leaving the app.

---

## Out of Scope (Explicit Non-Goals)

- Stripe Checkout / webhook / actual billing.
- Premium and Power Seller behavior gates beyond the enum value existing.
- 3/min/IP and FingerprintJS abuse layers.
- Any admin UI for flipping tiers.
- Index history charts, portfolio, predictive signals (deferred elsewhere; gated by data history, not by this epic).
