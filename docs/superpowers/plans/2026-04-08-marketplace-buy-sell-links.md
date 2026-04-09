# Marketplace Buy/Sell Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add actionable buy and sell marketplace links inside Step 3 and Step 4 of the scan workflow, visible only after a scan completes.

**Architecture:** Single-file change to `app/page.tsx`. Extend `EbayResponse.deal` type to include `cheapestItemId`, add `children?: React.ReactNode` to `StepCard`, then pass buy/sell link buttons as children to Step 3 and Step 4 conditionally on `marketData` being non-null.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS

---

## File Map

| File | Action |
|------|--------|
| `app/page.tsx` | **Modify** — extend `EbayResponse` type, extend `StepCard`, add buy link to Step 3, add sell links to Step 4 |

---

## Task 1: Extend `EbayResponse` type with `cheapestItemId`

**Files:**
- Modify: `app/page.tsx` (lines ~92–98 — the `deal` field inside `EbayResponse`)

**Context:** `EbayResponse` is defined near the top of the file. Its `deal` field currently has `buyPrice`, `marketPrice`, `profit`, `roi`. The `/api/ebay` route already returns `cheapestItemId` in the deal object — the type just needs to expose it.

- [ ] **Step 1: Find the `EbayResponse` type**

Open `app/page.tsx` and locate this block (around line 92):

```ts
  deal?: {
    buyPrice?: number;
    marketPrice?: number;
    profit?: number;
    roi?: number;
  } | null;
```

- [ ] **Step 2: Add `cheapestItemId` to the `deal` field**

Replace that block with:

```ts
  deal?: {
    buyPrice?: number;
    marketPrice?: number;
    profit?: number;
    roi?: number;
    cheapestItemId?: string;
  } | null;
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /home/speedy4ray/MyProjects/SneakPriceShoes/sneakprice && npx tsc --noEmit 2>&1 | grep -v node_modules
```

Expected: no output (zero errors).

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: expose cheapestItemId in EbayResponse type"
```

---

## Task 2: Add `children` prop to `StepCard`

**Files:**
- Modify: `app/page.tsx` (the `StepCard` function, defined after the main component — around line 1326)

**Context:** `StepCard` currently accepts `step`, `title`, `icon`, `value`, `helper`. It renders a card with those fields. We need to render additional content (links) after the helper text, passed in as `children`.

- [ ] **Step 1: Find the `StepCard` function signature**

Locate this block (around line 1326):

```tsx
function StepCard({
  step,
  title,
  icon,
  value,
  helper,
}: {
  step: string;
  title: string;
  icon: React.ReactNode;
  value: string;
  helper: string;
}) {
```

- [ ] **Step 2: Add `children` to the destructuring and type**

Replace with:

```tsx
function StepCard({
  step,
  title,
  icon,
  value,
  helper,
  children,
}: {
  step: string;
  title: string;
  icon: React.ReactNode;
  value: string;
  helper: string;
  children?: React.ReactNode;
}) {
```

- [ ] **Step 3: Find the return body of `StepCard`**

Locate this block (immediately after the signature above):

```tsx
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 text-left shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-neutral-700">
        <div className="rounded-full bg-neutral-100 p-2">{icon}</div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {step}
          </p>
          <h3 className="font-semibold">{title}</h3>
        </div>
      </div>

      <p className="text-2xl font-bold text-black">{value}</p>
      <p className="mt-2 text-sm text-neutral-500">{helper}</p>
    </div>
  );
```

- [ ] **Step 4: Add `{children}` after the helper text**

Replace with:

```tsx
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 text-left shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-neutral-700">
        <div className="rounded-full bg-neutral-100 p-2">{icon}</div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {step}
          </p>
          <h3 className="font-semibold">{title}</h3>
        </div>
      </div>

      <p className="text-2xl font-bold text-black">{value}</p>
      <p className="mt-2 text-sm text-neutral-500">{helper}</p>
      {children}
    </div>
  );
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | grep -v node_modules
```

Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add children prop to StepCard"
```

---

## Task 3: Add buy link to Step 3 (Market value)

**Files:**
- Modify: `app/page.tsx` (the Step 3 `<StepCard>` in the JSX, around line 939)

