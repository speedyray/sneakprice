# Phase B: Real Market Stats Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace three hardcoded vanity counters with real DB aggregates and add a new "Live eBay Market Prices" section showing fresh eBay prices for the top 5 active deals.

**Architecture:** Two new GET endpoints — `/api/stats` (DB only, fast) and `/api/market-prices` (top 5 deals from DB + parallel eBay Browse API calls). The homepage fetches both independently on mount so counters appear instantly while eBay prices load asynchronously.

**Tech Stack:** Next.js App Router, TypeScript, Prisma (`lib/prisma.ts`), eBay Browse API (`lib/ebay.ts`), Tailwind CSS

---

## File Map

| File | Action |
|------|--------|
| `app/api/stats/route.ts` | **Create** — GET handler returning 3 DB aggregates |
| `app/api/market-prices/route.ts` | **Create** — GET handler fetching top 5 deals + parallel eBay prices |
| `app/page.tsx` | **Modify** — state, two fetches, real counters, new eBay section |

---

## Task 1: Create `/api/stats` route

**Files:**
- Create: `app/api/stats/route.ts`

- [ ] **Step 1: Create the file**

```ts
// app/api/stats/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [sneakersAnalyzed, resaleAgg, userCount] = await Promise.all([
      prisma.scan.count(),
      prisma.deal.aggregate({ _sum: { sellPrice: true } }),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      sneakersAnalyzed,
      resaleValue: resaleAgg._sum.sellPrice ?? 0,
      userCount,
    });
  } catch (err) {
    console.error("[/api/stats] query failed:", err);
    return NextResponse.json({ sneakersAnalyzed: 0, resaleValue: 0, userCount: 0 });
  }
}
```

- [ ] **Step 2: Verify it compiles**

```bash
cd /home/speedy4ray/MyProjects/SneakPriceShoes/sneakprice && npx tsc --noEmit 2>&1 | grep -v node_modules
```

Expected: no output (zero errors).

- [ ] **Step 3: Test the endpoint**

```bash
npm run dev
# in another terminal:
curl http://localhost:3000/api/stats
```

Expected: `{"sneakersAnalyzed":<number>,"resaleValue":<number>,"userCount":<number>}`. Values may be 0 on a fresh DB — that's fine. Kill dev server with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add app/api/stats/route.ts
git commit -m "feat: add /api/stats endpoint for real DB market counters"
```

---

## Task 2: Create `/api/market-prices` route

**Files:**
- Create: `app/api/market-prices/route.ts`

- [ ] **Step 1: Create the file**

```ts
// app/api/market-prices/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEbayAccessToken } from "@/lib/ebay";

function median(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function fetchEbayPrice(
  sneaker: string,
  base: string,
  token: string
): Promise<{ sneaker: string; medianPrice: number; totalListings: number; marketLabel: string } | null> {
  try {
    const res = await fetch(
      `${base}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(sneaker)}&limit=30&filter=buyingOptions:{FIXED_PRICE}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
        },
      }
    );

    const data = await res.json();
    const items = data.itemSummaries ?? [];

    const prices: number[] = items
      .map((item: { price?: { value?: string } }) => parseFloat(item.price?.value ?? ""))
      .filter((p: number) => !isNaN(p));

    if (prices.length === 0) return null;

    prices.sort((a, b) => a - b);
    const trimCount = Math.floor(prices.length * 0.15);
    const trimmed = prices.slice(trimCount, prices.length - trimCount);

    if (trimmed.length === 0) return null;

    const med = median(trimmed);
    const spread = trimmed[trimmed.length - 1] - trimmed[0];
    const volatility = spread / med;

    let marketLabel = "Active Market";
    if (volatility > 0.5) marketLabel = "High Volatility";
    if (volatility < 0.2) marketLabel = "Stable Blue-Chip";

    return { sneaker, medianPrice: Math.round(med), totalListings: prices.length, marketLabel };
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const base =
      process.env.EBAY_ENVIRONMENT === "production"
        ? "https://api.ebay.com"
        : "https://api.sandbox.ebay.com";

    const topDeals = await prisma.deal.findMany({
      where: { isActive: true, sneaker: { not: null }, dealScore: { not: null } },
      orderBy: { dealScore: "desc" },
      take: 5,
      select: { sneaker: true },
    });

    const sneakers = topDeals
      .filter((d): d is typeof d & { sneaker: string } => d.sneaker !== null)
      .map((d) => d.sneaker);

    if (sneakers.length === 0) {
      return NextResponse.json({ prices: [] });
    }

    const token = await getEbayAccessToken();

    const results = await Promise.all(
      sneakers.map((s) => fetchEbayPrice(s, base, token))
    );

    const prices = results.filter(
      (r): r is NonNullable<typeof r> => r !== null
    );

    return NextResponse.json({ prices });
  } catch (err) {
    console.error("[/api/market-prices] failed:", err);
    return NextResponse.json({ prices: [] });
  }
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit 2>&1 | grep -v node_modules
```

Expected: no output (zero errors).

- [ ] **Step 3: Test the endpoint**

```bash
npm run dev
# in another terminal:
curl http://localhost:3000/api/market-prices
```

Expected: `{"prices":[...]}` — array of eBay price objects, or empty array if no active deals or eBay sandbox returns nothing. Kill dev server with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add app/api/market-prices/route.ts
git commit -m "feat: add /api/market-prices endpoint for live eBay price data"
```

---

## Task 3: Update `page.tsx` — state and fetches

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add two new state vars after the existing arbitrageSignals state (around line 157)**

Find:
```ts
  const [arbitrageSignals, setArbitrageSignals] = useState<{ name: string; profit: number }[]>([]);
```

Add after it:
```ts
  const [marketStats, setMarketStats] = useState<{ sneakersAnalyzed: number; resaleValue: number; userCount: number } | null>(null);
  const [marketPrices, setMarketPrices] = useState<{ sneaker: string; medianPrice: number; totalListings: number; marketLabel: string }[]>([]);
```

- [ ] **Step 2: Add two new fetch useEffects after the existing `/api/trending` useEffect (around line 262)**

Find the end of the `/api/trending` useEffect:
```ts
    return () => controller.abort();
  }, []);
```

Add immediately after it:
```ts
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/stats", { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => setMarketStats(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          // silently fail — counters show "—"
        }
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/market-prices", { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        if (data.prices?.length) setMarketPrices(data.prices);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          // silently fail — section stays empty
        }
      });
    return () => controller.abort();
  }, []);
