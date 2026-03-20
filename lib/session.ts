import { currentUser } from "@clerk/nextjs/server";

export const SESSION_COOKIE_NAME = "SneakPriceUser";

export type SignedInUser = {
  name: string;
  email: string;
};

export async function getSignedInUser() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const email = user.emailAddresses[0]?.emailAddress;
  const fallbackName = email?.split("@")[0] ?? null;
  const name = user.fullName ?? user.username ?? fallbackName;

  if (!name || !email) {
    return null;
  }

  return { name, email };
}
