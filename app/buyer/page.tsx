import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";
import { MarketplaceListingImage } from "@/components/MarketplaceListingImage";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function BuyerPage() {
  const signedInUser = await getSignedInUser();

  if (!signedInUser) {
    redirect("/login");
  }

  const listings = await prisma.marketplaceListing.findMany({
    where: { status: "ACTIVE" },
    include: { sneaker: true },
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <div className="mx-auto max-w-[1200px] space-y-8">
        <div className="flex flex-col gap-6 rounded-[32px] border border-black/10 bg-white px-8 py-6 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
              Buyer portal
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              Straightforward purchases only
            </h1>
            <p className="text-sm text-neutral-600">
              Sign-in verified buyers can view the freshest listings. Hold requests have been retired to keep the marketplace fair.
              Use Buy It Now, leave a note for the seller, or request a deposit if you need extra time.
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Signed in as <span className="font-semibold text-black">{signedInUser.name}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-black transition hover:border-black/30"
            >
              Browse marketplace
            </Link>
            <Link
              href="/marketplace/sell"
              className="inline-flex items-center justify-center rounded-full border border-emerald-600/30 bg-emerald-500/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-emerald-700 transition hover:border-emerald-600/50"
            >
              List a pair
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {listings.map((listing) => (
            <article
              key={listing.id}
              className="flex h-full flex-col justify-between gap-4 rounded-3xl border border-black/10 bg-white p-5 shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-white">
                <MarketplaceListingImage
                  src={listing.sneaker.imageUrl}
                  alt={`${listing.sneaker.brand} ${listing.sneaker.model}`}
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-neutral-500">
                  <span>{listing.sneaker.brand}</span>
                  <span>{listing.condition}</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold text-black">{listing.sneaker.model}</h2>
                <p className="text-sm text-neutral-600">{listing.sneaker.colorway}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-neutral-700">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Ask</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {currencyFormatter.format(listing.price)}
                    </p>
                  </div>
                  <div className="text-right text-xs text-neutral-500">
                    <p>Size {listing.size}</p>
                    <p className="text-neutral-500">Seller: {listing.sellerName}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  Ready to buy
                </p>
                <Link
                  href={`/buyer/checkout/${listing.id}`}
                  className="block w-full rounded-full bg-emerald-500 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-emerald-400"
                >
                  Buy now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
