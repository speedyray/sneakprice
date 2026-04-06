# Arbitrage Deal Engine — Design Spec
**Date:** 2026-04-06  
**Project:** SneakPrice (sneakpriceapp.com)  
**Scope:** Core arbitrage deal discovery, P&L calculation, AI scoring, and deal feed UI  

---

## 1. Overview

Build a hybrid arbitrage deal engine that continuously surfaces profitable sneaker flipping opportunities to intermediate resellers. The system runs a background batch pipeline for top 200 sneaker models and also supports on-demand scanning for any specific model. Deals are scored by an AI engine (cost-optimized), stored in Postgres, and pushed to users via the existing SSE stream in real time.

**Primary user:** Intermediate resellers who understand arbitrage basics and want clean deal cards with full profit math and direct buy links — no hand-holding required.

---

## 2. Architecture

### 2.1 High-Level Flow

```
BACKGROUND PIPELINE (every 20 min via cron)
─────────────────────────────────────────────
PriceScraperJob
  ├── eBay API          → buy-side: underpriced listings
  ├── StockX scraper    → sell-side: current market price
  ├── GOAT scraper      → sell-side: current market price
  ├── Nike/FL scraper   → retail buy price
  └── Klekt scraper     → EU sell-side
        │
        ▼
  ProfitCalculator      → full P&L per deal
        │
        ▼
  DealScorer            → HuggingFace-first, OpenAI fallback
        │
        ▼
  Postgres (deals table)
        │
        ▼
  SSE Stream (/api/live-deals-stream) → pushed to connected users

ON-DEMAND SCAN PATH
─────────────────────────────────────────────
User types model → /api/scan → same pipeline above
→ returns top 5 deals instantly + saves to DB for all users
```

### 2.2 Key Files

| File | Action |
|------|--------|
| `lib/scraper/stockx.ts` | New — StockX price scraper |
| `lib/scraper/goat.ts` | New — GOAT price scraper |
| `lib/scraper/retail.ts` | New — Nike / Foot Locker / Adidas scraper |
| `lib/scraper/klekt.ts` | New — Klekt EU scraper |
| `lib/scraper/index.ts` | New — unified scraper interface |
| `lib/profit-calculator.ts` | New — full P&L engine |
| `lib/deal-scorer.ts` | New — HuggingFace-first AI scoring |
| `lib/deal-pipeline.ts` | New — orchestrates scrape → calculate → score → save |
| `app/api/cron/scan-deals/route.ts` | New — cron batch job (every 20 min) |
| `app/api/live-deals-stream/route.ts` | Modified — push new deals as SSE events |
| `app/api/scan/route.ts` | Modified — plug into unified pipeline |
| `app/discover/page.tsx` | Modified — deal feed UI with cards |
| `prisma/schema.prisma` | Modified — add Deal + SneakerPriceCache models |

---

## 3. Data Sources

| Source | Role | Method | Rate Limit Strategy |
|--------|------|--------|---------------------|
| eBay API | Buy-side (underpriced listings) | Existing API key | Already handled |
| StockX | Sell-side market price | HTTP scraper | Rotating user-agents, 2–3s delay |
| GOAT | Sell-side market price | HTTP scraper | Rotating user-agents, 2–3s delay |
| Nike.com | Retail buy price | HTTP scraper | 3s delay, cached 6h |
| Foot Locker | Retail buy price | HTTP scraper | 3s delay, cached 6h |
| Klekt | EU sell-side | HTTP scraper | 2s delay |

**Scraper rules:**
- All prices cached in `SneakerPriceCache` for 20 minutes before re-scraping
- If a scraper fails (timeout, 429, block), that source is skipped for the current run — the deal is not shown rather than showing stale/bad data
- Scrapers use `cheerio` for HTML parsing and `node-fetch` with randomised user-agent headers

---

## 4. P&L Calculation Engine (`lib/profit-calculator.ts`)

### 4.1 Formula

```
gross_profit        = sell_price - buy_price

platform_sell_fee   = sell_price × fee_rate
                      StockX: 9.5%
                      GOAT: 15% default (conservative; 9.5% verified, 25% new seller)
                      eBay: 13.25%
                      Klekt: 10%

payment_processing  = buy_price × 0.03

shipping_buy        = $8.00 (flat estimate, configurable)
shipping_sell       = $15.00 (flat estimate, configurable)

authentication_fee  = $5.00 for StockX/GOAT, $0 for eBay

estimated_tax       = 0% default (configurable per user in future)

net_profit = gross_profit
           - platform_sell_fee
           - payment_processing
           - shipping_buy
           - shipping_sell
           - authentication_fee
           - estimated_tax

profit_margin = (net_profit / buy_price) × 100
```

### 4.2 Deal Filtering

Deals with `net_profit < $10` or `profit_margin < 5%` are discarded before scoring — not stored.

---

## 5. AI Deal Scoring Engine (`lib/deal-scorer.ts`)

### 5.1 Score Signals (0–100)

| Signal | Weight | Measurement |
|--------|--------|-------------|
| Profit margin % | 35% | Normalised: 50%+ margin = full 35pts |
| Sell-through rate | 25% | Scraped from StockX last-sale frequency |
| Demand trend | 25% | % price change over last 30 days |
| Time sensitivity | 15% | eBay listing age (older = more urgent) |

Score = weighted sum, clamped 0–100.

### 5.2 LLM Cost Strategy

```
Step 1: Compute score mathematically (covers ~85% of deals)
        → If score is clear (< 45 or > 65): use math score, no LLM

Step 2: Ambiguous deals (score 45–65): call HuggingFace free inference
        Model: mistralai/Mistral-7B-Instruct (free tier)
        Prompt: structured deal summary → ask for 0-100 rating + confidence

Step 3: If HuggingFace confidence < 80% OR API unavailable:
        Fallback to OpenAI gpt-4o-mini (~$0.001/call)

Step 4: Never call Claude/Sonnet unless admin explicitly triggers it
```

