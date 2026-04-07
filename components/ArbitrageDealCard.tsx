// components/ArbitrageDealCard.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Flame, TrendingUp, Eye } from "lucide-react";
import { useCountUp } from "@/lib/hooks/useCountUp";

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

  return (
    <div
      className={`bg-gray-900 border border-gray-700 hover:border-gray-500 rounded-2xl p-5 space-y-4 transition-colors animate-slide-up relative ${
        isNew ? "animate-flash-green" : ""
      }`}
      style={{ animationDelay: `${animationDelay}ms`, animationFillMode: "both" }}
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
              <span className="text-gray-500 text-xs">{timeAgo(deal.created_at)}</span>
            )}
          </div>
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
          <p className="text-green-400 font-bold text-lg">{fmt(animatedBuyPrice)}</p>
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
          <p className="text-blue-400 font-bold text-lg">{fmt(animatedSellPrice)}</p>
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
            {(netProfit ?? 0) >= 0 ? "+" : "-"}${animatedNetProfit.toFixed(2)}
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
