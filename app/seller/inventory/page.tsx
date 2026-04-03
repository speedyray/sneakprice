import SellerShell from "@/components/seller/SellerShell";
import SellerPageTitle from "@/components/seller/SellerPageTitle";
import { redirect } from "next/navigation";
import { getCurrentDbUser } from "@/lib/current-user";
import { getSellerInventory } from "@/lib/seller/seller-inventory";
import { formatCurrency } from "@/lib/money";

export default async function SellerInventoryPage() {
  const currentUser = await getCurrentDbUser();

  if (!currentUser) {
    redirect("/login?redirect_url=/seller/inventory");
  }

  const items = await getSellerInventory(currentUser.id);

  return (
    <SellerShell>
      <SellerPageTitle
        title="Inventory"
        subtitle="Track what you own, what it cost, and what it is worth now."
      />

      <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-10 text-center">
            <h3 className="text-lg font-semibold text-neutral-950">No inventory yet</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Inventory added or listed by this seller will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-neutral-200 text-neutral-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Sneaker</th>
                  <th className="px-4 py-3 font-medium">Purchase</th>
                  <th className="px-4 py-3 font-medium">Market Value</th>
                  <th className="px-4 py-3 font-medium">Unrealized Profit</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                {items.map((item) => {
                  const profit = item.estimatedMarketValue - item.purchasePrice;
                  const profitClassName =
                    profit > 0
                      ? "text-lime-400"
                      : profit < 0
                        ? "text-rose-400"
                        : "text-neutral-600";

                  return (
                    <tr key={item.id}>
                      <td className="px-4 py-4">
                        <div className="font-medium text-neutral-950">{item.name}</div>
                        <div className="mt-1 text-xs text-neutral-500">
                          {[item.brand, item.model, item.size ? `Size ${item.size}` : null]
                            .filter(Boolean)
                            .join(" · ")}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">
                        {formatCurrency(item.purchasePrice)}
                      </td>
                      <td className="px-4 py-4 text-neutral-700">
                        {formatCurrency(item.estimatedMarketValue)}
                      </td>
                      <td className={`px-4 py-4 ${profitClassName}`}>
                        {profit > 0 ? "+" : ""}
                        {formatCurrency(profit)}
                      </td>
                      <td className="px-4 py-4 text-neutral-700">
                        {String(item.status).replaceAll("_", " ")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SellerShell>
  );
}
