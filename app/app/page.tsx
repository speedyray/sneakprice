import { redirect } from "next/navigation";
import { getCurrentDbUser } from "@/lib/current-user";
import {
  getSellerActiveListingsSnapshot,
  getSellerDashboardMetrics,
  getSellerRecentSales,
} from "@/lib/seller/seller-dashboard";
import { formatCurrency } from "@/lib/money";

export default async function AppDashboardPage() {
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
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
      <p className="mt-2 text-neutral-500">
        Inventory Value: {formatCurrency(metrics.inventoryValue)}
      </p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-neutral-900">Recent Sales</h2>
        <div className="mt-4 space-y-3">
          {recentSales.map((sale) => (
            <div key={sale.id} className="rounded-xl border border-neutral-200 p-4">
              <p className="font-medium">{sale.listingTitle}</p>
              <p className="text-sm text-neutral-500">{sale.orderNumber}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-neutral-900">Active Listings</h2>
        <div className="mt-4 space-y-3">
          {activeListings.map((listing) => (
            <div key={listing.id} className="rounded-xl border border-neutral-200 p-4">
              <p className="font-medium">{listing.title}</p>
              <p className="text-sm text-neutral-500">
                {formatCurrency(listing.price)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}