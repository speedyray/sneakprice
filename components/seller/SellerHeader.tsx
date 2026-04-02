"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/seller": {
    title: "Seller Dashboard",
    subtitle: "Track inventory value, sales performance, and sneaker profits.",
  },
  "/seller/inventory": {
    title: "Inventory",
    subtitle: "Manage the sneakers you currently own and track market value.",
  },
  "/seller/sales": {
    title: "Sales",
    subtitle: "Review completed sales, payouts, and realized profit.",
  },
  "/seller/listings": {
    title: "Listings",
    subtitle: "Manage your active, draft, and held marketplace listings.",
  },
  "/seller/packages": {
    title: "Packages",
    subtitle: "Track shipping progress and fulfillment status.",
  },
  "/seller/expenses": {
    title: "Expenses",
    subtitle: "Monitor fees, shipping costs, and selling expenses.",
  },
};

function getMeta(pathname: string) {
  if (pageMeta[pathname]) return pageMeta[pathname];
  if (pathname.startsWith("/seller/inventory")) return pageMeta["/seller/inventory"];
  if (pathname.startsWith("/seller/sales")) return pageMeta["/seller/sales"];
  if (pathname.startsWith("/seller/listings")) return pageMeta["/seller/listings"];
  if (pathname.startsWith("/seller/packages")) return pageMeta["/seller/packages"];
  if (pathname.startsWith("/seller/expenses")) return pageMeta["/seller/expenses"];
  return pageMeta["/seller"];
}

export default function SellerHeader() {
  const pathname = usePathname();
  const meta = getMeta(pathname);

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              SneakPrice Seller
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">
              {meta.title}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-neutral-500">
              {meta.subtitle}
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/seller/inventory"
              className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"
            >
              View Inventory
            </Link>

            <Link
              href="/seller/sales"
              className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              View Sales
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}