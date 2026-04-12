// app/care/crease-prevention/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Sneaker Crease Prevention | SneakPrice",
  description: "How to prevent and remove creases in sneakers to maintain condition and resale value.",
};

export default function CreasePreventionPage() {
  return (
    <article className="space-y-8 text-black">
      <h1 className="text-3xl font-bold">Crease Prevention</h1>

      <p className="leading-relaxed text-neutral-600">
        Creases form in the toe box of sneakers every time the foot bends while walking.
        They&apos;re natural, but they signal wear to buyers and reduce perceived value.
        Here&apos;s how to minimise them — and how to remove existing ones.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Crease Shields (Force Fields)</h2>
      <p className="leading-relaxed text-neutral-700">
        Crease shields (sold under brands like Sneaker Shields and Force Fields) are
        semi-rigid inserts that sit in the toe box and hold the shape of the upper against
        the flex of walking. They&apos;re the most effective prevention method. Trim them to
        fit if needed — they come in multiple sizes.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Proper Fit Matters</h2>
      <p className="leading-relaxed text-neutral-700">
        Shoes that are too large crease more aggressively — the toe box folds because the
        foot doesn&apos;t fill it. If you&apos;re buying to resell and won&apos;t wear them, stuff the
        toe box with tissue paper or use shoe trees immediately after any try-on.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Stuffing When Storing</h2>
      <p className="leading-relaxed text-neutral-700">
        Always store sneakers with the toe box stuffed — acid-free tissue paper or plastic
        shoe trees work well. This prevents the upper from collapsing inward and creasing
        under its own weight over long storage periods.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Steam Method for Existing Creases</h2>
      <p className="leading-relaxed text-neutral-700">
        For leather and synthetic leather uppers with existing creases:
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-neutral-700">
        <li>Stuff the toe box firmly with paper or a shoe tree</li>
        <li>Dampen a clean cloth and place over the creased area</li>
        <li>Apply a clothes iron on low-medium heat (no steam) over the cloth for 10–15 seconds</li>
        <li>Remove the iron and press the area flat with your hand while warm</li>
        <li>Repeat as needed — severe creases may need 3–4 passes</li>
      </ol>
      <p className="mt-2 leading-relaxed text-neutral-700">
        Do not use this method on mesh, knit, or suede — heat will damage these materials.
      </p>

      <h2 className="text-xl font-semibold text-green-600">What Not to Do</h2>
      <ul className="list-disc space-y-2 pl-5 text-neutral-700">
        <li>Don&apos;t over-stuff — too much pressure distorts the shape</li>
        <li>Don&apos;t use high heat on synthetics — they melt and deform permanently</li>
        <li>Don&apos;t iron directly on the upper without a damp cloth barrier</li>
      </ul>

      <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
        <h3 className="font-semibold text-green-700">Resale Tip</h3>
        <p className="mt-1 text-sm text-neutral-700">
          Crease-free sneakers photograph better and signal better care to buyers.
          A pair with no visible toe box creases consistently commands higher bids
          in side-by-side comparisons.
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
