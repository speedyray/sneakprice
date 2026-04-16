export type SneakerId =
  | "aj1"
  | "yeezy"
  | "dunk"
  | "nb"
  | "travis"
  | "asics"
  | "foam"
  | "j4";

export type TrendLabel = "bullish" | "cooling" | "blueChip" | "neutral";

export interface MarketTick {
  price: number;
  popularity: number;
}

export interface MarketSnapshot {
  id: SneakerId;
  name: string;
  icon: string;
  priceHistory: number[];
  popularityHistory: number[];
  baseVolatility: number;
  trendBias: number;
  popTrend: number;
  blueChipBase: number;
  priceVolFactor: number;
  popVol: number;
}

export interface MarketLabels {
  bullish: boolean;
  cooling: boolean;
  blueChip: boolean;
}

export interface MarketInsightRow {
  id: SneakerId;
  name: string;
  value: number;
  formatted: string;
}

export interface ExtraInsights {
  highestVolatility: MarketInsightRow[];
  blueChipRanking: MarketInsightRow[];
  momentumLeaders: MarketInsightRow[];
  coolingWatch: MarketInsightRow[];
}

export const SNEAKER_IDS: SneakerId[] = [
  "aj1",
  "yeezy",
  "dunk",
  "nb",
  "travis",
  "asics",
  "foam",
  "j4",
];

const MOCK_STATES: Record<SneakerId, Omit<MarketSnapshot, "id">> = {
  aj1: {
    name: "AJ1 Retro High OG",
    icon: "fa-shoe-prints",
    priceHistory: [380, 395, 410, 435, 460, 478, 490, 512, 535, 548, 562, 580],
    popularityHistory: [72, 78, 85, 88, 92, 89, 86, 82, 79, 81, 85, 88],
    baseVolatility: 0.025,
    trendBias: 0.002,
    popTrend: 0.001,
    blueChipBase: 94,
    priceVolFactor: 1.2,
    popVol: 2.5,
  },
  yeezy: {
    name: "Yeezy 350 V2",
    icon: "fab fa-adn",
    priceHistory: [320, 305, 295, 278, 260, 245, 240, 238, 225, 215, 210, 205],
    popularityHistory: [88, 85, 80, 74, 68, 62, 58, 55, 52, 48, 45, 42],
    baseVolatility: 0.035,
    trendBias: -0.003,
    popTrend: -0.004,
    blueChipBase: 67,
    priceVolFactor: 1.5,
    popVol: 3.0,
  },
  dunk: {
    name: "Dunk Low Panda",
    icon: "fa-basketball",
    priceHistory: [210, 225, 240, 255, 270, 285, 290, 292, 288, 275, 265, 258],
    popularityHistory: [95, 96, 98, 97, 95, 92, 88, 82, 76, 70, 68, 65],
    baseVolatility: 0.028,
    trendBias: -0.001,
    popTrend: -0.003,
    blueChipBase: 72,
    priceVolFactor: 1.3,
    popVol: 2.8,
  },
  nb: {
    name: "NB 990v3 Teddy",
    icon: "fa-running",
    priceHistory: [195, 210, 228, 245, 265, 280, 295, 310, 325, 340, 355, 370],
    popularityHistory: [55, 60, 68, 74, 80, 85, 88, 90, 91, 92, 93, 94],
    baseVolatility: 0.018,
    trendBias: 0.004,
    popTrend: 0.003,
    blueChipBase: 88,
    priceVolFactor: 0.9,
    popVol: 1.8,
  },
  travis: {
    name: "Travis Scott AJ1 Low",
    icon: "fa-crown",
    priceHistory: [950, 980, 1020, 1080, 1120, 1150, 1180, 1210, 1190, 1175, 1160, 1140],
    popularityHistory: [98, 99, 99, 98, 97, 96, 94, 92, 90, 89, 88, 87],
    baseVolatility: 0.032,
    trendBias: -0.002,
    popTrend: -0.0025,
    blueChipBase: 96,
    priceVolFactor: 1.4,
    popVol: 2.2,
  },
  asics: {
    name: "ASICS Gel-Kayano 14",
    icon: "fa-shoe-prints",
    priceHistory: [140, 155, 170, 185, 200, 215, 225, 240, 255, 270, 280, 295],
    popularityHistory: [45, 52, 60, 68, 74, 80, 84, 87, 89, 91, 92, 93],
    baseVolatility: 0.02,
    trendBias: 0.005,
    popTrend: 0.004,
    blueChipBase: 76,
    priceVolFactor: 1.0,
    popVol: 2.0,
  },
  foam: {
    name: "Yeezy Foam Runner",
    icon: "fa-cloud",
    priceHistory: [110, 115, 120, 118, 125, 130, 128, 132, 135, 133, 130, 128],
    popularityHistory: [82, 84, 86, 85, 83, 80, 78, 76, 74, 72, 70, 68],
    baseVolatility: 0.04,
    trendBias: -0.001,
    popTrend: -0.002,
    blueChipBase: 58,
    priceVolFactor: 1.6,
    popVol: 3.2,
  },
  j4: {
    name: "AJ4 Military Black",
    icon: "fa-bolt",
    priceHistory: [320, 335, 350, 365, 380, 395, 410, 425, 440, 455, 470, 485],
    popularityHistory: [75, 79, 83, 87, 90, 92, 94, 93, 91, 90, 89, 88],
    baseVolatility: 0.022,
    trendBias: 0.003,
    popTrend: -0.0005,
    blueChipBase: 85,
    priceVolFactor: 1.1,
    popVol: 2.3,
  },
};

