# Phase B: Real Market Stats Design

**Date:** 2026-04-08  
**Status:** Approved

---

## Overview

Replace three hardcoded vanity counters on the homepage with real DB aggregates, and add a new "Live eBay Market Prices" section showing fresh eBay price data for the top 5 active deals.

Two new API endpoints serve this data. They are fetched independently on mount so DB counters appear instantly while eBay prices load asynchronously.

---

## API

### `GET /api/stats`

Queries Prisma for three DB aggregates. No external API calls — fast.

**Queries:**
- `COUNT(*)` from `Scan` table → `sneakersAnalyzed`
- `SUM(sellPrice)` from `Deal` table (where `sellPrice IS NOT NULL`) → `resaleValue`
- `COUNT(*)` from `User` table → `userCount`

**Response:**
```json
{ "sneakersAnalyzed": 843, "resaleValue": 124500.50, "userCount": 312 }
```

**Error handling:** Returns `{ "sneakersAnalyzed": 0, "resaleValue": 0, "userCount": 0 }` on any DB error (with `console.error` logging).

---

### `GET /api/market-prices`

Gets top 5 active deals from `Deal` table by `dealScore` (where `sneaker IS NOT NULL` and `isActive = true`), then fetches live eBay active listing prices for each in parallel.

**Step 1 — DB query:**
```
SELECT sneaker FROM Deal
WHERE isActive = true AND sneaker IS NOT NULL AND dealScore IS NOT NULL
ORDER BY dealScore DESC
LIMIT 5
```

**Step 2 — Parallel eBay calls:**

For each sneaker, calls eBay Browse API (same endpoint as `/api/ebay`):
```
GET /buy/browse/v1/item_summary/search?q={sneaker}&limit=30&filter=buyingOptions:{FIXED_PRICE}
```

Uses `getEbayAccessToken()` from `lib/ebay.ts`. Token fetched once, reused across all 5 calls.

**Price computation per sneaker** (mirrors existing `/api/ebay` logic):
- Extract prices from `itemSummaries`
- Trim 15% outliers from each end
- Compute median of trimmed prices → `medianPrice`
- Count total listings → `totalListings`
- Derive `marketLabel`: volatility > 0.5 → "High Volatility", < 0.2 → "Stable Blue-Chip", else → "Active Market"

**Response:**
```json
{
  "prices": [
    { "sneaker": "Air Jordan 5 Retro Metallic", "medianPrice": 210, "totalListings": 24, "marketLabel": "Stable Blue-Chip" },
    { "sneaker": "Adidas Yeezy 700 Vanta", "medianPrice": 145, "totalListings": 18, "marketLabel": "Active Market" }
  ]
}
```

**Error handling:**
- If an individual eBay call fails or returns no prices, that sneaker is omitted from `prices`
- If the DB query or token fetch fails entirely, returns `{ "prices": [] }` with `console.error` logging

---

## `page.tsx` Changes

### New state vars

```ts
const [marketStats, setMarketStats] = useState<{ sneakersAnalyzed: number; resaleValue: number; userCount: number } | null>(null);
const [marketPrices, setMarketPrices] = useState<{ sneaker: string; medianPrice: number; totalListings: number; marketLabel: string }[]>([]);
```

### Two new `useEffect` fetches on mount (both with `AbortController`)

**Fetch 1 — `/api/stats`:** Populates `marketStats`.

**Fetch 2 — `/api/market-prices`:** Populates `marketPrices`.

Both silently ignore `AbortError`; other errors are caught and leave state at default (null / empty array).

### Replace hardcoded counters

The existing stat grid (lines ~1055–1068) shows three hardcoded values. Replace with formatted real values from `marketStats`:

| Hardcoded | Real source | Format |
|-----------|-------------|--------|
| `12,000+` | `sneakersAnalyzed` | `"843+"` or `"1.2K+"` if ≥ 1000 |
| `$3.2M` | `resaleValue` | `"$124K"` if < 1M, `"$1.2M"` if ≥ 1M |
| `2,500+` | `userCount` | `"312+"` |

While `marketStats` is `null` (loading), show `"—"` as placeholder.

### New "Live eBay Market Prices" section

Added below the existing "Live Sneaker Market Insights" panels:

- Title: `🔴 Live eBay Market Prices`
- Shows `marketPrices` as a simple list: sneaker name | median price | listing count | market label
- While loading (empty array): shows `"Loading eBay data…"`
- If empty after load: renders nothing (section hidden)

---

## Files Affected

| File | Change |
|------|--------|
| `app/api/stats/route.ts` | **Create** — GET handler, DB aggregates |
| `app/api/market-prices/route.ts` | **Create** — GET handler, top 5 deals + parallel eBay calls |
| `app/page.tsx` | **Modify** — two new fetches, real counters, new eBay prices section |

---

## Out of Scope

- Caching the eBay responses (future improvement)
- Refreshing stats without a page reload
- The `SneakerPriceCache` table (not used here — prices fetched fresh)
