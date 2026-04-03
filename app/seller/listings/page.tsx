import Link from "next/link";
import { redirect } from "next/navigation";
import SellerShell from "@/components/seller/SellerShell";
import SellerPageTitle from "@/components/seller/SellerPageTitle";
import { getCurrentDbUser } from "@/lib/current-user";
import { getSellerListings } from "@/lib/seller/seller-listings";
import { formatCurrency } from "@/lib/money";
import { formatSneakerCondition } from "@/lib/marketplace-utils";

function formatDateTime(value: string | null) {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function SellerListingsPage() {
  const currentUser = await getCurrentDbUser();

  if (!currentUser) {
    redirect("/login?redirect_url=/seller/listings");
  }

  const listings = await getSellerListings(currentUser.id);

  return (
    <SellerShell>
      <SellerPageTitle
        title="Listings"
        subtitle="Manage active, held, sold, and draft marketplace listings."
        action={
          <Link
            href="/marketplace/sell"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Add Listing
          </Link>
        }
      />

      <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
        {listings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-10 text-center">
            <h3 className="text-lg font-semibold text-neutral-950">No listings yet</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Listings created by this seller will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-neutral-200 text-neutral-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Listing</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Condition</th>
                  <th className="px-4 py-3 font-medium">Published</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                {listings.map((listing) => (
                  <tr key={listing.id}>
                    <td className="px-4 py-4">
                      <div className="font-medium text-neutral-950">{listing.title}</div>
                      <div className="mt-1 text-xs text-neutral-500">
                        {[listing.brand, listing.model, listing.size ? `Size ${listing.size}` : null]
                          .filter(Boolean)
                          .join(" · ")}
                      </div>
                    </td>
                    <td className="px-4 py-4">{listing.status}</td>
                    <td className="px-4 py-4">{formatCurrency(listing.price)}</td>
                    <td className="px-4 py-4">
                      {formatSneakerCondition(listing.condition)}
                    </td>
                    <td className="px-4 py-4">{formatDateTime(listing.publishedAt)}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/marketplace/listing/${listing.id}`}
                          className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 transition hover:bg-neutral-50"
                        >
                          View
                        </Link>
                        <Link
                          href={`/marketplace/my-listings/${listing.id}/edit`}
                          className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 transition hover:bg-neutral-50"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SellerShell>
  );
}
