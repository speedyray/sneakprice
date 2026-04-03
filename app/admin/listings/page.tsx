import Link from "next/link";
import { ListingStatus } from "@prisma/client";
import { formatCurrency } from "@/lib/money";
import { getAdminListings } from "@/lib/admin/platform";
import AdminListingsTable from "@/components/admin/AdminListingsTable";

export default async function AdminListingsPage() {
  const listings = await getAdminListings();

  const activeCount = listings.filter((listing) => listing.status === ListingStatus.ACTIVE).length;
  const soldCount = listings.filter((listing) => listing.status === ListingStatus.SOLD).length;
  const reservedCount = listings.filter((listing) => listing.status === ListingStatus.RESERVED).length;
  const totalValue = listings
    .filter((listing) => listing.status === ListingStatus.ACTIVE)
    .reduce((sum, listing) => sum + listing.price, 0);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
            SneakPrice Admin
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            Listings
          </h1>
          <p className="mt-4 max-w-3xl text-base text-neutral-600 sm:text-lg">
            Review every marketplace listing across the platform, with seller
            attribution and live status visibility.
          </p>
        </div>

        <Link
          href="/marketplace"
          className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-50"
        >
          Open Marketplace
        </Link>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Total Listings
          </p>
          <p className="mt-3 text-3xl font-bold">{listings.length}</p>
        </div>
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Active
          </p>
          <p className="mt-3 text-3xl font-bold text-emerald-800">{activeCount}</p>
        </div>
        <div className="rounded-3xl border border-sky-200 bg-sky-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            Reserved
          </p>
          <p className="mt-3 text-3xl font-bold text-sky-800">{reservedCount}</p>
        </div>
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Active Value
          </p>
          <p className="mt-3 text-3xl font-bold">{formatCurrency(totalValue)}</p>
          <p className="mt-2 text-sm text-neutral-500">
            Sold listings: {soldCount}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="border-b border-black/10 px-6 py-5">
          <h2 className="text-xl font-bold">All Marketplace Listings</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Full platform listing inventory, newest first.
          </p>
        </div>

        <AdminListingsTable listings={listings} />
      </section>
    </section>
  );
}
