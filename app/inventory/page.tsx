import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/current-user";
import { decimalToNumber } from "@/lib/money";

export default async function InventoryPage() {
  const currentUser = await getCurrentDbUser();

  if (!currentUser) {
    redirect("/login");
  }

  const items = await prisma.inventoryItem.findMany({
    where: {
      sellerId: currentUser.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Inventory</h1>

        <div className="mt-8 grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-black/10 bg-white p-4"
            >
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-neutral-600">
                {item.brand} · {item.model} · Size {item.size}
              </p>
              <p className="mt-2 text-sm">
                Purchase: ${decimalToNumber(item.purchasePrice)}
              </p>
              <p className="text-sm">
                Market: ${decimalToNumber(item.estimatedMarketValue)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}