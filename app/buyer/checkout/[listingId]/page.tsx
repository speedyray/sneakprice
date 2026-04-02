import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";
import { captureBuyerInfoAction } from "@/app/buyer/checkout/actions";
import { MarketplaceListingImage } from "@/components/MarketplaceListingImage";
import { decimalToNumber } from "@/lib/money";

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

  const buyerEmail = signedInUser.email;
  const buyerName = signedInUser.name;

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
              We no longer support holds. This page shares your buyer info with
              the seller before they ship or meet up.
            </p>
          </div>

          <Link
            href={`/marketplace/${listing.id}`}
            className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-black"
          >
            Back to listing
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-black/10 bg-white p-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white">
              <MarketplaceListingImage
                src={listing.primaryImageUrl ?? ""}
                alt={`${listing.sneaker.brand ?? ""} ${listing.sneaker.model ?? "Sneaker"}`}
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
                <p className="mt-1 text-neutral-600">
                  {listing.sneaker.colorway}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-black/10 px-4 py-3">
                  <p className="text-xs text-neutral-500">Size</p>
                  <p className="mt-1 font-semibold">{listing.size}</p>
                </div>

                <div className="rounded-2xl border border-black/10 px-4 py-3">
                  <p className="text-xs text-neutral-500">Condition</p>
                  <p className="mt-1 font-semibold">{listing.condition}</p>
                </div>

                <div className="rounded-2xl border border-black/10 px-4 py-3">
                  <p className="text-xs text-neutral-500">Seller</p>
                  <p className="mt-1 font-semibold">
                    {listing.seller.sellerProfile?.storeName ?? "SneakPrice Seller"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-black/10 p-6">
              <p className="text-sm text-neutral-500">Buy now</p>
              <p className="mt-3 text-5xl font-bold">
                {currencyFormatter.format(decimalToNumber(listing.price))}
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-5 text-sm text-neutral-600">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                No holds, no guessing
              </p>
              <p className="text-sm">
                Once you submit this form, the seller knows your confirmed name,
                email, and location.
              </p>
            </div>
          </aside>
        </div>

        <section className="rounded-[2rem] border border-black/10 p-6">
          <form action={captureBuyerInfoAction} className="space-y-5">
            <input type="hidden" name="listingId" value={listing.id} />

            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="fullName"
                required
                defaultValue={buyerName}
                className="border p-3 rounded"
              />

              <input
                name="email"
                type="email"
                required
                defaultValue={buyerEmail}
                className="border p-3 rounded"
              />
            </div>

            <div className="space-y-3 text-sm text-neutral-700">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="shippingAddress"
                  defaultValue=""
                  placeholder="Street, apartment, etc."
                  className="border p-3 rounded"
                />
                <input
                  name="shippingCity"
                  defaultValue=""
                  placeholder="City"
                  className="border p-3 rounded"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="shippingRegion"
                  defaultValue=""
                  placeholder="State, province, etc."
                  className="border p-3 rounded"
                />
                <input
                  name="shippingCountry"
                  defaultValue=""
                  placeholder="Country"
                  className="border p-3 rounded"
                />
              </div>
            </div>

            <textarea
              name="buyerNotes"
              defaultValue=""
              rows={3}
              placeholder="Leave any details about shipping preference, drop-off, or timing."
              className="w-full border p-3 rounded"
            />

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="bg-black text-white px-5 py-3 rounded-full"
              >
                Save buyer info
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}