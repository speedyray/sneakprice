import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";
import { ListingForm } from "@/components/ListingForm";
import { updateListing } from "@/app/marketplace/actions";

export default async function EditListingPage({
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

  const listing = await prisma.marketplaceListing.findFirst({
    where: {
      id: listingId,
      sellerId: signedInUser.email,
    },
    include: {
      sneaker: true,
    },
  });

  if (!listing) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
              Seller Studio
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Edit listing
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-400">
              Update pricing, product details, and visuals for this listing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/marketplace/my-listings"
              className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-neutral-200 transition hover:border-neutral-500"
            >
              Back to my listings
            </Link>
            <Link
              href={`/marketplace/${listing.id}`}
              className="inline-flex items-center justify-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-emerald-200 transition hover:border-emerald-400"
            >
              View listing
            </Link>
          </div>
        </div>

        <section className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Listing details</h2>
            <p className="text-sm text-neutral-400">
              Changes save back into the marketplace immediately.
            </p>
          </div>

          <ListingForm
            action={updateListing}
            submitLabel="Save changes"
            listingId={listing.id}
            initialValues={{
              brand: listing.sneaker.brand,
              model: listing.sneaker.model,
              colorway: listing.sneaker.colorway,
              sku: listing.sneaker.sku,
              size: listing.size,
              price: String(listing.price),
              retailPrice: listing.sneaker.retailPrice
                ? String(listing.sneaker.retailPrice)
                : "",
              condition: listing.condition,
              imageUrl: listing.sneaker.imageUrl ?? "",
            }}
          />
        </section>
      </div>
    </main>
  );
}
