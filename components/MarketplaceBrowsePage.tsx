import Link from "next/link";
import { ListingStatus } from "@prisma/client";
import { getSignedInUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { MarketplaceListingImage } from "@/components/MarketplaceListingImage";
import { LiveListingBadge } from "@/components/LiveListingBadge";
import { decimalToNumber } from "@/lib/money";
import { formatSneakerCondition } from "@/lib/marketplace-utils";

const PAGE_SIZE = 60;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function getSoldCountSeed(id: string) {
  return (
    1400 +
    [...id].reduce((total, character) => total + character.charCodeAt(0), 0) % 900
  );
}

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedPage = Number(resolvedSearchParams?.page ?? "1");
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  const [signedInUser, totalListings, listings] = await Promise.all([
    getSignedInUser().catch(() => null),
    prisma.marketplaceListing.count({
      where: { status: ListingStatus.ACTIVE },
    }),
    prisma.marketplaceListing.findMany({
      where: { status: ListingStatus.ACTIVE },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalListings / PAGE_SIZE));
  const previousPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-neutral-900">
      <div className="w-full space-y-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Marketplace
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Browse live sneaker listings
              </h1>
              <p className="mt-4 max-w-2xl text-neutral-600">
                Explore active pairs from verified sellers across the marketplace.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {signedInUser ? (
                <Link
                  href="/marketplace/sell"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-neutral-900 transition hover:border-neutral-500"
                >
                  Create listing
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-neutral-900 transition hover:border-neutral-500"
                >
                  Login / Sign Up
                </Link>
              )}

              <Link
                href="/buyer"
                className="inline-flex items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-emerald-700 transition hover:border-emerald-400"
              >
                Browse buyer portal
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm text-neutral-700">
            Active listings:{" "}
            <span className="font-semibold text-neutral-900">{totalListings}</span>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-neutral-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-200 bg-neutral-50 px-8 py-16 text-center">
            <h2 className="text-2xl font-semibold">No listings yet</h2>
            <p className="mx-auto mt-3 max-w-xl text-neutral-600">
              Inventory is still coming online. Add a listing or check back shortly.
            </p>
          </div>
        ) : (
          <section className="space-y-6" id="all-listings">
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
              {listings.map((listing) => {
                const soldCount = getSoldCountSeed(listing.id);
                const price = decimalToNumber(listing.price);

                return (
                  <article key={listing.id} className="overflow-hidden rounded-2xl">
                    <Link href={`/marketplace/${listing.id}`} className="block h-full">
                      <div className="relative aspect-[2/1] overflow-hidden">
                        <MarketplaceListingImage
                          src={listing.primaryImageUrl}
                          alt={`${listing.brand ?? "Sneaker"} ${listing.model ?? ""}`.trim()}
                          variant="plain"
                        />
                        <div className="absolute left-2 top-2 rounded-full border border-emerald-200 bg-white/80 px-1.5 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.25em] text-emerald-700 shadow-sm">
                          {listing.status}
                        </div>
                      </div>

                      <div className="space-y-1 px-1 pb-1 pt-1.5">
                        <div className="space-y-1">
                          <p className="text-[0.5rem] uppercase tracking-[0.24em] text-neutral-500">
                            {listing.brand ?? "Sneaker"}
                          </p>
                          <h3 className="line-clamp-2 text-[0.72rem] font-semibold leading-snug text-neutral-900">
                            {listing.title}
                          </h3>
                          <p className="line-clamp-1 text-[0.6rem] text-neutral-600">
                            {listing.colorway ?? "Marketplace listing"}
                          </p>
                        </div>

                        <div className="space-y-0.5">
                          <p className="text-[0.55rem] font-medium text-neutral-500">
                            Lowest Ask
                          </p>
                          <div className="flex items-end justify-between gap-3">
                            <p className="text-lg font-bold text-neutral-900">
                              {currencyFormatter.format(price)}
                            </p>
                            <p className="text-[0.55rem] text-neutral-500">
                              Size {listing.size ?? "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1 text-[0.55rem] text-neutral-500">
                          <span className="rounded-md border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-neutral-700">
                            {formatSneakerCondition(listing.condition)}
                          </span>
                          <span className="rounded-md border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-neutral-700">
                            Seller verified
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="border-t border-neutral-200 px-3 py-3">
                      <LiveListingBadge baseSold={soldCount} />
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm text-neutral-700">
              <p>
                Showing page <span className="font-semibold text-neutral-900">{currentPage}</span> of{" "}
                <span className="font-semibold text-neutral-900">{totalPages}</span>
              </p>
              <div className="flex items-center gap-3">
                {previousPage ? (
                  <Link
                    href={`/marketplace?page=${previousPage}#all-listings`}
                    className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-900 transition hover:border-neutral-500"
                  >
                    Previous
                  </Link>
                ) : null}
                {nextPage ? (
                  <Link
                    href={`/marketplace?page=${nextPage}#all-listings`}
                    className="rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700 transition hover:border-emerald-400"
                  >
                    Next
                  </Link>
                ) : null}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
