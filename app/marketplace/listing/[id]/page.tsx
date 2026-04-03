import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketplaceListingImage } from "@/components/MarketplaceListingImage";
import { prisma } from "@/lib/prisma";

type ListingDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatCondition(condition: string | null | undefined) {
  if (!condition) return "Condition N/A";

  return condition
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function ListingDetailPage({
  params,
}: ListingDetailPageProps) {
  const { id } = await params;

  const listing = await prisma.marketplaceListing.findFirst({
    where: {
      id,
      status: "ACTIVE",
    },
  });

  if (!listing) {
    notFound();
  }

  const title =
    listing.title ||
    `${listing.brand ?? ""} ${listing.model ?? ""}`.trim() ||
    "Sneaker Listing";

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6">
          <Link
            href="/storefront"
            className="inline-flex items-center rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-700 transition hover:border-black/25"
          >
            Back to Storefront
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
            <div className="aspect-square overflow-hidden rounded-2xl bg-neutral-100">
              <MarketplaceListingImage src={listing.primaryImageUrl} alt={title} />
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
                SneakPrice Listing
              </p>
              <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
              <p className="mt-3 text-neutral-600">
                Live marketplace listing from a verified seller.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {listing.status}
              </span>
              <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700">
                Seller Verified
              </span>
            </div>

            <div className="rounded-3xl border border-black/10 bg-neutral-50 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Lowest Ask
              </p>
              <p className="mt-2 text-5xl font-bold">
                ${Number(listing.price || 0).toLocaleString()}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                  Brand
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {listing.brand || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                  Model
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {listing.model || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                  Colorway
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {listing.colorway || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                  Size
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {listing.size || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                  Condition
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {formatCondition(listing.condition)}
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                  SKU
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {listing.sku || "N/A"}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <h2 className="text-xl font-semibold">SneakPrice Insight</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                This is where your market intelligence layer can go next:
                estimated market value, flip potential, pricing confidence, and
                whether the listing is above or below market.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/storefront"
                className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-black/5"
              >
                Continue Browsing
              </Link>

              <Link
                href="/marketplace/my-listings"
                className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                View Seller Portal
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
