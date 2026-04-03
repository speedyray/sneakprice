import {
  HoldStatus,
  ListingStatus,
  OrderStatus,
  ShipmentStatus,
  type SellerProfile,
  type User,
} from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";
import { decimalToNumber } from "@/lib/money";
import { getSellerDisplayName } from "@/lib/marketplace-utils";

type UserWithSellerProfile = User & {
  sellerProfile?: SellerProfile | null;
};

function getBuyerDisplayName(user: User | null | undefined) {
  if (!user) return "Unknown Buyer";

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return fullName || user.username || user.email;
}

export type AdminListingRow = {
  id: string;
  title: string;
  brand: string | null;
  model: string | null;
  colorway: string | null;
  size: string | null;
  condition: string;
  status: ListingStatus;
  price: number;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  createdAt: string;
  publishedAt: string | null;
};

export type AdminUserRow = {
  id: string;
  email: string;
  displayName: string;
  role: string;
  isSeller: boolean;
  isBuyer: boolean;
  listingCount: number;
  inventoryCount: number;
  buyerOrderCount: number;
  sellerOrderCount: number;
  createdAt: string;
};

export type AdminOrderRow = {
  id: string;
  orderNumber: string;
  listingId: string;
  listingTitle: string;
  sellerName: string;
  sellerEmail: string;
  buyerName: string;
  buyerEmail: string;
  orderStatus: OrderStatus;
  shipmentStatus: ShipmentStatus | null;
  salePrice: number;
  payout: number;
  createdAt: string;
};

export type AdminActivityRow = {
  id: string;
  type: "user" | "listing" | "order" | "shipment";
  title: string;
  description: string;
  timestamp: string;
};

export type AdminDisputeRow = {
  id: string;
  orderNumber: string;
  issue: string;
  listingTitle: string;
  sellerName: string;
  buyerName: string;
  orderStatus: OrderStatus;
  shipmentStatus: ShipmentStatus | null;
  salePrice: number;
  createdAt: string;
};

export type AdminHoldRow = {
  id: string;
  listingId: string;
  listingTitle: string;
  sellerName: string;
  buyerName: string;
  buyerEmail: string;
  expiresAt: string | null;
  createdAt: string;
};

