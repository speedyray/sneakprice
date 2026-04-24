// Build a Flight Club URL from a free-form sneaker name.
//
// Flight Club's legacy search endpoint `/catalogsearch/result/?q=...` returns a
// 200 but silently ignores the query (renders "RESULTS FOR 'ALL'"). Their real
// discovery surface is brand/model slug pages like /nike/air-force-1 and
// /air-jordans/air-jordan-1. We match the scanned sneaker name against a
// curated slug map; unknown models fall back to a brand root, then homepage.
//
// Slugs in MODEL_SLUGS are verified against Flight Club's site via search
// (site:flightclub.com). When adding entries, verify the URL before shipping.

const FC_BASE = "https://www.flightclub.com";

// Model-level slugs. Ordered longest/most-specific first so a "nike air force 1 mid"
// name matches the Mid page before the generic Air Force 1 page.
const MODEL_SLUGS: Array<[prefix: string, slug: string]> = [
  // Nike Air Force 1 — variants before base
  ["nike air force 1 mid", "/nike/nike-air-force/nike-force-1-mid"],
  ["nike air force 1 high", "/nike/nike-air-force/air-force-1-high"],
  ["nike air force 1 low", "/nike/nike-air-force/air-force-1-low"],
  ["air force 1 mid", "/nike/nike-air-force/nike-force-1-mid"],
  ["air force 1 high", "/nike/nike-air-force/air-force-1-high"],
  ["air force 1 low", "/nike/nike-air-force/air-force-1-low"],
  ["nike air force 1", "/nike/air-force-1"],
  ["air force 1", "/nike/air-force-1"],

  // Nike Dunks — SB variant before base
  ["nike sb dunk", "/nike/dunk-sb"],
  ["nike dunk sb", "/nike/dunk-sb"],
  ["nike dunk", "/nike/nike-dunks"],

  // Air Jordan — double-digit models before single-digit so "jordan 1" doesn't
  // eat "jordan 11". Matcher below rejects digit-followed-by-digit anyway, but
  // ordering is belt-and-suspenders.
  ["air jordan 11", "/air-jordans/air-jordan-11"],
  ["jordan 11", "/air-jordans/air-jordan-11"],
  ["air jordan 6", "/air-jordans/air-jordan-6"],
  ["jordan 6", "/air-jordans/air-jordan-6"],
  ["air jordan 5", "/air-jordans/air-jordan-5"],
  ["jordan 5", "/air-jordans/air-jordan-5"],
  ["air jordan 4", "/air-jordans/air-jordan-4"],
  ["jordan 4", "/air-jordans/air-jordan-4"],
  ["air jordan 3", "/air-jordans/air-jordan-3"],
  ["jordan 3", "/air-jordans/air-jordan-3"],
  ["air jordan 1", "/air-jordans/air-jordan-1"],
  ["jordan 1", "/air-jordans/air-jordan-1"],

  // Adidas
  ["adidas samba", "/adidas/samba"],

  // Yeezy — route all variants to the Yeezy section, including Adidas-era.
  ["adidas yeezy", "/yeezy"],
  ["yeezy", "/yeezy"],
];

// Brand roots — fallback when no model slug matched.
const BRAND_ROOTS: Array<[prefix: string, slug: string]> = [
  ["air jordan", "/air-jordans"],
  ["jordan", "/air-jordans"],
  ["yeezy", "/yeezy"],
  ["nike", "/nike"],
  ["adidas", "/adidas"],
  ["new balance", "/new-balance"],
  ["converse", "/converse"],
  ["asics", "/asics"],
  ["vans", "/vans"],
  ["puma", "/puma"],
  ["reebok", "/reebok"],
  ["hoka", "/hoka-one-one"],
];

function startsWithWholeWord(name: string, prefix: string): boolean {
  if (!name.startsWith(prefix)) return false;
  const next = name.charAt(prefix.length);
  // End of string, or a non-alphanumeric (space, hyphen, etc.). Rejects
  // "jordan 1" matching "jordan 14".
  return next === "" || !/[a-z0-9]/i.test(next);
}

export function flightClubUrl(sneakerName: string): string {
  if (!sneakerName) return FC_BASE;

  const name = sneakerName.toLowerCase().trim();

  for (const [prefix, slug] of MODEL_SLUGS) {
    if (startsWithWholeWord(name, prefix)) return `${FC_BASE}${slug}`;
  }

  for (const [prefix, slug] of BRAND_ROOTS) {
    if (startsWithWholeWord(name, prefix)) return `${FC_BASE}${slug}`;
  }

  return FC_BASE;
}
