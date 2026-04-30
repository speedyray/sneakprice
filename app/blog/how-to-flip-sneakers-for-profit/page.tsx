import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title:
    "How to Flip Sneakers for Profit in 2025: A Beginner's Complete Guide | SneakPrice",
  description:
    "From finding undervalued pairs to timing your sell — everything you need to know to start making real money in the sneaker resale market.",
  alternates: {
    canonical: "https://sneakpriceapp.com/blog/how-to-flip-sneakers-for-profit",
  },
  openGraph: {
    title: "How to Flip Sneakers for Profit in 2025",
    description:
      "From finding undervalued pairs to timing your sell — everything you need to know to start making real money in the sneaker resale market.",
    url: "https://sneakpriceapp.com/blog/how-to-flip-sneakers-for-profit",
    type: "article",
    images: ["/encyclopedia/air-jordan-1/AIRJORDAN-1.jpeg"],
  },
};

export default function FlipSneakersForProfitPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#e8e4c8" }}>
      {/* Article hero */}
      <div className="bg-white border-b border-black/10">
        <div className="mx-auto max-w-3xl px-6 pt-12 pb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-black"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 8H3M7 4L3 8l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to blog
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Reselling
            </span>
            <span className="text-sm text-neutral-400">Apr 18, 2025</span>
            <span className="text-sm text-neutral-400">·</span>
            <span className="text-sm text-neutral-400">8 min read</span>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
            How to Flip Sneakers for Profit in 2025: A Beginner&apos;s Complete
            Guide
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600">
            From finding undervalued pairs to timing your sell — everything you
            need to know to start making real money in the sneaker resale
            market.
          </p>
        </div>

        <div className="mx-auto max-w-5xl px-6 pb-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-black/10">
            <Image
              src="/encyclopedia/air-jordan-1/AIRJORDAN-1.jpeg"
              alt="Air Jordan 1"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-neutral-700 prose-a:text-black prose-a:underline prose-strong:text-black">
          <p className="text-lg">
            Article content coming soon. We&apos;re putting together the
            definitive beginner&apos;s playbook for flipping sneakers in
            2025 — covering sourcing, pricing, fees, taxes, and timing.
          </p>

          <h2>What you&apos;ll learn</h2>
          <ul>
            <li>How to find undervalued pairs before everyone else</li>
            <li>Where to buy: retail raffles, marketplaces, and arbitrage</li>
            <li>How to read SneakPrice market data to time your sell</li>
            <li>Fees, taxes, and the math that separates flippers who profit from those who don&apos;t</li>
          </ul>

          <p className="text-neutral-500">
            <em>Full article publishing soon. In the meantime, scan a pair to see live market value and arbitrage opportunities.</em>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-black/10 bg-white p-8 text-center">
          <h3 className="text-2xl font-bold text-black">
            Want to see live arbitrage right now?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-neutral-600">
            SneakPrice scans eBay, StockX, and GOAT in real time and surfaces
            the most profitable flips on the market.
          </p>
          <Link
            href="/discover"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Try SneakPrice free →
          </Link>
        </div>
      </article>
    </div>
  );
}
