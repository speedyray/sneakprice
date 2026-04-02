import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/current-user";
import { ListingForm } from "@/components/ListingForm";
import { updateListing } from "@/app/marketplace/actions";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId } = await params;
  const currentUser = await getCurrentDbUser();

  if (!currentUser) {
    redirect("/login");
  }

  const listing = await prisma.marketplaceListing.findFirst({
    where: {
      id: listingId,
      sellerId: currentUser.id,
    },
    include: {
      sneaker: true,
    },
  });

  if (!listing) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
              Seller Studio
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Edit listing
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-600">
              Update pricing, product details, and visuals for this listing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/marketplace/my-listings"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-black transition hover:border-black/30"
            >
              Back to my listings
            </Link>
            <Link
              href={`/marketplace/${listing.id}`}
              className="inline-flex items-center justify-center rounded-full border border-emerald-600/30 bg-emerald-500/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-emerald-700 transition hover:border-emerald-600/50"
            >
              View listing
            </Link>
          </div>
        </div>

        <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Listing details</h2>
            <p className="text-sm text-neutral-600">
              Changes save back into the marketplace immediately.
            </p>
          </div>

          <ListingForm
            action={updateListing}
            submitLabel="Save changes"
            listingId={listing.id}
            initialValues={{
              brand: listing.sneaker.brand ?? "",
              model: listing.sneaker.model ?? "",
              colorway: listing.sneaker.colorway ?? "",
              sku: listing.sneaker.sku ?? "",
              size: listing.size ?? "",
              price: String(listing.price),
              retailPrice: "",
              condition: String(listing.condition),
              imageUrl: listing.sneaker.primaryImageUrl ?? "",
            }}
          />
        </section>
      </div>
    </main>
  );
}

