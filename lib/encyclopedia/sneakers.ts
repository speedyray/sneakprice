export type SneakerImage = {
  src: string;
  alt: string;
};

export type SneakerColorway =
  | string
  | {
      name: string;
      note?: string;
      market?: string;
    };

export type SneakerStat = {
  label: string;
  value: string;
};

export type SneakerTool = {
  label: string;
  desc: string;
};

export type SneakerStep = {
  step: string;
  label: string;
  desc: string;
};

export type RelatedModel = {
  name: string;
  href: string;
};

export type Sneaker = {
  slug: string;
  name: string;
  tagline: string;

  brand: string;
  firstRelease: string;
  designer: string;
  retailPrice: string;

  tier: 1 | 2 | 3;

  images?: SneakerImage[];

  marketSnapshot?: {
    title?: string;
    demand?: string;
    avgResale?: string;
    trend?: string;
    volatility?: string;
    liquidity?: string;
    flipScore?: string;
    description?: string;
  };

  history?: string | string[];
  designIntro?: string;
  designBullets?: string | string[];
  colorways?: SneakerColorway | SneakerColorway[];

  resaleParagraphs?: string | string[];
  resaleHighlights?: SneakerStat[];

  resellerInsight?: {
    flipScore?: string;
    liquidity?: string;
    typicalMargin?: string;
    bestUse?: string;
    bullets?: string[];
  };

  cta?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    primaryHref?: string;
    primaryLabel?: string;
    secondaryHref?: string;
    secondaryLabel?: string;
    bullets?: string[];
  };

  careIntro?: string | string[];
  careTools?: SneakerTool[];
  carePrep?: SneakerStep[];
  careCleaning?: SneakerStep[];

  relatedModels?: RelatedModel[];
};

