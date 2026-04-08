import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [sneakersAnalyzed, resaleAgg, userCount] = await Promise.all([
      prisma.scan.count(),
      prisma.deal.aggregate({ _sum: { sellPrice: true } }),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      sneakersAnalyzed,
      resaleValue: resaleAgg._sum.sellPrice ?? 0,
      userCount,
    });
  } catch (err) {
    console.error("[/api/stats] query failed:", err);
    return NextResponse.json({ sneakersAnalyzed: 0, resaleValue: 0, userCount: 0 }, { status: 503 });
  }
}
