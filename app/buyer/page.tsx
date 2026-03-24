import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";

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
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 px-6 py-10 text-white">
      <div className="mx-auto max-w-[1200px] space-y-8">
        <div className="flex flex-col gap-6 rounded-[32px] border border-neutral-800 bg-neutral-900/70 px-8 py-6 shadow-[0_10px_50px_rgba(0,0,0,0.45)]">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
              Buyer portal
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              Straightforward purchases only
            </h1>
            <p className="text-sm text-neutral-400">
              Sign-in verified buyers can view the freshest listings. Hold requests have been retired to keep the marketplace fair.
              Use Buy It Now, leave a note for the seller, or request a deposit if you need extra time.
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Signed in as <span className="font-semibold text-white">{signedInUser.name}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-neutral-200 transition hover:border-neutral-500"
            >
              Browse marketplace
            </Link>
            <Link
              href="/marketplace/sell"
              className="inline-flex items-center justify-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-emerald-200 transition hover:border-emerald-400"
            >
              List a pair
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {listings.map((listing) => (
            <article
              key={listing.id}
              className="flex h-full flex-col justify-between gap-4 rounded-3xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-[0_15px_30px_rgba(0,0,0,0.45)]"
            >
              <div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-neutral-500">
                  <span>{listing.sneaker.brand}</span>
                  <span>{listing.condition}</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold text-white">{listing.sneaker.model}</h2>
                <p className="text-sm text-neutral-400">{listing.sneaker.colorway}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-neutral-300">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Ask</p>
                    <p className="text-2xl font-bold text-emerald-400">
                      {currencyFormatter.format(listing.price)}
                    </p>
                  </div>
                  <div className="text-right text-xs text-neutral-400">
                    <p>Size {listing.size}</p>
                    <p className="text-neutral-500">Seller: {listing.sellerName}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
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
