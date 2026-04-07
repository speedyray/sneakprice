# Dynamic UI Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the `/discover` page a trading terminal feel with live stats, card entry animations, and number count-up effects.

**Architecture:** Three independent layers added to existing components — a new `LiveStatsBar` component, CSS keyframe animations on `ArbitrageDealCard`, and a `useCountUp` hook for number animations. All data is derived from existing SSE stream state in `page.tsx`; no new API calls needed.

**Tech Stack:** Next.js App Router, React hooks, Tailwind CSS, CSS keyframes

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `lib/hooks/useCountUp.ts` | Create | `requestAnimationFrame` count-up hook |
| `components/LiveStatsBar.tsx` | Create | Live stats bar component |
| `components/ArbitrageDealCard.tsx` | Modify | Add `isNew`, `animationDelay` props + animations |
| `app/globals.css` | Modify | Add `@keyframes slideUpFade` and `.animate-slide-up` |
| `app/discover/page.tsx` | Modify | Wire `lastScanAt`, `isNew` tracking, pass props |

---

### Task 1: Add CSS keyframes for card animations

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add the keyframe and utility class**

Open `app/globals.css` and append after the existing `@keyframes scrollVertical` block:

```css
@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUpFade 300ms ease-out forwards;
}

@keyframes flashGreen {
  0%   { border-color: rgb(74 222 128); }
  70%  { border-color: rgb(74 222 128); }
  100% { border-color: rgb(55 65 81); }
}

.animate-flash-green {
  animation: flashGreen 1500ms ease-out forwards;
}
```

- [ ] **Step 2: Verify dev server compiles without errors**

```bash
npm run dev
```

Expected: server starts, no CSS errors in terminal.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add slideUpFade and flashGreen CSS keyframes for deal card animations"
```

---

### Task 2: Create `useCountUp` hook

**Files:**
- Create: `lib/hooks/useCountUp.ts`

- [ ] **Step 1: Create the hooks directory and file**

```bash
mkdir -p lib/hooks
```

```typescript
// lib/hooks/useCountUp.ts
// Animates a number from 0 to `target` over `duration` ms using requestAnimationFrame.
// Returns the current animated value. Returns target immediately if duration is 0.

import { useEffect, useRef, useState } from "react";

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useCountUp(target: number, duration: number): number {
  const [value, setValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (duration === 0 || target === 0) {
      setValue(target);
      return;
    }

    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);

      setValue(Math.round(easedProgress * target * 100) / 100);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration]);

  return value;
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/hooks/useCountUp.ts
git commit -m "feat: add useCountUp hook for animated number transitions"
```

---

### Task 3: Create `LiveStatsBar` component

**Files:**
- Create: `components/LiveStatsBar.tsx`

- [ ] **Step 1: Create the file**

```typescript
// components/LiveStatsBar.tsx
// Trading terminal-style live stats bar shown above deal cards.
// Shows: live indicator, active deal count, last scan time, total profit available.

"use client";

import { useEffect, useState } from "react";
import { useCountUp } from "@/lib/hooks/useCountUp";

interface LiveStatsBarProps {
  dealCount: number;
  lastScanAt: Date | null;
  totalProfit: number;
}

