import Link from "next/link";

export const metadata = {
  title: "Adidas Stan Smith | Sneaker Encyclopedia | SneakPrice",
  description: "The complete guide to the Adidas Stan Smith — history, minimalist design, colorways, and resale market value.",
};

export default function AdidasStanSmithPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">Sneaker Encyclopedia</p>
          <h1 className="text-4xl font-bold">Adidas Stan Smith</h1>
          <p className="text-lg text-neutral-600">
            The world's best-selling tennis shoe — a minimalist leather sneaker that defined clean style across four decades.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Brand", value: "Adidas" },
            { label: "First Release", value: "1973" },
            { label: "Origin", value: "Tennis" },
            { label: "Retail Price", value: "$85–$100" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-black/10 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-neutral-500">{stat.label}</p>
              <p className="mt-1 font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">History</h2>
          <p className="leading-relaxed text-neutral-700">Originally named the Haillet after French tennis player Robert Haillet in 1965, the shoe was rebranded as the Stan Smith in 1978 — named after the American tennis player who won Wimbledon in 1972. It became the world's best-selling athletic shoe by the mid-1980s and was retired briefly in 2012 before making a massively successful comeback in 2014.</p>
          <p className="leading-relaxed text-neutral-700">{/* Add: Fashion world adoption, Phoebe Philo era at Céline, 2014 comeback strategy, luxury collab era */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Design & Technology</h2>
          <p className="leading-relaxed text-neutral-700">The Stan Smith's design is intentionally minimal — a clean white leather upper with perforated Three Stripes, a green heel tab bearing Stan Smith's face, and a simple cupsole. Its lack of ornamentation made it a canvas for fashion collaborations and the go-to "clean sneaker" for multiple generations.</p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li>Minimalist full-grain leather upper</li>
            <li>Perforated Three Stripes (not applied stripes)</li>
            <li>Stan Smith portrait on the heel tab</li>
            <li>Low-profile tennis-derived cupsole</li>
            <li>Available in leather, vegan, and premium variants</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">{/* Add: Mylo mushroom leather collaboration, LUX premium versions */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Popular Colorways</h2>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li><strong>White/Green (OG)</strong> — the definitive version, never out of style</li>
            <li><strong>White/Navy</strong> — clean alternative colourway</li>
            <li><strong>Pharrell x Stan Smith (multiple)</strong> — bold premium editions</li>
            <li><strong>Prada x Stan Smith (2021)</strong> — high-fashion luxury collab, premium resale</li>
            <li><strong>Wales Bonner x Stan Smith</strong> — cultural crossover, strong resale</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">{/* Add full colourway history */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Resale Market Value</h2>
          <p className="leading-relaxed text-neutral-700">Standard Stan Smiths resell at or slightly above retail. The Prada and Wales Bonner collaborations command significant premiums. The Stan Smith is one of the few sneakers that crosses over into luxury fashion resale markets.</p>
          <p className="leading-relaxed text-neutral-700">{/* Add current resale data */}</p>
          <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
            <h3 className="font-semibold text-green-700">Check Live Resale Value</h3>
            <p className="mt-1 text-sm text-neutral-700">Scan any Adidas Stan Smith with SneakPrice to see live eBay market data.</p>
            <Link href="/" className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline">Scan it with SneakPrice →</Link>
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Care & Maintenance</h2>
          <p className="leading-relaxed text-neutral-700">The white leather upper is easy to clean with a damp cloth. Avoid heavy scrubbing on the perforated Three Stripes area. The cupsole can yellow — a Magic Eraser works well on the rubber edges. Leather conditioner applied seasonally prevents cracking.</p>
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
