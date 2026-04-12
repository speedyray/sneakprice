import Link from "next/link";

export const metadata = {
  title: "Air Max 90 | Sneaker Encyclopedia | SneakPrice",
  description: "The complete guide to the Nike Air Max 90 — history, design, colorways, and resale market value.",
};

export default function AirMax90Page() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">Sneaker Encyclopedia</p>
          <h1 className="text-4xl font-bold">Nike Air Max 90</h1>
          <p className="text-lg text-neutral-600">
            Tinker Hatfield's masterpiece — the sneaker that made the Air unit visible and turned cushioning into a design statement.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Brand", value: "Nike" },
            { label: "First Release", value: "1990" },
            { label: "Designer", value: "Tinker Hatfield" },
            { label: "Retail Price", value: "$110–$130" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-black/10 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-neutral-500">{stat.label}</p>
              <p className="mt-1 font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">History</h2>
          <p className="leading-relaxed text-neutral-700">Originally released as the Air Max III in 1990, the shoe was retroactively renamed the Air Max 90 to mark its anniversary. Tinker Hatfield designed it to showcase Nike's Air technology through a visible window in the midsole — at the time a radical departure from conventional sneaker design.</p>
          <p className="leading-relaxed text-neutral-700">{/* Add: Infrared colourway cultural impact, UK rave scene adoption, 2000s skate culture crossover */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Design & Technology</h2>
          <p className="leading-relaxed text-neutral-700">The AM90's defining feature is its large visible Air unit in the heel, surrounded by a coloured plastic frame. The multi-panel upper uses a mix of leather, mesh, and synthetic overlays that allow for endless colourway possibilities.</p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li>Large visible heel Air unit with colour-matched plastic window</li>
            <li>Multi-panel leather and mesh upper</li>
            <li>Waffle-pattern rubber outsole</li>
            <li>Available in standard, Essential (cost-reduced), and premium variants</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">{/* Add: OG vs Essential material differences, Gore-Tex and SP variants */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Popular Colorways</h2>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li><strong>Infrared (1990 / multiple retros)</strong> — the definitive AM90, black/infrared/white</li>
            <li><strong>OG Cement Grey</strong> — understated classic</li>
            <li><strong>Atmos x AM90 "Animal Pack"</strong> — landmark collab, strong resale</li>
            <li><strong>Supreme x AM90</strong> — limited, collectors item</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">{/* Add full colourway list with release years and resale context */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Resale Market Value</h2>
          <p className="leading-relaxed text-neutral-700">General release AM90s typically resell at or near retail ($110–$130). OG and collaboration pairs command premiums. The Infrared retro consistently holds value as one of Nike's most recognised silhouettes.</p>
          <p className="leading-relaxed text-neutral-700">{/* Add current resale data by colourway */}</p>
          <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
            <h3 className="font-semibold text-green-700">Check Live Resale Value</h3>
            <p className="mt-1 text-sm text-neutral-700">Scan any Air Max 90 with SneakPrice to see live eBay market data.</p>
            <Link href="/" className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline">Scan it with SneakPrice →</Link>
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Care & Maintenance</h2>
          <p className="leading-relaxed text-neutral-700">The multi-panel upper requires gentle cleaning per panel — leather wipes clean easily, mesh needs a soft brush. The plastic Air window can yellow; avoid harsh chemicals near it. Store away from UV light to preserve the window clarity.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/care/cleaning" className="text-sm font-medium text-green-600 hover:underline">Cleaning Guide →</Link>
            <Link href="/care/storage" className="text-sm font-medium text-green-600 hover:underline">Storage & Protection →</Link>
          </div>
        </section>
        <div className="border-t border-black/10 pt-6">
          <Link href="/encyclopedia/a-z" className="text-sm font-medium text-neutral-500 hover:text-black">← Back to Sneaker Encyclopedia A–Z</Link>
        </div>
      </div>
    </div>
  );
}
