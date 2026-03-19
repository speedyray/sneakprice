import { headers } from "next/headers";

export const SESSION_COOKIE_NAME = "SneakPriceUser";

export type SignedInUser = {
  name: string;
  email: string;
};

export async function getSignedInUser() {
  const headerList = await headers();
  if (!headerList) {
    return null;
  }
  const cookieHeader = headerList.get("cookie");
  if (!cookieHeader) {
    return null;
  }
  const value = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE_NAME}=`));
  if (!value) {
    return null;
  }
  try {
    const parsed = JSON.parse(
      decodeURIComponent(value.split("=")[1] ?? "")
    ) as Partial<SignedInUser>;
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
