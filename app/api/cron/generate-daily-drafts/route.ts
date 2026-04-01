import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type IdeaSuggestion = {
  topic: string;
  sector: string;
  category: string;
  contentType: string;
  angle: string;
  targetKeyword: string;
  flipScoreHint: string;
  actionLabelHint: string;
  tags: string[];
};

type CreatedArticleSummary = {
  title: string;
  slug: string;
  scheduledFor: Date | null;
};

type SkippedArticleSummary = {
  title: string;
  reason: string;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function titleCase(input: string) {
  return input
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function clampScore(score: number) {
  if (Number.isNaN(score)) return 75;
  return Math.max(50, Math.min(95, score));
}

function normalizeTags(tags?: string[]) {
  if (!Array.isArray(tags)) return [];
  return tags.map((tag) => tag.trim()).filter(Boolean).slice(0, 12);
}

function getDefaultFlipScore(category: string, sector: string) {
  if (category === "Market") return 86;
  if (category === "Flip Watch") return 84;
  if (category === "Buyer Guide") return 76;
  if (sector === "Sneakers") return 80;
  if (sector === "Watches") return 78;
  if (sector === "Fashion") return 77;
  return 75;
}

function getDefaultActionLabel(category: string) {
  if (category === "Market") return "Strong Buy";
  if (category === "Flip Watch") return "Watchlist";
  if (category === "Buyer Guide") return "Research";
  if (category === "Report") return "Monitor";
  return "Selective Buy";
}

function buildExcerpt({
  sector,
  category,
  targetKeyword,
}: {
  sector: string;
  category: string;
  targetKeyword: string;
}) {
  return `This week’s ${sector.toLowerCase()} ${category.toLowerCase()} conversation is being shaped by ${targetKeyword}, with clear signals around demand, wearability, pricing discipline, and market momentum.`;
}

function buildMarketAngle({
  title,
  sector,
  category,
  targetKeyword,
  customAngle,
}: {
  title: string;
  sector: string;
  category: string;
  targetKeyword: string;
  customAngle?: string;
}) {
  if (customAngle?.trim()) return customAngle.trim();

  return `${title} reflects a broader shift across ${sector.toLowerCase()} where recognizable products, stronger styling relevance, and more disciplined buying behavior are outperforming noise. For SneakPrice users, the opportunity is in identifying where ${category.toLowerCase()} momentum, cultural relevance, and pricing efficiency intersect.`;
}

function buildActionNote({
  sector,
  category,
}: {
  sector: string;
  category: string;
}) {
  if (category === "Market") {
    return "Focus on recognizable products with low downside, healthy demand, and strong risk-to-reward.";
  }

  if (category === "Flip Watch") {
    return "Track fast-moving items with pricing inefficiencies, repeated buyer demand, and clean entry points.";
  }

  if (category === "Buyer Guide") {
    return "Prioritize products with broad appeal, reliable demand, and lower long-term trend fatigue.";
  }

  if (sector === "Fashion") {
    return "Prioritize silhouettes and products with strong styling appeal, clean color direction, and broad outfit compatibility.";
  }

  if (sector === "Watches" || sector === "Jewelry") {
    return "Focus on liquid models, recognizable references, and products with strong secondary market confidence.";
  }

  if (sector === "Beauty") {
    return "Watch products and brands with strong cultural momentum, repeat demand, and broad consumer recognition.";
  }

  return "Focus on recognizable products with strong styling logic, stable demand, and clear market positioning.";
}

function buildBody({
  title,
  sector,
  category,
  contentType,
  targetKeyword,
  region,
  brandFocus,
}: {
  title: string;
  sector: string;
  category: string;
  contentType: string;
  targetKeyword: string;
  region: string;
  brandFocus?: string;
}) {
  const brandLine = brandFocus?.trim()
    ? ` ${brandFocus.trim()} is a particularly relevant name inside this conversation right now.`
    : "";

  const formatLine =
    contentType === "guide"
      ? "This guide focuses on the clearest signals and what they mean for buyers."
      : contentType === "report"
        ? "This report focuses on what current movement says about the market right now."
        : contentType === "watchlist"
          ? "This watchlist focuses on the signals worth tracking next."
          : "This article focuses on the strongest signals and why they matter now.";

  const sectorLine =
    sector === "Sneakers"
      ? "Buyers are responding to recognizable silhouettes, cleaner styling, and stronger price discipline."
      : sector === "Fashion"
        ? "Style direction, wearability, and quieter confidence are shaping demand more than short-term hype alone."
        : sector === "Watches"
          ? "Liquidity, recognizability, and confidence in long-term demand are defining the strongest opportunities."
          : sector === "Jewelry"
            ? "Brand trust, timeless design, and perceived long-term value are shaping momentum."
            : sector === "Beauty"
              ? "Brand momentum, product familiarity, and cultural relevance are driving consumer attention."
              : "Recognition, demand clarity, and product positioning are defining the strongest opportunities.";

  return [
    `This week’s ${sector.toLowerCase()} market is being shaped by ${targetKeyword}, with stronger attention moving toward products that feel relevant, understandable, and easier to buy with confidence across ${region}.`,
    `${formatLine} Instead of relying only on headline hype, buyers are responding to products and categories that offer a more balanced mix of identity, familiarity, and pricing logic.${brandLine}`,
    `## Why this trend is gaining momentum`,
    `${title} is part of a broader movement toward discipline in both consumer taste and market behavior. ${sectorLine}`,
    `When a product category feels easier to wear, easier to understand, or easier to justify financially, it tends to perform better across a wider set of buyers. That makes it more resilient than short-term attention spikes alone.`,
    `## What it means for the ${category.toLowerCase()} landscape`,
    `For the broader ${sector.toLowerCase()} conversation, ${targetKeyword} represents a useful signal. Momentum is moving toward products that can work in both editorial conversation and real day-to-day demand.`,
    `That matters because stronger recognition and clearer use cases usually reduce volatility. The more a product depends only on hype, the more fragile pricing and interest can become over time.`,
    `## What it means for SneakPrice users`,
    `For SneakPrice users, this is a reminder to focus on opportunities where demand is understandable, not just loud. The best opportunities often come from products with strong visual familiarity, manageable entry pricing, and broader appeal.`,
    `The key signal right now is clear: ${targetKeyword} is not just a passing topic. It reflects a wider preference for products that feel refined, relevant, and easier to move with confidence.`,
  ].join("\n\n");
}

function buildDailyIdeas(): IdeaSuggestion[] {
  return [
    {
      topic: "Why Under-Retail Sneakers Are Becoming the Smartest Flip Right Now",
      sector: "Sneakers",
      category: "Market",
      contentType: "article",
      angle:
        "Across Global markets, buyers are becoming more selective and under-retail pairs are offering lower-risk entries with steadier resale demand.",
      targetKeyword: "under-retail sneaker flips",
      flipScoreHint: "88",
      actionLabelHint: "Strong Buy",
      tags: ["sneakers", "resale", "market", "under-retail"],
    },
    {
      topic: "Why Football-Inspired Sneakers and Street Luxury Are Colliding Right Now",
      sector: "Fashion",
      category: "Trend",
      contentType: "article",
      angle:
        "Sport heritage and luxury styling are converging into a stronger fashion signal, especially through slimmer silhouettes and premium materials.",
      targetKeyword: "football-inspired luxury sneakers",
      flipScoreHint: "82",
      actionLabelHint: "Buy on Dip",
      tags: ["fashion", "luxury", "streetwear", "football"],
    },
    {
      topic: "3 Sneaker Silhouettes Resellers Should Watch This Week",
      sector: "Sneakers",
      category: "Flip Watch",
      contentType: "watchlist",
      angle:
        "A small number of recognizable silhouettes are showing stronger movement because they combine wearability, price discipline, and repeat buyer familiarity.",
      targetKeyword: "sneaker silhouettes to watch",
      flipScoreHint: "84",
      actionLabelHint: "Watchlist",
      tags: ["sneakers", "flip watch", "trending", "resale"],
    },
  ];
}

function cleanGeneratedTitle(topic: string, sector: string) {
  const trimmedTopic = topic.trim();

  if (trimmedTopic.toLowerCase().startsWith("why ")) {
    return titleCase(trimmedTopic);
  }

  return titleCase(trimmedTopic);
}

async function getUniqueSlug(baseTitle: string) {
  const baseSlug = slugify(baseTitle);

  const existing = await prisma.newsArticle.findFirst({
    where: {
      slug: {
        startsWith: baseSlug,
      },
    },
    select: { slug: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!existing) {
    return baseSlug;
  }

  return `${baseSlug}-${Date.now().toString().slice(-5)}`;
}

async function buildArticleFromIdea(
  idea: IdeaSuggestion,
  scheduledFor: Date,
  region = "Global",
  brandFocus = ""
) {
  const safeTitle = cleanGeneratedTitle(idea.topic, idea.sector);
  const slug = await getUniqueSlug(safeTitle);

  return {
    title: safeTitle,
    slug,
    excerpt: buildExcerpt({
      sector: idea.sector,
      category: idea.category,
      targetKeyword: idea.targetKeyword,
    }),
    sector: idea.sector,
    category: idea.category,
    contentType: idea.contentType,
    coverImage: `/news/${slug}.jpg`,
    sourceName: "SneakPrice Editorial",
    sourceUrl: "",
    body: buildBody({
      title: safeTitle,
      sector: idea.sector,
      category: idea.category,
      contentType: idea.contentType,
      targetKeyword: idea.targetKeyword,
      region,
      brandFocus,
    }),
    marketAngle: buildMarketAngle({
      title: safeTitle,
      sector: idea.sector,
      category: idea.category,
      targetKeyword: idea.targetKeyword,
      customAngle: idea.angle,
    }),
    flipScore: clampScore(
      Number(idea.flipScoreHint) ||
        getDefaultFlipScore(idea.category, idea.sector)
    ),
    actionLabel: idea.actionLabelHint || getDefaultActionLabel(idea.category),
    actionNote: buildActionNote({
      sector: idea.sector,
      category: idea.category,
    }),
    tags: normalizeTags(idea.tags),
    region,
    brandFocus: brandFocus || null,
    scheduledFor,
    isPublished: false,
  };
}

function getTodayScheduleSlots() {
  const now = new Date();

  const slot1 = new Date(now);
  slot1.setHours(9, 0, 0, 0);

  const slot2 = new Date(now);
  slot2.setHours(13, 0, 0, 0);

  const slot3 = new Date(now);
  slot3.setHours(18, 0, 0, 0);

  return [slot1, slot2, slot3];
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const url = new URL(req.url);
    const secretFromQuery = url.searchParams.get("secret");
    const cronSecret = process.env.CRON_SECRET;

    const isAuthorized =
      !!cronSecret &&
      (authHeader === `Bearer ${cronSecret}` ||
        secretFromQuery === cronSecret);

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ideas = buildDailyIdeas();
    const slots = getTodayScheduleSlots();

    const created: CreatedArticleSummary[] = [];
    const skipped: SkippedArticleSummary[] = [];

    for (let i = 0; i < ideas.length; i += 1) {
      const idea = ideas[i];
      const scheduledFor = slots[i];

      if (!scheduledFor) {
        skipped.push({
          title: idea.topic,
          reason: "No schedule slot available",
        });
        continue;
      }

      const article = await buildArticleFromIdea(idea, scheduledFor);

      const existing = await prisma.newsArticle.findUnique({
        where: { slug: article.slug },
        select: { id: true },
      });

      if (existing) {
        skipped.push({
          title: article.title,
          reason: "Slug already exists",
        });
        continue;
      }

      const saved = await prisma.newsArticle.create({
        data: {
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          sector: article.sector,
          category: article.category,
          contentType: article.contentType,
          coverImage: article.coverImage,
          sourceName: article.sourceName,
          sourceUrl: article.sourceUrl,
          body: article.body,
          marketAngle: article.marketAngle,
          flipScore: article.flipScore,
          actionLabel: article.actionLabel,
          actionNote: article.actionNote,
          tags: article.tags,
          region: article.region,
          brandFocus: article.brandFocus,
          scheduledFor: article.scheduledFor,
          isPublished: false,
        },
        select: {
          title: true,
          slug: true,
          scheduledFor: true,
        },
      });

      created.push(saved);
    }

    return NextResponse.json({
      success: true,
      createdCount: created.length,
      skippedCount: skipped.length,
      created,
      skipped,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate daily drafts.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}