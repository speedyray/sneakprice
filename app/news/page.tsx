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



        {featured ? (
          <section className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
            <Link
              href={`/news/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl border border-black/10 bg-white transition hover:shadow-lg"
            >
              <div className="overflow-hidden bg-neutral-100">
                {featured.coverImage ? (
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="h-[280px] w-full object-cover transition duration-300 group-hover:scale-[1.02] sm:h-[360px] lg:h-[460px]"
                  />
                ) : (
                  <div className="flex h-[280px] items-center justify-center bg-gradient-to-r from-neutral-100 to-neutral-200 sm:h-[360px] lg:h-[460px]">
                    <div className="text-center">
                      <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                        SneakPrice News
                      </p>
                      <p className="mt-3 text-2xl font-bold text-black">
                        Market Intelligence
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium">
                    {featured.category}
                  </span>

                  {typeof featured.flipScore === "number" ? (
                    <span className="text-sm font-semibold text-emerald-700">
                      Flip Score {featured.flipScore}/100
                    </span>
                  ) : null}
                </div>

                <h2 className="text-2xl font-bold leading-tight transition group-hover:text-neutral-700 sm:text-3xl">
                  {featured.title}
                </h2>

                {featured.excerpt ? (
                  <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg">
                    {featured.excerpt}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                  {featured.publishedAt ? (
                    <span>
                      {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  ) : null}

                  <span className="font-semibold text-black">Read article</span>
                </div>
              </div>
            </Link>

            <div className="space-y-6">
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  SneakPrice Signal
                </p>
                <h3 className="mt-3 text-2xl font-bold">
                  What the market is rewarding right now
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-700">
                  Wearability, recognizable silhouettes, and culturally relevant
                  design are outperforming loud short-term hype.
                </p>
              </div>

              {secondary.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group block rounded-3xl border border-black/10 bg-white p-5 transition hover:shadow-md"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
                      {article.category}
                    </span>

                    {typeof article.flipScore === "number" ? (
                      <span className="text-xs font-semibold text-emerald-700">
                        {article.flipScore}/100
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-xl font-bold leading-snug transition group-hover:text-neutral-700">
                    {article.title}
                  </h3>

                  {article.excerpt ? (
                    <p className="mt-3 text-sm leading-6 text-neutral-600">
                      {article.excerpt}
                    </p>
                  ) : null}

                  <p className="mt-4 text-sm font-semibold text-black">
                    Read more
                  </p>
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
              Publish your first story to populate the homepage feed.
            </p>
          </section>
        )}

        {latest.length > 0 ? (
          <section className="mt-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold sm:text-3xl">Latest stories</h2>
              <p className="text-sm text-neutral-500">
                Market signals, resale shifts, and fashion momentum
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {latest.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group overflow-hidden rounded-3xl border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="bg-neutral-100">
                    {article.coverImage ? (
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="h-56 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-56 items-center justify-center bg-gradient-to-r from-neutral-100 to-neutral-200">
                        <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                          SneakPrice News
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
                        {article.category}
                      </span>

                      {typeof article.flipScore === "number" ? (
                        <span className="text-xs font-semibold text-emerald-700">
                          Flip Score {article.flipScore}/100
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-xl font-bold leading-snug transition group-hover:text-neutral-700">
                      {article.title}
                    </h3>

                    {article.excerpt ? (
                      <p className="mt-3 text-sm leading-6 text-neutral-600">
                        {article.excerpt}
                      </p>
                    ) : null}

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-black">
                        Read article
                      </span>

                      {article.publishedAt ? (
                        <span className="text-xs text-neutral-500">
                          {new Date(article.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      ) : null}
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