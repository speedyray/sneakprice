import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SellerPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  let listings: any[] = [];

  try {
    listings = await prisma.marketplaceListing.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
    });
  } catch (error) {
    console.error("SELLER DASHBOARD ERROR:", error);
  }

  const activeListings = listings.filter((item) => item.status === "ACTIVE");
  const soldListings = listings.filter((item) => item.status === "SOLD");
  const draftListings = listings.filter((item) => item.status === "DRAFT");

  const totalRevenue = soldListings.reduce((sum, item) => {
    return sum + Number(item.price || 0);
  }, 0);

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      <div className="border-b border-black/10 bg-white px-8 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-neutral-500">
              SneakPrice Seller
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              Seller Dashboard
            </h1>
            <p className="mt-2 text-neutral-500">
              Track inventory value, sales performance, and sneaker profits.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/inventory"
              className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium hover:bg-black/5"
            >
              View Inventory
            </Link>
            <Link
              href="/seller/sales"
              className="rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              View Sales
            </Link>
          </div>
        </div>
      </div>

      <div className="p-8">
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-sm text-neutral-500">Total Listings</p>
            <h2 className="mt-2 text-3xl font-bold">{listings.length}</h2>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-sm text-neutral-500">Active Listings</p>
            <h2 className="mt-2 text-3xl font-bold">{activeListings.length}</h2>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-sm text-neutral-500">Sold Pairs</p>
            <h2 className="mt-2 text-3xl font-bold">{soldListings.length}</h2>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-sm text-neutral-500">Revenue</p>
            <h2 className="mt-2 text-3xl font-bold">
              ${totalRevenue.toLocaleString()}
            </h2>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.8fr]">
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Your Listings</h3>
                <p className="text-sm text-neutral-500">
                  Latest sneakers in the marketplace
                </p>
              </div>

              <Link
                href="/marketplace/my-listings"
                className="text-sm font-medium text-black hover:opacity-70"
              >
                View all
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-black/10 text-neutral-500">
                  <tr>
                    <th className="px-3 py-3 font-medium">Sneaker</th>
                    <th className="px-3 py-3 font-medium">Price</th>
                    <th className="px-3 py-3 font-medium">Status</th>
                    <th className="px-3 py-3 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-8 text-center text-neutral-400"
                      >
                        No listings yet.
                      </td>
                    </tr>
                  ) : (
                    listings.map((item) => (
                      <tr key={item.id} className="border-b border-black/5">
                        <td className="px-3 py-4">
                          <div className="font-medium">{item.title}</div>
                          {item.brand ? (
                            <div className="text-xs text-neutral-500">
                              {item.brand}
                            </div>
                          ) : null}
                        </td>
                        <td className="px-3 py-4 font-medium">
                          ${Number(item.price || 0).toLocaleString()}
                        </td>
                        <td className="px-3 py-4">
                          <span className="rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-xs font-medium">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-neutral-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-black/10 bg-white p-5">
              <h3 className="text-xl font-semibold">Quick Actions</h3>
              <div className="mt-4 grid gap-3">
                <Link
                  href="/marketplace/create-listing"
                  className="rounded-xl bg-black px-4 py-3 text-center text-sm font-semibold text-white hover:opacity-90"
                >
                  Add New Listing
                </Link>
                <Link
                  href="/marketplace/my-listings"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-center text-sm font-medium hover:bg-black/5"
                >
                  Manage Listings
                </Link>
                <Link
                  href="/seller/sales"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-center text-sm font-medium hover:bg-black/5"
                >
                  View Sales
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-5">
              <h3 className="text-xl font-semibold">Status Breakdown</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Active</span>
                  <span className="font-semibold">{activeListings.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Draft</span>
                  <span className="font-semibold">{draftListings.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Sold</span>
                  <span className="font-semibold">{soldListings.length}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-lime-300 bg-lime-50 p-5">
              <h3 className="text-lg font-semibold">Seller Tip</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Listings with clear titles, size, condition, and strong photos
                usually convert better.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}