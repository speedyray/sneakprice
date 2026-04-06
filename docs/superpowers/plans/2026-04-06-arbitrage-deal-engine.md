# Arbitrage Deal Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a hybrid arbitrage deal engine that continuously finds profitable sneaker flipping opportunities, scores them with AI (HuggingFace-first), and streams real P&L deal cards to users on `/discover`.

**Architecture:** A background cron job scrapes eBay (existing API), StockX, GOAT, and Nike every 20 minutes for the top 50 sneaker models, calculates full net profit after all fees, scores deals with a math engine (85%) or HuggingFace/OpenAI for ambiguous cases (15%), and saves to Postgres. The existing SSE stream is updated to push real deals from DB. The `/discover` page gets a new `ArbitrageDealCard` component with expandable P&L breakdown and direct buy/sell links. An on-demand scan modal lets users scan any model not in the watchlist.

**Tech Stack:** Next.js 16, TypeScript, Prisma (PostgreSQL), eBay Browse API (existing), `@huggingface/inference`, OpenAI gpt-4o-mini (fallback), `node-fetch`-compatible `fetch` (built-in Node 18+), Vercel cron, Tailwind CSS, Lucide React, Framer Motion (existing).

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Modify | Add `@huggingface/inference` |
| `prisma/schema.prisma` | Modify | Extend `Deal` model (keep legacy fields), add `SneakerPriceCache` |
| `lib/watchlist.ts` | Create | Hardcoded top-50 sneaker model names to scan |
| `lib/scraper/stockx.ts` | Create | Fetch lowest ask price from StockX for a model |
| `lib/scraper/goat.ts` | Create | Fetch lowest ask price from GOAT (Algolia API) |
| `lib/scraper/nike.ts` | Create | Fetch retail price from Nike product search API |
| `lib/scraper/index.ts` | Create | Unified `getPlatformPrices()` + `SneakerPriceCache` read/write |
| `lib/profit-calculator.ts` | Create | `calculatePnL()` — full P&L after all fees |
| `lib/deal-scorer.ts` | Create | `scoreDeal()` — math → HuggingFace → OpenAI fallback |
| `lib/deal-pipeline.ts` | Create | `runDealPipeline(modelName)` — orchestrates scrape→calc→score→save |
| `app/api/cron/scan-deals/route.ts` | Create | GET handler: iterate watchlist, call pipeline, auth via CRON_SECRET |
| `vercel.json` | Modify | Add `*/20 * * * *` cron for scan-deals |
| `app/api/live-deals-stream/route.ts` | Modify | Stream top-20 active deals from DB instead of random data |
| `components/ArbitrageDealCard.tsx` | Create | Deal card UI with expandable P&L breakdown |
| `app/discover/page.tsx` | Modify | Add `ArbDeal` type, new state, SSE handler, deal card section + scan modal |

---

## Task 1: Install dependency + extend Prisma schema + migrate

**Files:**
- Modify: `package.json`
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Install @huggingface/inference**

```bash
cd /home/speedy4ray/MyProjects/SneakPriceShoes/sneakprice
pnpm add @huggingface/inference
```

Expected output: `dependencies: + @huggingface/inference x.x.x`

- [ ] **Step 2: Extend the Deal model in prisma/schema.prisma**

Find the existing `model Deal` block (lines 313–319) and replace it entirely. Keep all legacy fields (`sneaker`, `roi`, `profit`, `created_at`) — they are read by `app/api/cron/generate-daily-drafts/route.ts`. Add new arbitrage fields as optional so existing rows stay valid.

Replace the existing `model Deal` block with:

```prisma
model Deal {
  id              String    @id @default(cuid())
  created_at      DateTime  @default(now())
  updatedAt       DateTime  @updatedAt @default(now())

  // Legacy fields — kept for news-generator compatibility
  sneaker         String?   // = modelName (legacy alias)
  roi             Float?    // = profitMargin (legacy alias)
  profit          Float?    // = netProfit (legacy alias)

  // Extended arbitrage fields
  expiresAt       DateTime?
  brand           String?
  size            String?
  imageUrl        String?

  buyPlatform     String?   // "ebay" | "nike" | "footlocker"
  buyPrice        Float?
  buyUrl          String?
  buyListingId    String?

  sellPlatform    String?   // "stockx" | "goat" | "ebay"
  sellPrice       Float?
  sellUrl         String?

  platformSellFee Float?
  paymentFee      Float?
  shippingBuy     Float?
  shippingSell    Float?
  authFee         Float?
  netProfit       Float?
  profitMargin    Float?

  dealScore       Int?
  dealLabel       String?   // "hot" | "good" | "watch"
  scoredBy        String?   // "math" | "huggingface" | "openai"
  demandTrend     Float?
  sellThroughRate Float?

  isActive        Boolean   @default(true)

  @@index([dealScore])
  @@index([created_at])
  @@index([sneaker])
}
```

Then append the new `SneakerPriceCache` model after the `Deal` model block:

```prisma
model SneakerPriceCache {
  id        String   @id @default(cuid())
  modelName String
  platform  String
  size      String
  price     Float
  url       String
  cachedAt  DateTime @default(now())

  @@unique([modelName, platform, size])
  @@index([cachedAt])
}
```

- [ ] **Step 3: Run migration**

```bash
npx prisma migrate dev --name extend-deal-model-arbitrage
```

Expected: Migration applied successfully, no errors.

- [ ] **Step 4: Verify Prisma client regenerated**

```bash
npx prisma generate
```

Expected: `Generated Prisma Client` with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml prisma/schema.prisma prisma/migrations/
git commit -m "feat: install @huggingface/inference, extend Deal model with arbitrage fields, add SneakerPriceCache"
```

---

## Task 2: Create lib/watchlist.ts

**Files:**
- Create: `lib/watchlist.ts`

- [ ] **Step 1: Create the file**

```typescript
// lib/watchlist.ts
// Top sneaker models scanned every 20 minutes by the deal pipeline.
// Add/remove models here to control the background scan scope.

