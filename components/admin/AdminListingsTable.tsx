import Link from "next/link";
import { ListingStatus } from "@prisma/client";
import { formatCurrency } from "@/lib/money";
import { formatSneakerCondition } from "@/lib/marketplace-utils";
import type { AdminListingRow } from "@/lib/admin/platform";

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

function getStatusClasses(status: ListingStatus) {
  switch (status) {
    case ListingStatus.ACTIVE:
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case ListingStatus.SOLD:
      return "border-neutral-300 bg-neutral-100 text-neutral-700";
    case ListingStatus.DRAFT:
      return "border-amber-200 bg-amber-50 text-amber-700";
    case ListingStatus.RESERVED:
      return "border-sky-200 bg-sky-50 text-sky-700";
    default:
      return "border-black/10 bg-white text-neutral-700";
  }
}

export default function AdminListingsTable({
  listings,
  emptyTitle = "No listings yet",
  emptyCopy = "Listings will appear here as sellers publish them.",
}: {
  listings: AdminListingRow[];
  emptyTitle?: string;
  emptyCopy?: string;
}) {
  if (listings.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
          SneakPrice Marketplace
        </p>
        <h3 className="mt-3 text-2xl font-bold">{emptyTitle}</h3>
        <p className="mt-3 text-neutral-600">{emptyCopy}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-black/10 text-left">
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Listing
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Seller
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Status
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Price
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Condition
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Created
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Published
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {listings.map((listing) => (
            <tr
              key={listing.id}
              className="border-b border-black/5 align-top last:border-b-0"
            >
              <td className="px-6 py-5">
                <div className="max-w-[320px]">
                  <p className="font-semibold leading-6 text-black">
                    {listing.title}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">
                    {[listing.brand, listing.model, listing.size ? `Size ${listing.size}` : null]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {listing.colorway ? (
                    <p className="mt-1 text-sm text-neutral-500">
                      {listing.colorway}
                    </p>
                  ) : null}
                </div>
              </td>

              <td className="px-6 py-5 text-sm text-neutral-700">
                <div className="font-medium text-black">{listing.sellerName}</div>
                <div className="mt-1 text-neutral-500">{listing.sellerEmail}</div>
              </td>

              <td className="px-6 py-5">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                    listing.status
                  )}`}
                >
                  {listing.status}
                </span>
              </td>

              <td className="px-6 py-5 text-sm font-semibold text-black">
                {formatCurrency(listing.price)}
              </td>

              <td className="px-6 py-5 text-sm text-neutral-700">
                {formatSneakerCondition(listing.condition)}
              </td>

              <td className="px-6 py-5 text-sm text-neutral-700">
                {formatDateTime(listing.createdAt)}
              </td>

              <td className="px-6 py-5 text-sm text-neutral-700">
                {formatDateTime(listing.publishedAt)}
              </td>

              <td className="px-6 py-5">
                <Link
                  href={`/marketplace/listing/${listing.id}`}
                  className="inline-flex rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-neutral-50"
                >
                  View Listing
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
