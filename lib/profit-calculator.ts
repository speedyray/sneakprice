// lib/profit-calculator.ts
// Calculates full net profit for a buy-low / sell-high arbitrage pair.
// Pure function — no side effects.

export interface PnLInput {
  buyPrice: number;
  buyPlatform: "ebay" | "nike" | "footlocker" | "adidas";
  sellPrice: number;
  sellPlatform: "stockx" | "goat" | "ebay" | "klekt";
}

export interface PnLResult {
  grossProfit: number;
  platformSellFee: number;
  paymentFee: number;
  shippingBuy: number;
  shippingSell: number;
  authFee: number;
  netProfit: number;
  profitMargin: number; // percentage
  isViable: boolean;   // netProfit >= 10 AND profitMargin >= 5
}

const SELL_FEE_RATES: Record<string, number> = {
  stockx: 0.095,
  goat: 0.15,   // conservative default (9.5% verified, 25% new seller)
  ebay: 0.1325,
  klekt: 0.10,
};

const AUTH_FEES: Record<string, number> = {
  stockx: 5,
  goat: 5,
  ebay: 0,
  klekt: 5,
};

const SHIPPING_BUY = 8;   // estimated buy-side shipping
const SHIPPING_SELL = 15; // estimated sell-side shipping
const PAYMENT_FEE_RATE = 0.03;

export function calculatePnL(input: PnLInput): PnLResult {
  const { buyPrice, sellPrice, sellPlatform } = input;

  const grossProfit = sellPrice - buyPrice;
  const platformSellFee = sellPrice * (SELL_FEE_RATES[sellPlatform] ?? 0.13);
  const paymentFee = buyPrice * PAYMENT_FEE_RATE;
  const authFee = AUTH_FEES[sellPlatform] ?? 0;

  const netProfit =
    grossProfit -
    platformSellFee -
    paymentFee -
    SHIPPING_BUY -
    SHIPPING_SELL -
    authFee;

  const profitMargin = buyPrice > 0 ? (netProfit / buyPrice) * 100 : 0;

  return {
    grossProfit: round(grossProfit),
    platformSellFee: round(platformSellFee),
    paymentFee: round(paymentFee),
    shippingBuy: SHIPPING_BUY,
    shippingSell: SHIPPING_SELL,
    authFee,
    netProfit: round(netProfit),
    profitMargin: round(profitMargin),
    isViable: netProfit >= 10 && profitMargin >= 5,
  };
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
