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

function useTimeAgo(date: Date | null): string {
  const [label, setLabel] = useState("—");

  useEffect(() => {
    if (!date) return;

    const update = () => {
      const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
      if (seconds < 60) setLabel("just now");
      else if (seconds < 3600) setLabel(`${Math.floor(seconds / 60)}m ago`);
      else setLabel(`${Math.floor(seconds / 3600)}h ago`);
    };

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
    <div className="flex items-center gap-4 px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs font-mono text-gray-400 flex-wrap">
      {/* Live indicator */}
      <span className="flex items-center gap-1.5 text-green-400 font-semibold">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        LIVE
      </span>

      <span className="text-gray-600">|</span>

      <span>
        <span className="text-white font-semibold">{dealCount}</span> active deal{dealCount !== 1 ? "s" : ""}
      </span>

      <span className="text-gray-600">|</span>

      <span>
        Last scan: <span className="text-white font-semibold">{lastScanLabel}</span>
      </span>

      <span className="text-gray-600">|</span>

      <span>
        <span className="text-green-400 font-semibold">
          ${animatedProfit.toFixed(2)}
        </span>{" "}
        total profit available
      </span>
    </div>
  );
}