export function getMockSnapshot(id: SneakerId): MarketSnapshot {
  const source = MOCK_STATES[id];
  return {
    id,
    ...source,
    priceHistory: [...source.priceHistory],
    popularityHistory: [...source.popularityHistory],
  };
}

export function getInitialMarketStates(ids: SneakerId[] = SNEAKER_IDS): Record<SneakerId, MarketSnapshot> {
  return ids.reduce((acc, id) => {
    acc[id] = getMockSnapshot(id);
    return acc;
  }, {} as Record<SneakerId, MarketSnapshot>);
}

export async function fetchHistoricalData(id: SneakerId): Promise<MarketSnapshot> {
  return getMockSnapshot(id);
}

export function generateMockTick(state: MarketSnapshot): MarketTick {
  const lastPrice = state.priceHistory[state.priceHistory.length - 1];
  const lastPopularity = state.popularityHistory[state.popularityHistory.length - 1];

  const volatility = state.baseVolatility * state.priceVolFactor;
  const randomChange = (Math.random() - 0.5) * 2 * volatility;

  let nextPrice = lastPrice * (1 + state.trendBias + randomChange);
  nextPrice = clamp(nextPrice, 80, 2500);

  const popNoise = (Math.random() - 0.5) * state.popVol;
  let nextPopularity = lastPopularity + state.popTrend * 2 + popNoise;
  nextPopularity = clamp(nextPopularity, 12, 100);

  return {
    price: round2(nextPrice),
    popularity: round2(nextPopularity),
  };
}

export async function fetchLatestTick(id: SneakerId, currentState: MarketSnapshot): Promise<MarketTick> {
  void id;
  return generateMockTick(currentState);
}

export function applyTick(state: MarketSnapshot, tick: MarketTick, maxPoints = 24): MarketSnapshot {
  const next: MarketSnapshot = {
    ...state,
    priceHistory: [...state.priceHistory, tick.price].slice(-maxPoints),
    popularityHistory: [...state.popularityHistory, tick.popularity].slice(-maxPoints),
  };

  return next;
}

export function tickAllMarkets(
  states: Record<SneakerId, MarketSnapshot>,
  ids: SneakerId[] = SNEAKER_IDS,
): Record<SneakerId, MarketSnapshot> {
  const nextStates = { ...states };

  for (const id of ids) {
    const current = nextStates[id];
    const tick = generateMockTick(current);
    nextStates[id] = applyTick(current, tick);
  }

  return nextStates;
}

