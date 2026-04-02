"use server";

import { redirect } from "next/navigation";
import { getSignedInUser } from "@/lib/session";

export async function captureBuyerInfoAction(formData: FormData): Promise<void> {
  const signedInUser = await getSignedInUser();

  if (!signedInUser) {
    redirect("/login");
  }

  const listingId = String(formData.get("listingId") ?? "");
  const fullName = String(formData.get("fullName") ?? "");
  const email = String(formData.get("email") ?? "");
  const shippingAddress = String(formData.get("shippingAddress") ?? "");
  const shippingCity = String(formData.get("shippingCity") ?? "");
  const shippingRegion = String(formData.get("shippingRegion") ?? "");
  const shippingCountry = String(formData.get("shippingCountry") ?? "");
  const buyerNotes = String(formData.get("buyerNotes") ?? "");

  if (!listingId) {
    throw new Error("Missing listingId");
  }

  console.log("Buyer info captured", {
    listingId,
    signedInUserEmail: signedInUser.email,
    fullName,
    email,
    shippingAddress,
    shippingCity,
    shippingRegion,
    shippingCountry,
    buyerNotes,
  });

  redirect(`/buyer/checkout/${listingId}?saved=1`);
}