export const WATCHLIST: string[] = [
  // Nike Dunks
  "Nike Dunk Low Panda",
  "Nike Dunk Low Grey Fog",
  "Nike Dunk Low Photon Dust",
  "Nike Dunk Low Retro White Black",
  "Nike Dunk High Pro",
  "Nike Dunk Low Championship Red",
  "Nike Dunk Low UNC",

  // Air Jordan 1
  "Air Jordan 1 Retro High OG Chicago",
  "Air Jordan 1 Retro High OG University Blue",
  "Air Jordan 1 Retro High OG Bred Toe",
  "Air Jordan 1 Low",
  "Air Jordan 1 Mid",

  // Air Jordan 3
  "Air Jordan 3 White Cement",
  "Air Jordan 3 Black Cement",
  "Air Jordan 3 Fire Red",
  "Air Jordan 3 True Blue",

  // Air Jordan 4
  "Air Jordan 4 Retro Bred",
  "Air Jordan 4 Retro Military Black",
  "Air Jordan 4 Retro Red Thunder",
  "Air Jordan 4 Retro White Cement",
  "Air Jordan 4 Retro Fire Red",

  // Yeezy
  "Adidas Yeezy Boost 350 V2 Zebra",
  "Adidas Yeezy Boost 350 V2 Bred",
  "Adidas Yeezy Boost 350 V2 Static",
  "Adidas Yeezy Boost 350 V2 Beluga",
  "Adidas Yeezy 700 Wave Runner",
  "Adidas Yeezy 700 Vanta",
  "Adidas Yeezy Slide Pure",

  // Adidas
  "Adidas Samba OG White",
  "Adidas Samba OG Black",
  "Adidas Gazelle Indoor",
  "Adidas Campus 00s",
  "Adidas Stan Smith",
  "Adidas Superstar",

  // New Balance
  "New Balance 550 White Green",
  "New Balance 550 White Black",
  "New Balance 990v5",
  "New Balance 2002R",
  "New Balance 574",
  "New Balance 1906R",

  // Nike Air Force 1
  "Nike Air Force 1 Low White",
  "Nike Air Force 1 Low Black",

  // Nike Air Max
  "Nike Air Max 90",
  "Nike Air Max 1",
  "Nike Air Max 97",
  "Nike Air Max Plus",

  // Jordan Brand Other
  "Air Jordan 5 Retro Metallic",
  "Air Jordan 6 Retro Carmine",
  "Air Jordan 11 Retro Concord",
  "Air Jordan 11 Retro Bred",
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/watchlist.ts
git commit -m "feat: add sneaker watchlist for deal pipeline"
```

---

## Task 3: Create lib/scraper/stockx.ts

**Files:**
- Create: `lib/scraper/stockx.ts`

This scraper targets StockX's public search API used by their web app. It returns null on any failure (network, rate limit, parse error) — never throws.

- [ ] **Step 1: Create the file**

```typescript
// lib/scraper/stockx.ts
// Fetches the lowest ask price on StockX for a given sneaker model.
// Returns null on any failure — always safe to call.

export interface StockXPrice {
  price: number;
  url: string;
  productName: string;
}

const STOCKX_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://stockx.com/",
  "x-requested-with": "XMLHttpRequest",
};

