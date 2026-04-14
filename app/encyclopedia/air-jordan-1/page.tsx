import Link from "next/link";
import Image from "next/image";

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

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-green-600">Images of Nike Air Jordan 1</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { src: "/encyclopedia/air-jordan-1/AIRJORDAN-1.jpeg", alt: "Air Jordan 1" },
              { src: "/encyclopedia/air-jordan-1/AirJordanOne.jpeg", alt: "Air Jordan One" },
              { src: "/encyclopedia/air-jordan-1/AIR_JORDAN_ONE.jpg", alt: "Air Jordan One side view" },
              { src: "/encyclopedia/air-jordan-1/AIR-JORDAN-ONE.jpeg", alt: "Air Jordan One pair" },
            ].map((img) => (
              <div key={img.src} className="relative aspect-square overflow-hidden rounded-xl border border-black/10 bg-neutral-100">
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
          <div className="rounded-2xl border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-100 p-8 shadow-lg">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600">Live Market Tool</p>
            <h3 className="mt-2 text-3xl font-extrabold leading-tight text-green-800 sm:text-4xl">
              Check Live Resale Value
            </h3>
            <p className="mt-3 text-lg text-neutral-700">
              Scan any Air Jordan 1 colourway with SneakPrice to see live eBay market data and arbitrage opportunities in real time.
            </p>
            <Link
              href="https://sneakpriceapp.com/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-green-700 active:scale-95"
            >
              Scan it with SneakPrice →
            </Link>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-green-600">Care &amp; Maintenance</h2>
            <h3 className="text-2xl font-bold text-black">Maintaining the Elegance of Your Luxury Air Jordan 1 Sneakers: Advice &amp; Insights</h3>
          </div>

          <p className="leading-relaxed text-neutral-700">
            Luxury Air Jordan 1 Sneakers are not merely a purchase; they represent a timeless piece and are unique luxury footwear on the market. They transcend being just shoes; they serve as a social emblem of admiration, comfort, distinctive style, and importantly, a valuable long-term investment.
          </p>
          <p className="leading-relaxed text-neutral-700">
            These exceptional sneakers, celebrated for their comfort, craftsmanship, and exclusive designs, require attentive upkeep to preserve their flawless condition. Accumulating dirt, stains, and everyday usage can tarnish their look and shorten their lifespan. However, employing the correct cleaning methods and consistent maintenance can ensure your premium sneakers remain in pristine condition.
          </p>
          <p className="leading-relaxed text-neutral-700">
            Here are some remarkable tips to assist you in caring for your Air Jordan 1 Sneakers.
          </p>

          {/* Essential Tools and Supplies */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-black">Essential Tools and Supplies</h4>
            <p className="text-neutral-700">To start off, collect the following tools and supplies:</p>
            <ul className="space-y-3 text-neutral-700">
              {[
                { label: "Soft-bristle Brush", desc: "Vital for gently eliminating dirt without compromising the surface of the sneakers." },
                { label: "Microfiber Cloth", desc: "Optimal for mopping up dirt and moisture thanks to its absorbent nature and gentle touch." },
                { label: "Mild Detergent or Specialized Sneaker Cleaning Solution", desc: "Specifically designed to clean effectively while protecting the sneaker's material." },
                { label: "Warm Water", desc: "Aids in loosening dirt and stains." },
                { label: "Sneaker Protective Spray", desc: "An indispensable item for safeguarding against future stains and water damage." },
              ].map((item) => (
                <li key={item.label} className="flex gap-3 rounded-xl border border-black/8 bg-neutral-50 px-4 py-3">
                  <span className="mt-0.5 text-green-500">✓</span>
                  <span><strong>{item.label}:</strong> {item.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pre-Cleaning Preparations */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-black">Pre-Cleaning Preparations</h4>
            <p className="text-neutral-700">Before you begin the cleaning routine, it&apos;s essential to ready your sneakers:</p>
            <div className="space-y-3">
              {[
                { step: "1", label: "Remove Laces", desc: "Take the laces out and immerse them in a blend of warm water and mild detergent. This process ensures both the laces and the tongue of the sneaker are thoroughly cleaned." },
                { step: "2", label: "Initial Wipe Down", desc: "Utilize a damp microfiber cloth to delicately wipe off excess dirt and dust from the surface, preventing any scratches during the cleaning." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 rounded-xl border border-black/8 bg-neutral-50 px-4 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">{item.step}</span>
                  <div>
                    <p className="font-semibold text-black">{item.label}</p>
                    <p className="mt-0.5 text-neutral-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The Cleaning Process */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-black">The Cleaning Process</h4>
            <div className="space-y-3">
              {[
                { step: "1", label: "Prepare the Cleaning Solution", desc: "Combine warm water with a modest amount of liquid detergent or utilize a specialized sneaker cleaning solution. Make sure the water is warm but not overly hot, as extreme temperatures can harm certain sneaker materials." },
                { step: "2", label: "Gentle Scrubbing", desc: "Dip the soft-bristle brush into the cleaning solution and gently scrub the outer surface of the sneakers. Focus on areas that are particularly dirty. For high-end sneakers with detailed designs and sensitive materials, using gentle, circular motions is key to avoiding damage." },
                { step: "3", label: "Removing Suds and Dirt", desc: "After scrubbing, take a clean microfiber cloth to wipe off the suds and lift dirt, helping to evaluate other areas needing further treatment." },
                { step: "4", label: "Tackling Stubborn Stains", desc: "For persistent stains, especially on designer suede or leather, apply a small quantity of cleaning solution directly onto the stain. Gently scrub until the stain is lifted, ensuring to avoid excessive moisture that could harm, particularly to suede." },
                { step: "5", label: "Rinsing Steps", desc: "Rinse the microfiber cloth in clean water, then wipe the sneakers once more to eliminate any leftover detergent or dirt. Repeat the cleaning process as necessary, ensuring no cleaning residues remain." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 rounded-xl border border-black/8 bg-neutral-50 px-4 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">{item.step}</span>
                  <div>
                    <p className="font-semibold text-black">{item.label}</p>
                    <p className="mt-0.5 text-neutral-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
