import Link from "next/link";

export const metadata = {
  title: "Air Max 97 | Sneaker Encyclopedia | SneakPrice",
  description: "The complete guide to the Nike Air Max 97 — history, design, colorways, and resale market value.",
};

export default function AirMax97Page() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">Sneaker Encyclopedia</p>
          <h1 className="text-4xl font-bold">Nike Air Max 97</h1>
          <p className="text-lg text-neutral-600">
            Inspired by Japanese bullet trains and water ripples — the AM97 introduced full-length visible Air and a silhouette that was ahead of its time.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Brand", value: "Nike" },
            { label: "First Release", value: "1997" },
            { label: "Designer", value: "Christian Tresser" },
            { label: "Retail Price", value: "$160–$185" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-black/10 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-neutral-500">{stat.label}</p>
              <p className="mt-1 font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">History</h2>
          <p className="leading-relaxed text-neutral-700">Christian Tresser designed the AM97 inspired by Japanese bullet trains (Shinkansen) and water ripples. It was the first shoe to feature a full-length visible Air unit — a technological and aesthetic milestone. Despite initial mixed reception in the US, it became a massive hit in Italy and parts of Europe before being rediscovered globally in the 2010s.</p>
          <p className="leading-relaxed text-neutral-700">{/* Add: Italian soccer culture adoption, UK grime resurgence, Supreme collab moment */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Design & Technology</h2>
          <p className="leading-relaxed text-neutral-700">The AM97's low-profile silhouette, reflective piping, and full-length Air unit were revolutionary in 1997. The ripple lines running across the upper were inspired by water movement, and the shoe sits exceptionally low to the ground for a running shoe of its era.</p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li>Full-length visible Air unit — first in the AM line</li>
            <li>3M reflective strips across the upper</li>
            <li>Water-ripple-inspired panelling</li>
            <li>Low-profile athletic silhouette</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">{/* Add: OG vs modern retro differences, premium SP materials */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Popular Colorways</h2>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li><strong>Silver Bullet (OG)</strong> — the original all-silver, instantly iconic</li>
            <li><strong>Triple Black</strong> — clean and consistently popular</li>
            <li><strong>Nike x Skepta AM97 (2017)</strong> — UK grime culture landmark</li>
            <li><strong>Supreme x Nike AM97 "Black/Gold"</strong> — high resale value</li>
            <li><strong>Sean Wotherspoon x AM97/1</strong> — hybrid AM97/AM1, one of the most creative collabs ever</li>
          </ul>
          <p className="leading-relaxed text-neutral-700">{/* Add full colourway list */}</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Resale Market Value</h2>
          <p className="leading-relaxed text-neutral-700">Standard AM97 colourways hold near retail value. The Silver Bullet OG and collaboration releases (Skepta, Supreme, Wotherspoon) command premiums. The Sean Wotherspoon hybrid remains one of the highest-resale AM97 variants.</p>
          <p className="leading-relaxed text-neutral-700">{/* Add current resale data */}</p>
          <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
            <h3 className="font-semibold text-green-700">Check Live Resale Value</h3>
            <p className="mt-1 text-sm text-neutral-700">Scan any Air Max 97 with SneakPrice to see live eBay market data.</p>
            <Link href="/" className="mt-3 inline-block text-sm font-medium text-green-600 hover:underline">Scan it with SneakPrice →</Link>
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-green-600">Care & Maintenance</h2>
          <p className="leading-relaxed text-neutral-700">The reflective 3M strips on the AM97 are delicate — clean gently with a soft cloth and avoid abrasives. The full-length Air unit sole can yellow; use hydrogen peroxide treatment to restore white/light colourways.</p>
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
