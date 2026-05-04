import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

// Reusable shell for any /blog/<slug> page. Owns the hero (back link, badge,
// date, title, hero image) and the bottom CTA. Each blog page passes its
// metadata via `meta` and its body as JSX `children` — the prose typography
// is handled by Tailwind's prose plugin via the wrapping <article> below.
//
// To create a new blog page:
//
//   import BlogArticle from "@/components/blog/BlogArticle";
//   import { Callout } from "@/components/blog/Callout";
//
//   export const metadata = {
//     title: "...",
//     description: "...",
//     alternates: { canonical: "https://sneakpriceapp.com/blog/<slug>" },
//     openGraph: { title, description, url, type: "article", images: ["..."] },
//   };
//
//   export default function Page() {
//     return (
//       <BlogArticle meta={{ category: "...", date: "...", readTime: "...",
//                            title: "...", description: "...", image: "...",
//                            imageAlt: "..." }}>
//         <p>Intro…</p>
//         <h2>Section</h2>
//         <ul><li>…</li></ul>
//         <Callout variant="quote">…</Callout>
//       </BlogArticle>
//     );
//   }

export type BlogMeta = {
  category: string;
  // Tailwind utility classes for the category badge (bg + text). If omitted,
  // a neutral fallback is used.
  categoryColor?: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const DEFAULT_BADGE = "bg-emerald-100 text-emerald-700";

export default function BlogArticle({
  meta,
  children,
}: {
  meta: BlogMeta;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#e8e4c8" }}>
      {/* Article hero */}
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-3xl px-6 pt-12 pb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-black"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 8H3M7 4L3 8l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to blog
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                meta.categoryColor ?? DEFAULT_BADGE
              }`}
            >
              {meta.category}
            </span>
            <span className="text-sm text-neutral-400">{meta.date}</span>
            <span className="text-sm text-neutral-400">·</span>
            <span className="text-sm text-neutral-400">{meta.readTime}</span>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600">
            {meta.description}
          </p>
        </div>

        <div className="mx-auto max-w-5xl px-6 pb-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-black/10">
            <Image
              src={meta.image}
              alt={meta.imageAlt}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-neutral-700 prose-a:text-black prose-a:underline prose-strong:text-black prose-li:text-neutral-700 prose-table:my-6">
          {children}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-black/10 bg-white p-8 text-center">
          <h3 className="text-2xl font-bold text-black">
            Want to see live arbitrage right now?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-neutral-600">
            SneakPrice scans eBay, StockX, and GOAT in real time and surfaces
            the most profitable flips on the market.
          </p>
          <Link
            href="/discover"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Try SneakPrice free →
          </Link>
        </div>
      </article>
    </div>
  );
}
