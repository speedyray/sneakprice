# Exchange Subscriber Gating Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gate `/exchange` so anonymous users see indexes + marketing only, FREE users see a top-3 deal preview + scanner with the existing 3/day cap, and paid users get the full live trading terminal. Source of truth = Clerk `publicMetadata.subscriptionTier`; mirror = a new `User.subscriptionTier` Prisma column. Manual tier flips via Clerk dashboard; `/pricing` page with `mailto:` upgrade buttons. Stripe is a deferred follow-up.

**Architecture:** Reconciliation pattern — `getCurrentDbUser()` reads Clerk metadata and writes through to the DB column on every request, mirroring the existing `role: ADMIN` promotion at `lib/current-user.ts:144-167`. Server pages and API routes read `subscriptionTier` directly off the DB user row they're already loading. Client never sees data the server hasn't filtered. The existing scan-quota helper `checkAndIncrementScanLimit()` is unchanged; PAID tiers simply skip the call.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Prisma 7 + Postgres (Supabase), Clerk for auth/metadata, existing Supabase RPC for scan rate-limit. No new dependencies.

**Verification approach:** This repo has no test framework. Unit-like checks ship as a `tsx`-runnable smoke script (matches the pattern of `scripts/check-dependency-policy.mjs`). Route checks use `curl` against `npm run dev`. Integration / reconciliation behavior is verified by manual smoke after deploy: flipping Clerk metadata and observing the DB column reconcile on the next page load.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `prisma/schema.prisma` | Modify | Add `SubscriptionTier` enum + `User.subscriptionTier` column |
| `lib/subscription.ts` | Create | Tier types, `PAID_TIERS`, `isPaid()`, `normalizeTier()`, `getCurrentTier()` |
| `lib/current-user.ts` | Modify | Tier reconciliation in both existing-user return branches |
| `app/api/exchange/deals/route.ts` | Modify | Require auth; truncate to 3 for FREE; return `tier` in response |
| `app/api/market/route.ts` | Modify | Require auth; bypass scan quota for paid tiers |
| `app/api/exchange/alerts/route.ts` | Modify | Replace hard-coded `FREE_TIER_RULE_CAP` with `isPaid()`-aware cap |
| `app/exchange/alerts/page.tsx` | Modify | Pass tier-aware cap; upgrade hint on cap-hit |
| `app/exchange/page.tsx` | Modify | Become async; load tier server-side; pass to `SneakerExchange` |
| `components/exchange/SneakerExchange.tsx` | Modify | Accept `tier` prop; replace fake `isPro` flag; tighten preview slice 2 → 3; sign-in CTAs for anonymous; `/pricing#pro` upgrade links |
| `app/pricing/page.tsx` | Create | Four-tier pricing table; `mailto:` upgrade handler; SEO-indexable |
| `scripts/test-subscription.mjs` | Create | Standalone smoke for `isPaid()` + `normalizeTier()` |

---

## Task 1: Prisma schema — `SubscriptionTier` enum + `User.subscriptionTier`

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add the enum block**

Open `prisma/schema.prisma`. After the existing `enum SneakerCondition { ... }` block (around line 51-55), add:

```prisma
enum SubscriptionTier {
  FREE
  PRO
  PREMIUM
  POWER_SELLER
}
```

- [ ] **Step 2: Add the `User.subscriptionTier` column**

In the `model User { ... }` block (starts at line 57), add the new field directly after `role`:

```prisma
model User {
  id          String   @id @default(cuid())
  clerkUserId String   @unique
  email       String   @unique
  username    String?  @unique
  firstName   String?
  lastName    String?
  imageUrl    String?
  role        UserRole @default(BUYER)
  subscriptionTier SubscriptionTier @default(FREE)
  isSeller    Boolean  @default(false)
  // ... rest unchanged
```

- [ ] **Step 3: Regenerate Prisma client**

Run:

```bash
npx prisma generate
```

Expected: `✔ Generated Prisma Client (...) in N ms`. The new field is now visible to TypeScript.

- [ ] **Step 4: Push schema to dev/prod database**

Per `project_arbitrage_engine.md` and `project_bloomberg_exchange.md` (commit `7705316`), `prisma db push` requires the migration URL (port 5432, not the pooler 6543). Run:

```bash
npx prisma db push
```

Expected: `🚀  Your database is now in sync with your Prisma schema.` All existing User rows automatically populate `subscriptionTier = 'FREE'` because of the `@default`.

- [ ] **Step 5: Commit**

```bash
git add prisma/schema.prisma
git commit -m "Add SubscriptionTier enum and User.subscriptionTier column"
```

---

## Task 2: Create `lib/subscription.ts`

**Files:**
- Create: `lib/subscription.ts`

