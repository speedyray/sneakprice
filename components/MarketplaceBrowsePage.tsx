import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";
import { MarketplaceListingImage } from "@/components/MarketplaceListingImage";
import { MarketplaceVideoShowcase } from "@/components/MarketplaceVideoShowcase";

const PAGE_SIZE = 60;
const FEATURED_VIDEO_INSERT_INDEX = 12;

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
  const listingsBeforeVideo = listings.slice(0, FEATURED_VIDEO_INSERT_INDEX);
  const listingsAfterVideo = listings.slice(FEATURED_VIDEO_INSERT_INDEX);

  function renderListingCard(listing: (typeof listings)[number]) {

    return (
      <article
        key={listing.id}
        className="overflow-hidden rounded-2xl border border-neutral-950 bg-neutral-950"
      >
        <Link href={`/marketplace/${listing.id}`} className="block h-full">
          <div className="relative aspect-[2/1] overflow-hidden rounded-[0.9rem] bg-white">
            <MarketplaceListingImage
              src={listing.sneaker.imageUrl}
              alt={`${listing.sneaker.brand} ${listing.sneaker.model}`}
            />
            <div className="absolute left-2 top-2 rounded-full border border-emerald-500/40 bg-black/65 px-1.5 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.25em] text-emerald-200">
              {listing.status}
            </div>
          </div>

          <div className="space-y-1 px-1 pb-1 pt-1.5">
            <div className="space-y-1">
              <p className="text-[0.5rem] uppercase tracking-[0.24em] text-neutral-500">
                {listing.sneaker.brand}
              </p>
              <h3 className="line-clamp-2 text-[0.72rem] font-semibold leading-snug text-white">
                {listing.sneaker.model}
              </h3>
              <p className="line-clamp-1 text-[0.6rem] text-neutral-400">
                {listing.sneaker.colorway}
              </p>
            </div>

            <div className="space-y-0.5">
              <p className="text-[0.55rem] font-medium text-neutral-400">
                Lowest Ask
              </p>
              <div className="flex items-end justify-between gap-3">
                <p className="text-lg font-bold text-white">
                  {currencyFormatter.format(listing.price)}
                </p>
                <p className="text-[0.55rem] text-neutral-500">
                  Size {listing.size}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1 text-[0.55rem] text-neutral-500">
              <span className="rounded-md bg-neutral-900 px-1.5 py-0.5">
                {listing.condition}
              </span>
              <span className="rounded-md bg-neutral-900 px-1.5 py-0.5">
                Seller verified
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1 text-[0.55rem] text-neutral-500">
              <span className="rounded-md bg-neutral-900 px-1.5 py-0.5">
                {1400 + (listing.id % 900)} sold
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <div className="w-full space-y-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                Marketplace
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Browse live sneaker listings
              </h1>
              <p className="mt-4 max-w-2xl text-neutral-400">
                This is the first marketplace foundation for SneakPrice. You can
                now test a dedicated browse page backed by Prisma data.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {signedInUser ? (
                <Link
                  href="/marketplace/sell"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-neutral-200 transition hover:border-neutral-500"
                >
                  Create listing
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-neutral-200 transition hover:border-neutral-500"
                >
                  Login / Sign Up
                </Link>
              )}
              <Link
                href="/buyer"
                className="inline-flex items-center justify-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-emerald-200 transition hover:border-emerald-400"
              >
                Browse buyer portal
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 px-5 py-4 text-sm text-neutral-300">
            Active listings:{" "}
            <span className="font-semibold text-white">{totalListings}</span>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-neutral-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-700 bg-neutral-900/60 px-8 py-16 text-center">
            <h2 className="text-2xl font-semibold">No listings yet</h2>
            <p className="mx-auto mt-3 max-w-xl text-neutral-400">
              The marketplace data layer is in place, but there are no active
              or held listings in the database yet. Run the seed script or open
              the seller page to add the first listing.
            </p>
          </div>
        ) : (
          <section className="space-y-6" id="all-listings">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">All listings</h2>
                <p className="text-sm text-neutral-400">
                  Compact browse mode with up to 60 listings per page.
                </p>
              </div>
              <Link
                href="/marketplace?page=1#all-listings"
                className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300"
              >
                See all -&gt;
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 xl:grid-cols-6">
              {listingsBeforeVideo.map(renderListingCard)}
            </div>

            {listingsAfterVideo.length > 0 ? <MarketplaceVideoShowcase /> : null}

            {listingsAfterVideo.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 xl:grid-cols-6">
                {listingsAfterVideo.map(renderListingCard)}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/70 px-5 py-4 text-sm text-neutral-300">
              <p>
                Showing page <span className="font-semibold text-white">{currentPage}</span> of{" "}
                <span className="font-semibold text-white">{totalPages}</span>
              </p>
              <div className="flex items-center gap-3">
                {previousPage ? (
                  <Link
                    href={`/marketplace?page=${previousPage}#all-listings`}
                    className="rounded-full border border-neutral-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-200 transition hover:border-neutral-500"
                  >
                    Previous
                  </Link>
                ) : null}
                {nextPage ? (
                  <Link
                    href={`/marketplace?page=${nextPage}#all-listings`}
                    className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200 transition hover:border-emerald-400"
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
