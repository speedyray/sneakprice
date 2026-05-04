import type { ReactNode } from "react";

// Pull-quote / tip / pro-tip box for blog articles. Variants:
//   "quote" — italic blockquote with left bar (use for in-article pull quotes)
//   "tip"   — neutral info box ("Tip: ...")
//   "pro"   — emerald accent ("Pro Tip: ...")
//
// Used inside the prose body of BlogArticle.

type Variant = "quote" | "tip" | "pro";

const STYLES: Record<Variant, { wrapper: string; label?: string; labelColor?: string }> = {
  quote: {
    wrapper:
      "not-prose my-6 rounded-r-xl border-l-4 border-black bg-white px-6 py-4 text-lg italic leading-relaxed text-neutral-800",
  },
  tip: {
    wrapper:
      "not-prose my-6 rounded-xl border border-black/10 bg-white px-5 py-4 text-base leading-relaxed text-neutral-700",
    label: "Tip",
    labelColor: "text-neutral-500",
  },
  pro: {
    wrapper:
      "not-prose my-6 rounded-xl border border-emerald-200 bg-emerald-50/60 px-5 py-4 text-base leading-relaxed text-neutral-800",
    label: "Pro Tip",
    labelColor: "text-emerald-700",
  },
};

export function Callout({
  variant = "tip",
  children,
}: {
  variant?: Variant;
  children: ReactNode;
}) {
  const style = STYLES[variant];
  return (
    <aside className={style.wrapper}>
      {style.label && (
        <span
          className={`mr-2 text-xs font-bold uppercase tracking-wider ${style.labelColor}`}
        >
          {style.label}:
        </span>
      )}
      {children}
    </aside>
  );
}
