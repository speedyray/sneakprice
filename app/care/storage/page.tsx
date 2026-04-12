// app/care/storage/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Sneaker Storage & Protection | SneakPrice",
  description: "How to store sneakers properly to prevent yellowing, oxidation, and damage.",
};

export default function StoragePage() {
  return (
    <article className="space-y-8 text-black">
      <h1 className="text-3xl font-bold">Sneaker Storage &amp; Protection</h1>

      <p className="leading-relaxed text-neutral-600">
        How you store sneakers has a direct impact on their long-term condition and resale
        value. Poor storage causes yellowing, sole oxidation, and material breakdown — all
        of which lower what a buyer will pay.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Ideal Storage Conditions</h2>
      <ul className="list-disc space-y-2 pl-5 text-neutral-700">
        <li><strong>Cool and dry</strong> — heat accelerates sole yellowing and glue degradation</li>
        <li><strong>Away from direct sunlight</strong> — UV light fades colourways and oxidises soles</li>
        <li><strong>Good airflow</strong> — trapped moisture leads to mould and odour</li>
        <li><strong>Stable temperature</strong> — avoid garages and attics with big swings</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-600">Original Box vs Clear Containers</h2>
      <p className="leading-relaxed text-neutral-700">
        Original boxes are ideal for resale — buyers pay a premium for &quot;box included.&quot;
        Store them lidded to keep dust out. If you&apos;ve lost the box, clear stackable sneaker
        containers (Shoebox, IRIS) protect while letting you see what&apos;s inside at a glance.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Controlling Moisture</h2>
      <p className="leading-relaxed text-neutral-700">
        Place 1–2 silica gel packets inside each box. Replace them every 6–12 months.
        Silica gel is cheap and prevents the humidity build-up that causes sole yellowing
        and mould on insoles.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Maintaining Shape</h2>
      <p className="leading-relaxed text-neutral-700">
        Stuff toe boxes with acid-free tissue paper or use plastic shoe trees to hold the
        shape. Avoid newspaper — the ink can transfer onto light-coloured liners.
      </p>

      <h2 className="text-xl font-semibold text-green-600">What to Avoid</h2>
      <ul className="list-disc space-y-2 pl-5 text-neutral-700">
        <li><strong>Plastic bags sealed airtight</strong> — traps moisture, accelerates yellowing</li>
        <li><strong>Stacking without boxes</strong> — sole pressure deforms uppers over time</li>
        <li><strong>Basement storage</strong> — typically humid; use a dehumidifier if unavoidable</li>
      </ul>

      <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
        <h3 className="font-semibold text-green-700">Resale Tip</h3>
        <p className="mt-1 text-sm text-neutral-700">
          Sneakers stored in original boxes with receipt and extra laces command a meaningful
          premium. Hold onto everything that came in the box.
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
