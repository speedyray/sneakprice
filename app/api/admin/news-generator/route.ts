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

type IdeaPayload = {
  mode: "ideas";
  sector?: string;
  category?: string;
  region?: string;
  brandFocus?: string;
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

function buildIdeasFromInputs(payload: IdeaPayload): IdeaSuggestion[] {
  const sector = payload.sector?.trim() || "Sneakers";
  const forcedCategory = payload.category?.trim() || "";
  const region = payload.region?.trim() || "Global";
  const brandFocus = payload.brandFocus?.trim() || "";

  const categoryFor = (fallback: string) => forcedCategory || fallback;

  const sectorIdeas: Record<string, IdeaSuggestion[]> = {
    Sneakers: [
      {
        topic: "Why Under-Retail Sneakers Are Becoming the Smartest Flip Right Now",
        sector: "Sneakers",
        category: categoryFor("Market"),
        contentType: "article",
        angle: `Across ${region}, buyers are becoming more selective and under-retail pairs are offering lower-risk entries with steadier resale demand.`,
        targetKeyword: "under-retail sneaker flips",
        flipScoreHint: "88",
        actionLabelHint: "Strong Buy",
        tags: ["sneakers", "resale", "market", "under-retail"],
      },
      {
        topic: "3 Sneaker Silhouettes Resellers Should Watch This Week",
        sector: "Sneakers",
        category: categoryFor("Flip Watch"),
        contentType: "watchlist",
        angle: `A small number of recognizable silhouettes are showing stronger movement because they combine wearability, price discipline, and repeat buyer familiarity.`,
        targetKeyword: "sneaker silhouettes to watch",
        flipScoreHint: "84",
        actionLabelHint: "Watchlist",
        tags: ["sneakers", "flip watch", "trending", "resale"],
      },
      {
        topic: "Why Low-Profile Sneakers Are Winning More Buyers Right Now",
        sector: "Sneakers",
        category: categoryFor("Trend"),
        contentType: "article",
        angle: `Slimmer and easier-to-style sneaker shapes are outperforming bulkier hype-driven pairs because buyers want versatility and cleaner everyday wear.`,
        targetKeyword: "low-profile sneaker trend",
        flipScoreHint: "79",
        actionLabelHint: "Selective Buy",
        tags: ["sneakers", "trend", "low-profile", "fashion"],
      },
    ],
    Fashion: [
      {
        topic: "Why Football-Inspired Sneakers and Street Luxury Are Colliding Right Now",
        sector: "Fashion",
        category: categoryFor("Trend"),
        contentType: "article",
        angle: `Sport heritage and luxury styling are converging into a stronger fashion signal, especially through slimmer silhouettes and premium materials.`,
        targetKeyword: "football-inspired luxury sneakers",
        flipScoreHint: "82",
        actionLabelHint: "Buy on Dip",
        tags: ["fashion", "luxury", "streetwear", "football"],
      },
      {
        topic: "Why Quiet Luxury Styling Is Reshaping Fashion Footwear Right Now",
        sector: "Fashion",
        category: categoryFor("Editorial"),
        contentType: "article",
        angle: `Shoppers are favoring cleaner materials, lower branding, and understated confidence over louder short-term hype.`,
        targetKeyword: "quiet luxury fashion footwear",
        flipScoreHint: "76",
        actionLabelHint: "Selective Buy",
        tags: ["fashion", "quiet luxury", "footwear", "trend"],
      },
      {
        topic: "The Fashion Sneaker Shapes Gaining the Most Momentum This Week",
        sector: "Fashion",
        category: categoryFor("Report"),
        contentType: "report",
        angle: `The strongest fashion footwear movement is happening around wearable shapes that feel editorial but still easy to style day to day.`,
        targetKeyword: "fashion sneaker momentum",
        flipScoreHint: "78",
        actionLabelHint: "Monitor",
        tags: ["fashion", "report", "momentum", "sneakers"],
      },
    ],
    "Leather Goods": [
      {
        topic: "Why Quiet Luxury Bags Are Holding Attention Better Than Loud Logos",
        sector: "Leather Goods",
        category: categoryFor("Trend"),
        contentType: "article",
        angle: `Buyers are responding to cleaner, lower-noise luxury signals with longer-lasting styling appeal.`,
        targetKeyword: "quiet luxury bags trend",
        flipScoreHint: "77",
        actionLabelHint: "Selective Buy",
        tags: ["leather goods", "luxury", "bags", "trend"],
      },
      {
        topic: "The Leather Goods Categories Buyers Are Prioritizing Right Now",
        sector: "Leather Goods",
        category: categoryFor("Buyer Guide"),
        contentType: "guide",
        angle: `The strongest demand is concentrating around categories that combine utility, brand trust, and low trend fatigue.`,
        targetKeyword: "best leather goods categories",
        flipScoreHint: "75",
        actionLabelHint: "Research",
        tags: ["leather goods", "buyer guide", "luxury", "bags"],
      },
      {
        topic: "What the Luxury Bag Market Is Rewarding This Month",
        sector: "Leather Goods",
        category: categoryFor("Market"),
        contentType: "report",
        angle: `Market preference is shifting toward pieces with higher recognizability, stronger liquidity, and broader long-term appeal.`,
        targetKeyword: "luxury bag market demand",
        flipScoreHint: "80",
        actionLabelHint: "Monitor",
        tags: ["leather goods", "market", "bags", "luxury"],
      },
    ],
    Watches: [
      {
        topic: "Why Steel Luxury Watches Still Dominate Secondary Market Attention",
        sector: "Watches",
        category: categoryFor("Market"),
        contentType: "article",
        angle: `Steel sports watches continue to lead because they combine recognizability, liquidity, and long-term buyer confidence.`,
        targetKeyword: "steel luxury watches market",
        flipScoreHint: "81",
        actionLabelHint: "Monitor",
        tags: ["watches", "market", "luxury", "steel"],
      },
      {
        topic: "Entry-Level Luxury Watches Buyers Should Research Right Now",
        sector: "Watches",
        category: categoryFor("Buyer Guide"),
        contentType: "guide",
        angle: `Entry luxury remains attractive when buyers prioritize liquidity, brand trust, and long-term relevance.`,
        targetKeyword: "entry-level luxury watches",
        flipScoreHint: "74",
        actionLabelHint: "Research",
        tags: ["watches", "buyer guide", "luxury", "entry-level"],
      },
      {
        topic: "The Watch Models Quietly Building Momentum This Quarter",
        sector: "Watches",
        category: categoryFor("Flip Watch"),
        contentType: "watchlist",
        angle: `A small set of watch references are gaining traction due to cultural visibility and strong secondary confidence.`,
        targetKeyword: "watch models to watch",
        flipScoreHint: "79",
        actionLabelHint: "Watchlist",
        tags: ["watches", "watchlist", "momentum", "luxury"],
      },
    ],
    Jewelry: [
      {
        topic: "Why Timeless Jewelry Is Outperforming Trend-Driven Pieces Right Now",
        sector: "Jewelry",
        category: categoryFor("Trend"),
        contentType: "article",
        angle: `Demand is concentrating around recognizable timeless forms that feel more durable than short-term novelty.`,
        targetKeyword: "timeless jewelry trend",
        flipScoreHint: "73",
        actionLabelHint: "Selective Buy",
        tags: ["jewelry", "trend", "timeless", "luxury"],
      },
      {
        topic: "Jewelry Categories Buyers Are Prioritizing in the Luxury Market",
        sector: "Jewelry",
        category: categoryFor("Buyer Guide"),
        contentType: "guide",
        angle: `The strongest buyer behavior is clustering around pieces with brand trust, gifting power, and long-term wearability.`,
        targetKeyword: "best jewelry categories",
        flipScoreHint: "72",
        actionLabelHint: "Research",
        tags: ["jewelry", "buyer guide", "luxury", "market"],
      },
      {
        topic: "What the Jewelry Market Is Rewarding Right Now",
        sector: "Jewelry",
        category: categoryFor("Report"),
        contentType: "report",
        angle: `Buyers are rewarding lower-volatility categories with clearer value perception and stronger timeless appeal.`,
        targetKeyword: "jewelry market demand",
        flipScoreHint: "74",
        actionLabelHint: "Monitor",
        tags: ["jewelry", "report", "market", "luxury"],
      },
    ],
    Beauty: [
      {
        topic: "Why Luxury Beauty Brands Are Winning More Attention Right Now",
        sector: "Beauty",
        category: categoryFor("Trend"),
        contentType: "article",
        angle: `Beauty momentum is clustering around brands with strong cultural visibility, recognizability, and repeat demand.`,
        targetKeyword: "luxury beauty trends",
        flipScoreHint: "71",
        actionLabelHint: "Monitor",
        tags: ["beauty", "luxury", "trend", "brands"],
      },
      {
        topic: "Beauty Categories Building the Most Momentum This Month",
        sector: "Beauty",
        category: categoryFor("Report"),
        contentType: "report",
        angle: `The strongest movement is happening where product familiarity, visibility, and repeat purchase behavior align.`,
        targetKeyword: "beauty category momentum",
        flipScoreHint: "70",
        actionLabelHint: "Monitor",
        tags: ["beauty", "report", "momentum", "market"],
      },
      {
        topic: "What Smart Buyers Are Prioritizing in Beauty Right Now",
        sector: "Beauty",
        category: categoryFor("Buyer Guide"),
        contentType: "guide",
        angle: `Buyers are focusing on recognizable products with stronger repeat-use logic and lower trend fatigue.`,
        targetKeyword: "best beauty categories to buy",
        flipScoreHint: "69",
        actionLabelHint: "Research",
        tags: ["beauty", "buyer guide", "luxury", "trend"],
      },
    ],
    "Sport & Lifestyle": [
      {
        topic: "Why Sport-Lifestyle Products With Everyday Wearability Are Winning Right Now",
        sector: "Sport & Lifestyle",
        category: categoryFor("Trend"),
        contentType: "article",
        angle: `The strongest movement is happening where performance identity meets everyday styling and wider usability.`,
        targetKeyword: "sport lifestyle trend",
        flipScoreHint: "76",
        actionLabelHint: "Selective Buy",
        tags: ["sport", "lifestyle", "trend", "wearability"],
      },
      {
        topic: "The Sport-Lifestyle Categories Showing the Best Market Discipline",
        sector: "Sport & Lifestyle",
        category: categoryFor("Market"),
        contentType: "report",
        angle: `Products with recognizable function and broad consumer logic are outperforming noisier hype-driven categories.`,
        targetKeyword: "sport lifestyle market demand",
        flipScoreHint: "78",
        actionLabelHint: "Monitor",
        tags: ["sport", "lifestyle", "market", "trend"],
      },
      {
        topic: "What Buyers Are Watching Across Sport and Lifestyle Right Now",
        sector: "Sport & Lifestyle",
        category: categoryFor("Flip Watch"),
        contentType: "watchlist",
        angle: `A few product lanes are building momentum because they combine familiarity, utility, and cleaner price logic.`,
        targetKeyword: "sport lifestyle products to watch",
        flipScoreHint: "77",
        actionLabelHint: "Watchlist",
        tags: ["sport", "lifestyle", "watchlist", "market"],
      },
    ],
  };

  const ideas = sectorIdeas[sector] ?? sectorIdeas["Sneakers"];

  return ideas.map((idea) => ({
    ...idea,
    angle: brandFocus
      ? `${idea.angle} ${brandFocus} is a particularly relevant brand focus inside this setup right now.`
      : idea.angle,
  }));
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
    const payload = (await req.json()) as GeneratePayload | IdeaPayload;

    if (payload.mode === "ideas") {
      const ideas = buildIdeasFromInputs(payload as IdeaPayload);
      return NextResponse.json({ ideas });
    }

    if (!("topic" in payload) || !payload.topic?.trim()) {
      return NextResponse.json(
        { error: "Topic is required." },
        { status: 400 }
      );
    }

    const article = buildArticleFromInputs(payload as GeneratePayload);

    return NextResponse.json({ article });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate content." },
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