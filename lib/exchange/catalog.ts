// Curated symbol catalog — the constituents of the Sneaker Exchange. Each
// symbol maps to one eBay Browse query (the foundation for active-market
// stats) and to one or more SPX-* indexes. Edit this list freely; downstream
// snapshot rows are forward-only and will fill in for new symbols on the next
// cron tick.

export type Brand =
  | "JORDAN"
  | "YEEZY"
  | "NIKE"
  | "TRAVIS"
  | "OFFWHITE"
  | "BALENCIAGA";

export type IndexSymbol =
  | "SPX-JORDAN"
  | "SPX-YEEZY"
  | "SPX-NIKE"
  | "SPX-DUNK"
  | "SPX-LUX";

export type SymbolEntry = {
  symbol: string;
  display: string;
  brand: Brand;
  ebayQuery: string;
  indexes: IndexSymbol[];
};

export const SYMBOLS: SymbolEntry[] = [
  // ---- Jordan retros (SPX-JORDAN) ----
  { symbol: "AJ1-CHI",   display: "AJ1 Chicago",         brand: "JORDAN", ebayQuery: "Air Jordan 1 Retro High Chicago",      indexes: ["SPX-JORDAN"] },
  { symbol: "AJ1-BRED",  display: "AJ1 Bred",            brand: "JORDAN", ebayQuery: "Air Jordan 1 Retro High Bred",         indexes: ["SPX-JORDAN"] },
  { symbol: "AJ3-WC",    display: "AJ3 White Cement",    brand: "JORDAN", ebayQuery: "Air Jordan 3 Retro White Cement",      indexes: ["SPX-JORDAN"] },
  { symbol: "AJ4-BRED",  display: "AJ4 Bred",            brand: "JORDAN", ebayQuery: "Air Jordan 4 Retro Bred",              indexes: ["SPX-JORDAN"] },
  { symbol: "AJ4-MIL",   display: "AJ4 Military Black",  brand: "JORDAN", ebayQuery: "Air Jordan 4 Retro Military Black",    indexes: ["SPX-JORDAN"] },
  { symbol: "AJ11-BRED", display: "AJ11 Bred",           brand: "JORDAN", ebayQuery: "Air Jordan 11 Retro Bred",             indexes: ["SPX-JORDAN"] },

  // ---- Yeezy (SPX-YEEZY) ----
  { symbol: "YZY-350-ZEBRA",  display: "Yeezy 350 V2 Zebra",        brand: "YEEZY", ebayQuery: "Yeezy Boost 350 V2 Zebra",         indexes: ["SPX-YEEZY"] },
  { symbol: "YZY-350-CREAM",  display: "Yeezy 350 V2 Cream",        brand: "YEEZY", ebayQuery: "Yeezy Boost 350 V2 Cream White",   indexes: ["SPX-YEEZY"] },
  { symbol: "YZY-350-BRED",   display: "Yeezy 350 V2 Bred",         brand: "YEEZY", ebayQuery: "Yeezy Boost 350 V2 Bred",          indexes: ["SPX-YEEZY"] },
  { symbol: "YZY-FOAM-MB",    display: "Yeezy Foam Mineral Blue",   brand: "YEEZY", ebayQuery: "Yeezy Foam Runner Mineral Blue",   indexes: ["SPX-YEEZY"] },
  { symbol: "YZY-700-WAVE",   display: "Yeezy 700 Wave Runner",     brand: "YEEZY", ebayQuery: "Yeezy 700 Wave Runner",            indexes: ["SPX-YEEZY"] },
  { symbol: "YZY-SLIDE-PURE", display: "Yeezy Slide Pure",          brand: "YEEZY", ebayQuery: "Yeezy Slide Pure",                 indexes: ["SPX-YEEZY"] },

  // ---- Nike non-Jordan (SPX-NIKE; Dunk colorways double in SPX-DUNK) ----
  { symbol: "NK-AF1-WHITE",  display: "Air Force 1 Triple White",  brand: "NIKE", ebayQuery: "Nike Air Force 1 Low Triple White", indexes: ["SPX-NIKE"] },
  { symbol: "NK-AM1-BACON",  display: "Air Max 1 Bacon",           brand: "NIKE", ebayQuery: "Nike Air Max 1 Bacon",              indexes: ["SPX-NIKE"] },
  { symbol: "NK-AM97-SLV",   display: "Air Max 97 Silver Bullet",  brand: "NIKE", ebayQuery: "Nike Air Max 97 Silver Bullet",     indexes: ["SPX-NIKE"] },
  { symbol: "NK-DUNK-PANDA", display: "Dunk Low Panda",            brand: "NIKE", ebayQuery: "Nike Dunk Low Panda",               indexes: ["SPX-NIKE", "SPX-DUNK"] },
  { symbol: "NK-DUNK-UNC",   display: "Dunk Low UNC",              brand: "NIKE", ebayQuery: "Nike Dunk Low UNC",                 indexes: ["SPX-NIKE", "SPX-DUNK"] },

  // ---- Dunk-only (SPX-DUNK) ----
  { symbol: "NK-DUNK-CHI",  display: "Dunk Low Chicago",   brand: "NIKE", ebayQuery: "Nike Dunk Low Chicago",   indexes: ["SPX-DUNK"] },
  { symbol: "NK-DUNK-MICH", display: "Dunk Low Michigan",  brand: "NIKE", ebayQuery: "Nike Dunk Low Michigan",  indexes: ["SPX-DUNK"] },
  { symbol: "NK-DUNK-SYR",  display: "Dunk Low Syracuse",  brand: "NIKE", ebayQuery: "Nike Dunk Low Syracuse",  indexes: ["SPX-DUNK"] },

  // ---- Luxury / hype collabs (SPX-LUX) ----
  { symbol: "TS-AJ1-MOCHA",  display: "Travis Scott AJ1 Low Mocha",     brand: "TRAVIS",     ebayQuery: "Travis Scott Air Jordan 1 Low Mocha",     indexes: ["SPX-LUX"] },
  { symbol: "TS-AM1-CACTUS", display: "Travis Scott AM1 Cactus Jack",   brand: "TRAVIS",     ebayQuery: "Travis Scott Nike Air Max 1 Cactus Jack", indexes: ["SPX-LUX"] },
  { symbol: "OW-AJ1-CHI",    display: "Off-White AJ1 Chicago",          brand: "OFFWHITE",   ebayQuery: "Off-White Air Jordan 1 Chicago",          indexes: ["SPX-LUX"] },
  { symbol: "OW-DUNK-PINE",  display: "Off-White Dunk Low Pine Green",  brand: "OFFWHITE",   ebayQuery: "Off-White Nike Dunk Low Pine Green",      indexes: ["SPX-LUX"] },
  { symbol: "BAL-TRIPLE-S",  display: "Balenciaga Triple S",            brand: "BALENCIAGA", ebayQuery: "Balenciaga Triple S",                     indexes: ["SPX-LUX"] },
];

export function findSymbol(symbol: string): SymbolEntry | undefined {
  return SYMBOLS.find((s) => s.symbol === symbol);
}

export function symbolsForIndex(indexSymbol: IndexSymbol): SymbolEntry[] {
  return SYMBOLS.filter((s) => s.indexes.includes(indexSymbol));
}
