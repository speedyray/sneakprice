import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/current-user";
import { MarketplaceListingImage } from "@/components/MarketplaceListingImage";
import {
  deleteListing,
  markListingSold,
  relistListing,
  unlistListing,
} from "@/app/marketplace/actions";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function MyListingsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    created?: string;
    updated?: string;
    deleted?: string;
    sold?: string;
    unlisted?: string;
    relisted?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentUser = await getCurrentDbUser();

  if (!currentUser) {
    redirect("/login");
  }

  const listings = await prisma.marketplaceListing.findMany({
    where: {
      sellerId: currentUser.id,
    },
    include: {
      sneaker: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const activeCount = listings.filter((listing) => listing.status === "ACTIVE").length;
  const reservedCount = listings.filter((listing) => listing.status === "RESERVED").length;
  const soldCount = listings.filter((listing) => listing.status === "SOLD").length;
  const totalValue = listings.reduce(
    (sum, listing) => sum + Number(listing.price),
    0,
  );

  const listingGroups = [
    {
      key: "active",
      title: "Active listings",
      description: "Visible now and ready for buyers.",
      listings: listings.filter((listing) => listing.status === "ACTIVE"),
    },
    {
      key: "reserved",
      title: "Reserved listings",
      description: "Currently reserved for checkout.",
      listings: listings.filter((listing) => listing.status === "RESERVED"),
    },
    {
      key: "draft",
      title: "Unlisted inventory",
      description: "Hidden from buyers until you relist them.",
      listings: listings.filter((listing) => listing.status === "DRAFT"),
    },
    {
      key: "sold",
      title: "Sold archive",
      description: "Pairs you marked as sold.",
      listings: listings.filter((listing) => listing.status === "SOLD"),
    },
  ];

  function renderListingActions(listing: (typeof listings)[number]) {
    return (
      <div className="space-y-3 border-t border-black/10 px-4 py-4">
        <Link
          href={`/marketplace/my-listings/${listing.id}/edit`}
          className="inline-flex w-full items-center justify-center rounded-2xl border border-black/20 bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-neutral-800"
        >
          Edit Listing
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {listing.status !== "SOLD" ? (
            <form action={markListingSold}>
              <input type="hidden" name="listingId" value={listing.id} />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-emerald-600/30 bg-emerald-500/10 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-emerald-700 transition hover:border-emerald-600/50"
              >
                Mark sold
              </button>
            </form>
          ) : null}

          {listing.status === "ACTIVE" || listing.status === "RESERVED" ? (
            <form action={unlistListing}>
              <input type="hidden" name="listingId" value={listing.id} />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-amber-700 transition hover:border-amber-500/50"
              >
                Unlist
              </button>
            </form>
          ) : null}

          {listing.status === "DRAFT" || listing.status === "SOLD" ? (
            <form action={relistListing}>
              <input type="hidden" name="listingId" value={listing.id} />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-sky-700 transition hover:border-sky-500/50"
              >
                Relist
              </button>
            </form>
          ) : null}

          <form action={deleteListing}>
            <input type="hidden" name="listingId" value={listing.id} />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-rose-700 transition hover:border-rose-500/50"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
              Seller Studio
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              My listings
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-600">
              Manage live pairs, refresh details, and control what buyers can see.
            </p>
          </div>

          <Link
            href="/marketplace/sell"
            className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-neutral-800"
          >
            Create listing
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Active</p>
            <p className="mt-3 text-3xl font-bold">{activeCount}</p>
          </div>
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Reserved</p>
            <p className="mt-3 text-3xl font-bold">{reservedCount}</p>
          </div>
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Sold</p>
            <p className="mt-3 text-3xl font-bold">{soldCount}</p>
          </div>
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Total value</p>
            <p className="mt-3 text-3xl font-bold">{currencyFormatter.format(totalValue)}</p>
          </div>
        </div>

        {resolvedSearchParams?.created ? (
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-800">
            Listing created successfully.
          </div>
        ) : null}

        {resolvedSearchParams?.updated ? (
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-800">
            Listing updated successfully.
          </div>
        ) : null}

        {resolvedSearchParams?.deleted ? (
          <div className="rounded-2xl border border-neutral-300 bg-neutral-100 px-5 py-4 text-sm text-neutral-700">
            Listing deleted.
          </div>
        ) : null}

        {resolvedSearchParams?.sold ? (
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-800">
            Listing marked as sold.
          </div>
        ) : null}

        {resolvedSearchParams?.unlisted ? (
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 px-5 py-4 text-sm text-amber-800">
            Listing moved back to unlisted inventory.
          </div>
        ) : null}

        {resolvedSearchParams?.relisted ? (
          <div className="rounded-2xl border border-sky-500/25 bg-sky-500/10 px-5 py-4 text-sm text-sky-800">
            Listing relisted successfully.
          </div>
        ) : null}

        <div className="space-y-8">
          {listingGroups.map((group) => (
            <section key={group.key} className="space-y-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-black">{group.title}</h2>
                  <p className="text-sm text-neutral-600">{group.description}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                  {group.listings.length} listing{group.listings.length === 1 ? "" : "s"}
                </p>
              </div>

              {group.listings.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-black/10 bg-white/70 px-8 py-12 text-center text-sm text-neutral-600">
                  Nothing here yet.
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {group.listings.map((listing) => (
                    <article
                      key={listing.id}
                      className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
                    >
                      <Link href={`/marketplace/${listing.id}`} className="block p-4">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white">
                          <MarketplaceListingImage
                            src={listing.primaryImageUrl ?? listing.sneaker.primaryImageUrl ?? ""}
                            alt={`${listing.sneaker.brand} ${listing.sneaker.model}`}
                          />
                          <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-black">
                            {listing.status}
                          </div>
                        </div>

                        <div className="space-y-3 px-1 pb-1 pt-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                              {listing.sneaker.brand}
                            </p>
                            <h3 className="mt-2 text-xl font-semibold text-black">
                              {listing.sneaker.model}
                            </h3>
                            <p className="mt-1 text-sm text-neutral-600">
                              {listing.sneaker.colorway}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-4 text-sm text-neutral-600">
                            <span>Size {listing.size}</span>
                            <span>{String(listing.condition).replaceAll("_", " ")}</span>
                          </div>

                          <div className="flex items-end justify-between gap-4">
                            <div>
                              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                                Ask
                              </p>
                              <p className="mt-2 text-3xl font-bold text-black">
                                {currencyFormatter.format(Number(listing.price))}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      {renderListingActions(listing)}
                    </article>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
