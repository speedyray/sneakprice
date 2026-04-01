import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

const SECTOR_OPTIONS = [
  "Sneakers",
  "Fashion",
  "Leather Goods",
  "Watches",
  "Jewelry",
  "Beauty",
  "Sport & Lifestyle",
];

const CATEGORY_OPTIONS = [
  "Market",
  "Trend",
  "Editorial",
  "Flip Watch",
  "Buyer Guide",
  "Report",
];

const CONTENT_TYPE_OPTIONS = [
  "article",
  "guide",
  "roundup",
  "report",
  "watchlist",
];

function toDateTimeLocal(value: Date | null) {
  if (!value) return "";

  const d = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

type PageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    saved?: string;
  }>;
};

export default async function EditNewsArticlePage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const articleId = Number(id);

  if (!articleId || Number.isNaN(articleId)) {
    notFound();
  }

  const article = await prisma.newsArticle.findUnique({
    where: { id: articleId },
  });

  if (!article) {
    notFound();
  }

  const tagsValue = Array.isArray(article.tags)
    ? article.tags.map(String).join(", ")
    : "";

  const wasSaved = resolvedSearchParams?.saved === "1";

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-8 text-black sm:px-6 md:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
              SneakPrice Admin
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
              Edit Article
            </h1>
            <p className="mt-4 max-w-3xl text-base text-neutral-600 sm:text-lg">
              Update scheduled, draft, or published content.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/news-schedule"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-50"
            >
              Back to Schedule
            </Link>
            <Link
              href={`/news/${article.slug}`}
              className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              View Article
            </Link>
          </div>
        </div>

        {wasSaved ? (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Article updated successfully.
          </div>
        ) : null}

        <form
          action="/api/admin/news-update"
          method="POST"
          className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
        >
          <input type="hidden" name="id" value={article.id} />

          <div className="grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">Title</label>
              <input
                name="title"
                defaultValue={article.title}
                className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Slug</label>
              <input
                name="slug"
                defaultValue={article.slug}
                className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Excerpt</label>
              <textarea
                name="excerpt"
                rows={3}
                defaultValue={article.excerpt || ""}
                className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold">Sector</label>
                <select
                  name="sector"
                  defaultValue={article.sector || ""}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                >
                  <option value="">—</option>
                  {SECTOR_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Category</label>
                <select
                  name="category"
                  defaultValue={article.category}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Content type
                </label>
                <select
                  name="contentType"
                  defaultValue={article.contentType || ""}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                >
                  <option value="">—</option>
                  {CONTENT_TYPE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Cover image</label>
              <input
                name="coverImage"
                defaultValue={article.coverImage || ""}
                className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Region</label>
                <input
                  name="region"
                  defaultValue={article.region || ""}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Brand focus
                </label>
                <input
                  name="brandFocus"
                  defaultValue={article.brandFocus || ""}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Tags</label>
              <input
                name="tags"
                defaultValue={tagsValue}
                className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold">Flip score</label>
                <input
                  name="flipScore"
                  type="number"
                  defaultValue={article.flipScore ?? ""}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Action label
                </label>
                <input
                  name="actionLabel"
                  defaultValue={article.actionLabel || ""}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Scheduled publish time
                </label>
                <input
                  name="scheduledFor"
                  type="datetime-local"
                  defaultValue={toDateTimeLocal(article.scheduledFor)}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Market angle</label>
              <textarea
                name="marketAngle"
                rows={4}
                defaultValue={article.marketAngle || ""}
                className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Action note</label>
              <textarea
                name="actionNote"
                rows={3}
                defaultValue={article.actionNote || ""}
                className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Body</label>
              <textarea
                name="body"
                rows={18}
                defaultValue={article.body}
                className="w-full rounded-2xl border border-black/10 px-4 py-3 font-mono text-sm outline-none transition focus:border-black"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Source name</label>
                <input
                  name="sourceName"
                  defaultValue={article.sourceName || ""}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Source URL</label>
                <input
                  name="sourceUrl"
                  defaultValue={article.sourceUrl || ""}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}