export async function getAdminListings(limit?: number): Promise<AdminListingRow[]> {
  const listings = await prisma.marketplaceListing.findMany({
    include: {
      seller: {
        include: {
          sellerProfile: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    ...(typeof limit === "number" ? { take: limit } : {}),
  });

  return listings.map((listing) => ({
    id: listing.id,
    title: listing.title,
    brand: listing.brand,
    model: listing.model,
    colorway: listing.colorway,
    size: listing.size,
    condition: listing.condition,
    status: listing.status,
    price: decimalToNumber(listing.price),
    sellerId: listing.sellerId,
    sellerName: getSellerDisplayName(listing.seller as UserWithSellerProfile),
    sellerEmail: listing.seller.email,
    createdAt: listing.createdAt.toISOString(),
    publishedAt: listing.publishedAt?.toISOString() ?? null,
  }));
}

export async function getAdminUsers(limit?: number): Promise<AdminUserRow[]> {
  const users = await prisma.user.findMany({
    include: {
      sellerProfile: true,
      _count: {
        select: {
          listings: true,
          inventoryItems: true,
          buyerOrders: true,
          sellerOrders: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    ...(typeof limit === "number" ? { take: limit } : {}),
  });

  return users.map((user) => {
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();

    return {
      id: user.id,
      email: user.email,
      displayName:
        fullName ||
        user.sellerProfile?.displayName ||
        user.username ||
        user.email,
      role: user.role,
      isSeller: user.isSeller,
      isBuyer: user.isBuyer,
      listingCount: user._count.listings,
      inventoryCount: user._count.inventoryItems,
      buyerOrderCount: user._count.buyerOrders,
      sellerOrderCount: user._count.sellerOrders,
      createdAt: user.createdAt.toISOString(),
    };
  });
}

export async function getAdminOrders(limit?: number): Promise<AdminOrderRow[]> {
  const orders = await prisma.order.findMany({
    include: {
      listing: {
        select: {
          id: true,
          title: true,
        },
      },
      seller: {
        include: {
          sellerProfile: true,
        },
      },
      buyer: true,
      shipment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    ...(typeof limit === "number" ? { take: limit } : {}),
  });

  return orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    listingId: order.listing.id,
    listingTitle: order.listing.title,
    sellerName: getSellerDisplayName(order.seller as UserWithSellerProfile),
    sellerEmail: order.seller.email,
    buyerName: getBuyerDisplayName(order.buyer),
    buyerEmail: order.buyer.email,
    orderStatus: order.status,
    shipmentStatus: order.shipment?.status ?? null,
    salePrice: decimalToNumber(order.salePrice),
    payout: decimalToNumber(order.payout),
    createdAt: order.createdAt.toISOString(),
  }));
}

export async function getAdminActivityFeed(limit = 30): Promise<AdminActivityRow[]> {
  const take = Math.max(limit, 10);

  const [users, listings, orders, shipments] = await Promise.all([
    prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take,
    }),
    prisma.marketplaceListing.findMany({
      include: {
        seller: {
          include: {
            sellerProfile: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take,
    }),
    prisma.order.findMany({
      include: {
        listing: {
          select: {
            title: true,
          },
        },
        seller: {
          include: {
            sellerProfile: true,
          },
        },
        buyer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take,
    }),
    prisma.shipment.findMany({
      include: {
        order: {
          include: {
            listing: {
              select: {
                title: true,
              },
            },
            seller: {
              include: {
                sellerProfile: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take,
    }),
  ]);

  const events: AdminActivityRow[] = [
    ...users.map((user) => {
      const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
      const name = fullName || user.username || user.email;

      return {
        id: `user-${user.id}`,
        type: "user" as const,
        title: "New user created",
        description: `${name} joined the platform.`,
        timestamp: user.createdAt.toISOString(),
      };
    }),
    ...listings.map((listing) => ({
      id: `listing-${listing.id}`,
      type: "listing" as const,
      title: "Listing published",
      description: `${listing.title} was created by ${getSellerDisplayName(
        listing.seller as UserWithSellerProfile
      )}.`,
      timestamp: listing.createdAt.toISOString(),
    })),
    ...orders.map((order) => ({
      id: `order-${order.id}`,
      type: "order" as const,
      title: `Order ${order.orderNumber}`,
      description: `${getBuyerDisplayName(order.buyer)} placed an order for ${
        order.listing.title
      }.`,
      timestamp: order.createdAt.toISOString(),
    })),
    ...shipments.map((shipment) => ({
      id: `shipment-${shipment.id}`,
      type: "shipment" as const,
      title: `Shipment ${shipment.status.replaceAll("_", " ")}`,
      description: `${shipment.order.listing.title} for ${getSellerDisplayName(
        shipment.order.seller as UserWithSellerProfile
      )} is now ${shipment.status.replaceAll("_", " ").toLowerCase()}.`,
      timestamp: shipment.updatedAt.toISOString(),
    })),
  ];

  return events
    .sort(
      (left, right) =>
        new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime()
    )
    .slice(0, limit);
}

export async function getAdminDisputeQueue(): Promise<{
  flaggedOrders: AdminDisputeRow[];
  activeHolds: AdminHoldRow[];
}> {
  const [orders, holds] = await Promise.all([
    prisma.order.findMany({
      where: {
        OR: [
          {
            status: {
              in: [OrderStatus.CANCELLED, OrderStatus.REFUNDED],
            },
          },
          {
            shipment: {
              is: {
                status: {
                  in: [ShipmentStatus.DELAYED, ShipmentStatus.RETURNED],
                },
              },
            },
          },
        ],
      },
      include: {
        listing: {
          select: {
            title: true,
          },
        },
        seller: {
          include: {
            sellerProfile: true,
          },
        },
        buyer: true,
        shipment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.listingHold.findMany({
      where: {
        status: HoldStatus.ACTIVE,
      },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            seller: {
              include: {
                sellerProfile: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const flaggedOrders = orders.map((order) => {
    let issue = "Needs review";

    if (order.status === OrderStatus.CANCELLED) {
      issue = "Cancelled order";
    } else if (order.status === OrderStatus.REFUNDED) {
      issue = "Refunded order";
    } else if (order.shipment?.status === ShipmentStatus.DELAYED) {
      issue = "Delayed shipment";
    } else if (order.shipment?.status === ShipmentStatus.RETURNED) {
      issue = "Returned shipment";
    }

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      issue,
      listingTitle: order.listing.title,
      sellerName: getSellerDisplayName(order.seller as UserWithSellerProfile),
      buyerName: getBuyerDisplayName(order.buyer),
      orderStatus: order.status,
      shipmentStatus: order.shipment?.status ?? null,
      salePrice: decimalToNumber(order.salePrice),
      createdAt: order.createdAt.toISOString(),
    };
  });

  const activeHolds = holds.map((hold) => ({
    id: hold.id,
    listingId: hold.listing.id,
    listingTitle: hold.listing.title,
    sellerName: getSellerDisplayName(hold.listing.seller as UserWithSellerProfile),
    buyerName: hold.buyerName,
    buyerEmail: hold.buyerEmail,
    expiresAt: hold.expiresAt?.toISOString() ?? null,
    createdAt: hold.createdAt.toISOString(),
  }));

  return {
    flaggedOrders,
    activeHolds,
  };
}

export async function getAdminSupabaseCounts() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return {
      scanCount: null,
      waitlistCount: null,
    };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const [{ count: scanCount }, { count: waitlistCount }] = await Promise.all([
    supabase.from("scans").select("*", { count: "exact", head: true }),
    supabase.from("waitlist").select("*", { count: "exact", head: true }),
  ]);

  return {
    scanCount: scanCount ?? 0,
    waitlistCount: waitlistCount ?? 0,
  };
}
