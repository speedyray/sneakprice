import { type IndexSymbol } from "./catalog";

// SPX-* index definitions. Constituents live in catalog.ts (each symbol
// declares which indexes it belongs to), so adding a new symbol to an index
// is a one-line edit there. Weighting is "equal" for v1; "volume" (weighted
// by listing count) becomes interesting once we have weeks of history.

export type IndexEntry = {
  symbol: IndexSymbol;
  name: string;
  description: string;
  weighting: "equal";
};

export const INDEXES: IndexEntry[] = [
  {
    symbol: "SPX-JORDAN",
    name: "Jordan Index",
    description: "Jordan Brand retros — AJ1, AJ3, AJ4, AJ11.",
    weighting: "equal",
  },
  {
    symbol: "SPX-YEEZY",
    name: "Yeezy Index",
    description: "Yeezy line — 350 V2, Foam Runner, 700, Slide.",
    weighting: "equal",
  },
  {
    symbol: "SPX-NIKE",
    name: "Nike Index",
    description: "Nike non-Jordan — Air Force 1, Air Max, Dunk anchors.",
    weighting: "equal",
  },
  {
    symbol: "SPX-DUNK",
    name: "Dunk Index",
    description: "Nike Dunk Low colorways — pure Dunk exposure.",
    weighting: "equal",
  },
  {
    symbol: "SPX-LUX",
    name: "Luxury / Collab Index",
    description: "Hype collabs — Travis Scott, Off-White, Balenciaga.",
    weighting: "equal",
  },
];

export function findIndex(symbol: string): IndexEntry | undefined {
  return INDEXES.find((i) => i.symbol === symbol);
}
