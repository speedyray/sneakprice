import Link from "next/link";

export const metadata = {
  title: "Adidas Superstar | Sneaker Encyclopedia | SneakPrice",
  description: "The complete guide to the Adidas Superstar — history, shell toe design, colorways, and resale market value.",
};

export default function AdidasSuperstarPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">Sneaker Encyclopedia</p>
          <h1 className="text-4xl font-bold">Adidas Superstar</h1>
          <p className="text-lg text-neutral-600">
            The shell toe that conquered basketball courts in 1969 and hip-hop culture in the 1980s — one of the best-selling sneakers of all time.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Brand", value: "Adidas" },
            { label: "First Release", value: "1969" },
            { label: "Origin", value: "Basketball" },
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
          <p className="leading-relaxed text-neutral-700">The Adidas Superstar launched in 1969 as a low-top basketball shoe, featuring its distinctive rubber shell toe — designed to protect players' toes on hardwood courts. By the 1980s, Run-DMC had adopted it as their signature shoe, removing the laces and wearing them wide — triggering Adidas's first major hip-hop partnership and cementing the Superstar as a cultural icon.</p>
          <p className="leading-relaxed text-neutral-700">{/* Add: NBA adoption, transition from courts to streets, Run-DMC deal details, 2000s skateboarding crossover */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Design & Technology</h2>
          <p className="leading-relaxed text-neutral-700">The Superstar's most recognisable feature is its rubber shell toe — a hard protective cap that replaced the standard canvas toe. The leather upper and Three Stripes branding complete a design that has remained virtually unchanged for over 50 years.</p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li>Iconic rubber shell toe cap</li>
            <li>Full-grain leather upper</li>
            <li>Adidas Three Stripes on the side</li>
            <li>Low-top basketball-derived silhouette</li>
            <li>Herringbone rubber outsole</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">{/* Add: 80th anniversary editions, premium leather variants, collab material differences */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Popular Colorways</h2>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li><strong>White/Black (OG)</strong> — the original, enduring best-seller</li>
            <li><strong>All Black</strong> — clean dark alternative</li>
            <li><strong>Run-DMC Superstar (2011 collab)</strong> — no laces, unlaced tongue, collectors piece</li>
            <li><strong>Pharrell x Adidas Superstar (multiple)</strong> — high-profile collab editions</li>
            <li><strong>Kasina x Superstar "Won-Ang"</strong> — Korean collab, strong resale</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">{/* Add full colourway history */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Resale Market Value</h2>
          <p className="leading-relaxed text-neutral-700">Standard Superstar colourways retail at $85–$100 and resell near retail. Limited collaborations — particularly Pharrell and Kasina editions — command meaningful premiums. The Superstar is one of Adidas's most accessible entry points for collectors.</p>
          <p className="leading-relaxed text-neutral-700">{/* Add current resale data */}</p>
          <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
            <h3 className="font-semibold text-green-700">Check Live Resale Value</h3>
            <p className="mt-1 text-sm text-neutral-700">Scan any Adidas Superstar with SneakPrice to see live eBay market data.</p>
            <Link href="/" className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline">Scan it with SneakPrice →</Link>
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Care & Maintenance</h2>
          <p className="leading-relaxed text-neutral-700">The leather upper cleans easily with a damp cloth and leather cleaner. The rubber shell toe is durable but can crack if exposed to extreme cold. The white rubber outsole can yellow — use a Magic Eraser or sole sauce to restore brightness.</p>
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
