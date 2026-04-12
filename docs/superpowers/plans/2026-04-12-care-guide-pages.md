# Care Guide Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 5 static Sneaker Care Guide pages under `/care/*` with a shared sidebar layout.

**Architecture:** A Next.js shared layout (`app/care/layout.tsx`) wraps all 5 pages and renders a sticky sidebar listing all topics. The sidebar highlights the active route using `usePathname()`. Each page is a static React component following the existing guide page style.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS

---

## File Map

| Action | Path | Purpose |
|---|---|---|
| Create | `components/CareGuideSidebar.tsx` | Sidebar with all 5 topic links + active state |
| Create | `app/care/layout.tsx` | Shared two-column layout wrapping all care pages |
| Create | `app/care/cleaning/page.tsx` | Cleaning Tips page |
| Create | `app/care/storage/page.tsx` | Storage & Protection page |
| Create | `app/care/deodorizing/page.tsx` | Deodorizing page |
| Create | `app/care/sole-restoration/page.tsx` | Sole Restoration page |
| Create | `app/care/crease-prevention/page.tsx` | Crease Prevention page |

---

### Task 1: CareGuideSidebar component

**Files:**
- Create: `components/CareGuideSidebar.tsx`

- [ ] **Step 1: Create the sidebar component**

```tsx
// components/CareGuideSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const topics = [
  { label: "Cleaning Tips", href: "/care/cleaning" },
  { label: "Storage & Protection", href: "/care/storage" },
  { label: "Deodorizing", href: "/care/deodorizing" },
  { label: "Sole Restoration", href: "/care/sole-restoration" },
  { label: "Crease Prevention", href: "/care/crease-prevention" },
];

export default function CareGuideSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile: horizontal scrollable strip */}
      <div className="flex overflow-x-auto border-b border-black/10 bg-white px-4 pb-3 pt-4 sm:hidden">
        {topics.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`mr-4 shrink-0 text-sm font-medium transition ${
              pathname === t.href
                ? "border-b-2 border-green-600 pb-1 text-green-600"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {/* Desktop: sticky vertical sidebar */}
      <aside className="hidden sm:block w-52 shrink-0">
        <div className="sticky top-6 space-y-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Care Guide
          </p>
          {topics.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                pathname === t.href
                  ? "border-l-2 border-green-600 bg-green-50 pl-[10px] text-green-700"
                  : "text-neutral-600 hover:bg-black/5 hover:text-black"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: no errors referencing `CareGuideSidebar.tsx`

- [ ] **Step 3: Commit**

```bash
git add components/CareGuideSidebar.tsx
git commit -m "feat: add CareGuideSidebar component"
```

---

### Task 2: Shared care layout

**Files:**
- Create: `app/care/layout.tsx`

- [ ] **Step 1: Create the layout**

```tsx
// app/care/layout.tsx
import CareGuideSidebar from "@/components/CareGuideSidebar";

export default function CareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:flex sm:gap-10 sm:px-6">
        <CareGuideSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: no errors referencing `app/care/layout.tsx`

- [ ] **Step 3: Commit**

```bash
git add app/care/layout.tsx
git commit -m "feat: add shared care guide layout with sidebar"
```

---

### Task 3: Cleaning Tips page

**Files:**
- Create: `app/care/cleaning/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// app/care/cleaning/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Sneaker Cleaning Tips | SneakPrice",
  description: "How to clean sneakers properly to preserve their condition and resale value.",
};

export default function CleaningTipsPage() {
  return (
    <article className="space-y-8 text-black">
      <h1 className="text-3xl font-bold">Sneaker Cleaning Tips</h1>

      <p className="leading-relaxed text-neutral-600">
        Keeping your sneakers clean is the single most impactful thing you can do to
        preserve their condition — and their resale value. Dirty sneakers photograph
        poorly and signal neglect to buyers. Here&apos;s how to clean them properly.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Tools You Need</h2>
      <ul className="list-disc space-y-2 pl-5 text-neutral-700">
        <li>Soft-bristle brush (an old toothbrush works well for detailing)</li>
        <li>Microfibre cloth</li>
        <li>Sneaker cleaning solution (Crep Protect, Jason Markk, or diluted dish soap)</li>
        <li>Small bowl of warm water</li>
        <li>Paper towels or shoe trees for drying shape</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-600">Dry Cleaning First</h2>
      <p className="leading-relaxed text-neutral-700">
        Before applying any liquid, knock the sneakers together to dislodge loose dirt,
        then use a dry soft brush to remove surface dust from the upper, midsole, and
        outsole. This prevents mud from spreading when wet cleaning begins.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Wet Cleaning by Material</h2>

      <h3 className="font-semibold text-neutral-800">Mesh &amp; Knit</h3>
      <p className="leading-relaxed text-neutral-700">
        Mix a few drops of sneaker cleaner with warm water. Dip the brush, work in small
        circular motions, then blot (don&apos;t rub) with a microfibre cloth. Mesh dries
        fast — avoid soaking.
      </p>

      <h3 className="font-semibold text-neutral-800">Leather &amp; Synthetic Leather</h3>
      <p className="leading-relaxed text-neutral-700">
        Wipe with a damp microfibre cloth and a small amount of cleaner. Leather responds
        well to a dedicated leather conditioner after cleaning to prevent cracking.
      </p>

      <h3 className="font-semibold text-neutral-800">Suede &amp; Nubuck</h3>
      <p className="leading-relaxed text-neutral-700">
        Use a dedicated suede brush — never water on raw suede. For stains, a suede eraser
        lifts marks without damaging the nap. Always brush in one direction to restore texture.
      </p>

      <h2 className="text-xl font-semibold text-green-600">What to Avoid</h2>
      <ul className="list-disc space-y-2 pl-5 text-neutral-700">
        <li><strong>Washing machines</strong> — agitation damages glue bonds and shape</li>
        <li><strong>Bleach</strong> — yellows midsoles and destroys materials</li>
        <li><strong>Direct heat to dry</strong> — use room temperature air, stuffed with paper</li>
        <li><strong>Abrasive scrubbers</strong> — scratch leather and flatten suede nap</li>
      </ul>

      <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
        <h3 className="font-semibold text-green-700">Resale Tip</h3>
        <p className="mt-1 text-sm text-neutral-700">
          Clean sneakers before photographing for sale. Clean kicks fetch higher bids and
          sell faster — buyers assume well-kept shoes have been stored properly too.
        </p>
      </div>

      <div className="border-t border-black/10 pt-6">
        <p className="text-sm text-neutral-500">
          Know your sneaker&apos;s market value before you sell.{" "}
          <Link href="/scan" className="font-medium text-green-600 hover:underline">
            Scan it with SneakPrice →
          </Link>
        </p>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: no errors referencing `app/care/cleaning/page.tsx`

- [ ] **Step 3: Commit**

```bash
git add app/care/cleaning/page.tsx
git commit -m "feat: add cleaning tips care guide page"
```

---

### Task 4: Storage & Protection page

**Files:**
- Create: `app/care/storage/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// app/care/storage/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Sneaker Storage & Protection | SneakPrice",
  description: "How to store sneakers properly to prevent yellowing, oxidation, and damage.",
};

export default function StoragePage() {
  return (
    <article className="space-y-8 text-black">
      <h1 className="text-3xl font-bold">Sneaker Storage &amp; Protection</h1>

      <p className="leading-relaxed text-neutral-600">
        How you store sneakers has a direct impact on their long-term condition and resale
        value. Poor storage causes yellowing, sole oxidation, and material breakdown — all
        of which lower what a buyer will pay.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Ideal Storage Conditions</h2>
      <ul className="list-disc space-y-2 pl-5 text-neutral-700">
        <li><strong>Cool and dry</strong> — heat accelerates sole yellowing and glue degradation</li>
        <li><strong>Away from direct sunlight</strong> — UV light fades colourways and oxidises soles</li>
        <li><strong>Good airflow</strong> — trapped moisture leads to mould and odour</li>
        <li><strong>Stable temperature</strong> — avoid garages and attics with big swings</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-600">Original Box vs Clear Containers</h2>
      <p className="leading-relaxed text-neutral-700">
        Original boxes are ideal for resale — buyers pay a premium for &quot;box included.&quot;
        Store them lidded to keep dust out. If you&apos;ve lost the box, clear stackable sneaker
        containers (Shoebox, IRIS) protect while letting you see what&apos;s inside at a glance.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Controlling Moisture</h2>
      <p className="leading-relaxed text-neutral-700">
        Place 1–2 silica gel packets inside each box. Replace them every 6–12 months.
        Silica gel is cheap and prevents the humidity build-up that causes sole yellowing
        and mould on insoles.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Maintaining Shape</h2>
      <p className="leading-relaxed text-neutral-700">
        Stuff toe boxes with acid-free tissue paper or use plastic shoe trees to hold the
        shape. Avoid newspaper — the ink can transfer onto light-coloured liners.
      </p>

      <h2 className="text-xl font-semibold text-green-600">What to Avoid</h2>
      <ul className="list-disc space-y-2 pl-5 text-neutral-700">
        <li><strong>Plastic bags sealed airtight</strong> — traps moisture, accelerates yellowing</li>
        <li><strong>Stacking without boxes</strong> — sole pressure deforms uppers over time</li>
        <li><strong>Basement storage</strong> — typically humid; use a dehumidifier if unavoidable</li>
      </ul>

      <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
        <h3 className="font-semibold text-green-700">Resale Tip</h3>
        <p className="mt-1 text-sm text-neutral-700">
          Sneakers stored in original boxes with receipt and extra laces command a meaningful
          premium. Hold onto everything that came in the box.
        </p>
      </div>

      <div className="border-t border-black/10 pt-6">
        <p className="text-sm text-neutral-500">
          Know your sneaker&apos;s market value before you sell.{" "}
          <Link href="/scan" className="font-medium text-green-600 hover:underline">
            Scan it with SneakPrice →
          </Link>
        </p>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/care/storage/page.tsx
git commit -m "feat: add storage & protection care guide page"
```

---

### Task 5: Deodorizing page

**Files:**
- Create: `app/care/deodorizing/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// app/care/deodorizing/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Sneaker Deodorizing | SneakPrice",
  description: "How to remove odour from sneakers before storing or selling them.",
};

export default function DeodorizingPage() {
  return (
    <article className="space-y-8 text-black">
      <h1 className="text-3xl font-bold">Deodorizing Sneakers</h1>

      <p className="leading-relaxed text-neutral-600">
        Odour is the number one buyer turn-off for used sneakers. Even a visually
        perfect pair loses value — and buyers — if it smells. Here&apos;s how to neutralise
        odour without damaging materials.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Baking Soda Method</h2>
      <p className="leading-relaxed text-neutral-700">
        The simplest and cheapest method. Pour a tablespoon of baking soda into each shoe,
        shake to distribute, and leave overnight. Tap out thoroughly before wearing or
        storing. Baking soda neutralises acid-based odours rather than masking them.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Cedar Shoe Trees</h2>
      <p className="leading-relaxed text-neutral-700">
        Cedar naturally absorbs moisture and provides a mild deodorising effect. Insert
        cedar shoe trees after every wear and when storing. They also maintain shape — a
        two-for-one benefit. Replace or sand them lightly every 6 months to restore
        absorbency.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Activated Charcoal Inserts</h2>
      <p className="leading-relaxed text-neutral-700">
        Activated charcoal bags (available as small pouches) placed inside shoes absorb
        odour molecules. Recharge them monthly by leaving in direct sunlight for a few
        hours. More effective than baking soda for persistent odours.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Sprays — What&apos;s Safe</h2>
      <p className="leading-relaxed text-neutral-700">
        Enzyme-based sprays (like Lumi Outdoors or Rocket Pure) break down odour-causing
        bacteria without bleaching materials. Spray inside, let air dry fully before closing
        the box. Avoid alcohol-heavy sprays on suede and nubuck — they dry out the material.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Airing Out</h2>
      <p className="leading-relaxed text-neutral-700">
        After wearing, leave sneakers in a well-ventilated spot for at least 24 hours
        before boxing them. Never box shoes that are still warm or slightly damp — that&apos;s
        how mould and odour develop inside the box.
      </p>

      <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
        <h3 className="font-semibold text-green-700">Resale Tip</h3>
        <p className="mt-1 text-sm text-neutral-700">
          Fresh-smelling sneakers sell faster and generate better reviews. Deodorize 48
          hours before shipping so the shoe is fully aired out when it arrives.
        </p>
      </div>

      <div className="border-t border-black/10 pt-6">
        <p className="text-sm text-neutral-500">
          Know your sneaker&apos;s market value before you sell.{" "}
          <Link href="/scan" className="font-medium text-green-600 hover:underline">
            Scan it with SneakPrice →
          </Link>
        </p>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/care/deodorizing/page.tsx
git commit -m "feat: add deodorizing care guide page"
```

---

### Task 6: Sole Restoration page

**Files:**
- Create: `app/care/sole-restoration/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// app/care/sole-restoration/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Sneaker Sole Restoration | SneakPrice",
  description: "How to restore yellowed or oxidised sneaker soles to improve condition and resale value.",
};

export default function SoleRestorationPage() {
  return (
    <article className="space-y-8 text-black">
      <h1 className="text-3xl font-bold">Sole Restoration</h1>

      <p className="leading-relaxed text-neutral-600">
        Yellowed and oxidised soles are the most common resale value killer. Even a clean
        upper can&apos;t save a pair with brown, crumbling midsoles. The good news: sole
        yellowing is reversible with the right approach.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Identifying Sole Yellowing</h2>
      <p className="leading-relaxed text-neutral-700">
        Yellowing happens when the polyurethane or EVA in white/icy soles oxidises over
        time — accelerated by UV light, heat, and humidity. Icy translucent soles
        (common on Jordans, Dunks) are the most susceptible. The sole turns from clear
        or white to yellow or amber.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Hydrogen Peroxide + UV Method (Retro-Brighting)</h2>
      <p className="leading-relaxed text-neutral-700">
        This is the most effective DIY method for de-yellowing:
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-neutral-700">
        <li>Clean the sole thoroughly first (remove all dirt)</li>
        <li>Apply a thick layer of 6–12% hydrogen peroxide cream or salon-grade developer to the sole</li>
        <li>Wrap in cling film / plastic wrap to keep moist</li>
        <li>Place sole-side up in direct sunlight for 3–6 hours</li>
        <li>Check every hour — remove when the sole reaches desired whiteness</li>
        <li>Rinse thoroughly with water and dry</li>
      </ol>
      <p className="leading-relaxed text-neutral-700 mt-2">
        Repeat the process for heavily yellowed soles. Avoid getting hydrogen peroxide
        on the upper — tape or cover it with masking tape before applying.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Commercial Sole Sauce Products</h2>
      <p className="leading-relaxed text-neutral-700">
        Products like Vick&apos;s Sole Sauce, Retr0Bright, and Angelus Sole Bright are
        pre-formulated versions of the same chemistry. They tend to be more consistent
        than DIY hydrogen peroxide mixes and come with application brushes.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Midsole Cleaning</h2>
      <p className="leading-relaxed text-neutral-700">
        For rubber outsoles and foam midsoles that are dirty (not yellowed), a stiff brush
        with sneaker cleaner or a Magic Eraser works well. Magic Erasers are abrasive —
        use light pressure and only on rubber, not mesh or leather.
      </p>

      <h2 className="text-xl font-semibold text-green-600">When to Use a Professional</h2>
      <p className="leading-relaxed text-neutral-700">
        Crumbling or cracked soles (sole rot) require professional restoration or re-soling.
        Brands like Reshoevn8r and local cobbler shops offer sole replacement for high-value
        pairs. For soles that are physically deteriorating, DIY whitening won&apos;t help.
      </p>

      <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
        <h3 className="font-semibold text-green-700">Resale Tip</h3>
        <p className="mt-1 text-sm text-neutral-700">
          Restored soles can add $20–$50 to a resale price on platforms like eBay and
          StockX. It&apos;s one of the highest-ROI improvements you can make before listing.
        </p>
      </div>

      <div className="border-t border-black/10 pt-6">
        <p className="text-sm text-neutral-500">
          Know your sneaker&apos;s market value before you sell.{" "}
          <Link href="/scan" className="font-medium text-green-600 hover:underline">
            Scan it with SneakPrice →
          </Link>
        </p>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/care/sole-restoration/page.tsx
git commit -m "feat: add sole restoration care guide page"
```

---

### Task 7: Crease Prevention page

**Files:**
- Create: `app/care/crease-prevention/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// app/care/crease-prevention/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Sneaker Crease Prevention | SneakPrice",
  description: "How to prevent and remove creases in sneakers to maintain condition and resale value.",
};

export default function CreasePreventionPage() {
  return (
    <article className="space-y-8 text-black">
      <h1 className="text-3xl font-bold">Crease Prevention</h1>

      <p className="leading-relaxed text-neutral-600">
        Creases form in the toe box of sneakers every time the foot bends while walking.
        They&apos;re natural, but they signal wear to buyers and reduce perceived value.
        Here&apos;s how to minimise them — and how to remove existing ones.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Crease Shields (Force Fields)</h2>
      <p className="leading-relaxed text-neutral-700">
        Crease shields (sold under brands like Sneaker Shields and Force Fields) are
        semi-rigid inserts that sit in the toe box and hold the shape of the upper against
        the flex of walking. They&apos;re the most effective prevention method. Trim them to
        fit if needed — they come in multiple sizes.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Proper Fit Matters</h2>
      <p className="leading-relaxed text-neutral-700">
        Shoes that are too large crease more aggressively — the toe box folds because the
        foot doesn&apos;t fill it. If you&apos;re buying to resell and won&apos;t wear them, stuff the
        toe box with tissue paper or use shoe trees immediately after any try-on.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Stuffing When Storing</h2>
      <p className="leading-relaxed text-neutral-700">
        Always store sneakers with the toe box stuffed — acid-free tissue paper or plastic
        shoe trees work well. This prevents the upper from collapsing inward and creasing
        under its own weight over long storage periods.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Steam Method for Existing Creases</h2>
      <p className="leading-relaxed text-neutral-700">
        For leather and synthetic leather uppers with existing creases:
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-neutral-700">
        <li>Stuff the toe box firmly with paper or a shoe tree</li>
        <li>Dampen a clean cloth and place over the creased area</li>
        <li>Apply a clothes iron on low-medium heat (no steam) over the cloth for 10–15 seconds</li>
        <li>Remove the iron and press the area flat with your hand while warm</li>
        <li>Repeat as needed — severe creases may need 3–4 passes</li>
      </ol>
      <p className="mt-2 leading-relaxed text-neutral-700">
        Do not use this method on mesh, knit, or suede — heat will damage these materials.
      </p>

      <h2 className="text-xl font-semibold text-green-600">What Not to Do</h2>
      <ul className="list-disc space-y-2 pl-5 text-neutral-700">
        <li>Don&apos;t over-stuff — too much pressure distorts the shape</li>
        <li>Don&apos;t use high heat on synthetics — they melt and deform permanently</li>
        <li>Don&apos;t iron directly on the upper without a damp cloth barrier</li>
      </ul>

      <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
        <h3 className="font-semibold text-green-700">Resale Tip</h3>
        <p className="mt-1 text-sm text-neutral-700">
          Crease-free sneakers photograph better and signal better care to buyers.
          A pair with no visible toe box creases consistently commands higher bids
          in side-by-side comparisons.
        </p>
      </div>

      <div className="border-t border-black/10 pt-6">
        <p className="text-sm text-neutral-500">
          Know your sneaker&apos;s market value before you sell.{" "}
          <Link href="/scan" className="font-medium text-green-600 hover:underline">
            Scan it with SneakPrice →
          </Link>
        </p>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run build 2>&1 | tail -20`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/care/crease-prevention/page.tsx
git commit -m "feat: add crease prevention care guide page"
```

---

### Task 8: Final build check and push

- [ ] **Step 1: Run full build**

Run: `npm run build 2>&1 | tail -30`
Expected: `✓ Compiled successfully` with all 5 `/care/*` routes listed

- [ ] **Step 2: Push to Vercel**

```bash
git push origin main
```

Expected: Vercel deployment triggered. Verify at:
- `/care/cleaning`
- `/care/storage`
- `/care/deodorizing`
- `/care/sole-restoration`
- `/care/crease-prevention`

Check that: sidebar is visible on desktop, horizontal strip appears on mobile, active page is highlighted in green, CTA link at bottom of each page points to `/scan`.
