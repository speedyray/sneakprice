import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSignedInUser } from "@/lib/session";
import { formatHoldExpiry } from "@/lib/listing-hold";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const formConditions = ["Deadstock", "Very Good", "Good", "Fair"];

async function createListing(formData: FormData) {
  "use server";

  const brand = formData.get("brand")?.toString().trim();
  const model = formData.get("model")?.toString().trim();
  const colorway = formData.get("colorway")?.toString().trim();
  const sku = formData.get("sku")?.toString().trim().toUpperCase();
  const size = formData.get("size")?.toString().trim();
  const condition =
    formData.get("condition")?.toString().trim() || "Deadstock";
  const rawPrice = formData.get("price")?.toString() ?? "";
  const priceValue = Number(rawPrice);
  const signingUser = await getSignedInUser();

  if (!signingUser) {
    redirect("/signin");
  }

  if (
    !brand ||
    !model ||
    !colorway ||
    !sku ||
    !size ||
    Number.isNaN(priceValue) ||
    priceValue <= 0
  ) {
    return;
  }

  const sneaker = await prisma.sneaker.upsert({
    where: { sku },
    update: { brand, model, colorway },
    create: {
      brand,
      model,
      colorway,
      sku,
    },
  });

  await prisma.marketplaceListing.create({
    data: {
    sneakerId: sneaker.id,
    sellerName: signingUser.name,
    sellerId: signingUser.email,
      size,
      condition,
      price: priceValue,
      status: "ACTIVE",
    },
  });

  revalidatePath("/marketplace");
}

export default async function MarketplacePage() {
  const listings = await prisma.marketplaceListing.findMany({
    where: { status: { in: ["ACTIVE", "HELD"] } },
    include: {
      sneaker: true,
      listingHolds: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
    take: 24,
  });
  const signedInUser = await getSignedInUser();
  const listingCreationDisabled = !signedInUser;

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
              Marketplace
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Browse live sneaker listings
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-400">
              This is the first marketplace foundation for SneakPrice. You can
              now test a dedicated browse page backed by Prisma data.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 px-5 py-4 text-sm text-neutral-300">
            Active listings:{" "}
            <span className="font-semibold text-white">{listings.length}</span>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-700 bg-neutral-900/60 px-8 py-16 text-center">
            <h2 className="text-2xl font-semibold">No listings yet</h2>
            <p className="mx-auto mt-3 max-w-xl text-neutral-400">
              The marketplace data layer is in place, but there are no active
              or held listings in the database yet. Run the seed script or create
              a listing below to populate the page.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => {
              const hold = listing.listingHolds[0];
              const isHeld = listing.status === "HELD";
              const holdExpiry = hold ? formatHoldExpiry(hold.expiresAt) : null;
              return (
                <article
                  key={listing.id}
                  className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6"
                >
                  <Link
                    href={`/marketplace/${listing.id}`}
                    className="space-y-8 block"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-neutral-400">
                          {listing.sneaker.brand}
                        </p>
                        <h2 className="mt-1 text-2xl font-semibold leading-tight">
                          {listing.sneaker.model}
                        </h2>
                        <p className="mt-2 text-neutral-400">
                          {listing.sneaker.colorway}
                        </p>
                      </div>
                      <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
                        {listing.status}
                      </div>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm text-neutral-500">Ask</p>
                        <p className="text-3xl font-bold text-emerald-400">
                          {currencyFormatter.format(listing.price)}
                        </p>
                      </div>
                      <div className="text-right text-sm text-neutral-400">
                        <p>Size {listing.size}</p>
                        <p>{listing.condition}</p>
                        <p className="mt-1 text-neutral-500">
                          Seller: {listing.sellerName}
                        </p>
                      </div>
                    </div>
                  </Link>
                  {isHeld && hold ? (
                    <p className="mt-4 text-xs uppercase tracking-[0.3em] text-amber-400">
                      Held by {hold.buyerName} until {holdExpiry}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        )}

        <section className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">List a sneaker</h2>
            <p className="text-sm text-neutral-400">
              Form submissions use Prisma server actions.
            </p>
          </div>

          {!signedInUser && (
            <div className="mb-6 rounded-2xl border border-amber-500/50 bg-amber-500/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-amber-200">
              Please <Link href="/signin" className="underline">register</Link> or sign in before listing so resellers know who you are.
            </div>
          )}

          <form
            action={createListing}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            <p className="col-span-full text-xs uppercase tracking-[0.3em] text-neutral-400">
              {signedInUser
                ? `Listing as ${signedInUser.name}`
                : "Sign in to list sneakers"}
            </p>
            <input
              name="brand"
              placeholder="Brand (e.g., Nike)"
              className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white"
              required
            />
            <input
              name="model"
              placeholder="Model (e.g., Air Jordan 1)"
              className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white"
              required
            />
            <input
              name="colorway"
              placeholder="Colorway (e.g., Bred Toe)"
              className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white"
              required
            />
            <input
              name="sku"
              placeholder="SKU (unique identifier)"
              className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white"
              required
            />
            <input
              name="size"
              placeholder="Size (e.g., 10)"
              className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white"
              required
            />
            <input
              name="price"
              type="number"
              min="1"
              step="0.01"
              placeholder="Ask price (USD)"
              className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white"
              required
            />
            <select
              name="condition"
              className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white"
            >
              {formConditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={listingCreationDisabled}
              className={`w-full rounded-2xl border px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] transition ${
                listingCreationDisabled
                  ? "border-neutral-700 bg-neutral-900 text-neutral-500"
                  : "border-emerald-500/60 bg-emerald-500/20 text-emerald-300 hover:border-emerald-400 hover:text-emerald-100"
              }`}
            >
              Create listing
            </button>
          </form>
          <p className="mt-4 text-xs text-neutral-500">
            Listing creation is currently for testing. No payments or bids are
            processed yet.
          </p>
        </section>
      </div>
    </main>
  );
}
