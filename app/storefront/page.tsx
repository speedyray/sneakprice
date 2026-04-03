import Link from "next/link";
import { ListingStatus } from "@prisma/client";
import { MarketplaceListingImage } from "@/components/MarketplaceListingImage";
import { prisma } from "@/lib/prisma";

type StorefrontPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function StorefrontPage({
  searchParams,
}: StorefrontPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Math.max(1, Number(resolvedSearchParams?.page || "1"));
  const pageSize = 50;
  const skip = (currentPage - 1) * pageSize;

  const where = {
    status: ListingStatus.ACTIVE,
  };

  const [listings, totalCount] = await Promise.all([
    prisma.marketplaceListing.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: pageSize,
    }),
    prisma.marketplaceListing.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-[1600px] px-4 py-8 md:px-6">
        <div className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
            SneakPrice Storefront
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            Shop sneaker listings
          </h1>
          <p className="mt-2 text-neutral-600">
            Browse live marketplace inventory from verified sellers.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-3 border-b border-black/10 pb-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-neutral-600">
            Showing{" "}
            <span className="font-semibold text-black">{listings.length}</span>{" "}
            of{" "}
            <span className="font-semibold text-black">{totalCount}</span> active
            listings
          </p>

          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm text-neutral-600">
              Sort by
            </label>
            <select
              id="sort"
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm"
              defaultValue="newest"
              disabled
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="best-deal">Best Deal</option>
            </select>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6">
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-5">
              <h2 className="mb-4 text-lg font-semibold">Filters</h2>

              <div className="space-y-5 text-sm">
                <div>
                  <p className="mb-2 font-medium">Brand</p>
                  <div className="space-y-2 text-neutral-600">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      Nike
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      Jordan
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      Adidas
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      New Balance
                    </label>
                  </div>
                </div>

                <div>
                  <p className="mb-2 font-medium">Condition</p>
                  <div className="space-y-2 text-neutral-600">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      New
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      New With Box
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      Used
                    </label>
                  </div>
                </div>

                <div>
                  <p className="mb-2 font-medium">Gender</p>
                  <div className="space-y-2 text-neutral-600">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      Men
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      Women
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      Kids
                    </label>
                  </div>
                </div>

                <div>
                  <p className="mb-2 font-medium">Price</p>
                  <div className="space-y-2 text-neutral-600">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="price" disabled />
                      Under $150
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="price" disabled />
                      $150 - $300
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="price" disabled />
                      $300+
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section>
            {listings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black/15 bg-neutral-50 p-12 text-center">
                <h3 className="text-xl font-semibold">No active listings found</h3>
                <p className="mt-2 text-neutral-600">
                  Add inventory to populate your storefront.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
                  {listings.map((item) => (
                    <Link
                      key={item.id}
                      href={`/marketplace/${item.id}`}
                      className="group rounded-2xl border border-black/10 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className="mb-4 aspect-square overflow-hidden rounded-xl bg-neutral-100">
                        <MarketplaceListingImage
                          src={item.primaryImageUrl}
                          alt={item.title}
                        />
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                          {item.brand || "Sneaker"}
                        </p>

                        <h3 className="line-clamp-2 text-base font-semibold leading-snug">
                          {item.title}
                        </h3>

                        <div className="flex items-center justify-between text-sm text-neutral-600">
                          <span>{item.condition || "Condition N/A"}</span>
                          <span>Size {item.size || "-"}</span>
                        </div>

                        <div className="pt-2">
                          <p className="text-xs text-neutral-500">Lowest Ask</p>
                          <p className="text-2xl font-bold">
                            ${Number(item.price || 0).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {item.status ? (
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                              {item.status}
                            </span>
                          ) : null}

                          <span className="rounded-full border border-black/10 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700">
                            Seller Verified
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/10 bg-neutral-50 px-5 py-4">
                  <p className="text-sm text-neutral-600">
                    Page <span className="font-semibold text-black">{currentPage}</span> of{" "}
                    <span className="font-semibold text-black">{totalPages}</span>
                  </p>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/storefront?page=${Math.max(1, currentPage - 1)}`}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                        currentPage === 1
                          ? "pointer-events-none border-black/10 text-neutral-400"
                          : "border-black/15 hover:bg-black/5"
                      }`}
                    >
                      Previous
                    </Link>

                    <Link
                      href={`/storefront?page=${Math.min(totalPages, currentPage + 1)}`}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                        currentPage === totalPages
                          ? "pointer-events-none border-black/10 text-neutral-400"
                          : "border-black/15 hover:bg-black/5"
                      }`}
                    >
                      Next
                    </Link>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
