// Build a Flight Club URL from a free-form sneaker name.
//
// Flight Club's legacy search endpoint `/catalogsearch/result/?q=...` returns a
// 200 but silently ignores the query (renders "RESULTS FOR 'ALL'"). Their real
// discovery surface is slug-based, and the brand routing follows two patterns:
//
//   Flagship brands at `/<brand>`:        /nike, /adidas, /new-balance, /air-jordans
//   Non-flagship brands at `/sneakers/<brand>`: /sneakers/asics, /sneakers/vans,
//                                                /sneakers/converse, /sneakers/puma,
//                                                /sneakers/reebok, /sneakers/balenciaga
//
// Model pages live under their brand root, e.g. /nike/air-force-1,
// /air-jordans/air-jordan-1, /sneakers/asics/gel-lyte-3.
//
// We match the scanned sneaker name against a curated slug map; unknown models
// fall back to a brand root, then homepage. The matcher is a whole-word
// *contains* match so collab prefixes like "Travis Scott Jordan 1 Low" still
// resolve to the Jordan 1 page.
//
// Slugs are verified against Flight Club via `site:flightclub.com` Google
// search (FC blocks direct curl/fetch with 403). Brands not present in their
// catalog (e.g. HOKA, On) are intentionally omitted — the function falls
// through to the FC homepage rather than a guessed 404.

const FC_BASE = "https://www.flightclub.com";

// Model-level slugs. Ordered longest/most-specific first so a "nike air force 1 mid"
// name matches the Mid page before the generic Air Force 1 page.
const MODEL_SLUGS: Array<[phrase: string, slug: string]> = [
  // Nike Air Force 1 — variants before base
  ["nike air force 1 mid", "/nike/nike-air-force/nike-force-1-mid"],
  ["nike air force 1 high", "/nike/nike-air-force/air-force-1-high"],
  ["nike air force 1 low", "/nike/nike-air-force/air-force-1-low"],
  ["air force 1 mid", "/nike/nike-air-force/nike-force-1-mid"],
  ["air force 1 high", "/nike/nike-air-force/air-force-1-high"],
  ["air force 1 low", "/nike/nike-air-force/air-force-1-low"],
  ["nike air force 1", "/nike/air-force-1"],
  ["air force 1", "/nike/air-force-1"],

  // Nike Dunks — SB variant before base; include "dunk low/high" alone to catch
  // collabs that drop the "nike" prefix (e.g. "Off-White Dunk Low").
  ["nike sb dunk", "/nike/dunk-sb"],
  ["nike dunk sb", "/nike/dunk-sb"],
  ["dunk sb", "/nike/dunk-sb"],
  ["nike dunk", "/nike/nike-dunks"],
  ["dunk low", "/nike/nike-dunks"],
  ["dunk high", "/nike/nike-dunks"],

  // Air Jordan — double-digit models first. The whole-word matcher rejects
  // digit-followed-by-digit anyway, but ordering is belt-and-suspenders.
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

  // Yeezy — route Adidas-era and Nike-era Yeezys to the Yeezy section.
  ["adidas yeezy", "/yeezy"],
  ["yeezy", "/yeezy"],
];

// Brand roots — fallback when no model slug matched.
const BRAND_ROOTS: Array<[phrase: string, slug: string]> = [
  ["air jordan", "/air-jordans"],
  ["jordan", "/air-jordans"],
  ["travis scott", "/collections/travis-scott"],
  // Flagship brands: /<brand>
  ["nike", "/nike"],
  ["adidas", "/adidas"],
  ["new balance", "/new-balance"],
  // Non-flagship brands: /sneakers/<brand>
  ["balenciaga", "/sneakers/balenciaga"],
  ["salomon", "/sneakers/salomon"],
  ["asics", "/sneakers/asics"],
  ["converse", "/sneakers/converse"],
  ["vans", "/sneakers/vans"],
  ["puma", "/sneakers/puma"],
  ["reebok", "/sneakers/reebok"],
  // HOKA, On, and other running brands aren't carried by Flight Club —
  // intentionally omitted so the function falls through to the homepage.
];

function compile(entries: Array<[string, string]>): Array<[RegExp, string]> {
  return entries.map(([phrase, slug]) => {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return [new RegExp(`\\b${escaped}\\b`, "i"), slug];
  });
}

const MODEL_REGEX = compile(MODEL_SLUGS);
const BRAND_REGEX = compile(BRAND_ROOTS);

export function flightClubUrl(sneakerName: string): string {
  if (!sneakerName) return FC_BASE;

  const name = sneakerName.toLowerCase().trim();

  for (const [re, slug] of MODEL_REGEX) {
    if (re.test(name)) return `${FC_BASE}${slug}`;
  }

  for (const [re, slug] of BRAND_REGEX) {
    if (re.test(name)) return `${FC_BASE}${slug}`;
  }

  return FC_BASE;
}