export const sneakers: Sneaker[] = [
  {
    slug: "air-jordan-1",
    name: "Air Jordan 1",
    tagline:
      "The shoe that changed basketball, streetwear, and sneaker culture forever — and became one of the most important silhouettes in sneaker history.",

    brand: "Nike / Jordan Brand",
    firstRelease: "1985",
    designer: "Peter Moore",
    retailPrice: "$100–$180",

    tier: 1,

    images: [
      {
        src: "/encyclopedia/air-jordan-1/hero.jpg",
        alt: "Air Jordan 1",
      },
      {
        src: "/encyclopedia/air-jordan-1/angle-1.jpg",
        alt: "Air Jordan 1 side view",
      },
      {
        src: "/encyclopedia/air-jordan-1/angle-2.jpg",
        alt: "Air Jordan 1 alternate angle",
      },
      {
        src: "/encyclopedia/air-jordan-1/detail.jpg",
        alt: "Air Jordan 1 detail view",
      },
    ],

    marketSnapshot: {
      title: "Air Jordan 1 Market Overview",
      demand: "Strong Demand",
      avgResale: "$240",
      trend: "Bullish / Active",
      volatility: "Medium",
      liquidity: "High",
      flipScore: "84 / 100",
      description:
        "The Air Jordan 1 remains one of the most liquid and most traded sneakers on the secondary market. General release retros often command a premium, while collaborations and OG colorways can become grail-tier assets.",
    },

    history: [
      "Released in 1985, the Air Jordan 1 marked the beginning of Michael Jordan’s signature line and quickly became one of the most important sneakers ever made.",
      "Its rise was driven by basketball performance, cultural relevance, and the mythology surrounding the early Jordan era, helping transform sneakers into collectibles and status symbols.",
    ],

    designIntro:
      "The Air Jordan 1 is known for its high-top leather construction, bold color blocking, and instantly recognizable paneling.",

    designBullets: [
      "High-top leather silhouette",
      "Perforated toe box",
      "Nike Air cushioning",
      "Strong color-blocked visual identity",
      "Available in High, Mid, and Low forms",
    ],

    colorways: [
      "Bred (Black/Red)",
      "Chicago",
      "Royal Blue",
      "Shadow",
      "Off-White Collaboration",
    ],

    resaleParagraphs: [
      "The Air Jordan 1 is one of the deepest resale markets in sneakers. General release pairs can trade above retail, while OG colorways and collaborations command much stronger premiums.",
      "From a reseller perspective, it blends liquidity, hype, and long-term collector demand better than almost any other silhouette.",
    ],

    resaleHighlights: [
      { label: "Best For", value: "Premium flips & collector hold" },
      { label: "Risk Level", value: "Moderate" },
      { label: "Reseller Take", value: "Iconic model with durable market depth" },
    ],

    resellerInsight: {
      flipScore: "86 / 100",
      liquidity: "High",
      typicalMargin: "Moderate–High",
      bestUse: "Premium flips & collector demand",
      bullets: [
        "One of the deepest and most recognizable resale markets in sneakers.",
        "Strong demand across OG colorways, retros, and major collaborations.",
        "High cultural relevance keeps the AJ1 important even during cooling cycles.",
      ],
    },

    cta: {
      eyebrow: "Live Market Tool",
      title: "Scan Any Air Jordan 1 Colorway Live",
      description:
        "View real-time resale value, compare demand, and surface potential arbitrage opportunities for Air Jordan 1 pairs across the market.",
      primaryHref: "/exchange",
      primaryLabel: "Scan it with SneakPrice →",
      secondaryHref: "/discover",
      secondaryLabel: "Open market tools",
      bullets: [
        "View live resale signals",
        "Track profitable flips",
        "Compare demand and momentum instantly",
      ],
    },

    relatedModels: [
      { name: "Air Force 1", href: "/encyclopedia/air-force-1" },
      { name: "Air Jordan 4", href: "/encyclopedia/air-jordan-4" },
      { name: "Nike Dunk Low", href: "/encyclopedia/dunk-low" },
      { name: "Air Max 90", href: "/encyclopedia/air-max-90" },
    ],
  },

  {
    slug: "air-force-1",
    name: "Nike Air Force 1",
    tagline:
      "The all-time staple that moved from basketball to global streetwear icon.",

    brand: "Nike",
    firstRelease: "1982",
    designer: "Bruce Kilgore",
    retailPrice: "$90–$110",

    tier: 1,

    images: [
      {
        src: "/encyclopedia/air-force-1/hero.jpg",
        alt: "Air Force 1",
      },
      {
        src: "/encyclopedia/air-force-1/angle-1.jpg",
        alt: "Air Force 1 side view",
      },
    ],

    marketSnapshot: {
      title: "Air Force 1 Market Overview",
      demand: "Stable Market",
      avgResale: "$120",
      trend: "Stable / Neutral",
      volatility: "Low",
      liquidity: "High",
      flipScore: "62 / 100",
      description:
        "Core Air Force 1 colourways usually trade near retail with strong liquidity, while limited collaborations and collector pairs can command major premiums.",
    },

    history: [
      "The Air Force 1 debuted in 1982 as Nike's first basketball shoe with Air technology and quickly became one of the brand’s most influential silhouettes.",
      "It later evolved into a global streetwear staple, especially through all-white and all-black staple pairs and major collaborations.",
    ],

    designIntro:
      "The Air Force 1 is recognized for its clean leather upper, full-length Air cushioning, and durable outsole design.",

    designBullets: [
      "Full-length Air cushioning",
      "Durable leather upper",
      "Pivot circle outsole",
      "Available in Low, Mid, and High silhouettes",
    ],

    colorways: [
      "Triple White",
      "Triple Black",
      "Off-White 'The Ten'",
      "Louis Vuitton Collaboration",
    ],

    resaleParagraphs: [
      "Standard Air Force 1 colourways usually resell near retail, while premium collaborations and rare editions command much stronger premiums.",
      "It is more of a liquidity-driven model than a high-margin hype flip for most general releases.",
    ],

    resaleHighlights: [
      { label: "Best For", value: "Steady sell-through" },
      { label: "Risk Level", value: "Low to moderate" },
      { label: "Reseller Take", value: "More dependable than explosive" },
    ],

    resellerInsight: {
      flipScore: "68 / 100",
      liquidity: "High",
      typicalMargin: "Low–Moderate",
      bestUse: "Fast-moving staple",
      bullets: [
        "Strong everyday demand keeps sell-through healthy.",
        "Standard pairs are more about consistency than large margins.",
        "Collaborations and rare editions create the real premium upside.",
      ],
    },

    cta: {
      eyebrow: "Live Market Tool",
      title: "Scan Any Air Force 1 Colorway Live",
      description:
        "View real-time resale value, compare demand, and surface potential arbitrage opportunities for Air Force 1 pairs across the market.",
      primaryHref: "/exchange",
      primaryLabel: "Scan it with SneakPrice →",
      secondaryHref: "/discover",
      secondaryLabel: "Open market tools",
      bullets: [
        "View live resale signals",
        "Track profitable flips",
        "Compare market demand instantly",
      ],
    },

    relatedModels: [
      { name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" },
      { name: "Nike Dunk Low", href: "/encyclopedia/dunk-low" },
      { name: "Air Max 90", href: "/encyclopedia/air-max-90" },
      { name: "Asics Gel-Kayano", href: "/encyclopedia/asics-gel-kayano" },
    ],
  },

  {
    slug: "air-max-90",
    name: "Nike Air Max 90",
    tagline:
      "Tinker Hatfield's masterpiece — the sneaker that made the Air unit visible and iconic.",

    brand: "Nike",
    firstRelease: "1990",
    designer: "Tinker Hatfield",
    retailPrice: "$110–$130",

    tier: 2,

    images: [
      {
        src: "/encyclopedia/air-max-90/hero.jpg",
        alt: "Nike Air Max 90",
      },
      {
        src: "/encyclopedia/air-max-90/angle-1.jpg",
        alt: "Nike Air Max 90 side view",
      },
      {
        src: "/encyclopedia/air-max-90/angle-2.jpg",
        alt: "Nike Air Max 90 alternate angle",
      },
      {
        src: "/encyclopedia/air-max-90/detail.jpg",
        alt: "Nike Air Max 90 detail view",
      },
    ],
    marketSnapshot: {
      title: "Nike Air Max 90 Market Overview",
      demand: "Stable Demand",
      avgResale: "$160",
      trend: "Neutral / Active",
      volatility: "Medium",
      liquidity: "Medium",
      flipScore: "70 / 100",
      description:
        "The Air Max 90 remains one of Nike’s most reliable lifestyle runners, with steady demand driven by OG colorways, collabs, and timeless everyday wear appeal.",
    },

    history: [
      "Originally released as the Air Max III, the sneaker was later renamed Air Max 90. It introduced a larger visible Air unit and bold panel design.",
      "Designed by Tinker Hatfield, the Air Max 90 helped cement visible Air as both a performance feature and a visual identity for Nike running.",
    ],

    designIntro:
      "The Air Max 90 is known for its layered upper, visible Air cushioning, and aggressive panel structure that gave the line a more modern look than earlier Air Max models.",

    designBullets: [
      "Visible heel Air unit",
      "Multi-panel leather, mesh, and synthetic construction",
      "Waffle-inspired outsole traction",
      "Strong support for both lifestyle wear and everyday rotation",
    ],

    colorways: [
      "Infrared",
      "Laser Blue",
      "Duck Camo",
      "Off-White Collaboration",
    ],

    resaleParagraphs: [
      "Standard Air Max 90 releases usually trade close to retail, while sought-after OG-inspired pairs and collaborations can command stronger premiums.",
      "From a reseller perspective, the model is generally more dependable than explosive, with the best upside coming from limited-edition drops and notable collaborations.",
    ],

    resaleHighlights: [
      { label: "Best For", value: "Steady lifestyle demand" },
      { label: "Risk Level", value: "Low to moderate" },
      { label: "Reseller Take", value: "Reliable model with selective upside" },
    ],

    resellerInsight: {
      flipScore: "70 / 100",
      liquidity: "Medium",
      typicalMargin: "Low–Moderate",
      bestUse: "Reliable everyday flip",
      bullets: [
        "OG colorways tend to perform best over time.",
        "Collaborations can dramatically outperform standard GR pairs.",
        "More consistency than hype-driven upside.",
      ],
    },

    cta: {
      eyebrow: "Live Market Tool",
      title: "Check Live Resale Value",
      description:
        "Scan any Nike Air Max 90 colorway with SneakPrice to view live resale data, monitor demand, and discover potential arbitrage opportunities.",
      primaryHref: "/exchange",
      primaryLabel: "Scan it with SneakPrice →",
      secondaryHref: "/discover",
      secondaryLabel: "Open market tools",
      bullets: [
        "View live resale signals",
        "Track profitable flips",
        "Compare demand instantly",
      ],
    },

    relatedModels: [
      { name: "Air Max 95", href: "/encyclopedia/air-max-95" },
      { name: "Air Max 97", href: "/encyclopedia/air-max-97" },
      { name: "Air Force 1", href: "/encyclopedia/air-force-1" },
      { name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" },
    ],


    careIntro: [
      "The Air Max 90 benefits from routine cleaning and proper storage, especially on mesh, suede, and mixed-material releases.",
      "Keeping the upper clean and the visible Air area free of grime helps preserve both appearance and long-term wearability.",
    ],

    careTools: [
      {
        label: "Soft-bristle Brush",
        desc: "Useful for removing dirt without damaging suede, mesh, or leather panels.",
      },
      {
        label: "Microfiber Cloth",
        desc: "Ideal for wiping away moisture and surface dirt gently.",
      },
      {
        label: "Sneaker Cleaning Solution",
        desc: "Helps clean effectively while protecting mixed materials.",
      },
      {
        label: "Warm Water",
        desc: "Useful for loosening dirt without harsh cleaning conditions.",
      },
      {
        label: "Protective Spray",
        desc: "Helps defend against stains and light moisture exposure.",
      },
    ],

    carePrep: [
      {
        step: "1",
        label: "Remove Laces",
        desc: "Take the laces out so you can fully access the tongue and eyelets.",
      },
      {
        step: "2",
        label: "Initial Wipe Down",
        desc: "Use a damp microfiber cloth to remove loose dirt before brushing the upper.",
      },
    ],

    careCleaning: [
      {
        step: "1",
        label: "Prepare the Cleaning Solution",
        desc: "Mix warm water with a sneaker-safe cleaning solution.",
      },
      {
        step: "2",
        label: "Gentle Scrubbing",
        desc: "Use light circular motions around mesh, overlays, and the mudguard.",
      },
      {
        step: "3",
        label: "Wipe Away Residue",
        desc: "Use a clean microfiber cloth to remove loosened dirt and excess solution.",
      },
      {
        step: "4",
        label: "Air Dry Properly",
        desc: "Let the pair dry naturally away from direct heat or sunlight.",
      },
    ],


    },




















    // -------------------- NEW SNEAKERS --------------------

{
  slug: "air-jordan-4",
  name: "Air Jordan 4",
  tagline: "A defining silhouette that brought visible Air and mesh panels into Jordan legacy.",
  brand: "Nike / Jordan Brand",
  firstRelease: "1989",
  designer: "Tinker Hatfield",
  retailPrice: "$200–$225",
  tier: 1,
  relatedModels: [
    { name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" },
    { name: "Air Jordan 3", href: "/encyclopedia/air-jordan-3" },
  ],
},

{
  slug: "air-jordan-3",
  name: "Air Jordan 3",
  tagline: "The model that introduced visible Air and saved the Jordan line.",
  brand: "Nike / Jordan Brand",
  firstRelease: "1988",
  designer: "Tinker Hatfield",
  retailPrice: "$200–$220",
  tier: 1,
},

{
  slug: "air-jordan-11",
  name: "Air Jordan 11",
  tagline: "Patent leather icon worn during MJ’s legendary comeback season.",
  brand: "Nike / Jordan Brand",
  firstRelease: "1995",
  designer: "Tinker Hatfield",
  retailPrice: "$225–$250",
  tier: 1,
},

{
  slug: "nike-dunk-low",
  name: "Nike Dunk Low",
  tagline: "A skate and streetwear staple that exploded in modern resale culture.",
  brand: "Nike",
  firstRelease: "1985",
  designer: "Peter Moore",
  retailPrice: "$110–$130",
  tier: 1,
},

{
  slug: "nike-dunk-high",
  name: "Nike Dunk High",
  tagline: "The original basketball version of the Dunk before its skate evolution.",
  brand: "Nike",
  firstRelease: "1985",
  designer: "Peter Moore",
  retailPrice: "$120–$150",
  tier: 2,
},

{
  slug: "yeezy-boost-350",
  name: "Yeezy Boost 350",
  tagline: "The sneaker that redefined hype culture and comfort.",
  brand: "Adidas",
  firstRelease: "2015",
  designer: "Kanye West",
  retailPrice: "$220–$300",
  tier: 1,
},

{
  slug: "yeezy-700",
  name: "Yeezy Boost 700",
  tagline: "Chunky runner that helped define the dad shoe era.",
  brand: "Adidas",
  firstRelease: "2017",
  designer: "Kanye West",
  retailPrice: "$300–$350",
  tier: 1,
},

{
  slug: "nike-air-max-95",
  name: "Nike Air Max 95",
  tagline: "A layered design inspired by human anatomy with aggressive styling.",
  brand: "Nike",
  firstRelease: "1995",
  designer: "Sergio Lozano",
  retailPrice: "$170–$200",
  tier: 2,
},

{
  slug: "nike-air-max-97",
  name: "Nike Air Max 97",
  tagline: "Full-length Air unit with futuristic ripple design.",
  brand: "Nike",
  firstRelease: "1997",
  designer: "Christian Tresser",
  retailPrice: "$180–$210",
  tier: 2,
},

{
  slug: "nike-air-max-1",
  name: "Nike Air Max 1",
  tagline: "The first sneaker to showcase visible Air technology.",
  brand: "Nike",
  firstRelease: "1987",
  designer: "Tinker Hatfield",
  retailPrice: "$150–$180",
  tier: 1,
},

{
  slug: "adidas-samba",
  name: "Adidas Samba",
  tagline: "A timeless indoor soccer shoe turned fashion essential.",
  brand: "Adidas",
  firstRelease: "1949",
  designer: "Adolf Dassler",
  retailPrice: "$90–$120",
  tier: 1,
},

{
  slug: "adidas-gazelle",
  name: "Adidas Gazelle",
  tagline: "Minimalist suede classic with decades of cultural relevance.",
  brand: "Adidas",
  firstRelease: "1966",
  designer: "Adidas",
  retailPrice: "$100–$130",
  tier: 2,
},

{
  slug: "new-balance-990v3",
  name: "New Balance 990v3",
  tagline: "Premium runner blending comfort and heritage.",
  brand: "New Balance",
  firstRelease: "2012",
  designer: "New Balance",
  retailPrice: "$180–$220",
  tier: 1,
},

{
  slug: "new-balance-550",
  name: "New Balance 550",
  tagline: "Retro basketball silhouette revived for modern streetwear.",
  brand: "New Balance",
  firstRelease: "1989",
  designer: "New Balance",
  retailPrice: "$110–$140",
  tier: 1,
},

{
  slug: "nike-blazer-mid",
  name: "Nike Blazer Mid",
  tagline: "Vintage basketball shoe embraced by skate culture.",
  brand: "Nike",
  firstRelease: "1973",
  designer: "Nike",
  retailPrice: "$100–$130",
  tier: 2,
},

{
  slug: "nike-cortez",
  name: "Nike Cortez",
  tagline: "One of Nike’s earliest running shoes and a cultural icon.",
  brand: "Nike",
  firstRelease: "1972",
  designer: "Bill Bowerman",
  retailPrice: "$90–$120",
  tier: 2,
},

{
  slug: "puma-suede-classic",
  name: "Puma Suede Classic",
  tagline: "A streetwear staple rooted in hip-hop history.",
  brand: "Puma",
  firstRelease: "1968",
  designer: "Puma",
  retailPrice: "$70–$100",
  tier: 2,
},

{
  slug: "reebok-club-c",
  name: "Reebok Club C",
  tagline: "Clean tennis-inspired sneaker with minimalist appeal.",
  brand: "Reebok",
  firstRelease: "1985",
  designer: "Reebok",
  retailPrice: "$80–$110",
  tier: 2,
},

{
  slug: "asics-gel-lyte-iii",
  name: "ASICS Gel-Lyte III",
  tagline: "Comfort-driven runner with split tongue design.",
  brand: "ASICS",
  firstRelease: "1990",
  designer: "Shigeyuki Mitsui",
  retailPrice: "$120–$160",
  tier: 2,
},

{
  slug: "nike-zoom-vomero-5",
  name: "Nike Zoom Vomero 5",
  tagline: "Tech runner turned lifestyle favorite.",
  brand: "Nike",
  firstRelease: "2010",
  designer: "Nike",
  retailPrice: "$160–$180",
  tier: 1,
},

{
  slug: "salomon-xt-6",
  name: "Salomon XT-6",
  tagline: "Trail performance sneaker adopted into fashion.",
  brand: "Salomon",
  firstRelease: "2013",
  designer: "Salomon",
  retailPrice: "$180–$220",
  tier: 1,
},

{
  slug: "converse-chuck-70",
  name: "Converse Chuck 70",
  tagline: "Premium evolution of the classic Chuck Taylor silhouette.",
  brand: "Converse",
  firstRelease: "1970",
  designer: "Converse",
  retailPrice: "$85–$110",
  tier: 1,
},

{
  slug: "vans-old-skool",
  name: "Vans Old Skool",
  tagline: "Skateboarding staple with iconic side stripe.",
  brand: "Vans",
  firstRelease: "1977",
  designer: "Vans",
  retailPrice: "$70–$100",
  tier: 1,
},

{
  slug: "vans-sk8-hi",
  name: "Vans Sk8-Hi",
  tagline: "High-top skate shoe with durable build.",
  brand: "Vans",
  firstRelease: "1978",
  designer: "Vans",
  retailPrice: "$80–$110",
  tier: 2,
},

{
  slug: "nike-air-huarache",
  name: "Nike Air Huarache",
  tagline: "Sock-like fit that changed comfort expectations.",
  brand: "Nike",
  firstRelease: "1991",
  designer: "Tinker Hatfield",
  retailPrice: "$120–$150",
  tier: 2,
},

{
  slug: "new-balance-2002r",
  name: "New Balance 2002R",
  tagline: "Retro runner revived with modern cushioning.",
  brand: "New Balance",
  firstRelease: "2010",
  designer: "New Balance",
  retailPrice: "$140–$180",
  tier: 1,
 },
];