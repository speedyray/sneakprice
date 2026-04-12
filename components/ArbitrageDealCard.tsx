// components/ArbitrageDealCard.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Flame, TrendingUp, Eye } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { usePriceSimulation } from "@/lib/hooks/usePriceSimulation";

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
  created_at?: string | null;
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

function timeAgo(iso?: string | null): string {
  if (!iso) return "";
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function DealBadge({ label }: { label?: string | null }) {
  if (label === "hot")
    return (
      <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded border-l-2" style={{ background: "#3e2720", color: "#e67e22", borderColor: "#e67e22" }}>
        <Flame className="w-3 h-3" /> HOT DEAL
      </span>
    );
  if (label === "good")
    return (
      <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded border-l-2" style={{ background: "#0f3b2c", color: "#2ecc71", borderColor: "#2ecc71" }}>
        ✅ GOOD DEAL
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded border-l-2" style={{ background: "#1a2c4e", color: "#5dade2", borderColor: "#3498db" }}>
      <Eye className="w-3 h-3" /> WATCH
    </span>
  );
}

interface ArbitrageDealCardProps {
  deal: ArbDeal;
  isNew?: boolean;
  animationDelay?: number;
}

export function ArbitrageDealCard({ deal, isNew = false, animationDelay = 0 }: ArbitrageDealCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(isNew);

  useEffect(() => {
    if (isNew) {
      setIsNewVisible(true);
      const timer = setTimeout(() => setIsNewVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

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

  const animatedBuyPrice = useCountUp(buyPrice ?? 0, 600);
  const animatedSellPrice = useCountUp(sellPrice ?? 0, 600);
  const animatedNetProfit = useCountUp(Math.abs(netProfit ?? 0), 800);

  // Derive simulation parameters from deal characteristics
  const simVolatility = label === "hot" ? 0.04 : label === "good" ? 0.025 : 0.015;
  const simTrendBias = (margin ?? 0) > 20 ? 0.002 : (margin ?? 0) > 0 ? 0.0005 : -0.001;
  const priceHistory = usePriceSimulation(sellPrice ?? buyPrice ?? 100, {
    volatility: simVolatility,
    trendBias: simTrendBias,
    intervalMs: 4000,
  });

  // Convert to recharts data shape; memoised so reference only changes when history does
  const chartData = useMemo(
    () => priceHistory.map((v, i) => ({ t: i, v })),
    [priceHistory]
  );

  // Determine chart line colour: up-trending green, else yellow
  const firstPrice = priceHistory[0] ?? 0;
  const lastPrice = priceHistory[priceHistory.length - 1] ?? 0;
  const chartColor = lastPrice >= firstPrice ? "#2ecc71" : "#facc15";
  const chartGradientId = `spark-grad-${deal.id}`;

  return (
    <div
      className={`rounded-2xl p-5 space-y-4 transition-all animate-slide-up relative ${
        isNew ? "animate-flash-green" : ""
      }`}
      style={{
        background: "rgba(18, 25, 40, 0.85)",
        border: "1px solid rgba(255,255,255,0.08)",
        animationDelay: `${animationDelay}ms`,
        animationFillMode: "both",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      {isNewVisible && (
        <span className="absolute top-3 right-3 bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
          NEW
        </span>
      )}
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <DealBadge label={label} />
            {deal.created_at && (
              <span className="text-xs" style={{ color: "#4a5568" }}>{timeAgo(deal.created_at)}</span>
            )}
          </div>
          <h3 className="font-bold text-base leading-snug mt-1" style={{ color: "#f0f3fa" }}>
            {name}
          </h3>
          {deal.size && (
            <p className="text-sm" style={{ color: "#8E9DB2" }}>Size {deal.size}</p>
          )}
        </div>
        {score != null && (
          <div className="text-right shrink-0">
            <p className="text-xs" style={{ color: "#8E9DB2" }}>Score</p>
            <p className="font-bold text-xl" style={{ color: "#f0f3fa" }}>{score}<span className="text-sm" style={{ color: "#4a5568" }}>/100</span></p>
          </div>
        )}
      </div>

      {/* Live price sparkline */}
      {chartData.length > 2 && (
        <div style={{ height: 72, marginLeft: -4, marginRight: -4 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={chartGradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={chartColor}
                strokeWidth={1.5}
                fill={`url(#${chartGradientId})`}
                dot={false}
                isAnimationActive={true}
                animationDuration={600}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Buy / Sell row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl p-3 space-y-2" style={{ background: "rgba(20,28,40,0.8)" }}>
          <p className="text-xs uppercase tracking-wide" style={{ color: "#8E9DB2" }}>Buy on</p>
          <p className="font-semibold" style={{ color: "#e2e8f0" }}>{platformLabel(deal.buyPlatform)}</p>
          <p className="font-bold text-lg" style={{ color: "#facc15" }}>{fmt(animatedBuyPrice)}</p>
          {deal.buyUrl && (
            <a
              href={deal.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs transition-colors"
              style={{ color: "#5dade2" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#74bde8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#5dade2"; }}
            >
              View Listing <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
        <div className="rounded-xl p-3 space-y-2" style={{ background: "rgba(20,28,40,0.8)" }}>
          <p className="text-xs uppercase tracking-wide" style={{ color: "#8E9DB2" }}>Sell on</p>
          <p className="font-semibold" style={{ color: "#e2e8f0" }}>{platformLabel(deal.sellPlatform)}</p>
          <p className="font-bold text-lg" style={{ color: "#5dade2" }}>{fmt(animatedSellPrice)}</p>
          {deal.sellUrl && (
            <a
              href={deal.sellUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs transition-colors"
              style={{ color: "#5dade2" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#74bde8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#5dade2"; }}
            >
              See Market <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Net profit summary */}
      <div className="rounded-xl px-4 py-3 flex items-center justify-between" style={{ background: "rgba(20,28,40,0.8)" }}>
        <div>
          <p className="text-xs" style={{ color: "#8E9DB2" }}>Net Profit</p>
          <p className={`font-bold text-xl`} style={{ color: (netProfit ?? 0) > 0 ? "#2ecc71" : "#e74c3c" }}>
            {(netProfit ?? 0) >= 0 ? "+" : "-"}${animatedNetProfit.toFixed(2)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: "#8E9DB2" }}>Margin</p>
          <p className="font-bold text-xl" style={{ color: "#f0f3fa" }}>
            {margin != null ? `${margin.toFixed(1)}%` : "—"}
          </p>
        </div>
        {deal.demandTrend != null && deal.demandTrend !== 0 && (
          <div className="text-right">
            <p className="text-xs" style={{ color: "#8E9DB2" }}>30d Trend</p>
            <p className="font-semibold flex items-center gap-1" style={{ color: deal.demandTrend > 0 ? "#2ecc71" : "#e74c3c" }}>
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
            className="flex items-center gap-1 text-xs transition-colors w-full"
            style={{ color: "#8E9DB2" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#f0f3fa"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#8E9DB2"; }}
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {expanded ? "Hide" : "Show"} P&L Breakdown
          </button>

          {expanded && (
            <div className="mt-2 rounded-xl p-4 space-y-1.5 text-sm font-mono" style={{ background: "rgba(20,28,40,0.8)" }}>
              <div className="flex justify-between" style={{ color: "#b9c7d9" }}>
                <span>Gross Profit</span>
                <span style={{ color: "#f0f3fa" }}>+{fmt((sellPrice ?? 0) - (buyPrice ?? 0))}</span>
              </div>
              <div className="flex justify-between" style={{ color: "#8E9DB2" }}>
                <span>{platformLabel(deal.sellPlatform)} Fee</span>
                <span style={{ color: "#e74c3c" }}>-{fmt(deal.platformSellFee)}</span>
              </div>
              <div className="flex justify-between" style={{ color: "#8E9DB2" }}>
                <span>Shipping (buy + sell)</span>
                <span style={{ color: "#e74c3c" }}>
                  -{fmt((deal.shippingBuy ?? 0) + (deal.shippingSell ?? 0))}
                </span>
              </div>
              {(deal.authFee ?? 0) > 0 && (
                <div className="flex justify-between" style={{ color: "#8E9DB2" }}>
                  <span>Authentication</span>
                  <span style={{ color: "#e74c3c" }}>-{fmt(deal.authFee)}</span>
                </div>
              )}
              <div className="flex justify-between" style={{ color: "#8E9DB2" }}>
                <span>Payment Processing</span>
                <span style={{ color: "#e74c3c" }}>-{fmt(deal.paymentFee)}</span>
              </div>
              <div className="pt-1.5 flex justify-between font-bold" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ color: "#f0f3fa" }}>Net Profit</span>
                <span style={{ color: (netProfit ?? 0) > 0 ? "#2ecc71" : "#e74c3c" }}>
                  {(netProfit ?? 0) >= 0 ? "+" : "-"}${Math.abs(netProfit ?? 0).toFixed(2)}
                </span>
              </div>
              {deal.scoredBy && (
                <p className="text-xs pt-1" style={{ color: "#4a5568" }}>Scored by: {deal.scoredBy}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
