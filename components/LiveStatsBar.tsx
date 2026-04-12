// components/LiveStatsBar.tsx
// Trading terminal-style live stats bar shown above deal cards.
// Shows: live indicator, active deal count, last scan time, total profit available.

"use client";

import { useEffect, useState } from "react";
import { useCountUp } from "@/lib/hooks/useCountUp";

interface LiveStatsBarProps {
  dealCount: number;
  lastScanAt: Date | null;
  totalProfit: number;
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
}

function useTimeAgo(date: Date | null): string {
  const [label, setLabel] = useState(() => (date ? formatTimeAgo(date) : "—"));

  useEffect(() => {
    if (!date) {
      setLabel("—");
      return;
    }

    const update = () => setLabel(formatTimeAgo(date));

    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [date]);

  return label;
}

export function LiveStatsBar({ dealCount, lastScanAt, totalProfit }: LiveStatsBarProps) {
  const animatedProfit = useCountUp(totalProfit, 1000);
  const lastScanLabel = useTimeAgo(lastScanAt);

  return (
    <div
      className="flex items-center gap-4 px-4 py-2 rounded-xl text-xs font-mono flex-wrap"
      style={{
        background: "rgba(20,28,40,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#8E9DB2",
      }}
    >
      {/* Live indicator */}
      <span className="flex items-center gap-1.5 font-semibold" style={{ color: "#2ecc71" }}>
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#2ecc71" }} />
        LIVE
      </span>

      <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>

      <span>
        <span className="font-semibold" style={{ color: "#f0f3fa" }}>{dealCount}</span> active deal{dealCount !== 1 ? "s" : ""}
      </span>

      <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>

      <span>
        Last scan: <span className="font-semibold" style={{ color: "#f0f3fa" }}>{lastScanLabel}</span>
      </span>

      <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>

      <span>
        <span className="font-semibold" style={{ color: "#facc15" }}>
          ${animatedProfit.toFixed(2)}
        </span>{" "}
        total profit available
      </span>
    </div>
  );
}
