import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function NewsPage() {
  const articles = await prisma.newsArticle.findMany({
    where: { isPublished: true },
    orderBy: [
      { publishedAt: "desc" },
      { createdAt: "desc" },
    ],
  });

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            SneakPrice News
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Sneaker & Fashion Market News
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-600">
            Curated sneaker, streetwear, and resale intelligence with market context.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-2xl border border-black/10 bg-white p-8 text-neutral-500">
            No news articles published yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:border-black/20"
              >
                {article.coverImage ? (
                  <div className="aspect-[16/10] bg-neutral-100">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}

                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-black">
                      {article.category}
                    </span>
                    {typeof article.flipScore === "number" ? (
                      <span className="text-sm font-semibold text-emerald-700">
                        Flip Score {article.flipScore}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="text-xl font-bold leading-tight">
                    {article.title}
                  </h2>

                  {article.excerpt ? (
                    <p className="text-sm text-neutral-600">{article.excerpt}</p>
                  ) : null}

                  {article.actionLabel ? (
                    <div className="pt-2 text-sm font-semibold text-black">
                      Action: {article.actionLabel}
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}