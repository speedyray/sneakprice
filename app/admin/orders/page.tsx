import { OrderStatus } from "@prisma/client";
import { formatCurrency } from "@/lib/money";
import { getAdminOrders } from "@/lib/admin/platform";

const paidLikeStatuses: OrderStatus[] = [
  OrderStatus.PAID,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
];

const cancelledLikeStatuses: OrderStatus[] = [
  OrderStatus.CANCELLED,
  OrderStatus.REFUNDED,
];

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  const paidCount = orders.filter((order) => paidLikeStatuses.includes(order.orderStatus)).length;
  const cancelledCount = orders.filter((order) =>
    cancelledLikeStatuses.includes(order.orderStatus)
  ).length;
  const shipmentIssueCount = orders.filter((order) =>
    ["DELAYED", "RETURNED"].includes(order.shipmentStatus ?? "")
  ).length;
  const grossSales = orders.reduce((sum, order) => sum + order.salePrice, 0);

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
          SneakPrice Admin
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
          Orders
        </h1>
        <p className="mt-4 max-w-3xl text-base text-neutral-600 sm:text-lg">
          Track platform orders, seller and buyer participation, and shipment
          status from a single operations view.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Total Orders
          </p>
          <p className="mt-3 text-3xl font-bold">{orders.length}</p>
        </div>
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Paid / Fulfilled
          </p>
          <p className="mt-3 text-3xl font-bold text-emerald-800">{paidCount}</p>
        </div>
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
            Cancelled / Refunded
          </p>
          <p className="mt-3 text-3xl font-bold text-rose-800">{cancelledCount}</p>
        </div>
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Gross Sales
          </p>
          <p className="mt-3 text-3xl font-bold">{formatCurrency(grossSales)}</p>
          <p className="mt-2 text-sm text-neutral-500">
            Shipment issues: {shipmentIssueCount}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="border-b border-black/10 px-6 py-5">
          <h2 className="text-xl font-bold">Platform Orders</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Review order status, seller and buyer attribution, and shipment state.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <h3 className="text-2xl font-bold">No orders yet</h3>
            <p className="mt-3 text-neutral-600">
              Orders will appear here once buyers complete checkout.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-black/10 text-left">
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
                    Shipment
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Sale / Payout
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-black/5 align-top last:border-b-0"
                  >
                    <td className="px-6 py-5">
                      <div className="font-semibold text-black">{order.orderNumber}</div>
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {order.listingTitle}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      <div className="font-medium text-black">{order.sellerName}</div>
                      <div className="mt-1 text-neutral-500">{order.sellerEmail}</div>
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      <div className="font-medium text-black">{order.buyerName}</div>
                      <div className="mt-1 text-neutral-500">{order.buyerEmail}</div>
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {order.orderStatus}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {order.shipmentStatus ?? "—"}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      <div>{formatCurrency(order.salePrice)}</div>
                      <div className="mt-1 text-neutral-500">
                        Payout {formatCurrency(order.payout)}
                      </div>
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
    </section>
  );
}
