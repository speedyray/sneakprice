"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bell,
  ChevronRight,
  Eye,
  Flame,
  LineChart,
  Loader2,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type Trend = "bullish" | "cooling" | "watch";
type DealStatus = "hot" | "good" | "watch";

type SubscriptionTier = "FREE" | "PRO" | "PREMIUM" | "POWER_SELLER";
const PAID_TIERS: SubscriptionTier[] = ["PRO", "PREMIUM", "POWER_SELLER"];
function isPaid(tier: SubscriptionTier): boolean {
  return PAID_TIERS.includes(tier);
}

type LiveIndex = {
  symbol: string;
  name: string;
  description: string;
  level: number | null;
  dayChangePct: number | null;
  breadthUpPct: number | null;
  volatility7d: number | null;
  sentimentScore: number | null;
  liquidityCount: number | null;
  capturedAt: string | null;
  history?: { capturedAt: string; level: number }[];
};

type ExchangeDeal = {
  id: string;
  title: string;
  status: DealStatus;
  buySource: string;
  sellSource: string;
  buyPrice: number;
  sellPrice: number;
  buyUrl: string | null;
  sellUrl: string | null;
  profit: number;
  margin: number;
  detectedAt: string;
  lastScanAt: string;
  watchers: number;
};

type LiveDealRow = {
  id: string;
  title: string;
  brand: string | null;
  buyPlatform: string | null;
  buyPrice: number | null;
  buyUrl: string | null;
  sellPlatform: string | null;
  sellPrice: number | null;
  sellUrl: string | null;
  netProfit: number | null;
  profitMargin: number | null;
  dealScore: number | null;
  dealLabel: string | null;
  detectedAt: string;
  updatedAt: string;
};

type ScannerStats = {
  count: number;
  median: number;
  min: number;
  max: number;
} | null;

type ScannerResult = {
  query: string;
  capturedAt: string;
  stats: ScannerStats;
  listingCount: number;
};

function trendFromChange(dayChangePct: number | null): Trend {
  if (dayChangePct == null) return "watch";
  if (dayChangePct > 0.5) return "bullish";
  if (dayChangePct < -0.5) return "cooling";
  return "watch";
}

