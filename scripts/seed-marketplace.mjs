import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

function normalizeDatabaseUrl(rawUrl) {
  try {
    new URL(rawUrl);
    return rawUrl;
  } catch {
    const protocolSeparatorIndex = rawUrl.indexOf("://");
    if (protocolSeparatorIndex === -1) {
      throw new Error("DATABASE_URL is invalid.");
    }

    const protocol = rawUrl.slice(0, protocolSeparatorIndex + 3);
    const remainder = rawUrl.slice(protocolSeparatorIndex + 3);
    const lastAtIndex = remainder.lastIndexOf("@");

    if (lastAtIndex === -1) {
      throw new Error("DATABASE_URL is missing credentials or host.");
    }

    const auth = remainder.slice(0, lastAtIndex);
    const hostAndPath = remainder.slice(lastAtIndex + 1);
    const firstColonIndex = auth.indexOf(":");

    if (firstColonIndex === -1) {
      throw new Error("DATABASE_URL credentials are invalid.");
    }

    const username = auth.slice(0, firstColonIndex);
    const password = auth.slice(firstColonIndex + 1);

    return `${protocol}${username}:${encodeURIComponent(password)}@${hostAndPath}`;
  }
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required to seed marketplace data.");
}

const pool = new Pool({
  connectionString: normalizeDatabaseUrl(process.env.DATABASE_URL),
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

const sneakerTemplates = [
  {
    brand: "Nike",
    model: "Air Max Pulse",
    colorway: "Volt Fade",
    skuBase: "NK-AMP",
    imageUrl: "/nike.svg",
    retailPrice: 180,
  },
  {
    brand: "Nike",
    model: "Dunk Low",
    colorway: "Court Purple",
    skuBase: "NK-DLK",
    imageUrl: "/jordan-yellow.png",
    retailPrice: 120,
  },
  {
    brand: "Jordan",
    model: "Air Jordan 1 High",
    colorway: "Bred Toe",
    skuBase: "JD-AJ1",
    imageUrl: "/jordan.svg",
    retailPrice: 190,
  },
  {
    brand: "Adidas",
    model: "Yeezy Boost 350",
    colorway: "Zebra Mist",
    skuBase: "AD-YZY",
    imageUrl: "/yeezy.svg",
    retailPrice: 230,
  },
  {
    brand: "Adidas",
    model: "Campus 00s",
    colorway: "Cloud White",
    skuBase: "AD-CMP",
    imageUrl: "/adidas.svg",
    retailPrice: 110,
  },
  {
    brand: "Nike",
    model: "Air Force 1 Low",
    colorway: "Triple White",
    skuBase: "NK-AF1",
    imageUrl: "/nike.svg",
    retailPrice: 115,
  },
];

const sellerNames = [
  "Shadow Kicks",
  "Resell Lab",
  "Sunset Sole",
  "North Court",
  "Vault Supply",
  "Sneaker Switch",
  "Heat Borough",
  "Lace Theory",
  "Flight Clubhouse",
  "Street Pairs",
];

const sizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"];
const conditions = ["Deadstock", "Excellent", "Very Good"];

function buildInventory() {
  const sneakers = [];
  const listings = [];

  for (let index = 0; index < 60; index += 1) {
    const template = sneakerTemplates[index % sneakerTemplates.length];
    const styleNumber = String(index + 1).padStart(2, "0");
    const sku = `${template.skuBase}-${styleNumber}`;
    const sellerName = sellerNames[index % sellerNames.length];

    sneakers.push({
      brand: template.brand,
      model: `${template.model} ${styleNumber}`,
      colorway: template.colorway,
      sku,
      imageUrl: template.imageUrl,
      retailPrice: template.retailPrice + (index % 5) * 10,
    });

    listings.push({
      sku,
      sellerName,
      sellerId: sellerName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      size: sizes[index % sizes.length],
      condition: conditions[index % conditions.length],
      price: template.retailPrice + 55 + (index % 8) * 15,
      status: "ACTIVE",
    });
  }

  return { sneakers, listings };
}

async function main() {
  const { sneakers, listings } = buildInventory();

  await prisma.listingHold.deleteMany({});
  await prisma.marketplaceListing.deleteMany({});

  const sneakerMap = {};

  for (const sneaker of sneakers) {
    const record = await prisma.sneaker.upsert({
      where: { sku: sneaker.sku },
      update: {
        brand: sneaker.brand,
        model: sneaker.model,
        colorway: sneaker.colorway,
        imageUrl: sneaker.imageUrl,
        retailPrice: sneaker.retailPrice,
      },
      create: {
        brand: sneaker.brand,
        model: sneaker.model,
        colorway: sneaker.colorway,
        sku: sneaker.sku,
        imageUrl: sneaker.imageUrl,
        retailPrice: sneaker.retailPrice,
      },
    });

    sneakerMap[sneaker.sku] = record;
  }

  for (const listing of listings) {
    const sneaker = sneakerMap[listing.sku];
    if (!sneaker) {
      continue;
    }

    await prisma.marketplaceListing.create({
      data: {
        sneakerId: sneaker.id,
        sellerName: listing.sellerName,
        sellerId: listing.sellerId,
        size: listing.size,
        condition: listing.condition,
        price: listing.price,
        status: listing.status,
      },
    });
  }

  console.log(`Seeded ${listings.length} marketplace listings for catalog testing.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
