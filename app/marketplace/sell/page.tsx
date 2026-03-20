import Link from "next/link";
import { redirect } from "next/navigation";
import { createListing } from "@/app/marketplace/actions";
import { getSignedInUser } from "@/lib/session";

const formConditions = ["Deadstock", "Very Good", "Good", "Fair"];
const formInputClassName =
  "rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white transition disabled:border-neutral-700 disabled:bg-neutral-900/60 disabled:text-neutral-500 disabled:cursor-not-allowed";

export default async function SellPage() {
  const signedInUser = await getSignedInUser();

  if (!signedInUser) {
    redirect("/login");
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
              List a sneaker
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-400">
              Publish a sneaker listing without mixing the seller workflow into
              the browse page. You are listing as {signedInUser.name}.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/marketplace/my-listings"
              className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-neutral-200 transition hover:border-neutral-500"
            >
              My listings
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-neutral-200 transition hover:border-neutral-500"
            >
              Back to browse
            </Link>
            <Link
              href="/buyer"
              className="inline-flex items-center justify-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-emerald-200 transition hover:border-emerald-400"
            >
              Buyer portal
            </Link>
          </div>
        </div>

        <section className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Create listing</h2>
            <p className="text-sm text-neutral-400">
              Form submissions use Prisma server actions.
            </p>
          </div>

          <form action={createListing} className="mt-6 grid gap-4 sm:grid-cols-2">
            <p className="col-span-full text-xs uppercase tracking-[0.3em] text-neutral-400">
              Listing as {signedInUser.name}
            </p>
            <input
              name="brand"
              placeholder="Brand (e.g., Nike)"
              className={formInputClassName}
              required
            />
            <input
              name="model"
              placeholder="Model (e.g., Air Jordan 1)"
              className={formInputClassName}
              required
            />
            <input
              name="colorway"
              placeholder="Colorway (e.g., Bred Toe)"
              className={formInputClassName}
              required
            />
            <input
              name="sku"
              placeholder="SKU (unique identifier)"
              className={formInputClassName}
              required
            />
            <input
              name="size"
              placeholder="Size (e.g., 10)"
              className={formInputClassName}
              required
            />
            <input
              name="price"
              type="number"
              min="1"
              step="0.01"
              placeholder="Ask price (USD)"
              className={formInputClassName}
              required
            />
            <select
              name="condition"
              className={formInputClassName}
            >
              {formConditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full rounded-2xl border border-emerald-500/60 bg-emerald-500/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-100"
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
