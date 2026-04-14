"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Radio,
  Search,
  Activity,
  TrendingUp,
  Clock3,
  Command,
  ScanLine,
  Loader2,
} from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useLanguage } from "@/contexts/LanguageContext";

const seedOpportunities = [
  {
    id: 1,
    model: "Air Jordan 4 Retro Bred",
    venueBuy: "eBay",
    venueSell: "StockX",
    buy: 75.99,
    sell: 160.0,
    score: 62,
    spread: 49.4,
    liquidity: "High",
    status: "LIVE",
    buyUrl: "https://www.ebay.com/itm/298180854198",
  },
  {
    id: 2,
    model: "Air Jordan 3 White Cement",
    venueBuy: "eBay",
    venueSell: "GOAT",
    buy: 75.0,
    sell: 160.0,
    score: 65,
    spread: 51.4,
    liquidity: "High",
    status: "HOT",
    buyUrl: "https://www.ebay.com/itm/335959617833",
  },
  {
    id: 3,
    model: "Nike Air Max 1",
    venueBuy: "eBay",
    venueSell: "Alias",
    buy: 51.0,
    sell: 119.99,
    score: 65,
    spread: 56.0,
    liquidity: "Medium",
    status: "HOT",
    buyUrl: "https://www.ebay.com/itm/137200961893",
  },
  {
    id: 4,
    model: "Air Jordan 11 Retro Bred",
    venueBuy: "eBay",
    venueSell: "StockX",
    buy: 119.99,
    sell: 199.99,
    score: 55,
    spread: 22.4,
    liquidity: "Medium",
    status: "WATCH",
    buyUrl: "https://www.ebay.com/itm/117091376314",
  },
  {
    id: 5,
    model: "Adidas Yeezy 700 Wave Runner",
    venueBuy: "eBay",
    venueSell: "GOAT",
    buy: 120.0,
    sell: 185.0,
    score: 42,
    spread: 11.6,
    liquidity: "Medium",
    status: "WATCH",
    buyUrl: "https://www.ebay.com/itm/358402836754",
  },
  {
    id: 6,
    model: "Nike Dunk High Pro",
    venueBuy: "eBay",
    venueSell: "StockX",
    buy: 84.0,
    sell: 138.5,
    score: 74,
    spread: 32.8,
    liquidity: "High",
    status: "HOT",
    buyUrl: "https://www.ebay.com/itm/336532549598",
  },
  {
    id: 7,
    model: "Nike Air Max Plus",
    venueBuy: "eBay",
    venueSell: "eBay",
    buy: 63.99,
    sell: 114.39,
    score: 42,
    spread: 16.1,
    liquidity: "Medium",
    status: "WATCH",
    buyUrl: "https://www.ebay.com/itm/336528156030",
  },
  {
    id: 8,
    model: "Air Jordan 5 Retro Metallic",
    venueBuy: "eBay",
    venueSell: "StockX",
    buy: 95.0,
    sell: 200.0,
    score: 70,
    spread: 51.4,
    liquidity: "High",
    status: "HOT",
    buyUrl: "https://www.ebay.com/itm/406785309014",
  },
  {
    id: 9,
    model: "Air Jordan 4 Retro Fire Red",
    venueBuy: "eBay",
    venueSell: "GOAT",
    buy: 60.0,
    sell: 145.0,
    score: 75,
    spread: 57.3,
    liquidity: "High",
    status: "HOT",
    buyUrl: "https://www.ebay.com/itm/366342849406",
  },
];

const seedTape = [
  "AJ4 Bred asks thinning on StockX",
  "3 new underpriced pairs detected in last 90 sec",
  "GOAT Jordan 3 White Cement bids rising",
  "Air Max 1 spread widened by 2.1%",
  "Scanner session connected to market feed",
  "Live sold comps refreshed across 24 SKUs",
];

const seedWatchlist = [
  "Jordan 4 Bred",
  "Jordan 1 Chicago",
  "Yeezy 700 Wave Runner",
  "Air Max 1",
  "New Balance 2002R",
];

