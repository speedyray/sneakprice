"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminNavItem = {
  label: string;
  href: string;
};

const primaryNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Users", href: "/admin/users" },
  { label: "Listings", href: "/admin/listings" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Activity", href: "/admin/activity" },
  { label: "Disputes", href: "/admin/disputes" },
];

const secondaryNav: AdminNavItem[] = [
  { label: "News Schedule", href: "/admin/news-schedule" },
  { label: "News Generator", href: "/admin/news-generator" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function renderNavGroup(pathname: string, items: AdminNavItem[]) {
  return items.map((item) => {
    const active = isActive(pathname, item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        className={[
          "flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
          active
            ? "bg-neutral-900 text-white shadow-sm"
            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
        ].join(" ")}
      >
        {item.label}
      </Link>
    );
  });
}

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-neutral-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-neutral-200 px-6 py-5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-sm">
            <span className="text-sm font-black">SP</span>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-900">
              SneakPrice
            </p>
            <p className="truncate text-xs text-neutral-500">
              Admin Console
            </p>
          </div>
        </Link>
      </div>

      <div className="flex flex-1 flex-col justify-between px-4 py-6">
        <div className="space-y-8">
          <nav className="space-y-2">{renderNavGroup(pathname, primaryNav)}</nav>

          <div>
            <p className="px-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Content
            </p>
            <nav className="mt-3 space-y-2">
              {renderNavGroup(pathname, secondaryNav)}
            </nav>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm font-semibold text-neutral-900">
            Admin Workspace
          </p>
          <p className="mt-1 text-xs leading-5 text-neutral-500">
            Track all users, listings, orders, disputes, and platform activity
            from one place.
          </p>

          <Link
            href="/"
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"
          >
            Back to Marketplace
          </Link>
        </div>
      </div>
    </aside>
  );
}