function useTimeAgo(date: Date | null): string {
  const [label, setLabel] = useState("—");

  useEffect(() => {
    if (!date) return;

    const update = () => {
      const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
      if (seconds < 60) setLabel("just now");
      else if (seconds < 3600) setLabel(`${Math.floor(seconds / 60)}m ago`);
      else setLabel(`${Math.floor(seconds / 3600)}h ago`);
    };

    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [date]);

  return label;
}

export function LiveStatsBar({ dealCount, lastScanAt, totalProfit }: LiveStatsBarProps) {
  const animatedProfit = useCountUp(totalProfit, 1000);
  const lastScanLabel = useTimeAgo(lastScanAt);

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs font-mono text-gray-400 flex-wrap">
      {/* Live indicator */}
      <span className="flex items-center gap-1.5 text-green-400 font-semibold">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        LIVE
      </span>

      <span className="text-gray-600">|</span>

      <span>
        <span className="text-white font-semibold">{dealCount}</span> active deal{dealCount !== 1 ? "s" : ""}
      </span>

      <span className="text-gray-600">|</span>

      <span>
        Last scan: <span className="text-white font-semibold">{lastScanLabel}</span>
      </span>

      <span className="text-gray-600">|</span>

      <span>
        <span className="text-green-400 font-semibold">
          ${animatedProfit.toFixed(2)}
        </span>{" "}
        total profit available
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/LiveStatsBar.tsx
git commit -m "feat: add LiveStatsBar component with live indicator and stats"
```

---

### Task 4: Add animation props to `ArbitrageDealCard`

**Files:**
- Modify: `components/ArbitrageDealCard.tsx`

- [ ] **Step 1: Add `isNew` and `animationDelay` to the `ArbDeal` interface and component props**

In `ArbitrageDealCard.tsx`, find the `export function ArbitrageDealCard({ deal }: { deal: ArbDeal })` line and replace it with:

```typescript
interface ArbitrageDealCardProps {
  deal: ArbDeal;
  isNew?: boolean;
  animationDelay?: number;
}

export function ArbitrageDealCard({ deal, isNew = false, animationDelay = 0 }: ArbitrageDealCardProps) {
```

- [ ] **Step 2: Add `isNewVisible` state for the "NEW" badge**

Inside the component, after the existing `const [expanded, setExpanded] = useState(false);` line, add:

```typescript
const [isNewVisible, setIsNewVisible] = useState(isNew);

useEffect(() => {
  if (!isNew) return;
  const timer = setTimeout(() => setIsNewVisible(false), 3000);
  return () => clearTimeout(timer);
}, [isNew]);
```

- [ ] **Step 3: Add `useCountUp` for buy price, sell price, and net profit**

After the existing `const hasPnLBreakdown = ...` line, add:

```typescript
const animatedBuyPrice = useCountUp(buyPrice ?? 0, 600);
const animatedSellPrice = useCountUp(sellPrice ?? 0, 600);
const animatedNetProfit = useCountUp(Math.abs(netProfit ?? 0), 800);
```

Add the import at the top of the file:
```typescript
import { useCountUp } from "@/lib/hooks/useCountUp";
```

- [ ] **Step 4: Apply animation classes and style to the card wrapper**

Find the outermost `<div>` of the card (currently `<div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 space-y-4 hover:border-gray-500 transition-colors">`).

Replace it with:

```tsx
<div
  className={`bg-gray-900 border rounded-2xl p-5 space-y-4 transition-colors animate-slide-up relative ${
    isNew ? "animate-flash-green" : "border-gray-700 hover:border-gray-500"
  }`}
  style={{ animationDelay: `${animationDelay}ms`, animationFillMode: "both" }}
>
```

- [ ] **Step 5: Add the "NEW" badge inside the card wrapper**

As the first child inside the card wrapper div, add:

```tsx
{isNewVisible && (
  <span className="absolute top-3 right-3 bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
    NEW
  </span>
)}
```

- [ ] **Step 6: Replace static price displays with animated values**

Find `{fmt(buyPrice)}` in the Buy section and replace with `{fmt(animatedBuyPrice)}`.

Find `{fmt(sellPrice)}` in the Sell section and replace with `{fmt(animatedSellPrice)}`.

Find the net profit display `{fmt(netProfit)}` in the summary row and replace with:
```tsx
{(netProfit ?? 0) > 0 ? "+" : ""}${animatedNetProfit.toFixed(2)}
```

- [ ] **Step 7: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add components/ArbitrageDealCard.tsx
git commit -m "feat: add entry animations, NEW badge, and count-up numbers to ArbitrageDealCard"
```

---

### Task 5: Wire everything into `page.tsx`

**Files:**
- Modify: `app/discover/page.tsx`

- [ ] **Step 1: Add `LiveStatsBar` import**

At the top of `app/discover/page.tsx`, add:

```typescript
import { LiveStatsBar } from "@/components/LiveStatsBar";
```

- [ ] **Step 2: Add `lastScanAt` state and `newDealIds` set**

Near the other state declarations (around line 162), add:

```typescript
const [lastScanAt, setLastScanAt] = useState<Date | null>(null);
const [newDealIds, setNewDealIds] = useState<Set<string>>(new Set());
```

- [ ] **Step 3: Update the SSE handler to track `lastScanAt` and `newDealIds`**

Find the SSE `onmessage` handler. In the block that handles new-schema deals (`if (data.dealScore !== undefined)`), update it to:

```typescript
if (data.dealScore !== undefined) {
  const deal = data as ArbDeal;
  setLastScanAt(new Date());
  setArbDeals((prev) => {
    const exists = prev.some((d) => d.id === deal.id);
    if (exists) return prev.map((d) => (d.id === deal.id ? deal : d));
    setNewDealCount((c) => c + 1);
    // Mark as new — cleared after 3s by ArbitrageDealCard itself
    setNewDealIds((ids) => new Set([...ids, deal.id]));
    setTimeout(() => {
      setNewDealIds((ids) => {
        const next = new Set(ids);
        next.delete(deal.id);
        return next;
      });
    }, 3500);
    return [deal, ...prev].slice(0, 50);
  });
  return;
}
```

- [ ] **Step 4: Compute `totalProfit` derived value**

After the state declarations block, add:

```typescript
const totalProfit = arbDeals.reduce((sum, d) => sum + (d.netProfit ?? 0), 0);
```

- [ ] **Step 5: Add `LiveStatsBar` above the deal cards grid**

Find this block in the JSX (around line 1090):
```tsx
{/* Deal cards */}
{arbDeals.length === 0 ? (
```

Insert the `LiveStatsBar` immediately above it:

```tsx
{/* Live stats bar */}
<LiveStatsBar
  dealCount={arbDeals.length}
  lastScanAt={lastScanAt}
  totalProfit={totalProfit}
/>

{/* Deal cards */}
{arbDeals.length === 0 ? (
```

- [ ] **Step 6: Pass `isNew` and `animationDelay` to each card**

Find the `ArbitrageDealCard` render in the grid (around line 1106):
```tsx
{arbDeals
  .filter((d) => activeTab === "all" || d.dealLabel === activeTab)
  .map((deal) => (
    <ArbitrageDealCard key={deal.id} deal={deal} />
  ))}
```

Replace with:
```tsx
{arbDeals
  .filter((d) => activeTab === "all" || d.dealLabel === activeTab)
  .map((deal, index) => (
    <ArbitrageDealCard
      key={deal.id}
      deal={deal}
      isNew={newDealIds.has(deal.id)}
      animationDelay={index * 50}
    />
  ))}
```

- [ ] **Step 7: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 8: Manual browser test**

Start dev server: `npm run dev`

1. Open `http://localhost:3000/discover`
2. Confirm the `LiveStatsBar` renders above the deal cards showing `● LIVE`, deal count, last scan time, and total profit
3. Trigger a cron scan:
   ```bash
   curl "http://localhost:3000/api/cron/scan-deals?secret=YOUR_SECRET"
   ```
4. Watch for new cards to slide in from below with green border flash and "NEW" badge
5. Confirm price numbers count up on card render

- [ ] **Step 9: Commit**

```bash
git add app/discover/page.tsx
git commit -m "feat: wire LiveStatsBar, isNew tracking, and stagger animations into discover page"
```