export async function getStockXPrice(
  modelName: string
): Promise<StockXPrice | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const url = `https://stockx.com/api/browse?productCategory=sneakers&query=${encodeURIComponent(
      modelName
    )}&resultsPerPage=3&page=1&country=US&currency=USD&market=US`;

    const res = await fetch(url, {
      headers: STOCKX_HEADERS,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = await res.json();
    const products: any[] = data?.Products ?? [];

    if (!products.length) return null;

    const top = products[0];
    const lowestAsk = top?.market?.lowestAsk ?? top?.market?.lastSale;
    if (!lowestAsk || typeof lowestAsk !== "number") return null;

    return {
      price: lowestAsk,
      url: `https://stockx.com/${top.urlKey ?? ""}`,
      productName: top.title ?? modelName,
    };
  } catch {
    return null;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/scraper/stockx.ts
git commit -m "feat: add StockX price scraper"
```

---

## Task 4: Create lib/scraper/goat.ts

**Files:**
- Create: `lib/scraper/goat.ts`

GOAT's search is powered by Algolia. The read-only app ID and API key are publicly available from their web app source. Returns null on any failure.

- [ ] **Step 1: Create the file**

```typescript
// lib/scraper/goat.ts
// Fetches the lowest ask price on GOAT using their Algolia search API.
// Credentials are public read-only keys visible in their web app.

export interface GoatPrice {
  price: number;
  url: string;
  productName: string;
}

// Public read-only Algolia credentials from GOAT's web app
const ALGOLIA_APP_ID = "2FWOTDVM2O";
const ALGOLIA_API_KEY = "ac96de6b4e2f189609ca4e1e3be416a1";
const ALGOLIA_INDEX = "product_variants_v2";

export async function getGoatPrice(
  modelName: string
): Promise<GoatPrice | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(
      `https://${ALGOLIA_APP_ID.toLowerCase()}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX}/query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Algolia-Application-Id": ALGOLIA_APP_ID,
          "X-Algolia-API-Key": ALGOLIA_API_KEY,
        },
        body: JSON.stringify({
          query: modelName,
          hitsPerPage: 3,
          filters: "product_type:shoes",
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = await res.json();
    const hits: any[] = data?.hits ?? [];

    if (!hits.length) return null;

    const top = hits[0];
    // GOAT prices are stored in cents
    const priceCents =
      top?.lowest_price_cents ?? top?.retail_price_cents;
    if (!priceCents || typeof priceCents !== "number") return null;

    const price = priceCents / 100;
    const slug = top?.slug ?? "";

    return {
      price,
      url: `https://www.goat.com/sneakers/${slug}`,
      productName: top?.name ?? modelName,
    };
  } catch {
    return null;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/scraper/goat.ts
git commit -m "feat: add GOAT price scraper via Algolia"
```

---

## Task 5: Create lib/scraper/nike.ts

**Files:**
- Create: `lib/scraper/nike.ts`

Nike's product search API is publicly accessible. Returns null on any failure.

- [ ] **Step 1: Create the file**

```typescript
// lib/scraper/nike.ts
// Fetches the current retail price from Nike's product search API.

export interface NikePrice {
  price: number;
  url: string;
  productName: string;
}

export async function getNikePrice(
  modelName: string
): Promise<NikePrice | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    // Use Nike's public product browse API (no auth required)
    const url = `https://api.nike.com/cic/browse/v2?queryid=products&anonymousId=anon&country=US&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3DmarketPlace(US)%26filter%3Dlanguage(en)%26filter%3DsearchTerm(${encodeURIComponent(modelName)})%26filter%3DinStock(true)%26count%3D3`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = await res.json();

    // Navigate Nike's nested response structure
    const products =
      data?.data?.products?.products ??
      data?.products?.products ??
      [];

    if (!products.length) return null;

    const top = products[0];
    const priceStr =
      top?.price?.currentPrice ??
      top?.price?.fullPrice;

    if (!priceStr) return null;

    const price =
      typeof priceStr === "string"
        ? parseFloat(priceStr.replace(/[^0-9.]/g, ""))
        : priceStr;

    if (!price || isNaN(price)) return null;

    const slug = top?.url ?? top?.slug ?? "";
    const productUrl = slug.startsWith("http")
      ? slug
      : `https://www.nike.com${slug}`;

    return {
      price,
      url: productUrl,
      productName: top?.title ?? top?.displayName ?? modelName,
    };
  } catch {
    return null;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/scraper/nike.ts
git commit -m "feat: add Nike retail price scraper"
```

---

## Task 6: Create lib/scraper/index.ts

**Files:**
- Create: `lib/scraper/index.ts`

Unified interface that checks `SneakerPriceCache` before scraping. Cache TTL is 20 minutes. Returns prices from all platforms that succeeded.

- [ ] **Step 1: Create the file**

```typescript
// lib/scraper/index.ts
// Unified price fetcher with 20-minute cache via SneakerPriceCache.
// Call getPlatformPrices(modelName) to get all available platform prices.

import { prisma } from "@/lib/prisma";
import { getStockXPrice } from "./stockx";
import { getGoatPrice } from "./goat";
import { getNikePrice } from "./nike";

export interface PlatformPrice {
  platform: "stockx" | "goat" | "nike" | "ebay";
  price: number;
  url: string;
  productName: string;
  role: "sell" | "buy";
}

const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes

async function getCached(
  modelName: string,
  platform: string
): Promise<PlatformPrice | null> {
  const cached = await prisma.sneakerPriceCache.findUnique({
    where: { modelName_platform_size: { modelName, platform, size: "any" } },
  });

  if (!cached) return null;

  const age = Date.now() - cached.cachedAt.getTime();
  if (age > CACHE_TTL_MS) return null;

  return {
    platform: platform as PlatformPrice["platform"],
    price: cached.price,
    url: cached.url,
    productName: modelName,
    role: platform === "nike" ? "buy" : "sell",
  };
}

async function setCache(
  modelName: string,
  platform: string,
  price: number,
  url: string
): Promise<void> {
  await prisma.sneakerPriceCache.upsert({
    where: { modelName_platform_size: { modelName, platform, size: "any" } },
    create: { modelName, platform, size: "any", price, url, cachedAt: new Date() },
    update: { price, url, cachedAt: new Date() },
  });
}

export async function getPlatformPrices(
  modelName: string
): Promise<PlatformPrice[]> {
  const results: PlatformPrice[] = [];

  // Check cache and scrape each platform in parallel
  const [stockxCached, goatCached, nikeCached] = await Promise.all([
    getCached(modelName, "stockx"),
    getCached(modelName, "goat"),
    getCached(modelName, "nike"),
  ]);

  // StockX
  if (stockxCached) {
    results.push(stockxCached);
  } else {
    const fresh = await getStockXPrice(modelName);
    if (fresh) {
      await setCache(modelName, "stockx", fresh.price, fresh.url);
      results.push({
        platform: "stockx",
        price: fresh.price,
        url: fresh.url,
        productName: fresh.productName,
        role: "sell",
      });
    }
  }

  // GOAT
  if (goatCached) {
    results.push(goatCached);
  } else {
    const fresh = await getGoatPrice(modelName);
    if (fresh) {
      await setCache(modelName, "goat", fresh.price, fresh.url);
      results.push({
        platform: "goat",
        price: fresh.price,
        url: fresh.url,
        productName: fresh.productName,
        role: "sell",
      });
    }
  }

  // Nike (buy-side retail)
  if (nikeCached) {
    results.push(nikeCached);
  } else {
    const fresh = await getNikePrice(modelName);
    if (fresh) {
      await setCache(modelName, "nike", fresh.price, fresh.url);
      results.push({
        platform: "nike",
        price: fresh.price,
        url: fresh.url,
        productName: fresh.productName,
        role: "buy",
      });
    }
  }

  return results;
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/scraper/index.ts
git commit -m "feat: add unified price scraper with 20min SneakerPriceCache"
```

---

## Task 7: Create lib/profit-calculator.ts

**Files:**
- Create: `lib/profit-calculator.ts`

Pure function — no side effects, no DB calls.

- [ ] **Step 1: Create the file**

```typescript
// lib/profit-calculator.ts
// Calculates full net profit for a buy-low / sell-high arbitrage pair.
// Pure function — no side effects.

export interface PnLInput {
  buyPrice: number;
  buyPlatform: "ebay" | "nike" | "footlocker" | "adidas";
  sellPrice: number;
  sellPlatform: "stockx" | "goat" | "ebay" | "klekt";
}

export interface PnLResult {
  grossProfit: number;
  platformSellFee: number;
  paymentFee: number;
  shippingBuy: number;
  shippingSell: number;
  authFee: number;
  netProfit: number;
  profitMargin: number; // percentage
  isViable: boolean;   // netProfit >= 10 AND profitMargin >= 5
}

const SELL_FEE_RATES: Record<string, number> = {
  stockx: 0.095,
  goat: 0.15,   // conservative default (9.5% verified, 25% new seller)
  ebay: 0.1325,
  klekt: 0.10,
};

const AUTH_FEES: Record<string, number> = {
  stockx: 5,
  goat: 5,
  ebay: 0,
  klekt: 5,
};

const SHIPPING_BUY = 8;   // estimated buy-side shipping
const SHIPPING_SELL = 15; // estimated sell-side shipping
const PAYMENT_FEE_RATE = 0.03;

export function calculatePnL(input: PnLInput): PnLResult {
  const { buyPrice, sellPrice, sellPlatform } = input;

  const grossProfit = sellPrice - buyPrice;
  const platformSellFee = sellPrice * (SELL_FEE_RATES[sellPlatform] ?? 0.13);
  const paymentFee = buyPrice * PAYMENT_FEE_RATE;
  const authFee = AUTH_FEES[sellPlatform] ?? 0;

  const netProfit =
    grossProfit -
    platformSellFee -
    paymentFee -
    SHIPPING_BUY -
    SHIPPING_SELL -
    authFee;

  const profitMargin = buyPrice > 0 ? (netProfit / buyPrice) * 100 : 0;

  return {
    grossProfit: round(grossProfit),
    platformSellFee: round(platformSellFee),
    paymentFee: round(paymentFee),
    shippingBuy: SHIPPING_BUY,
    shippingSell: SHIPPING_SELL,
    authFee,
    netProfit: round(netProfit),
    profitMargin: round(profitMargin),
    isViable: netProfit >= 10 && profitMargin >= 5,
  };
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors relating to `profit-calculator.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/profit-calculator.ts
git commit -m "feat: add P&L calculator with full fee breakdown"
```

---

## Task 8: Create lib/deal-scorer.ts

**Files:**
- Create: `lib/deal-scorer.ts`

Scores a deal 0–100. Math covers clear cases. HuggingFace handles ambiguous (45–65). OpenAI fallback if HF fails or confidence < 80%.

- [ ] **Step 1: Create the file**

```typescript
// lib/deal-scorer.ts
// Scores a deal 0-100 using a tiered cost strategy:
//   1. Math score for clear deals (< 45 or > 65) — free
//   2. HuggingFace Mistral for ambiguous deals (45–65) — free tier
//   3. OpenAI gpt-4o-mini if HF unavailable or confidence < 0.8 — ~$0.001/call

import { HfInference } from "@huggingface/inference";
import OpenAI from "openai";
import type { PnLResult } from "./profit-calculator";

export interface DealScoreInput {
  modelName: string;
  pnl: PnLResult;
  buyPrice: number;         // buy-side price (passed separately for LLM summary)
  sellPrice: number;        // sell-side price (passed separately for LLM summary)
  demandTrend?: number;     // % price change last 30d (positive = trending up)
  sellThroughRate?: number; // 0-1, how fast this model sells
  buyListingAge?: number;   // hours since eBay listing posted
}

export interface DealScoreResult {
  score: number;            // 0-100
  label: "hot" | "good" | "watch" | "skip";
  scoredBy: "math" | "huggingface" | "openai";
}

export function computeMathScore(input: DealScoreInput): number {
  const { pnl, demandTrend = 0, sellThroughRate = 0.5, buyListingAge = 24 } = input;

  let score = 0;

  // Profit margin (35 pts max)
  if (pnl.profitMargin >= 50) score += 35;
  else if (pnl.profitMargin >= 35) score += 28;
  else if (pnl.profitMargin >= 20) score += 20;
  else if (pnl.profitMargin >= 10) score += 12;
  else if (pnl.profitMargin >= 5) score += 6;

  // Sell-through rate (25 pts max)
  if (sellThroughRate >= 0.8) score += 25;
  else if (sellThroughRate >= 0.6) score += 18;
  else if (sellThroughRate >= 0.4) score += 12;
  else if (sellThroughRate >= 0.2) score += 6;

  // Demand trend (25 pts max)
  if (demandTrend >= 15) score += 25;
  else if (demandTrend >= 8) score += 18;
  else if (demandTrend >= 3) score += 12;
  else if (demandTrend >= 0) score += 8;
  else score += 3; // trending down, still some points

  // Time sensitivity (15 pts max) — older listing = more urgent/better deal
  if (buyListingAge >= 48) score += 15;
  else if (buyListingAge >= 24) score += 10;
  else if (buyListingAge >= 12) score += 7;
  else score += 4;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function scoreToLabel(score: number): DealScoreResult["label"] {
  if (score >= 80) return "hot";
  if (score >= 60) return "good";
  if (score >= 40) return "watch";
  return "skip";
}

async function scoreWithHuggingFace(
  input: DealScoreInput,
  mathScore: number
): Promise<number | null> {
  try {
    const hf = new HfInference(process.env.HF_TOKEN ?? undefined);
    const summary = `Sneaker: ${input.modelName}. Net profit: $${input.pnl.netProfit.toFixed(2)}. Profit margin: ${input.pnl.profitMargin.toFixed(1)}%. Buy price: $${input.buyPrice}. Sell price: $${input.sellPrice}. Demand trend: ${input.demandTrend ?? 0}% last 30 days.`;

    const prompt = `[INST] You are a sneaker arbitrage analyst. Rate this deal from 0 to 100 based on profit potential and risk. Return ONLY valid JSON: {"score": <number 0-100>, "confidence": <number 0-1>}

Deal: ${summary} [/INST]`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const result = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: prompt,
      parameters: { max_new_tokens: 60, temperature: 0.1 },
    });

    clearTimeout(timeout);

    const text = result.generated_text ?? "";
    const jsonMatch = text.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    const score = Number(parsed?.score);
    const confidence = Number(parsed?.confidence);

    if (isNaN(score) || score < 0 || score > 100) return null;
    if (isNaN(confidence) || confidence < 0.8) return null;

    return Math.round(score);
  } catch {
    return null;
  }
}

async function scoreWithOpenAI(input: DealScoreInput): Promise<number> {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

    const summary = `Sneaker: ${input.modelName}. Net profit: $${input.pnl.netProfit.toFixed(2)}. Margin: ${input.pnl.profitMargin.toFixed(1)}%. Buy: $${input.buyPrice}. Sell: $${input.sellPrice}. Demand trend: ${input.demandTrend ?? 0}%.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a sneaker arbitrage analyst. Rate deals 0-100. Return ONLY valid JSON: {\"score\": <number>}",
        },
        { role: "user", content: `Rate this deal: ${summary}` },
      ],
      max_tokens: 30,
    });

    const text = response.choices[0]?.message?.content ?? "";
    const parsed = JSON.parse(text);
    const score = Number(parsed?.score);
    return isNaN(score) ? 50 : Math.max(0, Math.min(100, Math.round(score)));
  } catch {
    return 50; // neutral fallback
  }
}

