import { ListingStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { decimalToNumber } from "@/lib/money";
import type { MarketplaceListingCard } from "@/types/seller";

export async function getActiveMarketplaceListings(): Promise<
  MarketplaceListingCard[]
> {
  const listings = await prisma.marketplaceListing.findMany({
    where: {
      status: ListingStatus.ACTIVE,
    },
    include: {
      seller: {
        include: {
          sellerProfile: true,
        },
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  return listings.map((listing) => ({
    id: listing.id,
    slug: listing.slug,
    title: listing.title,
    brand: listing.brand,
    model: listing.model,
    colorway: listing.colorway,
    size: listing.size,
    condition: listing.condition,
    price: decimalToNumber(listing.price),
    primaryImageUrl: listing.primaryImageUrl,
    sellerStoreName: listing.seller.sellerProfile?.storeName ?? null,
    viewsCount: listing.viewsCount,
    favoritesCount: listing.favoritesCount,
    publishedAt: listing.publishedAt?.toISOString() ?? null,
  }));
}