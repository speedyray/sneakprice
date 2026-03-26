const LOCAL_MODEL_FALLBACKS: Array<{ match: string[]; path: string }> = [
  {
    match: ["samba og", "samba"],
    path: "/marketplace/adidas-samba-og-white.png",
  },
  {
    match: ["jordan flight court"],
    path: "/marketplace/jordan-flight-court-white.png",
  },
  {
    match: ["handball spezial"],
    path: "/marketplace/adidas-handball-spezial-white.png",
  },
  {
    match: ["campus 00s"],
    path: "/marketplace/adidas-campus-00s-white.png",
  },
];

const LOCAL_BRAND_FALLBACKS: Array<{ match: string[]; path: string }> = [
  {
    match: ["yeezy", "adidas", "samba"],
    path: "/marketplace/adidas-campus-00s-white.png",
  },
  {
    match: ["nike"],
    path: "/marketplace/nike-generic-white.png",
  },
];

function pickLocalFallback(alt: string) {
  const lowerAlt = alt.toLowerCase();

  const modelMatch = LOCAL_MODEL_FALLBACKS.find(({ match }) =>
    match.some((entry) => lowerAlt.includes(entry))
  );

  if (modelMatch) {
    return modelMatch.path;
  }

  const brandMatch = LOCAL_BRAND_FALLBACKS.find(({ match }) =>
    match.some((entry) => lowerAlt.includes(entry))
  );

  return brandMatch?.path ?? null;
}

function pickRemoteFallback(alt: string) {
  const lowerAlt = alt.toLowerCase();

  if (lowerAlt.includes("adidas") || lowerAlt.includes("yeezy") || lowerAlt.includes("samba")) {
    return "https://commons.wikimedia.org/wiki/Special:FilePath/Adidas%20Campus%2000s.jpg";
  }

  if (lowerAlt.includes("jordan") || lowerAlt.includes("air jordan")) {
    return "https://commons.wikimedia.org/wiki/Special:FilePath/1985%20Air%20Jordan%201s.jpg";
  }

  return "https://commons.wikimedia.org/wiki/Special:FilePath/Nike%20Air%20Ship.jpg";
}

export function getMarketplaceImageCandidates(src: string | null, alt: string) {
  const candidates = [src, pickLocalFallback(alt), pickRemoteFallback(alt)].filter(
    (value): value is string => Boolean(value)
  );

  return [...new Set(candidates)];
}
