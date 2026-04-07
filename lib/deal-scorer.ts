// lib/deal-scorer.ts
// Scores a deal 0-100 using a tiered cost strategy:
//   1. Math score for clear deals (< 45 or > 65) — free
//   2. HuggingFace Mistral for ambiguous deals (45–65) — free tier
//   3. OpenAI gpt-4o-mini if HF unavailable or confidence < 0.8 — ~$0.001/call

import { HfInference } from "@huggingface/inference";
import OpenAI from "openai";
import type { PnLResult } from "./profit-calculator";

export interface DealScoreInput {
  modelName: string;
  pnl: PnLResult;
  buyPrice: number;         // buy-side price (passed separately for LLM summary)
  sellPrice: number;        // sell-side price (passed separately for LLM summary)
  demandTrend?: number;     // % price change last 30d (positive = trending up)
  sellThroughRate?: number; // 0-1, how fast this model sells
  buyListingAge?: number;   // hours since eBay listing posted
}

export interface DealScoreResult {
  score: number;            // 0-100
  label: "hot" | "good" | "watch" | "skip";
  scoredBy: "math" | "huggingface" | "openai";
}

export function computeMathScore(input: DealScoreInput): number {
  const { pnl, demandTrend = 0, sellThroughRate = 0.5, buyListingAge = 24 } = input;

  let score = 0;

  // Profit margin (35 pts max)
  if (pnl.profitMargin >= 50) score += 35;
  else if (pnl.profitMargin >= 35) score += 28;
  else if (pnl.profitMargin >= 20) score += 20;
  else if (pnl.profitMargin >= 10) score += 12;
  else if (pnl.profitMargin >= 5) score += 6;

  // Sell-through rate (25 pts max)
  if (sellThroughRate >= 0.8) score += 25;
  else if (sellThroughRate >= 0.6) score += 18;
  else if (sellThroughRate >= 0.4) score += 12;
  else if (sellThroughRate >= 0.2) score += 6;

  // Demand trend (25 pts max)
  if (demandTrend >= 15) score += 25;
  else if (demandTrend >= 8) score += 18;
  else if (demandTrend >= 3) score += 12;
  else if (demandTrend >= 0) score += 8;
  else score += 3; // trending down, still some points

  // Time sensitivity (15 pts max) — older listing = more urgent/better deal
  if (buyListingAge >= 48) score += 15;
  else if (buyListingAge >= 24) score += 10;
  else if (buyListingAge >= 12) score += 7;
  else score += 4;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function scoreToLabel(score: number): DealScoreResult["label"] {
  if (score >= 80) return "hot";
  if (score >= 60) return "good";
  if (score >= 40) return "watch";
  return "skip";
}

async function scoreWithHuggingFace(
  input: DealScoreInput,
  mathScore: number
): Promise<number | null> {
  try {
    const hf = new HfInference(process.env.HF_TOKEN ?? undefined);
    const summary = `Sneaker: ${input.modelName}. Net profit: $${input.pnl.netProfit.toFixed(2)}. Profit margin: ${input.pnl.profitMargin.toFixed(1)}%. Buy price: $${input.buyPrice}. Sell price: $${input.sellPrice}. Demand trend: ${input.demandTrend ?? 0}% last 30 days.`;

    const prompt = `[INST] You are a sneaker arbitrage analyst. Rate this deal from 0 to 100 based on profit potential and risk. Return ONLY valid JSON: {"score": <number 0-100>, "confidence": <number 0-1>}

Deal: ${summary} [/INST]`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const result = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: prompt,
      parameters: { max_new_tokens: 60, temperature: 0.1 },
    });

    clearTimeout(timeout);

    const text = result.generated_text ?? "";
    const jsonMatch = text.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    const score = Number(parsed?.score);
    const confidence = Number(parsed?.confidence);

    if (isNaN(score) || score < 0 || score > 100) return null;
    if (isNaN(confidence) || confidence < 0.8) return null;

    return Math.round(score);
  } catch {
    return null;
  }
}

async function scoreWithOpenAI(input: DealScoreInput): Promise<number> {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

    const summary = `Sneaker: ${input.modelName}. Net profit: $${input.pnl.netProfit.toFixed(2)}. Margin: ${input.pnl.profitMargin.toFixed(1)}%. Buy: $${input.buyPrice}. Sell: $${input.sellPrice}. Demand trend: ${input.demandTrend ?? 0}%.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a sneaker arbitrage analyst. Rate deals 0-100. Return ONLY valid JSON: {\"score\": <number>}",
        },
        { role: "user", content: `Rate this deal: ${summary}` },
      ],
      max_tokens: 30,
    });

    const text = response.choices[0]?.message?.content ?? "";
    const parsed = JSON.parse(text);
    const score = Number(parsed?.score);
    return isNaN(score) ? 50 : Math.max(0, Math.min(100, Math.round(score)));
  } catch {
    return 50; // neutral fallback
  }
}

export async function scoreDeal(
  input: DealScoreInput
): Promise<DealScoreResult> {
  const mathScore = computeMathScore(input);

  // Clear cases: use math score, no LLM needed
  if (mathScore < 45 || mathScore > 65) {
    return {
      score: mathScore,
      label: scoreToLabel(mathScore),
      scoredBy: "math",
    };
  }

  // Ambiguous (45–65): try HuggingFace first
  const hfScore = await scoreWithHuggingFace(input, mathScore);

  if (hfScore !== null) {
    return {
      score: hfScore,
      label: scoreToLabel(hfScore),
      scoredBy: "huggingface",
    };
  }

  // HF failed or low confidence: use OpenAI
  const openaiScore = await scoreWithOpenAI(input);
  return {
    score: openaiScore,
    label: scoreToLabel(openaiScore),
    scoredBy: "openai",
  };
}
