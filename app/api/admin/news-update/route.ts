import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeScheduledFor(value?: string | null) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date;
}

function normalizeTags(value: unknown) {
  if (Array.isArray(value)) {
    return value.map(String).map((tag) => tag.trim()).filter(Boolean).slice(0, 12);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 12);
  }

  return [];
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let payload: Record<string, unknown> = {};

    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else {
      const formData = await req.formData();
      payload = Object.fromEntries(formData.entries());
    }

    const id = Number(payload.id);

    if (!id) {
      return NextResponse.json({ error: "Missing article id" }, { status: 400 });
    }

    const updated = await prisma.newsArticle.update({
      where: { id },
      data: {
        title: String(payload.title || "").trim(),
        slug: String(payload.slug || "").trim(),
        excerpt: String(payload.excerpt || "").trim() || null,
        sector: String(payload.sector || "").trim() || null,
        category: String(payload.category || "").trim(),
        contentType: String(payload.contentType || "").trim() || null,
        coverImage: String(payload.coverImage || "").trim() || null,
        sourceName: String(payload.sourceName || "").trim() || "SneakPrice Editorial",
        sourceUrl: String(payload.sourceUrl || "").trim() || null,
        body: String(payload.body || "").trim(),
        marketAngle: String(payload.marketAngle || "").trim() || null,
        flipScore:
          payload.flipScore !== undefined &&
          payload.flipScore !== null &&
          String(payload.flipScore).trim() !== ""
            ? Number(payload.flipScore)
            : null,
        actionLabel: String(payload.actionLabel || "").trim() || null,
        actionNote: String(payload.actionNote || "").trim() || null,
        tags: normalizeTags(payload.tags),
        region: String(payload.region || "").trim() || null,
        brandFocus: String(payload.brandFocus || "").trim() || null,
        scheduledFor: normalizeScheduledFor(
          payload.scheduledFor ? String(payload.scheduledFor) : null
        ),
      },
    });

    return NextResponse.redirect(
      new URL(`/admin/news-schedule/${updated.id}?saved=1`, req.url)
    );
  } catch (error) {
    console.error("news-update error:", error);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}