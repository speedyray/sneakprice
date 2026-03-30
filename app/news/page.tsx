import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function NewsHomepage() {
  const articles = await prisma.newsArticle.findMany({
    where: {
      isPublished: true,
    },
    orderBy: [
      { publishedAt: "desc" },
      { createdAt: "desc" },
    ],
    take: 12,
  });

  const featured = articles[0];
  const secondary = articles.slice(1, 3);
  const latest = articles.slice(3);

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-black sm:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
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

        {/* FEATURED */}
        {featured && (
          <section className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
            <Link
              href={`/news/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl border border-black/10 bg-white transition hover:shadow-lg"
            >
              {/* IMAGE */}
              <div className="overflow-hidden bg-neutral-100">
                {featured.coverImage ? (
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="h-[240px] w-full object-cover transition duration-300 group-hover:scale-[1.02] sm:h-[300px] lg:h-[380px]"
                  />
                ) : (
                  <div className="flex h-[240px] items-center justify-center bg-gradient-to-r from-neutral-100 to-neutral-200 sm:h-[300px] lg:h-[380px]">
                    <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                      SneakPrice News
                    </p>
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6 sm:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium">
                    {featured.category}
                  </span>

                  {typeof featured.flipScore === "number" && (
                    <span className="text-sm font-semibold text-emerald-700">
                      Flip Score {featured.flipScore}/100
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                  {featured.title}
                </h2>

                {featured.excerpt && (
                  <p className="mt-4 text-base leading-7 text-neutral-600">
                    {featured.excerpt}
                  </p>
                )}

                <p className="mt-5 text-sm font-semibold text-black">
                  Read article
                </p>
              </div>
            </Link>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* SIGNAL */}
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

              {/* SECONDARY ARTICLES */}
              {secondary.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-black/10 bg-white transition hover:shadow-md"
                >
                  {article.coverImage && (
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="h-40 w-full object-cover"
                    />
                  )}

                  <div className="p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
                        {article.category}
                      </span>

                      {typeof article.flipScore === "number" && (
                        <span className="text-xs font-semibold text-emerald-700">
                          {article.flipScore}/100
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold leading-snug">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-sm text-neutral-600">
                      {article.excerpt}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-black">
                      Read more
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* LATEST STORIES (UPDATED 🔥) */}
        {latest.length > 0 && (
          <section className="mt-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Latest stories
              </h2>
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
                    {/* IMAGE LEFT */}
                    <div className="bg-neutral-100">
                      {article.coverImage ? (
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="h-full w-full object-cover md:h-[200px]"
                        />
                      ) : (
                        <div className="flex h-full min-h-[160px] items-center justify-center bg-gradient-to-r from-neutral-100 to-neutral-200">
                          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                            SneakPrice News
                          </p>
                        </div>
                      )}
                    </div>

                    {/* CONTENT RIGHT */}
                    <div className="p-5 md:p-6">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
                          {article.category}
                        </span>

                        {typeof article.flipScore === "number" && (
                          <span className="text-xs font-semibold text-emerald-700">
                            Flip Score {article.flipScore}/100
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold leading-snug">
                        {article.title}
                      </h3>

                      <p className="mt-3 text-sm text-neutral-600">
                        {article.excerpt}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-semibold text-black">
                          Read article
                        </span>

                        {article.publishedAt && (
                          <span className="text-xs text-neutral-500">
                            {new Date(
                              article.publishedAt
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}