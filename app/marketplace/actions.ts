"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";
import {
  initialListingFormState,
  type ListingFormState,
  type ListingFormValues,
} from "@/lib/marketplace-form";
import { getCurrentDbUser } from "@/lib/current-user";

function buildValues(formData: FormData): ListingFormValues {
  return {
    brand: formData.get("brand")?.toString().trim() ?? "",
    model: formData.get("model")?.toString().trim() ?? "",
    colorway: formData.get("colorway")?.toString().trim() ?? "",
    sku: formData.get("sku")?.toString().trim().toUpperCase() ?? "",
    size: formData.get("size")?.toString().trim() ?? "",
    price: formData.get("price")?.toString().trim() ?? "",
    retailPrice: formData.get("retailPrice")?.toString().trim() ?? "",
    condition: formData.get("condition")?.toString().trim() || "NEW",
    imageUrl: formData.get("imageUrl")?.toString().trim() ?? "",
  };
}

function generateFallbackSku(values: ListingFormValues) {
  const brandSlug = values.brand
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 10);

  const modelSlug = values.model
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 16);

  return `${brandSlug || "SNEAK"}-${modelSlug || "LISTING"}-${Date.now()
    .toString(36)
    .toUpperCase()}`;
}

async function uploadImageFromFormData(
  formData: FormData,
  existingImageUrl?: string | null
) {
  const imageFile = formData.get("imageFile");
  const imageUrl = formData.get("imageUrl")?.toString().trim() ?? "";
  const fallbackImageUrl = existingImageUrl ?? null;

  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return {
      imageUrl: imageUrl || fallbackImageUrl,
      error: null as string | null,
    };
  }

  if (!imageFile.type.startsWith("image/")) {
    return {
      imageUrl: fallbackImageUrl || imageUrl || null,
      error: "Upload a JPG, PNG, or WebP image file.",
    };
  }

  if (imageFile.size > 2 * 1024 * 1024) {
    return {
      imageUrl: fallbackImageUrl || imageUrl || null,
      error: "Image uploads must be 2MB or smaller for now.",
    };
  }

  const bytes = Buffer.from(await imageFile.arrayBuffer());
  const uploadsDirectory = path.join(process.cwd(), "public", "uploads");
  const fileName = `listing-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}.webp`;
  const filePath = path.join(uploadsDirectory, fileName);

  await mkdir(uploadsDirectory, { recursive: true });

  const optimizedImage = await sharp(bytes)
    .rotate()
    .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  await writeFile(filePath, optimizedImage);

  return {
    imageUrl: `/uploads/${fileName}`,
    error: null as string | null,
  };
}

function validateListingValues(values: ListingFormValues) {
  const fieldErrors: ListingFormState["fieldErrors"] = {};
  const priceValue = Number(values.price);
  const retailPriceValue = values.retailPrice ? Number(values.retailPrice) : null;

  if (!values.brand) fieldErrors.brand = "Brand is required.";
  if (!values.model) fieldErrors.model = "Model is required.";
  if (!values.colorway) fieldErrors.colorway = "Colorway is required.";
  if (!values.size) fieldErrors.size = "Size is required.";
  if (Number.isNaN(priceValue) || priceValue <= 0) {
    fieldErrors.price = "Enter a valid ask price.";
  }
  if (
    values.retailPrice &&
    (retailPriceValue === null || Number.isNaN(retailPriceValue) || retailPriceValue <= 0)
  ) {
    fieldErrors.retailPrice = "Retail price must be greater than zero.";
  }
  if (!values.condition) {
    fieldErrors.condition = "Condition is required.";
  }

  return {
    fieldErrors,
    hasErrors: Object.keys(fieldErrors).length > 0,
    priceValue,
    retailPriceValue,
  };
}

async function ensureSignedInUser() {
  const currentUser = await getCurrentDbUser();

  if (!currentUser) {
    redirect("/login");
  }

  return currentUser;
}

