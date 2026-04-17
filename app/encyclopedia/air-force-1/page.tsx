import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Air Force 1 | Sneaker Encyclopedia | SneakPrice",
  description:
    "The complete guide to the Nike Air Force 1 — history, colorways, design technology, resale market value, and reseller insights.",
};

const stats = [
  { label: "Brand", value: "Nike" },
  { label: "First Release", value: "1982" },
  { label: "Designer", value: "Bruce Kilgore" },
  { label: "Retail Price", value: "$90–$110" },
];

const gallery = [
  { src: "/encyclopedia/air-force-1/Nike_AF1.jpg", alt: "Nike Air Force 1" },
  { src: "/encyclopedia/air-force-1/Nike-Air-ForceOne.jpg", alt: "Nike Air Force One" },
  { src: "/encyclopedia/air-force-1/Nike_Air_Force_One.jpg", alt: "Nike Air Force One side view" },
  { src: "/encyclopedia/air-force-1/Nike-Air-Force-One.jpg", alt: "Nike Air Force One pair" },
];

const colorways = [
  {
    name: "Triple White (’07)",
    note: "The everyday staple — highly liquid, low risk, steady demand.",
    market: "Avg resale: $95–$125",
  },
  {
    name: "Triple Black",
    note: "Reliable everyday pair with broad appeal and consistent sell-through.",
    market: "Avg resale: $95–$120",
  },
  {
    name: "Off-White x AF1 “The Ten” (2017)",
    note: "A defining deconstructed-era grail with strong collector demand.",
    market: "Avg resale: Premium / collectible",
  },
  {
    name: "Louis Vuitton x AF1 (2022)",
    note: "Ultra-premium collaboration with auction-level pricing.",
    market: "Avg resale: $2,000+",
  },
  {
    name: "Travis Scott x Fragment x AF1",
    note: "High-interest collab with strong hype-driven value.",
    market: "Avg resale: Premium / volatile",
  },
];