**Expected cost distribution:** ~85% free (math), ~12% HuggingFace (free), ~3% OpenAI ($0.001/call). At 1,000 deals/day = ~$0.03/day.

### 5.3 Deal Labels

| Score | Label | UI Badge |
|-------|-------|----------|
| 80–100 | Hot Deal | 🔥 |
| 60–79 | Good Deal | ✅ |
| 40–59 | Watch | 👀 |
| < 40 | Not shown | — |

---

## 6. Database Schema

### 6.1 New Models (added to `prisma/schema.prisma`)

```prisma
model Deal {
  id              String    @id @default(cuid())
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  expiresAt       DateTime?

  // Sneaker identity
  modelName       String
  brand           String
  size            String
  imageUrl        String?

  // Buy side
  buyPlatform     String    // "ebay" | "nike" | "footlocker" | "adidas"
  buyPrice        Float
  buyUrl          String
  buyListingId    String?

  // Sell side
  sellPlatform    String    // "stockx" | "goat" | "ebay" | "klekt"
  sellPrice       Float
  sellUrl         String

  // P&L breakdown
  platformSellFee Float
  paymentFee      Float
  shippingBuy     Float
  shippingSell    Float
  authFee         Float
  netProfit       Float
  profitMargin    Float

  // Scoring
  dealScore       Int       // 0–100
  dealLabel       String    // "hot" | "good" | "watch"
  scoredBy        String    // "math" | "huggingface" | "openai"
  demandTrend     Float?    // % price change last 30d
  sellThroughRate Float?

  // Status
  isActive        Boolean   @default(true)
  isVerified      Boolean   @default(false)

  @@index([dealScore])
  @@index([createdAt])
  @@index([modelName])
}

model SneakerPriceCache {
  id          String   @id @default(cuid())
  modelName   String
  platform    String
  size        String
  price       Float
  url         String
  cachedAt    DateTime @default(now())

  @@unique([modelName, platform, size])
  @@index([cachedAt])
}
```

No existing tables are modified.

---

## 7. UI/UX — Deal Feed (`/discover`)

### 7.1 Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  🔥 LIVE ARBITRAGE DEALS          [Scan a Shoe ▼]       │
│  Updating live · 47 deals found today                   │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│ All      │ Hot 🔥   │ eBay→StockX│Retail→Resell│ Filters│
└──────────┴──────────┴──────────┴──────────┴─────────────┘

[3 new deals ↑ click to load]    ← SSE-driven banner

┌── DEAL CARD ────────────────────────────────────────────┐
│ 🔥 HOT DEAL                              Score: 94/100  │
│ Nike Air Jordan 1 Retro High OG "Chicago"  Size 10      │
│                                                         │
│ BUY on eBay  $180  [View Listing ↗]                     │
│ SELL on StockX $340  [See Market ↗]                     │
│                                                         │
│ ┌─ P&L Breakdown ──────────────────────────────────┐   │
│ │ Gross Profit              +$160.00               │   │
│ │ StockX Fee (9.5%)          -$32.30               │   │
│ │ Shipping (buy + sell)      -$23.00               │   │
│ │ Authentication              -$5.00               │   │
│ │ Payment Processing          -$5.10               │   │
│ │ ──────────────────────────────────               │   │
│ │ NET PROFIT              +$94.60  (52.6% margin)  │   │
│ └──────────────────────────────────────────────────┘   │
│                                                         │
│ ⏱ Listing expires ~4h  · 📈 Price up 8% (30d)         │
└─────────────────────────────────────────────────────────┘
```

### 7.2 On-Demand Scanner (Modal)

- Triggered by "Scan a Shoe" button in header
- Text input for model name → calls `/api/scan`
- Shows loading spinner while pipeline runs (~3–8s)
- Returns top 5 deals for that model
- Deals also saved to DB and pushed to all connected users via SSE

### 7.3 Filters

- Deal type: All / eBay→StockX / eBay→GOAT / Retail→Resell / Intra-eBay
- Min net profit: $10 / $25 / $50 / $100+
- Min margin: 10% / 20% / 30%+
- Size (US): dropdown
- Brand: Nike / Jordan / Adidas / New Balance / All

---

## 8. Cron Job (`/api/cron/scan-deals`)

- Runs every 20 minutes via Vercel cron (`vercel.json` entry: `*/20 * * * *`)
- Iterates over a hardcoded watchlist of 200 top-selling sneaker models defined in `lib/watchlist.ts` (seeded from public sneaker sales charts: Nike SNKRS, StockX Most Wanted, Hypebeast top lists)
- Calls unified `dealPipeline()` for each model
- Deals that already exist (matched by `buyListingId` + `sellPlatform`) are updated not duplicated
- Old deals (> 24h) are marked `isActive: false`
- Protected by `CRON_SECRET` header check — rejects all requests without it

---

## 9. Out of Scope (this spec)

- User accounts / saved deals / personal watchlists
- Email/SMS deal alerts
- StockX/GOAT seller account integration
- Payment processing
- Security & anti-abuse layer (separate spec)
- Marketing campaign (separate spec)
- LLM cost dashboard / admin controls

---

## 10. Success Criteria

- [ ] Live deal feed shows at minimum 20 active deals at any time
- [ ] Each deal card shows full P&L breakdown with direct buy/sell links
- [ ] New deals appear without page refresh via SSE
- [ ] On-demand scan returns results in under 10 seconds
- [ ] LLM cost per day stays under $0.10 at 1,000 deals/day volume
- [ ] No existing pages or features broken
