import Link from "next/link";
import { prisma } from "@/lib/prisma";

const SECTOR_OPTIONS = [
  "All",
  "Sneakers",
  "Fashion",
  "Leather Goods",
  "Watches",
  "Jewelry",
  "Beauty",
  "Sport & Lifestyle",
];

const CATEGORY_OPTIONS = [
  "All",
  "Market",
  "Trend",
  "Editorial",
  "Flip Watch",
  "Buyer Guide",
  "Report",
];

type NewsPageProps = {
  searchParams?: Promise<{
    sector?: string;
    category?: string;
  }>;
};

function isValidOption(value: string, options: string[]) {
  return value === "All" || options.includes(value);
}

export default async function NewsHomepage({ searchParams }: NewsPageProps) {
  const resolvedSearchParams = await searchParams;

  const selectedSector = resolvedSearchParams?.sector?.trim() || "All";
  const selectedCategory = resolvedSearchParams?.category?.trim() || "All";

  const activeSector = isValidOption(selectedSector, SECTOR_OPTIONS)
    ? selectedSector
    : "All";

  const activeCategory = isValidOption(selectedCategory, CATEGORY_OPTIONS)
    ? selectedCategory
    : "All";

  const articles = await prisma.newsArticle.findMany({
    where: {
      isPublished: true,
      ...(activeSector !== "All" ? { sector: activeSector } : {}),
      ...(activeCategory !== "All" ? { category: activeCategory } : {}),
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 20,
  });

  const featured = articles[0];
  const secondary = articles.slice(1, 3);
  const latest = articles.slice(3);

  function getFilterHref(sector: string, category: string) {
    const params = new URLSearchParams();

    if (sector !== "All") {
      params.set("sector", sector);
    }

    if (category !== "All") {
      params.set("category", category);
    }

    const query = params.toString();
    return query ? `/news?${query}` : "/news";
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-black sm:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
              SneakPrice News
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
              Sneaker & Fashion Market Intelligence
            </h1>
            <p className="mt-4 max-w-3xl text-base text-neutral-600 sm:text-lg">
              Daily signals on sneaker resale, fashion trends, flip opportunities,
              and what matters now.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-neutral-50 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Live Focus
            </p>
            <p className="mt-2 text-sm text-neutral-700">
              Retro pairs, low-profile sneakers, and fashion-driven market signals.
            </p>
          </div>
        </div>

        <div className="mb-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Sectors
          </p>

          <div className="flex flex-wrap gap-3">
            {SECTOR_OPTIONS.map((sector) => {
              const isActive = activeSector === sector;

              return (
                <Link
                  key={sector}
                  href={getFilterHref(sector, activeCategory)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-black text-white"
                      : "border border-black/10 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-black",
                  ].join(" ")}
                >
                  {sector}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Categories
          </p>

          <div className="flex flex-wrap gap-3">
            {CATEGORY_OPTIONS.map((category) => {
              const isActive = activeCategory === category;

              return (
                <Link
                  key={category}
                  href={getFilterHref(activeSector, category)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-black text-white"
                      : "border border-black/10 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-black",
                  ].join(" ")}
                >
                  {category}
                </Link>
              );
            })}
          </div>

          <div className="mt-3 text-sm text-neutral-500">
            Showing:{" "}
            <span className="font-semibold text-black">{activeSector}</span>
            {" / "}
            <span className="font-semibold text-black">{activeCategory}</span>
          </div>
        </div>

        {featured ? (
         <section className="mb-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
            <Link
              href={`/news/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl border border-black/10 bg-white transition hover:shadow-lg"
            >
              <div className="overflow-hidden bg-neutral-100">
                {featured.coverImage ? (
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="h-[240px] w-full object-cover transition duration-300 group-hover:scale-[1.02] sm:h-[300px] lg:h-[360px]"
                  />
                ) : (
                  <div className="flex h-[240px] items-center justify-center bg-gradient-to-r from-neutral-100 to-neutral-200 sm:h-[300px] lg:h-[360px]">
                    <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                      SneakPrice News
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col p-6 sm:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  {featured.sector ? (
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium">
                      {featured.sector}
                    </span>
                  ) : null}

                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium">
                    {featured.category}
                  </span>

                  {typeof featured.flipScore === "number" ? (
                    <span className="text-sm font-semibold text-emerald-700">
                      Flip Score {featured.flipScore}/100
                    </span>
                  ) : null}
                </div>

                <h2 className="max-w-2xl text-2xl font-bold leading-tight sm:text-3xl">
                  {featured.title}
                </h2>

                {featured.excerpt ? (
                  <p className="mt-4 text-base leading-7 text-neutral-600">
                    {featured.excerpt}
                  </p>
                ) : null}

                <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Featured Signal
                  </p>

                  {featured.marketAngle ? (
                    <p className="mt-2 text-sm leading-6 text-neutral-700">
                      {featured.marketAngle.length > 190
                        ? `${featured.marketAngle.slice(0, 190)}...`
                        : featured.marketAngle}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm leading-6 text-neutral-700">
                      Strong demand is forming around recognizable products with
                      better wearability, cleaner styling, and stronger price
                      discipline.
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                    {featured.actionLabel ? (
                      <span>
                        <span className="font-semibold text-black">Action:</span>{" "}
                        {featured.actionLabel}
                      </span>
                    ) : null}

                    {featured.publishedAt ? (
                      <span>
                        {new Date(featured.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    ) : null}
                  </div>
                </div>

               <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4">
  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
    {featured.contentType ? (
      <span className="rounded-full bg-neutral-100 px-3 py-1 font-medium text-neutral-700">
        {featured.contentType}
      </span>
    ) : null}

    {featured.region ? (
      <span>{featured.region}</span>
    ) : null}

    {featured.brandFocus ? (
      <span>
        <span className="font-semibold text-black">Brand:</span> {featured.brandFocus}
      </span>
    ) : null}

    {featured.publishedAt ? (
      <span>
        {new Date(featured.publishedAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    ) : null}
  </div>

  {Array.isArray(featured.tags) && featured.tags.length > 0 ? (
    <div className="mt-4 flex flex-wrap gap-2">
      {featured.tags.slice(0, 4).map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
        >
        
        </span>
      ))}
    </div>
  ) : null}

  <div className="mt-4">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
      Why it matters
    </p>
    <p className="mt-2 text-sm leading-6 text-neutral-700">
      This story signals where buyer demand is strengthening and what SneakPrice
      users should watch next across product, pricing, and market momentum.
    </p>
  </div>

  <div className="mt-5 flex items-center justify-between">
    <p className="text-sm font-semibold text-neutral-700 transition group-hover:text-black">
      Read article
    </p>

    {typeof featured.flipScore === "number" ? (
      <span className="text-sm font-semibold text-emerald-700">
        {featured.flipScore}/100
      </span>
    ) : null}
  </div>
</div>



              </div>
            </Link>

            <div className="space-y-6">
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  SneakPrice Signal
                </p>
                <h3 className="mt-3 text-xl font-bold">
                  What the market is rewarding right now
                </h3>
                <p className="mt-3 text-sm text-neutral-700">
                  Wearability, recognizable silhouettes, and culturally relevant
                  design are outperforming loud short-term hype.
                </p>
              </div>

              {secondary.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-black/10 bg-white transition hover:shadow-md"
                >
                  {article.coverImage ? (
                    <div className="overflow-hidden">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}

                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      {article.sector ? (
                        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
                          {article.sector}
                        </span>
                      ) : null}

                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
                        {article.category}
                      </span>

                      {typeof article.flipScore === "number" ? (
                        <span className="text-xs font-semibold text-emerald-700">
                          {article.flipScore}/100
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-lg font-bold leading-snug">
                      {article.title}
                    </h3>

                    {article.excerpt ? (
                      <p className="mt-3 text-sm text-neutral-600">
                        {article.excerpt}
                      </p>
                    ) : null}

                    <p className="mt-4 text-sm font-semibold text-neutral-700 transition group-hover:text-black">
                      Read more
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="rounded-3xl border border-dashed border-black/10 bg-neutral-50 px-6 py-16 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
              SneakPrice News
            </p>
            <h2 className="mt-3 text-3xl font-bold">No published articles yet</h2>
            <p className="mt-3 text-neutral-600">
              No published articles found for this filter combination.
            </p>
          </section>
        )}

        {latest.length > 0 ? (
          <section className="mt-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold sm:text-3xl">Latest stories</h2>
              <p className="text-sm text-neutral-500">
                Market signals, resale shifts, and fashion momentum
              </p>
            </div>

            <div className="space-y-6">
              {latest.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group overflow-hidden rounded-3xl border border-black/10 bg-white transition hover:shadow-lg"
                >
                  <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">
                    <div className="overflow-hidden bg-neutral-100">
                      {article.coverImage ? (
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03] md:h-[200px]"
                        />
                      ) : (
                        <div className="flex h-full min-h-[160px] items-center justify-center bg-gradient-to-r from-neutral-100 to-neutral-200">
                          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                            SneakPrice News
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="p-5 md:p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        {article.sector ? (
                          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
                            {article.sector}
                          </span>
                        ) : null}

                        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
                          {article.category}
                        </span>

                        {typeof article.flipScore === "number" ? (
                          <span className="text-xs font-semibold text-emerald-700">
                            Flip Score {article.flipScore}/100
                          </span>
                        ) : null}
                      </div>

                      <h3 className="text-xl font-bold leading-snug">
                        {article.title}
                      </h3>

                      {article.excerpt ? (
                        <p className="mt-3 text-sm text-neutral-600">
                          {article.excerpt}
                        </p>
                      ) : null}

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-semibold text-neutral-700 transition group-hover:text-black">
                          Read article
                        </span>

                        {article.publishedAt ? (
                          <span className="text-xs text-neutral-500">
                            {new Date(article.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}