- [ ] **Step 1: Create the file**

Create `lib/subscription.ts` with the full content:

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
  if (upper === "FREE") return "FREE";
  if ((PAID_TIERS as string[]).includes(upper)) {
    return upper as SubscriptionTier;
  }
  return null;
}

export async function getCurrentTier(): Promise<SubscriptionTier> {
  const user = await getCurrentDbUser();
  return user?.subscriptionTier ?? "FREE";
}
```

- [ ] **Step 2: Type-check**

Run:

```bash
npx tsc --noEmit
```

Expected: zero errors. (If "Cannot find name 'SubscriptionTier'" appears, Task 1 step 3 was skipped — re-run `npx prisma generate`.)

- [ ] **Step 3: Commit**

```bash
git add lib/subscription.ts
git commit -m "Add subscription tier helpers (isPaid, normalizeTier, getCurrentTier)"
```

---

## Task 3: Add a smoke script for tier helpers

**Files:**
- Create: `scripts/test-subscription.mjs`

- [ ] **Step 1: Create the smoke script**

Create `scripts/test-subscription.mjs`:

```js
// Standalone smoke for lib/subscription.ts pure helpers.
// Run: node scripts/test-subscription.mjs
//
// Note: this file inlines the helper logic on purpose — lib/subscription.ts
// is `server-only` and imports getCurrentDbUser, which can't run outside Next.
// If the helpers in lib/subscription.ts change, mirror them here.

const PAID_TIERS = ["PRO", "PREMIUM", "POWER_SELLER"];

function isPaid(tier) {
  return tier ? PAID_TIERS.includes(tier) : false;
}

function normalizeTier(value) {
  if (typeof value !== "string") return null;
  const upper = value.trim().toUpperCase();
  if (upper === "FREE") return "FREE";
  if (PAID_TIERS.includes(upper)) return upper;
  return null;
}

const cases = [
  // [label, fn, args, expected]
  ["isPaid('FREE') -> false", isPaid, ["FREE"], false],
  ["isPaid('PRO') -> true", isPaid, ["PRO"], true],
  ["isPaid('PREMIUM') -> true", isPaid, ["PREMIUM"], true],
  ["isPaid('POWER_SELLER') -> true", isPaid, ["POWER_SELLER"], true],
  ["isPaid(null) -> false", isPaid, [null], false],
  ["isPaid(undefined) -> false", isPaid, [undefined], false],
  ["isPaid('GOLD') -> false", isPaid, ["GOLD"], false],

  ["normalizeTier('pro') -> 'PRO'", normalizeTier, ["pro"], "PRO"],
  ["normalizeTier(' Free ') -> 'FREE'", normalizeTier, [" Free "], "FREE"],
  ["normalizeTier('GOLD') -> null", normalizeTier, ["GOLD"], null],
  ["normalizeTier(42) -> null", normalizeTier, [42], null],
  ["normalizeTier(undefined) -> null", normalizeTier, [undefined], null],
  ["normalizeTier('POWER_SELLER') -> 'POWER_SELLER'", normalizeTier, ["POWER_SELLER"], "POWER_SELLER"],
];

let failed = 0;
for (const [label, fn, args, expected] of cases) {
  const got = fn(...args);
  const ok = got === expected;
  console.log(`${ok ? "PASS" : "FAIL"} — ${label} (got ${JSON.stringify(got)})`);
  if (!ok) failed++;
}

