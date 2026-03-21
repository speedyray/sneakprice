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
    model: "Air Jordan 1 Retro",
    colorway: "Chicago Heritage",
    skuBase: "NK-AMP",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/1985%20Air%20Jordan%201s.jpg",
    retailPrice: 180,
  },
  {
    brand: "Nike",
    model: "Air Jordan 1 High",
    colorway: "Black Toe",
    skuBase: "NK-DLK",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Jordan%201%20sb%20nike.jpg",
    retailPrice: 190,
  },
  {
    brand: "Jordan",
    model: "Jordan Flight Court",
    colorway: "Summit White Fire Red",
    skuBase: "JD-AJ1",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Airjordan1985-1st.JPG",
    retailPrice: 175,
  },
  {
    brand: "Nike",
    model: "Air Jordan I",
    colorway: "Museum White Red",
    skuBase: "NK-AJ1",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Nike%20Air%20Jordan%20I.jpg",
    retailPrice: 210,
  },
  {
    brand: "Jordan",
    model: "Air Jordan XIII",
    colorway: "White Black Varsity Red",
    skuBase: "JD-AJ4",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Nike%20Air%20Jordan%20XIII%20%28cropped%29.jpg",
    retailPrice: 220,
  },
  {
    brand: "Adidas",
    model: "Yeezy Boost 350 V2",
    colorway: "EF2905 Grey",
    skuBase: "JD-AJ8",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Adidas%20Handball%20Spezial.jpg",
    retailPrice: 225,
  },
  {
    brand: "Adidas",
    model: "Yeezy Boost 350 V2",
    colorway: "Sesame",
    skuBase: "JD-AJ12",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Adidas%20Campus%2000s.jpg",
    retailPrice: 230,
  },
  {
    brand: "Adidas",
    model: "Yeezy Boost 350 V2",
    colorway: "Onyx",
    skuBase: "JD-AJ17",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Adidas%20Superstar%20shoes%20pair.jpg",
    retailPrice: 250,
  },
  {
    brand: "Adidas",
    model: "Yeezy Boost 350 V2",
    colorway: "MX Rock",
    skuBase: "JD-AJ16",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/A%20pair%20of%20Lee%20Cooper%20sneakers.jpg",
    retailPrice: 240,
  },
  {
    brand: "Jordan",
    model: "Air Jordan XX",
    colorway: "Stealth White",
    skuBase: "JD-AJ20",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Nike%20Air%20Jordan%20XX%20%28cropped%29.jpg",
    retailPrice: 235,
  },
  {
    brand: "Nike",
    model: "Air Ship",
    colorway: "Black Red",
    skuBase: "NK-ASP",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Nike%20Air%20Ship.jpg",
    retailPrice: 150,
  },
  {
    brand: "Adidas",
    model: "SL 72 RTN",
    colorway: "Bluebird Yellow",
    skuBase: "AD-YZY",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Adidas%20SL%2072%20RTN.jpg",
    retailPrice: 125,
  },
  {
    brand: "Adidas",
    model: "Handball Spezial",
    colorway: "Cream White Gum",
    skuBase: "AD-CMP",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Adidas%20Handball%20Spezial.jpg",
    retailPrice: 115,
  },
  {
    brand: "Adidas",
    model: "Campus 00s",
    colorway: "Core Black",
    skuBase: "AD-C00",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Adidas%20Campus%2000s.jpg",
    retailPrice: 120,
  },
  {
    brand: "Adidas",
    model: "Superstar",
    colorway: "White Black Shell Toe",
    skuBase: "AD-SUP",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Adidas%20Superstar%20shoes%20pair.jpg",
    retailPrice: 110,
  },
  {
    brand: "Adidas",
    model: "Stan Smith",
    colorway: "White Green",
    skuBase: "AD-STM",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Adidas%20Stan%20Smith%20shoes.jpg",
    retailPrice: 105,
  },
  {
    brand: "Adidas",
    model: "Stan Smith 1972",
    colorway: "Archive White",
    skuBase: "AD-ST2",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/A%20pair%20of%20Lee%20Cooper%20sneakers.jpg",
    retailPrice: 130,
  },
  {
    brand: "Nike",
    model: "Nike Air Ship",
    colorway: "Black Red",
    skuBase: "NK-CEM",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Nike%20Air%20Ship.jpg",
    retailPrice: 215,
  },
  {
    brand: "Nike",
    model: "Air Jordan XIII",
    colorway: "1998 Black",
    skuBase: "NK-VTG",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Nike%20Air%20Jordan%20XIII%20de%201998.JPG",
    retailPrice: 145,
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
