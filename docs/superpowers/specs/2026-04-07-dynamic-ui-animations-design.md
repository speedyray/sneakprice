# Dynamic UI Animations — Design Spec

**Date:** 2026-04-07
**Status:** Approved
**Vibe:** Trading terminal / Bloomberg — dark, dense, numbers flashing green

## Overview

Make the `/discover` page feel alive with a trading terminal aesthetic. Three focused additions on top of existing components: a live stats bar, deal card entry animations, and number count-up animations. No new API calls — all derived from existing SSE stream data and component state.

---

## Section 1 — Live Stats Bar

A thin bar displayed above the deal cards at all times.

**Content:**
```
● LIVE  |  8 active deals  |  Last scan: 4m ago  |  $342 total profit available
```

**Fields:**
| Field | Source |
|---|---|
| `● LIVE` | Pulsing green dot, always shown when SSE is connected |
| Active deals | `arbDeals.length` (already in state) |
| Last scan | Time since SSE last pushed a deal — ticks every 60s via `setInterval` |
| Total profit | Sum of `netProfit` across all `arbDeals`, counts up on load |

**Implementation:**
- New component: `components/LiveStatsBar.tsx`
- Accepts props: `dealCount`, `lastScanAt: Date | null`, `totalProfit`
- `lastScanAt` updated in `page.tsx` whenever SSE pushes a deal
- Pulsing dot uses CSS animation (`animate-pulse` via Tailwind)
- Total profit value rendered via `useCountUp` hook (see Section 3)
- Styling: dark background (`bg-gray-900`), green accents, monospace font, compact single row

---

## Section 2 — Card Entry Animations

**On initial page load (existing DB deals):**
- Cards stagger in sequentially — each card has a 50ms delay multiplied by its index
- Animation: slide up 16px + fade in over 300ms (`translateY(16px) → 0`, `opacity: 0 → 1`)

**When SSE pushes a new deal:**
- Same slide-up + fade-in animation
- Green border flash: `border-green-400` for 1500ms, then transitions back to `border-gray-700`
- "NEW" badge in the top-right corner of the card, fades out after 3 seconds

**Implementation:**
- CSS keyframe in `app/globals.css`:
  ```css
  @keyframes slideUpFade {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .animate-slide-up { animation: slideUpFade 300ms ease-out forwards; }
  ```
- `ArbitrageDealCard` accepts two new optional props:
  - `isNew?: boolean` — triggers green border flash + "NEW" badge
  - `animationDelay?: number` — ms delay for stagger on load
- `page.tsx` marks a deal as `isNew: true` when received via SSE, sets it to `false` after 3 seconds via `setTimeout`
- Stagger: when initial deals load, pass `animationDelay={index * 50}` to each card

---

## Section 3 — Number Count-Up Animation

**Hook:** `lib/hooks/useCountUp.ts`

```ts
useCountUp(target: number, duration: number): number
```

- Returns the current animated value, incrementing from 0 to `target` over `duration` ms
- Uses `requestAnimationFrame` for smooth animation
- Easing: `easeOut` (fast start, slows near target)
- Returns `target` immediately if `duration === 0` or `target === 0`

**Applied to in `ArbitrageDealCard`:**
| Field | Duration |
|---|---|
| Buy price | 600ms |
| Sell price | 600ms |
| Net profit | 800ms |

**On price update (existing deal pushed via SSE):**
- Does NOT re-run count-up (avoids re-running animation on every SSE poll)
- Instead: flashes the number green for 800ms via a CSS class toggle

**Applied to in `LiveStatsBar`:**
- Total profit value counts up over 1000ms on initial render

---

## Out of Scope

- Sparklines or price history charts (separate spec)
- Sound effects
- Push notifications
- Replacing hardcoded `trendingSneakers` with real data (separate spec — Phase A/B)
