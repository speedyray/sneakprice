import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";
import { captureBuyerInfoAction } from "@/app/buyer/checkout/actions";
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
  const { listingId } = await params;
  const signedInUser = await getSignedInUser();

  if (!signedInUser) {
    redirect("/login");
  }

  const listing = await prisma.marketplaceListing.findUnique({
    where: { id: listingId },
    include: {
      sneaker: true,
      seller: {
        include: {
          sellerProfile: true,
        },
      },
    },
  });

  if (!listing) {
    notFound();
  }

  const previousInfo = await prisma.listingHold.findFirst({
    where: {
      listingId,
      buyerId: signedInUser.email,
    },
    orderBy: { createdAt: "desc" },
  });

  const buyerEmail = previousInfo?.buyerEmail ?? signedInUser.email;
  const buyerName = previousInfo?.buyerName ?? signedInUser.name;
  const shippingSummary = [
    previousInfo?.shippingAddress,
    previousInfo?.shippingCity,
    previousInfo?.shippingRegion,
    previousInfo?.shippingCountry,
  ]
    .filter(Boolean)
    .join(", ");
  const hasShippingInfo = Boolean(
    previousInfo?.shippingAddress ||
      previousInfo?.shippingCity ||
      previousInfo?.shippingCountry
  );

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
              Buyer checkout
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Confirm your purchase details
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-600">
              We no longer support holds. This page shares your buyer info with the seller before
              they ship or meet up. Complete the form and the seller can coordinate final handoff.
            </p>
          </div>
          <Link
            href={`/marketplace/${listing.id}`}
            className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-black transition hover:border-black/30"
          >
            Back to listing
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
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
                <h2 className="mt-2 text-3xl font-bold text-black">
                  {listing.sneaker.model}
                </h2>
                <p className="mt-1 text-neutral-600">{listing.sneaker.colorway}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-black/10 bg-white px-4 py-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                    Size
                  </p>
                  <p className="mt-2 text-sm font-semibold text-black">{listing.size}</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white px-4 py-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                    Condition
                  </p>
                  <p className="mt-2 text-sm font-semibold text-black">{listing.condition}</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white px-4 py-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                    Seller
                  </p>
                  <p className="mt-2 text-sm font-semibold text-black">{listing.seller.sellerProfile?.storeName ?? "SneakPrice Seller"}</p>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Buy now
              </p>
              <p className="mt-3 text-5xl font-bold text-black">
                {currencyFormatter.format(listing.price)}
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Pricing may vary based on your shipping or pickup arrangement.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-5 text-sm text-neutral-600 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                No holds, no guessing
              </p>
              <p className="text-sm">
                Once you submit this form, the seller knows your confirmed name, email, and location.
                Continue the conversation through the app or checkout notes to finalize payment.
              </p>
            </div>
          </aside>
        </div>

        <section className="space-y-6 rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
              Buyer info capture
            </p>
            <h2 className="text-3xl font-bold">Share your contact details</h2>
            <p className="text-sm text-neutral-600">
              Supply the name, email, and shipping instructions the seller can rely on. Submit once you are ready to move forward.
            </p>
            {hasShippingInfo || previousInfo?.buyerEmail ? (
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-700">
                Latest submitted info is shown below and will be shared with the seller when you tap
                {" "}Save buyer info.
              </p>
            ) : null}
          </div>

          <form action={captureBuyerInfoAction} className="space-y-5">
            <input type="hidden" name="listingId" value={listing.id} />

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm text-neutral-700">
                Full name
                <input
                  name="fullName"
                  required
                  defaultValue={buyerName}
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
                />
              </label>
              <label className="space-y-1 text-sm text-neutral-700">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={buyerEmail}
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
                />
              </label>
            </div>

            <div className="space-y-3 text-sm text-neutral-700">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Shipping or meet-up details (optional)
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1">
                  Address
                  <input
                    name="shippingAddress"
                    defaultValue={previousInfo?.shippingAddress ?? ""}
                    placeholder="Street, apartment, etc."
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
                  />
                </label>
                <label className="space-y-1">
                  City
                  <input
                    name="shippingCity"
                    defaultValue={previousInfo?.shippingCity ?? ""}
                    placeholder="City"
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
                  />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1">
                  Region / State
                  <input
                    name="shippingRegion"
                    defaultValue={previousInfo?.shippingRegion ?? ""}
                    placeholder="State, province, etc."
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
                  />
                </label>
                <label className="space-y-1">
                  Country
                  <input
                    name="shippingCountry"
                    defaultValue={previousInfo?.shippingCountry ?? ""}
                    placeholder="Country"
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
                  />
                </label>
              </div>
            </div>

            <label className="space-y-1 text-sm text-neutral-700">
              Notes for seller
              <textarea
                name="buyerNotes"
                defaultValue={previousInfo?.buyerNotes ?? ""}
                rows={3}
                placeholder="Leave any details about shipping preference, drop-off, or timing."
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
              />
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-emerald-400"
              >
                Save buyer info
              </button>
              {hasShippingInfo || previousInfo?.buyerEmail ? (
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {shippingSummary ? `${shippingSummary}` : "Shipping info on file"}
                </p>
              ) : null}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
