export type DealCategory = "hot" | "good" | "watch";
export type DealBadge = "HOT DEAL" | "GOOD DEAL" | "WATCH";
export type DealFilter = "all" | DealCategory;

export interface ArbitrageDeal {
  id: number;
  name: string;
  buyPrice: number;
  sellPrice: number;
  netProfit: number;
  margin: number;
  badge: DealBadge;
  category: DealCategory;
  timeAgo: string;
  buyLink: string;
  sellLink: string;
  origBuy: number;
  origSell: number;
}

export interface PnLBreakdown {
  buyPrice: number;
  sellPrice: number;
  buyFee: number;
  sellFee: number;
  totalCost: number;
  revenueAfterFee: number;
  netProfit: number;
  margin: number;
}

export interface ArbitrageFeedState {
  deals: ArbitrageDeal[];
  newDealsCount: number;
  activeDealsCount: number;
  totalProfit: number;
  lastScanTime: string;
}

export function createSeedDeals(): ArbitrageDeal[] {
  const baseDeals: Omit<ArbitrageDeal, "origBuy" | "origSell">[] = [
    {
      id: 1,
      name: "Nike Air Max Plus",
      buyPrice: 63.99,
      sellPrice: 114.39,
      netProfit: 10.32,
      margin: 16.1,
      badge: "GOOD DEAL",
      timeAgo: "5 days",
      category: "good",
      buyLink: "#",
      sellLink: "#",
    },
    {
      id: 2,
      name: "Adidas Yeezy 700 Wave Runner",
      buyPrice: 120.0,
      sellPrice: 185.0,
      netProfit: 13.89,
      margin: 11.6,
      badge: "GOOD DEAL",
      timeAgo: "2h ago",
      category: "good",
      buyLink: "#",
      sellLink: "#",
    },
    {
      id: 3,
      name: "Air Jordan 4 Retro Bred",
      buyPrice: 75.99,
      sellPrice: 160.0,
      netProfit: 42.58,
      margin: 37.2,
      badge: "HOT DEAL",
      timeAgo: "5d ago",
      category: "hot",
      buyLink: "#",
      sellLink: "#",
    },
    {
      id: 4,
      name: "Air Jordan 3 White Cement",
      buyPrice: 75.0,
      sellPrice: 160.0,
      netProfit: 43.5,
      margin: 38.5,
      badge: "HOT DEAL",
      timeAgo: "2h ago",
      category: "hot",
      buyLink: "#",
      sellLink: "#",
    },
    {
      id: 5,
      name: "Air Jordan 11 Retro Bred",
      buyPrice: 119.99,
      sellPrice: 199.99,
      netProfit: 39.78,
      margin: 26.5,
      badge: "GOOD DEAL",
      timeAgo: "5d ago",
      category: "good",
      buyLink: "#",
      sellLink: "#",
    },
    {
      id: 6,
      name: "New Balance 990v6 Teddy",
      buyPrice: 89.5,
      sellPrice: 139.99,
      netProfit: 28.14,
      margin: 22.3,
      badge: "WATCH",
      timeAgo: "1h ago",
      category: "watch",
      buyLink: "#",
      sellLink: "#",
    },
    {
      id: 7,
      name: "Nike Dunk Low Panda",
      buyPrice: 55.99,
      sellPrice: 97.99,
      netProfit: 20.87,
      margin: 26.8,
      badge: "GOOD DEAL",
      timeAgo: "3h ago",
      category: "good",
      buyLink: "#",
      sellLink: "#",
    },
    {
      id: 8,
      name: "Yeezy Slide Bone",
      buyPrice: 44.99,
      sellPrice: 79.0,
      netProfit: 17.22,
      margin: 26.1,
      badge: "HOT DEAL",
      timeAgo: "just now",
      category: "hot",
      buyLink: "#",
      sellLink: "#",
    },
    {
      id: 9,
      name: "Travis Scott Air Jordan 1 Low",
      buyPrice: 299.0,
      sellPrice: 489.0,
      netProfit: 98.44,
      margin: 27.8,
      badge: "HOT DEAL",
      timeAgo: "45m ago",
      category: "hot",
      buyLink: "#",
      sellLink: "#",
    },
    {
      id: 10,
      name: "ASICS Gel-Kayano 14",
      buyPrice: 68.5,
      sellPrice: 112.99,
      netProfit: 27.95,
      margin: 29.1,
      badge: "WATCH",
      timeAgo: "15m ago",
      category: "watch",
      buyLink: "#",
      sellLink: "#",
    },
  ];

  return baseDeals.map((deal) => ({
    ...deal,
    origBuy: deal.buyPrice,
    origSell: deal.sellPrice,
  }));
}

export function recalcProfit(deal: ArbitrageDeal, feeRate = 0.13): ArbitrageDeal {
  const newBuy = round2(deal.origBuy * (1 + (Math.random() * 0.04 - 0.01)));
  const newSell = round2(deal.origSell * (1 + (Math.random() * 0.06 - 0.01)));

  const buyFee = newBuy * feeRate + 0.3;
  const sellFee = newSell * feeRate + 0.3;

  const totalCost = newBuy + buyFee;
  const revenue = newSell - sellFee;
  const netProfit = round2(revenue - totalCost);
  const margin = round1((netProfit / totalCost) * 100);

  const { badge, category } = getBadgeAndCategory(margin);

  return {
    ...deal,
    buyPrice: newBuy,
    sellPrice: newSell,
    netProfit,
    margin,
    badge,
    category,
  };
}

