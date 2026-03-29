import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

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

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <article className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium">
              {article.category}
            </span>
            {typeof article.flipScore === "number" ? (
              <span className="text-sm font-semibold text-emerald-700">
                Flip Score {article.flipScore}/100
              </span>
            ) : null}
          </div>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            {article.title}
          </h1>

          {article.excerpt ? (
            <p className="mt-4 text-lg text-neutral-600">{article.excerpt}</p>
          ) : null}
        </div>

        {article.coverImage ? (
          <div className="mb-8 overflow-hidden rounded-2xl bg-neutral-100">
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        <div className="grid gap-8 md:grid-cols-[1fr_280px]">
          <div className="space-y-6">
            <section>
              <h2 className="mb-3 text-2xl font-bold">What happened</h2>
              <div className="whitespace-pre-line text-neutral-800">
                {article.body}
              </div>
            </section>

            {article.marketAngle ? (
              <section>
                <h2 className="mb-3 text-2xl font-bold">Market angle</h2>
                <p className="text-neutral-800">{article.marketAngle}</p>
              </section>
            ) : null}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-5">
              <h3 className="text-lg font-bold">Flip Summary</h3>

              {typeof article.flipScore === "number" ? (
                <p className="mt-3 text-3xl font-bold text-emerald-700">
                  {article.flipScore}/100
                </p>
              ) : null}

              {article.actionLabel ? (
                <p className="mt-4 font-semibold">Action: {article.actionLabel}</p>
              ) : null}

              {article.actionNote ? (
                <p className="mt-2 text-sm text-neutral-600">{article.actionNote}</p>
              ) : null}
            </div>

            {(article.sourceName || article.sourceUrl) ? (
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="text-lg font-bold">Source</h3>
                {article.sourceName ? (
                  <p className="mt-3 text-sm text-neutral-700">{article.sourceName}</p>
                ) : null}
                {article.sourceUrl ? (
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-black underline"
                  >
                    Read original source
                  </a>
                ) : null}
              </div>
            ) : null}
          </aside>
        </div>
      </article>
    </main>
  );
}