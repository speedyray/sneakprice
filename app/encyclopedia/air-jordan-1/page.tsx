import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Air Jordan 1 | Sneaker Encyclopedia | SneakPrice",
  description:
    "The complete guide to the Air Jordan 1 — history, design, iconic colorways, resale market value, and reseller insights.",
};

const stats = [
  { label: "Brand", value: "Nike / Jordan Brand" },
  { label: "First Release", value: "1985" },
  { label: "Designer", value: "Peter Moore" },
  { label: "Retail Price", value: "$100–$180" },
];

const gallery = [
  { src: "/encyclopedia/air-jordan-1/AIRJORDAN-1.jpeg", alt: "Air Jordan 1" },
  { src: "/encyclopedia/air-jordan-1/AirJordanOne.jpeg", alt: "Air Jordan One" },
  { src: "/encyclopedia/air-jordan-1/AIR_JORDAN_ONE.jpg", alt: "Air Jordan One side view" },
  { src: "/encyclopedia/air-jordan-1/AIR-JORDAN-ONE.jpeg", alt: "Air Jordan One pair" },
];

const colorways = [
  {
    name: "Chicago",
    note: "The defining AJ1 colorway and one of the most important sneakers ever made.",
    market: "Avg resale: premium / highly collectible",
  },
  {
    name: "Bred",
    note: "The most mythologized AJ1 colorway, tied directly to the banned-era narrative.",
    market: "Avg resale: premium / high demand",
  },
  {
    name: "Royal",
    note: "A clean black-and-blue classic that remains one of the strongest non-Chicago AJ1s.",
    market: "Avg resale: strong collector value",
  },
  {
    name: "Travis Scott x AJ1 High OG",
    note: "A modern reverse-Swoosh grail with very high market attention.",
    market: "Avg resale: $1,000+",
  },
  {
    name: "Dior x AJ1 High",
    note: "One of the most exclusive and expensive AJ1 collaborations ever released.",
    market: "Avg resale: ultra premium",
  },
  {
    name: "Mocha / University Blue / Lost & Found",
    note: "Popular modern retros with strong resale performance and broad appeal.",
    market: "Avg resale: moderate to strong premium",
  },
];

const relatedModels = [
  { name: "Air Force 1", href: "/encyclopedia/air-force-1" },
  { name: "Air Jordan 4", href: "/encyclopedia/air-jordan-4" },
  { name: "Nike Dunk Low", href: "/encyclopedia/dunk-low" },
  { name: "Air Max 90", href: "/encyclopedia/air-max-90" },
];

