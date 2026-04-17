import Image from "next/image";
import Link from "next/link";
import { Sneaker } from "@/lib/encyclopedia/sneakers";

export default function SneakerEncyclopediaTemplate({
  sneaker,
}: {
  sneaker: Sneaker;
}) {
  const images =
    sneaker.images && sneaker.images.length > 0
      ? sneaker.images
      : [
          {
            src: "/encyclopedia/default-sneaker.jpg",
            alt: "Sneaker placeholder",
          },
        ];

  const ensureArray = <T,>(val?: T[] | T) =>
    Array.isArray(val) ? val : val ? [val] : [];

  const history = ensureArray(sneaker.history);
  const designBullets = ensureArray(sneaker.designBullets);
  const colorways = ensureArray(sneaker.colorways);
  const resaleParagraphs = ensureArray(sneaker.resaleParagraphs);
  const careIntro = ensureArray(sneaker.careIntro);

  const market = sneaker.marketSnapshot;
  const resaleHighlights = sneaker.resaleHighlights ?? [];
  const relatedModels = sneaker.relatedModels ?? [];
  const careTools = sneaker.careTools ?? [];
  const carePrep = sneaker.carePrep ?? [];
  const careCleaning = sneaker.careCleaning ?? [];
  const resellerInsightBullets = sneaker.resellerInsight?.bullets ?? [];
  const ctaBullets = sneaker.cta?.bullets ?? [];

  return (
    <div className="min-h-screen bg-white px-6 py-12 text-black">

      <div className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
              Sneaker Encyclopedia
            </p>
            <h1 className="text-4xl font-bold sm:text-5xl">{sneaker.name}</h1>
            <p className="max-w-4xl text-lg text-neutral-600">
              {sneaker.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Brand" value={sneaker.brand} />
            <Stat label="First Release" value={sneaker.firstRelease} />
            <Stat label="Designer" value={sneaker.designer} />
            <Stat label="Retail Price" value={sneaker.retailPrice} />
          </div>
        </header>

        {market && (
          <section className="rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-sm">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-green-600">
                  Live Market Snapshot
                </p>
                <h2 className="mt-2 text-2xl font-bold text-green-900">
                  {market.title || `${sneaker.name} Market Overview`}
                </h2>
              </div>

              {market.demand && (
                <div className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-semibold text-white">
                  {market.demand}
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <MarketStat label="Avg Resale" value={market.avgResale ?? "--"} />
              <MarketStat label="Trend" value={market.trend ?? "--"} />
              <MarketStat
                label="Volatility"
                value={market.volatility ?? "--"}
              />
              <MarketStat label="Liquidity" value={market.liquidity ?? "--"} />
              <MarketStat label="Flip Score" value={market.flipScore ?? "--"} />
            </div>

            {market.description && (
              <p className="mt-5 text-sm leading-relaxed text-neutral-700">
                {market.description}
              </p>
            )}
          </section>
        )}

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-600">
            Images of {sneaker.name}
          </h2>

          <div
            className={`grid gap-3 ${
              images.length === 1
                ? "grid-cols-1 max-w-sm"
                : images.length === 2
                ? "grid-cols-2 max-w-2xl"
                : "grid-cols-2 sm:grid-cols-4"
            }`}
          >
            {images.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="relative aspect-square overflow-hidden rounded-2xl border border-black/10 bg-neutral-100"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </section>

        {history.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-green-600">History</h2>
            {history.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-neutral-700">
                {paragraph}
              </p>
            ))}
          </section>
        )}

        {(sneaker.designIntro || designBullets.length > 0) && (
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-green-600">
              Design &amp; Technology
            </h2>

            {sneaker.designIntro && (
              <p className="leading-relaxed text-neutral-700">
                {sneaker.designIntro}
              </p>
            )}

            {designBullets.length > 0 && (
              <ul className="list-disc space-y-2 pl-5 text-neutral-700">
                {designBullets.map((bullet, i) => (
                  <li key={i}>{String(bullet)}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        {colorways.length > 0 && (
          <section className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-green-600">
                Popular Colorways
              </h2>
              <p className="leading-relaxed text-neutral-700">
                Key releases and market-relevant pairs associated with{" "}
                {sneaker.name}.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {colorways.map((colorway, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-black/10 bg-neutral-50 p-5"
                >
                  <h3 className="text-lg font-semibold text-black">
                    {typeof colorway === "string" ? colorway : colorway.name}
                  </h3>

                  {typeof colorway !== "string" && colorway.note && (
                    <p className="mt-2 text-neutral-700">{colorway.note}</p>
                  )}

                  {typeof colorway !== "string" && colorway.market && (
                    <p className="mt-3 text-sm font-medium text-green-700">
                      {colorway.market}
                    </p>
                  )}

                  <Link
                    href="/exchange"
                    className="mt-4 inline-flex text-sm font-semibold text-green-600 hover:text-green-700"
                  >
                    View market →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {resaleParagraphs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-600">
              Resale Market Value
            </h2>

            {resaleParagraphs.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-neutral-700">
                {paragraph}
              </p>
            ))}

            {resaleHighlights.length > 0 && (
              <div className="grid gap-4 md:grid-cols-3">
                {resaleHighlights.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-black/10 bg-neutral-50 p-5"
                  >
                    <p className="text-xs uppercase tracking-wide text-neutral-500">
                      {item.label}
                    </p>
                    <p className="mt-2 font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {sneaker.cta && (
          <section className="rounded-3xl border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-100 p-8 shadow-lg">
            {sneaker.cta.eyebrow && (
              <p className="text-xs font-bold uppercase tracking-widest text-green-600">
                {sneaker.cta.eyebrow}
              </p>
            )}

            {sneaker.cta.title && (
              <h3 className="mt-2 text-3xl font-extrabold leading-tight text-green-800 sm:text-4xl">
                {sneaker.cta.title}
              </h3>
            )}

            {sneaker.cta.description && (
              <p className="mt-3 max-w-3xl text-lg text-neutral-700">
                {sneaker.cta.description}
              </p>
            )}

            {ctaBullets.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {ctaBullets.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-green-200 bg-white/70 px-4 py-3 text-sm font-medium text-neutral-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {sneaker.cta.primaryHref && sneaker.cta.primaryLabel && (
                <Link
                  href={sneaker.cta.primaryHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-green-700 active:scale-95"
                >
                  {sneaker.cta.primaryLabel}
                </Link>
              )}

              {sneaker.cta.secondaryHref && sneaker.cta.secondaryLabel && (
                <Link
                  href={sneaker.cta.secondaryHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-green-600 px-6 py-3 text-base font-bold text-green-700 transition hover:bg-green-50"
                >
                  {sneaker.cta.secondaryLabel}
                </Link>
              )}
            </div>
          </section>
        )}

        {sneaker.resellerInsight && (
          <section className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-green-600">
              Reseller Insight
            </p>
            <h2 className="mt-2 text-2xl font-bold text-black">
              Flip Potential: {sneaker.name}
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {sneaker.resellerInsight.flipScore && (
                <InsightStat
                  label="Flip Score"
                  value={sneaker.resellerInsight.flipScore}
                />
              )}
              {sneaker.resellerInsight.liquidity && (
                <InsightStat
                  label="Liquidity"
                  value={sneaker.resellerInsight.liquidity}
                />
              )}
              {sneaker.resellerInsight.typicalMargin && (
                <InsightStat
                  label="Typical Margin"
                  value={sneaker.resellerInsight.typicalMargin}
                />
              )}
              {sneaker.resellerInsight.bestUse && (
                <InsightStat
                  label="Best Use"
                  value={sneaker.resellerInsight.bestUse}
                />
              )}
            </div>

            {resellerInsightBullets.length > 0 && (
              <ul className="mt-5 list-disc space-y-2 pl-5 text-neutral-700">
                {resellerInsightBullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        {(careIntro.length > 0 ||
          careTools.length > 0 ||
          carePrep.length > 0 ||
          careCleaning.length > 0) && (
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-green-600">
                Care &amp; Maintenance
              </h2>
              <h3 className="text-3xl font-bold text-black">
                Maintaining Your {sneaker.name}
              </h3>
            </div>

            {careIntro.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-neutral-700">
                {paragraph}
              </p>
            ))}

            {careTools.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-black">
                  Essential Tools and Supplies
                </h4>
                <p className="text-neutral-700">
                  To start off, collect the following tools and supplies:
                </p>

                <ul className="space-y-3 text-neutral-700">
                  {careTools.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 rounded-xl border border-black/10 bg-neutral-50 px-4 py-3"
                    >
                      <span className="mt-0.5 text-green-500">✓</span>
                      <span>
                        <strong>{item.label}:</strong> {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {carePrep.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-black">
                  Pre-Cleaning Preparations
                </h4>
                <p className="text-neutral-700">
                  Before you begin the cleaning routine, it&apos;s essential to
                  ready your sneakers:
                </p>

                <div className="space-y-3">
                  {carePrep.map((item, i) => (
                    <StepCard key={i} {...item} />
                  ))}
                </div>
              </div>
            )}

            {careCleaning.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-black">
                  The Cleaning Process
                </h4>

                <div className="space-y-3">
                  {careCleaning.map((item, i) => (
                    <StepCard key={i} {...item} />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {relatedModels.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-600">
              Related Models
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedModels.map((model, i) => (
                <Link
                  key={i}
                  href={model.href}
                  className="rounded-2xl border border-black/10 bg-neutral-50 px-5 py-4 font-medium transition hover:border-green-500 hover:bg-green-50"
                >
                  {model.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="border-t border-black/10 pt-6">
          <Link
            href="/encyclopedia/a-z"
            className="text-sm font-medium text-neutral-500 hover:text-black"
          >
            ← Back to Sneaker Encyclopedia A–Z
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/10 p-5 text-center">
      <p className="text-xs uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}

function MarketStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-green-200 bg-white/80 p-4">
      <p className="text-xs uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-2 text-xl font-bold text-neutral-900">{value}</p>
    </div>
  );
}

function InsightStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-2 text-lg font-bold text-neutral-900">{value}</p>
    </div>
  );
}

function StepCard({
  step,
  label,
  desc,
}: {
  step: string;
  label: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-black/10 bg-neutral-50 px-4 py-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
        {step}
      </span>
      <div>
        <p className="font-semibold text-black">{label}</p>
        <p className="mt-0.5 text-neutral-700">{desc}</p>
      </div>
    </div>
  );
}