const seedAlerts = [
  "HOT: Jordan 3 White Cement crossed 50% spread",
  "SCAN: New live match identified from entered keyword",
  "DEPTH: AJ4 Bred bid stack increased on eBay",
  "COMPS: 6 fresh sold pairs added for Air Max 1",
];

const seedComps = [
  { size: "10", venue: "eBay", sold: 146, when: "12m ago" },
  { size: "10.5", venue: "StockX", sold: 151, when: "24m ago" },
  { size: "9", venue: "GOAT", sold: 154, when: "38m ago" },
  { size: "11", venue: "Alias", sold: 149, when: "44m ago" },
  { size: "10", venue: "eBay", sold: 158, when: "52m ago" },
];

type Opportunity = {
  id: number;
  model: string;
  venueBuy: string;
  venueSell: string;
  buy: number;
  sell: number;
  score: number;
  spread: number;
  liquidity: string;
  status: string;
  buyUrl?: string;
};

function getBuyUrl(opp: Opportunity) {
  if (opp.buyUrl) return opp.buyUrl;
  return `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(opp.model)}&LH_BIN=1&_sop=15`;
}

function getSellUrl(model: string, venue: string) {
  const q = encodeURIComponent(model);
  if (venue === "StockX") return `https://stockx.com/search?s=${q}`;
  if (venue === "GOAT") return `https://www.goat.com/search?query=${q}`;
  // eBay resell or any other venue — search sold listings
  return `https://www.ebay.com/sch/i.html?_nkw=${q}&LH_Sold=1&LH_Complete=1`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const displayRef = useRef(value);
  displayRef.current = display;

  useEffect(() => {
    const start = displayRef.current;
    const end = value;
    const duration = 650;
    const startTime = performance.now();
    let frame = 0;

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + (end - start) * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function generateHistory(base: number) {
  return Array.from({ length: 24 }, (_, i) => {
    const drift = Math.sin(i / 2.7) * 4 + Math.random() * 2.5;
    return Math.max(base - 16 + i * 0.7 + drift, 20);
  });
}

function TinyChart({ values }: { values: number[] }) {
  const width = 360;
  const height = 120;
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
    <svg viewBox={`0 0 ${width} ${height}`} className="h-32 w-full">
      <defs>
        <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke="url(#lineGlow)"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}

function mutateOpportunities(rows: Opportunity[]) {
  return rows.map((row) => {
    const nextBuy = Math.max(20, row.buy + (Math.random() - 0.5) * 2.2);
    const nextSell = Math.max(
      nextBuy + 8,
      row.sell + (Math.random() - 0.5) * 2.8
    );
    const nextSpread = Number(
      (((nextSell - nextBuy) / nextBuy) * 100).toFixed(1)
    );
    const nextScore = Math.max(
      25,
      Math.min(98, row.score + Math.round((Math.random() - 0.45) * 4))
    );
    return {
      ...row,
      buy: Number(nextBuy.toFixed(2)),
      sell: Number(nextSell.toFixed(2)),
      spread: nextSpread,
      score: nextScore,
    };
  });
}

function nextTapeItem(opportunity: Opportunity) {
  const options = [
    `${opportunity.model} spread now ${opportunity.spread.toFixed(1)}%`,
    `${opportunity.model} score updated to ${opportunity.score}`,
    `${opportunity.model} ${opportunity.venueSell} ask repriced live`,
    `${opportunity.model} new sold comp confirmed`,
  ];
  return options[Math.floor(Math.random() * options.length)];
}

export default function SneakPriceResaleTerminal() {
  useUser(); // keeps Clerk context warm for openSignIn()
  const { openSignIn } = useClerk();
  const { t } = useLanguage();

  const [opportunities, setOpportunities] = useState<Opportunity[]>(seedOpportunities);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [tape, setTape] = useState(seedTape);
  const [watchlist] = useState(seedWatchlist);
  const [alerts, setAlerts] = useState(seedAlerts);
  const [command, setCommand] = useState("");
  const [feedMode, setFeedMode] = useState<
    "SIMULATED" | "EVENTSOURCE" | "WEBSOCKET"
  >("SIMULATED");
  const [connectionPulse, setConnectionPulse] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState("");
  const [scansRemaining, setScansRemaining] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setOpportunities((prev) => {
        const updated = mutateOpportunities(prev);
        const changed = updated.filter((item, index) => {
          const before = prev[index];
          return (
            Math.abs(item.buy - before.buy) > 0.35 ||
            Math.abs(item.sell - before.sell) > 0.35 ||
            item.score !== before.score
          );
        });
        const pool = changed.length ? changed : updated;
        const pivot = pool[Math.floor(Math.random() * pool.length)];
        setSelectedId(pivot.id);
        setTape((t) => [nextTapeItem(pivot), ...t].slice(0, 10));
        setAlerts((a) =>
          [
            `${pivot.status}: ${pivot.model} ${
              pivot.spread > 35 ? "spread expanding" : "repriced in live feed"
            }`,
            ...a,
          ].slice(0, 6)
        );
        return updated;
      });
      setConnectionPulse((v) => v + 1);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  const selected = useMemo(() => {
    if (selectedId == null) return opportunities[0];
    return opportunities.find((o) => o.id === selectedId) ?? opportunities[0];
  }, [opportunities, selectedId]);

  const history = useMemo(
    () => generateHistory(selected.sell),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selected.sell, selected.id]
  );

  const profit = selected.sell - selected.buy;

  async function handleScan() {
    const query = command.trim();
    if (!query) return;

    setIsScanning(true);
    setScanError("");

    try {
      const res = await fetch("/api/ebay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (res.status === 401) { openSignIn(); return; }
      if (res.status === 403) { setScanError("limit_reached"); return; }

      const data = await res.json();

      if (data.remaining !== undefined) setScansRemaining(data.remaining);

      if (!data.deal) {
        setScanError("No arbitrage opportunity found for this model right now.");
        return;
      }

      const roi: number = data.deal.roi ?? 0;
      const newOpp: Opportunity = {
        id: Date.now(),
        model: query,
        venueBuy: "eBay",
        venueSell: "StockX",
        buy: Number((data.deal.buyPrice as number).toFixed(2)),
        sell: Number((data.deal.marketPrice as number).toFixed(2)),
        score: Math.min(98, Math.max(25, Math.round(35 + roi * 0.65))),
        spread: Number(roi.toFixed(1)),
        liquidity: roi >= 30 ? "High" : "Medium",
        status: roi >= 30 ? "HOT" : roi >= 15 ? "LIVE" : "WATCH",
        buyUrl: data.deal.cheapestItemId
          ? `https://www.ebay.com/itm/${data.deal.cheapestItemId}`
          : undefined,
      };

      setOpportunities((prev) => [newOpp, ...prev].slice(0, 12));
      setSelectedId(newOpp.id);
      setCommand("");
      setTape((t) => [`SCAN: ${query} — ${roi.toFixed(1)}% spread detected`, ...t].slice(0, 10));
      setAlerts((a) => [`SCAN: ${query} added to live grid`, ...a].slice(0, 6));
    } catch {
      setScanError("Scan failed. Please try again.");
    } finally {
      setIsScanning(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#03060b] p-3 text-[#dce7f8] md:p-5">
      <div className="mx-auto max-w-[1700px] space-y-3 font-mono">
        {/* ── Header / top bar ─────────────────────────────────── */}
        <header className="overflow-hidden rounded-[28px] border border-[#1c2432] bg-[radial-gradient(circle_at_top,rgba(17,34,63,0.85),rgba(6,11,18,1)_55%)] shadow-[0_0_0_1px_rgba(80,100,140,0.08),0_30px_90px_rgba(0,0,0,0.35)]">
          {/* Status bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1d2738] bg-black/20 px-4 py-3 text-[11px] uppercase tracking-[0.28em] text-[#8fa4c9]">
            <div className="flex items-center gap-4">
              <span className="text-[#f59e0b]">SPT&lt;LIVE&gt;</span>
              <span>{t.terminal.title}</span>
              <span className="inline-flex items-center gap-2 text-[#4ade80]">
                <Radio className="h-3.5 w-3.5" /> {t.terminal.feed_open}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFeedMode("SIMULATED")}
                className={`rounded-full border px-2.5 py-1 ${
                  feedMode === "SIMULATED"
                    ? "border-[#f59e0b] text-[#f8cc66]"
                    : "border-[#2a3447] text-[#92a7c7]"
                }`}
              >
                SIM
              </button>
              <button
                onClick={() => setFeedMode("EVENTSOURCE")}
                className={`rounded-full border px-2.5 py-1 ${
                  feedMode === "EVENTSOURCE"
                    ? "border-[#38bdf8] text-[#7dd3fc]"
                    : "border-[#2a3447] text-[#92a7c7]"
                }`}
              >
                SSE
              </button>
              <button
                onClick={() => setFeedMode("WEBSOCKET")}
                className={`rounded-full border px-2.5 py-1 ${
                  feedMode === "WEBSOCKET"
                    ? "border-[#4ade80] text-[#86efac]"
                    : "border-[#2a3447] text-[#92a7c7]"
                }`}
              >
                WS
              </button>
              <span>Latency 0{42 + (connectionPulse % 9)}ms</span>
            </div>
          </div>

          {/* Tape + top metrics */}
          <div className="grid gap-3 border-b border-[#1d2738] px-4 py-3 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="relative overflow-hidden rounded-2xl border border-[#243148] bg-[#07101c] px-4 py-3">
              <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#8fa4c9]">
                <Activity className="h-3.5 w-3.5 text-[#4ade80]" />
                {t.terminal.tape_label}
              </div>
              <div className="whitespace-nowrap text-sm text-white">
                <div className="inline-flex min-w-full animate-[marquee_26s_linear_infinite] gap-10">
                  {tape.concat(tape).map((item, idx) => (
                    <span
                      key={`${item}-${idx}`}
                      className="inline-flex items-center gap-3"
                    >
                      <span className="text-[#f59e0b]">▸</span>
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <TopMetric label={t.terminal.live_opps} value={opportunities.length} suffix="" />
              <TopMetric label={t.terminal.alert_queue_label} value={alerts.length} suffix="" />
              <TopMetric
                label={t.terminal.best_edge}
                value={Math.max(...opportunities.map((o) => o.spread))}
                suffix="%"
                decimals={1}
              />
            </div>
          </div>

          {/* Main grid: opportunities + sidebar */}
          <div className="grid gap-3 p-3 xl:grid-cols-[1.25fr_390px]">
            {/* Left: opportunities grid */}
            <section className="rounded-[24px] border border-[#1c2739] bg-[#050b13]/80 p-3">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#8fa4c9]">
                    {t.terminal.feed_open}
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    {t.terminal.opportunities_grid}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {selectedId != null && (
                    <span className="rounded-full border border-[#f59e0b] bg-[#221507] px-3 py-1.5 text-[#fde68a]">
                      Auto-highlighting last updated opportunity
                    </span>
                  )}
                  {["ALL", "HOT", "LIVE", "WATCH", "HIGH LIQ"].map((label) => (
                    <button
                      key={label}
                      onClick={() => setActiveFilter(label)}
                      className={`rounded-full border px-3 py-1.5 transition ${
                        activeFilter === label
                          ? "border-[#f59e0b] bg-[#221507] text-[#f8cc66]"
                          : "border-[#28344a] bg-[#08111e] text-[#c4d2e8] hover:border-[#f59e0b] hover:text-[#f8cc66]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
                {opportunities
                  .filter((opp) => {
                    if (activeFilter === "ALL") return true;
                    if (activeFilter === "HIGH LIQ") return opp.liquidity === "High";
                    return opp.status === activeFilter;
                  })
                  .map((opp) => {
                  const net = opp.sell - opp.buy;
                  const isSelected =
                    selectedId != null && opp.id === selectedId;
                  return (
                    <div
                      key={opp.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedId(opp.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setSelectedId(opp.id);
                      }}
                      className={`cursor-pointer rounded-[22px] border p-4 text-left transition ${
                        isSelected
                          ? "border-[#f59e0b] bg-[linear-gradient(135deg,rgba(12,24,42,0.98),rgba(13,25,52,0.95))] shadow-[0_0_0_1px_rgba(245,158,11,0.14),0_20px_40px_rgba(0,0,0,0.35)]"
                          : "border-[#1d283a] bg-[linear-gradient(135deg,rgba(8,15,26,1),rgba(10,19,35,0.95))] hover:border-[#31415c]"
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <div className="inline-flex rounded-full border border-[#23456b] bg-[#0b1b2d] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[#7dd3fc]">
                            {opp.status}
                          </div>
                          <div className="mt-2 text-lg font-semibold leading-tight text-white">
                            {opp.model}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] uppercase tracking-[0.18em] text-[#8fa4c9]">
                            {t.common.score}
                          </div>
                          <AnimatedNumber
                            value={opp.score}
                            className="text-2xl font-semibold text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <DataPanel
                          label={`Buy • ${opp.venueBuy}`}
                          value={formatCurrency(opp.buy)}
                          tone="amber"
                        />
                        <DataPanel
                          label={`Sell • ${opp.venueSell}`}
                          value={formatCurrency(opp.sell)}
                          tone="sky"
                        />
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <MiniPanel
                          label={t.common.net}
                          value={formatCurrency(net)}
                          valueClass="text-[#4ade80]"
                        />
                        <MiniPanel
                          label={t.common.spread}
                          value={`${opp.spread.toFixed(1)}%`}
                          valueClass="text-[#f8cc66]"
                        />
                        <MiniPanel
                          label={t.terminal.liq}
                          value={opp.liquidity}
                          valueClass="text-white"
                        />
                      </div>

                      {/* Buy / Sell action links */}
                      <div className="mt-3 flex gap-2">
                        <a
                          href={getBuyUrl(opp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 rounded-xl border border-[#f59e0b]/40 bg-[#1a0f02] px-2 py-2 text-center text-[11px] font-semibold text-[#f8cc66] transition hover:border-[#f59e0b] hover:bg-[#221507]"
                        >
                          {t.terminal.buy_on} {opp.venueBuy} →
                        </a>
                        <a
                          href={getSellUrl(opp.model, opp.venueSell)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 rounded-xl border border-[#38bdf8]/40 bg-[#021018] px-2 py-2 text-center text-[11px] font-semibold text-[#7dd3fc] transition hover:border-[#38bdf8] hover:bg-[#031825]"
                        >
                          {t.terminal.sell_on} {opp.venueSell} →
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Right sidebar */}
            <aside className="space-y-3">
              <TerminalPanel
                title={t.terminal.scanner_title}
                icon={<Command className="h-4 w-4 text-[#f59e0b]" />}
              >
                <div className="relative rounded-2xl border border-[#f59e0b] bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),rgba(6,16,26,1))] p-4 shadow-[0_0_0_1px_rgba(245,158,11,0.25),0_0_30px_rgba(245,158,11,0.25)]">
                  <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#f8cc66]">
                    <span>{t.terminal.scanner_hint}</span>
                    <span className="animate-pulse text-[#4ade80]">
                      LIVE INPUT
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-[#33415c] bg-black/40 px-4 py-4 text-[#f8cc66]">
                    <Search className="h-5 w-5 text-[#7dd3fc]" />
                    <input
                      value={command}
                      onChange={(e) => { setCommand(e.target.value); setScanError(""); }}
                      onKeyDown={(e) => { if (e.key === "Enter") handleScan(); }}
                      className="w-full bg-transparent text-lg font-semibold text-white outline-none placeholder:text-[#6b85a6]"
                      placeholder={t.terminal.scanner_placeholder}
                    />
                    {isScanning
                      ? <Loader2 className="h-4 w-4 animate-spin text-[#f8cc66]" />
                      : <span className="animate-pulse text-[#f8cc66]">▍</span>
                    }
                  </div>

                  {scanError === "limit_reached" && (
                    <div className="mt-2 rounded-xl border border-red-700 bg-red-900/20 px-3 py-2 text-xs text-red-300">
                      You&apos;ve used all 3 free scans today. Come back tomorrow.
                    </div>
                  )}
                  {scanError && scanError !== "unauthenticated" && scanError !== "limit_reached" && (
                    <div className="mt-2 rounded-xl border border-red-700 bg-red-900/20 px-3 py-2 text-xs text-red-300">
                      {scanError}
                    </div>
                  )}
                  {scansRemaining !== null && !scanError && (
                    <p className="mt-2 text-center text-[10px] text-[#8fa4c9]">
                      {scansRemaining} scan{scansRemaining !== 1 ? "s" : ""} remaining today
                    </p>
                  )}

                  <div className="mt-2 text-xs text-[#8fa4c9]">
                    Examples: &quot;Jordan 4 Bred&quot;, &quot;Yeezy 700&quot;,
                    SKU, or paste listing title
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <ActionButton
                    label={isScanning ? t.terminal.scanning : t.terminal.run_scan}
                    icon={isScanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />}
                    onClick={handleScan}
                    disabled={isScanning || !command.trim()}
                  />
                  <ActionButton
                    label={t.terminal.open_scanner}
                    icon={<Search className="h-4 w-4" />}
                  />
                  <ActionButton
                    label={t.terminal.push_alert}
                    icon={<Bell className="h-4 w-4" />}
                  />
                  <ActionButton
                    label={t.terminal.track_sku}
                    icon={<TrendingUp className="h-4 w-4" />}
                  />
                </div>
              </TerminalPanel>

              <TerminalPanel
                title={t.terminal.watchlist}
                icon={<Clock3 className="h-4 w-4 text-[#7dd3fc]" />}
              >
                <div className="space-y-2">
                  {watchlist.map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-xl border border-[#1d283a] bg-[#07101b] px-3 py-2 text-sm"
                    >
                      <span className="text-white">{item}</span>
                      <span className="text-[#8fa4c9]">W{i + 1}</span>
                    </div>
                  ))}
                </div>
              </TerminalPanel>

              <TerminalPanel
                title={t.terminal.alert_queue}
                icon={<Bell className="h-4 w-4 text-[#4ade80]" />}
              >
                <div className="space-y-2">
                  {alerts.map((item, i) => (
                    <div
                      key={`${item}-${i}`}
                      className={`rounded-xl border px-3 py-2 text-sm transition-all ${
                        i === 0
                          ? "border-[#f59e0b] bg-[#221507] text-[#fde68a]"
                          : "border-[#1d283a] bg-[#07101b] text-[#dbe7f7]"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </TerminalPanel>
            </aside>
          </div>
        </header>

        {/* ── Bottom panels ────────────────────────────────────── */}
        <section className="grid gap-3 xl:grid-cols-[1.1fr_0.95fr_0.95fr_0.9fr]">
          <BottomPanel title={t.terminal.deal_depth}>
            <div className="space-y-2 text-sm">
              {(
                [
                  [
                    selected.model,
                    formatCurrency(selected.buy),
                    formatCurrency(selected.sell),
                    `${selected.spread.toFixed(1)}%`,
                  ],
                  [
                    "Bid stack",
                    formatCurrency(selected.buy - 2.5),
                    formatCurrency(selected.buy + 1.2),
                    "live",
                  ],
                  [
                    "Ask wall",
                    formatCurrency(selected.sell - 4.2),
                    formatCurrency(selected.sell + 3.8),
                    "thin",
                  ],
                  [
                    "Execution est.",
                    formatCurrency(profit - 9.5),
                    formatCurrency(profit - 4.1),
                    "after fees",
                  ],
                ] as [string, string, string, string][]
              ).map(([label, a, b, c]) => (
                <div
                  key={label}
                  className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.55fr] gap-2 rounded-xl border border-[#1d283a] bg-[#07101b] px-3 py-2"
                >
                  <span className="text-white">{label}</span>
                  <span className="text-[#f8cc66]">{a}</span>
                  <span className="text-[#7dd3fc]">{b}</span>
                  <span className="text-right text-[#4ade80]">{c}</span>
                </div>
              ))}
            </div>
          </BottomPanel>

          <BottomPanel title={t.terminal.price_history}>
            <div className="rounded-2xl border border-[#1d283a] bg-[#07101b] p-3">
              <TinyChart values={history} />
              <div className="mt-2 flex items-center justify-between text-xs text-[#8fa4c9]">
                <span>24-point live view</span>
                <span>{selected.model}</span>
              </div>
            </div>
          </BottomPanel>

          <BottomPanel title={t.terminal.recent_comps}>
            <div className="space-y-2 text-sm">
              {seedComps.map((comp, idx) => (
                <div
                  key={`${comp.venue}-${idx}`}
                  className="grid grid-cols-[0.5fr_0.8fr_0.8fr_0.7fr] gap-2 rounded-xl border border-[#1d283a] bg-[#07101b] px-3 py-2"
                >
                  <span className="text-white">{comp.size}</span>
                  <span className="text-[#7dd3fc]">{comp.venue}</span>
                  <span className="text-[#f8cc66]">{formatCurrency(comp.sold)}</span>
                  <span className="text-right text-[#8fa4c9]">{comp.when}</span>
                </div>
              ))}
            </div>
          </BottomPanel>

          <BottomPanel title={t.terminal.execution_notes}>
            <div className="space-y-2 text-sm text-[#dbe7f7]">
              {[
                "Confirm size-level comps before sending push alert.",
                "Prefer pairs with high liquidity and at least 3 recent sold confirmations.",
                "Use scanner command box to jump directly into model / SKU workflows.",
                "Surface net after fees, shipping, and payout timing in final execution UI.",
              ].map((note) => (
                <div
                  key={note}
                  className="rounded-xl border border-[#1d283a] bg-[#07101b] px-3 py-2"
                >
                  {note}
                </div>
              ))}
            </div>
          </BottomPanel>
        </section>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function TopMetric({
  label,
  value,
  suffix,
  decimals = 0,
}: {
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
}) {
  return (
    <div className="rounded-2xl border border-[#233149] px-3 py-3 text-center">
      <div className="text-[10px] uppercase tracking-[0.18em] text-[#8fa4c9]">
        {label}
      </div>
      <AnimatedNumber
        value={value}
        suffix={suffix}
        decimals={decimals}
        className="mt-1 text-xl font-semibold text-white"
      />
    </div>
  );
}

function TerminalPanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[22px] border border-[#1d283a] bg-[#050b13]/90 p-3">
      <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#8fa4c9]">
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function BottomPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-[#1d283a] bg-[#050b13]/90 p-4">
      <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#8fa4c9]">
        {title}
      </div>
      {children}
    </div>
  );
}

function DataPanel({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "amber" | "sky";
}) {
  return (
    <div className="rounded-xl border border-[#1d283a] bg-[#07101b] p-3">
      <div className="text-[10px] uppercase tracking-[0.18em] text-[#8fa4c9]">
        {label}
      </div>
      <div
        className={`mt-2 text-xl font-semibold ${
          tone === "amber" ? "text-[#f8cc66]" : "text-[#7dd3fc]"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function MiniPanel({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl border border-[#1d283a] bg-[#07101b] p-2.5">
      <div className="text-[10px] uppercase tracking-[0.18em] text-[#8fa4c9]">
        {label}
      </div>
      <div className={`mt-1 text-sm font-semibold ${valueClass ?? "text-white"}`}>
        {value}
      </div>
    </div>
  );
}

function ActionButton({
  label,
  icon,
  onClick,
  disabled,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-between rounded-xl border border-[#28344a] bg-[#08111e] px-3 py-2 text-left text-[#dce7f8] transition hover:border-[#f59e0b] hover:text-[#fde68a] disabled:cursor-not-allowed disabled:opacity-40"
    >
      <span>{label}</span>
      {icon}
    </button>
  );
}
