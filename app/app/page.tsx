import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";

function formatCurrency(value?: number | null) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `$${value.toFixed(0)}`;
}

export default async function AppPage() {
  const currentUser = await getSignedInUser();

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-white px-6 py-10 text-black">
        <div className="mx-auto max-w-4xl rounded-2xl border border-black/10 bg-white p-8 text-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-3 text-neutral-600">
            Please sign in to access your seller dashboard.
          </p>
          <div className="mt-6">
            <Link
              href="/login"
              className="inline-flex rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-neutral-800"
            >
              Login / Sign Up
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const [inventoryItems, recentScans, liveListings, userListings] =
    await Promise.all([
      prisma.inventoryItem.findMany({
        where: {
          userId: currentUser.email,
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.scans.findMany({
        orderBy: { created_at: "desc" },
        take: 5,
      }),
      prisma.marketplaceListing.findMany({
        where: { status: "ACTIVE" },
        include: { sneaker: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      prisma.marketplaceListing.findMany({
        where: {
          OR: [
            { sellerId: currentUser.email },
            { sellerName: currentUser.name },
          ],
        },
        include: { sneaker: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const inventoryCount = inventoryItems.length;

  const trackedMarketValue = inventoryItems.reduce((sum, item) => {
    return sum + (item.marketPrice ?? 0);
  }, 0);

  const listedCount = userListings.filter(
    (listing) => listing.status === "ACTIVE"
  ).length;

  const activeListingsValue = userListings
    .filter((listing) => listing.status === "ACTIVE")
    .reduce((sum, listing) => sum + (listing.price ?? 0), 0);

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Seller Command Center
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-600">
              Manage your sneaker inventory, track market value, and move quickly
              from scan to listing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/discover"
              className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-neutral-800"
            >
              Scan Sneaker
            </Link>

            <Link
              href="/inventory"
              className="inline-flex items-center justify-center rounded-xl border border-black/15 bg-white px-5 py-3 font-semibold text-black transition hover:border-black/30"
            >
              View Inventory
            </Link>

            <Link
              href="/marketplace/sell"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-600/30 bg-emerald-500/10 px-5 py-3 font-semibold text-emerald-700 transition hover:border-emerald-600/50"
            >
              Create Listing
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            label="Inventory Items"
            value={String(inventoryCount)}
            helper="Sneakers currently tracked"
          />
          <DashboardCard
            label="Tracked Market Value"
            value={formatCurrency(trackedMarketValue)}
            helper="Based on your saved inventory values"
          />
          <DashboardCard
            label="Listed Items"
            value={String(listedCount)}
            helper="Your active marketplace listings"
          />
          <DashboardCard
            label="Active Listings Value"
            value={formatCurrency(activeListingsValue)}
            helper="Total asking value of your active listings"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.04)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Inventory Snapshot</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Your latest tracked sneakers
                </p>
              </div>
              <Link
                href="/inventory"
                className="text-sm font-semibold text-black underline-offset-4 hover:underline"
              >
                Open inventory
              </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-black/10">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-black/10 bg-neutral-50">
                  <tr>
                    <th className="px-4 py-3 font-medium text-neutral-600">Name</th>
                    <th className="px-4 py-3 font-medium text-neutral-600">Status</th>
                    <th className="px-4 py-3 font-medium text-neutral-600">Market</th>
                    <th className="px-4 py-3 font-medium text-neutral-600">Purchase</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-10 text-center text-neutral-500"
                      >
                        No inventory yet. Scan a sneaker to get started.
                      </td>
                    </tr>
                  ) : (
                    inventoryItems.map((item) => (
                      <tr key={item.id} className="border-b border-black/5">
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-semibold text-black">{item.name}</p>
                            <p className="text-xs text-neutral-500">
                              {[item.brand, item.colorway].filter(Boolean).join(" • ") ||
                                "Sneaker item"}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium capitalize text-black">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {formatCurrency(item.marketPrice)}
                        </td>
                        <td className="px-4 py-4">
                          {formatCurrency(item.purchasePrice)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <PanelCard
              title="Quick Actions"
              subtitle="Move fast from scan to sale"
            >
              <div className="grid gap-3">
                <Link
                  href="/discover"
                  className="rounded-xl bg-black px-4 py-3 text-center font-semibold text-white transition hover:bg-neutral-800"
                >
                  Scan New Sneaker
                </Link>
                <Link
                  href="/inventory"
                  className="rounded-xl border border-black/15 bg-white px-4 py-3 text-center font-semibold text-black transition hover:border-black/30"
                >
                  Manage Inventory
                </Link>
                <Link
                  href="/marketplace"
                  className="rounded-xl border border-black/15 bg-white px-4 py-3 text-center font-semibold text-black transition hover:border-black/30"
                >
                  Browse Marketplace
                </Link>
                <Link
                  href="/marketplace/sell"
                  className="rounded-xl border border-emerald-600/30 bg-emerald-500/10 px-4 py-3 text-center font-semibold text-emerald-700 transition hover:border-emerald-600/50"
                >
                  Create Listing
                </Link>
              </div>
            </PanelCard>

            <PanelCard
              title="Recent Scans"
              subtitle="Latest identification activity"
            >
              {recentScans.length === 0 ? (
                <p className="text-sm text-neutral-500">No recent scans yet.</p>
              ) : (
                <div className="space-y-3">
                  {recentScans.map((scan) => (
                    <div
                      key={scan.id}
                      className="rounded-xl border border-black/10 bg-neutral-50 px-4 py-3"
                    >
                      <p className="font-semibold text-black">
                        {[scan.brand, scan.model].filter(Boolean).join(" ") ||
                          "Unlabeled scan"}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        {scan.colorway || "No colorway saved"} • Confidence{" "}
                        {typeof scan.confidence === "number"
                          ? `${scan.confidence}%`
                          : "—"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </PanelCard>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <PanelCard
            title="Deal Radar"
            subtitle="Your inventory opportunities"
          >
            {inventoryItems.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Add sneakers to inventory to start tracking deal signals.
              </p>
            ) : (
              <div className="space-y-3">
                {inventoryItems.slice(0, 4).map((item) => {
                  const spread =
                    typeof item.marketPrice === "number" &&
                    typeof item.purchasePrice === "number"
                      ? item.marketPrice - item.purchasePrice
                      : null;

                  return (
                    <div
                      key={item.id}
                      className="rounded-xl border border-black/10 bg-neutral-50 px-4 py-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-black">{item.name}</p>
                          <p className="mt-1 text-xs text-neutral-500">
                            Market {formatCurrency(item.marketPrice)} • Purchase{" "}
                            {formatCurrency(item.purchasePrice)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-wide text-neutral-500">
                            Spread
                          </p>
                          <p
                            className={`font-semibold ${
                              typeof spread === "number"
                                ? spread >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                                : "text-neutral-500"
                            }`}
                          >
                            {typeof spread === "number"
                              ? `${spread >= 0 ? "+" : ""}${formatCurrency(spread)}`
                              : "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </PanelCard>

          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.04)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Live Marketplace Listings</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Active listings from your marketplace
                </p>
              </div>
              <Link
                href="/marketplace"
                className="text-sm font-semibold text-black underline-offset-4 hover:underline"
              >
                View all
              </Link>
            </div>

            {liveListings.length === 0 ? (
              <p className="text-sm text-neutral-500">
                No active listings found.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {liveListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="rounded-xl border border-black/10 bg-neutral-50 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                      {listing.sneaker.brand}
                    </p>
                    <h3 className="mt-1 font-semibold text-black">
                      {listing.sneaker.model}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600">
                      {listing.sneaker.colorway}
                    </p>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-neutral-500">
                          Lowest Ask
                        </p>
                        <p className="text-2xl font-bold text-black">
                          {formatCurrency(listing.price)}
                        </p>
                      </div>
                      <p className="text-sm text-neutral-500">
                        Size {listing.size}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section>
          <PanelCard
            title="My Listings Snapshot"
            subtitle="Your latest marketplace listings"
          >
            {userListings.length === 0 ? (
              <p className="text-sm text-neutral-500">
                You do not have any listings yet.
              </p>
            ) : (
              <div className="overflow-hidden rounded-xl border border-black/10">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-black/10 bg-neutral-50">
                    <tr>
                      <th className="px-4 py-3 font-medium text-neutral-600">Sneaker</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Status</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Price</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userListings.slice(0, 5).map((listing) => (
                      <tr key={listing.id} className="border-b border-black/5">
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-semibold text-black">
                              {listing.sneaker.model}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {listing.sneaker.brand} • {listing.sneaker.colorway}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium capitalize text-black">
                            {listing.status.toLowerCase()}
                          </span>
                        </td>
                        <td className="px-4 py-4">{formatCurrency(listing.price)}</td>
                        <td className="px-4 py-4">{listing.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </PanelCard>
        </section>
      </div>
    </main>
  );
}

function DashboardCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_18px_40px_rgba(0,0,0,0.04)]">
      <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold text-black">{value}</p>
      <p className="mt-2 text-sm text-neutral-500">{helper}</p>
    </div>
  );
}

function PanelCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.04)]">
      <div className="mb-5">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}