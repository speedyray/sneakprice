import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

function getPrimaryEmailAddress(
  user: Awaited<ReturnType<typeof currentUser>>
) {
  if (!user) return null;

  return (
    user.emailAddresses.find(
      (emailAddress) => emailAddress.id === user.primaryEmailAddressId
    )?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    null
  );
}

function getDisplayName(user: Awaited<ReturnType<typeof currentUser>>, email: string) {
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
    return existingUser;
  }

  const clerkUser = await currentUser();
  const email = getPrimaryEmailAddress(clerkUser);

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
        role: existingUserByEmail.role === "ADMIN" ? "ADMIN" : "SELLER",
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
      role: "SELLER",
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