function getTrendBadge(trend: Trend) {
  if (trend === "bullish") {
    return {
      label: "Bullish",
      icon: TrendingUp,
      className:
        "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
    };
  }
  if (trend === "cooling") {
    return {
      label: "Cooling",
      icon: TrendingDown,
      className: "text-amber-300 border-amber-500/30 bg-amber-500/10",
    };
  }
  return {
    label: "Watch",
    icon: Eye,
    className: "text-sky-300 border-sky-500/30 bg-sky-500/10",
  };
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

function liquidityBucket(count: number | null): string {
  if (count == null) return "—";
  if (count >= 200) return "high";
  if (count >= 60) return "medium";
  return "low";
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPct(value: number | null, digits = 2): string {
  if (value == null) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

function formatLevel(value: number | null): string {
  if (value == null) return "—";
  return value.toFixed(2);
}

// Tweens between successive `value` props over ~600ms with an ease-out curve.
// When the value first becomes non-null we just snap (no fade-in from 0).
function AnimatedLevel({ value }: { value: number | null }) {
  const [displayed, setDisplayed] = useState<number | null>(value);
  const fromRef = useRef<number | null>(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (value == null) {
      setDisplayed(null);
      fromRef.current = null;
      return;
    }
    const from = fromRef.current;
    if (from == null || from === value) {
      setDisplayed(value);
      fromRef.current = value;
      return;
    }
    const startedAt = performance.now();
    const duration = 600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(from + (value - from) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = value;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return <>{formatLevel(displayed)}</>;
}

function timeAgo(iso: string | null): string {
  if (!iso) return "—";
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.max(0, Math.floor(diffMs / 60000));
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function MiniChart({ values }: { values: number[] }) {
  const width = 220;
  const height = 84;
  if (values.length < 2) {
    return (
      <div className="flex h-24 items-center justify-center text-xs text-slate-500">
        Building history…
      </div>
    );
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y =
        height - ((v - min) / Math.max(max - min, 1)) * (height - 10) - 5;
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

function dealStatusFromLabel(label: string | null): DealStatus {
  if (label === "hot" || label === "good" || label === "watch") return label;
  return "watch";
}

function platformLabel(p: string | null | undefined): string {
  if (!p) return "—";
  if (p === "ebay") return "eBay";
  if (p === "stockx") return "StockX";
  if (p === "goat") return "GOAT";
  if (p === "nike") return "Nike";
  if (p === "footlocker") return "Foot Locker";
  return p.charAt(0).toUpperCase() + p.slice(1);
}

function mapLiveDeal(row: LiveDealRow): ExchangeDeal {
  const buyPrice = row.buyPrice ?? 0;
  const sellPrice = row.sellPrice ?? 0;
  const profit = row.netProfit ?? sellPrice - buyPrice;
  const margin = row.profitMargin ?? (buyPrice > 0 ? (profit / buyPrice) * 100 : 0);
  return {
    id: row.id,
    title: row.title,
    status: dealStatusFromLabel(row.dealLabel),
    buySource: platformLabel(row.buyPlatform),
    sellSource: platformLabel(row.sellPlatform),
    buyPrice,
    sellPrice,
    buyUrl: row.buyUrl,
    sellUrl: row.sellUrl,
    profit,
    margin: Math.round(margin * 10) / 10,
    detectedAt: timeAgo(row.detectedAt),
    lastScanAt: timeAgo(row.updatedAt),
    watchers: Math.max(2, Math.round(Math.abs(margin) / 4)),
  };
}

type Props = { tier: SubscriptionTier; isSignedIn: boolean };

export default function SneakerExchange({ tier, isSignedIn }: Props) {
  const [indexes, setIndexes] = useState<LiveIndex[]>([]);
  const [indexesLoading, setIndexesLoading] = useState(true);
  const [indexesError, setIndexesError] = useState<string | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("SPX-JORDAN");

  const [deals, setDeals] = useState<ExchangeDeal[]>([]);
  const [dealsLoading, setDealsLoading] = useState(true);
  const [dealsError, setDealsError] = useState<string | null>(null);
  const [dealsLastUpdated, setDealsLastUpdated] = useState<string | null>(null);

  // `tier` is "FREE" for both anonymous and signed-in-but-free users — the
  // `getCurrentTier()` helper falls back to FREE for unauthenticated callers.
  // Use `isAnonymous` (not `tier`) to distinguish "show sign-in" from "show
  // upgrade" CTAs.
  const isPro = isPaid(tier);
  const isAnonymous = !isSignedIn;
  const [scannerQuery, setScannerQuery] = useState<string>("Air Jordan 1");
  const [scannerResult, setScannerResult] = useState<ScannerResult | null>(
    null
  );
  const [scannerLoading, setScannerLoading] = useState(false);
  const [scannerError, setScannerError] = useState<string | null>(null);
  const scannerAbortRef = useRef<AbortController | null>(null);

  // Live indexes — initial fetch + 60s poll.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/indexes?history=24", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as { indexes: LiveIndex[] };
        if (cancelled) return;
        setIndexes(json.indexes);
        setIndexesError(null);
      } catch (err) {
        if (cancelled) return;
        setIndexesError(err instanceof Error ? err.message : "fetch failed");
      } finally {
        if (!cancelled) setIndexesLoading(false);
      }
    }

    load();
    const t = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  // Live arbitrage feed — refetch on index change and every 30s.
  useEffect(() => {
    let cancelled = false;

    async function loadDeals() {
      if (isAnonymous) {
        setDeals([]);
        setDealsLoading(false);
        setDealsError(null);
        return;
      }
      try {
        const url = `/api/exchange/deals?index=${encodeURIComponent(selectedSymbol)}&take=30`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as { deals: LiveDealRow[] };
        if (cancelled) return;
        setDeals(json.deals.map(mapLiveDeal));
        setDealsError(null);
        setDealsLastUpdated(new Date().toISOString());
      } catch (err) {
        if (cancelled) return;
        setDealsError(err instanceof Error ? err.message : "fetch failed");
      } finally {
        if (!cancelled) setDealsLoading(false);
      }
    }

    setDealsLoading(true);
    loadDeals();
    const t = setInterval(loadDeals, 30_000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [selectedSymbol, isAnonymous]);

  // Scanner — debounced fetch against /api/market.
  useEffect(() => {
    if (isAnonymous) {
      setScannerResult(null);
      setScannerError(null);
      setScannerLoading(false);
      return;
    }
    const trimmed = scannerQuery.trim();
    if (trimmed.length < 3) {
      setScannerResult(null);
      setScannerError(null);
      return;
    }
    const t = setTimeout(async () => {
      scannerAbortRef.current?.abort();
      const ctrl = new AbortController();
      scannerAbortRef.current = ctrl;
      setScannerLoading(true);
      setScannerError(null);
      try {
        const res = await fetch(
          `/api/market?q=${encodeURIComponent(trimmed)}`,
          { signal: ctrl.signal, cache: "no-store" }
        );
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          const msg = body?.message ?? body?.error ?? `HTTP ${res.status}`;
          throw new Error(msg);
        }
        const json = await res.json();
        setScannerResult({
          query: json.query,
          capturedAt: json.capturedAt,
          stats: json.stats,
          listingCount: Array.isArray(json.listings) ? json.listings.length : 0,
        });
      } catch (err) {
        if ((err as { name?: string }).name === "AbortError") return;
        setScannerError(
          err instanceof Error ? err.message : "scanner failed"
        );
      } finally {
        setScannerLoading(false);
      }
    }, 500);
    return () => clearTimeout(t);
  }, [scannerQuery, isAnonymous]);

  const selectedIndex = useMemo(
    () =>
      indexes.find((i) => i.symbol === selectedSymbol) ?? indexes[0] ?? null,
    [indexes, selectedSymbol]
  );

  const bestDeal = useMemo(() => {
    if (!deals.length) return null;
    return [...deals].sort((a, b) => b.profit - a.profit)[0];
  }, [deals]);

  const visibleDeals = isPro ? deals : deals.slice(0, 3);
  const hiddenCount = Math.max(deals.length - visibleDeals.length, 0);

  const totalLiquidity = indexes.reduce(
    (acc, i) => acc + (i.liquidityCount ?? 0),
    0
  );

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
                  SPX-* indexes live
                </span>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-cyan-300">
                  Hourly market data · eBay-derived
                </span>
                <a
                  href="/exchange/alerts"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1 text-slate-300 hover:border-slate-500 hover:text-white"
                >
                  <Bell className="h-3.5 w-3.5" />
                  Manage alerts
                </a>
                {selectedIndex?.capturedAt && (
                  <span className="text-xs text-slate-500">
                    Last update: {timeAgo(selectedIndex.capturedAt)}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <StatCard label="Indexes" value={indexes.length.toString()} />
              <StatCard
                label="Active deals"
                value={deals.length.toString()}
              />
              <StatCard
                label="Liquidity"
                value={
                  totalLiquidity > 0 ? totalLiquidity.toLocaleString() : "—"
                }
                highlight
              />
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Top slider
                  </div>
                  <h2 className="mt-1 text-xl font-semibold text-white">
                    SPX index dashboard
                  </h2>
                </div>
                <div className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                  Click an index to filter the execution feed
                </div>
              </div>

              {indexesLoading && indexes.length === 0 ? (
                <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/40 p-12 text-sm text-slate-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading live indexes…
                </div>
              ) : indexesError && indexes.length === 0 ? (
                <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-6 text-sm text-rose-200">
                  Failed to load indexes: {indexesError}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {indexes.map((idx) => {
                    const trend = trendFromChange(idx.dayChangePct);
                    const badge = getTrendBadge(trend);
                    const Icon = badge.icon;
                    const isSelected = idx.symbol === selectedSymbol;
                    const history =
                      idx.history?.map((h) => h.level) ?? [];
                    const hasLevel = idx.level != null;

                    return (
                      <button
                        key={idx.symbol}
                        onClick={() => {
                          setSelectedSymbol(idx.symbol);
                        }}
                        className={`rounded-3xl border p-4 text-left transition ${
                          isSelected
                            ? "border-indigo-400/50 bg-indigo-500/10 shadow-[0_0_0_1px_rgba(129,140,248,0.25)]"
                            : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-mono text-slate-500">
                              {idx.symbol}
                            </div>
                            <div className="text-xl font-semibold text-white">
                              {idx.name}
                            </div>
                            <div
                              className={`mt-2 inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs ${badge.className}`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              {badge.label}
                            </div>
                          </div>
                          <div className="text-right text-sm text-slate-400">
                            <div>Level</div>
                            <div className="mt-1 text-lg font-semibold text-white tabular-nums">
                              <AnimatedLevel value={idx.level} />
                            </div>
                            {idx.dayChangePct == null ? (
                              <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                                Building
                              </div>
                            ) : (
                              <div
                                className={`mt-1 text-xs font-medium ${
                                  idx.dayChangePct > 0
                                    ? "text-emerald-300"
                                    : idx.dayChangePct < 0
                                      ? "text-amber-300"
                                      : "text-slate-300"
                                }`}
                              >
                                {formatPct(idx.dayChangePct)}
                              </div>
                            )}
                            {idx.capturedAt && (
                              <div className="mt-1 text-[10px] text-slate-500">
                                Updated {timeAgo(idx.capturedAt)}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                          {hasLevel ? (
                            <MiniChart values={history} />
                          ) : (
                            <div className="flex h-24 items-center justify-center text-xs text-slate-500">
                              No snapshot yet
                            </div>
                          )}
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                          <SmallMetric
                            label="Breadth"
                            value={
                              idx.breadthUpPct != null
                                ? `${idx.breadthUpPct.toFixed(0)}%`
                                : "—"
                            }
                          />
                          <SmallMetric
                            label="Liquidity"
                            value={liquidityBucket(idx.liquidityCount)}
                          />
                          <SmallMetric
                            label="Listings"
                            value={
                              idx.liquidityCount != null
                                ? idx.liquidityCount.toLocaleString()
                                : "—"
                            }
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Panel title="Live market insight">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <Activity className="mt-0.5 h-5 w-5 text-emerald-300" />
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {selectedIndex?.name ?? "—"}
                    </div>
                    <div className="mt-1 text-sm text-slate-300">
                      {selectedIndex?.description ??
                        "Select an index to see live insight."}
                    </div>
                    {selectedIndex?.dayChangePct == null && (
                      <div className="mt-2 inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">
                        Insufficient history — building 7-day window
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <Panel title="Scanner">
                {isAnonymous ? (
                  <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-6 text-center text-sm text-slate-400">
                    <p className="mb-3">Sign in to scan the live market.</p>
                    <a
                      href="/sign-in?redirect_url=/exchange"
                      className="inline-block rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
                    >
                      Sign in
                    </a>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-4">
                    <div className="mb-2 text-xs uppercase tracking-[0.22em] text-indigo-200">
                      Live eBay scanner
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3">
                      <Search className="h-4 w-4 text-slate-400" />
                      <input
                        value={scannerQuery}
                        onChange={(e) => setScannerQuery(e.target.value)}
                        className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                        placeholder="Search a sneaker (e.g. AJ1 Chicago)"
                      />
                      {scannerLoading && (
                        <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                      )}
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                      <SmallMetric
                        label="Listings"
                        value={
                          scannerResult ? `${scannerResult.listingCount}` : "—"
                        }
                      />
                      <SmallMetric
                        label="Median"
                        value={
                          scannerResult?.stats
                            ? formatCurrency(scannerResult.stats.median)
                            : "—"
                        }
                      />
                      <SmallMetric
                        label="Range"
                        value={
                          scannerResult?.stats
                            ? `${formatCurrency(scannerResult.stats.min)}–${formatCurrency(scannerResult.stats.max)}`
                            : "—"
                        }
                      />
                    </div>
                    {scannerError && (
                      <div className="mt-3 text-xs text-rose-300">
                        {scannerError}
                      </div>
                    )}
                  </div>
                )}
              </Panel>

              <Panel title="Best trade now">
                {bestDeal ? (
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
                      <Flame className="h-4 w-4" />
                      Highest profit in {selectedIndex?.name ?? "—"}
                    </div>
                    <div className="mt-2 text-xl font-semibold text-white">
                      {bestDeal.title}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <TradeBox
                        label={`Buy on ${bestDeal.buySource}`}
                        value={formatCurrency(bestDeal.buyPrice)}
                      />
                      <TradeBox
                        label={`Sell on ${bestDeal.sellSource}`}
                        value={formatCurrency(bestDeal.sellPrice)}
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          Projected net
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-emerald-300">
                          {isPro ? (
                            formatCurrency(bestDeal.profit)
                          ) : (
                            <a
                              href="/pricing#pro"
                              className="text-emerald-400 hover:underline"
                            >
                              🔒 Unlock
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          Margin
                        </div>
                        <div className="mt-1 text-lg font-semibold text-white">
                          {isPro ? (
                            `${bestDeal.margin}%`
                          ) : (
                            <a
                              href="/pricing#pro"
                              className="text-emerald-400 hover:underline"
                            >
                              Premium
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
                    No trade opportunities available for this index yet.
                  </div>
                )}
              </Panel>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-800 bg-slate-950/60 p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Bottom slider
              </div>
              <h2 className="mt-1 text-xl font-semibold text-white">
                Arbitrage execution feed
              </h2>
              <div className="mt-1 text-sm text-slate-400">
                Showing deals linked to{" "}
                <span className="font-medium text-slate-200">
                  {selectedIndex?.name ?? "—"}
                </span>
                {dealsLastUpdated && (
                  <>
                    {" "}
                    · live feed updated {timeAgo(dealsLastUpdated)}
                  </>
                )}
                {dealsLoading && deals.length === 0 && " · loading…"}
                {dealsError && deals.length === 0 && (
                  <> · <span className="text-rose-300">feed error</span></>
                )}
              </div>
            </div>

            {!isAnonymous && !isPro && (
              <div className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
                Free view: partial profits shown, top 3 deals only
              </div>
            )}
          </div>

          {isAnonymous ? (
            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center text-sm text-slate-400">
              <p className="mb-3">Sign in to view live arbitrage deals.</p>
              <a
                href="/sign-in?redirect_url=/exchange"
                className="inline-block rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
              >
                Sign in
              </a>
            </div>
          ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {visibleDeals.map((deal) => (
              <article
                key={deal.id}
                className="rounded-3xl border border-slate-800 bg-[linear-gradient(180deg,rgba(10,14,28,0.95),rgba(7,10,18,0.95))] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${getDealBadge(deal.status)}`}
                    >
                      {deal.status.toUpperCase()}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-white">
                      {deal.title}
                    </h3>
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
                  <TradeBox
                    label={`Buy on ${deal.buySource}`}
                    value={formatCurrency(deal.buyPrice)}
                  />
                  <TradeBox
                    label={`Sell on ${deal.sellSource}`}
                    value={formatCurrency(deal.sellPrice)}
                  />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <DealMetric
                    label="Net profit"
                    value={isPro ? formatCurrency(deal.profit) : "🔒 Unlock"}
                    accent="text-emerald-300"
                  />
                  <DealMetric
                    label="Margin"
                    value={isPro ? `${deal.margin}%` : "Premium"}
                    accent="text-white"
                  />
                  <DealMetric
                    label="Spread state"
                    value={deal.margin > 20 ? "Expanding" : "Watch"}
                    accent="text-amber-300"
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {deal.buyUrl ? (
                    <a
                      href={deal.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-300"
                    >
                      View listing
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-500">
                      No listing URL
                    </span>
                  )}
                  <a
                    href="/exchange/alerts"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-slate-500 hover:text-white"
                  >
                    <Bell className="h-4 w-4" />
                    Set alert
                  </a>
                  {!isPro && (
                    <a
                      href="/pricing#pro"
                      className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 hover:border-emerald-400 hover:text-emerald-200"
                    >
                      Unlock all stats
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            ))}
            {visibleDeals.length === 0 && (
              <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 text-sm text-slate-400">
                No deals matched {selectedIndex?.name ?? "this index"} yet.
                Live arbitrage feed wires up next.
              </div>
            )}
          </div>
          )}

          {!isAnonymous && hiddenCount > 0 && (
            <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-950/60 p-5 text-center">
              <div className="text-lg font-semibold text-white">
                {hiddenCount} more deals available in{" "}
                {selectedIndex?.name ?? "this index"}
              </div>
              <div className="mt-2 text-sm text-slate-400">
                Upgrade subscribers to unlock the full execution feed and
                real-time profit breakdowns.
              </div>
              <a
                href="/pricing#pro"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-5 py-2.5 text-sm font-medium text-indigo-200 hover:border-indigo-300 hover:text-indigo-100"
              >
                Unlock full feed
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </div>
      <div
        className={`mt-1 text-2xl font-semibold ${highlight ? "text-emerald-300" : "text-white"}`}
      >
        {value}
      </div>
    </div>
  );
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-slate-200">{value}</div>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-500">
        {title}
      </div>
      {children}
    </div>
  );
}

function TradeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function DealMetric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
      <div className={`mt-2 text-xl font-semibold ${accent}`}>{value}</div>
    </div>
  );
}
