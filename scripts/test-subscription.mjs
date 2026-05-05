// Standalone smoke for lib/subscription.ts pure helpers.
// Run: node scripts/test-subscription.mjs
//
// Note: this file inlines the helper logic on purpose — lib/subscription.ts
// is `server-only` and imports getCurrentDbUser, which can't run outside Next.
// If the helpers in lib/subscription.ts change, mirror them here.

const PAID_TIERS = ["PRO", "PREMIUM", "POWER_SELLER"];

function isPaid(tier) {
  return tier ? PAID_TIERS.includes(tier) : false;
}

function normalizeTier(value) {
  if (typeof value !== "string") return null;
  const upper = value.trim().toUpperCase();
  if (upper === "FREE") return "FREE";
  if (PAID_TIERS.includes(upper)) return upper;
  return null;
}

const cases = [
  // [label, fn, args, expected]
  ["isPaid('FREE') -> false", isPaid, ["FREE"], false],
  ["isPaid('PRO') -> true", isPaid, ["PRO"], true],
  ["isPaid('PREMIUM') -> true", isPaid, ["PREMIUM"], true],
  ["isPaid('POWER_SELLER') -> true", isPaid, ["POWER_SELLER"], true],
  ["isPaid(null) -> false", isPaid, [null], false],
  ["isPaid(undefined) -> false", isPaid, [undefined], false],
  ["isPaid('GOLD') -> false", isPaid, ["GOLD"], false],

  ["normalizeTier('pro') -> 'PRO'", normalizeTier, ["pro"], "PRO"],
  ["normalizeTier(' Free ') -> 'FREE'", normalizeTier, [" Free "], "FREE"],
  ["normalizeTier('GOLD') -> null", normalizeTier, ["GOLD"], null],
  ["normalizeTier(42) -> null", normalizeTier, [42], null],
  ["normalizeTier(undefined) -> null", normalizeTier, [undefined], null],
  ["normalizeTier('POWER_SELLER') -> 'POWER_SELLER'", normalizeTier, ["POWER_SELLER"], "POWER_SELLER"],
];

let failed = 0;
for (const [label, fn, args, expected] of cases) {
  const got = fn(...args);
  const ok = got === expected;
  console.log(`${ok ? "PASS" : "FAIL"} — ${label} (got ${JSON.stringify(got)})`);
  if (!ok) failed++;
}

if (failed > 0) {
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
}
console.log("\nAll subscription helper checks passed.");
