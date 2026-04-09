# Marketplace Buy/Sell Links in Scan Workflow — Design

**Date:** 2026-04-08  
**Status:** Approved

---

## Overview

After a user scans a sneaker and market data loads, show actionable marketplace links directly inside Step 3 and Step 4 of the 4-step scan workflow:

- **Step 3 (Market value):** One "Buy on eBay" button — cheapest active listing link
- **Step 4 (Profit opportunity):** Four "Sell here" buttons — eBay, StockX, GOAT, Flight Club

Links only appear after scan completes and `marketData` is populated. No placeholder links before scan.

---

## What Changes

### 1. `EbayResponse` type (`app/page.tsx`)

Add `cheapestItemId` to the `deal` field:

```ts
deal?: {
  buyPrice?: number;
  marketPrice?: number;
  profit?: number;
  roi?: number;
  cheapestItemId?: string;   // ← add this
} | null;
```

The `/api/ebay` route already returns this field. The type just needs to expose it so `marketData.deal.cheapestItemId` is accessible.

### 2. `StepCard` component (`app/page.tsx`)

Add optional `children?: React.ReactNode` prop, rendered after the helper text:

```tsx
function StepCard({ step, title, icon, value, helper, children }: {
  step: string;
  title: string;
  icon: React.ReactNode;
  value: string;
  helper: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 text-left shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-neutral-700">
        <div className="rounded-full bg-neutral-100 p-2">{icon}</div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{step}</p>
          <h3 className="font-semibold">{title}</h3>
        </div>
      </div>
      <p className="text-2xl font-bold text-black">{value}</p>
      <p className="mt-2 text-sm text-neutral-500">{helper}</p>
      {children}
    </div>
  );
}
```

### 3. Step 3 JSX — Buy link

When `marketData` is loaded, pass a buy button as children:

```tsx
<StepCard
  step="Step 3"
  title="Market value"
  icon={<DollarSign size={18} />}
  value={formatMoney(derived.soldMedian)}
  helper={...}
>
  {marketData && (
    <div className="mt-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">Buy here</p>
      <a
        href={
          marketData.deal?.cheapestItemId
            ? `https://www.ebay.com/itm/${marketData.deal.cheapestItemId}`
            : `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(identifiedSneaker)}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-black hover:bg-yellow-300 transition"
      >
        eBay
      </a>
    </div>
  )}
</StepCard>
```

### 4. Step 4 JSX — Sell links

When `marketData` and `identifiedSneaker` are both set, pass four sell buttons as children:

```tsx
<StepCard
  step="Step 4"
  title="Profit opportunity"
  icon={<TrendingUp size={18} />}
  value={...}
  helper={...}
>
  {marketData && identifiedSneaker && (
    <div className="mt-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">Sell here</p>
      <div className="flex flex-wrap gap-2">
        <a href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(identifiedSneaker)}`}
           target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-1.5 rounded-lg bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-black hover:bg-yellow-300 transition">
          eBay
        </a>
        <a href={`https://stockx.com/search?s=${encodeURIComponent(identifiedSneaker)}`}
           target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-400 transition">
          StockX
        </a>
        <a href={`https://www.goat.com/search?query=${encodeURIComponent(identifiedSneaker)}`}
           target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-1.5 text-sm font-semibold text-white hover:bg-neutral-800 transition">
          GOAT
        </a>
        <a href={`https://www.flightclub.com/catalogsearch/result/?q=${encodeURIComponent(identifiedSneaker)}`}
           target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-orange-400 transition">
          Flight Club
        </a>
      </div>
    </div>
  )}
</StepCard>
```

---

## URL Reference

| Platform | URL pattern |
|----------|-------------|
| eBay buy (specific listing) | `https://www.ebay.com/itm/{cheapestItemId}` |
| eBay buy (fallback search) | `https://www.ebay.com/sch/i.html?_nkw={sneaker}` |
| eBay sell (search) | `https://www.ebay.com/sch/i.html?_nkw={sneaker}` |
| StockX | `https://stockx.com/search?s={sneaker}` |
| GOAT | `https://www.goat.com/search?query={sneaker}` |
| Flight Club | `https://www.flightclub.com/catalogsearch/result/?q={sneaker}` |

All `{sneaker}` values are `encodeURIComponent(identifiedSneaker)`.

---

## Behavior

- Links are hidden until `marketData` is non-null (i.e., after scan completes)
- Step 4 sell links additionally require `identifiedSneaker` to be non-empty (needed for the search URL)
- All links open in a new tab (`target="_blank"`, `rel="noopener noreferrer"`)
- The eBay buy link uses the specific cheapest listing item ID when available, falling back to a search URL

---

## Files Affected

| File | Change |
|------|--------|
| `app/page.tsx` | Extend `EbayResponse.deal` type, extend `StepCard` with `children`, add buy link to Step 3, add sell links to Step 4 |

---

## Out of Scope

- Affiliate/referral link tracking
- Platform-specific price comparisons
- Dynamic sell price estimates per platform
- Caching or persisting the links
