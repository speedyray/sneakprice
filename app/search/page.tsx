import Link from "next/link";
import { prisma } from "@/lib/prisma";

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

function formatCurrency(value?: number | null) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `$${value.toFixed(0)}`;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q?.trim() ?? "";

  const results =
    query.length > 0
      ? await prisma.marketplaceListing.findMany({
          where: {
            status: "ACTIVE",
            OR: [
              {
                sneaker: {
                  brand: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
              {
                sneaker: {
                  model: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
              {
                sneaker: {
                  colorway: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
            ],
          },
          include: {
            sneaker: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 24,
        })
      : [];

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-3 text-3xl font-bold">
          Search results for "{query}"
        </h1>

        <p className="mb-8 text-neutral-600">
          {results.length} result{results.length === 1 ? "" : "s"} found
        </p>

        {query.length === 0 ? (
          <p className="text-neutral-500">
            Enter a sneaker, brand, or colorway in the search bar.
          </p>
        ) : results.length === 0 ? (
          <p className="text-neutral-500">No results found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-4">
            {results.map((listing) => (
              <Link
                key={listing.id}
                href={`/marketplace/${listing.id}`}
                className="overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:border-black/20"
              >
                <div className="aspect-[4/3] bg-neutral-50">
                  {listing.sneaker.imageUrl ? (
                    <img
                      src={listing.sneaker.imageUrl}
                      alt={`${listing.sneaker.brand} ${listing.sneaker.model}`}
                      className="h-full w-full object-contain"
                    />
                  ) : null}
                </div>

                <div className="space-y-2 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    {listing.sneaker.brand}
                  </p>
                  <h2 className="font-semibold text-black">
                    {listing.sneaker.model}
                  </h2>
                  <p className="text-sm text-neutral-600">
                    {listing.sneaker.colorway}
                  </p>

                  <div className="flex items-end justify-between pt-2">
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}