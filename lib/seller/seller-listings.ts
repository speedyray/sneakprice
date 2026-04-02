import { prisma } from "@/lib/prisma";
import { decimalToNumber } from "@/lib/money";
import type { SellerListingRow } from "@/types/seller";

export async function getSellerListings(
  sellerId: string
): Promise<SellerListingRow[]> {
  const listings = await prisma.marketplaceListing.findMany({
    where: {
      sellerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return listings.map((listing) => ({
    id: listing.id,
    title: listing.title,
    slug: listing.slug,
    price: decimalToNumber(listing.price),
    status: listing.status,
    size: listing.size,
    brand: listing.brand,
    model: listing.model,
    primaryImageUrl: listing.primaryImageUrl,
    viewsCount: listing.viewsCount,
    favoritesCount: listing.favoritesCount,
    publishedAt: listing.publishedAt?.toISOString() ?? null,
  }));
}