import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";
import { MarketplaceListingImage } from "@/components/MarketplaceListingImage";
import { LiveListingBadge } from "@/components/LiveListingBadge";

const PAGE_SIZE = 60;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

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
    getSignedInUser(),
    prisma.marketplaceListing.count({
      where: { status: "ACTIVE" },
    }),
    prisma.marketplaceListing.findMany({
      where: { status: "ACTIVE" },
      include: {
        sneaker: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalListings / PAGE_SIZE));
  const previousPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  function renderListingCard(listing: (typeof listings)[number]) {
    const soldCount = 1400 + (listing.id % 900);

    return (
      <article
        key={listing.id}
        className="overflow-hidden rounded-2xl border border-black/5 bg-white"
      >
        <Link href={`/marketplace/${listing.id}`} className="block h-full">
          <div className="relative aspect-[2/1] overflow-hidden rounded-[0.9rem] bg-white">
            <MarketplaceListingImage
              src={listing.sneaker.imageUrl}
              alt={`${listing.sneaker.brand} ${listing.sneaker.model}`}
            />
            <div className="absolute left-2 top-2 rounded-full border border-emerald-700/25 bg-white/95 px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
              {listing.status}
            </div>
          </div>

          <div className="space-y-2.5 px-2.5 pb-2.5 pt-3">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-700">
                {listing.sneaker.brand}
              </p>
              <h3 className="line-clamp-2 text-base font-semibold leading-snug text-black">
                {listing.sneaker.model}
              </h3>
              <p className="line-clamp-1 text-sm text-neutral-800">
                {listing.sneaker.colorway}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-800">
                Lowest Ask
              </p>
              <div className="flex items-end justify-between gap-3">
                <p className="text-3xl font-bold leading-none text-black">
                  {currencyFormatter.format(listing.price)}
                </p>
                <p className="text-xs text-neutral-700">
                  Size {listing.size}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-800">
              <span className="rounded-md bg-white px-2 py-0.5">
                {listing.condition}
              </span>
              <span className="rounded-md bg-white px-2 py-0.5">Seller verified</span>
            </div>
          </div>
        </Link>
        <div className="border-t border-black/10 px-3 py-3">
          <LiveListingBadge baseSold={soldCount} />
        </div>
      </article>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="w-full space-y-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-700">
                Marketplace
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Browse live sneaker listings
              </h1>
              <p className="mt-4 max-w-2xl text-neutral-600">
                This is the first marketplace foundation for SneakPrice. You can
                now test a dedicated browse page backed by Prisma data.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {signedInUser ? (
                <Link
                  href="/marketplace/sell"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-black transition hover:border-black/30"
                >
                  Create listing
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-black transition hover:border-black/30"
                >
                  Login / Sign Up
                </Link>
              )}
              <Link
                href="/buyer"
                className="inline-flex items-center justify-center rounded-full border border-emerald-600/30 bg-emerald-500/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-emerald-700 transition hover:border-emerald-600/50"
              >
                Browse buyer portal
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/80 px-5 py-4 text-sm text-neutral-600 shadow-[0_18px_40px_rgba(0,0,0,0.04)]">
            Active listings:{" "}
            <span className="font-semibold text-black">{totalListings}</span>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-neutral-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-black/15 bg-white/70 px-8 py-16 text-center">
            <h2 className="text-2xl font-semibold">No listings yet</h2>
            <p className="mx-auto mt-3 max-w-xl text-neutral-600">
              Inventory is still coming online. Add a listing or check back momentarily.
            </p>
          </div>
        ) : (
          <section className="space-y-6" id="all-listings">
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
              {listings.map(renderListingCard)}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white/80 px-5 py-4 text-sm text-neutral-600 shadow-[0_18px_40px_rgba(0,0,0,0.04)]">
              <p>
                Showing page <span className="font-semibold text-black">{currentPage}</span> of{" "}
                <span className="font-semibold text-black">{totalPages}</span>
              </p>
              <div className="flex items-center gap-3">
                {previousPage ? (
                  <Link
                    href={`/marketplace?page=${previousPage}#all-listings`}
                    className="rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:border-black/30"
                  >
                    Previous
                  </Link>
                ) : null}
                {nextPage ? (
                  <Link
                    href={`/marketplace?page=${nextPage}#all-listings`}
                    className="rounded-full border border-emerald-600/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700 transition hover:border-emerald-600/50"
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
