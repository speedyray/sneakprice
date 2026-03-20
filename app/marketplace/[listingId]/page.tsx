import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";
import { holdListingAction, formatHoldExpiry } from "@/lib/listing-hold";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default async function ListingPage({
  params,
}: {
  params: { listingId: string };
}) {
  const listingId = Number(params.listingId);
  const signedInUser = await getSignedInUser();
  const listing = await prisma.marketplaceListing.findUnique({
    where: { id: listingId },
    include: {
      sneaker: true,
      listingHolds: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });

  if (!listing) {
    notFound();
  }

  const latestHold = listing.listingHolds[0];
  const canHold = listing.status === "ACTIVE" && Boolean(signedInUser);

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl space-y-10 rounded-3xl border border-neutral-800 bg-neutral-900/60 p-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
              Listing
            </p>
            <h1 className="mt-2 text-4xl font-bold">
              {listing.sneaker.brand} {listing.sneaker.model}
            </h1>
          </div>
          <Link
            href="/marketplace"
            className="text-sm uppercase tracking-[0.3em] text-emerald-300"
          >
            Back to marketplace
          </Link>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-neutral-800 bg-neutral-950/40 p-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-neutral-400">{listing.sneaker.colorway}</p>
            <p className="text-sm text-neutral-400">Size {listing.size}</p>
            <p className="text-sm text-neutral-400">Condition: {listing.condition}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
              Asking price
            </p>
            <p className="mt-2 text-4xl font-bold text-emerald-400">
              {currencyFormatter.format(listing.price)}
            </p>
            <p className="text-xs text-neutral-400">
              Seller: {listing.sellerName}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Hold this listing</h2>
          <p className="text-sm text-neutral-400">
            Placing a hold reserves the sneaker for 15 minutes. It records your
            identity so buyers and sellers can coordinate the handoff.
          </p>
          {signedInUser ? (
            <form className="space-y-3" action={holdListingAction}>
              <input type="hidden" name="listingId" value={listing.id} />
              <button
                type="submit"
                disabled={!canHold}
                className={`w-full rounded-2xl border px-5 py-3 text-sm font-semibold uppercase tracking-[0.4em] transition ${
                  canHold
                    ? "border-emerald-500/70 bg-emerald-500/20 text-emerald-100 hover:border-emerald-400"
                    : "border-neutral-700 bg-neutral-900 text-neutral-500"
                }`}
              >
                {canHold ? "Place hold (15m)" : "Listing unavailable"}
              </button>
              {!canHold && listing.status !== "ACTIVE" ? (
                <p className="text-xs text-neutral-500">
                  This listing is currently {listing.status.toLowerCase()}.
                </p>
              ) : null}
            </form>
          ) : (
            <p className="text-sm text-neutral-400">
              Login or sign up at{" "}
              <Link href="/login" className="underline underline-offset-2">
                /login
              </Link>{" "}
              to hold listings as you.
            </p>
          )}
          {latestHold ? (
            <div className="rounded-2xl border border-amber-500/50 bg-amber-500/5 px-4 py-3 text-xs uppercase tracking-[0.3em] text-amber-300">
              Held by {latestHold.buyerName} until{" "}
              {formatHoldExpiry(latestHold.expiresAt)}
            </div>
          ) : null}
        </div>

        {listing.listingHolds.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Recent holds</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              {listing.listingHolds.map((hold) => (
                <li
                  key={hold.id}
                  className="rounded-2xl border border-neutral-800/70 bg-neutral-900/70 px-4 py-3"
                >
                  {hold.buyerName} · {formatHoldExpiry(hold.expiresAt)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
