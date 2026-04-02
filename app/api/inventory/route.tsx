import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/current-user";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentDbUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const item = await prisma.inventoryItem.create({
      data: {
        sellerId: currentUser.id,
        name: body.name,
        brand: body.brand,
        model: body.model,
        colorway: body.colorway,
        size: body.size,
        condition: body.condition,
        source: body.source ?? "discover",
        status: body.status ?? "IN_INVENTORY",
        purchasePrice: Number(body.purchasePrice ?? 0),
        estimatedMarketValue: Number(body.marketPrice ?? 0),
        primaryImageUrl: body.primaryImageUrl ?? null,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Inventory create error:", error);
    return NextResponse.json(
      { error: "Failed to create inventory item" },
      { status: 500 }
    );
  }
}