// app/care/deodorizing/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Sneaker Deodorizing | SneakPrice",
  description: "How to remove odour from sneakers before storing or selling them.",
};

export default function DeodorizingPage() {
  return (
    <article className="space-y-8 text-black">
      <h1 className="text-3xl font-bold">Deodorizing Sneakers</h1>

      <p className="leading-relaxed text-neutral-600">
        Odour is the number one buyer turn-off for used sneakers. Even a visually
        perfect pair loses value — and buyers — if it smells. Here&apos;s how to neutralise
        odour without damaging materials.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Baking Soda Method</h2>
      <p className="leading-relaxed text-neutral-700">
        The simplest and cheapest method. Pour a tablespoon of baking soda into each shoe,
        shake to distribute, and leave overnight. Tap out thoroughly before wearing or
        storing. Baking soda neutralises acid-based odours rather than masking them.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Cedar Shoe Trees</h2>
      <p className="leading-relaxed text-neutral-700">
        Cedar naturally absorbs moisture and provides a mild deodorising effect. Insert
        cedar shoe trees after every wear and when storing. They also maintain shape — a
        two-for-one benefit. Replace or sand them lightly every 6 months to restore
        absorbency.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Activated Charcoal Inserts</h2>
      <p className="leading-relaxed text-neutral-700">
        Activated charcoal bags (available as small pouches) placed inside shoes absorb
        odour molecules. Recharge them monthly by leaving in direct sunlight for a few
        hours. More effective than baking soda for persistent odours.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Sprays — What&apos;s Safe</h2>
      <p className="leading-relaxed text-neutral-700">
        Enzyme-based sprays (like Lumi Outdoors or Rocket Pure) break down odour-causing
        bacteria without bleaching materials. Spray inside, let air dry fully before closing
        the box. Avoid alcohol-heavy sprays on suede and nubuck — they dry out the material.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Airing Out</h2>
      <p className="leading-relaxed text-neutral-700">
        After wearing, leave sneakers in a well-ventilated spot for at least 24 hours
        before boxing them. Never box shoes that are still warm or slightly damp — that&apos;s
        how mould and odour develop inside the box.
      </p>

      <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
        <h3 className="font-semibold text-green-700">Resale Tip</h3>
        <p className="mt-1 text-sm text-neutral-700">
          Fresh-smelling sneakers sell faster and generate better reviews. Deodorize 48
          hours before shipping so the shoe is fully aired out when it arrives.
        </p>
      </div>

      <div className="border-t border-black/10 pt-6">
        <p className="text-sm text-neutral-500">
          Know your sneaker&apos;s market value before you sell.{" "}
          <Link href="/scan" className="font-medium text-green-600 hover:underline">
            Scan it with SneakPrice →
          </Link>
        </p>
      </div>
    </article>
  );
}
