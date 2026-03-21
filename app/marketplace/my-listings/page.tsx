import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";
import { formatHoldExpiry } from "@/lib/listing-hold";
import { MarketplaceListingImage } from "@/components/MarketplaceListingImage";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function MyListingsPage() {
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
      listingHolds: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  const activeCount = listings.filter((listing) => listing.status === "ACTIVE").length;
  const heldCount = listings.filter((listing) => listing.status === "HELD").length;
  const totalValue = listings.reduce((sum, listing) => sum + listing.price, 0);

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
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
              <p className="mt-4 max-w-3xl text-neutral-400">
                Manage the sneakers you have listed on SneakPrice. Clerk handles your
                account identity, while this page tracks your marketplace inventory.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/marketplace/sell"
                className="inline-flex items-center justify-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-emerald-200 transition hover:border-emerald-400"
              >
                Create listing
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-neutral-200 transition hover:border-neutral-500"
              >
                Browse marketplace
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 px-5 py-4">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                Total listings
              </p>
              <p className="mt-2 text-3xl font-bold text-white">{listings.length}</p>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 px-5 py-4">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                Active / Held
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {activeCount} / {heldCount}
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 px-5 py-4">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                Ask value
              </p>
              <p className="mt-2 text-3xl font-bold text-emerald-300">
                {currencyFormatter.format(totalValue)}
              </p>
            </div>
          </div>
        </div>

        {listings.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-neutral-700 bg-neutral-900/50 px-8 py-16 text-center">
            <h2 className="text-2xl font-semibold">No listings yet</h2>
            <p className="mx-auto mt-3 max-w-xl text-neutral-400">
              You have not listed any sneakers yet. Start with your first pair and it
              will appear here in your seller dashboard.
            </p>
            <Link
              href="/marketplace/sell"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200 transition hover:border-emerald-400"
            >
              Create your first listing
            </Link>
          </section>
        ) : (
          <section className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Inventory overview</h2>
                <p className="text-sm text-neutral-400">
                  Your live marketplace listings and current reservation status.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {listings.map((listing) => {
                const latestHold = listing.listingHolds[0];

                return (
                  <article
                    key={listing.id}
                    className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-[0_15px_30px_rgba(0,0,0,0.25)]"
                  >
                    <Link href={`/marketplace/${listing.id}`} className="block h-full">
                      <div className="relative aspect-square overflow-hidden bg-neutral-950">
                        <MarketplaceListingImage
                          src={listing.sneaker.imageUrl}
                          alt={`${listing.sneaker.brand} ${listing.sneaker.model}`}
                        />
                        <div className="absolute left-3 top-3 rounded-full border border-emerald-500/40 bg-black/65 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-emerald-200">
                          {listing.status}
                        </div>
                      </div>

                      <div className="space-y-3 p-4">
                        <div className="space-y-1">
                          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-neutral-500">
                            {listing.sneaker.brand}
                          </p>
                          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                            {listing.sneaker.model}
                          </h3>
                          <p className="line-clamp-1 text-xs text-neutral-400">
                            {listing.sneaker.colorway}
                          </p>
                        </div>

                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                              Ask
                            </p>
                            <p className="text-lg font-bold text-emerald-400">
                              {currencyFormatter.format(listing.price)}
                            </p>
                          </div>
                          <div className="text-right text-xs text-neutral-400">
                            <p>Size {listing.size}</p>
                            <p>{listing.condition}</p>
                          </div>
                        </div>

                        {latestHold ? (
                          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-amber-400">
                            Held by {latestHold.buyerName} until{" "}
                            {formatHoldExpiry(latestHold.expiresAt)}
                          </p>
                        ) : (
                          <p className="text-xs text-neutral-500">No active hold</p>
                        )}
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
