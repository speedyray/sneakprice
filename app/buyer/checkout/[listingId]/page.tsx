import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";
import { formatHoldExpiry } from "@/lib/listing-hold";
import { MarketplaceListingImage } from "@/components/MarketplaceListingImage";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function BuyerCheckoutPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId: rawListingId } = await params;
  const listingId = Number(rawListingId);
  const signedInUser = await getSignedInUser();

  if (!signedInUser) {
    redirect("/login");
  }

  const listing = await prisma.marketplaceListing.findUnique({
    where: { id: listingId },
    include: {
      sneaker: true,
      listingHolds: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  if (!listing) {
    notFound();
  }

  const latestHold = listing.listingHolds[0];
  const heldByBuyer = latestHold?.buyerId === signedInUser.email;

  if (!latestHold || !heldByBuyer) {
    redirect(`/marketplace/${listing.id}`);
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
              Buyer checkout
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Review your purchase
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-400">
              Your hold is active. This is the first step of the buyer purchase flow:
              confirm the pair and continue to buyer details next.
            </p>
          </div>
          <Link
            href={`/marketplace/${listing.id}`}
            className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-neutral-200 transition hover:border-neutral-500"
          >
            Back to listing
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-neutral-800 bg-neutral-900/70 p-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white">
              <MarketplaceListingImage
                src={listing.sneaker.imageUrl}
                alt={`${listing.sneaker.brand} ${listing.sneaker.model}`}
              />
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                  {listing.sneaker.brand}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-white">
                  {listing.sneaker.model}
                </h2>
                <p className="mt-1 text-neutral-400">{listing.sneaker.colorway}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                    Size
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">{listing.size}</p>
                </div>
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                    Condition
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">{listing.condition}</p>
                </div>
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                    Seller
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">{listing.sellerName}</p>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-neutral-800 bg-neutral-900 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.28)]">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Buy now
              </p>
              <p className="mt-3 text-5xl font-bold text-white">
                {currencyFormatter.format(listing.price)}
              </p>

              <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-4">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-emerald-300">
                  Hold active
                </p>
                <p className="mt-2 text-sm text-emerald-100">
                  Reserved for {signedInUser.name} until{" "}
                  {formatHoldExpiry(latestHold.expiresAt)}.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  disabled
                  className="w-full rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black opacity-70"
                >
                  Buyer details next
                </button>
                <p className="text-xs text-neutral-500">
                  Next step: collect buyer information and complete the checkout handoff.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-5">
              <h3 className="text-lg font-semibold text-white">What happens now</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-400">
                <li>1. Your pair is reserved for 15 minutes.</li>
                <li>2. Next we will capture buyer details and confirmation info.</li>
                <li>3. Then the seller can complete the handoff with confidence.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
