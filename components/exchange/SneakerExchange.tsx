"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  computeVolatility,
  getCurrentBlueChipScore,
  getDynamicLabels,
  getInitialMarketStates,
  getMarketPriceRange,
  type SneakerId,
  tickAllMarkets,
} from "@/lib/simulation/marketEngine";
import {
  createSeedDeals,
  getFeedState,
  tickArbitrageFeed,
} from "@/lib/simulation/arbitrageEngine";
import {
  Activity,
  ArrowRight,
  Bell,
  ChevronRight,
  Eye,
  Flame,
  LineChart,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type Trend = "bullish" | "cooling" | "watch";
type Liquidity = "high" | "medium" | "low";
type DealStatus = "hot" | "good" | "watch";

type MarketCard = {
  id: SneakerId;
  label: string;
  trend: Trend;
  blueChipScore: number;
  volatility: number;
  priceLow: number;
  priceHigh: number;
  liquidity: Liquidity;
  history: number[];
};

type ExchangeDeal = {
  id: number;
  marketId: string;
  title: string;
  status: DealStatus;
  buySource: string;
  sellSource: string;
  buyPrice: number;
  sellPrice: number;
  profit: number;
  margin: number;
  detectedAt: string;
  lastScanAt: string;
  watchers: number;
};

const MARKET_LABELS: Record<SneakerId, string> = {
  aj1: "AJ1 Retro",
  yeezy: "Yeezy 350",
  dunk: "Dunk Low",
  nb: "NB 990v3",
  travis: "Travis Scott",
  asics: "ASICS Gel-Kayano",
  foam: "Yeezy Foam",
  j4: "AJ4 Military",
};

const MARKET_TO_DEAL_ID: Record<SneakerId, string> = {
  aj1: "aj1-retro",
  yeezy: "yeezy-350",
  dunk: "dunk-low",
  nb: "nb-990v3",
  travis: "travis-scott",
  asics: "nb-990v3",
  foam: "yeezy-350",
  j4: "aj4-military",
};

function mapLabelsToTrend(labels: { bullish: boolean; cooling: boolean; blueChip: boolean }): Trend {
  if (labels.bullish) return "bullish";
  if (labels.cooling) return "cooling";
  return "watch";
}

function mapVolatilityToLiquidity(volatility: number): Liquidity {
  if (volatility < 2.2) return "high";
  if (volatility < 3.6) return "medium";
  return "low";
}

function buildMarketCardsFromState(states: ReturnType<typeof getInitialMarketStates>): MarketCard[] {
  return (Object.keys(states) as SneakerId[]).map((id) => {
    const state = states[id];
    const volatility = Number(computeVolatility(state.priceHistory).toFixed(1));
    const range = getMarketPriceRange(state.priceHistory);
    const labels = getDynamicLabels(state.priceHistory, state.popularityHistory, state.blueChipBase);

    return {
      id,
      label: MARKET_LABELS[id],
      trend: mapLabelsToTrend(labels),
      blueChipScore: Math.floor(getCurrentBlueChipScore(state)),
      volatility,
      priceLow: Number(range.low.toFixed(2)),
      priceHigh: Number(range.high.toFixed(2)),
      liquidity: mapVolatilityToLiquidity(volatility),
      history: state.priceHistory.slice(-12),
    };
  });
}

function remapDealsForMarkets(deals: ReturnType<typeof createSeedDeals>): ExchangeDeal[] {
  const modelRules: Array<{ test: RegExp; marketId: string }> = [
    { test: /AJ1|Jordan 1/i, marketId: "aj1-retro" },
    { test: /Yeezy 350|Yeezy Slide|Yeezy 700/i, marketId: "yeezy-350" },
    { test: /Dunk/i, marketId: "dunk-low" },
    { test: /990|Kayano/i, marketId: "nb-990v3" },
    { test: /Travis/i, marketId: "travis-scott" },
    { test: /AJ4|Jordan 4/i, marketId: "aj4-military" },
  ];

  return deals.map((deal) => {
    const matched = modelRules.find((rule) => rule.test.test(deal.name));
    return {
      id: deal.id,
      marketId: matched?.marketId ?? "dunk-low",
      title: deal.name,
      status: deal.category,
      buySource: "eBay",
      sellSource: /Travis|Jordan|Yeezy|AJ4/i.test(deal.name) ? "StockX" : "GOAT",
      buyPrice: deal.buyPrice,
      sellPrice: deal.sellPrice,
      profit: deal.netProfit,
      margin: deal.margin,
      detectedAt: deal.timeAgo,
      lastScanAt: "just now",
      watchers: Math.max(2, Math.round(Math.abs(deal.margin) / 4)),
    };
  });
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function getInsight(card: MarketCard) {
  if (card.trend === "bullish" && card.liquidity === "high") {
    return `${card.label} momentum is rising with strong liquidity and stable volatility.`;
  }
  if (card.trend === "cooling") {
    return `${card.label} is cooling off. Focus on selective entries and tighter execution.`;
  }
  if (card.volatility >= 4) {
    return `${card.label} volatility is elevated. Watch for spread expansion before entry.`;
  }
  return `${card.label} is stable. Keep it on watch for fresh arbitrage expansion.`;
}

function getTrendBadge(trend: Trend) {
  if (trend === "bullish") {
    return { label: "Bullish", icon: TrendingUp, className: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10" };
  }
  if (trend === "cooling") {
    return { label: "Cooling", icon: TrendingDown, className: "text-amber-300 border-amber-500/30 bg-amber-500/10" };
  }
  return { label: "Watch", icon: Eye, className: "text-sky-300 border-sky-500/30 bg-sky-500/10" };
}

function getDealBadge(status: DealStatus) {
  if (status === "hot") {
    return "bg-orange-500/20 text-orange-300 border-orange-500/30";
  }
  if (status === "good") {
    return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
  }
  return "bg-sky-500/20 text-sky-300 border-sky-500/30";
}

function MiniChart({ values }: { values: number[] }) {
  const width = 220;
  const height = 84;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / Math.max(max - min, 1)) * (height - 10) - 5;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-24 w-full">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className="text-yellow-400"
      />
    </svg>
  );
}

export default function SneakerExchange() {
  const [marketStates, setMarketStates] = useState(() => getInitialMarketStates());
  const [dealFeed, setDealFeed] = useState(() => getFeedState(createSeedDeals(), 10));
  const [selectedMarketId, setSelectedMarketId] = useState<string>("aj1");
  const [isPro] = useState<boolean>(false);
  const [scannerQuery, setScannerQuery] = useState<string>(MARKET_LABELS.aj1);

  useEffect(() => {
    const marketTimer = setInterval(() => {
      setMarketStates((prev) => tickAllMarkets(prev));
    }, 4000);

    const dealTimer = setInterval(() => {
      setDealFeed((prev) =>
        tickArbitrageFeed(prev.deals, {
          addProbability: 0.28,
          removeProbability: 0.08,
          maxDeals: 14,
          minDeals: 8,
        })
      );
    }, 13000);

    return () => {
      clearInterval(marketTimer);
      clearInterval(dealTimer);
    };
  }, []);

  const marketCards = useMemo(() => buildMarketCardsFromState(marketStates), [marketStates]);
  const exchangeDeals = useMemo(() => remapDealsForMarkets(dealFeed.deals), [dealFeed.deals]);

  const selectedMarket = useMemo(
    () => marketCards.find((card) => card.id === selectedMarketId) ?? marketCards[0],
    [marketCards, selectedMarketId]
  );

  const filteredDeals = useMemo(() => {
    const mapped = MARKET_TO_DEAL_ID[selectedMarketId as SneakerId];
    return exchangeDeals.filter((deal) => deal.marketId === mapped);
  }, [exchangeDeals, selectedMarketId]);

  const bestDeal = useMemo(() => {
    if (!filteredDeals.length) return null;
    return [...filteredDeals].sort((a, b) => b.profit - a.profit)[0];
  }, [filteredDeals]);

  const visibleDeals = isPro ? filteredDeals : filteredDeals.slice(0, 2);
  const hiddenCount = Math.max(filteredDeals.length - visibleDeals.length, 0);

  return (
    <div className="min-h-screen bg-[#030713] p-4 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-4 font-sans">
        <section className="rounded-[28px] border border-slate-800 bg-[radial-gradient(circle_at_top,rgba(20,35,80,0.5),rgba(4,8,20,1)_58%)] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-white">
                <LineChart className="h-8 w-8 text-slate-200" />
                Sneaker Exchange
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                  Arbitrage Live
                </span>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-cyan-300">
                  Market-linked execution feed
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <StatCard label="Markets" value={marketCards.length.toString()} />
              <StatCard label="Active deals" value={dealFeed.activeDealsCount.toString()} />
              <StatCard
                label="Best profit"
                value={bestDeal ? formatCurrency(bestDeal.profit) : formatCurrency(dealFeed.totalProfit)}
                highlight
              />
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Top slider</div>
                  <h2 className="mt-1 text-xl font-semibold text-white">Market charts</h2>
                </div>
                <div className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                  Click a market to update the execution feed
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {marketCards.map((card) => {
                  const badge = getTrendBadge(card.trend);
                  const Icon = badge.icon;
                  const isSelected = card.id === selectedMarketId;

                  return (
                    <button
                      key={card.id}
                      onClick={() => {
                        setSelectedMarketId(card.id);
                        setScannerQuery(card.label);
                      }}
                      className={`rounded-3xl border p-4 text-left transition ${
                        isSelected
                          ? "border-indigo-400/50 bg-indigo-500/10 shadow-[0_0_0_1px_rgba(129,140,248,0.25)]"
                          : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xl font-semibold text-white">{card.label}</div>
                          <div className="mt-2 inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs ${badge.className}">
                            <Icon className="h-3.5 w-3.5" />
                            {badge.label}
                          </div>
                        </div>
                        <div className="text-right text-sm text-slate-400">
                          <div>Blue Chip</div>
                          <div className="mt-1 text-lg font-semibold text-white">{card.blueChipScore}</div>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                        <MiniChart values={card.history} />
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                        <SmallMetric label="Volatility" value={`${card.volatility}%`} />
                        <SmallMetric label="Liquidity" value={card.liquidity} />
                        <SmallMetric label="Range" value={`${formatCurrency(card.priceLow)}-${formatCurrency(card.priceHigh)}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <Panel title="Live market insight">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <Activity className="mt-0.5 h-5 w-5 text-emerald-300" />
                  <div>
                    <div className="text-sm font-semibold text-white">{selectedMarket.label}</div>
                    <div className="mt-1 text-sm text-slate-300">{getInsight(selectedMarket)}</div>
                  </div>
                </div>
              </Panel>

              <Panel title="Scanner">
                <div className="rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-4">
                  <div className="mb-2 text-xs uppercase tracking-[0.22em] text-indigo-200">Scanner command box</div>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                      value={scannerQuery}
                      onChange={(e) => setScannerQuery(e.target.value)}
                      className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                      placeholder="Search a sneaker family"
                    />
                  </div>
                </div>
              </Panel>

              <Panel title="Best trade now">
                {bestDeal ? (
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
                      <Flame className="h-4 w-4" />
                      Highest profit in {selectedMarket.label}
                    </div>
                    <div className="mt-2 text-xl font-semibold text-white">{bestDeal.title}</div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <TradeBox label={`Buy on ${bestDeal.buySource}`} value={formatCurrency(bestDeal.buyPrice)} />
                      <TradeBox label={`Sell on ${bestDeal.sellSource}`} value={formatCurrency(bestDeal.sellPrice)} />
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Projected net</div>
                        <div className="mt-1 text-2xl font-semibold text-emerald-300">{isPro ? formatCurrency(bestDeal.profit) : "🔒 Unlock"}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Margin</div>
                        <div className="mt-1 text-lg font-semibold text-white">{isPro ? `${bestDeal.margin}%` : "Premium"}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
                    No trade opportunities available for this market yet.
                  </div>
                )}
              </Panel>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-800 bg-slate-950/60 p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Bottom slider</div>
              <h2 className="mt-1 text-xl font-semibold text-white">Arbitrage execution feed</h2>
              <div className="mt-1 text-sm text-slate-400">
                Showing deals linked to <span className="font-medium text-slate-200">{selectedMarket.label}</span> · live feed {dealFeed.lastScanTime}
              </div>
            </div>

            {!isPro && (
              <div className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
                Free view: partial profits shown, top 2 deals only
              </div>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {visibleDeals.map((deal) => (
              <article key={deal.id} className="rounded-3xl border border-slate-800 bg-[linear-gradient(180deg,rgba(10,14,28,0.95),rgba(7,10,18,0.95))] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${getDealBadge(deal.status)}`}>
                      {deal.status.toUpperCase()}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-white">{deal.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-400">
                      <span>Detected {deal.detectedAt}</span>
                      <span>Last scan {deal.lastScanAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Eye className="h-4 w-4" />
                    {deal.watchers} watching
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <TradeBox label={`Buy on ${deal.buySource}`} value={formatCurrency(deal.buyPrice)} />
                  <TradeBox label={`Sell on ${deal.sellSource}`} value={formatCurrency(deal.sellPrice)} />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <DealMetric label="Net profit" value={isPro ? formatCurrency(deal.profit) : "🔒 Unlock"} accent="text-emerald-300" />
                  <DealMetric label="Margin" value={isPro ? `${deal.margin}%` : "Premium"} accent="text-white" />
                  <DealMetric label="Spread state" value={deal.margin > 20 ? "Expanding" : "Watch"} accent="text-amber-300" />
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-300">
                    View listing
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
                    <Bell className="h-4 w-4" />
                    Set alert
                  </button>
                </div>
              </article>
            ))}
          </div>

          {hiddenCount > 0 && (
            <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-950/60 p-5 text-center">
              <div className="text-lg font-semibold text-white">{hiddenCount} more deals available in {selectedMarket.label}</div>
              <div className="mt-2 text-sm text-slate-400">
                Upgrade subscribers to unlock the full execution feed and real-time profit breakdowns.
              </div>
              <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-5 py-2.5 text-sm font-medium text-indigo-200">
                Unlock full feed
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${highlight ? "text-emerald-300" : "text-white"}`}>{value}</div>
    </div>
  );
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-medium text-slate-200">{value}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-500">{title}</div>
      {children}
    </div>
  );
}

function TradeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function DealMetric({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className={`mt-2 text-xl font-semibold ${accent}`}>{value}</div>
    </div>
  );
}
