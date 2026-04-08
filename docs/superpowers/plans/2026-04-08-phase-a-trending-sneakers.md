# Phase A: Trending Sneakers from Real DB Data — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the two hardcoded sneaker arrays on the homepage with live data from the `Scan` and `Deal` tables via a new `/api/trending` endpoint.

**Architecture:** A single `GET /api/trending` route queries Prisma for the top 8 most-scanned models (last 30 days) and top 8 active deals by profit. The homepage fetches this on mount and replaces the hardcoded `trendingSneakers` array and the inline arbitrage signals list.

**Tech Stack:** Next.js App Router, Prisma (`lib/prisma.ts`), TypeScript, Tailwind CSS

---

## File Map

| File | Action |
|------|--------|
| `app/api/trending/route.ts` | **Create** — GET handler returning trending + arbitrage arrays |
| `app/page.tsx` | **Modify** — remove hardcoded arrays, add fetch + state, wire up JSX |

---

## Task 1: Create `/api/trending` route

**Files:**
- Create: `app/api/trending/route.ts`

- [ ] **Step 1: Create the file**

```ts
// app/api/trending/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function demandLabel(count: number): string {
  if (count >= 5) return "Hot";
  if (count >= 3) return "High Demand";
  if (count === 2) return "Trending";
  if (count === 1) return "Growing";
  return "Moderate";
}

export async function GET() {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Trending: most-scanned models in last 30 days
    const scanGroups = await prisma.scan.groupBy({
      by: ["model"],
      where: {
        created_at: { gte: thirtyDaysAgo },
        model: { not: null },
      },
      _count: { model: true },
      orderBy: { _count: { model: "desc" } },
      take: 8,
    });

    const trending = scanGroups
      .filter((g) => g.model)
      .map((g) => ({
        name: g.model as string,
        demand: demandLabel(g._count.model),
      }));

    // Arbitrage signals: top active deals by net profit
    const topDeals = await prisma.deal.findMany({
      where: {
        isActive: true,
        sneaker: { not: null },
        netProfit: { not: null },
      },
      orderBy: { netProfit: "desc" },
      take: 8,
      select: { sneaker: true, netProfit: true },
    });

    const arbitrage = topDeals.map((d) => ({
      name: d.sneaker as string,
      profit: Math.round(d.netProfit as number),
    }));

    return NextResponse.json({ trending, arbitrage });
  } catch {
    return NextResponse.json({ trending: [], arbitrage: [] });
  }
}
```

- [ ] **Step 2: Verify the dev server compiles without errors**

```bash
npm run dev
```

Expected: no TypeScript or import errors in terminal output. Hit `Ctrl+C` after confirming.

- [ ] **Step 3: Test the endpoint manually**

```bash
curl http://localhost:3000/api/trending
```