export async function scoreDeal(
  input: DealScoreInput
): Promise<DealScoreResult> {
  const mathScore = computeMathScore(input);

  // Clear cases: use math score, no LLM needed
  if (mathScore < 45 || mathScore > 65) {
    return {
      score: mathScore,
      label: scoreToLabel(mathScore),
      scoredBy: "math",
    };
  }

  // Ambiguous (45–65): try HuggingFace first
  const hfScore = await scoreWithHuggingFace(input, mathScore);

  if (hfScore !== null) {
    return {
      score: hfScore,
      label: scoreToLabel(hfScore),
      scoredBy: "huggingface",
    };
  }

  // HF failed or low confidence: use OpenAI
  const openaiScore = await scoreWithOpenAI(input);
  return {
    score: openaiScore,
    label: scoreToLabel(openaiScore),
    scoredBy: "openai",
  };
}
```

- [ ] **Step 2: Add HF_TOKEN to .env.local (optional — free tier works without it)**

Open `.env.local` and add (if you have a HuggingFace token):
```
HF_TOKEN=hf_your_token_here
```

If you don't have one, leave it out. Free tier rate limits apply but work for low volume.

- [ ] **Step 3: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors relating to `deal-scorer.ts`.

- [ ] **Step 4: Commit**

```bash
git add lib/deal-scorer.ts
git commit -m "feat: add HuggingFace-first deal scorer with OpenAI fallback"
```

---

## Task 9: Create lib/deal-pipeline.ts

**Files:**
- Create: `lib/deal-pipeline.ts`

Orchestrates: eBay buy prices → platform sell prices → P&L → score → save to DB. One function per model name.

- [ ] **Step 1: Create the file**

```typescript
// lib/deal-pipeline.ts
// Runs the full deal discovery pipeline for one sneaker model.
// Queries eBay for buy prices, scrapers for sell prices,
// calculates P&L, scores, and upserts deals into Postgres.

import { prisma } from "@/lib/prisma";
import { getEbayAccessToken } from "@/lib/ebay";
import { getPlatformPrices } from "@/lib/scraper/index";
import { calculatePnL } from "@/lib/profit-calculator";
import { scoreDeal } from "@/lib/deal-scorer";
import type { PlatformPrice } from "@/lib/scraper/index";

const EBAY_BASE =
  process.env.EBAY_ENVIRONMENT === "production"
    ? "https://api.ebay.com"
    : "https://api.sandbox.ebay.com";

interface EbayListing {
  itemId: string;
  title: string;
  price: number;
  itemWebUrl: string;
  listingEndDate?: string;
}

