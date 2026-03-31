"use client";

import { useState } from "react";

type GeneratedArticle = {
  title: string;
  slug: string;
  excerpt: string;
  sector: string;
  category: string;
  contentType: string;
  coverImage: string;
  sourceName: string;
  sourceUrl: string;
  body: string;
  marketAngle: string;
  flipScore: number | null;
  actionLabel: string;
  actionNote: string;
  tags: string[];
  region: string;
  brandFocus: string;
  scheduledFor: string | null;
  isPublished: boolean;
};

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

export default function NewsGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [sector, setSector] = useState("Sneakers");
  const [category, setCategory] = useState("Market");
  const [contentType, setContentType] = useState("article");
  const [angle, setAngle] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [coverImage, setCoverImage] = useState("/news/");
  const [flipScoreHint, setFlipScoreHint] = useState("");
  const [actionLabelHint, setActionLabelHint] = useState("");
  const [region, setRegion] = useState("Global");
  const [brandFocus, setBrandFocus] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [generated, setGenerated] = useState<GeneratedArticle | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setSuccess("");
    setGenerated(null);

    try {
      const res = await fetch("/api/admin/news-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "generate",
          topic,
          sector,
          category,
          contentType,
          angle,
          targetKeyword,
          coverImage,
          flipScoreHint,
          actionLabelHint,
          region,
          brandFocus,
          scheduledFor: scheduledFor || null,
          tags: tagsInput
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate article.");
      }

      setGenerated(data.article);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveDraft() {
    if (!generated) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/news-generator", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(generated),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save draft.");
      }

      setSuccess(`Draft saved: ${data.article.title}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save draft.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-8 text-black sm:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
            SneakPrice Admin
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            News Generator
          </h1>
          <p className="mt-4 max-w-3xl text-base text-neutral-600 sm:text-lg">
            Generate structured draft articles for multiple marketplace sectors.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Article Inputs</h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">Topic</label>
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Why under-retail sneakers are becoming the smartest flip right now"
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Sector</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                  >
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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Content type
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                >
                  {CONTENT_TYPE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Market angle
                </label>
                <textarea
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                  rows={4}
                  placeholder="Explain why this matters right now."
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Target keyword
                </label>
                <input
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder="under-retail sneaker flips"
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Cover image path
                </label>
                <input
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="/news/example.jpg"
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Region</label>
                  <input
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Global"
                    className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Brand focus
                  </label>
                  <input
                    value={brandFocus}
                    onChange={(e) => setBrandFocus(e.target.value)}
                    placeholder="Nike"
                    className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Tags</label>
                <input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="resale, sneakers, nike, market"
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                />
                <p className="mt-2 text-xs text-neutral-500">
                  Separate tags with commas.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Scheduled publish time
                </label>
                <input
                  type="datetime-local"
                  value={scheduledFor}
                  onChange={(e) => setScheduledFor(e.target.value)}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                />
                <p className="mt-2 text-xs text-neutral-500">
                  Leave blank to save as an unscheduled draft.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Flip score hint
                  </label>
                  <input
                    value={flipScoreHint}
                    onChange={(e) => setFlipScoreHint(e.target.value)}
                    placeholder="88"
                    className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Action label hint
                  </label>
                  <input
                    value={actionLabelHint}
                    onChange={(e) => setActionLabelHint(e.target.value)}
                    placeholder="Strong Buy"
                    className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={loading || !topic.trim()}
                  className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Generate Draft"}
                </button>

                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={saving || !generated}
                  className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Draft to Database"}
                </button>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {success ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {success}
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold">Generated Preview</h2>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Draft mode
              </span>
            </div>

            {!generated ? (
              <div className="mt-6 rounded-3xl border border-dashed border-black/10 bg-neutral-50 px-6 py-16 text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                  SneakPrice Generator
                </p>
                <h3 className="mt-3 text-2xl font-bold">
                  No article generated yet
                </h3>
                <p className="mt-3 text-neutral-600">
                  Fill in the form and generate a structured draft.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                <div className="rounded-3xl border border-black/10 bg-neutral-50 p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-medium">
                      {generated.sector}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-medium">
                      {generated.category}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-medium">
                      {generated.contentType}
                    </span>
                    {typeof generated.flipScore === "number" ? (
                      <span className="text-sm font-semibold text-emerald-700">
                        Flip Score {generated.flipScore}/100
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-3xl font-bold leading-tight">
                    {generated.title}
                  </h3>

                  <p className="mt-3 text-neutral-600">{generated.excerpt}</p>

                  <div className="mt-4 space-y-1 text-sm text-neutral-500">
                    <div>
                      <span className="font-semibold text-black">Slug:</span>{" "}
                      {generated.slug}
                    </div>
                    <div>
                      <span className="font-semibold text-black">Cover:</span>{" "}
                      {generated.coverImage}
                    </div>
                    <div>
                      <span className="font-semibold text-black">Region:</span>{" "}
                      {generated.region}
                    </div>
                    <div>
                      <span className="font-semibold text-black">Brand:</span>{" "}
                      {generated.brandFocus || "—"}
                    </div>
                    <div>
                      <span className="font-semibold text-black">Tags:</span>{" "}
                      {generated.tags.join(", ")}
                    </div>
                    <div>
                      <span className="font-semibold text-black">Scheduled:</span>{" "}
                      {generated.scheduledFor
                        ? new Date(generated.scheduledFor).toLocaleString()
                        : "Not scheduled"}
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    SneakPrice Flip Insight
                  </p>
                  {typeof generated.flipScore === "number" ? (
                    <p className="mt-2 text-2xl font-bold text-emerald-800">
                      Score: {generated.flipScore}/100
                    </p>
                  ) : null}
                  {generated.actionLabel ? (
                    <p className="mt-3 font-semibold">
                      Action: {generated.actionLabel}
                    </p>
                  ) : null}
                  {generated.actionNote ? (
                    <p className="mt-2 text-sm text-neutral-700">
                      {generated.actionNote}
                    </p>
                  ) : null}
                </div>

                <div>
                  <h4 className="text-lg font-bold">Market angle</h4>
                  <p className="mt-2 leading-7 text-neutral-700">
                    {generated.marketAngle}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold">Body</h4>
                  <div className="mt-3 space-y-4 text-[16px] leading-7 text-neutral-700">
                    {generated.body.split("\n\n").map((block, i) => {
                      if (block.startsWith("## ")) {
                        return (
                          <h5 key={i} className="pt-3 text-xl font-bold text-black">
                            {block.replace(/^##\s+/, "")}
                          </h5>
                        );
                      }

                      return <p key={i}>{block}</p>;
                    })}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}