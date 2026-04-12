import Link from "next/link";

export const metadata = {
  title: "Air Force 1 | Sneaker Encyclopedia | SneakPrice",
  description:
    "The complete guide to the Nike Air Force 1 — history, colorways, design technology, and resale market value.",
};

export default function AirForce1Page() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-4xl space-y-10">

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">Sneaker Encyclopedia</p>
          <h1 className="text-4xl font-bold">Nike Air Force 1</h1>
          <p className="text-lg text-neutral-600">
            The sneaker that started it all for Nike Basketball — and became one of the best-selling shoes in history.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Brand", value: "Nike" },
            { label: "First Release", value: "1982" },
            { label: "Designer", value: "Bruce Kilgore" },
            { label: "Retail Price", value: "$90–$110" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-black/10 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-neutral-500">{stat.label}</p>
              <p className="mt-1 font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">History</h2>
          <p className="leading-relaxed text-neutral-700">
            The Nike Air Force 1 debuted in 1982 as the first basketball shoe to feature Nike Air cushioning. Designed by Bruce Kilgore, it was named after the United States presidential aircraft. Originally discontinued in 1984, it was brought back by popular demand from three Baltimore shoe stores — earning it a cult following that has never faded.
          </p>
          <p className="leading-relaxed text-neutral-700">
            {/* Add more history — early adoption on courts, transition to streetwear, NYC influence */}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Design & Technology</h2>
          <p className="leading-relaxed text-neutral-700">
            The AF1 features a full-length Nike Air unit in the midsole, a perforated toe box for breathability, and a durable rubber outsole with a pivot point. The high-top and low-top silhouettes remain largely unchanged from the original 1982 design — a testament to how well the design aged.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li>Full-length Nike Air cushioning unit</li>
            <li>Leather or synthetic leather upper</li>
            <li>Pivot circle on outsole for court movement</li>
            <li>Available in Low, Mid, and High silhouettes</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">
            {/* Add detail on construction materials, special editions tech, premium variants */}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Popular Colorways</h2>
          <p className="leading-relaxed text-neutral-700">
            The AF1 has been released in thousands of colourways since 1982. The most iconic and collectible include:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li><strong>Triple White (07)</strong> — the everyday staple, always in rotation</li>
            <li><strong>Triple Black</strong> — the dark counterpart, equally clean</li>
            <li><strong>Louis Vuitton x AF1 (2022)</strong> — most valuable modern collab, $1,000+</li>
            <li><strong>Off-White x AF1 "The Ten" (2017)</strong> — defined the deconstructed era</li>
            <li><strong>Travis Scott x Fragment x AF1 (2021)</strong> — reverse Swoosh grail</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">
            {/* Add more colourways with release years, retail prices, and current resale context */}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Resale Market Value</h2>
          <p className="leading-relaxed text-neutral-700">
            Standard AF1 colourways retail between $90–$110 and generally resell at or slightly above retail. Limited collaborations and special editions command significant premiums — the Louis Vuitton collab reached $2,000–$5,000+ at auction.
          </p>
          <p className="leading-relaxed text-neutral-700">
            {/* Add current resale data, market trend notes, which sizes command premiums */}
          </p>
          <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
            <h3 className="font-semibold text-green-700">Check Live Resale Value</h3>
            <p className="mt-1 text-sm text-neutral-700">
              Scan any Air Force 1 colourway with SneakPrice to see live eBay market data and arbitrage opportunities.
            </p>
            <Link href="/" className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline">
              Scan it with SneakPrice →
            </Link>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Care & Maintenance</h2>
          <p className="leading-relaxed text-neutral-700">
            The leather upper of the AF1 cleans well with a damp microfibre cloth and sneaker cleaner. The white midsole is prone to yellowing — treat with a sole sauce or hydrogen peroxide method to restore brightness. Creases are common on the toe box; use crease shields to prevent them.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/care/cleaning" className="text-sm font-medium text-green-600 hover:underline">Cleaning Guide →</Link>
            <Link href="/care/sole-restoration" className="text-sm font-medium text-green-600 hover:underline">Sole Restoration →</Link>
            <Link href="/care/crease-prevention" className="text-sm font-medium text-green-600 hover:underline">Crease Prevention →</Link>
          </div>
        </section>

        <div className="border-t border-black/10 pt-6">
          <Link href="/encyclopedia/a-z" className="text-sm font-medium text-neutral-500 hover:text-black">
            ← Back to Sneaker Encyclopedia A–Z
          </Link>
        </div>

      </div>
    </div>
  );
}
