// app/care/sole-restoration/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Sneaker Sole Restoration | SneakPrice",
  description: "How to restore yellowed or oxidised sneaker soles to improve condition and resale value.",
};

export default function SoleRestorationPage() {
  return (
    <article className="space-y-8 text-black">
      <h1 className="text-3xl font-bold">Sole Restoration</h1>

      <p className="leading-relaxed text-neutral-600">
        Yellowed and oxidised soles are the most common resale value killer. Even a clean
        upper can&apos;t save a pair with brown, crumbling midsoles. The good news: sole
        yellowing is reversible with the right approach.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Identifying Sole Yellowing</h2>
      <p className="leading-relaxed text-neutral-700">
        Yellowing happens when the polyurethane or EVA in white/icy soles oxidises over
        time — accelerated by UV light, heat, and humidity. Icy translucent soles
        (common on Jordans, Dunks) are the most susceptible. The sole turns from clear
        or white to yellow or amber.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Hydrogen Peroxide + UV Method (Retro-Brighting)</h2>
      <p className="leading-relaxed text-neutral-700">
        This is the most effective DIY method for de-yellowing:
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-neutral-700">
        <li>Clean the sole thoroughly first (remove all dirt)</li>
        <li>Apply a thick layer of 6–12% hydrogen peroxide cream or salon-grade developer to the sole</li>
        <li>Wrap in cling film / plastic wrap to keep moist</li>
        <li>Place sole-side up in direct sunlight for 3–6 hours</li>
        <li>Check every hour — remove when the sole reaches desired whiteness</li>
        <li>Rinse thoroughly with water and dry</li>
      </ol>
      <p className="mt-2 leading-relaxed text-neutral-700">
        Repeat the process for heavily yellowed soles. Avoid getting hydrogen peroxide
        on the upper — tape or cover it with masking tape before applying.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Commercial Sole Sauce Products</h2>
      <p className="leading-relaxed text-neutral-700">
        Products like Vick&apos;s Sole Sauce, Retr0Bright, and Angelus Sole Bright are
        pre-formulated versions of the same chemistry. They tend to be more consistent
        than DIY hydrogen peroxide mixes and come with application brushes.
      </p>

      <h2 className="text-xl font-semibold text-green-600">Midsole Cleaning</h2>
      <p className="leading-relaxed text-neutral-700">
        For rubber outsoles and foam midsoles that are dirty (not yellowed), a stiff brush
        with sneaker cleaner or a Magic Eraser works well. Magic Erasers are abrasive —
        use light pressure and only on rubber, not mesh or leather.
      </p>

      <h2 className="text-xl font-semibold text-green-600">When to Use a Professional</h2>
      <p className="leading-relaxed text-neutral-700">
        Crumbling or cracked soles (sole rot) require professional restoration or re-soling.
        Brands like Reshoevn8r and local cobbler shops offer sole replacement for high-value
        pairs. For soles that are physically deteriorating, DIY whitening won&apos;t help.
      </p>

      <div className="rounded-xl border border-green-500/30 bg-green-50 p-5">
        <h3 className="font-semibold text-green-700">Resale Tip</h3>
        <p className="mt-1 text-sm text-neutral-700">
          Restored soles can add $20–$50 to a resale price on platforms like eBay and
          StockX. It&apos;s one of the highest-ROI improvements you can make before listing.
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
