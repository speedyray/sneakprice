import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const url = new URL(req.url);
    const secretFromQuery = url.searchParams.get("secret");
    const cronSecret = process.env.CRON_SECRET;

    const isAuthorized =
      !!cronSecret &&
      (
        authHeader === `Bearer ${cronSecret}` ||
        secretFromQuery === cronSecret
      );

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();

    const articlesToPublish = await prisma.newsArticle.findMany({
      where: {
        isPublished: false,
        scheduledFor: {
          not: null,
          lte: now,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });

    if (articlesToPublish.length === 0) {
      return NextResponse.json({
        success: true,
        publishedCount: 0,
        message: "No scheduled articles ready to publish.",
      });
    }

    const ids = articlesToPublish.map((article) => article.id);

    await prisma.newsArticle.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        isPublished: true,
        publishedAt: now,
      },
    });

    return NextResponse.json({
      success: true,
      publishedCount: articlesToPublish.length,
      published: articlesToPublish,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to publish scheduled articles.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}