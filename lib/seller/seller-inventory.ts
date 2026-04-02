import { prisma } from "@/lib/prisma";
import { decimalToNumber } from "@/lib/money";
import type { SellerInventoryRow } from "@/types/seller";

export async function getSellerInventory(
  sellerId: string
): Promise<SellerInventoryRow[]> {
  const items = await prisma.inventoryItem.findMany({
    where: {
      sellerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return items.map((item) => ({
    id: item.id,
    name: item.name,
    brand: item.brand,
    model: item.model,
    size: item.size,
    condition: item.condition,
    purchasePrice: decimalToNumber(item.purchasePrice),
    estimatedMarketValue: decimalToNumber(item.estimatedMarketValue),
    status: item.status,
    primaryImageUrl: item.primaryImageUrl,
    acquiredAt: item.acquiredAt?.toISOString() ?? null,
  }));
}