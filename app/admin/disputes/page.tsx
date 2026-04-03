import { formatCurrency } from "@/lib/money";
import { getAdminDisputeQueue } from "@/lib/admin/platform";

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

export default async function AdminDisputesPage() {
  const { flaggedOrders, activeHolds } = await getAdminDisputeQueue();

  const refundedOrCancelledCount = flaggedOrders.filter((order) =>
    ["CANCELLED", "REFUNDED"].includes(order.orderStatus)
  ).length;
  const shipmentIssueCount = flaggedOrders.filter((order) =>
    ["DELAYED", "RETURNED"].includes(order.shipmentStatus ?? "")
  ).length;

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
          SneakPrice Admin
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
          Disputes
        </h1>
        <p className="mt-4 max-w-3xl text-base text-neutral-600 sm:text-lg">
          Review cancelled, refunded, delayed, or returned orders and monitor
          active holds that may require manual intervention.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
            Flagged Orders
          </p>
          <p className="mt-3 text-3xl font-bold text-rose-800">
            {flaggedOrders.length}
          </p>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Refund / Cancel
          </p>
          <p className="mt-3 text-3xl font-bold text-amber-800">
            {refundedOrCancelledCount}
          </p>
        </div>
        <div className="rounded-3xl border border-violet-200 bg-violet-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
            Shipment Issues
          </p>
          <p className="mt-3 text-3xl font-bold text-violet-800">
            {shipmentIssueCount}
          </p>
        </div>
        <div className="rounded-3xl border border-sky-200 bg-sky-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            Active Holds
          </p>
          <p className="mt-3 text-3xl font-bold text-sky-800">
            {activeHolds.length}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="border-b border-black/10 px-6 py-5">
          <h2 className="text-xl font-bold">Resolution Queue</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Orders that need manual review because of cancellations, refunds, or shipment issues.
          </p>
        </div>

        {flaggedOrders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <h3 className="text-2xl font-bold">No flagged orders</h3>
            <p className="mt-3 text-neutral-600">
              Cancelled, refunded, delayed, or returned orders will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-black/10 text-left">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Issue
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Order
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Listing
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Seller
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Buyer
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Sale Price
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {flaggedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-black/5 align-top last:border-b-0"
                  >
                    <td className="px-6 py-5 text-sm font-semibold text-rose-700">
                      {order.issue}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {order.listingTitle}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {order.sellerName}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {order.buyerName}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      <div>{order.orderStatus}</div>
                      <div className="mt-1 text-neutral-500">
                        Shipment: {order.shipmentStatus ?? "—"}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {formatCurrency(order.salePrice)}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {formatDateTime(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="border-b border-black/10 px-6 py-5">
          <h2 className="text-xl font-bold">Active Holds</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Holds that may need admin follow-up before they expire or block listing availability.
          </p>
        </div>

        {activeHolds.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <h3 className="text-2xl font-bold">No active holds</h3>
            <p className="mt-3 text-neutral-600">
              Current hold requests will appear here for review.
            </p>
          </div>
        ) : (
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
                    Buyer
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Created
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Expires
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeHolds.map((hold) => (
                  <tr
                    key={hold.id}
                    className="border-b border-black/5 align-top last:border-b-0"
                  >
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {hold.listingTitle}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {hold.sellerName}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      <div>{hold.buyerName}</div>
                      <div className="mt-1 text-neutral-500">{hold.buyerEmail}</div>
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {formatDateTime(hold.createdAt)}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {formatDateTime(hold.expiresAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}
