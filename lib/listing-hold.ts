import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSignedInUser } from "@/lib/session";

const HOLD_DURATION_MINUTES = 15;

async function createOrRefreshListingHold(listingId: number) {
  const signedInUser = await getSignedInUser();
  if (!listingId || !signedInUser) {
    return null;
  }

  const listing = await prisma.marketplaceListing.findUnique({
    where: { id: listingId },
    include: {
      listingHolds: {
        where: { status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!listing) {
    return null;
  }

  const activeHold = listing.listingHolds[0];
  const activeHoldBelongsToBuyer = activeHold?.buyerId === signedInUser.email;

  if (activeHold && !activeHoldBelongsToBuyer) {
    return null;
  }

  const expiresAt = new Date(
    Date.now() + HOLD_DURATION_MINUTES * 60 * 1000
  );

  if (activeHoldBelongsToBuyer && activeHold) {
    await prisma.listingHold.update({
      where: { id: activeHold.id },
      data: { expiresAt },
    });
  } else {
    await prisma.listingHold.create({
      data: {
        listingId,
        buyerName: signedInUser.name,
        buyerId: signedInUser.email,
        expiresAt,
      },
    });
  }

  await prisma.marketplaceListing.update({
    where: { id: listingId },
    data: {
      status: "HELD",
    },
  });

  return { listingId, signedInUser };
}

export async function holdListingAction(formData: FormData) {
  "use server";

  const listingId = Number(formData.get("listingId"));
  const result = await createOrRefreshListingHold(listingId);

  if (!result) {
    return;
  }

  revalidatePath("/");
  revalidatePath("/marketplace");
  revalidatePath(`/marketplace/${listingId}`);
  revalidatePath("/buyer");
}

export async function beginPurchaseAction(formData: FormData) {
  "use server";

  const listingId = Number(formData.get("listingId"));
  const signedInUser = await getSignedInUser();

  if (!signedInUser) {
    redirect("/login");
  }

  const result = await createOrRefreshListingHold(listingId);

  if (!result) {
    redirect(`/marketplace/${listingId}?unavailable=1`);
  }

  revalidatePath("/");
  revalidatePath("/marketplace");
  revalidatePath(`/marketplace/${listingId}`);
  revalidatePath("/buyer");
  redirect(`/buyer/checkout/${listingId}`);
}

export function formatHoldExpiry(expiresAt: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(expiresAt));
}
