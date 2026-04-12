import Link from "next/link";

export const metadata = {
  title: "Asics Gel-Kayano | Sneaker Encyclopedia | SneakPrice",
  description: "The complete guide to the Asics Gel-Kayano — history, stability technology, colorways, and resale market value.",
};

export default function AsicsGelKayanoPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-4xl space-y-10">

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">Sneaker Encyclopedia</p>
          <h1 className="text-4xl font-bold">Asics Gel-Kayano</h1>
          <p className="text-lg text-neutral-600">
            Named after Toshikazu Kayano — one of Asics's most celebrated designers — the Gel-Kayano is a benchmark stability running shoe that has evolved into a streetwear staple.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Brand", value: "Asics" },
            { label: "First Release", value: "1993" },
            { label: "Designer", value: "Toshikazu Kayano" },
            { label: "Retail Price", value: "$130–$160" },
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
            The Gel-Kayano debuted in 1993 as Asics's flagship stability running shoe. Named after head designer Toshikazu Kayano, it introduced a combination of GEL technology and a dual-density midsole designed for overpronation control. Over 30 versions have been released — making it one of the longest-running performance running silhouettes in history.
          </p>
          <p className="leading-relaxed text-neutral-700">
            {/* Add: How the Kayano 14 became the breakout streetwear version, its rise in Y2K/gorpcore aesthetics, collab history */}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Design & Technology</h2>
          <p className="leading-relaxed text-neutral-700">
            Each generation of the Gel-Kayano builds on Asics's core technologies: GEL cushioning units in the heel and forefoot, FLYTEFOAM midsole for lightweight cushioning, and a structured upper for stability. The Kayano 14 — the most collected version — features a retro-tech aesthetic that resonated with the Y2K fashion revival.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li>GEL cushioning in heel and forefoot</li>
            <li>FLYTEFOAM midsole (later generations)</li>
            <li>Structured stability frame for overpronation support</li>
            <li>Mesh and synthetic upper with overlays</li>
            <li>Guidance Line midsole for gait efficiency</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">
            {/* Add: Kayano 14 vs Kayano 30 design evolution, differences between performance and lifestyle variants */}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Popular Colorways</h2>
          <p className="leading-relaxed text-neutral-700">
            The Kayano 14 is the most sought-after version for streetwear collectors. Key colourways include:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li><strong>Kayano 14 "Cream/Birch" (2022 retro)</strong> — neutral tones that drove the gorpcore trend</li>
            <li><strong>Kayano 14 "White/Black"</strong> — clean everyday colourway</li>
            <li><strong>kith x Asics Gel-Kayano (multiple)</strong> — premium collab editions</li>
            <li><strong>Sportstyle and retro-coloured Kayano 14s</strong> — highly sought in Japan-exclusive runs</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">
            {/* Add full colourway timeline across Kayano generations */}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Resale Market Value</h2>
          <p className="leading-relaxed text-neutral-700">
            The Kayano 14 retros and collaboration releases resell consistently above retail. Japan-exclusive and Kith collaboration pairs reach 2–3x retail. General release performance Kayanos (current generation) trade near retail.
          </p>
          <p className="leading-relaxed text-neutral-700">
            {/* Add current resale ranges by colourway and generation */}
          </p>
          <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
            <h3 className="font-semibold text-green-700">Check Live Resale Value</h3>
            <p className="mt-1 text-sm text-neutral-700">
              Scan any Asics Gel-Kayano with SneakPrice to see live eBay market data and arbitrage opportunities.
            </p>
            <Link href="/" className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline">
              Scan it with SneakPrice →
            </Link>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Care & Maintenance</h2>
          <p className="leading-relaxed text-neutral-700">
            The mesh upper of the Kayano is best cleaned with a soft brush and mild sneaker cleaner — avoid soaking the foam midsole. The GEL units in the sole are durable but can crack if stored in extreme conditions. Rotate pairs to allow the foam midsole to decompress between wears.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/care/cleaning" className="text-sm font-medium text-green-600 hover:underline">Cleaning Guide →</Link>
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
