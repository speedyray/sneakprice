import { getAdminActivityFeed } from "@/lib/admin/platform";

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getTypeClasses(type: string) {
  switch (type) {
    case "user":
      return "border-sky-200 bg-sky-50 text-sky-700";
    case "listing":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "order":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "shipment":
      return "border-violet-200 bg-violet-50 text-violet-700";
    default:
      return "border-black/10 bg-white text-neutral-700";
  }
}

export default async function AdminActivityPage() {
  const activity = await getAdminActivityFeed(40);

  const userEvents = activity.filter((event) => event.type === "user").length;
  const listingEvents = activity.filter((event) => event.type === "listing").length;
  const orderEvents = activity.filter((event) => event.type === "order").length;
  const shipmentEvents = activity.filter((event) => event.type === "shipment").length;

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
          SneakPrice Admin
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
          Activity
        </h1>
        <p className="mt-4 max-w-3xl text-base text-neutral-600 sm:text-lg">
          Follow a real-time style operational feed of user signups, listings,
          orders, and shipment changes across the platform.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-sky-200 bg-sky-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            User Events
          </p>
          <p className="mt-3 text-3xl font-bold text-sky-800">{userEvents}</p>
        </div>
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Listing Events
          </p>
          <p className="mt-3 text-3xl font-bold text-emerald-800">{listingEvents}</p>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Order Events
          </p>
          <p className="mt-3 text-3xl font-bold text-amber-800">{orderEvents}</p>
        </div>
        <div className="rounded-3xl border border-violet-200 bg-violet-50 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
            Shipment Events
          </p>
          <p className="mt-3 text-3xl font-bold text-violet-800">{shipmentEvents}</p>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="border-b border-black/10 px-6 py-5">
          <h2 className="text-xl font-bold">Recent Platform Activity</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Newest operational events across users, listings, orders, and shipments.
          </p>
        </div>

        {activity.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <h3 className="text-2xl font-bold">No activity yet</h3>
            <p className="mt-3 text-neutral-600">
              Activity events will populate here as users interact with the platform.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-black/5">
            {activity.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-3 px-6 py-5 md:flex-row md:items-start md:justify-between"
              >
                <div className="space-y-2">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${getTypeClasses(
                      event.type
                    )}`}
                  >
                    {event.type}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-black">{event.title}</h3>
                    <p className="mt-1 text-sm text-neutral-600">
                      {event.description}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-neutral-500">
                  {formatDateTime(event.timestamp)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
