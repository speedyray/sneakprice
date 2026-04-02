"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SellerNavItem = {
  label: string;
  href: string;
  badge?: string;
};

const primaryNav: SellerNavItem[] = [
  { label: "Dashboard", href: "/seller" },
  { label: "Inventory", href: "/seller/inventory" },
  { label: "Sales", href: "/seller/sales" },
  { label: "Listings", href: "/seller/listings" },
  { label: "Packages", href: "/seller/packages" },
  { label: "Expenses", href: "/seller/expenses" },
];

function isActive(pathname: string, href: string) {
  if (href === "/seller") return pathname === "/seller";
  return pathname.startsWith(href);
}

export default function SellerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-neutral-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-neutral-200 px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-sm">
            <span className="text-sm font-black">SP</span>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-900">
              SneakPrice
            </p>
            <p className="truncate text-xs text-neutral-500">
              Seller Dashboard
            </p>
          </div>
        </Link>
      </div>

      <div className="flex flex-1 flex-col justify-between px-4 py-6">
        <nav className="space-y-2">
          {primaryNav.map((item) => {
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
          })}
        </nav>

        <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm font-semibold text-neutral-900">
            Seller Workspace
          </p>
          <p className="mt-1 text-xs leading-5 text-neutral-500">
            Manage inventory, sales, listings, packages, and expenses in one
            place.
          </p>

          <Link
            href="/discover"
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"
          >
            Back to Discover
          </Link>
        </div>
      </div>
    </aside>
  );
}