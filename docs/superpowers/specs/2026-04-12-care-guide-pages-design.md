# Sneaker Care Guide Pages — Design Spec
**Date:** 2026-04-12

## Overview

Build 5 static content pages under `/care/*` for the Sneaker Care Guide dropdown in `SecondaryNav`. Each page covers a specific care topic with practical tips. All pages share a persistent sidebar listing all 5 topics.

## Routes

| Label | Route |
|---|---|
| Cleaning Tips | `/care/cleaning` |
| Storage & Protection | `/care/storage` |
| Deodorizing | `/care/deodorizing` |
| Sole Restoration | `/care/sole-restoration` |
| Crease Prevention | `/care/crease-prevention` |

## Architecture

### Shared Layout (`app/care/layout.tsx`)
- Wraps all 5 care pages
- Two-column layout on desktop: sidebar (fixed ~220px) + main content area
- On mobile: sidebar becomes a horizontal scrollable tab row above the content
- Sidebar highlights the active page using `usePathname()`

### Sidebar (`components/CareGuideSidebar.tsx`)
- Lists all 5 topics as `<Link>` items
- Active item: green text + left border accent (`border-l-2 border-green-600 text-green-600`)
- Inactive item: `text-neutral-600 hover:text-black`
- Sticky on desktop (`sticky top-4`)
- On mobile: `flex overflow-x-auto gap-3` horizontal scroll strip

### Each Page (`app/care/[topic]/page.tsx`)
Follows the existing guide page style:
- White background, `text-black`
- `h1`: `text-3xl font-bold`
- `h2`: `text-xl font-semibold text-green-600`
- Body text: `leading-relaxed text-neutral-700`
- Tip cards: `rounded-xl border border-black/10 bg-white p-5 shadow-sm`
- CTA card at bottom linking to `/scan` (SneakPrice scan tool)

## Pages Content Outline

### 1. Cleaning Tips (`/care/cleaning`)
- Intro: why keeping sneakers clean preserves value
- Sections: dry cleaning vs wet cleaning, tools needed (soft brush, microfibre cloth, sneaker cleaner), step-by-step for mesh/leather/suede, what to avoid (bleach, washing machines)
- Tip card: "Clean before selling — clean sneakers photograph better and fetch higher resale prices"

### 2. Storage & Protection (`/care/storage`)
- Intro: proper storage extends sneaker life and preserves resale value
- Sections: ideal conditions (cool, dry, away from sunlight), using original boxes, clear stackable containers, silica gel packets for moisture, avoiding plastic bags (yellowing)
- Tip card: "Stored sneakers in original boxes can command a premium on resale"

### 3. Deodorizing (`/care/deodorizing`)
- Intro: odour is the #1 buyer turn-off for used sneakers
- Sections: baking soda method, cedar shoe trees, activated charcoal inserts, sprays (what's safe vs what damages materials), airing out properly
- Tip card: "Fresh-smelling sneakers sell faster — deodorize before listing"

### 4. Sole Restoration (`/care/sole-restoration`)
- Intro: yellowed/oxidised soles are the most common resale value killer
- Sections: identifying sole yellowing, hydrogen peroxide + UV method (retro-brighting), sole sauce products, midsole cleaning, when to use a professional
- Tip card: "Restored soles can add $20–$50 to a sneaker's resale value"

### 5. Crease Prevention (`/care/crease-prevention`)
- Intro: creases form naturally but can be minimised
- Sections: toe box crease shields/force fields, stuffing with tissue when storing, steam + heat method for existing creases, how fit affects creasing, iron method (with damp cloth)
- Tip card: "Crease-free sneakers photograph better and signal better care to buyers"

## Styling Consistency
- Matches existing guide pages in `app/app/` — same bg-white, green headings, neutral body
- No new dependencies
- All content is static (no DB, no API calls)

## Out of Scope
- Search or filtering within care guides
- User comments or ratings
- Dynamic content from any external source
