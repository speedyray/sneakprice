import { ListingStatus, OrderStatus, ShipmentStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { decimalToNumber } from "@/lib/money";
import type {
  SellerDashboardMetrics,
  SellerListingRow,
  SellerSaleRow,
} from "@/types/seller";

export async function getSellerDashboardMetrics(
  sellerId: string
): Promise<SellerDashboardMetrics> {
  const [
    inventoryItems,
    activeListings,
    orders,
    pendingShipmentCount,
    soldThisMonthCount,
  ] = await Promise.all([
    prisma.inventoryItem.findMany({
      where: {
        sellerId,
        status: {
          in: ["IN_INVENTORY", "LISTED"],
        },
      },
      select: {
        estimatedMarketValue: true,
      },
    }),

    prisma.marketplaceListing.findMany({
      where: {
        sellerId,
        status: ListingStatus.ACTIVE,
      },
      select: {
        price: true,
      },
    }),

    prisma.order.findMany({
      where: {
        sellerId,
        status: {
          in: [
            OrderStatus.PAID,
            OrderStatus.PROCESSING,
            OrderStatus.SHIPPED,
            OrderStatus.DELIVERED,
          ],
        },
      },
      select: {
        salePrice: true,
        payout: true,
        listing: {
          select: {
            sneaker: {
              select: {
                purchasePrice: true,
              },
            },
          },
        },
      },
    }),

    prisma.shipment.count({
      where: {
        order: {
          sellerId,
        },
        status: {
          in: [
            ShipmentStatus.LABEL_NEEDED,
            ShipmentStatus.LABEL_CREATED,
            ShipmentStatus.SHIPPED,
            ShipmentStatus.IN_TRANSIT,
            ShipmentStatus.DELAYED,
          ],
        },
      },
    }),

    prisma.order.count({
      where: {
        sellerId,
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
        status: {
          in: [
            OrderStatus.PAID,
            OrderStatus.PROCESSING,
            OrderStatus.SHIPPED,
            OrderStatus.DELIVERED,
          ],
        },
      },
    }),
  ]);

  const inventoryValue = inventoryItems.reduce((sum, item) => {
    return sum + decimalToNumber(item.estimatedMarketValue);
  }, 0);

  const activeListingsValue = activeListings.reduce((sum, listing) => {
    return sum + decimalToNumber(listing.price);
  }, 0);

  const salesRevenue = orders.reduce((sum, order) => {
    return sum + decimalToNumber(order.salePrice);
  }, 0);

  const totalProfit = orders.reduce((sum, order) => {
    const payout = decimalToNumber(order.payout);
    const purchasePrice = decimalToNumber(order.listing.sneaker.purchasePrice);
    return sum + (payout - purchasePrice);
  }, 0);

  return {
    inventoryValue,
    activeListingsValue,
    salesRevenue,
    totalProfit,
    itemsInInventory: inventoryItems.length,
    activeListings: activeListings.length,
    soldThisMonth: soldThisMonthCount,
    pendingPackages: pendingShipmentCount,
  };
}

export async function getSellerRecentSales(
  sellerId: string,
  limit = 5
): Promise<SellerSaleRow[]> {
  const orders = await prisma.order.findMany({
    where: {
      sellerId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    include: {
      listing: {
        select: {
          title: true,
        },
      },
    },
  });

  return orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    listingTitle: order.listing.title,
    salePrice: decimalToNumber(order.salePrice),
    fees: decimalToNumber(order.fees),
    shippingCost: decimalToNumber(order.shippingCost),
    payout: decimalToNumber(order.payout),
    status: order.status,
    createdAt: order.createdAt.toISOString(),
  }));
}

export async function getSellerActiveListingsSnapshot(
  sellerId: string,
  limit = 5
): Promise<SellerListingRow[]> {
  const listings = await prisma.marketplaceListing.findMany({
    where: {
      sellerId,
      status: ListingStatus.ACTIVE,
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: limit,
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