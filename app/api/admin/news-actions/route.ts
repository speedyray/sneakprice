import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let idValue: string | null = null;
    let action: string | null = null;

    if (contentType.includes("application/json")) {
      const body = await req.json();
      idValue = body?.id?.toString() ?? null;
      action = body?.action?.toString() ?? null;
    } else {
      const formData = await req.formData();
      idValue = formData.get("id")?.toString() ?? null;
      action = formData.get("action")?.toString() ?? null;
    }

    const id = Number(idValue);

    if (!id || !action) {
      return NextResponse.json(
        { error: "Missing id or action" },
        { status: 400 }
      );
    }

    if (action === "publish") {
      await prisma.newsArticle.update({
        where: { id },
        data: {
          isPublished: true,
          publishedAt: new Date(),
          scheduledFor: null,
        },
      });
    } else if (action === "unschedule") {
      await prisma.newsArticle.update({
        where: { id },
        data: {
          scheduledFor: null,
        },
      });
    } else if (action === "delete") {
      await prisma.newsArticle.delete({
        where: { id },
      });
    } else {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }

    return NextResponse.redirect(new URL("/admin/news-schedule", req.url));
  } catch (error) {
    console.error("news-actions error:", error);

    return NextResponse.json(
      { error: "Action failed" },
      { status: 500 }
    );
  }
}