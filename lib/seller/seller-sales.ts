import { prisma } from "@/lib/prisma";
import { decimalToNumber } from "@/lib/money";
import type { SellerSaleRow } from "@/types/seller";

export async function getSellerSales(
  sellerId: string
): Promise<SellerSaleRow[]> {
  const orders = await prisma.order.findMany({
    where: {
      sellerId,
    },
    include: {
      listing: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
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