```

- [ ] **Step 3: Add number formatter helpers near the top of the file (after the existing const declarations, before the component function)**

Find:
```ts
// Legacy type for backward compat with existing SSE handler
type LiveDeal = {
```

Add before it:
```ts
function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K+`;
  return `${n}+`;
}

function formatMoney(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n)}`;
}

```

- [ ] **Step 4: Replace the three hardcoded counter values in the JSX (around line 1055)**

Find:
```tsx
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <p className="text-4xl font-bold text-black">12,000+</p>
            <p className="mt-2 text-neutral-600">Sneakers Analyzed</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-black">$3.2M</p>
            <p className="mt-2 text-neutral-600">Resale Value Calculated</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-black">2,500+</p>
            <p className="mt-2 text-neutral-600">Resellers Using SneakPrice</p>
          </div>
        </div>
```

Replace with:
```tsx
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <p className="text-4xl font-bold text-black">
              {marketStats ? formatCount(marketStats.sneakersAnalyzed) : "—"}
            </p>
            <p className="mt-2 text-neutral-600">Sneakers Analyzed</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-black">
              {marketStats ? formatMoney(marketStats.resaleValue) : "—"}
            </p>
            <p className="mt-2 text-neutral-600">Resale Value Calculated</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-black">
              {marketStats ? formatCount(marketStats.userCount) : "—"}
            </p>
            <p className="mt-2 text-neutral-600">Resellers Using SneakPrice</p>
          </div>
        </div>
```

- [ ] **Step 5: Verify it compiles**

```bash
npx tsc --noEmit 2>&1 | grep -v node_modules
```

Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add marketStats and marketPrices state, fetch /api/stats and /api/market-prices, replace hardcoded counters"
```

---

## Task 4: Add "Live eBay Market Prices" section to `page.tsx`

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add the new section after the "Live Sneaker Market Insights" panels**

Find (end of the market insights panels section, around line 1121):
```tsx
        </div>
      </div>

      {/* ── Scan Modal ─────────────────────────────────────────── */}
```

Replace with:
```tsx
        </div>
      </div>

      {marketPrices.length > 0 && (
        <div className="mt-16 max-w-5xl w-full">
          <h2 className="text-2xl font-bold text-center mb-8">
            🔴 Live eBay Market Prices
          </h2>
          <div className="rounded-xl border border-black/10 bg-white p-6 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
            <ul className="divide-y divide-black/5">
              {marketPrices.map((item, i) => (
                <li key={i} className="flex items-center justify-between py-3">
                  <span className="font-medium text-neutral-800">{item.sneaker}</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-neutral-500">{item.totalListings} listings</span>
                    <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                      {item.marketLabel}
                    </span>
                    <span className="text-xl font-bold text-black">${item.medianPrice}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── Scan Modal ─────────────────────────────────────────── */}
```

- [ ] **Step 2: Verify in the browser**

```bash
npm run dev
```

Visit `http://localhost:3000` and scroll down. Check:
- The three stat counters show real numbers (or "—" briefly while loading)
- The "Live eBay Market Prices" section appears below the market insights panels if deals exist
- No console errors

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add Live eBay Market Prices section to homepage"
```