export function computeVolatility(priceHistory: number[]): number {
  if (priceHistory.length < 2) return 0;

  const returns: number[] = [];
  for (let i = 1; i < priceHistory.length; i++) {
    const prev = priceHistory[i - 1];
    const curr = priceHistory[i];
    if (prev !== 0) {
      returns.push((curr - prev) / prev);
    }
  }

  if (!returns.length) return 0;

  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance =
    returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;

  return Math.sqrt(variance) * 100;
}

export function getDynamicLabels(
  priceHistory: number[],
  popularityHistory: number[],
  blueChipBase: number,
): MarketLabels {
  if (priceHistory.length < 5 || popularityHistory.length < 5) {
    return { bullish: false, cooling: false, blueChip: false };
  }

  const recentPrices = priceHistory.slice(-5);
  const recentPopularity = popularityHistory.slice(-5);

  const priceSlope =
    (recentPrices[recentPrices.length - 1] - recentPrices[0]) / recentPrices[0];
  const popSlope = recentPopularity[recentPopularity.length - 1] - recentPopularity[0];
  const volatility = computeVolatility(priceHistory);
  const currentPrice = priceHistory[priceHistory.length - 1];

  let bullish = priceSlope > 0.012 || (priceSlope > 0.005 && popSlope > -1.5);
  let cooling = priceSlope < -0.01 || popSlope < -2.0;
  const blueChip = blueChipBase >= 80 && volatility < 13 && currentPrice > 200;

  if (priceSlope < -0.02) bullish = false;
  if (priceSlope > 0.025) cooling = false;

  return { bullish, cooling, blueChip };
}

export function getMarketPriceRange(priceHistory: number[]): { low: number; high: number } {
  return {
    low: Math.min(...priceHistory),
    high: Math.max(...priceHistory),
  };
}

export function getCurrentBlueChipScore(state: MarketSnapshot): number {
  const vol = computeVolatility(state.priceHistory);
  const currentPrice = state.priceHistory[state.priceHistory.length - 1];

  if (vol < 9 && currentPrice > 200) {
    return Math.min(99, state.blueChipBase + 4);
  }

  if (vol > 18) {
    return Math.max(45, state.blueChipBase - 6);
  }

  return state.blueChipBase;
}

export function getExtraInsights(states: Record<SneakerId, MarketSnapshot>): ExtraInsights {
  const ids = Object.keys(states) as SneakerId[];

  const highestVolatility = ids
    .map((id) => ({
      id,
      name: states[id].name,
      value: computeVolatility(states[id].priceHistory),
      formatted: `${computeVolatility(states[id].priceHistory).toFixed(1)}%`,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  const blueChipRanking = ids
    .map((id) => ({
      id,
      name: states[id].name,
      value: getCurrentBlueChipScore(states[id]),
      formatted: `${Math.floor(getCurrentBlueChipScore(states[id]))}`,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  const momentumLeaders = ids
    .map((id) => {
      const p = states[id].priceHistory;
      const slope = p.length >= 5 ? (p[p.length - 1] - p[p.length - 5]) / p[p.length - 5] : 0;
      return {
        id,
        name: states[id].name,
        value: slope,
        formatted: `${(slope * 100).toFixed(1)}%`,
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  const coolingWatch = ids
    .map((id) => {
      const p = states[id].popularityHistory;
      const drop = p.length >= 5 ? p[p.length - 5] - p[p.length - 1] : 0;
      return {
        id,
        name: states[id].name,
        value: drop,
        formatted: `-${drop.toFixed(0)} pts`,
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  return {
    highestVolatility,
    blueChipRanking,
    momentumLeaders,
    coolingWatch,
  };
}

export function getMarketSummary(state: MarketSnapshot) {
  const latestPrice = state.priceHistory[state.priceHistory.length - 1];
  const latestPopularity = state.popularityHistory[state.popularityHistory.length - 1];
  const volatility = computeVolatility(state.priceHistory);
  const labels = getDynamicLabels(
    state.priceHistory,
    state.popularityHistory,
    state.blueChipBase,
  );
  const range = getMarketPriceRange(state.priceHistory);

  return {
    id: state.id,
    name: state.name,
    icon: state.icon,
    latestPrice,
    latestPopularity,
    volatility,
    blueChipScore: getCurrentBlueChipScore(state),
    labels,
    range,
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}