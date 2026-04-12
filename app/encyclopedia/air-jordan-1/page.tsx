import Link from "next/link";

export const metadata = {
  title: "Air Jordan 1 | Sneaker Encyclopedia | SneakPrice",
  description:
    "The complete guide to the Nike Air Jordan 1 — history, colorways, design, and resale market value.",
};

export default function AirJordan1Page() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-4xl space-y-10">

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">Sneaker Encyclopedia</p>
          <h1 className="text-4xl font-bold">Air Jordan 1</h1>
          <p className="text-lg text-neutral-600">
            The shoe that changed basketball, streetwear, and sneaker culture forever — and got Michael Jordan fined $5,000 a game.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Brand", value: "Nike / Jordan Brand" },
            { label: "First Release", value: "1985" },
            { label: "Designer", value: "Peter Moore" },
            { label: "Retail Price", value: "$100–$180" },
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
            The Air Jordan 1 launched in 1985, designed by Peter Moore for a 21-year-old Michael Jordan. Nike paid the NBA's $5,000-per-game fine so Jordan could wear the "Bred" colourway — creating one of the greatest marketing moments in sports history. The shoe gave birth to Jordan Brand, now one of the most valuable subsidiaries in Nike's portfolio.
          </p>
          <p className="leading-relaxed text-neutral-700">
            {/* Add: transition from basketball to streetwear, Spike Lee's role, late-80s/90s resurgence */}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Design & Technology</h2>
          <p className="leading-relaxed text-neutral-700">
            The AJ1 features a high-top leather construction with a padded collar and Nike Air cushioning. Its distinctive Swoosh placement, Wings logo on the ankle, and the original "Nike Air" branding (replaced by the Jumpman in later retros) make it instantly recognisable.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li>High-top leather or tumbled leather upper</li>
            <li>Nike Air unit in the heel</li>
            <li>Wings logo on the ankle collar</li>
            <li>Available in High, Mid, and Low silhouettes</li>
            <li>Vulcanised rubber cupsole</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">
            {/* Add: OG vs Retro construction differences, premium materials in select colourways */}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Popular Colorways</h2>
          <p className="leading-relaxed text-neutral-700">
            The AJ1 has produced more grail-worthy colourways than any other sneaker. Key releases include:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li><strong>Chicago (1985 / 2015 Retro)</strong> — the original banned shoe, all-time grail</li>
            <li><strong>Bred (1985 / multiple retros)</strong> — the first colourway ever worn by Jordan</li>
            <li><strong>Royal Blue (1985)</strong> — clean blue/white/black, perennial favourite</li>
            <li><strong>Travis Scott x AJ1 High OG (2019)</strong> — reverse Swoosh, $1,000+ resale</li>
            <li><strong>Dior x AJ1 High (2020)</strong> — most exclusive collab ever, $8,000–$20,000+</li>
            <li><strong>Mocha / University Blue / Volt (recent Highs)</strong> — strong mid-tier resale</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">
            {/* Add full colourway timeline with release years, retail prices, and current resale ranges */}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Resale Market Value</h2>
          <p className="leading-relaxed text-neutral-700">
            The AJ1 is the most traded sneaker on secondary markets. General release Retros typically resell $50–$150 above retail. Limited and collaboration pairs can command multiples of retail. Size 9–11 (US) typically sees the most liquidity.
          </p>
          <p className="leading-relaxed text-neutral-700">
            {/* Add current resale averages per colourway, size premium data, market trend direction */}
          </p>
          <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
            <h3 className="font-semibold text-green-700">Check Live Resale Value</h3>
            <p className="mt-1 text-sm text-neutral-700">
              Scan any Air Jordan 1 colourway with SneakPrice to see live eBay market data and arbitrage opportunities.
            </p>
            <Link href="/" className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline">
              Scan it with SneakPrice →
            </Link>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Care & Maintenance</h2>
          <p className="leading-relaxed text-neutral-700">
            Leather AJ1s clean well with a soft brush and sneaker cleaner. Avoid soaking the leather — wipe rather than scrub. The white midsole oxidises over time; retro-brighting with hydrogen peroxide can restore it. Store with crease shields to protect the toe box.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/care/cleaning" className="text-sm font-medium text-green-600 hover:underline">Cleaning Guide →</Link>
            <Link href="/care/sole-restoration" className="text-sm font-medium text-green-600 hover:underline">Sole Restoration →</Link>
            <Link href="/care/storage" className="text-sm font-medium text-green-600 hover:underline">Storage & Protection →</Link>
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
