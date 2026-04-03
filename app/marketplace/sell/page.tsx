import Link from "next/link";
import { redirect } from "next/navigation";
import { createListing } from "@/app/marketplace/actions";
import { ListingForm } from "@/components/ListingForm";
import { initialListingFormValues } from "@/lib/marketplace-form";
import { getSignedInUser } from "@/lib/session";

export default async function SellPage({
  searchParams,
}: {
  searchParams?: Promise<{ created?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const signedInUser = await getSignedInUser();

  if (!signedInUser) {
    redirect(`/login?redirect_url=${encodeURIComponent("/marketplace/sell")}`);
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
              List a sneaker
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-600">
              Publish a sneaker listing without mixing the seller workflow into
              the browse page. You are listing as {signedInUser.name}.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/marketplace/my-listings"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-black transition hover:border-black/30"
            >
              My listings
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-black transition hover:border-black/30"
            >
              Back to browse
            </Link>
            <Link
              href="/buyer"
              className="inline-flex items-center justify-center rounded-full border border-emerald-600/30 bg-emerald-500/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-emerald-700 transition hover:border-emerald-600/50"
            >
              Buyer portal
            </Link>
          </div>
        </div>

        <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Create listing</h2>
            <p className="text-sm text-neutral-600">
              Better inputs, image uploads, and validation now run through action state.
            </p>
          </div>

          {resolvedSearchParams?.created === "1" ? (
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
              Listing created. You can now manage it from your seller dashboard.
            </div>
          ) : null}
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-neutral-400">
            Listing as {signedInUser.name}
          </p>
          <ListingForm
            action={createListing}
            submitLabel="Create listing"
            initialValues={initialListingFormValues}
          />
          <p className="mt-4 text-xs text-neutral-500">
            Uploaded images are stored inline for now so we can finish the product flow
            before moving to permanent media storage.
          </p>
        </section>
      </div>
    </main>
  );
}
