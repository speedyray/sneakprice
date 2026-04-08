# Phase A: Replace Hardcoded Trending Sneakers with Real DB Data

**Date:** 2026-04-08  
**Status:** Approved

---

## Overview

Replace two hardcoded arrays on the homepage (`trendingSneakers` and the inline arbitrage signals list) with live data from the database. A single new API endpoint returns both datasets in one fetch.

---

## API

### `GET /api/trending`

**Response shape:**
```json
{
  "trending": [
    { "name": "Air Jordan 4", "demand": "Hot" }
  ],
  "arbitrage": [
    { "name": "Nike Dunk Panda", "profit": 48.0 }
  ]
}
```

**Trending data** — sourced from the `Scan` table:
- Filter scans created in the last 30 days
- Group by `model`, count occurrences, order by count desc, limit 8
- Map count to demand label:
  - 5+ → "Hot"
  - 3–4 → "High Demand"
  - 2 → "Trending"
  - 1 → "Growing"
  - fallback (0 or no match) → "Moderate"

**Arbitrage signals** — sourced from the `Deal` table:
- Filter `isActive = true` and `sneaker IS NOT NULL`
- Order by `netProfit` desc, limit 8
- Return `sneaker` (as `name`) and `netProfit` (as `profit`)

**Error handling:** Returns `{ trending: [], arbitrage: [] }` on DB error — widgets render empty without crashing.

---

## page.tsx Changes

### Remove
- `trendingSneakers` const (hardcoded array of 15 items)
- Inline hardcoded arbitrage list in the JSX (8 duplicate items in the right-side widget)

### Add
- Two new state vars:
  ```ts
  const [trendingData, setTrendingData] = useState<{ name: string; demand: string }[]>([]);
  const [arbitrageSignals, setArbitrageSignals] = useState<{ name: string; profit: number }[]>([]);
  ```
- One `useEffect` on mount that fetches `/api/trending` and populates both state vars.

### Update
- `useState` for `trending` — initialize from `trendingData` (empty array default)
- The existing shuffle interval references the source array; update it to use `trendingData` instead of `trendingSneakers`
- The right-side arbitrage widget — replace the hardcoded `.map()` source with `arbitrageSignals`

### Fallback behavior
If the fetch fails or returns empty arrays, both widgets render with no items. The existing scroll animation handles zero items without error.

---

## Files Affected

| File | Change |
|------|--------|
| `app/api/trending/route.ts` | New file — GET handler |
| `app/page.tsx` | Remove hardcoded arrays, add fetch + state |

---

## Out of Scope

- Caching / revalidation (Phase B concern)
- Real eBay market stats (Phase B)
- The `marketInsightTitles` rotating header — unchanged
