import { redirect } from "next/navigation";
import { getCurrentDbUser } from "@/lib/current-user";
import {
  getSellerActiveListingsSnapshot,
  getSellerDashboardMetrics,
  getSellerRecentSales,
} from "@/lib/seller/seller-dashboard";
import { formatCurrency } from "@/lib/money";

export default async function SellerDashboardPage() {
  const user = await getCurrentDbUser();

  if (!user) {
    redirect("/login");
  }

  const [metrics, recentSales, activeListings] = await Promise.all([
    getSellerDashboardMetrics(user.id),
    getSellerRecentSales(user.id, 5),
    getSellerActiveListingsSnapshot(user.id, 5),
  ]);

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-neutral-500">Inventory Value</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900">
            {formatCurrency(metrics.inventoryValue)}
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-neutral-500">Active Listings Value</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900">
            {formatCurrency(metrics.activeListingsValue)}
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-neutral-500">Sales Revenue</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900">
            {formatCurrency(metrics.salesRevenue)}
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-neutral-500">Total Profit</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900">
            {formatCurrency(metrics.totalProfit)}
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900">
            Recent Sales
          </h3>

          <div className="mt-4 space-y-3">
            {recentSales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {sale.listingTitle}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {sale.orderNumber} · {sale.status}
                  </p>
                </div>

                <p className="text-sm font-semibold text-neutral-900">
                  {formatCurrency(sale.payout)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900">
            Active Listings
          </h3>

          <div className="mt-4 space-y-3">
            {activeListings.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {listing.title}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {listing.viewsCount} views · {listing.favoritesCount} saves
                  </p>
                </div>

                <p className="text-sm font-semibold text-neutral-900">
                  {formatCurrency(listing.price)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}