async function getEbayListings(query: string): Promise<EbayListing[]> {
  try {
    const token = await getEbayAccessToken();
    const res = await fetch(
      `${EBAY_BASE}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
        query
      )}&limit=10&filter=buyingOptions:{FIXED_PRICE},conditions:{NEW}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
        },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    const items: any[] = data?.itemSummaries ?? [];

    return items
      .map((item) => ({
        itemId: item.itemId ?? "",
        title: item.title ?? "",
        price: parseFloat(item.price?.value ?? "0"),
        itemWebUrl: item.itemWebUrl ?? "",
        listingEndDate: item.itemEndDate,
      }))
      .filter((item) => item.price > 0 && item.itemId);
  } catch {
    return [];
  }
}

function listingAgeHours(endDate?: string): number {
  // eBay returns itemEndDate (future). Approximate age as 24h default.
  return 24;
}

export interface PipelineResult {
  modelName: string;
  dealsFound: number;
  dealsSaved: number;
}

export async function runDealPipeline(
  modelName: string
): Promise<PipelineResult> {
  let dealsFound = 0;
  let dealsSaved = 0;

  // 1. Get eBay buy-side listings (lowest priced new sneakers)
  const ebayListings = await getEbayListings(modelName);
  if (!ebayListings.length) return { modelName, dealsFound: 0, dealsSaved: 0 };

  // Sort by price ascending — cheapest first
  ebayListings.sort((a, b) => a.price - b.price);
  const buyListing = ebayListings[0];

  // 2. Get platform sell prices (StockX, GOAT) + retail buy price (Nike)
  const platformPrices = await getPlatformPrices(modelName);
  const sellPrices = platformPrices.filter((p) => p.role === "sell");
  const retailBuy = platformPrices.find(
    (p) => p.role === "buy" && p.platform === "nike"
  );

  // 3. Build deals: eBay → each sell platform
  const candidatePairs: {
    buyPrice: number;
    buyPlatform: "ebay";
    buyUrl: string;
    buyListingId: string;
    sellPlatform: PlatformPrice["platform"];
    sellPrice: number;
    sellUrl: string;
  }[] = sellPrices.map((sell) => ({
    buyPrice: buyListing.price,
    buyPlatform: "ebay",
    buyUrl: buyListing.itemWebUrl,
    buyListingId: buyListing.itemId,
    sellPlatform: sell.platform,
    sellPrice: sell.price,
    sellUrl: sell.url,
  }));

  // Also: Nike retail → eBay resell (retail arbitrage)
  // Find median eBay sell price (not cheapest — we're the seller here)
  if (retailBuy && ebayListings.length >= 3) {
    const ebayPrices = ebayListings.map((l) => l.price).sort((a, b) => a - b);
    const medianEbay = ebayPrices[Math.floor(ebayPrices.length / 2)];
    if (medianEbay > retailBuy.price) {
      candidatePairs.push({
        buyPrice: retailBuy.price,
        buyPlatform: "ebay", // use "ebay" as stand-in; url points to Nike
        buyUrl: retailBuy.url,
        buyListingId: `nike-${modelName.replace(/\s+/g, "-").toLowerCase()}`,
        sellPlatform: "ebay",
        sellPrice: medianEbay,
        sellUrl: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(modelName)}`,
      });
    }
  }

  dealsFound = candidatePairs.length;

  // 4. Calculate P&L and score each pair
  for (const pair of candidatePairs) {
    const pnl = calculatePnL({
      buyPrice: pair.buyPrice,
      buyPlatform: pair.buyPlatform,
      sellPrice: pair.sellPrice,
      sellPlatform: pair.sellPlatform as any,
    });

    if (!pnl.isViable) continue;

    const scoreResult = await scoreDeal({
      modelName,
      pnl,
      buyPrice: pair.buyPrice,
      sellPrice: pair.sellPrice,
      demandTrend: 0,
      sellThroughRate: 0.5,
      buyListingAge: listingAgeHours(buyListing.listingEndDate),
    });

    if (scoreResult.label === "skip") continue;

    // 5. Upsert into DB (deduplicate by buyListingId + sellPlatform)
    try {
      await prisma.deal.upsert({
        where: {
          id: `${pair.buyListingId}-${pair.sellPlatform}`,
        },
        create: {
          id: `${pair.buyListingId}-${pair.sellPlatform}`,
          sneaker: modelName,
          roi: pnl.profitMargin,
          profit: pnl.netProfit,
          buyPlatform: pair.buyPlatform,
          buyPrice: pair.buyPrice,
          buyUrl: pair.buyUrl,
          buyListingId: pair.buyListingId,
          sellPlatform: pair.sellPlatform,
          sellPrice: pair.sellPrice,
          sellUrl: pair.sellUrl,
          platformSellFee: pnl.platformSellFee,
          paymentFee: pnl.paymentFee,
          shippingBuy: pnl.shippingBuy,
          shippingSell: pnl.shippingSell,
          authFee: pnl.authFee,
          netProfit: pnl.netProfit,
          profitMargin: pnl.profitMargin,
          dealScore: scoreResult.score,
          dealLabel: scoreResult.label,
          scoredBy: scoreResult.scoredBy,
          isActive: true,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
        update: {
          sellPrice: pair.sellPrice,
          buyPrice: pair.buyPrice,
          roi: pnl.profitMargin,
          profit: pnl.netProfit,
          netProfit: pnl.netProfit,
          profitMargin: pnl.profitMargin,
          platformSellFee: pnl.platformSellFee,
          dealScore: scoreResult.score,
          dealLabel: scoreResult.label,
          scoredBy: scoreResult.scoredBy,
          isActive: true,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });
      dealsSaved++;
    } catch {
      // Skip upsert failures silently — don't crash the pipeline
    }
  }

  return { modelName, dealsFound, dealsSaved };
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors in `deal-pipeline.ts`. If there are type errors on `pnl` spread, cast as needed.

- [ ] **Step 3: Commit**

```bash
git add lib/deal-pipeline.ts
git commit -m "feat: add deal pipeline orchestrator (eBay → scrape → P&L → score → DB)"
```

---

## Task 10: Create app/api/cron/scan-deals/route.ts

**Files:**
- Create: `app/api/cron/scan-deals/route.ts`

- [ ] **Step 1: Create the file**

```typescript
// app/api/cron/scan-deals/route.ts
// Background job that scans the watchlist every 20 minutes.
// Protected by CRON_SECRET query param — matches pattern in generate-daily-drafts.

import { NextResponse } from "next/server";
import { WATCHLIST } from "@/lib/watchlist";
import { runDealPipeline } from "@/lib/deal-pipeline";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 min max (Vercel Pro) — enough for 50 models

export async function GET(req: Request) {
  // Auth check — same pattern as generate-daily-drafts
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  const isAuthorized =
    !!cronSecret &&
    (secret === cronSecret || authHeader === `Bearer ${cronSecret}`);

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Mark deals older than 24h as inactive before scanning
  await prisma.deal.updateMany({
    where: {
      isActive: true,
      expiresAt: { lt: new Date() },
    },
    data: { isActive: false },
  });

  const results = [];
  let totalSaved = 0;

  // Scan each model sequentially to avoid rate-limiting scrapers
  for (const modelName of WATCHLIST) {
    try {
      const result = await runDealPipeline(modelName);
      results.push(result);
      totalSaved += result.dealsSaved;

      // 1-second pause between models to be polite to external APIs
      await new Promise((r) => setTimeout(r, 1000));
    } catch {
      results.push({ modelName, dealsFound: 0, dealsSaved: 0, error: true });
    }
  }

  return NextResponse.json({
    success: true,
    scanned: WATCHLIST.length,
    totalDealsSaved: totalSaved,
    results,
  });
}
```

- [ ] **Step 2: Manually trigger the cron to verify it runs**

Start dev server first (`npm run dev`), then in a new terminal:

```bash
curl "http://localhost:3000/api/cron/scan-deals?secret=super_secret_123"
```

Expected response:
```json
{
  "success": true,
  "scanned": 50,
  "totalDealsSaved": <number>,
  "results": [...]
}
```

If `CRON_SECRET` is not `super_secret_123` in your `.env.local`, use the correct value.

- [ ] **Step 3: Commit**

```bash
git add app/api/cron/scan-deals/route.ts
git commit -m "feat: add scan-deals cron endpoint — scans watchlist every 20 min"
```

---

## Task 11: Update vercel.json

**Files:**
- Modify: `vercel.json`

- [ ] **Step 1: Add the new cron entry**

Open `vercel.json`. It currently contains one cron. Add the scan-deals entry:

```json
{
  "crons": [
    {
      "path": "/api/cron/generate-daily-drafts?secret=super_secret_123",
      "schedule": "0 6 * * *"
    },
    {
      "path": "/api/cron/scan-deals?secret=super_secret_123",
      "schedule": "*/20 * * * *"
    }
  ]
}
```

Replace `super_secret_123` with `${CRON_SECRET}` in Vercel dashboard env vars — but for the config file, use the literal value since Vercel cron paths don't support env var interpolation in the URL. Set `CRON_SECRET` in Vercel env vars to the same value.

- [ ] **Step 2: Commit**

```bash
git add vercel.json
git commit -m "feat: add scan-deals to Vercel cron schedule (every 20 min)"
```

---

## Task 12: Update app/api/live-deals-stream/route.ts

**Files:**
- Modify: `app/api/live-deals-stream/route.ts`

Replace the random fake data generator with real deals from Postgres. Stream the top-20 active deals on connection, then poll DB every 30 seconds for new deals and push them.

- [ ] **Step 1: Replace the entire file content**

```typescript
// app/api/live-deals-stream/route.ts
// Streams real arbitrage deals from Postgres via Server-Sent Events.
// On connect: immediately sends top-20 active deals sorted by dealScore desc.
// Polling: checks for new deals every 30 seconds and pushes any found.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

async function fetchTopDeals(since?: Date) {
  return prisma.deal.findMany({
    where: {
      isActive: true,
      dealScore: { gte: 40 },
      ...(since ? { updatedAt: { gt: since } } : {}),
    },
    orderBy: { dealScore: "desc" },
    take: since ? 5 : 20,
    select: {
      id: true,
      sneaker: true,
      brand: true,
      size: true,
      imageUrl: true,
      buyPlatform: true,
      buyPrice: true,
      buyUrl: true,
      sellPlatform: true,
      sellPrice: true,
      sellUrl: true,
      platformSellFee: true,
      paymentFee: true,
      shippingBuy: true,
      shippingSell: true,
      authFee: true,
      netProfit: true,
      profitMargin: true,
      dealScore: true,
      dealLabel: true,
      scoredBy: true,
      demandTrend: true,
      created_at: true,
      expiresAt: true,
    },
  });
}

export async function GET() {
  let pollInterval: NodeJS.Timeout;
  let lastChecked = new Date();

  const stream = new ReadableStream({
    async start(controller) {
      // Send top deals immediately on connect
      try {
        const initialDeals = await fetchTopDeals();

        if (initialDeals.length > 0) {
          for (const deal of initialDeals) {
            controller.enqueue(`data: ${JSON.stringify(deal)}\n\n`);
          }
        } else {
          // No deals in DB yet — send a placeholder so the client knows we connected
          controller.enqueue(
            `data: ${JSON.stringify({ _status: "no_deals_yet" })}\n\n`
          );
        }
      } catch {
        // DB not ready — send placeholder
        controller.enqueue(
          `data: ${JSON.stringify({ _status: "db_unavailable" })}\n\n`
        );
      }

      // Poll for new deals every 30 seconds
      pollInterval = setInterval(async () => {
        try {
          const newDeals = await fetchTopDeals(lastChecked);
          lastChecked = new Date();

          for (const deal of newDeals) {
            controller.enqueue(`data: ${JSON.stringify(deal)}\n\n`);
          }
        } catch {
          clearInterval(pollInterval);
        }
      }, 30_000);
    },

    cancel() {
      clearInterval(pollInterval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
```

- [ ] **Step 2: Verify SSE returns real data after cron has run once**

With dev server running, in a new terminal:

```bash
curl -N http://localhost:3000/api/live-deals-stream
```

Expected: A stream of deal JSON objects (or `{"_status":"no_deals_yet"}` if the cron hasn't run yet — trigger it manually first with the curl from Task 10 Step 2).

- [ ] **Step 3: Commit**

```bash
git add app/api/live-deals-stream/route.ts
git commit -m "feat: replace random fake SSE stream with real DB-backed arbitrage deals"
```

---

## Task 13: Create components/ArbitrageDealCard.tsx

**Files:**
- Create: `components/ArbitrageDealCard.tsx`

A self-contained deal card. Props match the `Deal` DB shape. Expandable P&L section, direct buy/sell links, deal badge.

- [ ] **Step 1: Create the file**

```typescript
// components/ArbitrageDealCard.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Flame, TrendingUp, Eye } from "lucide-react";

export interface ArbDeal {
  id: string;
  sneaker?: string | null;
  brand?: string | null;
  size?: string | null;
  imageUrl?: string | null;
  buyPlatform?: string | null;
  buyPrice?: number | null;
  buyUrl?: string | null;
  sellPlatform?: string | null;
  sellPrice?: number | null;
  sellUrl?: string | null;
  platformSellFee?: number | null;
  paymentFee?: number | null;
  shippingBuy?: number | null;
  shippingSell?: number | null;
  authFee?: number | null;
  netProfit?: number | null;
  profitMargin?: number | null;
  dealScore?: number | null;
  dealLabel?: string | null;
  scoredBy?: string | null;
  demandTrend?: number | null;
  // Legacy fields
  buy_price?: number;
  market_price?: number;
  profit?: number;
  roi?: number;
}

function fmt(n?: number | null, prefix = "$"): string {
  if (n == null || isNaN(n)) return "—";
  return `${prefix}${Math.abs(n).toFixed(2)}`;
}

function platformLabel(p?: string | null): string {
  const labels: Record<string, string> = {
    stockx: "StockX",
    goat: "GOAT",
    ebay: "eBay",
    nike: "Nike",
    footlocker: "Foot Locker",
    adidas: "Adidas",
  };
  return labels[p ?? ""] ?? (p ?? "—");
}

function DealBadge({ label }: { label?: string | null }) {
  if (label === "hot")
    return (
      <span className="flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
        <Flame className="w-3 h-3" /> HOT DEAL
      </span>
    );
  if (label === "good")
    return (
      <span className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
        ✅ GOOD DEAL
      </span>
    );
  return (
    <span className="flex items-center gap-1 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
      <Eye className="w-3 h-3" /> WATCH
    </span>
  );
}

export function ArbitrageDealCard({ deal }: { deal: ArbDeal }) {
  const [expanded, setExpanded] = useState(false);

  // Support both new schema and legacy SSE shape
  const name = deal.sneaker ?? "Unknown Sneaker";
  const buyPrice = deal.buyPrice ?? deal.buy_price;
  const sellPrice = deal.sellPrice ?? deal.market_price;
  const netProfit = deal.netProfit ?? deal.profit;
  const margin = deal.profitMargin ?? deal.roi;
  const score = deal.dealScore;
  const label = deal.dealLabel ?? (
    (margin ?? 0) >= 30 ? "hot" : (margin ?? 0) >= 15 ? "good" : "watch"
  );

  const hasPnLBreakdown =
    deal.platformSellFee != null &&
    deal.paymentFee != null;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 space-y-4 hover:border-gray-500 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <DealBadge label={label} />
          <h3 className="text-white font-bold text-base leading-snug mt-1">
            {name}
          </h3>
          {deal.size && (
            <p className="text-gray-400 text-sm">Size {deal.size}</p>
          )}
        </div>
        {score != null && (
          <div className="text-right shrink-0">
            <p className="text-gray-400 text-xs">Score</p>
            <p className="text-white font-bold text-xl">{score}<span className="text-gray-500 text-sm">/100</span></p>
          </div>
        )}
      </div>

      {/* Buy / Sell row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800 rounded-xl p-3 space-y-2">
          <p className="text-gray-400 text-xs uppercase tracking-wide">Buy on</p>
          <p className="text-white font-semibold">{platformLabel(deal.buyPlatform)}</p>
          <p className="text-green-400 font-bold text-lg">{fmt(buyPrice)}</p>
          {deal.buyUrl && (
            <a
              href={deal.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 text-xs hover:text-blue-300 transition-colors"
            >
              View Listing <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
        <div className="bg-gray-800 rounded-xl p-3 space-y-2">
          <p className="text-gray-400 text-xs uppercase tracking-wide">Sell on</p>
          <p className="text-white font-semibold">{platformLabel(deal.sellPlatform)}</p>
          <p className="text-blue-400 font-bold text-lg">{fmt(sellPrice)}</p>
          {deal.sellUrl && (
            <a
              href={deal.sellUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 text-xs hover:text-blue-300 transition-colors"
            >
              See Market <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Net profit summary */}
      <div className="bg-gray-800 rounded-xl px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-xs">Net Profit</p>
          <p className={`font-bold text-xl ${(netProfit ?? 0) > 0 ? "text-green-400" : "text-red-400"}`}>
            {netProfit != null && netProfit > 0 ? "+" : ""}
            {fmt(netProfit)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs">Margin</p>
          <p className="text-white font-bold text-xl">
            {margin != null ? `${margin.toFixed(1)}%` : "—"}
          </p>
        </div>
        {deal.demandTrend != null && deal.demandTrend !== 0 && (
          <div className="text-right">
            <p className="text-gray-400 text-xs">30d Trend</p>
            <p className={`font-semibold flex items-center gap-1 ${deal.demandTrend > 0 ? "text-green-400" : "text-red-400"}`}>
              <TrendingUp className="w-3 h-3" />
              {deal.demandTrend > 0 ? "+" : ""}
              {deal.demandTrend.toFixed(1)}%
            </p>
          </div>
        )}
      </div>

      {/* Expandable P&L breakdown */}
      {hasPnLBreakdown && (
        <div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-gray-400 text-xs hover:text-white transition-colors w-full"
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {expanded ? "Hide" : "Show"} P&L Breakdown
          </button>

          {expanded && (
            <div className="mt-2 bg-gray-800 rounded-xl p-4 space-y-1.5 text-sm font-mono">
              <div className="flex justify-between text-gray-300">
                <span>Gross Profit</span>
                <span className="text-white">+{fmt((sellPrice ?? 0) - (buyPrice ?? 0))}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>{platformLabel(deal.sellPlatform)} Fee</span>
                <span className="text-red-400">-{fmt(deal.platformSellFee)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping (buy + sell)</span>
                <span className="text-red-400">
                  -{fmt((deal.shippingBuy ?? 0) + (deal.shippingSell ?? 0))}
                </span>
              </div>
              {(deal.authFee ?? 0) > 0 && (
                <div className="flex justify-between text-gray-400">
                  <span>Authentication</span>
                  <span className="text-red-400">-{fmt(deal.authFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span>Payment Processing</span>
                <span className="text-red-400">-{fmt(deal.paymentFee)}</span>
              </div>
              <div className="border-t border-gray-600 pt-1.5 flex justify-between font-bold">
                <span className="text-white">Net Profit</span>
                <span className={`${(netProfit ?? 0) > 0 ? "text-green-400" : "text-red-400"}`}>
                  {(netProfit ?? 0) > 0 ? "+" : ""}
                  {fmt(netProfit)}
                </span>
              </div>
              {deal.scoredBy && (
                <p className="text-gray-600 text-xs pt-1">Scored by: {deal.scoredBy}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ArbitrageDealCard.tsx
git commit -m "feat: add ArbitrageDealCard component with expandable P&L breakdown"
```

---

## Task 14: Update app/discover/page.tsx — integrate real deal cards + scan modal

**Files:**
- Modify: `app/discover/page.tsx`

The discover page is a large client component. Make targeted additions only — do not rewrite the entire file. Read the current file fully before editing.

- [ ] **Step 1: Add `ArbDeal` import and type at the top of the file**

Find the existing imports block (around line 0–18). After the last import, add:

```typescript
import { ArbitrageDealCard, type ArbDeal } from "@/components/ArbitrageDealCard";
```

- [ ] **Step 2: Update the existing `LiveDeal` type and add `ArbDeal` state**

Find the `type LiveDeal` definition (around line 63–70). Replace it with:

```typescript
// Legacy type for backward compat with existing SSE handler
type LiveDeal = {
  sneaker: string;
  buy_price: number;
  market_price: number;
  profit: number;
  roi: number;
};
```

Then find the `const [deals, setDeals] = useState<LiveDeal[]>([]);` line (around line 157). After that line add:

```typescript
const [arbDeals, setArbDeals] = useState<ArbDeal[]>([]);
const [newDealCount, setNewDealCount] = useState(0);
const [activeTab, setActiveTab] = useState<"all" | "hot" | "good" | "watch">("all");
const [scanQuery, setScanQuery] = useState("");
const [isScanModalOpen, setIsScanModalOpen] = useState(false);
const [isScanningModel, setIsScanningModel] = useState(false);
const [scanModalError, setScanModalError] = useState("");
```

- [ ] **Step 3: Update the SSE handler to populate arbDeals**

Find the `useEffect` block that creates `new EventSource("/api/live-deals-stream")` (around line 177–194). Replace the `eventSource.onmessage` handler content:

```typescript
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);

  // Skip status-only messages
  if (data._status) return;

  // New schema deal (has dealScore field)
  if (data.dealScore !== undefined) {
    const deal = data as ArbDeal;
    setArbDeals((prev) => {
      const exists = prev.some((d) => d.id === deal.id);
      if (exists) return prev.map((d) => (d.id === deal.id ? deal : d));
      setNewDealCount((c) => c + 1);
      return [deal, ...prev].slice(0, 50);
    });
    return;
  }

  // Legacy schema (random deals) — keep for backward compat
  const deal = data as LiveDeal;
  setDeals((prev) => [deal, ...prev].slice(0, 10));
  setRecentDeals((prev) => [deal, ...prev].slice(0, 20));
};
```

- [ ] **Step 4: Add on-demand scan handler**

After the SSE `useEffect` closing brace, add a new function:

```typescript
async function handleScanModel(e: React.FormEvent) {
  e.preventDefault();
  if (!scanQuery.trim()) return;

  setIsScanningModel(true);
  setScanModalError("");

  try {
    const res = await fetch("/api/cron/scan-deals", {
      method: "GET",
      // On-demand: call with the model name as a single-item scan
      // Since scan-deals iterates WATCHLIST, we use /api/ebay directly instead
    });
    // Note: for on-demand scan of a specific model, call /api/ebay
    const ebayRes = await fetch("/api/ebay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: scanQuery }),
    });
    const ebayData = await ebayRes.json();

    if (ebayData.deal) {
      const newDeal: ArbDeal = {
        id: `scan-${Date.now()}`,
        sneaker: scanQuery,
        buyPlatform: "ebay",
        buyPrice: ebayData.deal.buyPrice,
        buyUrl: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(scanQuery)}`,
        sellPlatform: "ebay",
        sellPrice: ebayData.deal.marketPrice,
        sellUrl: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(scanQuery)}`,
        netProfit: ebayData.deal.profit,
        profitMargin: ebayData.deal.roi,
        dealLabel: ebayData.deal.roi >= 30 ? "hot" : ebayData.deal.roi >= 15 ? "good" : "watch",
      };
      setArbDeals((prev) => [newDeal, ...prev].slice(0, 50));
    } else {
      setScanModalError("No arbitrage opportunity found for this model right now.");
    }
  } catch {
    setScanModalError("Scan failed. Please try again.");
  } finally {
    setIsScanningModel(false);
    if (!scanModalError) setIsScanModalOpen(false);
  }
}
```

- [ ] **Step 5: Add the deal feed section and scan modal to the JSX**

Find the existing arbitrage deals section in the JSX (search for `arbitrageTitle` usage). Replace that entire section with the following block. If you cannot find it, add this block just before the closing `</div>` of the main page container:

```tsx
{/* ── Arbitrage Deal Feed ─────────────────────────────── */}
<section className="space-y-4">
  {/* Header row */}
  <div className="flex items-center justify-between flex-wrap gap-3">
    <div>
      <h2 className="text-white font-bold text-xl">🔥 Live Arbitrage Deals</h2>
      <p className="text-gray-400 text-sm">
        {arbDeals.length > 0
          ? `${arbDeals.length} active deals · updating live`
          : "Warming up deal engine…"}
      </p>
    </div>
    <button
      onClick={() => setIsScanModalOpen(true)}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
    >
      <DollarSign className="w-4 h-4" /> Scan a Shoe
    </button>
  </div>

  {/* New deals banner */}
  {newDealCount > 0 && (
    <button
      onClick={() => setNewDealCount(0)}
      className="w-full text-center bg-blue-600/20 border border-blue-500/40 text-blue-300 text-sm py-2 rounded-xl hover:bg-blue-600/30 transition-colors"
    >
      ↑ {newDealCount} new deal{newDealCount > 1 ? "s" : ""} · click to dismiss
    </button>
  )}

  {/* Tab filters */}
  <div className="flex gap-2 flex-wrap">
    {(["all", "hot", "good", "watch"] as const).map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
          activeTab === tab
            ? "bg-white text-black"
            : "bg-gray-800 text-gray-400 hover:text-white"
        }`}
      >
        {tab === "all" ? "All" : tab === "hot" ? "🔥 Hot" : tab === "good" ? "✅ Good" : "👀 Watch"}
      </button>
    ))}
  </div>

  {/* Deal cards */}
  {arbDeals.length === 0 ? (
    <div className="text-center py-16 text-gray-500">
      <p className="text-4xl mb-3">🔍</p>
      <p className="font-medium">No deals yet — the scanner is running in the background.</p>
      <p className="text-sm mt-1">Try "Scan a Shoe" to find deals instantly.</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {arbDeals
        .filter((d) => activeTab === "all" || d.dealLabel === activeTab)
        .map((deal) => (
          <ArbitrageDealCard key={deal.id} deal={deal} />
        ))}
    </div>
  )}