Expected: JSON with `trending` and `arbitrage` arrays (may be empty if DB has no scans/deals yet — that's fine).

- [ ] **Step 4: Commit**

```bash
git add app/api/trending/route.ts
git commit -m "feat: add /api/trending endpoint for real DB sneaker data"
```

---

## Task 2: Update `page.tsx` — state and fetch

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add two new state vars after the existing `trending` state (line ~174)**

Find this block:
```ts
  const [trending, setTrending] = useState(trendingSneakers.slice(0, 4));
  const [trendingTitle, setTrendingTitle] = useState(trendingTitles[0]);
```

Replace with:
```ts
  const [trendingData, setTrendingData] = useState<{ name: string; demand: string }[]>([]);
  const [arbitrageSignals, setArbitrageSignals] = useState<{ name: string; profit: number }[]>([]);
  const [trending, setTrending] = useState<{ name: string; demand: string }[]>([]);
  const [trendingTitle, setTrendingTitle] = useState(trendingTitles[0]);
```

- [ ] **Step 2: Add a `useEffect` to fetch `/api/trending` on mount**

Add this block right after the existing `useEffect` for the shuffle interval (after line ~256):

```ts
  useEffect(() => {
    fetch("/api/trending")
      .then((r) => r.json())
      .then((data) => {
        if (data.trending?.length) {
          setTrendingData(data.trending);
          setTrending(data.trending.slice(0, 4));
        }
        if (data.arbitrage?.length) {
          setArbitrageSignals(data.arbitrage);
        }
      })
      .catch(() => {
        // silently fail — widgets remain empty
      });
  }, []);
```

- [ ] **Step 3: Update the shuffle interval to use `trendingData` instead of `trendingSneakers`**

Find:
```ts
  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...trendingSneakers].sort(() => 0.5 - Math.random());
      setTrending(shuffled.slice(0, 4));
    }, 5000);

    return () => clearInterval(interval);
  }, []);
```

Replace with:
```ts
  useEffect(() => {
    if (!trendingData.length) return;
    const interval = setInterval(() => {
      const shuffled = [...trendingData].sort(() => 0.5 - Math.random());
      setTrending(shuffled.slice(0, 4));
    }, 5000);

    return () => clearInterval(interval);
  }, [trendingData]);
```

- [ ] **Step 4: Remove the `trendingSneakers` hardcoded const**

Find and delete this block (lines ~32–48):
```ts
const trendingSneakers = [
  { name: "Yeezy Boost 350 V2", demand: "High Demand" },
  { name: "Air Jordan 4", demand: "Trending" },
  { name: "Nike Dunk Low", demand: "Moderate" },
  { name: "New Balance 990", demand: "Growing" },
  { name: "Jordan 1 Chicago", demand: "Hot" },
  { name: "Jordan 4 Military Black", demand: "Trending" },
  { name: "Nike Dunk Panda", demand: "High Demand" },
  { name: "Yeezy 700 Wave Runner", demand: "Growing" },
  { name: "Nike Air Force 1 Low", demand: "Moderate" },
  { name: "Adidas Samba OG", demand: "Trending" },
  { name: "New Balance 550", demand: "Growing" },
  { name: "Jordan 3 White Cement", demand: "Hot" },
  { name: "Nike Dunk Low Grey Fog", demand: "Trending" },
  { name: "Adidas Campus 00s", demand: "Growing" },
  { name: "Jordan 1 Retro High OG", demand: "High Demand" },
];
```

- [ ] **Step 5: Verify the dev server still compiles**

```bash
npm run dev
```

Expected: no TypeScript errors. `Ctrl+C` after confirming.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire trending state to /api/trending fetch, remove hardcoded trendingSneakers"
```

---

## Task 3: Replace hardcoded arbitrage signals in JSX

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the inline hardcoded array in the arbitrage widget**

Find this block in the JSX (around line ~1095):
```tsx
            <div className="overflow-hidden h-[120px]">
              <ul className="animate-[scrollVertical_10s_linear_infinite] space-y-3 text-neutral-700">
                {[
                  { name: "Air Jordan 1 Chicago", profit: 64 },
                  { name: "Yeezy 700 Wave Runner", profit: 48 },
                  { name: "Nike Dunk Panda", profit: 32 },
                  { name: "Jordan 4 Military Black", profit: 29 },
                  { name: "Air Jordan 1 Chicago", profit: 64 },
                  { name: "Yeezy 700 Wave Runner", profit: 48 },
                  { name: "Nike Dunk Panda", profit: 32 },
                  { name: "Jordan 4 Military Black", profit: 29 },
                ].map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="text-black">+${item.profit}</span>
                  </li>
                ))}
              </ul>
            </div>
```

Replace with:
```tsx
            <div className="overflow-hidden h-[120px]">
              <ul className="animate-[scrollVertical_10s_linear_infinite] space-y-3 text-neutral-700">
                {[...arbitrageSignals, ...arbitrageSignals].map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="text-black">+${item.profit}</span>
                  </li>
                ))}
              </ul>
            </div>
```

Note: the array is doubled (`[...arbitrageSignals, ...arbitrageSignals]`) to keep the infinite scroll animation seamless, matching the original pattern.

- [ ] **Step 2: Verify in the browser**

```bash
npm run dev
```

Visit `http://localhost:3000`. Both widgets should render with real data (or be empty if the DB has no records). No console errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: replace hardcoded arbitrage signals with real DB data"
```