if (failed > 0) {
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
}
console.log("\nAll subscription helper checks passed.");
```

- [ ] **Step 2: Run the smoke**

Run:

```bash
node scripts/test-subscription.mjs
```

Expected output:

```
PASS — isPaid('FREE') -> false (got false)
PASS — isPaid('PRO') -> true (got true)
... (12 PASS lines total) ...
All subscription helper checks passed.
```

- [ ] **Step 3: Commit**

```bash
git add scripts/test-subscription.mjs
git commit -m "Add smoke script for subscription tier helpers"
```

---

## Task 4: Tier reconciliation in `lib/current-user.ts`

**Files:**
- Modify: `lib/current-user.ts:1-243`

- [ ] **Step 1: Add `normalizeTier` import**

At the top of `lib/current-user.ts`, add to the existing imports:

```ts
import { normalizeTier } from "@/lib/subscription";
```

- [ ] **Step 2: Add tier reconciliation to the `clerkUserId`-match branch**

Find the block at lines 143-168 that begins `if (existingUser) {` and ends with `return existingUser;`. Replace it with:

```ts
  if (existingUser) {
    const shouldBeAdmin =
      existingUser.role === "ADMIN" ||
      (await shouldGrantAdminRole({
        email,
        clerkUser,
        currentUserId: existingUser.id,
      }));

    const clerkTier = normalizeTier(
      (clerkUser?.publicMetadata as Record<string, unknown> | undefined)
        ?.subscriptionTier
    );

    const adminMismatch = shouldBeAdmin && existingUser.role !== "ADMIN";
    const tierMismatch =
      clerkTier !== null && existingUser.subscriptionTier !== clerkTier;

    if (adminMismatch || tierMismatch) {
      return prisma.user.update({
        where: { id: existingUser.id },
        data: {
          ...(adminMismatch ? { role: "ADMIN" as const } : {}),
          ...(tierMismatch ? { subscriptionTier: clerkTier! } : {}),
        },
        include: {
          sellerProfile: true,
          buyerProfile: true,
        },
      });
    }

    return existingUser;
  }
```

- [ ] **Step 3: Add tier reconciliation to the email-match branch**

Find the block at lines 186-220 that begins `if (existingUserByEmail) {`. Locate the existing `prisma.user.update` call inside it and add `subscriptionTier` to its `data` block. The relevant edit:

Find:

```ts
    return prisma.user.update({
      where: {
        id: existingUserByEmail.id,
      },
      data: {
        clerkUserId: userId,
        firstName: clerkUser?.firstName ?? existingUserByEmail.firstName,
        lastName: clerkUser?.lastName ?? existingUserByEmail.lastName,
        imageUrl: clerkUser?.imageUrl ?? existingUserByEmail.imageUrl,
        isSeller: true,
        isBuyer: true,
        role: shouldBeAdmin ? "ADMIN" : "SELLER",
```

Replace with (note the new `clerkTier` calculation just above and the new conditional in `data`):

```ts
    const clerkTier = normalizeTier(
      (clerkUser?.publicMetadata as Record<string, unknown> | undefined)
        ?.subscriptionTier
    );

    return prisma.user.update({
      where: {
        id: existingUserByEmail.id,
      },
      data: {
        clerkUserId: userId,
        firstName: clerkUser?.firstName ?? existingUserByEmail.firstName,
        lastName: clerkUser?.lastName ?? existingUserByEmail.lastName,
        imageUrl: clerkUser?.imageUrl ?? existingUserByEmail.imageUrl,
        isSeller: true,
        isBuyer: true,
        role: shouldBeAdmin ? "ADMIN" : "SELLER",
        ...(clerkTier ? { subscriptionTier: clerkTier } : {}),
```

(The remaining lines of the `update` call — `sellerProfile` block, `include`, etc. — are unchanged.)

- [ ] **Step 4: Type-check**

Run:

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 5: Commit**

```bash
git add lib/current-user.ts
git commit -m "Reconcile Clerk subscriptionTier metadata into User row"
```

---

## Task 5: Gate `/api/exchange/deals` — auth + tier truncation

**Files:**
- Modify: `app/api/exchange/deals/route.ts`

- [ ] **Step 1: Add the auth check + tier-based cap**

Open `app/api/exchange/deals/route.ts`. Update the imports at the top:

```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/current-user";
import { isPaid } from "@/lib/subscription";
```

Replace the existing `GET` handler with:

```ts
const FREE_DEAL_CAP = 3;

export async function GET(req: Request) {
  const user = await getCurrentDbUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const indexSymbol = searchParams.get("index");
  const takeParam = searchParams.get("take");
  const requestedTake = takeParam
    ? Math.min(TAKE_MAX, Math.max(1, parseInt(takeParam, 10) || TAKE_DEFAULT))
    : TAKE_DEFAULT;

  const tier = user.subscriptionTier;
  const userCap = isPaid(tier) ? requestedTake : FREE_DEAL_CAP;

  const pattern = indexSymbol ? INDEX_PATTERNS[indexSymbol] : null;

  // (existing prisma.deal.findMany call — keep its where/orderBy unchanged.
  //  Replace its `take:` value with `userCap` if applicable, OR fetch the
  //  generous slice as before and `.slice(0, userCap)` after the regex filter.)
  const rows = await prisma.deal.findMany({
    where: {
      isActive: true,
      // ... rest of the existing where unchanged
    },
    orderBy: { dealScore: "desc" },
    take: pattern ? Math.max(userCap * 4, 60) : userCap,
  });

  const filtered = pattern
    ? rows.filter((r) => pattern.test(r.sneaker)).slice(0, userCap)
    : rows.slice(0, userCap);

  return NextResponse.json({ tier, deals: filtered });
}
```

(If the existing handler already does the regex-filter-then-slice pattern, keep that shape — only the `userCap` cap and the response payload shape change.)

- [ ] **Step 2: Type-check**

Run:

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Manual curl verification**

Start the dev server in another shell: `npm run dev`. Then run:

```bash
# Anonymous → 401
curl -s -o /dev/null -w "anon=%{http_code}\n" http://localhost:3000/api/exchange/deals

# Signed-in: open http://localhost:3000/exchange in a browser, log in,
# copy the __session cookie value from DevTools, then:
curl -s -H "Cookie: __session=<paste>" http://localhost:3000/api/exchange/deals \
  | jq '{tier, count: (.deals | length)}'
```

Expected:
- Anonymous: `anon=401`
- Signed-in default user: `{ "tier": "FREE", "count": 3 }`
- After flipping `subscriptionTier: "PRO"` in Clerk dashboard and reloading the page once (to trigger reconciliation): `{ "tier": "PRO", "count": <up to 30> }`

- [ ] **Step 4: Commit**

```bash
git add app/api/exchange/deals/route.ts
git commit -m "Gate /api/exchange/deals: 401 anonymous, cap FREE at 3 deals"
```

---

## Task 6: Gate `/api/market` — auth + paid tier bypasses scan quota

**Files:**
- Modify: `app/api/market/route.ts`

- [ ] **Step 1: Confirm baseline**

Open `app/api/market/route.ts`. Confirmed at plan-writing time: this route does NOT currently call `checkAndIncrementScanLimit` (only `/api/ebay` and `/api/scan-photo` do). The route uses `Response.json(...)` (not `NextResponse.json`); match that style for consistency. The handler is `export async function GET(req: Request)`.

- [ ] **Step 2: Add auth + tier-aware scan quota**

At the top of the file, add the imports:

```ts
import { getCurrentDbUser } from "@/lib/current-user";
import { isPaid } from "@/lib/subscription";
import { checkAndIncrementScanLimit } from "@/lib/scan-rate-limit";
```

At the very top of the `GET` handler, before the existing query-parsing logic, insert:

```ts
  const user = await getCurrentDbUser();
  if (!user) {
    return Response.json({ error: "auth_required" }, { status: 401 });
  }

  if (!isPaid(user.subscriptionTier)) {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const { allowed } = await checkAndIncrementScanLimit(user.clerkUserId, ip);
    if (!allowed) {
      return Response.json(
        { error: "rate_limit", message: "Daily scan limit reached. Upgrade to Pro for unlimited scans." },
        { status: 429 }
      );
    }
  }
```

- [ ] **Step 3: Type-check**

Run:

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Manual curl verification**

```bash
# Anonymous → 401
curl -s -o /dev/null -w "anon=%{http_code}\n" "http://localhost:3000/api/market?q=Air+Jordan+1"

# Signed-in FREE: 4th call within 24h should 429
for i in 1 2 3 4; do
  curl -s -o /dev/null -w "call $i=%{http_code}\n" \
    -H "Cookie: __session=<paste>" \
    "http://localhost:3000/api/market?q=Air+Jordan+1"
done
```

Expected:
- Anonymous: `anon=401`
- Calls 1-3: `200` each
- Call 4: `429`
- After flipping the same user to `subscriptionTier: "PRO"` and reloading `/exchange` once: subsequent calls return `200` indefinitely.

- [ ] **Step 5: Commit**

```bash
git add app/api/market/route.ts
git commit -m "Gate /api/market: 401 anonymous, FREE consumes scan quota, paid bypass"
```

---

## Task 7: Tier-aware alert cap in API + page

**Files:**
- Modify: `app/api/exchange/alerts/route.ts`
- Modify: `app/exchange/alerts/page.tsx`

- [ ] **Step 1: Make the API route tier-aware**

Open `app/api/exchange/alerts/route.ts`. At the top, replace:

```ts
const FREE_TIER_RULE_CAP = 3;
```

with:

```ts
import { isPaid } from "@/lib/subscription";

const FREE_TIER_RULE_CAP = 3;
```

In the `GET` handler, change the response builder to use the tier-aware cap. Find:

```ts
return NextResponse.json({ rules, recentEvents, ruleCap: FREE_TIER_RULE_CAP });
```

Replace with:

```ts
const effectiveCap = isPaid(user.subscriptionTier) ? null : FREE_TIER_RULE_CAP;
return NextResponse.json({ rules, recentEvents, ruleCap: effectiveCap });
```

(`null` signals "unlimited" to the client.)

In the `POST` (or whichever method enforces the cap at line 70), find:

```ts
if (activeCount >= FREE_TIER_RULE_CAP) {
  return NextResponse.json(
    {
      error: "rule-cap-reached",
      message: `Free tier supports ${FREE_TIER_RULE_CAP} active alerts. Upgrade or pause an existing rule.`,
```

Replace the conditional with:

```ts
if (!isPaid(user.subscriptionTier) && activeCount >= FREE_TIER_RULE_CAP) {
  return NextResponse.json(
    {
      error: "rule-cap-reached",
      message: `Free tier supports ${FREE_TIER_RULE_CAP} active alerts. Upgrade to Pro for unlimited alerts.`,
```

(Keep the rest of the response body and status code unchanged.)

- [ ] **Step 2: Make the page tier-aware**

Open `app/exchange/alerts/page.tsx`. Add the import:

```ts
import { isPaid } from "@/lib/subscription";
```

The existing line 8 stays:

```ts
const FREE_TIER_RULE_CAP = 3;
```

Find the call site that passes `ruleCap={FREE_TIER_RULE_CAP}` (around line 62). Replace it with:

```tsx
ruleCap={isPaid(user.subscriptionTier) ? null : FREE_TIER_RULE_CAP}
```

(`AlertsManager` will need to handle a `null` cap as "unlimited" — see Step 3.)

- [ ] **Step 3: Update `AlertsManager` to handle `null` cap**

Open `components/exchange/AlertsManager.tsx`. Find the `ruleCap` prop type. Change it from `number` to `number | null`. Anywhere the component renders the cap (e.g. `{rules.length} of {ruleCap} active`), branch on null:

```tsx
{ruleCap === null
  ? `${rules.length} active (unlimited)`
  : `${rules.length} of ${ruleCap} active`}
```

Anywhere the cap is used to disable the "Add rule" button (e.g. `disabled={rules.length >= ruleCap}`), branch:

```tsx
disabled={ruleCap !== null && rules.length >= ruleCap}
```

If the component shows an upgrade hint when capped, ensure the link target is `/pricing#pro`:

```tsx
{ruleCap !== null && rules.length >= ruleCap && (
  <a href="/pricing#pro" className="text-blue-600 hover:underline">
    Need more? Go PRO →
  </a>
)}
```

- [ ] **Step 4: Type-check**

Run:

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 5: Manual smoke**

With the dev server running, visit `/exchange/alerts` while signed in as FREE — the cap shows `0 of 3 active`. Flip your Clerk metadata to `subscriptionTier: "PRO"`, hard-reload, and the cap shows `0 active (unlimited)` and the disabled state is gone.

- [ ] **Step 6: Commit**

```bash
git add app/api/exchange/alerts/route.ts app/exchange/alerts/page.tsx components/exchange/AlertsManager.tsx
git commit -m "Tier-aware alert rule cap (PRO unlimited)"
```

---

## Task 8: Server-load tier in `/exchange` page

**Files:**
- Modify: `app/exchange/page.tsx`

- [ ] **Step 1: Replace the synchronous default export**

Open `app/exchange/page.tsx`. Replace the entire file with:

```tsx
import SneakerExchange from "@/components/exchange/SneakerExchange";
import { getCurrentTier } from "@/lib/subscription";

export const metadata = {
  title: "Sneaker Exchange | SneakPrice",
  description:
    "Live sneaker market dashboard — price charts, popularity trends, volatility scores, and blue chip rankings across top sneaker models.",
};

export const dynamic = "force-dynamic";

export default async function SneakerExchangePage() {
  const tier = await getCurrentTier();
  return <SneakerExchange tier={tier} />;
}
```

(The `force-dynamic` is required because `getCurrentTier()` calls Clerk's `auth()`, which cannot run during static rendering.)

- [ ] **Step 2: Type-check**

Run:

```bash
npx tsc --noEmit
```

Expected: a TS error about the `tier` prop not existing on `SneakerExchange`. That's resolved in Task 9. Move on.

- [ ] **Step 3: Commit**

(Skip the commit until Task 9 ships — this and Task 9 are one logical change. Stage but don't commit yet:)

```bash
git add app/exchange/page.tsx
```

---

## Task 9: Wire `tier` prop through `SneakerExchange.tsx`

**Files:**
- Modify: `components/exchange/SneakerExchange.tsx`

- [ ] **Step 1: Accept the prop and replace the fake `isPro` flag**

Open `components/exchange/SneakerExchange.tsx`.

At the top of the file, add the import:

```ts
import { isPaid, type SubscriptionTier } from "@/lib/subscription";
```

(The `SubscriptionTier` type lives in `lib/subscription.ts` but is also re-exported as plain string union — re-export if needed, or inline `"FREE" | "PRO" | "PREMIUM" | "POWER_SELLER"` here. The clean fix is to make the type a non-server-only re-export. Since `lib/subscription.ts` is `server-only`, do the inline form here:)

```ts
type SubscriptionTier = "FREE" | "PRO" | "PREMIUM" | "POWER_SELLER";
const PAID_TIERS: SubscriptionTier[] = ["PRO", "PREMIUM", "POWER_SELLER"];
function isPaid(tier: SubscriptionTier): boolean {
  return PAID_TIERS.includes(tier);
}
```

(Leave the `import "server-only"` import out — this is a client component.)

Change the function signature at line 275 from:

```tsx
export default function SneakerExchange() {
```

to:

```tsx
type Props = { tier: SubscriptionTier };

export default function SneakerExchange({ tier }: Props) {
```

Find line 286:

```tsx
const [isPro] = useState<boolean>(false);
```

Replace with:

```tsx
const isPro = isPaid(tier);
const isAnonymous = false; // server-side currentUser determines this; if tier is FREE
                           // and not paid, they could still be a logged-in FREE user.
                           // The page-level loader sets tier to "FREE" for both
                           // anonymous and signed-in FREE — see step 2 below.
```

- [ ] **Step 2: Distinguish anonymous from FREE**

Anonymous and FREE both produce `tier === "FREE"` from `getCurrentTier()`. The component needs to know which one to render the right CTAs (sign-in vs upgrade). Update `app/exchange/page.tsx` to pass an extra `isSignedIn` prop:

Open `app/exchange/page.tsx` and update:

```tsx
import SneakerExchange from "@/components/exchange/SneakerExchange";
import { getCurrentTier } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";

// ... metadata + dynamic stay the same ...

export default async function SneakerExchangePage() {
  const [{ userId }, tier] = await Promise.all([auth(), getCurrentTier()]);
  return <SneakerExchange tier={tier} isSignedIn={Boolean(userId)} />;
}
```

Update the `Props` type in `SneakerExchange.tsx`:

```tsx
type Props = { tier: SubscriptionTier; isSignedIn: boolean };

export default function SneakerExchange({ tier, isSignedIn }: Props) {
  const isPro = isPaid(tier);
  const isAnonymous = !isSignedIn;
```

- [ ] **Step 3: Tighten the deal preview slice 2 → 3**

Find line 406:

```tsx
const visibleDeals = isPro ? deals : deals.slice(0, 2);
```

Replace with:

```tsx
const visibleDeals = isPro ? deals : deals.slice(0, 3);
```

- [ ] **Step 4: Stop fetching deals for anonymous users**

The deal-fetch effect at lines 326-354 currently runs for everyone. Anonymous users now get 401 from the API, which would log noisy fetch errors. Wrap the effect body with an early return:

Find the effect that fetches `/api/exchange/deals`. At the top of `loadDeals()`, add:

```ts
async function loadDeals() {
  if (isAnonymous) {
    setDeals([]);
    setDealsLoading(false);
    setDealsError(null);
    return;
  }
  try {
    const url = `/api/exchange/deals?index=${encodeURIComponent(selectedSymbol)}&take=30`;
    // ... rest unchanged
```

Add `isAnonymous` to the effect dependency array if it's not already implicitly captured.

- [ ] **Step 5: Replace the scanner input for anonymous**

Find the scanner JSX block (it contains the existing input bound to `scannerQuery`). Wrap the rendered scanner in a tier-and-auth check:

```tsx
{isAnonymous ? (
  <div className="rounded-lg border border-dashed p-6 text-center text-sm text-gray-600">
    <p className="mb-3">Sign in to scan the live market.</p>
    <a
      href="/sign-in?redirect_url=/exchange"
      className="inline-block rounded bg-black px-4 py-2 text-white"
    >
      Sign in
    </a>
  </div>
) : (
  // existing scanner input + result rendering
)}
```

- [ ] **Step 6: Update the locked-deal "Unlock" CTAs to link to `/pricing#pro`**

Find every occurrence of `"🔒 Unlock"` and `"Premium"` placeholder strings in the locked-overlay rendering (around lines 690, 698, 788, 793, and the `!isPro` block at line 740). Wrap them in a link to `/pricing#pro` if they aren't already. For example:

```tsx
{isPro ? formatCurrency(bestDeal.profit) : (
  <a href="/pricing#pro" className="text-blue-600 hover:underline">
    🔒 Unlock
  </a>
)}
```

(Apply consistently to the four `🔒 Unlock` / `Premium` sites. Keep the existing visuals; just upgrade the placeholders to links.)

- [ ] **Step 7: Anonymous shows a deal-feed CTA, no rows**

Find the deals list rendering. Above (or replacing) the "no deals yet" empty state, add a branch:

```tsx
{isAnonymous ? (
  <div className="rounded-lg border border-dashed p-6 text-center text-sm text-gray-600">
    <p className="mb-3">Sign in to view live arbitrage deals.</p>
    <a
      href="/sign-in?redirect_url=/exchange"
      className="inline-block rounded bg-black px-4 py-2 text-white"
    >
      Sign in
    </a>
  </div>
) : (
  // existing deals list rendering: visibleDeals.map(...)
)}
```

- [ ] **Step 8: Type-check + lint**

Run:

```bash
npx tsc --noEmit && npm run lint
```

Expected: zero errors and zero new lint warnings.

- [ ] **Step 9: Manual smoke (browser)**

With dev server running, visit `http://localhost:3000/exchange`:

1. **Anonymous (signed out):** Scanner shows "Sign in to scan the live market" CTA. Deals area shows "Sign in to view live arbitrage deals" CTA. Index cards still render. No console 401 spam from `/api/exchange/deals` (because the effect short-circuited).
2. **FREE (signed in, no metadata flip):** Scanner works (within 3/day cap). Top 3 deals visible; locked teaser overlays for the rest with `Unlock` links to `/pricing#pro`.
3. **PRO (flip Clerk metadata, reload twice — once to reconcile DB, once to reload props):** Full 30 deals visible. No locked overlays. Scanner unlimited.

- [ ] **Step 10: Commit**

```bash
git add app/exchange/page.tsx components/exchange/SneakerExchange.tsx
git commit -m "Wire tier prop through /exchange UI; gate scanner+deals for anonymous"
```

---

## Task 10: Create `/pricing` page

**Files:**
- Create: `app/pricing/page.tsx`

- [ ] **Step 1: Create the page**

Create `app/pricing/page.tsx`:

```tsx
import Link from "next/link";

export const metadata = {
  title: "Pricing | SneakPrice",
  description:
    "SneakPrice subscription tiers — Free, Pro, Premium, and Power Seller. Choose the plan that matches how you trade sneakers.",
};

const UPGRADE_EMAIL = "speedyray2ray@gmail.com";

function upgradeHandler(tier: "PRO" | "PREMIUM" | "POWER_SELLER") {
  const subject = encodeURIComponent(`SneakPrice ${tier} Upgrade Request`);
  const body = encodeURIComponent(`Tier: ${tier}\n\n(Tell me your Clerk email so I can flip your account.)`);
  return `mailto:${UPGRADE_EMAIL}?subject=${subject}&body=${body}`;
}

const TIERS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    blurb: "Email signup. Try the live exchange.",
    features: [
      "3 scans / day",
      "Basic identification",
      "Basic price display",
      "Index cards (live)",
      "Top 3 arbitrage deals",
    ],
    cta: { label: "Sign up free", href: "/sign-in" },
  },
  {
    id: "pro",
    name: "Pro",
    price: "$5–$10/mo",
    blurb: "For active flippers who want the full live feed.",
    features: [
      "Unlimited scans",
      "Full arbitrage deal feed",
      "Price history charts",
      "Trend indicators",
      "Over/undervalued signals",
      "Unlimited alert rules",
    ],
    cta: { label: "Request upgrade", href: upgradeHandler("PRO") },
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$15–$25/mo",
    blurb: "For serious resellers — predictions and early signals.",
    features: [
      "Everything in Pro",
      "Resale predictions",
      "Flip alerts",
      "Early trend detection",
      "Priority support",
    ],
    cta: { label: "Request upgrade", href: upgradeHandler("PREMIUM") },
  },
  {
    id: "power-seller",
    name: "Power Seller",
    price: "$30–$50/mo",
    blurb: "For marketplace operators with inventory at scale.",
    features: [
      "Everything in Premium",
      "Bulk scanning",
      "Inventory tracking",
      "Profit analytics",
      "API access (coming soon)",
    ],
    cta: { label: "Request upgrade", href: upgradeHandler("POWER_SELLER") },
  },
] as const;

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Pricing
        </h1>
        <p className="mt-3 text-gray-600">
          Pricing is range-based while we calibrate. Lock in early-bird pricing today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier) => (
          <section
            key={tier.id}
            id={tier.id}
            className={`rounded-2xl border p-6 ${
              "highlight" in tier && tier.highlight
                ? "border-black ring-2 ring-black"
                : "border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold">{tier.name}</h2>
            <p className="mt-1 text-2xl font-bold">{tier.price}</p>
            <p className="mt-2 text-sm text-gray-600">{tier.blurb}</p>

            <ul className="mt-5 space-y-2 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span aria-hidden>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={tier.cta.href}
              className={`mt-6 block rounded-lg px-4 py-2 text-center text-sm font-medium ${
                "highlight" in tier && tier.highlight
                  ? "bg-black text-white"
                  : "border border-gray-300 text-gray-900"
              }`}
            >
              {tier.cta.label}
            </Link>
          </section>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        Stripe checkout coming soon. For now, requests are handled by email
        within 24 hours.
      </p>
    </main>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run:

```bash
npx tsc --noEmit && npm run lint
```

Expected: zero errors.

- [ ] **Step 3: Manual smoke**

With dev server running, visit `http://localhost:3000/pricing`. All four cards render. The PRO card is highlighted. Clicking "Request upgrade" on Pro/Premium/Power Seller opens the user's email client with a prefilled message.

Visit `http://localhost:3000/pricing#pro` — page should scroll to the Pro card.

- [ ] **Step 4: Commit**

```bash
git add app/pricing/page.tsx
git commit -m "Add /pricing page with four-tier table and mailto upgrade handler"
```

---

## Task 11: End-to-end smoke + deploy verification

**Files:** none (verification only)

- [ ] **Step 1: Local end-to-end smoke**

With `npm run dev` running:

1. Sign out. Visit `/exchange`. Confirm: indexes render, deal feed shows "Sign in" CTA, scanner shows "Sign in" CTA. No 401 errors in the browser console.
2. Sign in as your own user. Confirm: deals show top 3 + locked teasers; scanner works (within quota); alerts page shows `0 of 3 active`.
3. Open the Clerk dashboard → Users → your user → public metadata. Add: `{ "subscriptionTier": "PRO" }`. Save.
4. In the app, hard-reload `/exchange`. Confirm: deals expand to full feed, locked teasers gone, alerts page shows `0 active (unlimited)`.
5. Open Postgres (Supabase studio or `psql`) and run:
   ```sql
   SELECT email, "subscriptionTier" FROM "User" WHERE email = '<your-email>';
   ```
   Confirm: column reads `PRO` (reconciled from Clerk).
6. Set Clerk metadata back to `{}` (remove `subscriptionTier`). Hard-reload `/exchange`. Confirm: still PRO (`null` from `normalizeTier` does not downgrade — this is the intended safety).
7. Set Clerk metadata to `{ "subscriptionTier": "FREE" }` explicitly. Hard-reload. Confirm: deals collapse back to top 3 + locked teasers; DB column flips to `FREE`.

- [ ] **Step 2: Push to a feature branch and open PR**

```bash
git checkout -b feature/exchange-subscriber-gating
git push -u origin feature/exchange-subscriber-gating
gh pr create --title "Exchange subscriber gating (Phase 1 step 8)" --body "$(cat <<'EOF'
## Summary
- Add SubscriptionTier enum + User.subscriptionTier column
- Reconcile Clerk publicMetadata.subscriptionTier into DB on every getCurrentDbUser()
- Gate /api/exchange/deals (401 anon, 3-deal cap FREE, full PRO+)
- Gate /api/market (401 anon, scan quota FREE, bypass PRO+)
- Tier-aware alert rule cap (3 FREE / unlimited PRO+)
- /exchange page server-loads tier; SneakerExchange wires real prop, tightens preview 2 → 3, distinguishes anonymous from FREE
- New /pricing page with mailto: upgrade handler (Stripe deferred)

Spec: docs/superpowers/specs/2026-05-05-exchange-subscriber-gating-design.md

## Test plan
- [ ] Anonymous /api/exchange/deals → 401
- [ ] FREE user /api/exchange/deals → 3 rows
- [ ] PRO user /api/exchange/deals → full feed
- [ ] Anonymous /api/market → 401
- [ ] FREE user 4th scan/day → 429
- [ ] PRO user unlimited scans
- [ ] Alerts cap: 3 for FREE, unlimited for PRO
- [ ] /pricing renders all four tiers; mailto links work
EOF
)"
```

- [ ] **Step 3: Verify on Vercel preview**

Once Vercel builds the preview, repeat steps 1-7 from the local smoke against the preview URL. The DB column update will already have happened during local smoke if you used the same Supabase database.

- [ ] **Step 4: Merge + monitor production**

After PR review, merge. Verify on `sneakpriceapp.com/exchange`:
1. Anonymous renders correctly with no 401 console spam.
2. Your own account (already PRO via Clerk metadata after step 3 above) sees the full feed.
3. The hourly capture cron continues to run (no schema-related crash from the new column).

---

## Out-of-Scope Reminders

The following are explicitly NOT shipped in this plan and MUST be left as follow-ups:

- Stripe Checkout / webhook / actual billing.
- Distinct PREMIUM and POWER_SELLER feature gates (the enum values exist; behaviorally they collapse to "paid" for now).
- 3/min/IP global rate-limit floor.
- FingerprintJS browser fingerprinting.
- Admin UI for flipping tiers (Clerk dashboard is the manual flip surface).
- Index history charts, portfolio tracking, predictive signals — gated by data history, not by this epic.
