import Link from "next/link";
import { prisma } from "@/lib/prisma";

function formatDateTime(value: Date | null) {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getStatus(article: {
  isPublished: boolean;
  scheduledFor: Date | null;
}) {
  if (article.isPublished) return "Published";
  if (article.scheduledFor) return "Scheduled";
  return "Draft";
}

function getStatusClasses(status: string) {
  if (status === "Published") {
    return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  }

  if (status === "Scheduled") {
    return "bg-amber-50 text-amber-700 border border-amber-200";
  }

  return "bg-neutral-100 text-neutral-700 border border-black/10";
}

export default async function NewsSchedulePage() {
  const articles = await prisma.newsArticle.findMany({
    orderBy: [
      { isPublished: "asc" },
      { scheduledFor: "asc" },
      { createdAt: "desc" },
    ],
    take: 50,
  });

  const publishedCount = articles.filter((article) => article.isPublished).length;
  const scheduledCount = articles.filter(
    (article) => !article.isPublished && article.scheduledFor
  ).length;
  const draftCount = articles.filter(
    (article) => !article.isPublished && !article.scheduledFor
  ).length;

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-8 text-black sm:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
              SneakPrice Admin
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
              News Schedule
            </h1>
            <p className="mt-4 max-w-3xl text-base text-neutral-600 sm:text-lg">
              Monitor drafts, scheduled articles, and published stories across
              the SneakPrice newsroom.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/news-generator"
              className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Open Generator
            </Link>
            <Link
              href="/news"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-50"
            >
              View News Feed
            </Link>
          </div>
        </div>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Drafts
            </p>
            <p className="mt-3 text-3xl font-bold">{draftCount}</p>
            <p className="mt-2 text-sm text-neutral-600">
              Articles saved but not scheduled yet.
            </p>
          </div>

          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Scheduled
            </p>
            <p className="mt-3 text-3xl font-bold text-amber-800">
              {scheduledCount}
            </p>
            <p className="mt-2 text-sm text-amber-700">
              Drafts queued for automatic publishing.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Published
            </p>
            <p className="mt-3 text-3xl font-bold text-emerald-800">
              {publishedCount}
            </p>
            <p className="mt-2 text-sm text-emerald-700">
              Stories currently live on SneakPrice News.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-black/10 bg-white shadow-sm">
          <div className="border-b border-black/10 px-6 py-5">
            <h2 className="text-xl font-bold">Article Queue</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Newest articles, scheduled stories, and published content in one
              place.
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                SneakPrice Queue
              </p>
              <h3 className="mt-3 text-2xl font-bold">No articles yet</h3>
              <p className="mt-3 text-neutral-600">
                Generate your first article to populate the schedule dashboard.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-black/10 text-left">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      Title
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      Sector
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      Category
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      Scheduled
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      Published
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {articles.map((article) => {
                    const status = getStatus(article);

                    return (
                      <tr
                        key={article.id}
                        className="border-b border-black/5 align-top last:border-b-0"
                      >
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="max-w-[340px]">
                            <p className="font-semibold leading-6 text-black">
                              {article.title}
                            </p>
                            <p className="mt-2 text-sm text-neutral-500">
                              /news/{article.slug}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-sm text-neutral-700">
                          {article.sector || "—"}
                        </td>

                        <td className="px-6 py-5 text-sm text-neutral-700">
                          {article.category}
                        </td>

                        <td className="px-6 py-5 text-sm text-neutral-700">
                          {formatDateTime(article.scheduledFor)}
                        </td>

                        <td className="px-6 py-5 text-sm text-neutral-700">
                          {formatDateTime(article.publishedAt)}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-2">


{article.isPublished ? (
  <Link
    href={`/news/${article.slug}`}
    className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-neutral-50"
  >
    View
  </Link>
) : (
  <Link
    href={`/admin/news-schedule/${article.id}`}
    className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-neutral-50"
  >
    Preview
  </Link>
)}




                            <Link
  href={`/admin/news-schedule/${article.id}`}
  className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-neutral-50"
>
  Edit
</Link>

                            {!article.isPublished ? (
                              <form
                                action="/api/admin/news-actions"
                                method="POST"
                                className="inline"
                              >
                                <input type="hidden" name="id" value={article.id} />
                                <input
                                  type="hidden"
                                  name="action"
                                  value="publish"
                                />
                                <button
                                  type="submit"
                                  className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                                >
                                  Publish Now
                                </button>
                              </form>
                            ) : null}

                            {!article.isPublished && article.scheduledFor ? (
                              <form
                                action="/api/admin/news-actions"
                                method="POST"
                                className="inline"
                              >
                                <input type="hidden" name="id" value={article.id} />
                                <input
                                  type="hidden"
                                  name="action"
                                  value="unschedule"
                                />
                                <button
                                  type="submit"
                                  className="rounded-xl bg-amber-500 px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                                >
                                  Unschedule
                                </button>
                              </form>
                            ) : null}

                            {!article.isPublished ? (
                              <form
                                action="/api/admin/news-actions"
                                method="POST"
                                className="inline"
                              >
                                <input type="hidden" name="id" value={article.id} />
                                <input
                                  type="hidden"
                                  name="action"
                                  value="delete"
                                />
                                <button
                                  type="submit"
                                  className="rounded-xl bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                                >
                                  Delete
                                </button>
                              </form>
                            ) : null}

                            <Link
                              href="/admin/news-generator"
                              className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-neutral-50"
                            >
                              New Draft
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}