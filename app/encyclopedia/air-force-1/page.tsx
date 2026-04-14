import Link from "next/link";
import Image from "next/image";

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

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-green-600">Images of Nike Air Force 1</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { src: "/encyclopedia/air-force-1/Nike_AF1.jpg", alt: "Nike Air Force 1" },
              { src: "/encyclopedia/air-force-1/Nike-Air-ForceOne.jpg", alt: "Nike Air Force One" },
              { src: "/encyclopedia/air-force-1/Nike_Air_Force_One.jpg", alt: "Nike Air Force One side view" },
              { src: "/encyclopedia/air-force-1/Nike-Air-Force-One.jpg", alt: "Nike Air Force One pair" },
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
          <div className="rounded-2xl border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-100 p-8 shadow-lg">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600">Live Market Tool</p>
            <h3 className="mt-2 text-3xl font-extrabold leading-tight text-green-800 sm:text-4xl">
              Check Live Resale Value
            </h3>
            <p className="mt-3 text-lg text-neutral-700">
              Scan any Air Force 1 colourway with SneakPrice to see live eBay market data and arbitrage opportunities in real time.
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
            <h3 className="text-2xl font-bold text-black">Cleaning Your Air Force One Sneakers: Incredible Tips</h3>
          </div>

          <p className="leading-relaxed text-neutral-700">
            Your Air Force One Sneakers are among the finest footwear options available. They transcend mere function; they represent a cultural symbol of respect, comfort, distinctive flair, and, most importantly, a significant long-term investment.
          </p>
          <p className="leading-relaxed text-neutral-700">
            These exceptional sneakers, celebrated for their comfort, durability, and unique aesthetics, necessitate careful maintenance to keep them in top-notch condition. Accumulated dirt, stains, and regular usage can undermine their look and shorten their lifespan. However, employing the right cleaning methods and consistent upkeep can help you preserve your premium sneakers in pristine shape.
          </p>
          <p className="leading-relaxed text-neutral-700">
            Here are some fantastic ideas to assist you in caring for your Air Force One Sneakers.
          </p>

          {/* Tools and Materials */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-black">Tools and Materials</h4>
            <p className="text-neutral-700">To start, collect the following tools and materials:</p>
            <ul className="space-y-3 text-neutral-700">
              {[
                { label: "Soft-bristled Brush", desc: "Vital for gently removing grime without harming the sneaker's exterior." },
                { label: "Microfiber Cloth", desc: "Perfect for eliminating dirt and moisture due to its excellent absorbency and soft texture." },
                { label: "Mild Detergent or Specialized Sneaker Cleaning Solution", desc: "Formulated to clean effectively without damaging the materials of your sneakers." },
                { label: "Warm Water", desc: "Assists in loosening dirt and stains." },
                { label: "Sneaker Protective Spray", desc: "An essential item for shielding against future stains and water damage." },
              ].map((item) => (
                <li key={item.label} className="flex gap-3 rounded-xl border border-black/8 bg-neutral-50 px-4 py-3">
                  <span className="mt-0.5 text-green-500">✓</span>
                  <span><strong>{item.label}:</strong> {item.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pre-Cleaning Steps */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-black">Pre-Cleaning Steps</h4>
            <p className="text-neutral-700">Prior to embarking on the cleaning process, it&apos;s essential to prepare your sneakers:</p>
            <div className="space-y-3">
              {[
                { step: "1", label: "Remove Laces", desc: "Take out the laces and soak them in a mixture of warm water and mild detergent, allowing for a thorough cleaning of both the laces and the sneaker's tongue." },
                { step: "2", label: "Initial Wipe Down", desc: "Utilize a damp microfiber cloth to gently clear off excess dirt and dust from the surface. This step prevents scratching the sneaker during the cleaning process." },
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

          {/* Cleaning Procedure */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-black">Cleaning Procedure</h4>
            <div className="space-y-3">
              {[
                { step: "1", label: "Prepare Cleaning Solution", desc: "Combine warm water with a small amount of liquid detergent or utilize a specialized sneaker cleaning formula. The water temperature should be warm but not hot, as high temperatures can damage certain sneaker materials." },
                { step: "2", label: "Gentle Scrubbing", desc: "Dip the soft-bristled brush into the cleaning solution and delicately scrub the outer surfaces of the sneakers. Focus especially on areas that are particularly soiled. For high-end sneakers, which often feature intricate designs and sensitive materials, it's crucial to use gentle, circular movements to prevent damage." },
                { step: "3", label: "Wiping Off Suds and Dirt", desc: "After scrubbing, use a clean microfiber cloth to wipe away the suds and lift dirt. This action aids in identifying areas that may require further attention." },
                { step: "4", label: "Addressing Stubborn Stains", desc: "For persistent stains, especially on designer suede or leather sneakers, apply a small quantity of cleaning solution directly onto the stain. Gently scrub until the stain is lifted. It's vital to avoid excessive moisture, as this can cause harm, particularly to suede." },
                { step: "5", label: "Rinsing Process", desc: "Rinse the microfiber cloth in clean water and wipe the sneakers again to eliminate any remaining detergent or dirt. Repeat the cleaning procedure as needed, ensuring that no cleaning residue is left behind." },
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
