import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSignedInUser } from "@/lib/session";

const HOLD_DURATION_MINUTES = 15;

export async function holdListingAction(formData: FormData) {
  "use server";

  const listingId = Number(formData.get("listingId"));
  const signedInUser = await getSignedInUser();

  if (!listingId || !signedInUser) {
    return;
  }

  const expiresAt = new Date(
    Date.now() + HOLD_DURATION_MINUTES * 60 * 1000
  );

  await prisma.listingHold.create({
    data: {
      listingId,
      buyerName: signedInUser.name,
      buyerId: signedInUser.email,
      expiresAt,
    },
  });

  await prisma.marketplaceListing.update({
    where: { id: listingId },
    data: {
      status: "HELD",
    },
  });

  revalidatePath("/");
  revalidatePath("/marketplace");
  revalidatePath(`/marketplace/${listingId}`);
  revalidatePath("/buyer");
}

export function formatHoldExpiry(expiresAt: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(expiresAt));
}
