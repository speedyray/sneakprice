import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

const sneakers = [
  {
    brand: "Nike",
    model: "Air Jordan 1 Retro High",
    colorway: "Black/University Red/White",
    sku: "AJ1-BRED-TOE",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0015/7981/0543/products/bred-toe-aj1.png",
    retailPrice: 200,
  },
  {
    brand: "Adidas",
    model: "Yeezy Boost 350 V2",
    colorway: "Zebra",
    sku: "YEEZY-350-V2-ZEBRA",
    imageUrl:
      "https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Zebra-2017.png",
    retailPrice: 220,
  },
  {
    brand: "Nike",
    model: "Dunk Low",
    colorway: "Syracuse",
    sku: "DUNK-LOW-SYRACUSE",
    imageUrl:
      "https://images.stockx.com/images/Nike-Dunk-Low-Syracuse-2021.png",
    retailPrice: 120,
  },
];

const listings = [
  {
    sku: "AJ1-BRED-TOE",
    sellerName: "Shadow Kicks",
    size: "10",
    condition: "Deadstock",
    price: 330,
    status: "ACTIVE",
    sellerId: "shadow-kicks",
  },
  {
    sku: "YEEZY-350-V2-ZEBRA",
    sellerName: "Resell Lab",
    size: "9.5",
    condition: "Deadstock",
    price: 300,
    status: "ACTIVE",
    sellerId: "resell-lab",
  },
  {
    sku: "DUNK-LOW-SYRACUSE",
    sellerName: "Sunset Sole",
    size: "11",
    condition: "Very Good",
    price: 260,
    status: "ACTIVE",
    sellerId: "sunset-sole",
  },
];

async function main() {
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
        sellerId: listing.sellerId ?? null,
        size: listing.size,
        condition: listing.condition,
        price: listing.price,
        status: listing.status || "ACTIVE",
      },
    });
  }

  console.log("Seeded marketplace sneaker/listing data.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
