import { prisma } from "@/lib/prisma";

async function main() {
  const total = await prisma.deal.count();
  const active = await prisma.deal.count({ where: { isActive: true } });
  const inactive = total - active;

  const oldest = await prisma.deal.findFirst({
    orderBy: { created_at: "asc" },
    select: { id: true, sneaker: true, created_at: true, buyPrice: true, sellPrice: true, scoredBy: true },
  });
  const newest = await prisma.deal.findFirst({
    orderBy: { created_at: "desc" },
    select: { id: true, sneaker: true, created_at: true, buyPrice: true, sellPrice: true, scoredBy: true },
  });

  const byDay = await prisma.$queryRaw<
    { day: string; count: bigint }[]
  >`
    SELECT to_char(created_at, 'YYYY-MM-DD') AS day, COUNT(*)::bigint AS count
    FROM "Deal"
    GROUP BY 1
    ORDER BY 1 DESC
    LIMIT 30;
  `;

  const byScorer = await prisma.$queryRaw<
    { scoredBy: string | null; count: bigint }[]
  >`
    SELECT "scoredBy", COUNT(*)::bigint AS count
    FROM "Deal"
    GROUP BY 1
    ORDER BY 2 DESC;
  `;

  const suspicious = await prisma.$queryRaw<
    { n_no_buy_url: bigint; n_zero_buy_price: bigint; n_sell_le_buy: bigint; n_neg_profit: bigint }[]
  >`
    SELECT
      SUM(CASE WHEN "buyUrl" IS NULL OR "buyUrl" = '' THEN 1 ELSE 0 END)::bigint AS n_no_buy_url,
      SUM(CASE WHEN "buyPrice" IS NULL OR "buyPrice" <= 0 THEN 1 ELSE 0 END)::bigint AS n_zero_buy_price,
      SUM(CASE WHEN "sellPrice" IS NOT NULL AND "buyPrice" IS NOT NULL AND "sellPrice" <= "buyPrice" THEN 1 ELSE 0 END)::bigint AS n_sell_le_buy,
      SUM(CASE WHEN "netProfit" IS NOT NULL AND "netProfit" < 0 THEN 1 ELSE 0 END)::bigint AS n_neg_profit
    FROM "Deal";
  `;

  const newestActive = await prisma.deal.findMany({
    where: { isActive: true },
    orderBy: { created_at: "desc" },
    take: 5,
    select: {
      id: true,
      sneaker: true,
      created_at: true,
      buyPrice: true,
      sellPrice: true,
      netProfit: true,
      profitMargin: true,
      buyUrl: true,
      scoredBy: true,
    },
  });

  console.log("=== DEAL TABLE AUDIT ===\n");
  console.log(`Total rows: ${total}`);
  console.log(`  active:   ${active}`);
  console.log(`  inactive: ${inactive}\n`);

  console.log("Oldest row:", oldest);
  console.log("Newest row:", newest, "\n");

  console.log("By day (last 30):");
  for (const r of byDay) console.log(`  ${r.day}  ${r.count}`);
  console.log();

  console.log("By scoredBy:");
  for (const r of byScorer) console.log(`  ${r.scoredBy ?? "(null)"}  ${r.count}`);
  console.log();

  const zero = BigInt(0);
  const s = suspicious[0] ?? { n_no_buy_url: zero, n_zero_buy_price: zero, n_sell_le_buy: zero, n_neg_profit: zero };
  console.log("Suspicious rows:");
  console.log(`  no buyUrl:           ${s.n_no_buy_url}`);
  console.log(`  zero/null buyPrice:  ${s.n_zero_buy_price}`);
  console.log(`  sellPrice <= buy:    ${s.n_sell_le_buy}`);
  console.log(`  negative netProfit:  ${s.n_neg_profit}\n`);

  console.log("Newest 5 active deals:");
  for (const d of newestActive) console.log(" ", d);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
