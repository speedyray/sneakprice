export function normalizeDatabaseUrl(rawUrl: string) {
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
