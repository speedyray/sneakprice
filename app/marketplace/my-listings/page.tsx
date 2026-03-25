import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";
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
  const signedInUser = await getSignedInUser();

  if (!signedInUser) {
    redirect("/login");
  }

  const listings = await prisma.marketplaceListing.findMany({
    where: {
      sellerId: signedInUser.email,
    },
    include: {
      sneaker: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const activeCount = listings.filter((listing) => listing.status === "ACTIVE").length;
  const heldCount = listings.filter((listing) => listing.status === "HELD").length;
  const soldCount = listings.filter((listing) => listing.status === "SOLD").length;
  const draftCount = listings.filter((listing) => listing.status === "DRAFT").length;
  const totalValue = listings.reduce((sum, listing) => sum + listing.price, 0);

  const listingGroups = [
    {
      key: "active",
      title: "Active listings",
      description: "Visible now and ready for buyers.",
      listings: listings.filter((listing) => listing.status === "ACTIVE"),
    },
    {
      key: "held",
      title: "Held listings",
      description: "Currently reserved by a buyer hold.",
      listings: listings.filter((listing) => listing.status === "HELD"),
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
      <div className="flex flex-wrap items-center gap-2 border-t border-black/10 px-4 py-3">
        <Link
          href={`/marketplace/my-listings/${listing.id}/edit`}
          className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-black transition hover:border-black/30"
        >
          Edit
        </Link>

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

        {listing.status === "ACTIVE" || listing.status === "HELD" ? (
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
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto w-full max-w-[1600px] space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                Seller dashboard
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                My listings
              </h1>
              <p className="mt-4 max-w-3xl text-neutral-600">
                Manage the sneakers you have listed on SneakPrice. Clerk handles your
                account identity, while this page tracks your marketplace inventory.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/marketplace/sell"
                className="inline-flex items-center justify-center rounded-full border border-emerald-600/30 bg-emerald-500/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-emerald-700 transition hover:border-emerald-600/50"
              >
                Create listing
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-black transition hover:border-black/30"
              >
                Browse marketplace
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                Total listings
              </p>
              <p className="mt-2 text-3xl font-bold text-black">{listings.length}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                Active / Held
              </p>
              <p className="mt-2 text-3xl font-bold text-black">
                {activeCount} / {heldCount}
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                Sold / Unlisted
              </p>
              <p className="mt-2 text-3xl font-bold text-black">
                {soldCount} / {draftCount}
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-[0_15px_35px_rgba(0,0,0,0.05)] sm:col-span-3 lg:col-span-1">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                Ask value
              </p>
              <p className="mt-2 text-3xl font-bold text-emerald-700">
                {currencyFormatter.format(totalValue)}
              </p>
            </div>
          </div>
        </div>

        {resolvedSearchParams?.created === "1" ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
            Listing created successfully.
          </div>
        ) : null}
        {resolvedSearchParams?.updated === "1" ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
            Listing updated successfully.
          </div>
        ) : null}
        {resolvedSearchParams?.deleted === "1" ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
            Listing deleted successfully.
          </div>
        ) : null}
        {resolvedSearchParams?.sold === "1" ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
            Listing marked as sold.
          </div>
        ) : null}
        {resolvedSearchParams?.unlisted === "1" ? (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700">
            Listing moved to unlisted inventory.
          </div>
        ) : null}
        {resolvedSearchParams?.relisted === "1" ? (
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-700">
            Listing relisted successfully.
          </div>
        ) : null}

        {listings.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-black/15 bg-white px-8 py-16 text-center shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-semibold">No listings yet</h2>
            <p className="mx-auto mt-3 max-w-xl text-neutral-600">
              You have not listed any sneakers yet. Start with your first pair and it
              will appear here in your seller dashboard.
            </p>
            <Link
              href="/marketplace/sell"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-emerald-600/30 bg-emerald-500/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700 transition hover:border-emerald-600/50"
            >
              Create your first listing
            </Link>
          </section>
        ) : (
          <section className="space-y-10">
            {listingGroups.map((group) => (
              <div key={group.key} className="space-y-5">
                <div>
                  <h2 className="text-2xl font-semibold">{group.title}</h2>
                  <p className="text-sm text-neutral-600">{group.description}</p>
                </div>

                {group.listings.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-black/15 bg-white px-6 py-10 text-sm text-neutral-500 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
                    No listings in this section yet.
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {group.listings.map((listing) => {

                      return (
                        <article
                          key={listing.id}
                          className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
                        >
                          <Link href={`/marketplace/${listing.id}`} className="block">
                            <div className="relative aspect-square overflow-hidden bg-white">
                              <MarketplaceListingImage
                                src={listing.sneaker.imageUrl}
                                alt={`${listing.sneaker.brand} ${listing.sneaker.model}`}
                              />
                              <div className="absolute left-3 top-3 rounded-full border border-emerald-600/20 bg-white/95 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-emerald-700">
                                {listing.status}
                              </div>
                            </div>

                            <div className="space-y-3 p-4">
                              <div className="space-y-1">
                                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-neutral-500">
                                  {listing.sneaker.brand}
                                </p>
                                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-black">
                                  {listing.sneaker.model}
                                </h3>
                                <p className="line-clamp-1 text-xs text-neutral-600">
                                  {listing.sneaker.colorway}
                                </p>
                              </div>

                              <div className="flex items-end justify-between gap-3">
                                <div>
                                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                                    Ask
                                  </p>
                                  <p className="text-lg font-bold text-emerald-700">
                                    {currencyFormatter.format(listing.price)}
                                  </p>
                                </div>
                                <div className="text-right text-xs text-neutral-500">
                                  <p>Size {listing.size}</p>
                                  <p>{listing.condition}</p>
                                </div>
                              </div>

                              <p className="text-xs text-neutral-500">Hold feature removed. Buyers proceed with Buy now.</p>
                            </div>
                          </Link>
                          {renderListingActions(listing)}
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
