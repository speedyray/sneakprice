import { getAdminUsers } from "@/lib/admin/platform";

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  const totalUsers = users.length;
  const sellerCount = users.filter((user) => user.isSeller).length;
  const buyerCount = users.filter((user) => user.isBuyer).length;
  const adminCount = users.filter((user) => user.role === "ADMIN").length;

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
          SneakPrice Admin
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
          Users
        </h1>
        <p className="mt-4 max-w-3xl text-base text-neutral-600 sm:text-lg">
          Monitor seller and buyer accounts, role assignment, and account-level
          platform participation.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Total Users
          </p>
          <p className="mt-3 text-3xl font-bold">{totalUsers}</p>
        </div>
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Sellers
          </p>
          <p className="mt-3 text-3xl font-bold text-emerald-800">{sellerCount}</p>
        </div>
        <div className="rounded-3xl border border-sky-200 bg-sky-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            Buyers
          </p>
          <p className="mt-3 text-3xl font-bold text-sky-800">{buyerCount}</p>
        </div>
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Admins
          </p>
          <p className="mt-3 text-3xl font-bold">{adminCount}</p>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="border-b border-black/10 px-6 py-5">
          <h2 className="text-xl font-bold">Platform Users</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Account roles, order volume, and seller participation in one table.
          </p>
        </div>

        {users.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <h3 className="text-2xl font-bold">No users found</h3>
            <p className="mt-3 text-neutral-600">
              User accounts will appear here as they are created.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-black/10 text-left">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    User
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Role
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Listings
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Inventory
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Buyer Orders
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Seller Orders
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-black/5 align-top last:border-b-0"
                  >
                    <td className="px-6 py-5">
                      <div className="font-semibold text-black">{user.displayName}</div>
                      <div className="mt-1 text-sm text-neutral-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      <div>{user.role}</div>
                      <div className="mt-1 text-neutral-500">
                        {user.isSeller ? "Seller" : "Not seller"} ·{" "}
                        {user.isBuyer ? "Buyer" : "Not buyer"}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {user.listingCount}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {user.inventoryCount}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {user.buyerOrderCount}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {user.sellerOrderCount}
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-700">
                      {formatDateTime(user.createdAt)}
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
