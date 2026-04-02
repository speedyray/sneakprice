import { SneakerCondition, type User, type SellerProfile } from "@prisma/client";

export function decimalLikeToNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);

  if (
    typeof value === "object" &&
    value !== null &&
    "toNumber" in value &&
    typeof (value as { toNumber: unknown }).toNumber === "function"
  ) {
    return (value as { toNumber: () => number }).toNumber();
  }

  return Number(value ?? 0);
}

export function formatSneakerCondition(condition: SneakerCondition | string | null | undefined) {
  switch (condition) {
    case SneakerCondition.NEW:
      return "New";
    case SneakerCondition.NEW_WITH_BOX:
      return "New With Box";
    case SneakerCondition.USED:
      return "Used";
    default:
      return "Unknown";
  }
}

export function toSneakerCondition(value: string | null | undefined): SneakerCondition {
  switch ((value ?? "").trim().toUpperCase()) {
    case SneakerCondition.NEW:
      return SneakerCondition.NEW;
    case SneakerCondition.NEW_WITH_BOX:
      return SneakerCondition.NEW_WITH_BOX;
    case SneakerCondition.USED:
      return SneakerCondition.USED;
    default:
      return SneakerCondition.NEW;
  }
}

export function buildListingTitle({
  brand,
  model,
  colorway,
  size,
}: {
  brand: string;
  model: string;
  colorway: string;
  size: string;
}) {
  return [brand, model, colorway, size ? `Size ${size}` : ""]
    .filter(Boolean)
    .join(" - ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function buildUniqueSlug(base: string, suffix = Date.now().toString(36)) {
  const slugBase = slugify(base) || "listing";
  return `${slugBase}-${suffix}`;
}

export function getSellerDisplayName(
  seller: (User & { sellerProfile?: SellerProfile | null }) | null | undefined
) {
  if (!seller) return "SneakPrice Seller";

  return (
    seller.sellerProfile?.storeName ||
    seller.sellerProfile?.displayName ||
    seller.firstName ||
    seller.username ||
    seller.email
  );
}
