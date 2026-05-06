import { auth } from "@clerk/nextjs/server";
import SneakerExchange from "@/components/exchange/SneakerExchange";
import { getCurrentTier } from "@/lib/subscription";

export const metadata = {
  title: "Sneaker Exchange | SneakPrice",
  description:
    "Live sneaker market dashboard — price charts, popularity trends, volatility scores, and blue chip rankings across top sneaker models.",
};

export const dynamic = "force-dynamic";

export default async function SneakerExchangePage() {
  const [{ userId }, tier] = await Promise.all([auth(), getCurrentTier()]);
  return <SneakerExchange tier={tier} isSignedIn={Boolean(userId)} />;
}
