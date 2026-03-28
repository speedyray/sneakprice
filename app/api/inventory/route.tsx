import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const currentUser = await getSignedInUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const item = await prisma.inventoryItem.create({
      data: {
        userId: currentUser.email,
        name: body.name,
        brand: body.brand,
        model: body.model,
        colorway: body.colorway,
        size: body.size,
        condition: body.condition,
        source: body.source ?? "discover",
        status: body.status ?? "unlisted",
        purchasePrice: body.purchasePrice,
        marketPrice: body.marketPrice,
        listedPrice: body.listedPrice,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Inventory create error:", error);
    return NextResponse.json({ error: "Failed to create inventory item" }, { status: 500 });
  }
}