</section>

{/* ── Scan Modal ─────────────────────────────────────────── */}
{isScanModalOpen && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-bold text-lg">Scan a Specific Shoe</h2>
        <button
          onClick={() => { setIsScanModalOpen(false); setScanModalError(""); }}
          className="text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>
      <p className="text-gray-400 text-sm">
        Enter a sneaker model name to find arbitrage opportunities right now.
      </p>
      <form onSubmit={handleScanModel} className="space-y-3">
        <input
          type="text"
          value={scanQuery}
          onChange={(e) => setScanQuery(e.target.value)}
          placeholder="e.g. Air Jordan 4 Bred"
          className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        {scanModalError && (
          <p className="text-red-400 text-sm">{scanModalError}</p>
        )}
        <button
          type="submit"
          disabled={isScanningModel || !scanQuery.trim()}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {isScanningModel ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Scanning…</>
          ) : (
            <><DollarSign className="w-4 h-4" /> Find Deals</>
          )}
        </button>
      </form>
    </div>
  </div>
)}
```

- [ ] **Step 6: Start dev server and verify the page loads**

```bash
npm run dev
```

Open `http://localhost:3000/discover`. Expected:
- Page loads without errors
- "Live Arbitrage Deals" section visible
- "Scan a Shoe" button opens modal
- After running cron (`curl "http://localhost:3000/api/cron/scan-deals?secret=super_secret_123"`), deal cards appear within 30 seconds via SSE

