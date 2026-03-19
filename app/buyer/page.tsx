import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";
import { holdListingAction, formatHoldExpiry } from "@/lib/listing-hold";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function BuyerPage() {
  const signedInUser = await getSignedInUser();

  if (!signedInUser) {
    redirect("/signin");
  }

  const listings = await prisma.marketplaceListing.findMany({
    where: {
      status: { in: ["ACTIVE", "HELD"] },
    },
    include: {
      sneaker: true,
      listingHolds: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 px-6 py-10 text-white">
      <div className="mx-auto max-w-[1200px] space-y-8">
        <div className="flex flex-col gap-6 rounded-[32px] border border-neutral-800 bg-neutral-900/70 px-8 py-6 shadow-[0_10px_50px_rgba(0,0,0,0.45)] md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
              Buyer portal
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight">Reserved buyers only</h1>
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-emerald-200 transition hover:border-emerald-400"
              >
                Browse listings
              </Link>
            </div>
            <p className="text-sm text-neutral-400">
              Signed in as{" "}
              <span className="font-semibold text-white">{signedInUser.name}</span>.
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              {listings.length} listings ready to hold
            </p>
          </div>
          <div className="space-y-2 text-right">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
              Active holds
            </p>
            <p className="text-3xl font-bold text-emerald-400">
              {listings.length}
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Fresh arrivals refreshed live
            </p>
            <Link
              href="/marketplace"
              className="text-xs uppercase tracking-[0.4em] text-emerald-200"
            >
              Switch to marketplace view
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {listings.map((listing) => {
            const hold = listing.listingHolds[0];
            const isHeld = listing.status === "HELD";
            const heldByUser = hold?.buyerName === signedInUser.name;
            const holdExpiry = hold ? formatHoldExpiry(hold.expiresAt) : null;
            const canHold = !isHeld || heldByUser;
            const buttonLabel = heldByUser
              ? "You hold it"
              : isHeld
              ? `Held by ${hold?.buyerName}`
              : "Place hold";

            return (
              <article
                key={listing.id}
                className="flex h-full flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/50 p-5 shadow-[0_15px_30px_rgba(0,0,0,0.45)] transition hover:border-emerald-500/70"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-neutral-500">
                    <span>{listing.sneaker.brand}</span>
                    <span>{listing.condition}</span>
                  </div>
                  <h2 className="text-xl font-semibold">{listing.sneaker.model}</h2>
                  <p className="text-sm text-neutral-400">{listing.sneaker.colorway}</p>
                  <div className="flex items-center justify-between text-sm text-neutral-300">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                        Ask
                      </p>
                      <p className="text-2xl font-bold text-emerald-400">
                        {currencyFormatter.format(listing.price)}
                      </p>
                    </div>
                    <div className="text-right text-xs text-neutral-400">
                      <p>Size {listing.size}</p>
                      <p className="text-neutral-500">Seller: {listing.sellerName}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  {isHeld && hold ? (
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                      Held by {hold.buyerName} until {holdExpiry}
                    </p>
                  ) : null}
                  <form className="space-y-2" action={holdListingAction}>
                    <input type="hidden" name="listingId" value={listing.id} />
                    <button
                      type="submit"
                      disabled={!canHold}
                      className={`w-full rounded-2xl border px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                        canHold
                          ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-200 hover:border-emerald-400"
                          : "border-neutral-700 bg-neutral-900 text-neutral-600"
                      }`}
                    >
                      {buttonLabel}
                    </button>
                  </form>
                  <p className="text-xs text-neutral-500">
                    Holds last 15 minutes. Meet the seller to finalize.
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