**Context:** Step 3 is the "Market value" StepCard. When `marketData` is non-null (scan completed), show a yellow "eBay" button that links to the cheapest specific listing if `cheapestItemId` is available, or falls back to an eBay search URL using `identifiedSneaker`.

- [ ] **Step 1: Find the Step 3 StepCard**

Locate this block (around line 939):

```tsx
              <StepCard
                step="Step 3"
                title="Market value"
                icon={<DollarSign size={18} />}
                value={formatMoney(derived.soldMedian)}
                helper={
                  derived.activeMedian
                    ? `Active market median: ${formatMoney(derived.activeMedian)}`
                    : "Sold and active market pricing will appear here."
                }
              />
```

- [ ] **Step 2: Replace with StepCard that includes the buy link**

```tsx
              <StepCard
                step="Step 3"
                title="Market value"
                icon={<DollarSign size={18} />}
                value={formatMoney(derived.soldMedian)}
                helper={
                  derived.activeMedian
                    ? `Active market median: ${formatMoney(derived.activeMedian)}`
                    : "Sold and active market pricing will appear here."
                }
              >
                {marketData && (
                  <div className="mt-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Buy here
                    </p>
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

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | grep -v node_modules
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add eBay buy link to Step 3 of scan workflow"
```

---

## Task 4: Add sell links to Step 4 (Profit opportunity)

**Files:**
- Modify: `app/page.tsx` (the Step 4 `<StepCard>` in the JSX, around line 951)

**Context:** Step 4 is the "Profit opportunity" StepCard. When both `marketData` is non-null and `identifiedSneaker` is non-empty, show four sell buttons: eBay (yellow), StockX (green), GOAT (black), Flight Club (orange). All use search URLs with `encodeURIComponent(identifiedSneaker)`.

- [ ] **Step 1: Find the Step 4 StepCard**

Locate this block (around line 951):

```tsx
              <StepCard
                step="Step 4"
                title="Profit opportunity"
                icon={<TrendingUp size={18} />}
                value={
                  typeof derived.profit === "number"
                    ? `+$${derived.profit.toFixed(0)}`
                    : "—"
                }
                helper={
                  typeof derived.roi === "number"
                    ? `Estimated ROI: ${derived.roi.toFixed(1)}%`
                    : "Spread versus current listings will appear here."
                }
              />
```

- [ ] **Step 2: Replace with StepCard that includes the sell links**

```tsx
              <StepCard
                step="Step 4"
                title="Profit opportunity"
                icon={<TrendingUp size={18} />}
                value={
                  typeof derived.profit === "number"
                    ? `+$${derived.profit.toFixed(0)}`
                    : "—"
                }
                helper={
                  typeof derived.roi === "number"
                    ? `Estimated ROI: ${derived.roi.toFixed(1)}%`
                    : "Spread versus current listings will appear here."
                }
              >
                {marketData && identifiedSneaker && (
                  <div className="mt-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Sell here
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(identifiedSneaker)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-black hover:bg-yellow-300 transition"
                      >
                        eBay
                      </a>
                      <a
                        href={`https://stockx.com/search?s=${encodeURIComponent(identifiedSneaker)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-400 transition"
                      >
                        StockX
                      </a>
                      <a
                        href={`https://www.goat.com/search?query=${encodeURIComponent(identifiedSneaker)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-1.5 text-sm font-semibold text-white hover:bg-neutral-800 transition"
                      >
                        GOAT
                      </a>
                      <a
                        href={`https://www.flightclub.com/catalogsearch/result/?q=${encodeURIComponent(identifiedSneaker)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-orange-400 transition"
                      >
                        Flight Club
                      </a>
                    </div>
                  </div>
                )}
              </StepCard>
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | grep -v node_modules
```

Expected: no output.

- [ ] **Step 4: Verify in the browser**

```bash
npm run dev
```

Visit `http://localhost:3000`, scroll to the scan tool, upload a sneaker image and complete a scan. After scan completes:
- Step 3 should show a yellow "eBay" button under "Buy here"
- Step 4 should show four buttons under "Sell here": yellow eBay, green StockX, black GOAT, orange Flight Club
- Clicking each should open the correct marketplace URL in a new tab
- Before scan completes, no links appear in either step

Kill dev server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add eBay/StockX/GOAT/Flight Club sell links to Step 4 of scan workflow"
```
