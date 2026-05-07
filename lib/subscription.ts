import "server-only";
import { getCurrentDbUser } from "@/lib/current-user";

export type SubscriptionTier = "FREE" | "PRO" | "PREMIUM" | "POWER_SELLER";

export const PAID_TIERS: SubscriptionTier[] = ["PRO", "PREMIUM", "POWER_SELLER"];

export function isPaid(tier: SubscriptionTier | null | undefined): boolean {
  return tier ? PAID_TIERS.includes(tier) : false;
}

export function normalizeTier(value: unknown): SubscriptionTier | null {
  if (typeof value !== "string") return null;
  const upper = value.trim().toUpperCase();
  if (upper === "FREE") return "FREE";
  if ((PAID_TIERS as string[]).includes(upper)) {
    return upper as SubscriptionTier;
  }
  return null;
}

export async function getCurrentTier(): Promise<SubscriptionTier> {
  const user = await getCurrentDbUser();
  return user?.subscriptionTier ?? "FREE";
}