export default function AirJordan1Page() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
              Sneaker Encyclopedia
            </p>
            <h1 className="text-4xl font-bold sm:text-5xl">Air Jordan 1</h1>
            <p className="max-w-4xl text-lg text-neutral-600">
              The shoe that changed basketball, streetwear, and sneaker culture forever —
              and became one of the most important silhouettes in sneaker history.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-black/10 p-5 text-center"
              >
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-green-600">
                Live Market Snapshot
              </p>
              <h2 className="mt-2 text-2xl font-bold text-green-900">
                Air Jordan 1 Market Overview
              </h2>
            </div>
            <div className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-semibold text-white">
              Strong Demand
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Avg Resale", value: "$240" },
              { label: "Trend", value: "Bullish / Active" },
              { label: "Volatility", value: "Medium" },
              { label: "Liquidity", value: "High" },
              { label: "Flip Score", value: "84 / 100" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-green-200 bg-white/80 p-4"
              >
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                  {item.label}
                </p>
                <p className="mt-2 text-xl font-bold text-neutral-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-neutral-700">
            The Air Jordan 1 remains one of the most liquid and most traded sneakers on
            the secondary market. General release retros often command a premium, while
            collaborations and OG colorways can become grail-tier assets.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-600">
            Images of Air Jordan 1
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.map((img) => (
              <div
                key={img.src}
                className="relative aspect-square overflow-hidden rounded-2xl border border-black/10 bg-neutral-100"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-green-600">History</h2>
          <p className="leading-relaxed text-neutral-700">
            The Air Jordan 1 launched in 1985, designed by Peter Moore for a
            21-year-old Michael Jordan. Nike embraced the controversy surrounding the
            league's uniform rules and turned it into one of the greatest storytelling
            moments in sports marketing history.
          </p>
          <p className="leading-relaxed text-neutral-700">
            Over time, the AJ1 moved from performance basketball into streetwear,
            collecting, and high-fashion relevance. It became the foundation of Jordan
            Brand’s legacy and remains the most iconic entry point into the broader Air
            Jordan universe.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-green-600">
            Design &amp; Technology
          </h2>
          <p className="leading-relaxed text-neutral-700">
            The AJ1 features a leather upper, padded ankle collar, and Nike Air
            cushioning in the heel. Its Swoosh placement, Wings logo, panel blocking,
            and classic cupsole construction make it one of the most recognizable
            sneaker designs ever created.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li>High-top leather or tumbled leather upper</li>
            <li>Nike Air cushioning in the heel</li>
            <li>Wings logo on the ankle collar</li>
            <li>Available in High, Mid, and Low silhouettes</li>
            <li>Classic cupsole construction with durable rubber outsole</li>
          </ul>
        </section>

        <section className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-green-600">
              Popular Colorways
            </h2>
            <p className="leading-relaxed text-neutral-700">
              Few sneakers have produced as many culturally important colorways as the
              Air Jordan 1. These are some of the most important pairs and their market
              significance.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {colorways.map((colorway) => (
              <div
                key={colorway.name}
                className="rounded-2xl border border-black/10 bg-neutral-50 p-5"
              >
                <h3 className="text-lg font-semibold text-black">{colorway.name}</h3>
                <p className="mt-2 text-neutral-700">{colorway.note}</p>
                <p className="mt-3 text-sm font-medium text-green-700">
                  {colorway.market}
                </p>
                <Link
                  href="/exchange"
                  className="mt-4 inline-flex text-sm font-semibold text-green-600 hover:text-green-700"
                >
                  View market →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-600">
            Resale Market Value
          </h2>
          <p className="leading-relaxed text-neutral-700">
            The AJ1 is one of the most traded sneakers on the secondary market. General
            release retros often resell above retail, while OG pairs and collaborations
            can command significant premiums. Sizes 9–11 (US) typically offer the
            strongest liquidity.
          </p>
          <p className="leading-relaxed text-neutral-700">
            From a reseller perspective, the AJ1 combines high visibility, strong
            cultural relevance, and deep secondary-market demand. It is one of the most
            important silhouettes for understanding hype, liquidity, and long-term
            collector value.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-5">
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Best For
              </p>
              <p className="mt-2 font-semibold">High-demand flips &amp; collector hold</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-5">
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Risk Level
              </p>
              <p className="mt-2 font-semibold">Moderate</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-5">
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Reseller Take
              </p>
              <p className="mt-2 font-semibold">Iconic model with durable market depth</p>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-100 p-8 shadow-lg">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600">
              Live Market Tool
            </p>
            <h3 className="mt-2 text-3xl font-extrabold leading-tight text-green-800 sm:text-4xl">
              Scan Any Air Jordan 1 Colorway Live
            </h3>
            <p className="mt-3 max-w-3xl text-lg text-neutral-700">
              View real-time resale value, compare demand, and surface potential
              arbitrage opportunities for Air Jordan 1 pairs across the market.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                "View live resale signals",
                "Track profitable flips",
                "Compare demand and momentum instantly",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-green-200 bg-white/70 px-4 py-3 text-sm font-medium text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/exchange"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-green-700 active:scale-95"
              >
                Scan it with SneakPrice →
              </Link>
              <Link
                href="/discover"
                className="inline-flex items-center gap-2 rounded-xl border border-green-600 px-6 py-3 text-base font-bold text-green-700 transition hover:bg-green-50"
              >
                Open market tools
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-green-600">
            Reseller Insight
          </p>
          <h2 className="mt-2 text-2xl font-bold text-black">
            Flip Potential: Air Jordan 1
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {[
              { label: "Flip Score", value: "86 / 100" },
              { label: "Liquidity", value: "High" },
              { label: "Typical Margin", value: "Moderate–High" },
              { label: "Best Use", value: "Premium flips & collector demand" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-emerald-200 bg-white p-4"
              >
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-bold text-neutral-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <ul className="mt-5 list-disc space-y-2 pl-5 text-neutral-700">
            <li>One of the deepest and most recognizable resale markets in sneakers.</li>
            <li>Strong demand across OG colorways, retros, and major collaborations.</li>
            <li>High cultural relevance keeps the AJ1 important even during cooling cycles.</li>
            <li>Excellent model for studying liquidity, collector premium, and hype durability.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-green-600">
              Care &amp; Maintenance
            </h2>
            <h3 className="text-3xl font-bold text-black">
              Maintaining Your Air Jordan 1 Sneakers
            </h3>
          </div>

          <p className="leading-relaxed text-neutral-700">
            Air Jordan 1s are not just sneakers — they are cultural artifacts,
            collector pieces, and in many cases long-term assets. Proper care helps
            preserve both appearance and value.
          </p>
          <p className="leading-relaxed text-neutral-700">
            Leather quality, panel construction, and special-edition materials mean
            that AJ1s benefit from gentle cleaning, proper storage, and preventative
            protection against stains and moisture.
          </p>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-black">
              Essential Tools and Supplies
            </h4>
            <p className="text-neutral-700">
              To start off, collect the following tools and supplies:
            </p>
            <ul className="space-y-3 text-neutral-700">
              {[
                {
                  label: "Soft-bristle Brush",
                  desc: "Useful for removing dust and dirt without damaging leather or delicate materials.",
                },
                {
                  label: "Microfiber Cloth",
                  desc: "Ideal for wiping away moisture and surface dirt gently.",
                },
                {
                  label: "Sneaker Cleaning Solution",
                  desc: "Helps clean effectively while protecting premium materials.",
                },
                {
                  label: "Warm Water",
                  desc: "Useful for loosening dirt without introducing harsh conditions.",
                },
                {
                  label: "Protective Spray",
                  desc: "Helps defend against future stains and light moisture exposure.",
                },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex gap-3 rounded-xl border border-black/8 bg-neutral-50 px-4 py-3"
                >
                  <span className="mt-0.5 text-green-500">✓</span>
                  <span>
                    <strong>{item.label}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-black">
              Pre-Cleaning Preparations
            </h4>
            <p className="text-neutral-700">
              Before you begin the cleaning routine, it&apos;s essential to ready your
              sneakers:
            </p>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  label: "Remove Laces",
                  desc: "Take the laces out and clean them separately so you can fully access the tongue and eyelets.",
                },
                {
                  step: "2",
                  label: "Initial Wipe Down",
                  desc: "Use a damp microfiber cloth to remove loose dirt before brushing the upper.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 rounded-xl border border-black/8 bg-neutral-50 px-4 py-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold text-black">{item.label}</p>
                    <p className="mt-0.5 text-neutral-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-black">
              The Cleaning Process
            </h4>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  label: "Prepare the Cleaning Solution",
                  desc: "Mix warm water with a small amount of sneaker-safe cleaning solution.",
                },
                {
                  step: "2",
                  label: "Gentle Scrubbing",
                  desc: "Use light circular motions with a soft brush, especially around panels, Swoosh edges, and toe box perforations.",
                },
                {
                  step: "3",
                  label: "Remove Suds and Dirt",
                  desc: "Wipe the shoe with a clean microfiber cloth to lift residue and check progress.",
                },
                {
                  step: "4",
                  label: "Treat Stains Carefully",
                  desc: "Use minimal moisture and extra caution on suede, nubuck, or premium collaboration materials.",
                },
                {
                  step: "5",
                  label: "Dry and Store Properly",
                  desc: "Let the pair air dry naturally and store away from direct heat and sunlight.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 rounded-xl border border-black/8 bg-neutral-50 px-4 py-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold text-black">{item.label}</p>
                    <p className="mt-0.5 text-neutral-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-600">Related Models</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {relatedModels.map((model) => (
              <Link
                key={model.name}
                href={model.href}
                className="rounded-2xl border border-black/10 bg-neutral-50 px-5 py-4 font-medium transition hover:border-green-500 hover:bg-green-50"
              >
                {model.name}
              </Link>
            ))}
          </div>
        </section>

        <div className="border-t border-black/10 pt-6">
          <Link
            href="/encyclopedia/a-z"
            className="text-sm font-medium text-neutral-500 hover:text-black"
          >
            ← Back to Sneaker Encyclopedia A–Z
          </Link>
        </div>
      </div>
    </div>
  );
}