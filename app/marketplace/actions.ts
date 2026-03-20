"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSignedInUser } from "@/lib/session";

export async function createListing(formData: FormData) {
  const brand = formData.get("brand")?.toString().trim();
  const model = formData.get("model")?.toString().trim();
  const colorway = formData.get("colorway")?.toString().trim();
  const sku = formData.get("sku")?.toString().trim().toUpperCase();
  const size = formData.get("size")?.toString().trim();
  const condition =
    formData.get("condition")?.toString().trim() || "Deadstock";
  const rawPrice = formData.get("price")?.toString() ?? "";
  const priceValue = Number(rawPrice);
  const signingUser = await getSignedInUser();

  if (!signingUser) {
    redirect("/login");
  }

  if (
    !brand ||
    !model ||
    !colorway ||
    !sku ||
    !size ||
    Number.isNaN(priceValue) ||
    priceValue <= 0
  ) {
    return;
  }

  const sneaker = await prisma.sneaker.upsert({
    where: { sku },
    update: { brand, model, colorway },
    create: {
      brand,
      model,
      colorway,
      sku,
    },
  });

  await prisma.marketplaceListing.create({
    data: {
      sneakerId: sneaker.id,
      sellerName: signingUser.name,
      sellerId: signingUser.email,
      size,
      condition,
      price: priceValue,
      status: "ACTIVE",
    },
  });

  revalidatePath("/marketplace");
  revalidatePath("/marketplace/sell");
  revalidatePath("/marketplace/my-listings");
  redirect("/marketplace/my-listings");
}
