import { prisma } from "../lib/prisma";
import {
  InventoryStatus,
  ListingStatus,
  OrderStatus,
  ShipmentStatus,
  SneakerCondition,
  UserRole,
} from "@prisma/client";

function money(value: number) {
  return Number(value.toFixed(2));
}

async function main() {
  await prisma.shipment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.listingImage.deleteMany();
  await prisma.marketplaceListing.deleteMany();
  await prisma.inventoryImage.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.sellerProfile.deleteMany();
  await prisma.buyerProfile.deleteMany();
  await prisma.user.deleteMany();

  const seller = await prisma.user.create({
    data: {
      clerkUserId: "seed_clerk_seller_1",
      email: "seller@sneakprice.com",
      username: "sneakerking",
      firstName: "Ray",
      lastName: "Seller",
      role: UserRole.SELLER,
      isSeller: true,
      isBuyer: true,
      sellerProfile: {
        create: {
          displayName: "Ray Seller",
          storeName: "Ray Kicks",
          bio: "Sneaker reseller focused on Jordans, Dunks, and Yeezys.",
          ratingAverage: 4.9,
          totalSales: 42,
        },
      },
      buyerProfile: {
        create: {
          displayName: "Ray Seller",
          city: "Toronto",
          state: "ON",
          country: "Canada",
        },
      },
    },
  });

  const buyer = await prisma.user.create({
    data: {
      clerkUserId: "seed_clerk_buyer_1",
      email: "buyer@sneakprice.com",
      username: "buyerone",
      firstName: "Jordan",
      lastName: "Buyer",
      role: UserRole.BUYER,
      isSeller: false,
      isBuyer: true,
      buyerProfile: {
        create: {
          displayName: "Jordan Buyer",
          defaultAddress1: "123 Queen St W",
          city: "Toronto",
          state: "ON",
          postalCode: "M5H 2N2",
          country: "Canada",
        },
      },
    },
  });

  const item1 = await prisma.inventoryItem.create({
    data: {
      sellerId: seller.id,
      name: "Air Jordan 1 Chicago",
      slug: "air-jordan-1-chicago-size-10",
      brand: "Nike",
      model: "Air Jordan 1",
      colorway: "Chicago",
      size: "10",
      sku: "DZ5485-612",
      condition: SneakerCondition.NEW,
      purchasePrice: money(220),
      estimatedMarketValue: money(340),
      source: "eBay",
      status: InventoryStatus.LISTED,
      primaryImageUrl: "/images/jordan1-chicago.jpg",
      acquiredAt: new Date("2026-03-01T12:00:00.000Z"),
      images: {
        create: [
          {
            imageUrl: "/images/jordan1-chicago.jpg",
            sortOrder: 0,
          },
        ],
      },
    },
  });

  const item2 = await prisma.inventoryItem.create({
    data: {
      sellerId: seller.id,
      name: "Yeezy Boost 350 V2 Zebra",
      slug: "yeezy-boost-350-v2-zebra-size-9",
      brand: "Adidas",
      model: "Yeezy Boost 350 V2",
      colorway: "Zebra",
      size: "9",
      sku: "CP9654",
      condition: SneakerCondition.NEW_WITH_BOX,
      purchasePrice: money(180),
      estimatedMarketValue: money(260),
      source: "GOAT",
      status: InventoryStatus.LISTED,
      primaryImageUrl: "/images/yeezy-zebra.jpg",
      acquiredAt: new Date("2026-03-05T12:00:00.000Z"),
      images: {
        create: [
          {
            imageUrl: "/images/yeezy-zebra.jpg",
            sortOrder: 0,
          },
        ],
      },
    },
  });

  const item3 = await prisma.inventoryItem.create({
    data: {
      sellerId: seller.id,
      name: "Nike Dunk Low Panda",
      slug: "nike-dunk-low-panda-size-11",
      brand: "Nike",
      model: "Dunk Low",
      colorway: "Panda",
      size: "11",
      sku: "DD1391-100",
      condition: SneakerCondition.NEW,
      purchasePrice: money(110),
      estimatedMarketValue: money(180),
      source: "Nike",
      status: InventoryStatus.SOLD,
      primaryImageUrl: "/images/dunk-panda.jpg",
      acquiredAt: new Date("2026-03-07T12:00:00.000Z"),
      images: {
        create: [
          {
            imageUrl: "/images/dunk-panda.jpg",
            sortOrder: 0,
          },
        ],
      },
    },
  });

  const item4 = await prisma.inventoryItem.create({
    data: {
      sellerId: seller.id,
      name: "Air Jordan 4 Bred",
      slug: "air-jordan-4-bred-size-10-5",
      brand: "Nike",
      model: "Air Jordan 4",
      colorway: "Bred",
      size: "10.5",
      sku: "FV5029-006",
      condition: SneakerCondition.USED,
      purchasePrice: money(190),
      estimatedMarketValue: money(310),
      source: "Facebook Marketplace",
      status: InventoryStatus.IN_INVENTORY,
      primaryImageUrl: "/images/jordan4-bred.jpg",
      acquiredAt: new Date("2026-03-10T12:00:00.000Z"),
      images: {
        create: [
          {
            imageUrl: "/images/jordan4-bred.jpg",
            sortOrder: 0,
          },
        ],
      },
    },
  });

  const listing1 = await prisma.marketplaceListing.create({
    data: {
      sellerId: seller.id,
      inventoryItemId: item1.id,
      title: "Air Jordan 1 Chicago - Size 10",
      slug: "air-jordan-1-chicago-size-10-listing",
      description: "Brand new pair in great condition. Clean box and ready to ship.",
      brand: item1.brand,
      model: item1.model,
      colorway: item1.colorway,
      size: item1.size,
      sku: item1.sku,
      condition: item1.condition,
      price: money(349),
      status: ListingStatus.ACTIVE,
      primaryImageUrl: item1.primaryImageUrl,
      publishedAt: new Date("2026-03-15T12:00:00.000Z"),
      viewsCount: 112,
      favoritesCount: 18,
      images: {
        create: [
          {
            imageUrl: "/images/jordan1-chicago.jpg",
            sortOrder: 0,
          },
        ],
      },
    },
  });

  const listing2 = await prisma.marketplaceListing.create({
    data: {
      sellerId: seller.id,
      inventoryItemId: item2.id,
      title: "Yeezy Boost 350 V2 Zebra - Size 9",
      slug: "yeezy-boost-350-v2-zebra-size-9-listing",
      description: "New with box. Popular colorway and clean pair.",
      brand: item2.brand,
      model: item2.model,
      colorway: item2.colorway,
      size: item2.size,
      sku: item2.sku,
      condition: item2.condition,
      price: money(269),
      status: ListingStatus.ACTIVE,
      primaryImageUrl: item2.primaryImageUrl,
      publishedAt: new Date("2026-03-16T12:00:00.000Z"),
      viewsCount: 89,
      favoritesCount: 11,
      images: {
        create: [
          {
            imageUrl: "/images/yeezy-zebra.jpg",
            sortOrder: 0,
          },
        ],
      },
    },
  });

  const soldListing = await prisma.marketplaceListing.create({
    data: {
      sellerId: seller.id,
      inventoryItemId: item3.id,
      title: "Nike Dunk Low Panda - Size 11",
      slug: "nike-dunk-low-panda-size-11-listing",
      description: "Fast-moving Panda Dunk in deadstock condition.",
      brand: item3.brand,
      model: item3.model,
      colorway: item3.colorway,
      size: item3.size,
      sku: item3.sku,
      condition: item3.condition,
      price: money(180),
      status: ListingStatus.SOLD,
      primaryImageUrl: item3.primaryImageUrl,
      publishedAt: new Date("2026-03-12T12:00:00.000Z"),
      viewsCount: 140,
      favoritesCount: 24,
    },
  });

  const order = await prisma.order.create({
    data: {
      listingId: soldListing.id,
      sellerId: seller.id,
      buyerId: buyer.id,
      orderNumber: "SP-100001",
      status: OrderStatus.SHIPPED,
      salePrice: money(180),
      fees: money(18),
      shippingCost: money(14),
      taxAmount: money(0),
      payout: money(148),
      buyerEmail: buyer.email,
      buyerFirstName: "Jordan",
      buyerLastName: "Buyer",
      shippingAddress1: "123 Queen St W",
      shippingCity: "Toronto",
      shippingState: "ON",
      shippingPostalCode: "M5H 2N2",
      shippingCountry: "Canada",
      paidAt: new Date("2026-03-17T12:00:00.000Z"),
      shippedAt: new Date("2026-03-18T12:00:00.000Z"),
    },
  });

  await prisma.shipment.create({
    data: {
      orderId: order.id,
      status: ShipmentStatus.IN_TRANSIT,
      carrier: "UPS",
      serviceLevel: "Ground",
      trackingNumber: "1Z999AA10123456784",
      trackingUrl: "https://www.ups.com/track?tracknum=1Z999AA10123456784",
      buyerAddressState: "ON",
      labelUrl: "/labels/sp-100001.pdf",
      labelCreatedAt: new Date("2026-03-18T11:00:00.000Z"),
      shippedAt: new Date("2026-03-18T12:00:00.000Z"),
    },
  });

  console.log("✅ Seed complete");
  console.log({
    sellerId: seller.id,
    buyerId: buyer.id,
    listing1Id: listing1.id,
    listing2Id: listing2.id,
    orderId: order.id,
    inventoryItem4Id: item4.id,
  });
}

main()
  .catch((error) => {
    console.error("❌ Seed failed");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });