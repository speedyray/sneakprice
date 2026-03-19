import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "SneakPriceUser";

export type SignedInUser = {
  name: string;
  email: string;
};

export async function getSignedInUser() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!cookieValue) {
    return null;
  }
  try {
    const parsed = JSON.parse(decodeURIComponent(cookieValue)) as Partial<SignedInUser>;
    if (
      typeof parsed.name === "string" &&
      parsed.name.length > 0 &&
      typeof parsed.email === "string" &&
      parsed.email.length > 0
    ) {
      return { name: parsed.name, email: parsed.email };
    }
  } catch (error) {
    console.error("Unable to parse session cookie", error);
  }
  return null;
}
