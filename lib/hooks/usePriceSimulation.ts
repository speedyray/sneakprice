// lib/hooks/usePriceSimulation.ts
// Ports the exchange dashboard's random-walk simulation to React.
// Generates an initial price history seeded deterministically from the deal's
// buy price, then appends a new tick every `intervalMs` milliseconds using
// the same volatility model as the Sneaker Stock Exchange.

import { useState, useEffect, useRef } from "react";

/** Deterministic LCG seeded from an integer — gives consistent initial shape per card. */
function lcgRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function buildInitialHistory(seedPrice: number, points = 20): number[] {
  const rng = lcgRng(Math.round(seedPrice * 100));
  const history: number[] = [];
  let price = seedPrice;
  for (let i = 0; i < points; i++) {
    const change = (rng() - 0.5) * 2 * 0.025;
    price = Math.max(seedPrice * 0.75, price * (1 + change));
    history.push(Math.round(price * 100) / 100);
  }
  return history;
}

export interface SimulationOptions {
  /** How fast prices move (0–1). Default 0.025. */
  volatility?: number;
  /** Directional bias per tick. Positive = upward drift. Default 0. */
  trendBias?: number;
  /** Milliseconds between ticks. Default 4000. */
  intervalMs?: number;
  /** Maximum history length before oldest points are dropped. Default 24. */
  maxPoints?: number;
}

/**
 * Returns a rolling array of simulated price history that updates live.
 * Each call with the same `seedPrice` produces the same initial curve.
 */
export function usePriceSimulation(
  seedPrice: number,
  options: SimulationOptions = {}
): number[] {
  const {
    volatility = 0.025,
    trendBias = 0,
    intervalMs = 4000,
    maxPoints = 24,
  } = options;

  const [history, setHistory] = useState<number[]>(() =>
    seedPrice > 0 ? buildInitialHistory(seedPrice) : []
  );

  // Keep a ref so the interval closure always sees the latest history
  const historyRef = useRef(history);
  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  useEffect(() => {
    if (seedPrice <= 0) return;

    const id = setInterval(() => {
      const prev = historyRef.current;
      const last = prev[prev.length - 1] ?? seedPrice;
      const noise = (Math.random() - 0.5) * 2 * volatility;
      const newPrice = Math.max(
        seedPrice * 0.6,
        Math.min(seedPrice * 2, last * (1 + trendBias + noise))
      );
      const next = [...prev, Math.round(newPrice * 100) / 100];
      if (next.length > maxPoints) next.shift();
      setHistory(next);
    }, intervalMs);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedPrice, volatility, trendBias, intervalMs, maxPoints]);

  return history;
}
