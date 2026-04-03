import Link from "next/link";
import { ListingStatus } from "@prisma/client";
import { formatCurrency } from "@/lib/money";
import { getAdminListings, getAdminSupabaseCounts } from "@/lib/admin/platform";
import AdminListingsTable from "@/components/admin/AdminListingsTable";

export default async function AdminDashboardPage() {
  const [listings, { scanCount, waitlistCount }] = await Promise.all([
    getAdminListings(),
    getAdminSupabaseCounts(),
  ]);

  const totalListings = listings.length;
  const activeCount = listings.filter((listing) => listing.status === ListingStatus.ACTIVE).length;
  const soldCount = listings.filter((listing) => listing.status === ListingStatus.SOLD).length;
  const draftCount = listings.filter((listing) => listing.status === ListingStatus.DRAFT).length;
  const sellerCount = new Set(listings.map((listing) => listing.sellerId)).size;
  const totalActiveValue = listings
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
            Platform Dashboard
          </h1>
          <p className="mt-4 max-w-3xl text-base text-neutral-600 sm:text-lg">
            Review all marketplace listings, seller activity, and top-level
            platform counts in one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/news-schedule"
            className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-50"
          >
            News Schedule
          </Link>
          <Link
            href="/admin/news-generator"
            className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            News Generator
          </Link>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Total Listings
          </p>
          <p className="mt-3 text-3xl font-bold">{totalListings}</p>
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Active
          </p>
          <p className="mt-3 text-3xl font-bold text-emerald-800">{activeCount}</p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Sold
          </p>
          <p className="mt-3 text-3xl font-bold">{soldCount}</p>
        </div>

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Draft
          </p>
          <p className="mt-3 text-3xl font-bold text-amber-800">{draftCount}</p>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Sellers
          </p>
          <p className="mt-3 text-3xl font-bold">{sellerCount}</p>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Active Value
          </p>
          <p className="mt-3 text-3xl font-bold">{formatCurrency(totalActiveValue)}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Scan Records
          </p>
          <p className="mt-3 text-3xl font-bold">
            {scanCount === null ? "—" : scanCount}
          </p>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Waitlist Emails
          </p>
          <p className="mt-3 text-3xl font-bold">
            {waitlistCount === null ? "—" : waitlistCount}
          </p>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Marketplace Coverage
          </p>
          <p className="mt-3 text-lg font-semibold">
            Platform-wide listing oversight for every seller account.
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            Use the sidebar to inspect users, orders, activity, and dispute
            queues across the platform.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-black/10 px-6 py-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-bold">Recent Marketplace Listings</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Latest listings from across the platform, newest first.
            </p>
          </div>

          <Link
            href="/admin/listings"
            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-50"
          >
            View All Listings
          </Link>
        </div>

        <AdminListingsTable listings={listings.slice(0, 10)} />
      </section>
    </section>
  );
}
