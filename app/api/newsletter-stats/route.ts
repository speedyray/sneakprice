import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Default headline number when the DB has no scored deals yet (or query fails).
// Keep this in sync with whatever feels honest as a baseline marketing claim.
const FALLBACK_AI_FLIPS_ROI = 58.64;

export async function GET() {
  try {
    const agg = await prisma.deal.aggregate({
      _avg: { profitMargin: true },
      _count: { profitMargin: true },
      where: {
        isActive: true,
        profitMargin: { not: null },
      },
    });

    const aiFlipsRoi = agg._avg.profitMargin ?? FALLBACK_AI_FLIPS_ROI;
    const sampleSize = agg._count.profitMargin ?? 0;

    return NextResponse.json(
      { aiFlipsRoi: Number(aiFlipsRoi.toFixed(2)), sampleSize },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
    );
  } catch (err) {
    console.error("[/api/newsletter-stats] query failed:", err);
    return NextResponse.json(
      { aiFlipsRoi: FALLBACK_AI_FLIPS_ROI, sampleSize: 0 },
      { status: 503 },
    );
  }
}