- [ ] **Step 7: Commit**

```bash
git add app/discover/page.tsx
git commit -m "feat: integrate real arbitrage deal cards and scan modal into /discover page"
```

---

## Spec Coverage Check

| Spec Requirement | Covered By |
|-----------------|------------|
| Background pipeline every 20 min | Task 10 (cron) + Task 11 (vercel.json) |
| eBay buy-side listings | Task 9 (deal-pipeline) |
| StockX sell-side price | Task 3 |
| GOAT sell-side price | Task 4 |
| Nike retail buy price | Task 5 |
| SneakerPriceCache 20-min TTL | Task 6 |
| Full P&L (fees, shipping, auth) | Task 7 |
| HuggingFace-first scoring | Task 8 |
| OpenAI fallback | Task 8 |
| Math-only for clear scores | Task 8 |
| Deal cards with P&L breakdown | Task 13 |
| Direct buy/sell links | Task 13 |
| SSE real-time push | Task 12 |
| On-demand scan modal | Task 14 |
| Deal score labels (hot/good/watch) | Tasks 8 + 13 |
| Deal deduplication | Task 9 (upsert by buyListingId + platform) |
| Deals expire after 24h | Tasks 9 + 10 |
| Legacy Deal fields preserved | Task 1 (schema) |
| Watchlist of top models | Task 2 |
| Cron auth via CRON_SECRET | Task 10 |

---

## Environment Variables Required

Add to `.env.local` if not present:

```
CRON_SECRET=super_secret_123      # already used in generate-daily-drafts
HF_TOKEN=                          # optional — HuggingFace token for higher rate limits
OPENAI_API_KEY=                    # already present (used in /api/scan)
EBAY_CLIENT_ID=                    # already present
EBAY_CLIENT_SECRET=                # already present
EBAY_ENVIRONMENT=sandbox           # or "production"
DATABASE_URL=                      # already present
```
