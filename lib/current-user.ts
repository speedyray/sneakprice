import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { normalizeTier } from "@/lib/subscription";

type ClerkUser = Awaited<ReturnType<typeof currentUser>>;

function getAdminEmailAllowlist() {
  return [
    process.env.ADMIN_EMAIL,
    ...(process.env.ADMIN_EMAILS?.split(",") ?? []),
  ]
    .map((value) => value?.trim().toLowerCase())
    .filter((value): value is string => Boolean(value));
}

function isAdminEmail(email: string) {
  return getAdminEmailAllowlist().includes(email.trim().toLowerCase());
}

function normalizeRoleValue(value: unknown) {
  if (typeof value === "string") {
    return value.trim().toUpperCase();
  }

  return null;
}

function hasAdminFlag(user: ClerkUser) {
  if (!user) return false;

  const metadataSources = [
    user.publicMetadata,
    user.privateMetadata,
    user.unsafeMetadata,
  ];

  for (const metadata of metadataSources) {
    if (!metadata || typeof metadata !== "object") continue;

    const role =
      normalizeRoleValue((metadata as Record<string, unknown>).role) ??
      normalizeRoleValue((metadata as Record<string, unknown>).userRole);

    if (role === "ADMIN") {
      return true;
    }

    const roles = (metadata as Record<string, unknown>).roles;

    if (Array.isArray(roles) && roles.some((value) => normalizeRoleValue(value) === "ADMIN")) {
      return true;
    }

    if ((metadata as Record<string, unknown>).isAdmin === true) {
      return true;
    }
  }

  return false;
}

async function shouldGrantAdminRole({
  email,
  clerkUser,
  currentUserId,
}: {
  email: string | null;
  clerkUser: ClerkUser;
  currentUserId?: string;
}) {
  if (email && isAdminEmail(email)) {
    return true;
  }

  if (hasAdminFlag(clerkUser)) {
    return true;
  }

  const hasConfiguredAdmins = getAdminEmailAllowlist().length > 0;

  if (process.env.NODE_ENV === "production" || hasConfiguredAdmins) {
    return false;
  }

  const existingAdmin = await prisma.user.findFirst({
    where: {
      role: "ADMIN",
      ...(currentUserId ? { id: { not: currentUserId } } : {}),
    },
    select: {
      id: true,
    },
  });

  // In local development, bootstrap the first signed-in account as admin so
  // the admin toolchain is usable without extra env setup.
  return !existingAdmin;
}

function getPrimaryEmailAddress(user: ClerkUser) {
  if (!user) return null;

  return (
    user.emailAddresses.find(
      (emailAddress) => emailAddress.id === user.primaryEmailAddressId
    )?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    null
  );
}

function getDisplayName(user: ClerkUser, email: string) {
  if (!user) return email.split("@")[0] ?? "SneakPrice Seller";

  return (
    user.fullName?.trim() ||
    user.username ||
    user.firstName ||
    email.split("@")[0] ||
    "SneakPrice Seller"
  );
}

export async function getCurrentDbUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const clerkUser = await currentUser();
  const email = getPrimaryEmailAddress(clerkUser);

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    include: {
      sellerProfile: true,
      buyerProfile: true,
    },
  });

  if (existingUser) {
    const shouldBeAdmin =
      existingUser.role === "ADMIN" ||
      (await shouldGrantAdminRole({
        email,
        clerkUser,
        currentUserId: existingUser.id,
      }));

    const clerkTier = normalizeTier(
      (clerkUser?.publicMetadata as Record<string, unknown> | undefined)
        ?.subscriptionTier
    );

    const adminMismatch = shouldBeAdmin && existingUser.role !== "ADMIN";
    const tierMismatch =
      clerkTier !== null && existingUser.subscriptionTier !== clerkTier;

    if (adminMismatch || tierMismatch) {
      return prisma.user.update({
        where: { id: existingUser.id },
        data: {
          ...(adminMismatch ? { role: "ADMIN" as const } : {}),
          ...(tierMismatch ? { subscriptionTier: clerkTier! } : {}),
        },
        include: {
          sellerProfile: true,
          buyerProfile: true,
        },
      });
    }

    return existingUser;
  }

  if (!email) {
    return null;
  }

  const displayName = getDisplayName(clerkUser, email);

  const existingUserByEmail = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      sellerProfile: true,
      buyerProfile: true,
    },
  });

  if (existingUserByEmail) {
    const shouldBeAdmin =
      existingUserByEmail.role === "ADMIN" ||
      (await shouldGrantAdminRole({
        email,
        clerkUser,
        currentUserId: existingUserByEmail.id,
      }));

    const clerkTier = normalizeTier(
      (clerkUser?.publicMetadata as Record<string, unknown> | undefined)
        ?.subscriptionTier
    );

    return prisma.user.update({
      where: {
        id: existingUserByEmail.id,
      },
      data: {
        clerkUserId: userId,
        firstName: clerkUser?.firstName ?? existingUserByEmail.firstName,
        lastName: clerkUser?.lastName ?? existingUserByEmail.lastName,
        imageUrl: clerkUser?.imageUrl ?? existingUserByEmail.imageUrl,
        isSeller: true,
        isBuyer: true,
        role: shouldBeAdmin ? "ADMIN" : "SELLER",
        ...(clerkTier ? { subscriptionTier: clerkTier } : {}),
        sellerProfile: existingUserByEmail.sellerProfile
          ? undefined
          : {
              create: {
                displayName,
              },
            },
      },
      include: {
        sellerProfile: true,
        buyerProfile: true,
      },
    });
  }

  return prisma.user.create({
    data: {
      clerkUserId: userId,
      email,
      firstName: clerkUser?.firstName ?? null,
      lastName: clerkUser?.lastName ?? null,
      imageUrl: clerkUser?.imageUrl ?? null,
      role: (await shouldGrantAdminRole({ email, clerkUser })) ? "ADMIN" : "SELLER",
      isSeller: true,
      isBuyer: true,
      sellerProfile: {
        create: {
          displayName,
        },
      },
    },
    include: {
      sellerProfile: true,
      buyerProfile: true,
    },
  });
}

export async function getCurrentAdminUser() {
  const currentUser = await getCurrentDbUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return null;
  }

  return currentUser;
}