export async function createListing(
  _prevState: ListingFormState,
  formData: FormData
): Promise<ListingFormState> {
  const currentUser = await ensureSignedInUser();

  const values = buildValues(formData);
  const finalValues = {
    ...values,
    sku: values.sku || generateFallbackSku(values),
  };

  const { fieldErrors, hasErrors, priceValue } = validateListingValues(finalValues);
  const imageUpload = await uploadImageFromFormData(formData);

  if (imageUpload.error) {
    fieldErrors.imageFile = imageUpload.error;
  }

  if (hasErrors || imageUpload.error) {
    return {
      status: "error",
      message: "Fix the highlighted fields and try again.",
      fieldErrors,
      values: finalValues,
    };
  }

  const existingInventoryItem = await prisma.inventoryItem.findFirst({
    where: {
      sellerId: currentUser.id,
      sku: finalValues.sku,
    },
  });

  const sneakerName = `${finalValues.brand} ${finalValues.model}`.trim();

  const sneaker = existingInventoryItem
    ? await prisma.inventoryItem.update({
        where: { id: existingInventoryItem.id },
        data: {
          name: sneakerName,
          brand: finalValues.brand,
          model: finalValues.model,
          colorway: finalValues.colorway,
          sku: finalValues.sku,
          size: finalValues.size,
          condition: finalValues.condition as never,
          primaryImageUrl: imageUpload.imageUrl ?? null,
          estimatedMarketValue: priceValue,
          status: "LISTED",
          source: "marketplace",
        },
      })
    : await prisma.inventoryItem.create({
        data: {
          sellerId: currentUser.id,
          name: sneakerName,
          brand: finalValues.brand,
          model: finalValues.model,
          colorway: finalValues.colorway,
          sku: finalValues.sku,
          size: finalValues.size,
          condition: finalValues.condition as never,
          purchasePrice: 0,
          estimatedMarketValue: priceValue,
          primaryImageUrl: imageUpload.imageUrl ?? null,
          source: "marketplace",
          status: "LISTED",
        },
      });

  const listingSlug = `${finalValues.brand}-${finalValues.model}-${finalValues.size}-${Date.now()}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

  await prisma.marketplaceListing.create({
    data: {
      sellerId: currentUser.id,
      inventoryItemId: sneaker.id,
      title: sneakerName,
      slug: listingSlug || `${finalValues.sku.toLowerCase()}-${Date.now()}`,
      brand: finalValues.brand,
      model: finalValues.model,
      colorway: finalValues.colorway,
      size: finalValues.size,
      sku: finalValues.sku,
      condition: finalValues.condition as never,
      price: priceValue,
      status: "ACTIVE",
      primaryImageUrl: imageUpload.imageUrl ?? null,
      publishedAt: new Date(),
    },
  });

  revalidatePath("/");
  revalidatePath("/marketplace");
  revalidatePath("/marketplace/sell");
  revalidatePath("/marketplace/my-listings");
  redirect("/marketplace/my-listings?created=1");
}

export async function updateListing(
  _prevState: ListingFormState,
  formData: FormData
): Promise<ListingFormState> {
  const currentUser = await ensureSignedInUser();
  const listingId = String(formData.get("listingId") ?? "");

  if (!listingId) {
    return {
      ...initialListingFormState,
      status: "error",
      message: "Listing not found.",
    };
  }

  const existingListing = await prisma.marketplaceListing.findFirst({
    where: {
      id: listingId,
      sellerId: currentUser.id,
    },
    include: {
      sneaker: true,
    },
  });

  if (!existingListing) {
    return {
      ...initialListingFormState,
      status: "error",
      message: "You cannot edit this listing.",
    };
  }

  const values = buildValues(formData);
  const finalValues = {
    ...values,
    sku: values.sku || existingListing.sneaker.sku || generateFallbackSku(values),
  };

  const { fieldErrors, hasErrors, priceValue } = validateListingValues(finalValues);
  const imageUpload = await uploadImageFromFormData(
    formData,
    existingListing.primaryImageUrl ?? existingListing.sneaker.primaryImageUrl
  );

  if (imageUpload.error) {
    fieldErrors.imageFile = imageUpload.error;
  }

  if (hasErrors || imageUpload.error) {
    return {
      status: "error",
      message: "Fix the highlighted fields and try again.",
      fieldErrors,
      values: finalValues,
    };
  }

  await prisma.inventoryItem.update({
    where: { id: existingListing.sneaker.id },
    data: {
      name: `${finalValues.brand} ${finalValues.model}`.trim(),
      brand: finalValues.brand,
      model: finalValues.model,
      colorway: finalValues.colorway,
      sku: finalValues.sku,
      size: finalValues.size,
      condition: finalValues.condition as never,
      primaryImageUrl: imageUpload.imageUrl ?? null,
      estimatedMarketValue: priceValue,
      status: "LISTED",
      source: "marketplace",
    },
  });

  await prisma.marketplaceListing.update({
    where: { id: existingListing.id },
    data: {
      size: finalValues.size,
      condition: finalValues.condition as never,
      price: priceValue,
      primaryImageUrl: imageUpload.imageUrl ?? null,
    },
  });

  revalidatePath("/");
  revalidatePath("/marketplace");
  revalidatePath("/marketplace/my-listings");
  revalidatePath(`/marketplace/${existingListing.id}`);
  revalidatePath(`/marketplace/my-listings/${existingListing.id}/edit`);
  redirect("/marketplace/my-listings?updated=1");
}

export async function deleteListing(formData: FormData) {
  const currentUser = await ensureSignedInUser();
  const listingId = String(formData.get("listingId") ?? "");

  if (!listingId) {
    return;
  }

  const listing = await prisma.marketplaceListing.findFirst({
    where: {
      id: listingId,
      sellerId: currentUser.id,
    },
  });

  if (!listing) {
    return;
  }

  await prisma.marketplaceListing.delete({
    where: { id: listing.id },
  });

  revalidatePath("/");
  revalidatePath("/marketplace");
  revalidatePath("/marketplace/my-listings");
  redirect("/marketplace/my-listings?deleted=1");
}

async function updateListingStatus(
  formData: FormData,
  status: "ACTIVE" | "SOLD" | "DRAFT"
) {
  const currentUser = await ensureSignedInUser();
  const listingId = String(formData.get("listingId") ?? "");

  if (!listingId) {
    return;
  }

  const listing = await prisma.marketplaceListing.findFirst({
    where: {
      id: listingId,
      sellerId: currentUser.id,
    },
  });

  if (!listing) {
    return;
  }

  await prisma.marketplaceListing.update({
    where: { id: listing.id },
    data: { status },
  });

  revalidatePath("/");
  revalidatePath("/marketplace");
  revalidatePath("/marketplace/my-listings");
  revalidatePath(`/marketplace/${listing.id}`);

  const statusParam =
    status === "SOLD" ? "sold=1" : status === "DRAFT" ? "unlisted=1" : "relisted=1";

  redirect(`/marketplace/my-listings?${statusParam}`);
}

export async function markListingSold(formData: FormData) {
  return updateListingStatus(formData, "SOLD");
}

export async function unlistListing(formData: FormData) {
  return updateListingStatus(formData, "DRAFT");
}

export async function relistListing(formData: FormData) {
  return updateListingStatus(formData, "ACTIVE");
}
