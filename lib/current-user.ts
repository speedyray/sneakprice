import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getCurrentDbUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    include: {
      sellerProfile: true,
      buyerProfile: true,
    },
  });

  return user;
}