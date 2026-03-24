import { prisma } from "@/lib/prisma";
import { getSignedInUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function captureBuyerInfoAction(formData: FormData) {
  "use server";

  const signedInUser = await getSignedInUser();
  if (!signedInUser) {
    redirect("/login");
  }

  const listingId = Number(formData.get("listingId"));
  if (!listingId) {
    return;
  }

  const existing = await prisma.listingHold.findFirst({
    where: {
      listingId,
      buyerId: signedInUser.email,
    },
    orderBy: { createdAt: "desc" },
  });

  const normalize = (value: FormDataEntryValue | null) =>
    typeof value === "string" ? value.trim() : "";

  const fullName = normalize(formData.get("fullName")) || signedInUser.name;
  const email = normalize(formData.get("email")) || signedInUser.email;
  const shippingAddress = normalize(formData.get("shippingAddress"));
  const shippingCity = normalize(formData.get("shippingCity"));
  const shippingRegion = normalize(formData.get("shippingRegion"));
  const shippingCountry = normalize(formData.get("shippingCountry"));
  const buyerNotes = normalize(formData.get("buyerNotes"));

  const data = {
    listingId,
    buyerName: fullName,
    buyerEmail: email,
    shippingAddress: shippingAddress || null,
    shippingCity: shippingCity || null,
    shippingRegion: shippingRegion || null,
    shippingCountry: shippingCountry || null,
    buyerNotes: buyerNotes || null,
    status: "ACTIVE",
  };

  if (existing) {
    await prisma.listingHold.update({
      where: { id: existing.id },
      data,
    });
  } else {
    await prisma.listingHold.create({
      data,
    });
  }

  revalidatePath(`/buyer/checkout/${listingId}`);
  revalidatePath(`/marketplace/${listingId}`);
  revalidatePath("/buyer");
}
