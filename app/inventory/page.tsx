import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";
import Link from "next/link";

function formatCurrency(value?: number | null) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `$${value.toFixed(0)}`;
}

export default async function InventoryPage() {
  const currentUser = await getSignedInUser();

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-white px-6 py-10 text-black">
        <div className="mx-auto max-w-4xl rounded-2xl border border-black/10 bg-white p-8 text-center">
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="mt-3 text-neutral-600">
            Please sign in to view your inventory.
          </p>
          <div className="mt-6">
            <Link
              href="/login"
              className="inline-flex rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-neutral-800"
            >
              Login / Sign Up
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const items = await prisma.inventoryItem.findMany({
    where: {
      userId: currentUser.email,
     },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Seller Tools
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Inventory</h1>
          <p className="mt-3 max-w-2xl text-neutral-600">
            Manage your scanned sneakers, track market value, and prepare listings.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-black/10 bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 font-medium text-neutral-600">Name</th>
                  <th className="px-4 py-3 font-medium text-neutral-600">Size</th>
                  <th className="px-4 py-3 font-medium text-neutral-600">Status</th>
                  <th className="px-4 py-3 font-medium text-neutral-600">Purchase</th>
                  <th className="px-4 py-3 font-medium text-neutral-600">Market</th>
                  <th className="px-4 py-3 font-medium text-neutral-600">Listed</th>
                  <th className="px-4 py-3 font-medium text-neutral-600">Profit</th>
                </tr>
              </thead>

              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-neutral-500">
                      No inventory yet. Add sneakers from the Discover scan flow.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => {
                    const profit =
                      typeof item.marketPrice === "number" &&
                      typeof item.purchasePrice === "number"
                        ? item.marketPrice - item.purchasePrice
                        : null;

                    return (
                      <tr key={item.id} className="border-b border-black/5">
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-semibold text-black">{item.name}</p>
                            <p className="text-xs text-neutral-500">
                              {[item.brand, item.colorway].filter(Boolean).join(" • ") || "Sneaker item"}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">{item.size ?? "—"}</td>
                        <td className="px-4 py-4">
                          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium capitalize text-black">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">{formatCurrency(item.purchasePrice)}</td>
                        <td className="px-4 py-4">{formatCurrency(item.marketPrice)}</td>
                        <td className="px-4 py-4">{formatCurrency(item.listedPrice)}</td>
                        <td className="px-4 py-4 font-semibold">
                          {profit !== null ? (
                            <span className={profit >= 0 ? "text-green-600" : "text-red-600"}>
                              {profit >= 0 ? "+" : ""}
                              {formatCurrency(profit)}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}