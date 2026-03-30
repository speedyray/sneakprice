import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type ArticleImage =
  | string
  | {
      url?: string;
      caption?: string;
    };

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await prisma.newsArticle.findUnique({
    where: { slug },
  });

  if (!article || !article.isPublished) {
    notFound();
  }

  // Json scalars can be missing from the inferred findUnique type when using a
  // driver adapter; the column exists on NewsArticle at runtime.
  const imagesJson = (article as Record<string, unknown>).images;
  const images: ArticleImage[] = Array.isArray(imagesJson)
    ? (imagesJson as ArticleImage[])
    : [];

  // RELATED ARTICLES 🔥
  const related = await prisma.newsArticle.findMany({
    where: {
      category: article.category,
      id: { not: article.id },
      isPublished: true,
    },
    take: 3,
  });

  const contentBlocks = (
    article.body.includes("\n\n")
      ? article.body.split("\n\n")
      : article.body.split("\n")
  )
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-black sm:px-6 md:py-10">
      <article className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium">
              {article.category}
            </span>

            {typeof article.flipScore === "number" && (
              <span className="text-sm font-semibold text-emerald-700">
                Flip Score {article.flipScore}/100
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-4 max-w-3xl text-base text-neutral-600 sm:text-lg">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* HERO IMAGE */}
        <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-100 to-neutral-200">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-[260px] w-full object-cover sm:h-[320px] md:h-[420px]"
            />
          ) : (
            <div className="flex h-[260px] items-center justify-center sm:h-[320px] md:h-[420px]">
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                  SneakPrice News
                </p>
                <p className="mt-3 text-2xl font-bold">
                  Sneaker Market Intelligence
                </p>
              </div>
            </div>
          )}
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* ARTICLE */}
          <div className="min-w-0">
            <section>
              <h2 className="mb-4 text-2xl font-bold">What happened</h2>

              <div className="space-y-6 text-[16.5px] leading-7 text-neutral-800">
                {contentBlocks.map((block, i) => {
                  // SUBHEADINGS
                  if (block.startsWith("## ")) {
                    return (
                      <h3
                        key={i}
                        className="pt-4 text-2xl font-bold leading-tight"
                      >
                        {block.replace(/^##\s+/, "")}
                      </h3>
                    );
                  }

                  return (
                    <div key={i}>
                      <p>{block}</p>

                      {/* INLINE IMAGE INJECTION 🔥 */}
                      {i === 1 && images[0] && (
                        <div className="my-8 overflow-hidden rounded-2xl">
                          <img
                            src={
                              typeof images[0] === "string"
                                ? images[0]
                                : images[0]?.url
                            }
                            className="w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FLIP INSIGHT 🔥 */}
            {(article.flipScore ||
              article.actionLabel ||
              article.actionNote) && (
              <div className="my-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  SneakPrice Flip Insight
                </p>

                {typeof article.flipScore === "number" && (
                  <p className="mt-2 text-2xl font-bold text-emerald-800">
                    Score: {article.flipScore}/100
                  </p>
                )}

                {article.actionLabel && (
                  <p className="mt-3 font-semibold">
                    Action: {article.actionLabel}
                  </p>
                )}

                {article.actionNote && (
                  <p className="mt-2 text-sm text-neutral-700">
                    {article.actionNote}
                  </p>
                )}
              </div>
            )}

            {/* MARKET ANGLE */}
            {article.marketAngle && (
              <section className="mt-10">
                <h2 className="mb-3 text-2xl font-bold">Market angle</h2>
                <p className="text-[16.5px] leading-7 text-neutral-800">
                  {article.marketAngle}
                </p>
              </section>
            )}

            {/* RELATED ARTICLES 🔥 */}
            {related.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-6 text-2xl font-bold">
                  More from SneakPrice
                </h2>

                <div className="grid gap-6 md:grid-cols-3">
                  {related.map((item) => (
                    <a
                      key={item.id}
                      href={`/news/${item.slug}`}
                      className="block rounded-xl border p-4 transition hover:shadow-md"
                    >
                      <p className="text-sm text-neutral-500">
                        {item.category}
                      </p>
                      <h3 className="mt-2 font-semibold">{item.title}</h3>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-5">
              <h3 className="text-lg font-bold">Flip Summary</h3>

              {typeof article.flipScore === "number" ? (
                <p className="mt-3 text-3xl font-bold text-emerald-700">
                  {article.flipScore}/100
                </p>
              ) : (
                <p className="mt-3 text-sm text-neutral-500">
                  No flip score available yet.
                </p>
              )}

              {article.actionLabel && (
                <p className="mt-4 font-semibold">
                  Action: {article.actionLabel}
                </p>
              )}

              {article.actionNote && (
                <p className="mt-2 text-sm text-neutral-600">
                  {article.actionNote}
                </p>
              )}

              {/* TRUST BOOST */}
              <p className="mt-4 text-xs text-neutral-500">
                Based on resale demand, pricing spread, and market velocity.
              </p>
            </div>

            {(article.sourceName || article.sourceUrl) && (
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="text-lg font-bold">Source</h3>

                {article.sourceName && (
                  <p className="mt-3 text-sm text-neutral-700">
                    {article.sourceName}
                  </p>
                )}

                {article.sourceUrl && (
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold underline"
                  >
                    Read original source
                  </a>
                )}
              </div>
            )}

            {article.publishedAt && (
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="text-lg font-bold">Published</h3>
                <p className="mt-3 text-sm text-neutral-700">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </aside>
        </div>
      </article>
    </main>
  );
}