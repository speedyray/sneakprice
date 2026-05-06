import Link from "next/link";

export const metadata = {
  title: "Pricing | SneakPrice",
  description:
    "SneakPrice subscription tiers — Free, Pro, Premium, and Power Seller. Choose the plan that matches how you trade sneakers.",
};

const UPGRADE_EMAIL = "speedyray2ray@gmail.com";

function upgradeHref(tier: "PRO" | "PREMIUM" | "POWER_SELLER"): string {
  const subject = encodeURIComponent(`SneakPrice ${tier} Upgrade Request`);
  const body = encodeURIComponent(
    `Tier: ${tier}\n\n(Tell me your Clerk email so I can flip your account.)`,
  );
  return `mailto:${UPGRADE_EMAIL}?subject=${subject}&body=${body}`;
}

type Tier = {
  id: string;
  name: string;
  price: string;
  blurb: string;
  features: readonly string[];
  cta: { label: string; href: string };
  highlight?: boolean;
};

const TIERS: readonly Tier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    blurb: "Email signup. Try the live exchange.",
    features: [
      "3 scans / day",
      "Basic identification",
      "Basic price display",
      "Index cards (live)",
      "Top 3 arbitrage deals",
    ],
    cta: { label: "Sign up free", href: "/sign-in" },
  },
  {
    id: "pro",
    name: "Pro",
    price: "$5–$10/mo",
    blurb: "For active flippers who want the full live feed.",
    features: [
      "Unlimited scans",
      "Full arbitrage deal feed",
      "Price history charts",
      "Trend indicators",
      "Over/undervalued signals",
      "Unlimited alert rules",
    ],
    cta: { label: "Request upgrade", href: upgradeHref("PRO") },
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$15–$25/mo",
    blurb: "For serious resellers — predictions and early signals.",
    features: [
      "Everything in Pro",
      "Resale predictions",
      "Flip alerts",
      "Early trend detection",
      "Priority support",
    ],
    cta: { label: "Request upgrade", href: upgradeHref("PREMIUM") },
  },
  {
    id: "power-seller",
    name: "Power Seller",
    price: "$30–$50/mo",
    blurb: "For marketplace operators with inventory at scale.",
    features: [
      "Everything in Premium",
      "Bulk scanning",
      "Inventory tracking",
      "Profit analytics",
      "API access (coming soon)",
    ],
    cta: { label: "Request upgrade", href: upgradeHref("POWER_SELLER") },
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Pricing
        </h1>
        <p className="mt-3 text-gray-600">
          Pricing is range-based while we calibrate. Lock in early-bird pricing today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier) => (
          <section
            key={tier.id}
            id={tier.id}
            className={`scroll-mt-24 rounded-2xl border p-6 ${
              tier.highlight
                ? "border-black ring-2 ring-black"
                : "border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold">{tier.name}</h2>
            <p className="mt-1 text-2xl font-bold">{tier.price}</p>
            <p className="mt-2 text-sm text-gray-600">{tier.blurb}</p>

            <ul className="mt-5 space-y-2 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span aria-hidden>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={tier.cta.href}
              className={`mt-6 block rounded-lg px-4 py-2 text-center text-sm font-medium ${
                tier.highlight
                  ? "bg-black text-white"
                  : "border border-gray-300 text-gray-900"
              }`}
            >
              {tier.cta.label}
            </Link>
          </section>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        Stripe checkout coming soon. For now, requests are handled by email
        within 24 hours.
      </p>
    </main>
  );
}