const relatedModels = [
  { name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" },
  { name: "Nike Dunk Low", href: "/encyclopedia/dunk-low" },
  { name: "Air Max 90", href: "/encyclopedia/air-max-90" },
  { name: "Asics Gel-Kayano", href: "/encyclopedia/asics-gel-kayano" },
];

export default function AirForce1Page() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
              Sneaker Encyclopedia
            </p>
            <h1 className="text-4xl font-bold sm:text-5xl">Nike Air Force 1</h1>
            <p className="max-w-4xl text-lg text-neutral-600">
              The sneaker that started it all for Nike Basketball — and became one
              of the best-selling shoes in history.
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
                Air Force 1 Market Overview
              </h2>
            </div>
            <div className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-semibold text-white">
              Stable Market
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Avg Resale", value: "$115" },
              { label: "Trend", value: "Stable" },
              { label: "Volatility", value: "Low" },
              { label: "Liquidity", value: "High" },
              { label: "Flip Score", value: "62 / 100" },
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
            Core Air Force 1 colourways usually trade near retail with strong
            liquidity, while limited collaborations and collector pairs can command
            major premiums.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-600">
            Images of Nike Air Force 1
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
            The Nike Air Force 1 debuted in 1982 as the first basketball shoe to
            feature Nike Air cushioning. Designed by Bruce Kilgore, it was named
            after the United States presidential aircraft. Originally discontinued
            in 1984, it was brought back by popular demand from three Baltimore shoe
            stores — earning it a cult following that has never faded.
          </p>
          <p className="leading-relaxed text-neutral-700">
            Over time, the AF1 moved far beyond the court and became a streetwear
            icon, especially in New York and other major cities where crisp white
            pairs became part of everyday style. Its cultural longevity is one of
            the strongest in sneaker history.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-green-600">
            Design &amp; Technology
          </h2>
          <p className="leading-relaxed text-neutral-700">
            The AF1 features a full-length Nike Air unit in the midsole, a
            perforated toe box for breathability, and a durable rubber outsole with
            a pivot point. The high-top and low-top silhouettes remain largely
            unchanged from the original 1982 design — a testament to how well the
            design aged.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li>Full-length Nike Air cushioning unit</li>
            <li>Leather or synthetic leather upper</li>
            <li>Pivot circle on outsole for court movement</li>
            <li>Available in Low, Mid, and High silhouettes</li>
          </ul>
        </section>

        <section className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-green-600">
              Popular Colorways
            </h2>
            <p className="leading-relaxed text-neutral-700">
              The AF1 has been released in thousands of colourways since 1982. Here
              are some of the most iconic and collectible pairs, along with their
              general market context.
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
            Standard AF1 colourways retail between $90–$110 and generally resell at
            or slightly above retail. Limited collaborations and special editions
            command significant premiums — the Louis Vuitton collab reached
            $2,000–$5,000+ at auction.
          </p>
          <p className="leading-relaxed text-neutral-700">
            From a reseller perspective, the Air Force 1 is usually a
            <strong> liquidity-driven model </strong>
            rather than a high-margin flip. Basic pairs move consistently, while
            collabs and rare executions create the real upside.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-5">
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Best For
              </p>
              <p className="mt-2 font-semibold">Steady sell-through</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-5">
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Risk Level
              </p>
              <p className="mt-2 font-semibold">Low to moderate</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-5">
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Reseller Take
              </p>
              <p className="mt-2 font-semibold">More dependable than explosive</p>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-100 p-8 shadow-lg">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600">
              Live Market Tool
            </p>
            <h3 className="mt-2 text-3xl font-extrabold leading-tight text-green-800 sm:text-4xl">
              Scan Any Air Force 1 Colorway Live
            </h3>
            <p className="mt-3 max-w-3xl text-lg text-neutral-700">
              View real-time resale value, compare demand, and surface potential
              arbitrage opportunities for Air Force 1 pairs across the market.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                "View live resale signals",
                "Track profitable flips",
                "Compare market demand instantly",
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
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-green-700 active:scale-95"
              >
                Scan it with SneakPrice →
              </Link>
              <Link
                href="/exchange"
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
            Flip Potential: Air Force 1
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {[
              { label: "Flip Score", value: "68 / 100" },
              { label: "Liquidity", value: "High" },
              { label: "Typical Margin", value: "Low–Moderate" },
              { label: "Best Use", value: "Fast-moving staple" },
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
            <li>Strong everyday demand keeps sell-through healthy.</li>
            <li>Standard pairs are more about consistency than large margins.</li>
            <li>Collaborations and rare editions create the real premium upside.</li>
            <li>Useful model for teaching market behavior, liquidity, and spread discipline.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-green-600">
              Care &amp; Maintenance
            </h2>
            <h3 className="text-3xl font-bold text-black">
              Cleaning Your Air Force One Sneakers: Incredible Tips
            </h3>
          </div>

          <p className="leading-relaxed text-neutral-700">
            Your Air Force One Sneakers are among the finest footwear options
            available. They transcend mere function; they represent a cultural
            symbol of respect, comfort, distinctive flair, and, most importantly, a
            significant long-term investment.
          </p>
          <p className="leading-relaxed text-neutral-700">
            These exceptional sneakers, celebrated for their comfort, durability,
            and unique aesthetics, necessitate careful maintenance to keep them in
            top-notch condition. Accumulated dirt, stains, and regular usage can
            undermine their look and shorten their lifespan. However, employing the
            right cleaning methods and consistent upkeep can help you preserve your
            premium sneakers in pristine shape.
          </p>
          <p className="leading-relaxed text-neutral-700">
            Here are some fantastic ideas to assist you in caring for your Air
            Force One Sneakers.
          </p>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-black">Tools and Materials</h4>
            <p className="text-neutral-700">
              To start, collect the following tools and materials:
            </p>
            <ul className="space-y-3 text-neutral-700">
              {[
                {
                  label: "Soft-bristled Brush",
                  desc: "Vital for gently removing grime without harming the sneaker's exterior.",
                },
                {
                  label: "Microfiber Cloth",
                  desc: "Perfect for eliminating dirt and moisture due to its excellent absorbency and soft texture.",
                },
                {
                  label: "Mild Detergent or Specialized Sneaker Cleaning Solution",
                  desc: "Formulated to clean effectively without damaging the materials of your sneakers.",
                },
                {
                  label: "Warm Water",
                  desc: "Assists in loosening dirt and stains.",
                },
                {
                  label: "Sneaker Protective Spray",
                  desc: "An essential item for shielding against future stains and water damage.",
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
            <h4 className="text-lg font-semibold text-black">Pre-Cleaning Steps</h4>
            <p className="text-neutral-700">
              Prior to embarking on the cleaning process, it&apos;s essential to
              prepare your sneakers:
            </p>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  label: "Remove Laces",
                  desc: "Take out the laces and soak them in a mixture of warm water and mild detergent, allowing for a thorough cleaning of both the laces and the sneaker's tongue.",
                },
                {
                  step: "2",
                  label: "Initial Wipe Down",
                  desc: "Utilize a damp microfiber cloth to gently clear off excess dirt and dust from the surface. This step prevents scratching the sneaker during the cleaning process.",
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
            <h4 className="text-lg font-semibold text-black">Cleaning Procedure</h4>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  label: "Prepare Cleaning Solution",
                  desc: "Combine warm water with a small amount of liquid detergent or utilize a specialized sneaker cleaning formula. The water temperature should be warm but not hot, as high temperatures can damage certain sneaker materials.",
                },
                {
                  step: "2",
                  label: "Gentle Scrubbing",
                  desc: "Dip the soft-bristled brush into the cleaning solution and delicately scrub the outer surfaces of the sneakers. Focus especially on areas that are particularly soiled.",
                },
                {
                  step: "3",
                  label: "Wiping Off Suds and Dirt",
                  desc: "After scrubbing, use a clean microfiber cloth to wipe away the suds and lift dirt.",
                },
                {
                  step: "4",
                  label: "Addressing Stubborn Stains",
                  desc: "For persistent stains, apply a small quantity of cleaning solution directly onto the stain and gently scrub until the stain is lifted.",
                },
                {
                  step: "5",
                  label: "Rinsing Process",
                  desc: "Rinse the microfiber cloth in clean water and wipe the sneakers again to eliminate remaining detergent or dirt.",
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