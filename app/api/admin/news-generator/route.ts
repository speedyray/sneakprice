import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type GeneratePayload = {
  mode: "generate";
  topic: string;
  sector?: string;
  category?: string;
  contentType?: string;
  angle?: string;
  targetKeyword?: string;
  coverImage?: string;
  flipScoreHint?: string;
  actionLabelHint?: string;
  region?: string;
  brandFocus?: string;
  scheduledFor?: string | null;
  tags?: string[];
};

type SavePayload = {
  title: string;
  slug: string;
  excerpt: string;
  sector?: string;
  category: string;
  contentType?: string;
  coverImage: string;
  sourceName: string;
  sourceUrl: string;
  body: string;
  marketAngle: string;
  flipScore: number | null;
  actionLabel: string;
  actionNote: string;
  tags?: string[];
  region?: string;
  brandFocus?: string;
  scheduledFor?: string | null;
  isPublished: boolean;
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
  return tags
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function normalizeScheduledFor(value?: string | null) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date;
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

function buildArticleFromInputs(payload: GeneratePayload) {
  const rawTopic = payload.topic?.trim();
  const normalizedTopic =
    rawTopic && rawTopic.length > 0
      ? rawTopic
      : "market trend defining this week";

  const sector = payload.sector?.trim() || "Sneakers";
  const category = payload.category?.trim() || "Market";
  const contentType = payload.contentType?.trim() || "article";
  const targetKeyword = payload.targetKeyword?.trim() || normalizedTopic;
  const region = payload.region?.trim() || "Global";
  const brandFocus = payload.brandFocus?.trim() || "";
  const tags = normalizeTags(payload.tags);
  const scheduledFor = payload.scheduledFor ?? null;

  const safeTitle =
    normalizedTopic.toLowerCase().startsWith("why ")
      ? titleCase(normalizedTopic)
      : `Why ${titleCase(normalizedTopic)} Are Defining the ${sector} Market Right Now`;

  const slug = slugify(safeTitle);

  const coverImage =
    payload.coverImage?.trim() && payload.coverImage.trim() !== "/news/"
      ? payload.coverImage.trim()
      : `/news/${slug}.jpg`;

  const flipScore = payload.flipScoreHint?.trim()
    ? clampScore(Number(payload.flipScoreHint))
    : getDefaultFlipScore(category, sector);

  const actionLabel =
    payload.actionLabelHint?.trim() || getDefaultActionLabel(category);

  const excerpt = buildExcerpt({
    sector,
    category,
    targetKeyword,
  });

  const marketAngle = buildMarketAngle({
    title: safeTitle,
    sector,
    category,
    targetKeyword,
    customAngle: payload.angle,
  });

  const actionNote = buildActionNote({
    sector,
    category,
  });

  const body = buildBody({
    title: safeTitle,
    sector,
    category,
    contentType,
    targetKeyword,
    region,
    brandFocus,
  });

  return {
    title: safeTitle,
    slug,
    excerpt,
    sector,
    category,
    contentType,
    coverImage,
    sourceName: "SneakPrice Editorial",
    sourceUrl: "",
    body,
    marketAngle,
    flipScore,
    actionLabel,
    actionNote,
    tags,
    region,
    brandFocus,
    scheduledFor,
    isPublished: false,
  };
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as GeneratePayload;

    if (!payload.topic?.trim()) {
      return NextResponse.json(
        { error: "Topic is required." },
        { status: 400 }
      );
    }

    const article = buildArticleFromInputs(payload);

    return NextResponse.json({ article });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate article." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const payload = (await req.json()) as SavePayload;

    if (!payload.title?.trim() || !payload.slug?.trim() || !payload.body?.trim()) {
      return NextResponse.json(
        { error: "Missing required article fields." },
        { status: 400 }
      );
    }

    const existing = await prisma.newsArticle.findUnique({
      where: { slug: payload.slug },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An article with this slug already exists." },
        { status: 409 }
      );
    }

    const saved = await prisma.newsArticle.create({
      data: {
        title: payload.title.trim(),
        slug: payload.slug.trim(),
        excerpt: payload.excerpt?.trim() || null,
        sector: payload.sector?.trim() || null,
        category: payload.category.trim(),
        contentType: payload.contentType?.trim() || null,
        coverImage: payload.coverImage?.trim() || null,
        sourceName: payload.sourceName?.trim() || "SneakPrice Editorial",
        sourceUrl: payload.sourceUrl?.trim() || null,
        body: payload.body.trim(),
        marketAngle: payload.marketAngle?.trim() || null,
        flipScore:
          typeof payload.flipScore === "number" ? payload.flipScore : null,
        actionLabel: payload.actionLabel?.trim() || null,
        actionNote: payload.actionNote?.trim() || null,
        tags: normalizeTags(payload.tags),
        region: payload.region?.trim() || null,
        brandFocus: payload.brandFocus?.trim() || null,
        scheduledFor: normalizeScheduledFor(payload.scheduledFor),
        isPublished: false,
      },
    });

    return NextResponse.json({ article: saved });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to save draft.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}