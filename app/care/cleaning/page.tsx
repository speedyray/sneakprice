// app/care/cleaning/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Sneaker Cleaning Tips | SneakPrice",
  description: "How to clean sneakers properly to preserve their condition and resale value.",
};

export default function CleaningTipsPage() {
  return (
    <article className="space-y-8 text-black">
      <h1 className="text-3xl font-bold">Sneaker Cleaning Tips</h1>

      <p className="leading-relaxed text-neutral-600">
        Keeping your sneakers clean is the single most impactful thing you can do to
        preserve their condition — and their resale value. Dirty sneakers photograph
        poorly and signal neglect to buyers. Here&apos;s how to clean them properly.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Tools You Need</h2>
      <ul className="list-disc space-y-2 pl-5 text-neutral-700">
        <li>Soft-bristle brush (an old toothbrush works well for detailing)</li>
        <li>Microfibre cloth</li>
        <li>Sneaker cleaning solution (Crep Protect, Jason Markk, or diluted dish soap)</li>
        <li>Small bowl of warm water</li>
        <li>Paper towels or shoe trees for drying shape</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-600">Dry Cleaning First</h2>
      <p className="leading-relaxed text-neutral-700">
        Before applying any liquid, knock the sneakers together to dislodge loose dirt,
        then use a dry soft brush to remove surface dust from the upper, midsole, and
        outsole. This prevents mud from spreading when wet cleaning begins.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Wet Cleaning by Material</h2>

      <h3 className="font-semibold text-neutral-800">Mesh &amp; Knit</h3>
      <p className="leading-relaxed text-neutral-700">
        Mix a few drops of sneaker cleaner with warm water. Dip the brush, work in small
        circular motions, then blot (don&apos;t rub) with a microfibre cloth. Mesh dries
        fast — avoid soaking.
      </p>

      <h3 className="font-semibold text-neutral-800">Leather &amp; Synthetic Leather</h3>
      <p className="leading-relaxed text-neutral-700">
        Wipe with a damp microfibre cloth and a small amount of cleaner. Leather responds
        well to a dedicated leather conditioner after cleaning to prevent cracking.
      </p>

      <h3 className="font-semibold text-neutral-800">Suede &amp; Nubuck</h3>
      <p className="leading-relaxed text-neutral-700">
        Use a dedicated suede brush — never water on raw suede. For stains, a suede eraser
        lifts marks without damaging the nap. Always brush in one direction to restore texture.
      </p>

      <h2 className="text-xl font-semibold text-green-600">What to Avoid</h2>
      <ul className="list-disc space-y-2 pl-5 text-neutral-700">
        <li><strong>Washing machines</strong> — agitation damages glue bonds and shape</li>
        <li><strong>Bleach</strong> — yellows midsoles and destroys materials</li>
        <li><strong>Direct heat to dry</strong> — use room temperature air, stuffed with paper</li>
        <li><strong>Abrasive scrubbers</strong> — scratch leather and flatten suede nap</li>
      </ul>

      <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
        <h3 className="font-semibold text-green-700">Resale Tip</h3>
        <p className="mt-1 text-sm text-neutral-700">
          Clean sneakers before photographing for sale. Clean kicks fetch higher bids and
          sell faster — buyers assume well-kept shoes have been stored properly too.
        </p>
      </div>

      <div className="border-t border-black/10 pt-6">
        <p className="text-sm text-neutral-500">
          Know your sneaker&apos;s market value before you sell.{" "}
          <Link href="/" className="font-medium text-green-600 hover:underline">
            Scan it with SneakPrice →
          </Link>
        </p>
      </div>
    </article>
  );
}
