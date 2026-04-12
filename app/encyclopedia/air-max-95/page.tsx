import Link from "next/link";

export const metadata = {
  title: "Air Max 95 | Sneaker Encyclopedia | SneakPrice",
  description: "The complete guide to the Nike Air Max 95 — history, design, colorways, and resale market value.",
};

export default function AirMax95Page() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">Sneaker Encyclopedia</p>
          <h1 className="text-4xl font-bold">Nike Air Max 95</h1>
          <p className="text-lg text-neutral-600">
            Inspired by the human spine — the Air Max 95 introduced forefoot Air and gradient panelling that defined 1990s sneaker design.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Brand", value: "Nike" },
            { label: "First Release", value: "1995" },
            { label: "Designer", value: "Sergio Lozano" },
            { label: "Retail Price", value: "$160–$180" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-black/10 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-neutral-500">{stat.label}</p>
              <p className="mt-1 font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">History</h2>
          <p className="leading-relaxed text-neutral-700">Designed by Sergio Lozano and inspired by the human body — the spine forms the ribbed side panelling, the chest muscles form the gradient layers, and the eye represents the forefoot Air unit. The AM95 was the first Air Max to feature visible forefoot Air, introducing dual Air cushioning to the line.</p>
          <p className="leading-relaxed text-neutral-700">{/* Add: UK garage/grime scene adoption, "110s" slang in London, enduring street credibility */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Design & Technology</h2>
          <p className="leading-relaxed text-neutral-700">The AM95's layered gradient upper — from dark at the sole to light at the top — was inspired by earth cross-sections. It introduced dual visible Air units (forefoot and heel), a first for the Air Max line.</p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li>Dual visible Air units — forefoot and heel, first in the AM line</li>
            <li>Gradient layered mesh and synthetic upper</li>
            <li>Spine-inspired ribbed side panelling</li>
            <li>Available in OG and premium/collab variants</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">{/* Add: material quality differences across retro generations */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Popular Colorways</h2>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li><strong>OG Neon (Yellow Strike)</strong> — original 1995 release, most sought-after</li>
            <li><strong>OG Black/White</strong> — the clean evergreen colourway</li>
            <li><strong>Restock exclusives and Japan-only colourways</strong> — premium resale</li>
            <li><strong>Hakone Pack and regional exclusives</strong> — collector favourites</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">{/* Add full colourway list */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Resale Market Value</h2>
          <p className="leading-relaxed text-neutral-700">The AM95 retails higher than most Air Max silhouettes ($160–$180) due to material complexity. OG Neon retros and Japan-exclusive colourways regularly resell well above retail.</p>
          <p className="leading-relaxed text-neutral-700">{/* Add current resale data */}</p>
          <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
            <h3 className="font-semibold text-green-700">Check Live Resale Value</h3>
            <p className="mt-1 text-sm text-neutral-700">Scan any Air Max 95 with SneakPrice to see live eBay market data.</p>
            <Link href="/" className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline">Scan it with SneakPrice →</Link>
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Care & Maintenance</h2>
          <p className="leading-relaxed text-neutral-700">The gradient mesh panels require gentle cleaning — a soft brush with mild cleaner avoids colour bleed between gradient zones. The sole yellows over time; sole restoration is recommended for OG pairs.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/care/cleaning" className="text-sm font-medium text-green-600 hover:underline">Cleaning Guide →</Link>
            <Link href="/care/sole-restoration" className="text-sm font-medium text-green-600 hover:underline">Sole Restoration →</Link>
          </div>
        </section>
        <div className="border-t border-black/10 pt-6">
          <Link href="/encyclopedia/a-z" className="text-sm font-medium text-neutral-500 hover:text-black">← Back to Sneaker Encyclopedia A–Z</Link>
        </div>
      </div>
    </div>
  );
}