export function updateDeals(deals: ArbitrageDeal[]): ArbitrageDeal[] {
  return deals.map((deal) => recalcProfit(deal));
}

export function maybeAddRandomFreshDeal(
  deals: ArbitrageDeal[],
  maxDeals = 16,
  probability = 0.32,
): ArbitrageDeal[] {
  if (deals.length >= maxDeals || Math.random() >= probability) {
    return deals;
  }

  return [addRandomFreshDeal(deals), ...deals];
}

export function addRandomFreshDeal(existingDeals: ArbitrageDeal[]): ArbitrageDeal {
  const newNames = [
    "Nike Air Force 1 Low",
    "Adidas Samba OG",
    "Crocs Pollex Clog",
    "Jordan 1 High Lost & Found",
    "New Balance 2002R",
    "Yeezy 350 V2 Beluga",
    "Nike Vomero 5",
    "ASICS EX89",
  ];

  const name = randomFrom(newNames);
  const buyPrice = round2(randomBetween(45, 175));
  const sellPrice = round2(randomBetween(85, 225));

  const breakdown = calculatePnL(buyPrice, sellPrice);
  const { badge, category } = getBadgeAndCategory(breakdown.margin);

  const nextId =
    Math.max(0, ...existingDeals.map((deal) => deal.id)) + 1;

  return {
    id: nextId,
    name,
    buyPrice,
    sellPrice,
    netProfit: breakdown.netProfit,
    margin: breakdown.margin,
    badge,
    category,
    timeAgo: "just now",
    buyLink: "#",
    sellLink: "#",
    origBuy: buyPrice,
    origSell: sellPrice,
  };
}

export function maybeRemoveStaleDeal(
  deals: ArbitrageDeal[],
  minDeals = 8,
  probability = 0.1,
): ArbitrageDeal[] {
  if (deals.length <= minDeals || Math.random() >= probability) {
    return deals;
  }

  return removeStaleDeal(deals);
}

export function removeStaleDeal(deals: ArbitrageDeal[]): ArbitrageDeal[] {
  if (!deals.length) return deals;
  return deals.slice(0, -1);
}

export function filterDeals(deals: ArbitrageDeal[], filter: DealFilter): ArbitrageDeal[] {
  if (filter === "all") return deals;
  return deals.filter((deal) => deal.category === filter);
}

export function getFeedState(
  deals: ArbitrageDeal[],
  newDealsCount = 0,
  lastScanTime = new Date().toLocaleTimeString(),
): ArbitrageFeedState {
  return {
    deals,
    newDealsCount,
    activeDealsCount: deals.length,
    totalProfit: round2(getTotalProfit(deals)),
    lastScanTime,
  };
}

export function tickArbitrageFeed(
  deals: ArbitrageDeal[],
  options?: {
    addProbability?: number;
    removeProbability?: number;
    maxDeals?: number;
    minDeals?: number;
    incrementNewDealsBy?: number;
  },
): ArbitrageFeedState {
  const {
    addProbability = 0.32,
    removeProbability = 0.1,
    maxDeals = 16,
    minDeals = 8,
    incrementNewDealsBy = randomInt(1, 3),
  } = options || {};

  let nextDeals = updateDeals(deals);
  let newDealsCount = incrementNewDealsBy;

  const beforeAddLength = nextDeals.length;
  nextDeals = maybeAddRandomFreshDeal(nextDeals, maxDeals, addProbability);
  if (nextDeals.length > beforeAddLength) {
    newDealsCount += 1;
  } else {
    nextDeals = maybeRemoveStaleDeal(nextDeals, minDeals, removeProbability);
  }

  return getFeedState(nextDeals, newDealsCount, new Date().toLocaleTimeString());
}

export function calculatePnL(buyPrice: number, sellPrice: number, feeRate = 0.13): PnLBreakdown {
  const buyFee = round2(buyPrice * feeRate + 0.3);
  const sellFee = round2(sellPrice * feeRate + 0.3);
  const totalCost = round2(buyPrice + buyFee);
  const revenueAfterFee = round2(sellPrice - sellFee);
  const netProfit = round2(revenueAfterFee - totalCost);
  const margin = round1(totalCost > 0 ? (netProfit / totalCost) * 100 : 0);

  return {
    buyPrice: round2(buyPrice),
    sellPrice: round2(sellPrice),
    buyFee,
    sellFee,
    totalCost,
    revenueAfterFee,
    netProfit,
    margin,
  };
}

export function getPnLBreakdown(deal: ArbitrageDeal, feeRate = 0.13): PnLBreakdown {
  return calculatePnL(deal.buyPrice, deal.sellPrice, feeRate);
}

export function getTotalProfit(deals: ArbitrageDeal[]): number {
  return deals.reduce((sum, deal) => sum + deal.netProfit, 0);
}

export function getBadgeAndCategory(margin: number): {
  badge: DealBadge;
  category: DealCategory;
} {
  if (margin >= 28) {
    return { badge: "HOT DEAL", category: "hot" };
  }
  if (margin >= 16) {
    return { badge: "GOOD DEAL", category: "good" };
  }
  return { badge: "WATCH", category: "watch" };
}

function randomFrom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.floor(randomBetween(min, max + 1));
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}