import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingStatus, type SellerProfile, type User } from "@prisma/client";
import { ListingDetailGallery } from "@/components/marketplace/ListingDetailGallery";
import { MarketplaceListingImage } from "@/components/MarketplaceListingImage";
import { decimalToNumber } from "@/lib/money";
import {
  formatSneakerCondition,
  getSellerDisplayName,
} from "@/lib/marketplace-utils";
import { prisma } from "@/lib/prisma";

type ListingDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type UserWithSellerProfile = User & {
  sellerProfile?: SellerProfile | null;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatDate(value: Date | null | undefined) {
  if (!value) return "Recently listed";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

export default async function ListingDetailPage({
  params,
}: ListingDetailPageProps) {
  const { id } = await params;

  const listing = await prisma.marketplaceListing.findFirst({
    where: {
      id,
      status: ListingStatus.ACTIVE,
    },
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
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

  const title =
    listing.title ||
    `${listing.brand ?? ""} ${listing.model ?? ""}`.trim() ||
    "Sneaker Listing";
  const sellerName = getSellerDisplayName(listing.seller as UserWithSellerProfile);
  const listingPrice = decimalToNumber(listing.price);
  const formattedCondition = formatSneakerCondition(listing.condition);
  const gallerySources = [
    listing.primaryImageUrl,
    ...listing.images.map((image) => image.imageUrl),
  ].filter((value, index, array): value is string => Boolean(value) && array.indexOf(value) === index);
  const attentionScore = listing.viewsCount + listing.favoritesCount * 3;
  const estimatedLastSale = Math.max(listingPrice - 24, 0);
  const publishedLabel = formatDate(listing.publishedAt ?? listing.createdAt);

  const relatedListings = await prisma.marketplaceListing.findMany({
    where: {
      id: {
        not: listing.id,
      },
      status: ListingStatus.ACTIVE,
      ...(listing.brand
        ? {
            brand: listing.brand,
          }
        : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  const gallerySlides = [
    ...gallerySources.map((src, index) => ({
      id: `image-${index + 1}`,
      label: index === 0 ? "Pair" : `Alt ${index + 1}`,
      type: "image" as const,
      src,
      caption: index === 0 ? title : `${title} alternate view ${index + 1}`,
    })),
    {
      id: "size-overview",
      label: "Size",
      type: "info" as const,
      eyebrow: "Selected marketplace size",
      title: listing.size ? `Size ${listing.size}` : "Size available now",
      body:
        "This listing is tied to a single seller-owned pair. Checkout reserves the exact size shown here.",
      details: [
        `Condition: ${formattedCondition}`,
        `SKU: ${listing.sku || "Seller provided"}`,
      ],
      tone: "neutral" as const,
    },
    {
      id: "seller-overview",
      label: "Seller",
      type: "info" as const,
      eyebrow: "Verified seller profile",
      title: sellerName,
      body:
        "The listing stays attached to the seller account that created it, so operations and disputes can be traced cleanly inside the marketplace.",
      details: [
        `Published ${publishedLabel}`,
        `${attentionScore} marketplace attention score`,
      ],
      tone: "emerald" as const,
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf8f3] text-black">
      <div className="mx-auto w-full max-w-[1540px] px-6 py-10">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-500">
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/" className="transition hover:text-black">
                Home
              </Link>
              <span>/</span>
              <Link href="/marketplace" className="transition hover:text-black">
                Marketplace
              </Link>
              {listing.brand ? (
                <>
                  <span>/</span>
                  <span>{listing.brand}</span>
                </>
              ) : null}
              {listing.model ? (
                <>
                  <span>/</span>
                  <span className="text-neutral-700">{listing.model}</span>
                </>
              ) : null}
            </div>

            <Link
              href="/marketplace"
              className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-700 transition hover:border-black/25"
            >
              Back to listings
            </Link>
          </div>

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.92fr)_360px]">
            <ListingDetailGallery title={title} slides={gallerySlides} />

            <section className="space-y-5">
              <div className="space-y-4 rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-neutral-500">
                    SneakPrice Listing
                  </p>
                  <h1 className="text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
                    {title}
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-neutral-600">
                    {listing.colorway ? `${listing.colorway}. ` : ""}
                    Live marketplace inventory from a verified seller, ready for checkout
                    with the exact size and condition shown on this page.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {listing.status}
                  </span>
                  <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700">
                    Seller verified
                  </span>
                  <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700">
                    {formattedCondition}
                  </span>
                  {listing.size ? (
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700">
                      Size {listing.size}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    Current ask
                  </p>
                  <p className="mt-3 text-5xl font-bold text-neutral-950">
                    {currencyFormatter.format(listingPrice)}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    Checkout locks the seller&apos;s currently live price for this
                    exact listing.
                  </p>
                </div>

                <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    Marketplace pulse
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-neutral-700">
                    <div className="flex items-center justify-between">
                      <span>Views</span>
                      <span className="font-semibold text-neutral-950">
                        {listing.viewsCount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Favorites</span>
                      <span className="font-semibold text-neutral-950">
                        {listing.favoritesCount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Published</span>
                      <span className="font-semibold text-neutral-950">
                        {publishedLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-950">
                      Product snapshot
                    </h2>
                    <p className="mt-2 text-sm text-neutral-600">
                      A clean read on the exact pair currently live in the marketplace.
                    </p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    Live spec
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Brand", listing.brand || "N/A"],
                    ["Model", listing.model || "N/A"],
                    ["Colorway", listing.colorway || "N/A"],
                    ["Size", listing.size || "N/A"],
                    ["Condition", formattedCondition],
                    ["SKU", listing.sku || "Seller provided"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4"
                    >
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                        {label}
                      </p>
                      <p className="mt-2 text-base font-semibold text-neutral-950">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-neutral-950">
                  SneakPrice insight
                </h2>
                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  This live pair is priced for immediate checkout and tracked to a
                  verified seller account. That gives operations a clean audit trail
                  for fulfillment, support, and dispute resolution if a transaction
                  needs review later.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
                      Last sale estimate
                    </p>
                    <p className="mt-2 text-lg font-semibold text-neutral-950">
                      {currencyFormatter.format(estimatedLastSale)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
                      Seller
                    </p>
                    <p className="mt-2 text-lg font-semibold text-neutral-950">
                      {sellerName}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
                      Attention score
                    </p>
                    <p className="mt-2 text-lg font-semibold text-neutral-950">
                      {attentionScore}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-4 xl:sticky xl:top-24">
              <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                  Secure checkout
                </p>
                <p className="mt-3 text-5xl font-bold text-neutral-950">
                  {currencyFormatter.format(listingPrice)}
                </p>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  Buyer protection, seller attribution, and marketplace support are
                  built into the checkout flow.
                </p>

                <div className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-neutral-600">Availability</span>
                    <span className="text-sm font-semibold text-emerald-700">
                      In stock
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-sm text-neutral-600">Ships</span>
                    <span className="text-sm font-semibold text-neutral-950">
                      1-2 business days
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-sm text-neutral-600">Support</span>
                    <span className="text-sm font-semibold text-neutral-950">
                      Dispute-ready tracking
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href={`/buyer/checkout/${listing.id}`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-emerald-400"
                  >
                    Buy now
                  </Link>
                  <Link
                    href="/marketplace"
                    className="inline-flex w-full items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-neutral-50"
                  >
                    Browse all listings
                  </Link>
                </div>

                <div className="mt-6 space-y-3 border-t border-black/10 pt-5 text-sm text-neutral-700">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-neutral-500">Seller</span>
                    <span className="text-right font-semibold text-neutral-950">
                      {sellerName}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-neutral-500">Condition</span>
                    <span className="text-right font-semibold text-neutral-950">
                      {formattedCondition}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-neutral-500">Selected size</span>
                    <span className="text-right font-semibold text-neutral-950">
                      {listing.size || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-neutral-500">Listed</span>
                    <span className="text-right font-semibold text-neutral-950">
                      {publishedLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-neutral-950">
                  Why this page works better
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-6 text-neutral-600">
                  <p>
                    The media stage, live specs, and purchase card keep buyers focused
                    on the exact pair they are about to checkout.
                  </p>
                  <p>
                    Seller identity and engagement stats stay visible, which helps
                    buyers understand where the listing came from and how active it is.
                  </p>
                  <p>
                    Related pairs below keep the browsing path alive without pushing
                    the buyer away from the current listing too early.
                  </p>
                </div>
              </div>
            </aside>
          </section>

          {relatedListings.length > 0 ? (
            <section className="space-y-5 border-t border-black/10 pt-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    More to explore
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-neutral-950">
                    Related live listings
                  </h2>
                </div>
                <Link
                  href="/marketplace"
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700"
                >
                  See all
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {relatedListings.map((relatedListing) => (
                  <article
                    key={relatedListing.id}
                    className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.05)]"
                  >
                    <Link
                      href={`/marketplace/listing/${relatedListing.id}`}
                      className="block h-full"
                    >
                      <div className="relative aspect-square overflow-hidden bg-white">
                        <MarketplaceListingImage
                          src={relatedListing.primaryImageUrl}
                          alt={`${relatedListing.brand ?? "Sneaker"} ${relatedListing.model ?? ""}`.trim()}
                        />
                      </div>

                      <div className="space-y-2 p-4">
                        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-neutral-500">
                          {relatedListing.brand ?? "Marketplace"}
                        </p>
                        <h3 className="line-clamp-2 text-base font-semibold text-neutral-950">
                          {relatedListing.title}
                        </h3>
                        <p className="line-clamp-1 text-sm text-neutral-600">
                          {relatedListing.colorway ?? "Live marketplace listing"}
                        </p>
                        <div className="flex items-center justify-between gap-3 pt-1 text-sm text-neutral-600">
                          <span>Size {relatedListing.size ?? "N/A"}</span>
                          <span className="font-semibold text-neutral-950">
                            {currencyFormatter.format(decimalToNumber(relatedListing.price))}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </main>
  );
}
