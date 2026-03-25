import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MarketplaceListingImage } from "@/components/MarketplaceListingImage";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function ListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId: rawListingId } = await params;
  const listingId = Number(rawListingId);

  const listing = await prisma.marketplaceListing.findUnique({
    where: { id: listingId },
    include: {
      sneaker: true,
    },
  });

  if (!listing) {
    notFound();
  }

  const relatedListings = await prisma.marketplaceListing.findMany({
    where: {
      id: { not: listing.id },
      status: "ACTIVE",
      sneaker: {
        brand: listing.sneaker.brand,
      },
    },
    include: {
      sneaker: true,
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const marketDelta = listing.price - (listing.sneaker.retailPrice ?? 0);

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <div className="mx-auto w-full max-w-[1500px] space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-500">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="transition hover:text-black">
              Home
            </Link>
            <span>/</span>
            <Link href="/" className="transition hover:text-black">
              Marketplace
            </Link>
            <span>/</span>
            <span className="text-neutral-700">{listing.sneaker.brand}</span>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700"
          >
            Back to listings
          </Link>
        </div>

        <section className="grid gap-10 xl:grid-cols-[minmax(0,1.25fr)_420px]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-neutral-800 bg-white p-6 text-neutral-950 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="relative mx-auto aspect-square max-w-4xl overflow-hidden rounded-[1.5rem] bg-white">
                <MarketplaceListingImage
                  src={listing.sneaker.imageUrl}
                  alt={`${listing.sneaker.brand} ${listing.sneaker.model}`}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-neutral-500">
                  SKU
                </p>
                <p className="mt-2 text-sm font-medium text-neutral-700">
                  {listing.sneaker.sku}
                </p>
              </div>
              <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-neutral-500">
                  Condition
                </p>
                <p className="mt-2 text-sm font-medium text-neutral-700">
                  {listing.condition}
                </p>
              </div>
              <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-neutral-500">
                  Seller
                </p>
                <p className="mt-2 text-sm font-medium text-neutral-700">
                  {listing.sellerName}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                {listing.sneaker.brand}
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-black">
                {listing.sneaker.model}
              </h1>
              <p className="text-xl text-neutral-600">{listing.sneaker.colorway}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-600">
                Size: <span className="font-semibold text-black">{listing.size}</span>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-600">
                Retail:{" "}
                <span className="font-semibold text-black">
                  {currencyFormatter.format(listing.sneaker.retailPrice ?? 0)}
                </span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-neutral-700">Buy now for</p>
                  <p className="mt-2 text-5xl font-bold text-black">
                    {currencyFormatter.format(listing.price)}
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-right">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-emerald-700">
                    {marketDelta >= 0 ? "Above retail" : "Below retail"}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-emerald-700">
                    {currencyFormatter.format(Math.abs(marketDelta))}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  href={`/buyer/checkout/${listing.id}`}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-emerald-400"
                >
                  Buy now
                </Link>
              </div>

              <div className="mt-5 space-y-3 border-t border-black/10 pt-5 text-sm text-neutral-600">
                <p>
                  Buyer protection and verified sellers keep the market safe. We no longer support
                  holds—proceed with Buy It Now or ask the seller about deposit options.
                </p>
                <p>
                  Last sale estimate:{" "}
                  <span className="font-semibold text-black">
                    {currencyFormatter.format(listing.price + 28)}
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-5 text-sm text-neutral-600 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
              This listing is available now. Complete the buy flow or place an offer before someone else secures it.
            </div>

            <div className="space-y-3 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-black">Product details</h2>
                <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  Marketplace spec
                </span>
              </div>
              <div className="space-y-3 text-sm text-neutral-700">
                <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-3">
                  <span className="text-neutral-500">Brand</span>
                  <span>{listing.sneaker.brand}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-3">
                  <span className="text-neutral-500">Colorway</span>
                  <span>{listing.sneaker.colorway}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-3">
                  <span className="text-neutral-500">Size</span>
                  <span>{listing.size}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-3">
                  <span className="text-neutral-500">Condition</span>
                  <span>{listing.condition}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-500">Seller</span>
                  <span>{listing.sellerName}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedListings.length > 0 ? (
          <section className="space-y-5 border-t border-black/10 pt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-black">Related listings</h2>
                <p className="text-sm text-neutral-600">
                  More pairs from the {listing.sneaker.brand} catalog.
                </p>
              </div>
              <Link
                href="/"
                className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700"
              >
                See all
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
              {relatedListings.map((relatedListing) => (
                <article
                  key={relatedListing.id}
                  className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.05)]"
                >
                  <Link href={`/marketplace/${relatedListing.id}`} className="block h-full">
                    <div className="relative aspect-square overflow-hidden bg-white">
                      <MarketplaceListingImage
                        src={relatedListing.sneaker.imageUrl}
                        alt={`${relatedListing.sneaker.brand} ${relatedListing.sneaker.model}`}
                      />
                    </div>
                    <div className="space-y-2 p-3">
                      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
                        {relatedListing.sneaker.brand}
                      </p>
                      <h3 className="line-clamp-2 text-sm font-semibold text-black">
                        {relatedListing.sneaker.model}
                      </h3>
                      <div className="flex items-center justify-between gap-2 text-xs text-neutral-500">
                        <span>Size {relatedListing.size}</span>
                        <span className="font-semibold text-emerald-700">
                          {currencyFormatter.format(relatedListing.price)}
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
    </main>
  );
}
