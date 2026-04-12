"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const topics = [
  { label: "Cleaning Tips", href: "/care/cleaning" },
  { label: "Storage & Protection", href: "/care/storage" },
  { label: "Deodorizing", href: "/care/deodorizing" },
  { label: "Sole Restoration", href: "/care/sole-restoration" },
  { label: "Crease Prevention", href: "/care/crease-prevention" },
];

export default function CareGuideSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile: horizontal scrollable strip */}
      <div className="flex overflow-x-auto border-b border-black/10 bg-white px-4 pb-3 pt-4 sm:hidden">
        {topics.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`mr-4 shrink-0 text-sm font-medium transition ${
              pathname === t.href
                ? "border-b-2 border-green-600 pb-1 text-green-600"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {/* Desktop: sticky vertical sidebar */}
      <aside className="hidden sm:block w-52 shrink-0">
        <div className="sticky top-6 space-y-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Care Guide
          </p>
          {topics.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                pathname === t.href
                  ? "border-l-2 border-green-600 bg-green-50 pl-[10px] text-green-700"
                  : "text-neutral-600 hover:bg-black/5 hover:text-black"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
