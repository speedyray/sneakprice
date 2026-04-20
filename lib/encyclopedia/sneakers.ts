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
      primaryHref: "/",
      primaryLabel: "Scan it with SneakPrice →",
      secondaryHref: "/exchange",
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
      primaryHref: "/",
      primaryLabel: "Scan it with SneakPrice →",
      secondaryHref: "/exchange",
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
      primaryHref: "/",
      primaryLabel: "Scan it with SneakPrice →",
      secondaryHref: "/exchange",
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

    

    {
      slug: "air-max-95",
      name: "Nike Air Max 95",
      tagline:
        "Inspired by the human body, the Air Max 95 revolutionized sneaker design with lible forefoot Air cushioning.",
    
      brand: "Nike",
      firstRelease: "1995",
      designer: "Sergio Lozano",
      retailPrice: "$160–$180",
    
      tier: 2,
    
      images: [
        {
          src: "/encyclopedia/air-max-95/hero.jpg",
          alt: "Nike Air Max 95",
        },
        {
          src: "/encyclopedia/air-max-95/angle-1.jpg",
          alt: "Nike Air Max 95 side view",
        },
        {
          src: "/encyclopedia/air-max-95/angle-2.jpg",
          alt: "Nike Air Max 95 alternate angle",
        },
        {
          src: "/encyclopedia/air-max-95/detail.jpg",
          alt: "Nike Air Max 95 detail view",
        },
      ],
    
      marketSnapshot: {
        title: "Nike Air Max 95 Market Overview",
        demand: "Strong Demand",
        avgResale: "$220",
        trend: "Stable / Active",
        volatility: "Medium",
        liquidity: "Medium–High",
        flipScore: "78 / 100",
        description:
          "The Air Max 95 remains one of Nike’s most iconic retro runners, with strong long-term demand driven by OG colorways, collector nostalgia, and high-heat collaborations.",
      },
    
      history: [
        "The Nike Air Max 95 was designed by Sergio Lozano, who took a bold and unconventional approach inspired by human anatomy and natural erosion patterns.",
        "Its structure mirrors the human body — the midsole represents the spine, the eyelets act as ribs, and the layered upper reflects muscle fibers.",
        "It became the first Air Max to feature visible forefoot Air units, introducing dual Air cushioning and redefining performance footwear.",
        "Originally released in the iconic Neon colorway, the Air Max 95 quickly became a cultural symbol across streetwear, hip-hop, and global sneaker scenes.",
      ],
    
      designIntro:
        "The Air Max 95 is defined by its anatomy-inspired construction, gradient side panels, and the first-ever visible forefoot Air unit in the Air Max line.",
    
      designBullets: [
        "Dual visible Air units in the forefoot and heel",
        "Gradient layered upper inspired by erosion and human anatomy",
        "Spine-inspired midsole and rib-like lace eyelets",
        "Mesh, suede, and synthetic mixed-material construction",
        "Bold midsole and aggressive paneling that defined 1990s runner design",
      ],
    
      colorways: [
        {
          name: "Neon",
          note: "The original and most iconic Air Max 95 colorway",
          market: "Collector favorite",
        },
        {
          name: "Solar Red",
          note: "A popular OG-style follow-up with strong appeal",
          market: "Strong demand",
        },
        {
          name: "Stash",
          note: "Highly regarded collaboration with premium collector interest",
          market: "High resale",
        },
        {
          name: "Corteiz Pink Beam",
          note: "Modern collab with major hype and fast sell-through",
          market: "Very hot",
        },
      ],
    
      resaleParagraphs: [
        "The Air Max 95 performs best in OG-inspired colorways and limited collaborations. Standard general releases often sit closer to retail, but strong storytelling and heritage pairs usually outperform.",
        "From a reseller perspective, the Air Max 95 is less about constant hype and more about selective upside, nostalgia, and collector-driven demand.",
      ],
    
      resaleHighlights: [
        { label: "Best For", value: "OG colorways & premium collaborations" },
        { label: "Risk Level", value: "Moderate" },
        { label: "Reseller Take", value: "Selective upside with strong heritage appeal" },
      ],
    
      resellerInsight: {
        flipScore: "78 / 100",
        liquidity: "Medium–High",
        typicalMargin: "Moderate",
        bestUse: "OG holds & selective collab flips",
        bullets: [
          "OG colorways usually carry the strongest long-term value.",
          "Collaborations can create sharp spikes in resale performance.",
          "A heritage-driven model with better collector appeal than everyday GR upside.",
        ],
      },
    
      cta: {
        eyebrow: "Live Market Tool",
        title: "Scan Any Air Max 95 Colorway Live",
        description:
          "Use SneakPrice to check live resale value, compare demand, and surface potential opportunities across Air Max 95 colorways.",
        primaryHref: "/",
        primaryLabel: "Scan it with SneakPrice →",
        secondaryHref: "/exchange",
        secondaryLabel: "Open market tools",
        bullets: [
          "View live resale signals",
          "Track profitable flips",
          "Compare demand and momentum instantly",
        ],
      },
    
      careIntro: [
        "The Air Max 95 benefits from regular cleaning because its layered upper and mixed materials can collect dirt quickly.",
        "Extra care is especially important on suede, mesh, and light-colored gradient panels to preserve the silhouette’s signature look.",
      ],
    
      careTools: [
        {
          label: "Soft-bristle Brush",
          desc: "Helps remove dirt from mesh and layered panels without damaging delicate materials.",
        },
        {
          label: "Microfiber Cloth",
          desc: "Useful for wiping away surface dirt and drying the shoe gently after cleaning.",
        },
        {
          label: "Sneaker Cleaning Solution",
          desc: "A sneaker-safe cleaner helps preserve suede, mesh, and synthetic overlays.",
        },
        {
          label: "Warm Water",
          desc: "Helps loosen grime without exposing the pair to harsh cleaning conditions.",
        },
        {
          label: "Water & Stain Repellent",
          desc: "Useful for protecting suede and mesh pairs from future wear and weather exposure.",
        },
      ],
    
      carePrep: [
        {
          step: "1",
          label: "Remove Laces",
          desc: "Take out the laces so you can fully access the tongue, eyelets, and upper layers.",
        },
        {
          step: "2",
          label: "Dry Brush First",
          desc: "Brush off loose dirt and debris before introducing any water or cleaning solution.",
        },
      ],
    
      careCleaning: [
        {
          step: "1",
          label: "Mix Cleaning Solution",
          desc: "Combine warm water with a sneaker-safe cleaning solution in a small bowl.",
        },
        {
          step: "2",
          label: "Clean Gently by Section",
          desc: "Use soft circular motions across mesh, suede panels, and the midsole without oversaturating the shoe.",
        },
        {
          step: "3",
          label: "Wipe Away Residue",
          desc: "Use a clean microfiber cloth to remove loosened dirt and leftover cleaning solution.",
        },
        {
          step: "4",
          label: "Air Dry Naturally",
          desc: "Let the pair dry at room temperature away from direct heat or sunlight.",
        },
      ],
    
      relatedModels: [
        { name: "Air Max 90", href: "/encyclopedia/air-max-90" },
        { name: "Air Max 97", href: "/encyclopedia/air-max-97" },
        { name: "Air Max 1", href: "/encyclopedia/air-max-1" },
        { name: "Air Force 1", href: "/encyclopedia/air-force-1" },
      ],
    },


    {
      slug: "air-max-97",
      name: "Nike Air Max 97",
      tagline:
        "The futuristic runner that introduced full-length visible Air and became one of Nike’s most recognizable silhouettes.",
    
      brand: "Nike",
      firstRelease: "1997",
      designer: "Christian Tresser",
      retailPrice: "$180–$210",
    
      tier: 2,
    
      images: [
        {
          src: "/encyclopedia/air-max-97/hero.jpg",
          alt: "Nike Air Max 97",
        },
        {
          src: "/encyclopedia/air-max-97/angle-1.jpg",
          alt: "Nike Air Max 97 side view",
        },
        {
          src: "/encyclopedia/air-max-97/angle-2.jpg",
          alt: "Nike Air Max 97 alternate angle",
        },
        {
          src: "/encyclopedia/air-max-97/detail.jpg",
          alt: "Nike Air Max 97 detail view",
        },
      ],
    
      marketSnapshot: {
        title: "Nike Air Max 97 Market Overview",
        demand: "Strong Demand",
        avgResale: "$210",
        trend: "Stable / Active",
        volatility: "Medium",
        liquidity: "Medium–High",
        flipScore: "76 / 100",
        description:
          "The Air Max 97 remains one of Nike’s most recognizable retro runners, with enduring demand driven by the iconic Silver Bullet colorway, global streetwear appeal, and occasional high-performing collaborations.",
      },
    
      history: [
        "Released in 1997, the Nike Air Max 97 pushed the Air Max line into a more futuristic direction with a streamlined upper and full-length visible Air cushioning.",
        "Designer Christian Tresser drew inspiration from high-speed motion, giving the silhouette a fast, fluid look that stood apart from earlier, more layered Air Max models.",
        "The Air Max 97 became especially iconic through its metallic finishes and bold reflective lines, helping define late-1990s Nike design language.",
        "Over time, it grew into a streetwear staple with strong global recognition, especially around OG retros, regional popularity, and fashion-forward styling.",
      ],
    
      designIntro:
        "The Air Max 97 is defined by its wavy upper lines, reflective detailing, and the first full-length visible Air unit in Nike’s flagship Air Max line.",
    
      designBullets: [
        "First full-length visible Air unit in the Air Max line",
        "Rippled upper inspired by speed, motion, and aerodynamic design",
        "Reflective piping that enhances the futuristic visual identity",
        "Mixed-material upper with mesh, synthetic overlays, and metallic finishes",
        "Slim, streamlined shape that made it one of Nike’s most futuristic runners of the 1990s",
      ],
    
      colorways: [
        {
          name: "Silver Bullet",
          note: "The most iconic Air Max 97 colorway and the pair most closely tied to the silhouette’s legacy.",
          market: "Collector favorite",
        },
        {
          name: "Metallic Gold",
          note: "A bold and highly recognizable alternative OG-style colorway.",
          market: "Strong demand",
        },
        {
          name: "Triple White",
          note: "A clean lifestyle-friendly version with broad everyday appeal.",
          market: "Steady market",
        },
        {
          name: "UNDEFEATED Collaboration",
          note: "One of the standout collaboration runs associated with the model.",
          market: "High resale",
        },
      ],
    
      resaleParagraphs: [
        "The Air Max 97 performs best through iconic OG colorways, strong retro storytelling, and notable collaborations. Standard GR pairs usually see more modest resale movement.",
        "From a reseller perspective, the model offers better upside when tied to heritage colorways like Silver Bullet or limited-edition releases rather than routine general releases.",
      ],
    
      resaleHighlights: [
        { label: "Best For", value: "OG colorways & selective collabs" },
        { label: "Risk Level", value: "Moderate" },
        { label: "Reseller Take", value: "Strong heritage appeal with selective upside" },
      ],
    
      resellerInsight: {
        flipScore: "76 / 100",
        liquidity: "Medium–High",
        typicalMargin: "Moderate",
        bestUse: "OG retros & premium collabs",
        bullets: [
          "Silver Bullet remains the key benchmark pair for long-term demand.",
          "Collaborations and premium executions can outperform standard lifestyle releases.",
          "More of a heritage-driven resale model than a constant hype sneaker.",
        ],
      },
    
      cta: {
        eyebrow: "Live Market Tool",
        title: "Scan Any Air Max 97 Colorway Live",
        description:
          "Use SneakPrice to check live resale value, compare demand, and surface market opportunities across Air Max 97 colorways.",
        primaryHref: "/",
        primaryLabel: "Scan it with SneakPrice →",
        secondaryHref: "/exchange",
        secondaryLabel: "Open market tools",
        bullets: [
          "View live resale signals",
          "Track profitable flips",
          "Compare demand and momentum instantly",
        ],
      },
    
      careIntro: [
        "The Air Max 97 benefits from careful cleaning because reflective piping, mesh underlays, and metallic finishes can show wear quickly.",
        "Extra attention should be given to the upper’s layered curves and visible Air sole unit to preserve the model’s clean futuristic look.",
      ],
    
      careTools: [
        {
          label: "Soft-bristle Brush",
          desc: "Useful for cleaning mesh panels and upper curves without damaging the surface.",
        },
        {
          label: "Microfiber Cloth",
          desc: "Helps wipe away dirt gently and works especially well on metallic or smooth synthetic areas.",
        },
        {
          label: "Sneaker Cleaning Solution",
          desc: "A sneaker-safe cleaner helps preserve the upper while removing built-up grime.",
        },
        {
          label: "Warm Water",
          desc: "Useful for loosening dirt without exposing the pair to harsh cleaning conditions.",
        },
        {
          label: "Protective Spray",
          desc: "Helps guard the upper against stains and light moisture, especially on lighter colorways.",
        },
      ],
    
      carePrep: [
        {
          step: "1",
          label: "Remove Laces",
          desc: "Take out the laces so you can fully access the tongue, lace loops, and upper panels.",
        },
        {
          step: "2",
          label: "Dry Brush the Upper",
          desc: "Remove loose dust and debris before applying any water or cleaning solution.",
        },
      ],
    
      careCleaning: [
        {
          step: "1",
          label: "Prepare the Cleaner",
          desc: "Mix warm water with a sneaker-safe cleaning solution in a small bowl.",
        },
        {
          step: "2",
          label: "Clean in Gentle Motions",
          desc: "Use soft circular motions across mesh, reflective lines, and synthetic overlays without oversaturating the upper.",
        },
        {
          step: "3",
          label: "Wipe Away Residue",
          desc: "Use a clean microfiber cloth to remove loosened dirt and leftover solution.",
        },
        {
          step: "4",
          label: "Air Dry Naturally",
          desc: "Let the pair dry at room temperature away from direct heat or strong sunlight.",
        },
      ],
    
      relatedModels: [
        { name: "Air Max 95", href: "/encyclopedia/air-max-95" },
        { name: "Air Max 90", href: "/encyclopedia/air-max-90" },
        { name: "Air Max 1", href: "/encyclopedia/air-max-1" },
        { name: "Nike Zoom Vomero 5", href: "/encyclopedia/nike-zoom-vomero-5" },
      ],
    },




    {
      slug: "adidas-superstar",
      name: "Adidas Superstar",
      tagline:
        "The shell-toe icon that moved from hardwood performance to global streetwear legend and became one of Adidas’ most enduring silhouettes.",
    
      brand: "Adidas",
      firstRelease: "1969",
      designer: "Adidas",
      retailPrice: "$100–$130",
    
      tier: 1,
    
      images: [
        {
          src: "/encyclopedia/adidas-superstar/hero.jpg",
          alt: "Adidas Superstar white black shell toe",
        },
        {
          src: "/encyclopedia/adidas-superstar/angle-1.jpg",
          alt: "Adidas Superstar side view",
        },
        {
          src: "/encyclopedia/adidas-superstar/angle-2.jpg",
          alt: "Adidas Superstar black white profile",
        },
        {
          src: "/encyclopedia/adidas-superstar/detail.jpg",
          alt: "Adidas Superstar shell toe detail",
        },
        {
          src: "/encyclopedia/adidas-superstar/on-feet.jpg",
          alt: "Adidas Superstar on feet streetwear",
        },
        {
          src: "/encyclopedia/adidas-superstar/top.jpg",
          alt: "Adidas Superstar top view",
        },
      ],
    
      marketSnapshot: {
        title: "Adidas Superstar Market Overview",
        demand: "Stable Demand",
        avgResale: "$120",
        trend: "Stable / Neutral",
        volatility: "Low",
        liquidity: "High",
        flipScore: "64 / 100",
        description:
          "The Adidas Superstar remains one of the most recognizable sneakers ever made. Standard pairs usually trade close to retail, while collaborations and limited editions generate the strongest market movement.",
      },
    
      history: [
        "Originally introduced in 1969 as a low-top basketball shoe, the Adidas Superstar quickly gained attention for its leather upper and distinctive rubber shell toe.",
        "It became one of the first widely adopted leather basketball sneakers, helping Adidas build credibility on the court during the 1970s.",
        "Its true cultural explosion came in the 1980s, when the Superstar was embraced by hip-hop — most famously by Run-D.M.C., who helped transform it from sports product into streetwear icon.",
        "Since then, the Superstar has remained a global staple across music, fashion, and everyday wear, making it one of the most enduring silhouettes in sneaker history.",
      ],
    
      designIntro:
        "The Adidas Superstar is defined by its iconic rubber shell toe, clean leather build, and timeless low-top shape that helped bridge performance footwear and street culture.",
    
      designBullets: [
        "Signature rubber shell toe for protection and unmistakable identity",
        "Leather upper with classic Three Stripes branding",
        "Low-top silhouette with broad lifestyle versatility",
        "Herringbone-pattern outsole for grip and durability",
        "Simple panel construction that made the model easy to wear across eras and styles",
      ],
    
      colorways: [
        {
          name: "White / Black",
          note: "The definitive OG-style Adidas Superstar colorway and the pair most associated with the model’s legacy.",
          market: "Classic staple",
        },
        {
          name: "Triple White",
          note: "A clean minimalist version popular for everyday wear.",
          market: "Steady demand",
        },
        {
          name: "Run-D.M.C. Edition",
          note: "A heritage-driven version tied directly to the silhouette’s hip-hop legacy.",
          market: "Collector interest",
        },
        {
          name: "Pharrell and premium collaborations",
          note: "Special editions that bring stronger hype and resale energy than standard releases.",
          market: "Selective upside",
        },
      ],
    
      resaleParagraphs: [
        "The Adidas Superstar is generally a stability-driven sneaker rather than a high-margin resale model. Standard GR pairs usually trade near retail due to broad availability.",
        "Where the Superstar becomes more interesting from a reseller perspective is through collaboration projects, premium executions, and culturally significant anniversary releases.",
      ],
    
      resaleHighlights: [
        { label: "Best For", value: "Classic staple & selective collabs" },
        { label: "Risk Level", value: "Low" },
        { label: "Reseller Take", value: "More dependable than explosive" },
      ],
    
      resellerInsight: {
        flipScore: "64 / 100",
        liquidity: "High",
        typicalMargin: "Low–Moderate",
        bestUse: "Fast-moving classic & collab targeting",
        bullets: [
          "Standard pairs are driven more by consistency than hype.",
          "Collaborations and heritage-themed editions create the strongest upside.",
          "A timeless model with reliable recognition but limited GR resale expansion.",
        ],
      },
    
      cta: {
        eyebrow: "Live Market Tool",
        title: "Scan Any Adidas Superstar Colorway Live",
        description:
          "Use SneakPrice to check live resale value, compare demand, and spot market opportunities across Adidas Superstar pairs.",
        primaryHref: "/",
        primaryLabel: "Scan it with SneakPrice →",
        secondaryHref: "/exchange",
        secondaryLabel: "Open market tools",
        bullets: [
          "View live resale signals",
          "Track profitable flips",
          "Compare demand instantly",
        ],
      },
    
      careIntro: [
        "The Adidas Superstar is relatively easy to maintain, but the leather upper and rubber shell toe both benefit from regular cleaning to keep the pair looking sharp.",
        "White-based colorways especially need routine care, since scuffs, dirt, and sole discoloration can show quickly on the shell toe and sidewalls.",
      ],
    
      careTools: [
        {
          label: "Soft-bristle Brush",
          desc: "Useful for removing loose dirt from the upper, outsole, and shell toe without scratching the surface.",
        },
        {
          label: "Microfiber Cloth",
          desc: "Helps wipe down leather and rubber areas gently after cleaning.",
        },
        {
          label: "Sneaker Cleaning Solution",
          desc: "A sneaker-safe cleaner helps remove grime from leather and shell toe surfaces effectively.",
        },
        {
          label: "Warm Water",
          desc: "Useful for loosening dirt while keeping the cleaning process gentle.",
        },
        {
          label: "Magic Eraser or Rubber Cleaner",
          desc: "Especially helpful for restoring the shell toe and midsole edges on white pairs.",
        },
      ],
    
      carePrep: [
        {
          step: "1",
          label: "Remove Laces",
          desc: "Take out the laces so you can fully access the tongue and eyelet area.",
        },
        {
          step: "2",
          label: "Dry Brush First",
          desc: "Brush away loose dirt and dust before using water or cleaning solution.",
        },
      ],
    
      careCleaning: [
        {
          step: "1",
          label: "Prepare the Cleaner",
          desc: "Mix warm water with a sneaker-safe cleaning solution in a small bowl.",
        },
        {
          step: "2",
          label: "Clean the Leather and Shell Toe",
          desc: "Use gentle circular motions across the leather panels and rubber shell toe without oversaturating the shoe.",
        },
        {
          step: "3",
          label: "Wipe Away Residue",
          desc: "Use a clean microfiber cloth to remove loosened dirt and leftover solution.",
        },
        {
          step: "4",
          label: "Air Dry Naturally",
          desc: "Let the pair dry at room temperature away from direct heat or strong sunlight.",
        },
      ],
    
      relatedModels: [
        { name: "Adidas Samba", href: "/encyclopedia/adidas-samba" },
        { name: "Adidas Gazelle", href: "/encyclopedia/adidas-gazelle" },
        { name: "Air Force 1", href: "/encyclopedia/air-force-1" },
        { name: "Puma Suede Classic", href: "/encyclopedia/puma-suede-classic" },
      ],
    },




    {
      slug: "adidas-stan-smith",
      name: "Adidas Stan Smith",
      tagline:
        "The minimalist tennis icon that became one of the most recognizable white sneakers ever made, blending clean design with decades of crossover appeal.",
    
      brand: "Adidas",
      firstRelease: "1971",
      designer: "Adidas",
      retailPrice: "$100–$130",
    
      tier: 1,
    
      images: [
        {
          src: "/encyclopedia/adidas-stan-smith/hero.jpg",
          alt: "Adidas Stan Smith classic side view",
        },
        {
          src: "/encyclopedia/adidas-stan-smith/angle-1.jpg",
          alt: "Adidas Stan Smith alternate side profile",
        },
        {
          src: "/encyclopedia/adidas-stan-smith/angle-2.jpg",
          alt: "Adidas Stan Smith heel angle",
        },
        {
          src: "/encyclopedia/adidas-stan-smith/detail.jpg",
          alt: "Adidas Stan Smith heel tab detail",
        },
        {
          src: "/encyclopedia/adidas-stan-smith/top.jpg",
          alt: "Adidas Stan Smith top view",
        },
        {
          src: "/encyclopedia/adidas-stan-smith/sole.jpg",
          alt: "Adidas Stan Smith outsole detail",
        },
      ],
    
      marketSnapshot: {
        title: "Adidas Stan Smith Market Overview",
        demand: "Stable Demand",
        avgResale: "$115",
        trend: "Stable / Neutral",
        volatility: "Low",
        liquidity: "High",
        flipScore: "60 / 100",
        description:
          "The Adidas Stan Smith is one of the most recognizable lifestyle sneakers on the market. Core pairs usually trade close to retail, while premium versions and collaborations create the strongest resale movement.",
      },
    
      history: [
        "The Stan Smith emerged from Adidas’ tennis line in the early 1970s and went on to become one of the brand’s most iconic low-top sneakers.",
        "Its simple leather construction, clean profile, and athlete-linked branding helped it stand apart from bulkier performance shoes of its era.",
        "Over time, the Stan Smith moved beyond tennis and became a fashion staple, embraced for its versatility and minimalist look.",
        "Today, it remains one of Adidas’ defining silhouettes, with broad appeal across casual wear, fashion, and heritage sneaker culture.",
      ],
    
      designIntro:
        "The Adidas Stan Smith is defined by its minimalist leather upper, perforated Three Stripes, portrait-branded tongue, and simple low-top shape that helped set the template for countless clean lifestyle sneakers.",
    
      designBullets: [
        "Smooth leather upper with clean low-profile construction",
        "Perforated Three Stripes instead of stitched side branding",
        "Stan Smith portrait and branding on the tongue label",
        "Green heel tab on the classic white-and-green version",
        "Simple cupsole and textured outsole built for easy everyday wear",
      ],
    
      colorways: [
        {
          name: "White / Green",
          note: "The definitive Stan Smith colorway and the pair most closely tied to the model’s identity.",
          market: "Classic staple",
        },
        {
          name: "Triple White",
          note: "A clean minimalist take with broad everyday appeal.",
          market: "Steady demand",
        },
        {
          name: "Lux / Premium Editions",
          note: "Higher-end leather versions that elevate materials and presentation.",
          market: "Selective upside",
        },
        {
          name: "Collaboration Releases",
          note: "Special projects that bring stronger collector interest than standard GR pairs.",
          market: "Higher resale",
        },
      ],
    
      resaleParagraphs: [
        "The Stan Smith is primarily a stability-driven lifestyle model rather than a major hype sneaker. Standard pairs usually trade around retail because of broad availability and steady mainstream demand.",
        "Resale upside is stronger on premium leather versions, fashion collaborations, and limited heritage releases than on standard everyday pairs.",
      ],
    
      resaleHighlights: [
        { label: "Best For", value: "Classic staple & premium editions" },
        { label: "Risk Level", value: "Low" },
        { label: "Reseller Take", value: "Reliable staple with selective upside" },
      ],
    
      resellerInsight: {
        flipScore: "60 / 100",
        liquidity: "High",
        typicalMargin: "Low–Moderate",
        bestUse: "Fast-moving staple & selective collabs",
        bullets: [
          "Core pairs are driven more by consistency than hype.",
          "Premium material upgrades can perform better than standard GR releases.",
          "Collabs and fashion-linked versions create the best upside.",
        ],
      },
    
      cta: {
        eyebrow: "Live Market Tool",
        title: "Scan Any Adidas Stan Smith Colorway Live",
        description:
          "Use SneakPrice to check live resale value, compare demand, and spot market opportunities across Adidas Stan Smith pairs.",
        primaryHref: "/",
        primaryLabel: "Scan it with SneakPrice →",
        secondaryHref: "/exchange",
        secondaryLabel: "Open market tools",
        bullets: [
          "View live resale signals",
          "Track profitable flips",
          "Compare demand instantly",
        ],
      },
    
      careIntro: [
        "The Stan Smith is easy to maintain, but white leather pairs need regular cleaning to keep the upper, midsole, and heel tab looking fresh.",
        "The clean shape is part of the appeal, so even light scuffs and dirt can stand out quickly on classic white-and-green pairs.",
      ],
    
      careTools: [
        {
          label: "Soft-bristle Brush",
          desc: "Useful for removing loose dirt from leather, outsole edges, and seams without scratching the surface.",
        },
        {
          label: "Microfiber Cloth",
          desc: "Helps wipe down leather panels and dry the shoe gently after cleaning.",
        },
        {
          label: "Sneaker Cleaning Solution",
          desc: "A sneaker-safe cleaner helps remove surface grime while preserving the leather upper.",
        },
        {
          label: "Warm Water",
          desc: "Useful for loosening dirt without making the shoe overly wet.",
        },
        {
          label: "Magic Eraser or Rubber Cleaner",
          desc: "Especially useful for cleaning the midsole and restoring the crisp white look.",
        },
      ],
    
      carePrep: [
        {
          step: "1",
          label: "Remove Laces",
          desc: "Take out the laces so you can fully access the tongue and eyelet area.",
        },
        {
          step: "2",
          label: "Dry Brush First",
          desc: "Brush away loose dirt and dust before applying any water or cleaner.",
        },
      ],
    
      careCleaning: [
        {
          step: "1",
          label: "Prepare the Cleaner",
          desc: "Mix warm water with a sneaker-safe cleaning solution in a small bowl.",
        },
        {
          step: "2",
          label: "Clean the Leather Panels",
          desc: "Use gentle circular motions across the leather upper, heel tab, and midsole without oversaturating the pair.",
        },
        {
          step: "3",
          label: "Wipe Away Residue",
          desc: "Use a clean microfiber cloth to remove loosened dirt and leftover solution.",
        },
        {
          step: "4",
          label: "Air Dry Naturally",
          desc: "Let the pair dry at room temperature away from direct heat and strong sunlight.",
        },
      ],
    
      relatedModels: [
        { name: "Adidas Superstar", href: "/encyclopedia/adidas-superstar" },
        { name: "Adidas Samba", href: "/encyclopedia/adidas-samba" },
        { name: "Adidas Gazelle", href: "/encyclopedia/adidas-gazelle" },
        { name: "Air Force 1", href: "/encyclopedia/air-force-1" },
      ],
    },



    {
      slug: "asics-gel-kayano",
      name: "ASICS Gel-Kayano",
      tagline:
        "The stability-running icon that fused long-distance support, GEL cushioning, and technical design into one of ASICS’ most respected performance franchises.",
    
      brand: "ASICS",
      firstRelease: "1993",
      designer: "Toshikazu Kayano",
      retailPrice: "$160–$220",
    
      tier: 1,
    
      images: [
        {
          src: "/encyclopedia/asics-gel-kayano/hero.jpg",
          alt: "ASICS Gel-Kayano side view",
        },
        {
          src: "/encyclopedia/asics-gel-kayano/angle-1.jpg",
          alt: "ASICS Gel-Kayano alternate profile",
        },
        {
          src: "/encyclopedia/asics-gel-kayano/angle-2.jpg",
          alt: "ASICS Gel-Kayano retro angle",
        },
        {
          src: "/encyclopedia/asics-gel-kayano/detail.jpg",
          alt: "ASICS Gel-Kayano heel cushioning detail",
        },
        {
          src: "/encyclopedia/asics-gel-kayano/top.jpg",
          alt: "ASICS Gel-Kayano top view",
        },
        {
          src: "/encyclopedia/asics-gel-kayano/sole.jpg",
          alt: "ASICS Gel-Kayano outsole detail",
        },
      ],
    
      marketSnapshot: {
        title: "ASICS Gel-Kayano Market Overview",
        demand: "Strong Demand",
        avgResale: "$185",
        trend: "Stable / Active",
        volatility: "Medium",
        liquidity: "Medium–High",
        flipScore: "74 / 100",
        description:
          "The Gel-Kayano line blends serious running credibility with growing lifestyle relevance. Standard performance pairs usually trade near retail, while retro-driven models like the Gel-Kayano 14 and selective collaborations create stronger market movement.",
      },
    
      history: [
        "First released in 1993, the Gel-Kayano was developed as a supportive long-distance running shoe aimed at delivering comfort, protection, and structure for overpronating runners.",
        "The series was named after its designer, Toshikazu Kayano, and quickly became one of ASICS’ most important performance franchises.",
        "Across decades of updates, the Gel-Kayano has remained closely associated with stability running, evolving its foam, support systems, and cushioning while keeping the franchise identity intact.",
        "More recently, retro-inspired entries such as the Gel-Kayano 14 helped expand the line’s visibility beyond pure performance running and into broader sneaker and fashion culture.",
      ],
    
      designIntro:
        "The Gel-Kayano is defined by its stability-focused platform, GEL cushioning heritage, and layered technical upper language that made it a staple in serious running and, later, retro-running style.",
    
      designBullets: [
        "Stability-oriented running platform designed for support and guidance",
        "GEL cushioning technology for impact absorption",
        "Long-distance comfort focus across the franchise",
        "Technical layered upper language that evolved with each generation",
        "Performance roots with growing retro and lifestyle crossover appeal",
      ],
    
      colorways: [
        {
          name: "White / Pure Silver",
          note: "A clean technical runner look that fits both performance and lifestyle styling.",
          market: "Strong demand",
        },
        {
          name: "Cream / Silver Retro Styles",
          note: "Popular on retro-oriented Gel-Kayano releases, especially lifestyle-friendly versions.",
          market: "Lifestyle favorite",
        },
        {
          name: "Core Running Editions",
          note: "Standard line colorways focused more on function than hype.",
          market: "Steady market",
        },
        {
          name: "Selective Collaborations",
          note: "Special projects and fashion-linked pairs can significantly outperform regular releases.",
          market: "Higher resale",
        },
      ],
    
      resaleParagraphs: [
        "The Gel-Kayano is a mixed resale model. Performance-oriented general releases usually stay close to retail, but retro lifestyle versions and collaborations can generate meaningfully stronger demand.",
        "From a reseller perspective, the biggest upside tends to come from retro-heavy Gel-Kayano models, fashion relevance, and limited collaborative drops rather than standard technical running pairs.",
      ],
    
      resaleHighlights: [
        { label: "Best For", value: "Retro lifestyle pairs & selective collabs" },
        { label: "Risk Level", value: "Moderate" },
        { label: "Reseller Take", value: "Performance heritage with growing lifestyle upside" },
      ],
    
      resellerInsight: {
        flipScore: "74 / 100",
        liquidity: "Medium–High",
        typicalMargin: "Moderate",
        bestUse: "Retro runners & selective collaboration flips",
        bullets: [
          "Core performance pairs are more stable than explosive in resale.",
          "Retro-driven Gel-Kayano models have broadened the franchise’s market appeal.",
          "Collaborations and strong neutral colorways usually provide the best upside.",
        ],
      },
    
      cta: {
        eyebrow: "Live Market Tool",
        title: "Scan Any ASICS Gel-Kayano Colorway Live",
        description:
          "Use SneakPrice to check live resale value, compare demand, and spot market opportunities across ASICS Gel-Kayano pairs.",
        primaryHref: "/",
        primaryLabel: "Scan it with SneakPrice →",
        secondaryHref: "/exchange",
        secondaryLabel: "Open market tools",
        bullets: [
          "View live resale signals",
          "Track profitable flips",
          "Compare demand instantly",
        ],
      },
    
      careIntro: [
        "The Gel-Kayano benefits from careful cleaning because mesh, synthetic overlays, and technical midsoles can show dirt quickly.",
        "Performance pairs and retro lifestyle pairs both look best when the upper stays clean and the cushioning areas are kept free of heavy grime buildup.",
      ],
    
      careTools: [
        {
          label: "Soft-bristle Brush",
          desc: "Useful for removing dirt from mesh panels and technical overlays without damaging the upper.",
        },
        {
          label: "Microfiber Cloth",
          desc: "Helps wipe down synthetic surfaces and dry the pair gently after cleaning.",
        },
        {
          label: "Sneaker Cleaning Solution",
          desc: "A sneaker-safe cleaner helps remove grime while protecting mixed materials.",
        },
        {
          label: "Warm Water",
          desc: "Useful for loosening dirt without exposing the shoe to harsh cleaning conditions.",
        },
        {
          label: "Protective Spray",
          desc: "Helps defend lighter colorways against stains and light moisture.",
        },
      ],
    
      carePrep: [
        {
          step: "1",
          label: "Remove Laces",
          desc: "Take out the laces so you can fully access the tongue and eyelet area.",
        },
        {
          step: "2",
          label: "Dry Brush First",
          desc: "Brush away loose dirt and dust before applying any water or cleaner.",
        },
      ],
    
      careCleaning: [
        {
          step: "1",
          label: "Prepare the Cleaner",
          desc: "Mix warm water with a sneaker-safe cleaning solution in a small bowl.",
        },
        {
          step: "2",
          label: "Clean Gently by Section",
          desc: "Use soft circular motions across mesh, overlays, and the midsole without oversaturating the upper.",
        },
        {
          step: "3",
          label: "Wipe Away Residue",
          desc: "Use a clean microfiber cloth to remove loosened dirt and leftover solution.",
        },
        {
          step: "4",
          label: "Air Dry Naturally",
          desc: "Let the pair dry at room temperature away from direct heat or strong sunlight.",
        },
      ],
    
      relatedModels: [
        { name: "ASICS Gel-Lyte III", href: "/encyclopedia/asics-gel-lyte-iii" },
        { name: "New Balance 990v3", href: "/encyclopedia/new-balance-990v3" },
        { name: "Nike Zoom Vomero 5", href: "/encyclopedia/nike-zoom-vomero-5" },
        { name: "Salomon XT-6", href: "/encyclopedia/salomon-xt-6" },
      ],
    },




    {
      slug: "blazer-mid",
      name: "Nike Blazer Mid",
      tagline:
        "One of Nike’s earliest basketball sneakers, the Blazer Mid has evolved into a timeless lifestyle staple defined by its clean design, vintage feel, and everyday versatility.",
    
      brand: "Nike",
      firstRelease: "1973",
      designer: "Nike Design Team",
      retailPrice: "$100–$120",
    
      tier: 1,
    
      images: [
        {
          src: "/encyclopedia/blazer-mid/hero.jpg",
          alt: "Nike Blazer Mid",
        },
        {
          src: "/encyclopedia/blazer-mid/angle-1.jpg",
          alt: "Nike Blazer Mid side view",
        },
        {
          src: "/encyclopedia/blazer-mid/angle-2.jpg",
          alt: "Nike Blazer Mid alternate angle",
        },
        {
          src: "/encyclopedia/blazer-mid/detail.jpg",
          alt: "Nike Blazer Mid detail view",
        },
      ],
    
      marketSnapshot: {
        title: "Nike Blazer Mid Market Overview",
        demand: "Consistent Demand",
        avgResale: "$90–$150",
        trend: "Stable",
        volatility: "Low",
        liquidity: "High",
        flipScore: "52 / 100",
        description:
          "The Blazer Mid is a stable, everyday sneaker with consistent demand driven by its simplicity and versatility. While general releases rarely generate strong resale, collaborations and limited editions can perform significantly better.",
      },
    
      history: [
        "The Nike Blazer debuted in 1973 as one of Nike’s first basketball sneakers, named after the Portland Trail Blazers.",
        "Originally worn by NBA players, the Blazer quickly became known for its simple leather construction and bold Swoosh branding.",
        "By the 1980s, the silhouette was phased out of performance basketball but remained popular in casual and skate communities.",
        "Its revival in the 2000s as a lifestyle sneaker cemented the Blazer Mid as a timeless staple across streetwear and fashion.",
      ],
    
      designIntro:
        "The Blazer Mid is defined by its minimalist construction, vintage basketball DNA, and clean silhouette that transitions easily between casual and streetwear styling.",
    
      designBullets: [
        "Classic leather or suede upper with clean paneling",
        "Oversized Swoosh for bold visual identity",
        "Vulcanized rubber sole for flexibility and durability",
        "Exposed foam tongue on vintage models",
        "Slim, streamlined profile compared to modern sneakers",
      ],
    
      colorways: [
        {
          name: "White / Black",
          note: "The most iconic and versatile Blazer Mid colorway",
          market: "Everyday staple",
        },
        {
          name: "Sail Vintage",
          note: "A retro-inspired version with aged midsole detailing",
          market: "Strong lifestyle demand",
        },
        {
          name: "Black / White",
          note: "A clean reverse look with wide appeal",
          market: "Stable",
        },
        {
          name: "Off-White Collaboration",
          note: "Virgil Abloh’s reimagined Blazer with exposed details",
          market: "High resale",
        },
      ],
    
      resaleParagraphs: [
        "The Blazer Mid is not a hype-driven resale sneaker, with most general releases staying close to or below retail due to high supply and consistent availability.",
        "However, collaborations and limited-edition releases—especially from high-profile partners—can generate strong resale performance and collector demand.",
      ],
    
      resaleHighlights: [
        { label: "Best For", value: "Everyday wear & selective collaborations" },
        { label: "Risk Level", value: "Low" },
        { label: "Reseller Take", value: "Limited upside outside of collabs" },
      ],
    
      resellerInsight: {
        flipScore: "52 / 100",
        liquidity: "High",
        typicalMargin: "Low",
        bestUse: "Personal wear & selective collab flips",
        bullets: [
          "General releases rarely offer strong resale margins.",
          "Collaborations can significantly outperform standard pairs.",
          "A reliable model for consistent demand but not high-profit flipping.",
        ],
      },
    
      cta: {
        eyebrow: "Live Market Tool",
        title: "Scan Any Blazer Mid Colorway Live",
        description:
          "Use SneakPrice to check live resale value, track demand trends, and identify potential opportunities across Blazer Mid releases.",
        primaryHref: "/",
        primaryLabel: "Scan it with SneakPrice →",
        secondaryHref: "/exchange",
        secondaryLabel: "Open market tools",
        bullets: [
          "View live resale signals",
          "Compare pricing across marketplaces",
          "Track demand and stability instantly",
        ],
      },
    
      careIntro: [
        "The Blazer Mid is easy to maintain due to its simple construction, but leather and suede versions require regular care to keep them looking clean.",
        "Vintage models with exposed foam and lighter tones benefit from extra attention to avoid discoloration over time.",
      ],
    
      careTools: [
        {
          label: "Soft-bristle Brush",
          desc: "Ideal for removing dirt from leather and suede without causing damage.",
        },
        {
          label: "Microfiber Cloth",
          desc: "Helps wipe away dirt and moisture gently.",
        },
        {
          label: "Sneaker Cleaning Solution",
          desc: "Safe for leather, suede, and rubber surfaces.",
        },
        {
          label: "Warm Water",
          desc: "Used to dilute cleaning solution and lift dirt effectively.",
        },
        {
          label: "Suede Eraser",
          desc: "Useful for maintaining suede panels and removing marks.",
        },
      ],
    
      carePrep: [
        {
          step: "1",
          label: "Remove Laces",
          desc: "Take out laces to clean the tongue and upper thoroughly.",
        },
        {
          step: "2",
          label: "Dry Brush",
          desc: "Brush off loose dirt before applying any cleaning solution.",
        },
      ],
    
      careCleaning: [
        {
          step: "1",
          label: "Mix Cleaning Solution",
          desc: "Combine warm water with a sneaker-safe cleaner.",
        },
        {
          step: "2",
          label: "Clean Upper Gently",
          desc: "Use soft circular motions across leather or suede areas.",
        },
        {
          step: "3",
          label: "Wipe Down",
          desc: "Remove excess solution with a clean microfiber cloth.",
        },
        {
          step: "4",
          label: "Air Dry",
          desc: "Allow the sneakers to dry naturally away from direct heat.",
        },
      ],
    
      relatedModels: [
        { name: "Blazer Low", href: "/encyclopedia/blazer-low" },
        { name: "Dunk High", href: "/encyclopedia/dunk-high" },
        { name: "Air Force 1", href: "/encyclopedia/air-force-1" },
        { name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" },
      ],
    },



    /** Brooks Ghost * */

    {
      slug: "brooks-ghost",
      name: "Brooks Ghost",
      tagline:
        "A dependable neutral daily trainer, the Brooks Ghost built its reputation on soft cushioning, smooth transitions, and an easygoing ride that works for runners, walkers, and all-day wear alike.",
    
      brand: "Brooks",
      firstRelease: "2008",
      designer: "Brooks Running Design Team",
      retailPrice: "$140–$160",
    
      tier: 1,
    
      images: [
        {
          src: "/encyclopedia/brooks-ghost/hero.jpg",
          alt: "Brooks Ghost",
        },
        {
          src: "/encyclopedia/brooks-ghost/angle-1.jpg",
          alt: "Brooks Ghost side view",
        },
        {
          src: "/encyclopedia/brooks-ghost/angle-2.jpg",
          alt: "Brooks Ghost alternate angle",
        },
        {
          src: "/encyclopedia/brooks-ghost/detail.jpg",
          alt: "Brooks Ghost detail view",
        },
      ],
    
      marketSnapshot: {
        title: "Brooks Ghost Market Overview",
        demand: "Consistent Demand",
        avgResale: "$70–$130",
        trend: "Stable",
        volatility: "Low",
        liquidity: "Medium",
        flipScore: "38 / 100",
        description:
          "The Brooks Ghost is a high-volume performance runner with steady demand in the everyday running and walking market. Most pairs behave like practical wear pairs rather than collectible sneakers, so resale is usually modest outside of special editions or hard-to-find sizes.",
      },
    
      history: [
        "The Brooks Ghost debuted in 2008 and gradually became one of the brand’s signature neutral daily trainers.",
        "Over time, the Ghost line built a reputation for balanced cushioning, comfort, and a smooth ride that appealed to runners at many experience levels.",
        "Brooks continued evolving the line through repeated annual updates, using runner feedback to refine fit, transitions, and underfoot feel.",
        "Modern Ghost models sit at the center of Brooks’ running lineup as versatile road shoes that also cross over well into walking and casual everyday use.",
      ],
    
      designIntro:
        "The Brooks Ghost is defined by its soft cushioning, comfortable upper, and smooth heel-to-toe ride, making it one of the most approachable daily trainers in performance running.",
    
      designBullets: [
        "Neutral daily trainer built for road running and walking",
        "Soft cushioned platform designed for comfort over long mileage",
        "Smooth heel-to-toe transitions for an easy, distraction-free ride",
        "Breathable engineered upper with structured everyday fit",
        "Consistent, dependable design philosophy across many generations",
      ],
    
      colorways: [
        {
          name: "Black / White",
          note: "A versatile staple often used for both running and everyday wear",
          market: "Stable",
        },
        {
          name: "Grey / Blue",
          note: "A classic performance-runner palette common across Ghost releases",
          market: "Consistent",
        },
        {
          name: "White / Silver",
          note: "Clean neutral option with crossover casual appeal",
          market: "Steady demand",
        },
        {
          name: "Seasonal Limited Editions",
          note: "Occasional color updates and special packs add short-term interest",
          market: "Selective",
        },
      ],
    
      resaleParagraphs: [
        "The Brooks Ghost is not a hype resale model. Most pairs depreciate after release because the line is produced at scale and purchased primarily for performance, comfort, and daily wear.",
        "From a reseller perspective, the Ghost behaves more like a practical footwear product than a collectible sneaker. Limited editions and uncommon colorways may hold value better, but standard pairs are usually strongest for personal wear rather than flipping.",
      ],
    
      resaleHighlights: [
        { label: "Best For", value: "Daily wear, running, and comfort-focused buyers" },
        { label: "Risk Level", value: "Low" },
        { label: "Reseller Take", value: "Minimal flip upside outside selective releases" },
      ],
    
      resellerInsight: {
        flipScore: "38 / 100",
        liquidity: "Medium",
        typicalMargin: "Low",
        bestUse: "Personal wear & selective niche resale",
        bullets: [
          "General releases usually sit below or near retail on the secondary market.",
          "Demand is driven more by function and comfort than by hype.",
          "Best suited for wearers, with only occasional niche upside for special editions.",
        ],
      },
    
      cta: {
        eyebrow: "Live Market Tool",
        title: "Scan Any Brooks Ghost Pair Live",
        description:
          "Use SneakPrice to compare current resale value, check pricing across marketplaces, and track demand on Brooks Ghost releases.",
        primaryHref: "/",
        primaryLabel: "Scan it with SneakPrice →",
        secondaryHref: "/exchange",
        secondaryLabel: "Open market tools",
        bullets: [
          "Compare resale pricing instantly",
          "Track performance-runner demand",
          "Spot selective opportunities across Ghost versions",
        ],
      },
    
      careIntro: [
        "The Brooks Ghost is built as a daily trainer, so it benefits from regular cleaning to keep mesh uppers, midsoles, and outsoles looking fresh.",
        "Because many Ghost pairs use breathable engineered mesh and soft foam, gentle cleaning is the best way to preserve both appearance and comfort.",
      ],
    
      careTools: [
        {
          label: "Soft-bristle Brush",
          desc: "Useful for removing dirt from mesh uppers and outsole grooves without damaging the material.",
        },
        {
          label: "Microfiber Cloth",
          desc: "Helps wipe away residue and dry the shoe gently after cleaning.",
        },
        {
          label: "Sneaker Cleaning Solution",
          desc: "A mild cleaner works well on mesh, midsoles, and rubber outsoles.",
        },
        {
          label: "Warm Water",
          desc: "Helps loosen dirt while keeping the cleaning process gentle.",
        },
        {
          label: "Stuffing Paper or Shoe Trees",
          desc: "Helps the pair keep its shape while drying naturally.",
        },
      ],
    
      carePrep: [
        {
          step: "1",
          label: "Remove Laces",
          desc: "Take out the laces so you can clean the tongue and eyelet area properly.",
        },
        {
          step: "2",
          label: "Brush Off Dry Dirt",
          desc: "Use a soft brush first to remove loose debris before adding water or cleaner.",
        },
      ],
    
      careCleaning: [
        {
          step: "1",
          label: "Mix Cleaning Solution",
          desc: "Combine warm water with a mild sneaker-safe cleaner.",
        },
        {
          step: "2",
          label: "Clean Mesh and Midsole Gently",
          desc: "Use soft circular motions across the upper and midsole without soaking the shoe.",
        },
        {
          step: "3",
          label: "Wipe Away Residue",
          desc: "Use a microfiber cloth to remove leftover cleaner and loosened dirt.",
        },
        {
          step: "4",
          label: "Air Dry Naturally",
          desc: "Let the shoes dry at room temperature away from direct sun or heat sources.",
        },
      ],
    
      relatedModels: [
        { name: "Brooks Glycerin", href: "/encyclopedia/brooks-glycerin" },
        { name: "Brooks Adrenaline GTS", href: "/encyclopedia/brooks-adrenaline-gts" },
        { name: "Nike Pegasus", href: "/encyclopedia/nike-pegasus" },
        { name: "ASICS Gel-Nimbus", href: "/encyclopedia/asics-gel-nimbus" },
      ],
    },




/* Bottega Veneta Speedster */

    {
      slug: "bottega-veneta-speedster",
      name: "Bottega Veneta Speedster",
      tagline:
        "A luxury knit sneaker blending high-fashion craftsmanship with minimalist design, the Bottega Veneta Speedster delivers understated performance-inspired aesthetics with premium materials.",
    
      brand: "Bottega Veneta",
      firstRelease: "Late 2010s",
      designer: "Bottega Veneta Design Team",
      retailPrice: "$750–$950",
    
      tier: 3,
    
      images: [ {
        src: "/encyclopedia/bottega-veneta-speedster/hero.jpg",
        alt: "Bottega Veneta Speedster",
      },],
    
      marketSnapshot: {
        title: "Bottega Veneta Speedster Market Overview",
        demand: "Niche Luxury Demand",
        avgResale: "$350–$800",
        trend: "Selective",
        volatility: "Medium",
        liquidity: "Low–Medium",
        flipScore: "58 / 100",
        description:
          "The Speedster sits in the luxury sneaker segment, where demand is driven by fashion cycles rather than performance or hype. Resale varies widely depending on condition, color, and seasonality.",
      },
    
      history: [
        "The Bottega Veneta Speedster emerged during the late 2010s as luxury fashion houses expanded deeper into sneaker culture.",
        "Designed as part of Bottega Veneta’s modern footwear lineup, the Speedster reflects the brand’s emphasis on craftsmanship, minimalism, and material quality.",
        "Unlike traditional athletic sneakers, the Speedster was never built for sport performance but instead positioned as a luxury lifestyle silhouette.",
        "The model gained attention through fashion circles, runway styling, and its association with high-end streetwear trends.",
      ],
    
      designIntro:
        "The Bottega Veneta Speedster is defined by its sleek knit construction, sculpted sole, and luxury-focused minimal aesthetic that prioritizes comfort and refined design over athletic performance.",
    
      designBullets: [
        "Stretch knit upper for a sock-like fit",
        "Minimal branding consistent with Bottega Veneta’s design philosophy",
        "Lightweight construction focused on comfort",
        "Sculpted rubber sole with modern luxury styling",
        "Clean, understated silhouette suited for fashion-forward outfits",
      ],
    
      colorways: [
        {
          name: "Triple Black",
          note: "A versatile and popular luxury staple",
          market: "Steady",
        },
        {
          name: "Neutral Beige",
          note: "Minimal tone aligned with luxury fashion palettes",
          market: "Moderate",
        },
        {
          name: "Grey / White",
          note: "Clean and understated aesthetic",
          market: "Selective",
        },
        {
          name: "Seasonal Fashion Colors",
          note: "Runway-driven releases tied to seasonal collections",
          market: "Varies",
        },
      ],
    
      resaleParagraphs: [
        "The Bottega Veneta Speedster operates within the luxury resale market, where value is influenced more by brand perception and fashion cycles than sneaker hype.",
        "Resale performance depends heavily on condition, rarity, and timing relative to current fashion trends, with most pairs depreciating after retail purchase.",
      ],
    
      resaleHighlights: [
        { label: "Best For", value: "Luxury fashion wear" },
        { label: "Risk Level", value: "Moderate" },
        { label: "Reseller Take", value: "Unpredictable, fashion-driven demand" },
      ],
    
      resellerInsight: {
        flipScore: "58 / 100",
        liquidity: "Low–Medium",
        typicalMargin: "Low–Moderate",
        bestUse: "Selective resale & personal luxury wear",
        bullets: [
          "Resale value depends heavily on condition and fashion trends.",
          "Not a hype sneaker — demand is niche and style-driven.",
          "Better suited for personal wear than consistent flipping.",
        ],
      },
    
      cta: {
        eyebrow: "Luxury Market Tool",
        title: "Track Bottega Veneta Sneaker Value",
        description:
          "Use SneakPrice to compare resale prices, monitor demand, and analyze luxury sneaker trends across Bottega Veneta releases.",
        primaryHref: "/",
        primaryLabel: "Check market value →",
        secondaryHref: "/exchange",
        secondaryLabel: "Explore insights",
        bullets: [
          "Compare luxury resale pricing",
          "Track fashion-driven demand",
          "Analyze niche market trends",
        ],
      },
    
      careIntro: [
        "The Bottega Veneta Speedster requires careful maintenance due to its knit upper and luxury materials.",
        "Proper care helps preserve both the structure and premium appearance of the sneaker.",
      ],
    
      careTools: [
        {
          label: "Soft-bristle Brush",
          desc: "Useful for gently cleaning knit materials without damaging fibers.",
        },
        {
          label: "Microfiber Cloth",
          desc: "Helps remove surface dirt and moisture safely.",
        },
        {
          label: "Mild Cleaning Solution",
          desc: "Essential for delicate luxury materials.",
        },
        {
          label: "Warm Water",
          desc: "Used carefully to avoid oversaturating the knit upper.",
        },
      ],
    
      carePrep: [
        {
          step: "1",
          label: "Remove Surface Dirt",
          desc: "Use a soft brush to clean the knit upper gently.",
        },
        {
          step: "2",
          label: "Prepare Cleaning Solution",
          desc: "Mix mild cleaner with warm water.",
        },
      ],
    
      careCleaning: [
        {
          step: "1",
          label: "Clean Gently",
          desc: "Use light motions to avoid damaging the knit material.",
        },
        {
          step: "2",
          label: "Wipe Excess Moisture",
          desc: "Use a microfiber cloth to remove residue.",
        },
        {
          step: "3",
          label: "Air Dry",
          desc: "Allow to dry naturally away from heat sources.",
        },
      ],
    
      relatedModels: [
        { name: "Balenciaga Speed Trainer", href: "/encyclopedia/balenciaga-speed-trainer" },
        { name: "Adidas Ultraboost", href: "/encyclopedia/adidas-ultraboost" },
        { name: "Nike React Phantom Run", href: "/encyclopedia/nike-react-phantom-run" },
        { name: "Common Projects Achilles Low", href: "/encyclopedia/common-projects-achilles-low" },
      ],
    },


    /** Chuck Taylor All Star */

    {
      slug: "chuck-taylor-all-star",
      name: "Converse Chuck Taylor All Star",
      tagline:
        "One of the most iconic sneakers ever made, the Chuck Taylor All Star blends basketball heritage, timeless simplicity, and cross-generational cultural relevance.",
    
      brand: "Converse",
      firstRelease: "1917",
      designer: "Converse / Chuck Taylor influence",
      retailPrice: "$60–$90",
    
      tier: 2,
    
      images: [
        {
          src: "/encyclopedia/chuck-taylor-all-star/hero.jpg",
          alt: "Converse Chuck Taylor All Star",
        },
        {
          src: "/encyclopedia/chuck-taylor-all-star/angle-1.jpg",
          alt: "Converse Chuck Taylor All Star side view",
        },
        {
          src: "/encyclopedia/chuck-taylor-all-star/angle-2.jpg",
          alt: "Converse Chuck Taylor All Star alternate angle",
        },
        {
          src: "/encyclopedia/chuck-taylor-all-star/detail.jpg",
          alt: "Converse Chuck Taylor All Star detail view",
        },
      ],
    
      marketSnapshot: {
        title: "Chuck Taylor All Star Market Overview",
        demand: "Very Strong Demand",
        avgResale: "$50–$140",
        trend: "Stable",
        volatility: "Low",
        liquidity: "High",
        flipScore: "46 / 100",
        description:
          "The Chuck Taylor All Star is a global evergreen sneaker with extremely strong demand as a wear pair, but most standard releases have limited resale upside. Collaborations and special editions perform much better than everyday core colorways.",
      },
    
      history: [
        "The Converse All Star debuted in 1917 as a basketball sneaker and quickly became one of the earliest mass-recognized athletic shoes.",
        "Chuck Taylor, a basketball player and Converse salesman, helped popularize the model and his name was later added to the ankle patch.",
        "The shoe became a dominant force in basketball before performance footwear evolved beyond its simple canvas-and-rubber construction.",
        "Over the decades, the Chuck Taylor All Star transitioned from the court into music, skate, punk, streetwear, and everyday global fashion culture.",
      ],
    
      designIntro:
        "The Chuck Taylor All Star is defined by its canvas upper, rubber toe cap, vulcanized sole, and unmistakable high-top or low-top silhouette that has remained visually consistent for generations.",
    
      designBullets: [
        "Classic canvas upper with lightweight feel",
        "Signature rubber toe cap and toe bumper",
        "Vulcanized rubber sole for flexibility and grip",
        "Iconic circular ankle patch on high-top versions",
        "Simple, timeless shape that works across countless styles",
      ],
    
      colorways: [
        {
          name: "Black High Top",
          note: "The most iconic and universally recognized Chuck Taylor colorway",
          market: "Everyday staple",
        },
        {
          name: "White High Top",
          note: "A clean classic with strong summer and lifestyle appeal",
          market: "Stable",
        },
        {
          name: "Red High Top",
          note: "A heritage color with strong visual identity",
          market: "Consistent demand",
        },
        {
          name: "Comme des Garçons PLAY",
          note: "The most recognizable modern collaboration in the Chuck Taylor line",
          market: "High resale",
        },
      ],
    
      resaleParagraphs: [
        "Standard Chuck Taylor All Star pairs are produced at scale and are usually purchased for wear rather than resale, keeping most general release pricing near or below retail.",
        "The strongest market movement comes from collaborations, premium builds, and limited-edition releases that tap into fashion or collector demand beyond the standard canvas models.",
      ],
    
      resaleHighlights: [
        { label: "Best For", value: "Everyday wear & selective collaborations" },
        { label: "Risk Level", value: "Low" },
        { label: "Reseller Take", value: "Core pairs are weak flips, collabs are stronger" },
      ],
    
      resellerInsight: {
        flipScore: "46 / 100",
        liquidity: "High",
        typicalMargin: "Low",
        bestUse: "Personal wear & selective collab flips",
        bullets: [
          "Core canvas pairs usually stay close to retail or below.",
          "Collaborations often outperform standard GRs by a wide margin.",
          "A cultural icon with huge wear demand but limited everyday resale upside.",
        ],
      },
    
      cta: {
        eyebrow: "Live Market Tool",
        title: "Scan Any Chuck Taylor Pair Live",
        description:
          "Use SneakPrice to compare resale pricing, track demand, and identify opportunities across Chuck Taylor classics and collaborations.",
        primaryHref: "/",
        primaryLabel: "Scan it with SneakPrice →",
        secondaryHref: "/exchange",
        secondaryLabel: "Open market tools",
        bullets: [
          "Track live resale signals",
          "Compare classic pairs vs collabs",
          "Spot stronger limited releases instantly",
        ],
      },
    
      careIntro: [
        "The Chuck Taylor All Star is easy to maintain, but canvas uppers and white rubber areas can collect visible dirt quickly.",
        "Regular cleaning helps preserve both the upper and the signature foxing, especially on lighter colorways.",
      ],
    
      careTools: [
        {
          label: "Soft-bristle Brush",
          desc: "Helps remove loose dirt from canvas and rubber without damaging the material.",
        },
        {
          label: "Microfiber Cloth",
          desc: "Useful for wiping away residue and drying the shoe gently after cleaning.",
        },
        {
          label: "Sneaker Cleaning Solution",
          desc: "Safe for canvas uppers and rubber midsoles when used lightly.",
        },
        {
          label: "Warm Water",
          desc: "Helps loosen dirt and stains during the cleaning process.",
        },
        {
          label: "Magic Eraser",
          desc: "Useful for brightening white rubber foxing and toe caps.",
        },
      ],
    
      carePrep: [
        {
          step: "1",
          label: "Remove Laces",
          desc: "Take out the laces so you can clean the tongue and eyelet area properly.",
        },
        {
          step: "2",
          label: "Dry Brush First",
          desc: "Remove loose dirt from canvas and rubber before using water or cleaning solution.",
        },
      ],
    
      careCleaning: [
        {
          step: "1",
          label: "Mix Cleaning Solution",
          desc: "Combine warm water with a mild sneaker-safe cleaner.",
        },
        {
          step: "2",
          label: "Clean Canvas Gently",
          desc: "Use soft circular motions to lift dirt without oversaturating the upper.",
        },
        {
          step: "3",
          label: "Wipe Rubber Areas",
          desc: "Clean the toe cap, foxing, and midsole with a cloth or eraser for a brighter finish.",
        },
        {
          step: "4",
          label: "Air Dry Naturally",
          desc: "Let the pair dry at room temperature away from direct heat or sunlight.",
        },
      ],
    
      relatedModels: [
        { name: "Chuck 70", href: "/encyclopedia/chuck-70" },
        { name: "Vans Old Skool", href: "/encyclopedia/vans-old-skool" },
        { name: "Nike Blazer Mid", href: "/encyclopedia/blazer-mid" },
        { name: "Adidas Samba", href: "/encyclopedia/adidas-samba" },
      ],
    },



    /* Nike Cortez Sneakers */

    {
      slug: "cortez",
      name: "Cortez",
      tagline:
        "Nike’s first-ever shoe and an enduring cultural landmark, the Cortez blends 1970s running heritage, timeless low-profile design, and decades of pop culture relevance.",
    
      brand: "Nike",
      firstRelease: "1972",
      designer: "Bill Bowerman",
      retailPrice: "$90–$120",
    
      tier: 2,
    
      images: [
        {
          src: "/encyclopedia/cortez/hero.jpg",
          alt: "Nike Cortez",
        },
        {
          src: "/encyclopedia/cortez/angle-1.jpg",
          alt: "Nike Cortez side view",
        },
        {
          src: "/encyclopedia/cortez/angle-2.jpg",
          alt: "Nike Cortez alternate angle",
        },
        {
          src: "/encyclopedia/cortez/detail.jpg",
          alt: "Nike Cortez Swoosh detail",
        },
      ],
    
      marketSnapshot: {
        title: "Nike Cortez Market Overview",
        demand: "Moderate Demand",
        avgResale: "$60–$160",
        trend: "Stable",
        volatility: "Low",
        liquidity: "Moderate",
        flipScore: "38 / 100",
        description:
          "The Nike Cortez is a heritage lifestyle sneaker with strong wear demand and limited everyday resale upside. Standard GRs hover near or below retail, but select collaborations and special editions attract collector interest and meaningful price premiums.",
      },
    
      history: [
        "The Cortez was originally developed in 1972 through a collaboration between Bill Bowerman, Phil Knight, and Onitsuka Tiger — first sold as the Tiger Cortez before the Nike/Onitsuka partnership dissolved.",
        "When the two companies split, Nike launched the Cortez under its own name in 1972, making it effectively Nike’s first original silhouette.",
        "Through the late 1970s and 1980s, the Cortez became a staple of Southern California street culture, worn by everyone from athletes to gang members, embedding itself in LA identity.",
        "The shoe’s cultural footprint exploded globally after Tom Hanks wore a red, white, and blue pair throughout the 1994 film Forrest Gump — one of the most iconic sneaker placements in cinema history.",
        "Nike has periodically refreshed the Cortez with premium materials, collaborations, and women’s-focused releases that have introduced the silhouette to new generations.",
      ],
    
      designIntro:
        "The Nike Cortez is defined by its low-profile cupsole construction, nylon or leather upper, bold Swoosh placement, and foam-cushioned midsole that was considered innovative for running footwear in its era.",
    
      designBullets: [
        "Clean nylon or leather upper with structured overlays",
        "Prominent curved Swoosh on the lateral panel",
        "Low-profile cupsole with foam-cushioned midsole",
        "Rounded toe box with a retro athletic silhouette",
        "Classic red, white, and blue color blocking on the OG colorway",
      ],
    
      colorways: [
        {
          name: "White / Varsity Red / Navy",
          note: "The original OG colorway — the most recognized and most reproduced Cortez ever made",
          market: "Iconic staple",
        },
        {
          name: "White / Black",
          note: "A clean, versatile everyday option with consistent lifestyle demand",
          market: "Stable",
        },
        {
          name: "All White",
          note: "Minimal and clean — popular as a summer and fashion-forward lifestyle pair",
          market: "Steady demand",
        },
        {
          name: "Sacai x Nike Cortez 4.0",
          note: "Elevated design collaboration with layered detailing and premium materials",
          market: "Strong resale",
        },
      ],
    
      resaleParagraphs: [
        "Standard Nike Cortez releases are widely available and produced at scale, meaning most general releases trade near or below retail with little margin for resellers.",
        "The best resale opportunities come from collaborations and limited-edition builds — particularly fashion-forward partnerships that elevate the Cortez beyond its everyday positioning.",
      ],
    
      resaleHighlights: [
        { label: "Best For", value: "Everyday wear & selective collab flips" },
        { label: "Risk Level", value: "Low" },
        { label: "Reseller Take", value: "Core pairs are weak flips, collabs show real margin" },
      ],
    
      resellerInsight: {
        flipScore: "38 / 100",
        liquidity: "Moderate",
        typicalMargin: "Low",
        bestUse: "Personal wear & targeted collab flips",
        bullets: [
          "Standard GRs rarely move above retail — primarily a wear shoe.",
          "Collaborations (Sacai, premium materials) can show meaningful price premiums.",
          "Pop culture heritage drives strong demand, but not resale velocity on core pairs.",
        ],
      },
    
      cta: {
        eyebrow: "Live Market Tool",
        title: "Scan Any Nike Cortez Pair Live",
        description:
          "Use SneakPrice to compare resale pricing, track demand, and identify opportunities across Cortez GRs and collaborations.",
        primaryHref: "/",
        primaryLabel: "Scan it with SneakPrice →",
        secondaryHref: "/exchange",
        secondaryLabel: "Open market tools",
        bullets: [
          "Track live resale signals",
          "Compare GRs vs collab pairs",
          "Spot limited releases with real margin",
        ],
      },
    
      careIntro: [
        "The Nike Cortez is available in nylon and leather builds, and each material benefits from a slightly different care approach.",
        "White midsoles and light colorways are especially prone to yellowing and scuffing, so regular upkeep extends the life of the pair significantly.",
      ],
    
      careTools: [
        {
          label: "Soft-bristle Brush",
          desc: "Ideal for removing loose dirt from nylon uppers and rubber midsoles without causing abrasion.",
        },
        {
          label: "Leather Cleaner / Conditioner",
          desc: "Essential for leather Cortez builds — keeps the upper supple and prevents cracking.",
        },
        {
          label: "Sneaker Cleaning Solution",
          desc: "Safe for nylon and leather uppers when applied with a soft brush or cloth.",
        },
        {
          label: "Microfiber Cloth",
          desc: "Useful for wiping down the midsole and upper after cleaning.",
        },
        {
          label: "Magic Eraser",
          desc: "Effective on white midsole scuffs and oxidation on the cupsole edges.",
        },
      ],
    
      carePrep: [
        {
          step: "1",
          label: "Remove Laces",
          desc: "Pull out laces to properly access the tongue, eyelet area, and upper.",
        },
        {
          step: "2",
          label: "Dry Brush First",
          desc: "Remove loose dirt from the upper and midsole before introducing any liquid.",
        },
      ],
    
      careCleaning: [
        {
          step: "1",
          label: "Mix Cleaning Solution",
          desc: "Combine warm water with a mild sneaker-safe cleaner appropriate for the upper material.",
        },
        {
          step: "2",
          label: "Clean the Upper",
          desc: "Use light circular motions on nylon or leather — avoid oversaturating either material.",
        },
        {
          step: "3",
          label: "Wipe the Midsole",
          desc: "Use a cloth or Magic Eraser to restore the white cupsole and remove scuffs.",
        },
        {
          step: "4",
          label: "Condition Leather (if applicable)",
          desc: "Apply leather conditioner to leather uppers after cleaning to maintain suppleness.",
        },
        {
          step: "5",
          label: "Air Dry Naturally",
          desc: "Let the pair dry fully at room temperature away from direct sunlight or heat.",
        },
      ],
    
      relatedModels: [
        { name: "Air Force 1", href: "/encyclopedia/air-force-1" },
        { name: "Nike Blazer Mid", href: "/encyclopedia/blazer-mid" },
        { name: "Adidas Samba", href: "/encyclopedia/adidas-samba" },
        { name: "Vans Old Skool", href: "/encyclopedia/vans-old-skool" },
      ],
    },
    




















    // -------------------- NEW SNEAKERS --------------------

// {
//   slug: "air-jordan-4",
//   name: "Air Jordan 4",
//   tagline: "A defining silhouette that brought visible Air and mesh panels into Jordan legacy.",
//   brand: "Nike / Jordan Brand",
//   firstRelease: "1989",
//   designer: "Tinker Hatfield",
//   retailPrice: "$200–$225",
//   tier: 1,
//   relatedModels: [
//     { name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" },
//     { name: "Air Jordan 3", href: "/encyclopedia/air-jordan-3" },
//   ],
// },

// {
//   slug: "air-jordan-3",
//   name: "Air Jordan 3",
//   tagline: "The model that introduced visible Air and saved the Jordan line.",
//   brand: "Nike / Jordan Brand",
//   firstRelease: "1988",
//   designer: "Tinker Hatfield",
//   retailPrice: "$200–$220",
//   tier: 1,
// },

// {
//   slug: "air-jordan-11",
//   name: "Air Jordan 11",
//   tagline: "Patent leather icon worn during MJ’s legendary comeback season.",
//   brand: "Nike / Jordan Brand",
//   firstRelease: "1995",
//   designer: "Tinker Hatfield",
//   retailPrice: "$225–$250",
//   tier: 1,
// },

{
  slug: "dunk-low",
  name: "Nike Dunk Low",
  tagline:
    "Originally a basketball shoe, the Dunk Low evolved through skate culture into one of the most hyped and widely collected sneakers of the modern resale era.",

  brand: "Nike",
  firstRelease: "1985",
  designer: "Peter Moore",
  retailPrice: "$110–$130",

  tier: 1,

  images: [
    {
      src: "/encyclopedia/dunk-low/hero.jpg",
      alt: "Nike Dunk Low",
    },
    {
      src: "/encyclopedia/dunk-low/angle-1.jpg",
      alt: "Nike Dunk Low Retro side view",
    },
    {
      src: "/encyclopedia/dunk-low/angle-2.jpg",
      alt: "Nike SB Dunk Low Pro alternate angle",
    },
    {
      src: "/encyclopedia/dunk-low/detail.jpg",
      alt: "Nike SB Dunk Low Staple NYC Pigeon detail",
    },
  ],

  marketSnapshot: {
    title: "Nike Dunk Low Market Overview",
    demand: "Very Strong Demand",
    avgResale: "$100–$600+",
    trend: "Cooling from 2021 peak but remains active",
    volatility: "Medium",
    liquidity: "High",
    flipScore: "72 / 100",
    description:
      "The Nike Dunk Low sits at the center of modern sneaker resale culture. Heat releases and high-profile collaborations regularly command strong premiums, while standard GRs have cooled since the 2020–2022 frenzy. Collab and limited releases remain among the most liquid flips in the market.",
  },

  history: [
    "Peter Moore designed the Dunk in 1985 as a performance basketball shoe, originally released in colorways matching college team uniforms under the 'Be True to Your School' campaign.",
    "After fading from basketball, the Dunk was adopted by skateboarders in the late 1990s — Nike formalized this with the launch of Nike SB in 2002, releasing the Dunk in limited runs with skate-specific cushioning.",
    "Early SB Dunk collabs — Supreme, Stüssy, Staple NYC Pigeon, Futura — became grail-level collectibles, cementing the Dunk's status in streetwear and collector culture.",
    "Nike retro-released the Dunk Low to the mainstream market starting in 2020, triggering a resale frenzy that made it one of the most traded sneakers in the world for two consecutive years.",
    "The hype has moderated since the 2021 peak, but the Dunk Low remains a cornerstone of the Nike lineup with constant new colorways and collabs keeping demand active.",
  ],

  designIntro:
    "The Nike Dunk Low is defined by its padded ankle collar, perforated toe box, two-tone paneling, and cupsole construction — a clean, versatile silhouette that works equally in sport, skate, and lifestyle contexts.",

  designBullets: [
    "Two-tone leather or suede upper with contrast overlays",
    "Perforated toe box for breathability",
    "Padded low-cut ankle collar",
    "Flat rubber cupsole with herringbone traction pattern",
    "Nike Swoosh stitched onto the lateral midfoot panel",
  ],

  colorways: [
    {
      name: "Panda (White / Black)",
      note: "The most widely produced and recognizable modern Dunk Low — sold in enormous quantities",
      market: "Near-retail on GRs",
    },
    {
      name: "University Red / White",
      note: "A heritage college-inspired colorway with consistent demand",
      market: "Stable above retail",
    },
    {
      name: "Nike SB Dunk Low Staple NYC Pigeon",
      note: "One of the most legendary Dunk collabs ever — sparked near-riots at retail in 2005",
      market: "Grail — $1,000+",
    },
    {
      name: "Travis Scott x Nike Dunk Low",
      note: "Among the most sought-after modern Dunk collabs, fetching strong multiples over retail",
      market: "Very high resale",
    },
  ],

  resaleParagraphs: [
    "General release Dunk Lows — including the Panda — have largely returned to retail or near-retail pricing after the 2020–2022 hype cycle peaked. The market is oversaturated with GRs, limiting flip potential on standard colorways.",
    "Limited releases, regional exclusives, and high-profile collaborations remain the strongest resale opportunities, often moving at 2x–5x retail with fast liquidity on StockX and GOAT.",
  ],

  resaleHighlights: [
    { label: "Best For", value: "Collab & limited flips" },
    { label: "Risk Level", value: "Medium — GRs carry little margin, collabs carry hype risk" },
    { label: "Reseller Take", value: "Pick your spots carefully — not all Dunks are equal" },
  ],

  resellerInsight: {
    flipScore: "72 / 100",
    liquidity: "High",
    typicalMargin: "Variable — low on GRs, strong on heat releases",
    bestUse: "Targeted limited & collab flips",
    bullets: [
      "Standard GRs like the Panda have flooded the market — expect near-retail or below.",
      "Limited colorways, SB releases, and fashion collabs remain strong earners.",
      "High liquidity makes Dunks easy to move — finding the margin is the challenge.",
    ],
  },

  cta: {
    eyebrow: "Live Market Tool",
    title: "Scan Any Nike Dunk Low Live",
    description:
      "Use SneakPrice to compare resale pricing across Dunk Low GRs, SB releases, and collabs — and spot where the real margin is.",
    primaryHref: "/",
    primaryLabel: "Scan it with SneakPrice →",
    secondaryHref: "/exchange",
    secondaryLabel: "Open market tools",
    bullets: [
      "Track live resale signals across all Dunk colorways",
      "Compare GR pricing vs limited release premiums",
      "Find collab opportunities before they cool",
    ],
  },

  careIntro: [
    "Most Nike Dunk Lows feature leather or suede uppers that require regular attention to maintain their shape and color — especially on lighter colorways.",
    "The rubber cupsole and midsole are easy to clean but prone to yellowing over time without proper storage.",
  ],

  careTools: [
    {
      label: "Soft-bristle Brush",
      desc: "Removes surface dirt from leather, suede, and rubber without causing damage.",
    },
    {
      label: "Suede Brush / Eraser",
      desc: "Essential for suede-paneled Dunks — lifts scuffs and restores the nap.",
    },
    {
      label: "Sneaker Cleaning Solution",
      desc: "Safe for leather and rubber; use sparingly on suede panels.",
    },
    {
      label: "Microfiber Cloth",
      desc: "Good for buffing leather to a clean finish and wiping down the midsole.",
    },
    {
      label: "Crep Protect / Sneaker Shield",
      desc: "Spray protector helps repel water and stains on both leather and suede panels.",
    },
  ],

  carePrep: [
    {
      step: "1",
      label: "Remove Laces",
      desc: "Pull laces out to access the tongue and eyelet area fully.",
    },
    {
      step: "2",
      label: "Dry Brush",
      desc: "Brush away loose dirt from the upper and outsole before using any solution.",
    },
  ],

  careCleaning: [
    {
      step: "1",
      label: "Clean Leather Panels",
      desc: "Apply sneaker solution with a soft brush in circular motions on leather overlays.",
    },
    {
      step: "2",
      label: "Treat Suede Carefully",
      desc: "Use a dedicated suede brush or eraser — avoid soaking suede with liquid cleaner.",
    },
    {
      step: "3",
      label: "Scrub the Midsole",
      desc: "Use a firm brush with cleaner on the cupsole edges to remove grime and scuffs.",
    },
    {
      step: "4",
      label: "Wipe Down and Air Dry",
      desc: "Remove excess solution with a microfiber cloth and let dry at room temperature.",
    },
    {
      step: "5",
      label: "Apply Protector Spray",
      desc: "Once fully dry, apply a water and stain repellent to extend the clean.",
    },
  ],

  relatedModels: [
    { name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" },
    { name: "Air Force 1", href: "/encyclopedia/air-force-1" },
    { name: "Nike Blazer Mid", href: "/encyclopedia/blazer-mid" },
    { name: "Adidas Samba", href: "/encyclopedia/adidas-samba" },
  ],
},

{
  slug: "dunk-high",
  name: "Nike Dunk High",
  tagline:
    "The original high-top form of Peter Moore's 1985 Dunk design — a basketball icon that carved its own lane through skate culture, fashion collabs, and streetwear before its low-top sibling stole the spotlight.",

  brand: "Nike",
  firstRelease: "1985",
  designer: "Peter Moore",
  retailPrice: "$120–$150",

  tier: 2,

  images: [
    {
      src: "/encyclopedia/dunk-high/hero.jpg",
      alt: "Nike SB Dunk High MF Doom",
    },
    {
      src: "/encyclopedia/dunk-high/angle-1.jpg",
      alt: "Nike SB Dunk High MF Doom alternate view",
    },
    {
      src: "/encyclopedia/dunk-high/angle-2.jpg",
      alt: "Nike Dunk High side view",
    },
    {
      src: "/encyclopedia/dunk-high/detail.jpg",
      alt: "Nike Dunk High detail view",
    },
  ],

  marketSnapshot: {
    title: "Nike Dunk High Market Overview",
    demand: "Strong Demand",
    avgResale: "$100–$500+",
    trend: "Stable after cooling from 2021 peak",
    volatility: "Medium",
    liquidity: "Moderate",
    flipScore: "58 / 100",
    description:
      "The Nike Dunk High commands a loyal collector base and consistently outperforms the Low on select collabs, but GRs have settled near retail. The high-top silhouette appeals to a slightly more niche audience than the Low, keeping demand focused on limited releases and high-profile collaborations.",
  },

  history: [
    "Peter Moore designed the Dunk in 1985 as a unified basketball shoe released simultaneously in high, mid, and low versions — the High was the original intended form for on-court performance.",
    "Nike's 'Be True to Your School' campaign launched the Dunk in college team colorways, with the High version representing the classic basketball silhouette of the era.",
    "The Nike SB program, launched in 2002, brought the Dunk High into skate culture with limited collaborations including the legendary MF Doom release — one of the most sought-after SB Dunk Highs ever produced.",
    "While the Dunk Low dominated the 2020–2022 hype cycle, the High maintained a dedicated following among collectors who prefer the original high-top silhouette and its deeper connection to basketball and SB heritage.",
    "Recent years have seen Nike continue releasing the Dunk High in both mainstream GR colorways and targeted collabs, keeping the silhouette relevant across both lifestyle and collector markets.",
  ],

  designIntro:
    "The Nike Dunk High is defined by its extended ankle collar, padded high-top construction, two-tone paneling, and the same cupsole base as the Low — but with a more substantial presence and stronger visual ties to its basketball origins.",

  designBullets: [
    "Tall padded ankle collar offering coverage and structure",
    "Two-tone leather or suede upper with contrast color blocking",
    "Perforated toe box for ventilation",
    "Flat rubber cupsole with classic herringbone traction",
    "Stitched Nike Swoosh on the lateral midfoot panel",
  ],

  colorways: [
    {
      name: "White / Black",
      note: "Clean and versatile — the most accessible Dunk High colorway in GR rotation",
      market: "Near retail",
    },
    {
      name: "Varsity Red / White",
      note: "Heritage college colorway with consistent demand tied to the original 'Be True to Your School' campaign",
      market: "Stable above retail",
    },
    {
      name: "Nike SB Dunk High MF Doom",
      note: "One of the most legendary SB Dunk High releases ever — named after the late rapper and still a coveted grail",
      market: "Grail — $800+",
    },
    {
      name: "Supreme x Nike SB Dunk High",
      note: "Multiple Supreme collabs have elevated the High to fashion-collab status with strong premiums",
      market: "High resale",
    },
  ],

  resaleParagraphs: [
    "General release Dunk Highs trade close to or slightly above retail, with demand more focused than the Low due to the silhouette's narrower mainstream appeal.",
    "The strongest opportunities come from SB releases, Supreme collabs, and fashion-forward limited drops — these routinely command significant premiums and move quickly on resale platforms.",
  ],

  resaleHighlights: [
    { label: "Best For", value: "SB & collab flips" },
    { label: "Risk Level", value: "Medium — high-top silhouette limits casual demand vs Low" },
    { label: "Reseller Take", value: "GRs are slow flips; targeted heat releases are strong earners" },
  ],

  resellerInsight: {
    flipScore: "58 / 100",
    liquidity: "Moderate",
    typicalMargin: "Low on GRs, strong on heat and SB releases",
    bestUse: "Collab and SB limited flips",
    bullets: [
      "GRs hover near retail — the High attracts fewer casual buyers than the Low.",
      "SB and fashion collabs carry real margin and often move faster than equivalent Low collabs.",
      "The MF Doom and Supreme SB Highs remain benchmark grails with strong long-term value.",
    ],
  },

  cta: {
    eyebrow: "Live Market Tool",
    title: "Scan Any Nike Dunk High Live",
    description:
      "Use SneakPrice to compare resale pricing across Dunk High GRs, SB releases, and collabs — and find the real value in the high-top market.",
    primaryHref: "/",
    primaryLabel: "Scan it with SneakPrice →",
    secondaryHref: "/exchange",
    secondaryLabel: "Open market tools",
    bullets: [
      "Track live resale signals across all Dunk High colorways",
      "Compare GR pricing vs SB and collab premiums",
      "Identify limited high-top releases with real margin",
    ],
  },

  careIntro: [
    "The Nike Dunk High features the same leather and suede panel construction as the Low but with an extended ankle collar that needs extra attention to maintain shape and prevent creasing.",
    "Storing with a shoe tree or paper fill helps the high-top collar hold its form between wears.",
  ],

  careTools: [
    {
      label: "Soft-bristle Brush",
      desc: "Removes surface dirt from leather overlays and rubber midsole without damaging the upper.",
    },
    {
      label: "Suede Brush / Eraser",
      desc: "Essential for suede panels — lifts scuffs and restores texture without liquid.",
    },
    {
      label: "Sneaker Cleaning Solution",
      desc: "Safe for leather and rubber; apply sparingly to suede areas.",
    },
    {
      label: "Microfiber Cloth",
      desc: "Use to buff leather panels and wipe down the midsole after cleaning.",
    },
    {
      label: "Shoe Tree or Paper Fill",
      desc: "Helps the high-top collar maintain its upright shape during storage.",
    },
  ],

  carePrep: [
    {
      step: "1",
      label: "Remove Laces",
      desc: "Pull laces to access the tongue and collar area fully.",
    },
    {
      step: "2",
      label: "Dry Brush the Upper",
      desc: "Clear loose dirt from leather, suede, and rubber before introducing any moisture.",
    },
  ],

  careCleaning: [
    {
      step: "1",
      label: "Clean Leather Panels",
      desc: "Work sneaker solution into leather overlays with a soft brush using gentle circular motions.",
    },
    {
      step: "2",
      label: "Treat Suede Carefully",
      desc: "Use a suede brush or eraser — avoid saturating suede panels with liquid cleaner.",
    },
    {
      step: "3",
      label: "Scrub the Midsole",
      desc: "Apply cleaner to the cupsole edge and rubber outsole with a firm brush.",
    },
    {
      step: "4",
      label: "Wipe and Air Dry",
      desc: "Remove excess solution with a microfiber cloth and dry at room temperature away from heat.",
    },
    {
      step: "5",
      label: "Stuff the Collar",
      desc: "Insert a shoe tree or crumpled paper while drying to maintain the high-top collar shape.",
    },
  ],

  relatedModels: [
    { name: "Nike Dunk Low", href: "/encyclopedia/nike-dunk-low" },
    { name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" },
    { name: "Air Force 1", href: "/encyclopedia/air-force-1" },
    { name: "Nike Blazer Mid", href: "/encyclopedia/blazer-mid" },
  ],
},

// {
//   slug: "yeezy-boost-350",
//   name: "Yeezy Boost 350",
//   tagline: "The sneaker that redefined hype culture and comfort.",
//   brand: "Adidas",
//   firstRelease: "2015",
//   designer: "Kanye West",
//   retailPrice: "$220–$300",
//   tier: 1,
// },

// {
//   slug: "yeezy-700",
//   name: "Yeezy Boost 700",
//   tagline: "Chunky runner that helped define the dad shoe era.",
//   brand: "Adidas",
//   firstRelease: "2017",
//   designer: "Kanye West",
//   retailPrice: "$300–$350",
//   tier: 1,
// },

// {
//   slug: "nike-air-max-95",
//   name: "Nike Air Max 95",
//   tagline: "A layered design inspired by human anatomy with aggressive styling.",
//   brand: "Nike",
//   firstRelease: "1995",
//   designer: "Sergio Lozano",
//   retailPrice: "$170–$200",
//   tier: 2,
// },

// {
//   slug: "nike-air-max-97",
//   name: "Nike Air Max 97",
//   tagline: "Full-length Air unit with futuristic ripple design.",
//   brand: "Nike",
//   firstRelease: "1997",
//   designer: "Christian Tresser",
//   retailPrice: "$180–$210",
//   tier: 2,
// },

// {
//   slug: "nike-air-max-1",
//   name: "Nike Air Max 1",
//   tagline: "The first sneaker to showcase visible Air technology.",
//   brand: "Nike",
//   firstRelease: "1987",
//   designer: "Tinker Hatfield",
//   retailPrice: "$150–$180",
//   tier: 1,
// },

// {
//   slug: "adidas-samba",
//   name: "Adidas Samba",
//   tagline: "A timeless indoor soccer shoe turned fashion essential.",
//   brand: "Adidas",
//   firstRelease: "1949",
//   designer: "Adolf Dassler",
//   retailPrice: "$90–$120",
//   tier: 1,
// },

// {
//   slug: "adidas-gazelle",
//   name: "Adidas Gazelle",
//   tagline: "Minimalist suede classic with decades of cultural relevance.",
//   brand: "Adidas",
//   firstRelease: "1966",
//   designer: "Adidas",
//   retailPrice: "$100–$130",
//   tier: 2,
// },

// {
//   slug: "new-balance-990v3",
//   name: "New Balance 990v3",
//   tagline: "Premium runner blending comfort and heritage.",
//   brand: "New Balance",
//   firstRelease: "2012",
//   designer: "New Balance",
//   retailPrice: "$180–$220",
//   tier: 1,
// },

// {
//   slug: "new-balance-550",
//   name: "New Balance 550",
//   tagline: "Retro basketball silhouette revived for modern streetwear.",
//   brand: "New Balance",
//   firstRelease: "1989",
//   designer: "New Balance",
//   retailPrice: "$110–$140",
//   tier: 1,
// },

// {
//   slug: "nike-blazer-mid",
//   name: "Nike Blazer Mid",
//   tagline: "Vintage basketball shoe embraced by skate culture.",
//   brand: "Nike",
//   firstRelease: "1973",
//   designer: "Nike",
//   retailPrice: "$100–$130",
//   tier: 2,
// },


// {
//   slug: "puma-suede-classic",
//   name: "Puma Suede Classic",
//   tagline: "A streetwear staple rooted in hip-hop history.",
//   brand: "Puma",
//   firstRelease: "1968",
//   designer: "Puma",
//   retailPrice: "$70–$100",
//   tier: 2,
// },

// {
//   slug: "reebok-club-c",
//   name: "Reebok Club C",
//   tagline: "Clean tennis-inspired sneaker with minimalist appeal.",
//   brand: "Reebok",
//   firstRelease: "1985",
//   designer: "Reebok",
//   retailPrice: "$80–$110",
//   tier: 2,
// },

// {
//   slug: "asics-gel-lyte-iii",
//   name: "ASICS Gel-Lyte III",
//   tagline: "Comfort-driven runner with split tongue design.",
//   brand: "ASICS",
//   firstRelease: "1990",
//   designer: "Shigeyuki Mitsui",
//   retailPrice: "$120–$160",
//   tier: 2,
// },

// {
//   slug: "nike-zoom-vomero-5",
//   name: "Nike Zoom Vomero 5",
//   tagline: "Tech runner turned lifestyle favorite.",
//   brand: "Nike",
//   firstRelease: "2010",
//   designer: "Nike",
//   retailPrice: "$160–$180",
//   tier: 1,
// },

// {
//   slug: "salomon-xt-6",
//   name: "Salomon XT-6",
//   tagline: "Trail performance sneaker adopted into fashion.",
//   brand: "Salomon",
//   firstRelease: "2013",
//   designer: "Salomon",
//   retailPrice: "$180–$220",
//   tier: 1,
// },

// {
//   slug: "converse-chuck-70",
//   name: "Converse Chuck 70",
//   tagline: "Premium evolution of the classic Chuck Taylor silhouette.",
//   brand: "Converse",
//   firstRelease: "1970",
//   designer: "Converse",
//   retailPrice: "$85–$110",
//   tier: 1,
// },

// {
//   slug: "vans-old-skool",
//   name: "Vans Old Skool",
//   tagline: "Skateboarding staple with iconic side stripe.",
//   brand: "Vans",
//   firstRelease: "1977",
//   designer: "Vans",
//   retailPrice: "$70–$100",
//   tier: 1,
// },

// {
//   slug: "vans-sk8-hi",
//   name: "Vans Sk8-Hi",
//   tagline: "High-top skate shoe with durable build.",
//   brand: "Vans",
//   firstRelease: "1978",
//   designer: "Vans",
//   retailPrice: "$80–$110",
//   tier: 2,
// },

// {
//   slug: "nike-air-huarache",
//   name: "Nike Air Huarache",
//   tagline: "Sock-like fit that changed comfort expectations.",
//   brand: "Nike",
//   firstRelease: "1991",
//   designer: "Tinker Hatfield",
//   retailPrice: "$120–$150",
//   tier: 2,
// },

// {
//   slug: "new-balance-2002r",
//   name: "New Balance 2002R",
//   tagline: "Retro runner revived with modern cushioning.",
//   brand: "New Balance",
//   firstRelease: "2010",
//   designer: "New Balance",
//   retailPrice: "$140–$180",
//   tier: 1,
//  },

{
  slug: "eqt-support-adv",
  name: "Adidas EQT Support ADV",
  tagline:
    "A modern reinterpretation of Adidas' 1991 Equipment line — the EQT Support ADV blends 90s running heritage with Boost cushioning and a sleek low-profile silhouette that briefly made it one of the most hyped lifestyle runners of the mid-2010s.",

  brand: "Adidas",
  firstRelease: "2016",
  designer: "Adidas Originals",
  retailPrice: "$110–$130",

  tier: 2,

  images: [
    {
      src: "/encyclopedia/eqt-support-adv/hero.jpg",
      alt: "Adidas EQT Support ADV white grey",
    },
    {
      src: "/encyclopedia/eqt-support-adv/angle-1.jpg",
      alt: "Adidas EQT Support Ultra PK detail",
    },
    {
      src: "/encyclopedia/eqt-support-adv/angle-2.jpg",
      alt: "Adidas EQT Support heritage comparison",
    },
    {
      src: "/encyclopedia/eqt-support-adv/detail.jpg",
      alt: "Adidas EQT Support ADV on foot",
    },
  ],

  marketSnapshot: {
    title: "Adidas EQT Support ADV Market Overview",
    demand: "Moderate Demand",
    avgResale: "$60–$150",
    trend: "Declining from 2017 peak",
    volatility: "Low",
    liquidity: "Low to Moderate",
    flipScore: "32 / 100",
    description:
      "The EQT Support ADV had its moment during the 2016–2018 Adidas NMD and Ultra Boost hype wave, but demand has cooled significantly. Most pairs now trade at or below retail, with only select limited colorways and collabs retaining mild premiums. Better suited as a personal wear pick than a resale target.",
  },

  history: [
    "Adidas launched the original Equipment (EQT) line in 1991 as a stripped-back performance collection — shoes built with only what was necessary, stripping away excess to focus on function.",
    "The EQT Support was the flagship model of that original line, designed as a running shoe with a supportive upper structure and a straightforward, technical aesthetic.",
    "Adidas revived the EQT name in 2016 with the EQT Support ADV — a modern lifestyle reinterpretation featuring a mesh and Primeknit upper, a Boost-inspired cushioned midsole, and a TPU heel support frame that nodded to the original's structural DNA.",
    "Released during the peak of the NMD and Ultra Boost craze, the EQT Support ADV rode the wave of Adidas hype and became a sought-after lifestyle runner throughout 2016 and 2017.",
    "As the broader Adidas Boost hype cycle faded, the EQT line lost momentum — but it remains a well-designed, comfortable lifestyle shoe with strong heritage credibility among Adidas collectors.",
  ],

  designIntro:
    "The EQT Support ADV is defined by its low-profile silhouette, mesh or Primeknit upper, TPU heel support structure, and chunky yet lightweight outsole — a design that bridges 90s running utility with mid-2010s Adidas lifestyle aesthetics.",

  designBullets: [
    "Breathable mesh or Primeknit upper with sock-like collar",
    "TPU heel support cage referencing the original 1991 EQT structure",
    "Lightweight EVA midsole for all-day comfort",
    "Three-stripe branding integrated into the upper construction",
    "Low-profile outsole with multi-directional traction pattern",
  ],

  colorways: [
    {
      name: "Core Black / Turbo Red",
      note: "The Turbo Red Pack release — one of the most iconic and recognizable EQT Support ADV colorways",
      market: "Modest premium",
    },
    {
      name: "White / Grey",
      note: "Clean everyday colorway with consistent lifestyle appeal",
      market: "Near retail",
    },
    {
      name: "Primeknit Triple Black",
      note: "All-black Primeknit version — subtle and popular for streetwear styling",
      market: "Near retail",
    },
    {
      name: "Packer Shoes x EQT Support ADV",
      note: "One of the stronger collab releases in the EQT ADV line",
      market: "Above retail",
    },
  ],

  resaleParagraphs: [
    "The EQT Support ADV's resale market has largely normalized since its 2017 peak — most GR colorways now trade at or below retail with limited buyer competition.",
    "Collaborative releases and limited colorways from the peak hype period retain small premiums, but the overall market is thin and liquidity is low compared to the NMD or Ultra Boost lines.",
  ],

  resaleHighlights: [
    { label: "Best For", value: "Personal wear — resale upside is minimal" },
    { label: "Risk Level", value: "Low — but so is the reward" },
    { label: "Reseller Take", value: "Skip GRs; only chase rare collabs if you find them cheap" },
  ],

  resellerInsight: {
    flipScore: "32 / 100",
    liquidity: "Low",
    typicalMargin: "Minimal to none on GRs",
    bestUse: "Wear or long-hold collab speculation",
    bullets: [
      "Most GR colorways have returned to retail or dropped below — not a flip target.",
      "The hype cycle for EQT has passed; collab pairs are the only realistic resale angle.",
      "Strong as a personal wear pick — comfortable, well-built, and underrated post-hype.",
    ],
  },

  cta: {
    eyebrow: "Live Market Tool",
    title: "Scan Any EQT Support ADV Pair Live",
    description:
      "Use SneakPrice to check current resale pricing across EQT Support ADV colorways and spot any collab pairs trading above retail.",
    primaryHref: "/",
    primaryLabel: "Scan it with SneakPrice →",
    secondaryHref: "/exchange",
    secondaryLabel: "Open market tools",
    bullets: [
      "Track live resale signals across all EQT colorways",
      "Identify collab pairs with remaining premium",
      "Compare current pricing vs retail baseline",
    ],
  },

  careIntro: [
    "The EQT Support ADV's mesh and Primeknit uppers are breathable but collect dirt quickly — regular light cleaning keeps the shoe looking sharp.",
    "The TPU heel cage and rubber outsole are durable and easy to wipe down, but the knit upper requires gentle handling to avoid snags or distortion.",
  ],

  careTools: [
    {
      label: "Soft-bristle Brush",
      desc: "Ideal for loosening dirt from the mesh upper without snagging the knit material.",
    },
    {
      label: "Microfiber Cloth",
      desc: "Use to wipe the TPU heel cage, midsole, and rubber outsole clean.",
    },
    {
      label: "Sneaker Cleaning Solution",
      desc: "Apply diluted solution gently to mesh — avoid over-saturating the knit.",
    },
    {
      label: "Warm Water",
      desc: "Helps lift surface dirt from the upper and midsole during cleaning.",
    },
    {
      label: "Crep Protect Spray",
      desc: "Apply after cleaning to protect mesh from future staining and moisture.",
    },
  ],

  carePrep: [
    {
      step: "1",
      label: "Remove Laces",
      desc: "Take laces out to clean the tongue and eyelet zone fully.",
    },
    {
      step: "2",
      label: "Dry Brush the Upper",
      desc: "Gently loosen surface dirt from mesh panels before using any liquid.",
    },
  ],

  careCleaning: [
    {
      step: "1",
      label: "Clean Mesh Gently",
      desc: "Apply diluted sneaker solution with a soft brush using light circular motions.",
    },
    {
      step: "2",
      label: "Wipe TPU Cage",
      desc: "Use a damp microfiber cloth on the heel support structure and side panels.",
    },
    {
      step: "3",
      label: "Scrub the Outsole",
      desc: "Use a firmer brush on the rubber outsole to remove ground-in dirt.",
    },
    {
      step: "4",
      label: "Air Dry Naturally",
      desc: "Dry at room temperature away from direct heat — heat can warp the knit upper.",
    },
    {
      step: "5",
      label: "Re-spray Protector",
      desc: "Once fully dry, apply a mesh-safe water repellent to maintain protection.",
    },
  ],

  relatedModels: [
    { name: "Adidas NMD R1", href: "/encyclopedia/adidas-nmd-r1" },
    { name: "Adidas Ultra Boost", href: "/encyclopedia/adidas-ultra-boost" },
    { name: "Adidas Stan Smith", href: "/encyclopedia/adidas-stan-smith" },
    { name: "Adidas Samba", href: "/encyclopedia/adidas-samba" },
  ],
},

{
  slug: "fresh-foam-1080",
  name: "New Balance Fresh Foam 1080",
  tagline:
    "New Balance's flagship premium running shoe — the Fresh Foam 1080 delivers maximum cushioning, a plush engineered mesh upper, and one of the smoothest long-run rides in its class.",

  brand: "New Balance",
  firstRelease: "2000",
  designer: "New Balance",
  retailPrice: "$164.99",

  tier: 2,

  images: [
    {
      src: "/encyclopedia/fresh-foam-1080/hero.jpg",
      alt: "New Balance Fresh Foam 1080 grey pair flat lay",
    },
    {
      src: "/encyclopedia/fresh-foam-1080/angle-1.jpg",
      alt: "New Balance Fresh Foam 1080 on-foot low angle",
    },
    {
      src: "/encyclopedia/fresh-foam-1080/angle-2.jpg",
      alt: "New Balance Fresh Foam 1080 side profile lifestyle",
    },
    {
      src: "/encyclopedia/fresh-foam-1080/detail.jpg",
      alt: "New Balance Fresh Foam 1080 lifestyle context",
    },
  ],

  marketSnapshot: {
    title: "New Balance Fresh Foam 1080 Market Overview",
    demand: "Strong Demand",
    avgResale: "$100–$180",
    trend: "Stable",
    volatility: "Low",
    liquidity: "Moderate",
    flipScore: "22 / 100",
    description:
      "The Fresh Foam 1080 is a premium performance running shoe, not a resale vehicle. Demand is driven overwhelmingly by runners and fitness enthusiasts purchasing at retail. Resale volume is minimal — the shoe rarely trades above retail and carries essentially no collector premium outside of limited colorways.",
  },

  history: [
    "New Balance introduced the 1080 in 2000 as the pinnacle of their running lineup — a maximum-cushion daily trainer built for high-mileage runners who prioritize comfort over pace.",
    "The shoe underwent major evolution when New Balance launched Fresh Foam technology in 2013, replacing traditional EVA foam with a single-piece midsole that uses data-driven geometry for a smoother, more consistent ride.",
    "The Fresh Foam 1080 became the gold standard of New Balance's performance running range, with each version incrementally improving cushioning, upper breathability, and weight reduction.",
    "The v11 and v12 iterations attracted widespread praise from running publications and established the 1080 as a legitimate competitor to Nike's Vaporfly and Asics' Nimbus in the premium daily trainer category.",
    "The current Fresh Foam X 1080v14 (2024) features the brand's most refined Fresh Foam X midsole compound yet — softer underfoot while maintaining enough energy return for tempo runs and long distances.",
  ],

  designIntro:
    "The Fresh Foam 1080 is defined by its single-piece Fresh Foam X midsole, engineered mesh upper, bootie-style construction for a snug wrap, and a wide platform that delivers stability without sacrificing softness.",

  designBullets: [
    "Single-piece Fresh Foam X midsole with data-driven geometry for even cushioning",
    "Engineered mesh upper with Hypoknit zones for targeted stretch and support",
    "Bootie construction for a seamless, sock-like fit around the ankle",
    "Wide toe box with generous forefoot volume for natural splay",
    "Blown rubber outsole with strategic flex grooves for smooth heel-to-toe transitions",
  ],

  colorways: [
    {
      name: "Quartz Grey / Silver",
      note: "A clean tonal grey perfect for both running and casual wear — among the most popular lifestyle colorways",
      market: "Retail",
    },
    {
      name: "Black / Blacktop",
      note: "All-black with understated detailing — a versatile daily option",
      market: "Retail",
    },
    {
      name: "White / Sea Salt",
      note: "Light and clean — popular for summer running and gym use",
      market: "Retail",
    },
    {
      name: "Limited Edition Collab Colorways",
      note: "Periodic collabs with run specialty retailers produce limited colorways with modest collector interest",
      market: "Slight premium on select pairs",
    },
  ],

  resaleParagraphs: [
    "The Fresh Foam 1080 is a performance shoe purchased almost exclusively at retail by runners — resale demand is negligible on standard colorways.",
    "Limited edition collab releases with run specialty retailers or boutiques occasionally attract modest premiums, but this is not a model resellers target for meaningful returns.",
  ],

  resaleHighlights: [
    { label: "Best For", value: "Running performance — not a resale target" },
    { label: "Risk Level", value: "Very Low — but virtually no upside" },
    { label: "Reseller Take", value: "Buy to run, not to flip" },
  ],

  resellerInsight: {
    flipScore: "22 / 100",
    liquidity: "Low",
    typicalMargin: "None on standard pairs",
    bestUse: "Personal running use",
    bullets: [
      "Standard colorways trade at or below retail — no resale market to speak of.",
      "Run-specialty collab pairs occasionally command small premiums but volume is thin.",
      "Best positioned as a wear shoe for serious runners, not a resale opportunity.",
    ],
  },

  cta: {
    eyebrow: "Live Market Tool",
    title: "Check Fresh Foam 1080 Pricing Live",
    description:
      "Use SneakPrice to compare current retail and resale pricing across Fresh Foam 1080 versions and colorways.",
    primaryHref: "/",
    primaryLabel: "Scan it with SneakPrice →",
    secondaryHref: "/exchange",
    secondaryLabel: "Open market tools",
    bullets: [
      "Compare pricing across 1080 versions",
      "Track limited colorway availability",
      "Find the best current retail price",
    ],
  },

  careIntro: [
    "The Fresh Foam 1080's engineered mesh upper is lightweight and breathable but requires regular cleaning to prevent dirt buildup in the knit structure.",
    "The Fresh Foam X midsole is durable but can yellow or discolor over time — keeping it clean helps maintain both appearance and foam integrity.",
  ],

  careTools: [
    {
      label: "Soft-bristle Brush",
      desc: "Ideal for gently working dirt out of the engineered mesh upper without snagging.",
    },
    {
      label: "Microfiber Cloth",
      desc: "Use to wipe down the midsole and outsole after cleaning.",
    },
    {
      label: "Sneaker Cleaning Solution",
      desc: "Apply diluted to the mesh upper — avoid soaking the foam midsole.",
    },
    {
      label: "Warm Water",
      desc: "Helps loosen surface dirt from the upper and rubber outsole.",
    },
    {
      label: "Magic Eraser",
      desc: "Effective on midsole scuffs and light discoloration on the Fresh Foam.",
    },
  ],

  carePrep: [
    {
      step: "1",
      label: "Remove Insoles and Laces",
      desc: "Pull out both to allow full access to the upper, tongue, and interior.",
    },
    {
      step: "2",
      label: "Dry Brush Loose Dirt",
      desc: "Knock off surface debris from the mesh and outsole before introducing any liquid.",
    },
  ],

  careCleaning: [
    {
      step: "1",
      label: "Clean Mesh Upper",
      desc: "Apply diluted sneaker solution with a soft brush using gentle circular motions across the knit panels.",
    },
    {
      step: "2",
      label: "Wipe the Midsole",
      desc: "Use a damp cloth or Magic Eraser on the Fresh Foam midsole to lift scuffs and discoloration.",
    },
    {
      step: "3",
      label: "Scrub the Outsole",
      desc: "Use a firmer brush on the blown rubber outsole to remove embedded grit and dirt.",
    },
    {
      step: "4",
      label: "Air Dry Fully",
      desc: "Stuff with paper and dry at room temperature — never use direct heat, which can degrade the foam.",
    },
    {
      step: "5",
      label: "Re-insert Insoles",
      desc: "Only replace insoles once the shoe is completely dry to prevent odor buildup.",
    },
  ],

  relatedModels: [
    { name: "New Balance 990v6", href: "/encyclopedia/new-balance-990" },
    { name: "New Balance 550", href: "/encyclopedia/new-balance-550" },
    { name: "Asics Gel-Kayano", href: "/encyclopedia/asics-gel-kayano" },
    { name: "Brooks Ghost", href: "/encyclopedia/brooks-ghost" },
  ],
},


// ─── F ────────────────────────────────────────────────────────────────────────

{
  slug: "flyknit-racer",
  name: "Nike Flyknit Racer",
  tagline: "The shoe that introduced Flyknit to the world — a featherweight racing flat that became a streetwear icon almost by accident.",
  brand: "Nike", firstRelease: "2012", designer: "Nike", retailPrice: "$150–$160", tier: 2,
  images: [
    { src: "/encyclopedia/flyknit-racer/hero.jpg", alt: "Nike Flyknit Racer" },
    { src: "/encyclopedia/flyknit-racer/angle-1.jpg", alt: "Nike Flyknit Racer side" },
    { src: "/encyclopedia/flyknit-racer/angle-2.jpg", alt: "Nike Flyknit Racer angle" },
    { src: "/encyclopedia/flyknit-racer/detail.jpg", alt: "Nike Flyknit Racer detail" },
  ],
  marketSnapshot: { title: "Nike Flyknit Racer Market Overview", demand: "Moderate Demand", avgResale: "$80–$250", trend: "Stable", volatility: "Low", liquidity: "Low", flipScore: "30 / 100", description: "Discontinued after 2018, the Flyknit Racer trades as a collector item. Multicolor colorways command the strongest premiums; standard GRs sit near or below retail." },
  history: [
    "Unveiled at the 2012 London Olympics, the Flyknit Racer was Nike's first Flyknit shoe — a knit upper weighing just 160 grams per shoe that sparked an industry-wide shift to knit construction.",
    "Despite being a racing flat, the Flyknit Racer was adopted by streetwear culture — the Multicolor colorway became one of the most hyped Nike drops of the 2010s.",
    "Nike discontinued the Flyknit Racer after 2018, cementing its status as a collector piece with an outsized legacy in shoe design history.",
  ],
  designIntro: "The Flyknit Racer is defined by its one-piece knit upper, Flywire cable lockdown, thin Lunarlon foam midsole, and waffle rubber outsole — pared to the absolute minimum.",
  designBullets: ["One-piece Flyknit upper woven for support and breathability", "Flywire cables for secure foot lockdown", "Ultra-thin Lunarlon foam midsole", "Minimal waffle rubber outsole", "Sock-like low-profile construction"],
  colorways: [
    { name: "Multicolor / Black", note: "The iridescent Multicolor became a defining streetwear moment", market: "Strong collector premium" },
    { name: "White / Volt", note: "Clean racing colorway with lifestyle crossover", market: "Near retail" },
    { name: "Black / White", note: "Understated versatile pair popular with runners and streetwear fans", market: "Near retail" },
  ],
  resaleParagraphs: ["The Flyknit Racer is discontinued — desirable colorways are collector items but the market is thin and slow-moving.", "Multicolor versions command the strongest premiums; most other colorways sit at or below retail."],
  resaleHighlights: [{ label: "Best For", value: "Collector hold" }, { label: "Risk Level", value: "Medium — niche market" }, { label: "Reseller Take", value: "Multicolor pairs only; skip standard GRs" }],
  resellerInsight: { flipScore: "30 / 100", liquidity: "Low", typicalMargin: "Low on most pairs", bestUse: "Collector hold on Multicolor", bullets: ["Discontinued status adds scarcity but demand is niche.", "Multicolor is the only colorway worth targeting for resale.", "Thin market means slow sales even on desirable pairs."] },
  cta: { eyebrow: "Live Market Tool", title: "Check Flyknit Racer Pricing Live", description: "Use SneakPrice to track current resale prices across all Flyknit Racer colorways.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track Multicolor vs standard colorway pricing", "Spot collector demand shifts", "Compare against retail history"] },
  careIntro: ["The Flyknit upper is delicate — aggressive scrubbing can snag or distort the knit fibers.", "Never machine wash a Flyknit Racer; hand wash only."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Gently works dirt out of knit without damaging fibers." }, { label: "Sneaker Cleaning Solution", desc: "Diluted formula safe for the Flyknit upper." }, { label: "Microfiber Cloth", desc: "Blot and wipe — never scrub." }, { label: "Warm Water", desc: "Loosens surface dirt during cleaning." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Pull laces out to access tongue and eyelet area." }, { step: "2", label: "Dry Brush Gently", desc: "Remove loose debris with very light pressure." }],
  careCleaning: [{ step: "1", label: "Apply Solution", desc: "Dab diluted cleaner onto knit with a soft brush." }, { step: "2", label: "Blot Clean", desc: "Use microfiber to blot — never rub Flyknit." }, { step: "3", label: "Clean Outsole", desc: "Scrub rubber waffle outsole with a firmer brush." }, { step: "4", label: "Air Dry", desc: "Dry at room temperature stuffed lightly to hold shape." }],
  relatedModels: [{ name: "Adidas Ultra Boost", href: "/encyclopedia/adidas-ultra-boost" }, { name: "New Balance Fresh Foam 1080", href: "/encyclopedia/fresh-foam-1080" }, { name: "Nike Air Max 90", href: "/encyclopedia/air-max-90" }, { name: "Adidas EQT Support ADV", href: "/encyclopedia/eqt-support-adv" }],
},

{
  slug: "forum-low",
  name: "Adidas Forum Low",
  tagline: "Born on the basketball court in 1984, the Forum Low returned in 2021 as one of Adidas' most successful lifestyle revivals — anchored by Bad Bunny collaborations that redefined its cultural relevance.",
  brand: "Adidas", firstRelease: "1984", designer: "Adidas", retailPrice: "$100–$110", tier: 2,
  images: [
    { src: "/encyclopedia/forum-low/hero.jpg", alt: "Adidas Forum Low" },
    { src: "/encyclopedia/forum-low/angle-1.jpg", alt: "Adidas Forum Low side" },
    { src: "/encyclopedia/forum-low/angle-2.jpg", alt: "Adidas Forum Low angle" },
    { src: "/encyclopedia/forum-low/detail.jpg", alt: "Adidas Forum Low detail" },
  ],
  marketSnapshot: { title: "Adidas Forum Low Market Overview", demand: "Strong Demand", avgResale: "$80–$300", trend: "Stable after 2021-2022 peak", volatility: "Low to Medium", liquidity: "Moderate", flipScore: "42 / 100", description: "Standard GRs trade near retail following the 2021 hype peak. Collab pairs — especially Bad Bunny — retain strong premiums. The Forum has proven staying power in the Adidas lifestyle lineup." },
  history: [
    "Adidas designed the Forum in 1984 as a premium basketball shoe with ankle strap — the Low version was its lifestyle counterpart.",
    "The Bad Bunny x Adidas Forum Low collaboration in 2021 became one of the most hyped drops of the year, reintroducing the silhouette to a new generation.",
    "Following Bad Bunny's success, Adidas accelerated Forum Low releases, making it a core lifestyle pillar alongside the Samba and Gazelle.",
  ],
  designIntro: "The Forum Low features a leather or suede upper, signature ankle strap, herringbone outsole, and Three Stripes — a basketball DNA adapted for everyday lifestyle wear.",
  designBullets: ["Leather or suede upper with structured paneling", "Signature adjustable ankle strap — the Forum's defining feature", "Herringbone rubber outsole from basketball heritage", "Three Stripes on lateral panel", "Padded collar and tongue for all-day comfort"],
  colorways: [
    { name: "Cloud White / Cloud White", note: "Minimal branding, versatile everyday GR", market: "Near retail" },
    { name: "Bad Bunny x Forum Low 'Easter Egg'", note: "The collab that relaunched the Forum's relevance", market: "Strong resale premium" },
    { name: "Cream White / Wonder Clay", note: "Earth-tone variant popular in lifestyle circles", market: "Near retail to modest premium" },
  ],
  resaleParagraphs: ["Standard GRs have largely returned to retail pricing after the 2021-2022 hype.", "Bad Bunny and key limited collabs remain the main resale opportunity at 2x-4x retail."],
  resaleHighlights: [{ label: "Best For", value: "Collab flips" }, { label: "Risk Level", value: "Low on GRs, Medium on collabs" }, { label: "Reseller Take", value: "Only heat collabs move above retail" }],
  resellerInsight: { flipScore: "42 / 100", liquidity: "Moderate", typicalMargin: "Near zero on GRs, strong on key collabs", bestUse: "Targeted collab flips", bullets: ["Standard GRs are at or below retail — skip for flipping.", "Bad Bunny collabs retain real premiums.", "Decent liquidity from broad lifestyle following."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Forum Low Pair Live", description: "Use SneakPrice to compare Forum Low collab pricing vs GRs.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track collab vs GR pricing gap", "Identify Forum Low drops with real premiums", "Compare resale vs retail"] },
  careIntro: ["The Forum Low's leather upper needs regular conditioning — especially the ankle strap.", "The herringbone outsole picks up dirt easily but cleans with minimal effort."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Removes surface dirt from leather and outsole." }, { label: "Leather Cleaner", desc: "Keeps panels clean without drying them out." }, { label: "Leather Conditioner", desc: "Maintains suppleness of the upper and strap." }, { label: "Microfiber Cloth", desc: "Buff leather to a clean finish." }],
  carePrep: [{ step: "1", label: "Remove Laces & Loosen Strap", desc: "Full access to all panels." }, { step: "2", label: "Dry Brush", desc: "Clear loose dirt from leather surface and outsole." }],
  careCleaning: [{ step: "1", label: "Clean Leather", desc: "Apply leather cleaner with soft brush in circular motions." }, { step: "2", label: "Clean Strap", desc: "Pay extra attention around the buckle area." }, { step: "3", label: "Scrub Outsole", desc: "Firm brush on herringbone rubber." }, { step: "4", label: "Condition", desc: "Apply conditioner while slightly damp for best absorption." }, { step: "5", label: "Air Dry", desc: "Let dry naturally; re-lace once fully dry." }],
  relatedModels: [{ name: "Adidas Samba", href: "/encyclopedia/adidas-samba" }, { name: "Adidas Gazelle", href: "/encyclopedia/gazelle" }, { name: "Nike Dunk Low", href: "/encyclopedia/nike-dunk-low" }, { name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" }],
},

// ─── G ────────────────────────────────────────────────────────────────────────

{
  slug: "gel-lyte-iii",
  name: "Asics Gel-Lyte III",
  tagline: "A 1990 running icon defined by its split tongue — the Gel-Lyte III became one of the most beloved Asics silhouettes in global sneaker culture.",
  brand: "Asics", firstRelease: "1990", designer: "Shigeyuki Mori", retailPrice: "$100–$130", tier: 2,
  images: [
    { src: "/encyclopedia/gel-lyte-iii/hero.jpg", alt: "Asics Gel-Lyte III" },
    { src: "/encyclopedia/gel-lyte-iii/angle-1.jpg", alt: "Asics Gel-Lyte III side" },
    { src: "/encyclopedia/gel-lyte-iii/angle-2.jpg", alt: "Asics Gel-Lyte III angle" },
    { src: "/encyclopedia/gel-lyte-iii/detail.jpg", alt: "Asics Gel-Lyte III detail" },
  ],
  marketSnapshot: { title: "Asics Gel-Lyte III Market Overview", demand: "Moderate Demand", avgResale: "$80–$300", trend: "Stable", volatility: "Low to Medium", liquidity: "Moderate", flipScore: "38 / 100", description: "A collector favorite with a passionate niche following. Standard GRs trade near retail; select collabs and premium builds generate real premiums." },
  history: [
    "Shigeyuki Mori designed the Gel-Lyte III in 1990 with a split tongue — a practical innovation preventing tongue migration that became the shoe's most distinctive feature.",
    "The shoe became a staple of Japanese sneaker culture before gaining global recognition through boutique collaborations in the 2010s.",
    "Collaborations with Ronnie Fieg (KITH) — especially the 'Salmon Toe' — elevated the Gel-Lyte III to grail status in the collector community.",
  ],
  designIntro: "The Gel-Lyte III is defined by its split tongue, suede or mesh upper, visible Gel heel cushioning, and low-profile running silhouette balancing performance heritage with lifestyle appeal.",
  designBullets: ["Signature split tongue for secure, migration-free fit", "Suede or mesh upper depending on colorway", "Visible Gel cushioning in heel", "Low-profile EVA midsole", "Classic Asics branding with heritage DNA"],
  colorways: [
    { name: "Ronnie Fieg x Gel-Lyte III 'Salmon Toe'", note: "The most iconic Gel-Lyte III collab — salmon suede with meticulous execution", market: "Grail — strong premium" },
    { name: "Cream / Off-White", note: "Clean lifestyle colorway popular as an everyday pair", market: "Near retail" },
    { name: "Premium Boutique Collabs", note: "KITH and boutique releases regularly command premiums among collectors", market: "Modest to strong premium" },
  ],
  resaleParagraphs: ["Standard Gel-Lyte III GRs trade near retail — the shoe has a loyal but niche following.", "KITH and boutique collabs consistently command meaningful premiums among Asics collectors."],
  resaleHighlights: [{ label: "Best For", value: "Niche collab flips for Asics collectors" }, { label: "Risk Level", value: "Medium — small, thin market" }, { label: "Reseller Take", value: "Know your audience — this is a collector play" }],
  resellerInsight: { flipScore: "38 / 100", liquidity: "Moderate", typicalMargin: "Near zero on GRs, strong on collabs", bestUse: "Collector collab flips", bullets: ["GRs stay near retail.", "KITH and boutique collabs move 2x-4x retail among Asics fans.", "Requires knowing the collector community to flip successfully."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Gel-Lyte III Pair Live", description: "Use SneakPrice to compare Gel-Lyte III collab pricing and track demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track collab vs GR pricing", "Identify boutique releases with premium", "Monitor Asics demand trends"] },
  careIntro: ["The suede upper needs consistent care to maintain its nap and prevent staining.", "The split tongue traps dirt — clean both panels separately."],
  careTools: [{ label: "Suede Brush", desc: "Restore nap without damaging the material." }, { label: "Suede Eraser", desc: "Lifts scuffs without moisture." }, { label: "Sneaker Cleaning Solution", desc: "Use sparingly on mesh; avoid saturating suede." }, { label: "Crep Protect Spray", desc: "Apply after cleaning for future protection." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access both panels of the split tongue." }, { step: "2", label: "Dry Brush", desc: "Remove dry dirt before introducing moisture." }],
  careCleaning: [{ step: "1", label: "Treat Suede", desc: "Brush or erase upper panels — work in one direction." }, { step: "2", label: "Clean Both Tongue Panels", desc: "Clean each split tongue panel individually." }, { step: "3", label: "Wipe Midsole", desc: "Damp cloth on EVA midsole." }, { step: "4", label: "Air Dry & Re-spray", desc: "Dry naturally then apply protector spray." }],
  relatedModels: [{ name: "Asics Gel-Kayano", href: "/encyclopedia/asics-gel-kayano" }, { name: "New Balance 574", href: "/encyclopedia/new-balance-574" }, { name: "Nike Air Max 90", href: "/encyclopedia/air-max-90" }, { name: "Adidas Gazelle", href: "/encyclopedia/gazelle" }],
},

{
  slug: "gazelle",
  name: "Adidas Gazelle",
  tagline: "One of Adidas' longest-running silhouettes — the Gazelle's simple suede and three-stripe design have made it a timeless lifestyle icon across seven decades.",
  brand: "Adidas", firstRelease: "1968", designer: "Adidas", retailPrice: "$90–$100", tier: 2,
  images: [
    { src: "/encyclopedia/gazelle/hero.jpg", alt: "Adidas Gazelle" },
    { src: "/encyclopedia/gazelle/angle-1.jpg", alt: "Adidas Gazelle side" },
    { src: "/encyclopedia/gazelle/angle-2.jpg", alt: "Adidas Gazelle angle" },
    { src: "/encyclopedia/gazelle/detail.jpg", alt: "Adidas Gazelle detail" },
  ],
  marketSnapshot: { title: "Adidas Gazelle Market Overview", demand: "Very Strong Demand", avgResale: "$70–$300", trend: "Rising — peak popularity 2023-2025", volatility: "Low", liquidity: "High", flipScore: "36 / 100", description: "The Gazelle is experiencing its biggest mainstream moment in decades, riding the Adidas Originals lifestyle wave. Standard GRs have strong wear demand but limited resale upside; luxury collabs (Gucci, Wales Bonner) command significant premiums." },
  history: [
    "Adidas first produced the Gazelle in 1968 as an indoor training shoe — lighter and simpler than the Samba — and it quickly gained a following among football players and athletes.",
    "The Gazelle became deeply embedded in British youth culture through the 1980s and 1990s, associated with Britpop, football casuals, and Liam Gallagher.",
    "Adidas has kept the Gazelle in nearly continuous production since 1968 — one of very few shoes with such an unbroken run.",
    "A fashion revival from 2022 onward — amplified by the Gucci x Adidas collab — made the Gazelle one of Adidas' top-selling lifestyle shoes globally.",
  ],
  designIntro: "The Gazelle is defined by its clean suede upper, T-toe overlay, contrasting Three Stripes, slim rubber cupsole, and Trefoil branding — a design unchanged for 50+ years.",
  designBullets: ["Suede upper with T-toe reinforcement overlay", "Iconic Three Stripes on lateral and medial sides", "Slim, low-profile rubber cupsole", "Trefoil logo on the tongue", "Minimal profile unchanged since 1968"],
  colorways: [
    { name: "Collegiate Royal Blue / White", note: "The most classic and recognized Gazelle colorway", market: "Stable at retail" },
    { name: "Gucci x Adidas Gazelle", note: "The luxury collab that put the Gazelle back on the global map", market: "Very high premium" },
    { name: "Indigo / Collegiate Navy", note: "Rich deep blue popular during the current fashion revival", market: "Near retail" },
  ],
  resaleParagraphs: ["Standard Gazelle GRs are produced in significant volume and purchased primarily for wear — minimal resale margin.", "Fashion and luxury collabs (Gucci, Wales Bonner) are the primary resale opportunity at multiples of retail."],
  resaleHighlights: [{ label: "Best For", value: "Wear & luxury collab flips" }, { label: "Risk Level", value: "Low — standard pairs have near-zero margin" }, { label: "Reseller Take", value: "GRs are for wearing; collabs are for flipping" }],
  resellerInsight: { flipScore: "36 / 100", liquidity: "High", typicalMargin: "None on GRs, strong on fashion collabs", bestUse: "Personal wear or luxury collab targeting", bullets: ["GRs are sold everywhere — no resale margin.", "Gucci and premium collabs command real premiums.", "High liquidity means wear pairs are easy to move secondhand."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Gazelle Pair Live", description: "Use SneakPrice to compare Gazelle collab pricing and track the current demand cycle.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track luxury collab vs GR pricing", "Monitor demand cycle", "Find limited colorways with real premium"] },
  careIntro: ["The Gazelle's suede scuffs easily and shows dirt quickly — regular brushing and preventative spraying are essential.", "Light colorways need more frequent attention."],
  careTools: [{ label: "Suede Brush", desc: "Maintain nap and remove dry dirt." }, { label: "Suede Eraser", desc: "Target scuffs without moisture." }, { label: "Crep Protect Spray", desc: "Apply regularly to repel water and stains." }, { label: "Microfiber Cloth", desc: "Wipe midsole and Three Stripes detailing." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access toe overlay for thorough cleaning." }, { step: "2", label: "Dry Brush", desc: "Brush in one direction before cleaning." }],
  careCleaning: [{ step: "1", label: "Erase Scuffs", desc: "Apply suede eraser before brushing." }, { step: "2", label: "Restore Nap", desc: "Brush in one direction after erasing." }, { step: "3", label: "Wipe Midsole", desc: "Clean rubber cupsole with damp cloth." }, { step: "4", label: "Protect", desc: "Apply Crep Protect once dry." }],
  relatedModels: [{ name: "Adidas Samba", href: "/encyclopedia/adidas-samba" }, { name: "Adidas Stan Smith", href: "/encyclopedia/adidas-stan-smith" }, { name: "Adidas Forum Low", href: "/encyclopedia/forum-low" }, { name: "Vans Old Skool", href: "/encyclopedia/vans-old-skool" }],
},

// ─── H ────────────────────────────────────────────────────────────────────────

{
  slug: "air-huarache",
  name: "Nike Air Huarache",
  tagline: "Tinker Hatfield's 1991 sock-like running shoe changed expectations for fit — and became a streetwear essential three decades after its debut.",
  brand: "Nike", firstRelease: "1991", designer: "Tinker Hatfield", retailPrice: "$110–$130", tier: 2,
  images: [
    { src: "/encyclopedia/air-huarache/hero.jpg", alt: "Nike Air Huarache" },
    { src: "/encyclopedia/air-huarache/angle-1.jpg", alt: "Nike Air Huarache side" },
    { src: "/encyclopedia/air-huarache/angle-2.jpg", alt: "Nike Air Huarache angle" },
    { src: "/encyclopedia/air-huarache/detail.jpg", alt: "Nike Air Huarache detail" },
  ],
  marketSnapshot: { title: "Nike Air Huarache Market Overview", demand: "Moderate Demand", avgResale: "$80–$200", trend: "Stable", volatility: "Low", liquidity: "Moderate", flipScore: "35 / 100", description: "The Huarache has a loyal lifestyle following but limited resale upside on standard GRs. Collabs and premium colorways are the only realistic flip targets." },
  history: [
    "Tinker Hatfield and Eric Avar designed the Air Huarache in 1991, inspired by a neoprene water ski boot — the goal was a shoe that fit like a second skin.",
    "The 'Have you hugged your foot today?' campaign introduced the neoprene inner sleeve concept, a radical departure from traditional shoe construction.",
    "Nike revived the Huarache in 2014 for its 23rd anniversary with retro colorways that drove massive demand and introduced the shoe to a new generation.",
  ],
  designIntro: "The Nike Air Huarache is defined by its neoprene inner bootie, external TPU heel cage, Air cushioning, and layered construction that wraps the foot rather than simply enclosing it.",
  designBullets: ["Neoprene inner sleeve for a sock-like second-skin fit", "External TPU heel cage for structure and support", "Air cushioning unit in the midsole", "Minimal exterior overlays over the bootie", "Rubber outsole with herringbone traction"],
  colorways: [
    { name: "White / White", note: "Crisp all-white with translucent sole — the cleanest colorway", market: "Near retail" },
    { name: "Sport Turquoise / Black", note: "The OG-inspired colorway that drove the 2014 retro revival", market: "Near retail to modest premium" },
    { name: "Fragment x Air Huarache", note: "Hiroshi Fujiwara collaboration with strong collector demand", market: "Strong collector premium" },
  ],
  resaleParagraphs: ["Standard Huarache GRs rarely move above retail — primarily a wear shoe.", "Fragment and premium collabs attract collectors willing to pay meaningful premiums."],
  resaleHighlights: [{ label: "Best For", value: "Wear — not a primary resale target" }, { label: "Risk Level", value: "Low" }, { label: "Reseller Take", value: "Wait for collabs; skip standard GRs" }],
  resellerInsight: { flipScore: "35 / 100", liquidity: "Moderate", typicalMargin: "Minimal on GRs", bestUse: "Personal wear or selective collab targeting", bullets: ["GRs sell at or below retail.", "Fragment and premium collabs are the only flip-worthy pairs.", "Strong wear shoe with understated resale potential."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Air Huarache Pair Live", description: "Use SneakPrice to check current Huarache pricing and spot collab premiums.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track collab vs GR pricing", "Compare demand over time", "Find limited pairs with real value"] },
  careIntro: ["The Huarache's neoprene bootie and mesh panels need gentle care — avoid over-wetting the inner sleeve.", "The TPU heel cage is durable and easy to wipe separately."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Gently cleans the outer mesh and rubber areas." }, { label: "Damp Cloth", desc: "Wipe the TPU heel cage and midsole." }, { label: "Sneaker Cleaning Solution", desc: "Diluted formula for mesh; avoid saturating the bootie." }, { label: "Microfiber Cloth", desc: "Blot moisture from the upper after cleaning." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the tongue and lacing zone." }, { step: "2", label: "Dry Brush Exterior", desc: "Remove loose dirt from mesh and rubber before moisture." }],
  careCleaning: [{ step: "1", label: "Clean Mesh Exterior", desc: "Apply diluted solution with soft brush to mesh panels." }, { step: "2", label: "Wipe TPU Cage", desc: "Damp cloth on heel cage and midsole." }, { step: "3", label: "Blot Inner Bootie", desc: "If soiled inside, lightly damp-wipe — never soak." }, { step: "4", label: "Air Dry Fully", desc: "The bootie takes longer to dry than the exterior." }],
  relatedModels: [{ name: "Nike Air Max 90", href: "/encyclopedia/air-max-90" }, { name: "Nike Dunk Low", href: "/encyclopedia/nike-dunk-low" }, { name: "Adidas EQT Support ADV", href: "/encyclopedia/eqt-support-adv" }, { name: "New Balance 574", href: "/encyclopedia/new-balance-574" }],
},

{
  slug: "handball-spezial",
  name: "Adidas Handball Spezial",
  tagline: "A 1979 indoor court shoe that became one of the most coveted lifestyle sneakers of the 2020s — the Spezial's minimal suede and gum sole made it the sophisticated choice for the Samba generation.",
  brand: "Adidas", firstRelease: "1979", designer: "Adidas", retailPrice: "$100–$110", tier: 2,
  images: [
    { src: "/encyclopedia/handball-spezial/hero.jpg", alt: "Adidas Handball Spezial" },
    { src: "/encyclopedia/handball-spezial/angle-1.jpg", alt: "Adidas Handball Spezial side" },
    { src: "/encyclopedia/handball-spezial/angle-2.jpg", alt: "Adidas Handball Spezial angle" },
    { src: "/encyclopedia/handball-spezial/detail.jpg", alt: "Adidas Handball Spezial detail" },
  ],
  marketSnapshot: { title: "Adidas Handball Spezial Market Overview", demand: "Very Strong Demand", avgResale: "$90–$280", trend: "Rising — peak lifestyle demand 2023-2025", volatility: "Low to Medium", liquidity: "High", flipScore: "44 / 100", description: "The Handball Spezial's rapid rise mirrors the Samba and Gazelle lifestyle wave. Peak GR colorways move at or above retail; fashion collabs command strong premiums. One of the hottest Adidas lifestyle models of the current cycle." },
  history: [
    "Adidas originally produced the Handball Spezial in 1979 as a specialist indoor handball shoe — suede upper, flat gum sole, optimized for court movement.",
    "The shoe spent decades as a niche European product before quietly gaining a following in vintage sneaker and streetwear scenes.",
    "From 2022 onward, the Handball Spezial exploded as fashion circles adopted it as the understated alternative to the Samba — cleaner, more minimal, equally versatile.",
    "Adidas accelerated Spezial production with premium colorways, fashion collabs, and expanded global distribution as demand outstripped supply.",
  ],
  designIntro: "The Handball Spezial is defined by its suede upper, flat gum rubber outsole, minimal Three Stripes branding, low-cut profile, and clean aesthetic that prioritizes simplicity.",
  designBullets: ["Suede upper in muted, fashion-forward colorways", "Flat gum rubber outsole for indoor court use", "Low-cut collar with minimal ankle coverage", "Subtle Three Stripes branding", "Trefoil logo on the tongue"],
  colorways: [
    { name: "Olive / Gum", note: "The most associated Spezial colorway with the fashion revival — earthy and widely imitated", market: "Above retail" },
    { name: "Blue / Gum", note: "Classic heritage color with broad lifestyle and streetwear appeal", market: "Near retail to modest premium" },
    { name: "Limited Fashion Collabs", note: "Fashion house collaborations command strong premiums", market: "Strong premium" },
  ],
  resaleParagraphs: ["Peak GR colorways have pushed even standard Spezials above retail — rare for a $100 lifestyle shoe.", "Fashion collabs and limited regional releases move at 2x-3x retail among fashion buyers."],
  resaleHighlights: [{ label: "Best For", value: "Peak colorway GR flips + fashion collab targeting" }, { label: "Risk Level", value: "Medium — trend-dependent" }, { label: "Reseller Take", value: "Move fast on heat colorways before the trend cools" }],
  resellerInsight: { flipScore: "44 / 100", liquidity: "High", typicalMargin: "Modest on GRs, strong on limited pairs", bestUse: "Peak colorway and collab flips", bullets: ["GR demand is unusually strong — Olive/Gum pairs often exceed retail.", "Fashion collabs move at 2x-3x for the right buyers.", "Timing matters — buy early in hype cycles."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Handball Spezial Pair Live", description: "Use SneakPrice to track Handball Spezial pricing and spot peak colorway opportunities.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track GR vs collab pricing gap", "Monitor demand by colorway", "Spot supply constraints in real time"] },
  careIntro: ["The Spezial's suede upper needs regular brushing and protective spray — identical care to the Gazelle.", "The flat gum outsole can yellow over time; keep it clean to preserve its warm tone."],
  careTools: [{ label: "Suede Brush", desc: "Maintain the suede nap and remove dry dirt." }, { label: "Suede Eraser", desc: "Target scuffs without moisture." }, { label: "Crep Protect Spray", desc: "Seal suede against moisture and staining." }, { label: "Magic Eraser", desc: "Gently brightens the gum sole if yellowing." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full suede surface." }, { step: "2", label: "Dry Brush", desc: "Brush in one direction before cleaning." }],
  careCleaning: [{ step: "1", label: "Erase Scuffs", desc: "Apply suede eraser to marks on the upper." }, { step: "2", label: "Restore Nap", desc: "Brush suede to restore texture." }, { step: "3", label: "Clean Gum Sole", desc: "Damp cloth or Magic Eraser on the gum outsole." }, { step: "4", label: "Protect", desc: "Apply suede protector spray once fully dry." }],
  relatedModels: [{ name: "Adidas Samba", href: "/encyclopedia/adidas-samba" }, { name: "Adidas Gazelle", href: "/encyclopedia/gazelle" }, { name: "Adidas Forum Low", href: "/encyclopedia/forum-low" }, { name: "Vans Old Skool", href: "/encyclopedia/vans-old-skool" }],
},

// ─── I ────────────────────────────────────────────────────────────────────────

{
  slug: "instapump-fury",
  name: "Reebok Instapump Fury",
  tagline: "One of the most radical sneaker designs ever made — the 1994 Instapump Fury replaced laces with an inflation pump system and still looks futuristic thirty years later.",
  brand: "Reebok", firstRelease: "1994", designer: "Steven Smith / Christian Tresser", retailPrice: "$180–$220", tier: 2,
  images: [
    { src: "/encyclopedia/instapump-fury/hero.jpg", alt: "Reebok Instapump Fury" },
    { src: "/encyclopedia/instapump-fury/angle-1.jpg", alt: "Reebok Instapump Fury side" },
    { src: "/encyclopedia/instapump-fury/angle-2.jpg", alt: "Reebok Instapump Fury angle" },
    { src: "/encyclopedia/instapump-fury/detail.jpg", alt: "Reebok Instapump Fury detail" },
  ],
  marketSnapshot: { title: "Reebok Instapump Fury Market Overview", demand: "Moderate Demand", avgResale: "$120–$500", trend: "Stable with periodic collab spikes", volatility: "Medium", liquidity: "Moderate", flipScore: "40 / 100", description: "The Instapump Fury has a dedicated global collector base — particularly strong in Japan — with consistent demand for limited colorways and collabs. Standard retro releases trade close to retail." },
  history: [
    "Reebok unveiled the Instapump Fury at the 1994 Boston Marathon with its laceless CO2 pump system, carbon fiber shank, and bold exoskeleton — a shoe with no compromise.",
    "The Fury became a cult classic in Japan throughout the 1990s and 2000s, driving demand for limited colorways that rarely reached other markets.",
    "Regular retro releases and global collaborations (BAPE, Vetements, Bodega) have kept the Fury relevant to collectors who value technical design and outsider aesthetics.",
  ],
  designIntro: "The Instapump Fury is defined by its CO2 inflation pump system replacing laces, TPU exoskeleton frame, carbon fiber shank, Hexalite cushioning, and bold geometric color-block paneling.",
  designBullets: ["CO2 inflation pump replaces traditional lacing entirely", "TPU exoskeleton for structure without added weight", "Carbon fiber shank for torsional rigidity", "Hexalite cushioning for lightweight impact absorption", "Bold geometric color-block paneling"],
  colorways: [
    { name: "OG 'Boston' (White / Red / Yellow)", note: "The original Boston Marathon colorway — closest to a grail for Fury collectors", market: "Strong collector premium" },
    { name: "BAPE x Instapump Fury", note: "Camo print versions command significant premiums — one of the most recognized Fury collabs", market: "Strong resale" },
    { name: "Vetements x Reebok Instapump Fury", note: "High-fashion collab that introduced the Fury to new audiences", market: "High premium among fashion buyers" },
  ],
  resaleParagraphs: ["Standard Fury retro releases trade near or slightly above retail — the shoe has a dedicated but niche following.", "Collabs with fashion brands and streetwear icons consistently command strong premiums, particularly in Japanese and European markets."],
  resaleHighlights: [{ label: "Best For", value: "Collab flips — especially Japanese and fashion-market releases" }, { label: "Risk Level", value: "Medium — niche collector market" }, { label: "Reseller Take", value: "Know the collector community; standard pairs are slow movers" }],
  resellerInsight: { flipScore: "40 / 100", liquidity: "Moderate", typicalMargin: "Minimal on GRs, strong on collabs", bestUse: "Strategic collab targeting", bullets: ["GRs hover near retail — collector-driven market.", "Japanese market demand is strong for limited Fury releases.", "BAPE, Vetements, and boutique collabs are the best flip targets."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Instapump Fury Pair Live", description: "Use SneakPrice to track Fury collab pricing and monitor collector demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track collab vs standard release pricing", "Monitor global collector demand", "Identify limited releases with real premium"] },
  careIntro: ["The Fury's TPU exoskeleton and mesh panels need careful cleaning — never submerge or pressure-wash.", "The pump bladder mechanism is delicate; never apply force to the pump button during cleaning."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Clean mesh and TPU panels gently." }, { label: "Damp Cloth", desc: "Wipe the TPU exoskeleton frame carefully." }, { label: "Sneaker Cleaning Solution", desc: "Diluted formula for mesh panels only." }, { label: "Microfiber Cloth", desc: "Dry and buff the TPU panels." }],
  carePrep: [{ step: "1", label: "Deflate Pump Bladder", desc: "Ensure fully deflated before cleaning to avoid pressure damage." }, { step: "2", label: "Dry Brush Mesh", desc: "Remove loose dirt before introducing moisture." }],
  careCleaning: [{ step: "1", label: "Clean Mesh Panels", desc: "Apply diluted solution with soft brush to mesh sections." }, { step: "2", label: "Wipe TPU Frame", desc: "Damp cloth on exoskeleton — avoid crevices where moisture pools." }, { step: "3", label: "Clean Outsole", desc: "Scrub rubber outsole with firmer brush." }, { step: "4", label: "Air Dry Fully", desc: "Ensure pump mechanism is completely dry before re-inflating." }],
  relatedModels: [{ name: "Adidas EQT Support ADV", href: "/encyclopedia/eqt-support-adv" }, { name: "Nike Air Max 95", href: "/encyclopedia/air-max-95" }, { name: "Nike Air Max 97", href: "/encyclopedia/air-max-97" }, { name: "Reebok Classic Leather", href: "/encyclopedia/reebok-classic-leather" }],
},


// ─── J ────────────────────────────────────────────────────────────────────────

{
  slug: "air-jordan-3",
  name: "Air Jordan 3",
  tagline: "The shoe that almost made Michael Jordan leave Nike — the Air Jordan 3 was the first Jordan designed by Tinker Hatfield and the first to feature visible Air cushioning and the Jumpman logo.",
  brand: "Jordan Brand", firstRelease: "1988", designer: "Tinker Hatfield", retailPrice: "$200–$225", tier: 1,
  images: [
    { src: "/encyclopedia/air-jordan-3/hero.jpg", alt: "Air Jordan 3" },
    { src: "/encyclopedia/air-jordan-3/angle-1.jpg", alt: "Air Jordan 3 side" },
    { src: "/encyclopedia/air-jordan-3/angle-2.jpg", alt: "Air Jordan 3 angle" },
    { src: "/encyclopedia/air-jordan-3/detail.jpg", alt: "Air Jordan 3 detail" },
  ],
  marketSnapshot: { title: "Air Jordan 3 Market Overview", demand: "Very Strong Demand", avgResale: "$200–$600+", trend: "Stable with strong collab spikes", volatility: "Medium", liquidity: "High", flipScore: "68 / 100", description: "The Air Jordan 3 is a perennial collector favorite with strong baseline demand and excellent collab potential. OG retros and tier-zero releases regularly trade at significant premiums; standard retros sit above retail with consistent liquidity." },
  history: [
    "After Tinker Hatfield's first MJ collaboration, the Air Jordan 3 debuted in 1988 with revolutionary visible Air cushioning, an elephant print overlay, and the Jumpman logo making its first appearance.",
    "Hatfield saved the Jordan line — Michael Jordan had planned to leave Nike before seeing the AJ3 design, which convinced him to stay.",
    "Jordan wore the 3 during some of the most iconic moments of his career, including his 1988 Slam Dunk Contest win in full flight.",
    "Retro releases since 1994 have kept the AJ3 in constant demand — it's consistently one of Jordan Brand's highest-selling retro silhouettes.",
  ],
  designIntro: "The Air Jordan 3 is defined by its elephant print overlays, visible Air heel unit, mesh panels, molded heel counter, lace lock wings, and the debut of the Jumpman logo on the tongue.",
  designBullets: ["Iconic elephant print overlays on toe and heel", "Visible Air cushioning in the heel", "Mesh panels for breathability alongside leather upper", "Molded heel counter and lace lock wings", "Jumpman logo debut on tongue"],
  colorways: [
    { name: "Black Cement", note: "The most iconic Jordan 3 colorway — elephant print with red accents, defines the silhouette", market: "Strong above-retail premium" },
    { name: "White Cement", note: "The clean OG complement to Black Cement with wide appeal", market: "Consistent above-retail" },
    { name: "True Blue", note: "Vibrant blue/grey with elephant print — strong demand among Jordan collectors", market: "Above retail" },
    { name: "Fragment x Air Jordan 3", note: "Hiroshi Fujiwara collab commanding premium among collector circles", market: "Strong resale" },
  ],
  resaleParagraphs: ["The Air Jordan 3 is one of Jordan Brand's most reliable retro performers — even standard retros typically sell above retail with decent liquidity.", "OG-colorway retros, tier-zero releases, and collabs are the strongest flip opportunities, often hitting 1.5x-3x retail."],
  resaleHighlights: [{ label: "Best For", value: "OG colorway retros and key collabs" }, { label: "Risk Level", value: "Low to Medium" }, { label: "Reseller Take", value: "Black/White Cement pairs move fast and hold value well" }],
  resellerInsight: { flipScore: "68 / 100", liquidity: "High", typicalMargin: "Solid above retail on OG colorways", bestUse: "OG retro and collab targeting", bullets: ["Black/White Cement are the most reliable flip targets.", "Tier-zero releases and collabs command the strongest premiums.", "Standard retros have decent margins and sell reliably."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Air Jordan 3 Pair Live", description: "Use SneakPrice to compare Jordan 3 pricing across all colorways and identify real value.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track OG vs standard retro pricing", "Compare colorway demand", "Identify Jordan 3 collab opportunities"] },
  careIntro: ["The Jordan 3's leather and elephant print panels need regular care — the textured print can collect dirt in its recessed areas.", "The mesh panels need gentle cleaning to avoid stretching or snagging."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Cleans leather panels and gets into elephant print texture." }, { label: "Leather Cleaner", desc: "Keeps the leather upper clean and conditioned." }, { label: "Microfiber Cloth", desc: "Buff leather panels after cleaning." }, { label: "Magic Eraser", desc: "Effective on the midsole and white rubber areas." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the tongue, lace lock, and mesh panels." }, { step: "2", label: "Dry Brush", desc: "Remove loose dirt from elephant print and outsole." }],
  careCleaning: [{ step: "1", label: "Clean Leather Panels", desc: "Apply leather cleaner with soft brush in circular motions." }, { step: "2", label: "Detail Elephant Print", desc: "Use a soft brush to get into the textured recesses." }, { step: "3", label: "Wipe Midsole", desc: "Magic Eraser or damp cloth on the midsole." }, { step: "4", label: "Air Dry", desc: "Dry naturally away from heat; condition leather once dry." }],
  relatedModels: [{ name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" }, { name: "Air Jordan 4", href: "/encyclopedia/air-jordan-4" }, { name: "Air Jordan 11", href: "/encyclopedia/air-jordan-11" }, { name: "Nike Dunk Low", href: "/encyclopedia/nike-dunk-low" }],
},

{
  slug: "air-jordan-4",
  name: "Air Jordan 4",
  tagline: "Tinker Hatfield's 1989 follow-up to the Jordan 3 introduced flight wings, mesh netting panels, and a utilitarian design that became one of the most iconic basketball shoes ever made.",
  brand: "Jordan Brand", firstRelease: "1989", designer: "Tinker Hatfield", retailPrice: "$210–$225", tier: 1,
  images: [
    { src: "/encyclopedia/air-jordan-4/hero.jpg", alt: "Air Jordan 4" },
    { src: "/encyclopedia/air-jordan-4/angle-1.jpg", alt: "Air Jordan 4 side" },
    { src: "/encyclopedia/air-jordan-4/angle-2.jpg", alt: "Air Jordan 4 angle" },
    { src: "/encyclopedia/air-jordan-4/detail.jpg", alt: "Air Jordan 4 detail" },
  ],
  marketSnapshot: { title: "Air Jordan 4 Market Overview", demand: "Very Strong Demand", avgResale: "$250–$1,000+", trend: "Stable — consistently strong across retros and collabs", volatility: "Medium", liquidity: "High", flipScore: "74 / 100", description: "The Jordan 4 is one of the most traded Jordan silhouettes. OG colorways, collabs (Travis Scott, Off-White, Kaws, Fragment), and tier-zero releases generate massive demand. Even standard retros typically outperform retail. The Bred and White Cement colorways are among the most liquid in the Jordan lineup." },
  history: [
    "Tinker Hatfield debuted the Air Jordan 4 in 1989 with flight wings on the midsole, mesh netting panels for ventilation, and a visible Air heel unit — a bold departure from the clean leather of the AJ3.",
    "MJ wore the Jordan 4 in one of basketball's most famous moments — 'The Shot' over Craig Ehlo in the 1989 playoffs — in the Black Cement colorway.",
    "The Jordan 4 was the first Air Jordan officially sold outside the United States, making it a global sneaker icon from its debut.",
    "Travis Scott's 'Cactus Jack' Jordan 4 collaborations have become some of the most hyped sneaker releases of the 2020s, introducing the silhouette to a new generation of collectors.",
  ],
  designIntro: "The Air Jordan 4 is defined by its mesh netting panels, midsole flight wings, visible Air heel unit, molded lace lock, and aggressive paneled upper that blends athletic function with bold design.",
  designBullets: ["Mesh netting panels on upper and tongue for ventilation", "Midsole flight wings — signature Jordan 4 design element", "Visible Air heel cushioning", "Molded lace lock on tongue", "Aggressive paneling with diverse material mixes"],
  colorways: [
    { name: "Bred / Black Cement", note: "'The Shot' colorway — one of the most coveted Jordan retros and fastest-moving pairs at retail", market: "Strong premium" },
    { name: "White Cement", note: "The clean OG counterpart with consistent demand across collector and lifestyle buyers", market: "Above retail" },
    { name: "Travis Scott x Air Jordan 4 'Cactus Jack'", note: "One of the most hyped sneaker collabs of the 2020s — massive demand at multiples of retail", market: "Very strong premium" },
    { name: "Off-White x Air Jordan 4 'Sail'", note: "Virgil Abloh's deconstructed take on the Jordan 4 remains a highly sought grail", market: "Grail — strong premium" },
  ],
  resaleParagraphs: ["The Air Jordan 4 is one of the most reliable Jordan retros for resale — even standard GRs typically sell above retail.", "Collabs with Travis Scott, Off-White, Kaws, and Fragment push the Jordan 4 to the top tier of resale demand."],
  resaleHighlights: [{ label: "Best For", value: "OG colorway retros, Travis Scott, and key collabs" }, { label: "Risk Level", value: "Low on OG colorways, Medium on collabs (hype-dependent)" }, { label: "Reseller Take", value: "Bred and White Cement are the most reliable flips in the Jordan catalog" }],
  resellerInsight: { flipScore: "74 / 100", liquidity: "High", typicalMargin: "Strong across most colorways", bestUse: "OG retros + top-tier collabs", bullets: ["Bred and White Cement are fast movers at consistent premiums.", "Travis Scott collabs drive enormous demand and sell instantly.", "Even standard retros outperform retail — one of the best Jordan flip targets."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Air Jordan 4 Pair Live", description: "Use SneakPrice to compare Jordan 4 colorway pricing and identify the strongest resale opportunities.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track Bred vs standard retro pricing", "Compare Travis Scott collab demand", "Identify Jordan 4 release windows"] },
  careIntro: ["The Jordan 4's mesh panels and nubuck/leather upper need targeted care — mesh can stretch if scrubbed aggressively.", "The flight wings on the midsole can yellow; clean them regularly to maintain the fresh look."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Cleans leather and nubuck panels without damaging." }, { label: "Leather Cleaner", desc: "For leather upper panels and nubuck surfaces." }, { label: "Magic Eraser", desc: "Effective on midsole and flight wing yellowing." }, { label: "Microfiber Cloth", desc: "Buff leather and wipe the midsole clean." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access mesh panels and lace lock area." }, { step: "2", label: "Dry Brush", desc: "Clear loose dirt from panels and outsole grooves." }],
  careCleaning: [{ step: "1", label: "Clean Leather Panels", desc: "Apply leather cleaner in circular motions with soft brush." }, { step: "2", label: "Gentle Mesh Cleaning", desc: "Light dabbing on mesh panels — never scrub or stretch the netting." }, { step: "3", label: "Restore Flight Wings", desc: "Magic Eraser on yellowed midsole flight wing areas." }, { step: "4", label: "Air Dry", desc: "Dry naturally; condition leather once fully dry." }],
  relatedModels: [{ name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" }, { name: "Air Jordan 3", href: "/encyclopedia/air-jordan-3" }, { name: "Air Jordan 11", href: "/encyclopedia/air-jordan-11" }, { name: "Nike Dunk Low", href: "/encyclopedia/nike-dunk-low" }],
},

{
  slug: "air-jordan-11",
  name: "Air Jordan 11",
  tagline: "The most popular Jordan ever made — the Air Jordan 11's patent leather and translucent sole introduced luxury to basketball shoes and made it the shoe of the Bulls' 72-win season.",
  brand: "Jordan Brand", firstRelease: "1995", designer: "Tinker Hatfield", retailPrice: "$220–$250", tier: 1,
  images: [
    { src: "/encyclopedia/air-jordan-11/hero.jpg", alt: "Air Jordan 11" },
    { src: "/encyclopedia/air-jordan-11/angle-1.jpg", alt: "Air Jordan 11 side" },
    { src: "/encyclopedia/air-jordan-11/angle-2.jpg", alt: "Air Jordan 11 angle" },
    { src: "/encyclopedia/air-jordan-11/detail.jpg", alt: "Air Jordan 11 detail" },
  ],
  marketSnapshot: { title: "Air Jordan 11 Market Overview", demand: "Very Strong Demand", avgResale: "$250–$800+", trend: "Stable — massive demand every holiday season", volatility: "Low to Medium", liquidity: "Very High", flipScore: "70 / 100", description: "The Jordan 11 is Nike's best-selling Jordan retro of all time. Holiday releases (Concord, Bred, Space Jam) generate enormous demand and reliable resale premiums. The Concord is the most recognizable and most traded Jordan 11 colorway. Low-tops and collabs add to its versatility as a resale target." },
  history: [
    "Tinker Hatfield designed the Air Jordan 11 in 1995 — MJ wore them during the Bulls' historic 72-10 season and the 1996 Championship run.",
    "The shoe's patent leather overlays and translucent icy outsole were unprecedented in basketball at the time, making the 11 feel more like a dress shoe than a sneaker.",
    "Jordan wore the 11 in the Bred colorway in Space Jam (1996), cementing its pop culture status beyond the basketball world.",
    "The Jordan 11 Concord retro of 2011 was so hyped it caused store incidents across the US — widely cited as the moment sneaker culture went mainstream.",
  ],
  designIntro: "The Air Jordan 11 is defined by its full-length Zoom Air midsole, patent leather overlays, translucent 'icy' outsole, carbon fiber shank, and the debut of a full-bootie construction in the Jordan line.",
  designBullets: ["Patent leather lower overlays — unprecedented in basketball footwear", "Translucent 'icy' outsole for clean, premium aesthetic", "Full-length Zoom Air midsole for responsive cushioning", "Carbon fiber shank for torsional rigidity", "Full-bootie construction for supportive fit"],
  colorways: [
    { name: "Concord (Black / Dark Concord)", note: "The defining Jordan 11 colorway — the most recognized and most traded retro in the Jordan line", market: "Strong premium" },
    { name: "Bred (Black / Varsity Red)", note: "Space Jam colorway — massive cultural moment, massive demand", market: "Strong premium" },
    { name: "Space Jam (Black / Dark Concord)", note: "Named after the film MJ wore them in — one of the most coveted Jordan 11 retros", market: "Very strong premium" },
    { name: "Legend Blue / Columbia Blue", note: "A clean colorway with consistent demand among Jordan collectors", market: "Above retail" },
  ],
  resaleParagraphs: ["The Jordan 11 is the most reliable Jordan retro for resale — every holiday Concord or Bred release generates significant demand and fast sell-through.", "The Jordan 11 is the most commonly faked Jordan — authentication is critical when buying for resale."],
  resaleHighlights: [{ label: "Best For", value: "Holiday retros — among the most reliable Jordan flips" }, { label: "Risk Level", value: "Low — very high demand, fast sell-through" }, { label: "Reseller Take", value: "Concord and Bred are the safest Jordan 11 flips every cycle" }],
  resellerInsight: { flipScore: "70 / 100", liquidity: "Very High", typicalMargin: "Consistent above retail on Concord and Bred", bestUse: "Holiday Concord/Bred retros", bullets: ["Concord and Bred are the most reliable Jordan 11 flip targets.", "Holiday releases sell fast — quick turnaround essential.", "Most faked Jordan — always verify authenticity before buying for resale."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Air Jordan 11 Pair Live", description: "Use SneakPrice to compare Jordan 11 colorway pricing and track demand across every release.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track Concord vs Bred pricing", "Monitor holiday release demand", "Compare Jordan 11 Low vs High prices"] },
  careIntro: ["The patent leather overlay is easy to wipe clean but can crack if dried out — condition the leather underneath regularly.", "The icy outsole yellows over time with UV exposure; store away from sunlight."],
  careTools: [{ label: "Patent Leather Cloth", desc: "Use a soft cloth to wipe patent leather — avoid abrasive brushes." }, { label: "Leather Conditioner", desc: "Apply to the canvas or leather upper (not patent) to prevent cracking." }, { label: "Magic Eraser", desc: "Carefully restore the icy outsole if yellowing." }, { label: "Microfiber Cloth", desc: "Buff the patent leather to a shine after cleaning." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full upper and bootie construction." }, { step: "2", label: "Wipe Patent Leather", desc: "Remove dust and fingerprints with a dry microfiber cloth first." }],
  careCleaning: [{ step: "1", label: "Clean Patent Leather", desc: "Wipe with a barely damp cloth — patent leather needs almost no solution." }, { step: "2", label: "Clean Mesh Upper", desc: "Apply diluted sneaker solution to mesh sections with soft brush." }, { step: "3", label: "Restore Icy Sole", desc: "Use Magic Eraser carefully on yellowed translucent outsole." }, { step: "4", label: "Air Dry & Store", desc: "Dry naturally; store away from UV light to slow re-yellowing." }],
  relatedModels: [{ name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" }, { name: "Air Jordan 3", href: "/encyclopedia/air-jordan-3" }, { name: "Air Jordan 4", href: "/encyclopedia/air-jordan-4" }, { name: "Air Jordan 12", href: "/encyclopedia/air-jordan-12" }],
},

{
  slug: "air-jordan-12",
  name: "Air Jordan 12",
  tagline: "Designed with the Japanese flag as inspiration and worn during the 'Flu Game' — the Air Jordan 12 is a basketball icon with one of the most dramatic performance legacies in sneaker history.",
  brand: "Jordan Brand", firstRelease: "1996", designer: "Tinker Hatfield", retailPrice: "$210–$225", tier: 1,
  images: [
    { src: "/encyclopedia/air-jordan-12/hero.jpg", alt: "Air Jordan 12" },
    { src: "/encyclopedia/air-jordan-12/angle-1.jpg", alt: "Air Jordan 12 side" },
    { src: "/encyclopedia/air-jordan-12/angle-2.jpg", alt: "Air Jordan 12 angle" },
    { src: "/encyclopedia/air-jordan-12/detail.jpg", alt: "Air Jordan 12 detail" },
  ],
  marketSnapshot: { title: "Air Jordan 12 Market Overview", demand: "Strong Demand", avgResale: "$200–$500+", trend: "Stable", volatility: "Medium", liquidity: "High", flipScore: "62 / 100", description: "The Jordan 12 is a strong retro performer with reliable above-retail demand on key colorways. The Flu Game, Taxi, and Wings colorways drive the strongest premiums. A solid collector's Jordan with good but not exceptional flip potential compared to the 3, 4, and 11." },
  history: [
    "Tinker Hatfield designed the Air Jordan 12 in 1996 inspired by the Japanese flag and the quilted pattern of a kimono — an unusual cultural reference that gave the shoe its distinctive paneling.",
    "Jordan wore the 12 during the legendary 'Flu Game' in the 1997 NBA Finals — scoring 38 points despite severe illness — in the Bred/Black colorway.",
    "The Jordan 12 'Taxi' colorway became the defining GR retro colorway, beloved for its clean black-and-gold aesthetic.",
    "Later retros have introduced premium materials and collabs that keep the Jordan 12 relevant across both collector and lifestyle markets.",
  ],
  designIntro: "The Air Jordan 12 is defined by its distinctive quilted leather paneling (inspired by the Japanese flag's Hinomaru), full-length Zoom Air, leather-wrapped midsole, and lace lock inspired by tennis shoe design.",
  designBullets: ["Distinctive quilted leather upper panels inspired by the Japanese flag", "Full-length Zoom Air for responsive cushioning", "Leather-wrapped midsole for a premium finish", "Lace lock mechanism on the tongue", "Solid rubber outsole with herringbone traction"],
  colorways: [
    { name: "Flu Game (Black / Varsity Red)", note: "Worn during MJ's legendary performance — one of the most historically significant Jordan colorways", market: "Strong premium" },
    { name: "Taxi (Black / Metallic Gold)", note: "The most iconic standard retro colorway — black and gold paneling with broad appeal", market: "Above retail" },
    { name: "Wings", note: "Special release honoring Jordan's 2016 flight school initiative — limited and collectible", market: "Strong premium" },
  ],
  resaleParagraphs: ["The Jordan 12 is a reliable retro performer — Flu Game and Taxi colorways consistently sell above retail.", "Key collabs and special editions push the Jordan 12 to upper-tier resale territory."],
  resaleHighlights: [{ label: "Best For", value: "Flu Game, Taxi, and key special editions" }, { label: "Risk Level", value: "Low to Medium" }, { label: "Reseller Take", value: "Flu Game is the safest bet; Taxi has broad appeal" }],
  resellerInsight: { flipScore: "62 / 100", liquidity: "High", typicalMargin: "Solid above retail on key colorways", bestUse: "Key colorway retros", bullets: ["Flu Game and Taxi are the most reliable flips.", "Strong collector following with consistent demand.", "Less volatile than the 4 or 11 — reliable but moderate margin."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Air Jordan 12 Pair Live", description: "Use SneakPrice to compare Jordan 12 colorway pricing and track demand.", primaryHref: "/", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/exchange", secondaryLabel: "Open market tools", bullets: ["Track Flu Game vs Taxi pricing", "Compare Jordan 12 demand by colorway", "Identify Jordan 12 release opportunities"] },
  careIntro: ["The quilted leather paneling on the Jordan 12 needs gentle care — the stitching in the quilted sections can trap dirt.", "The leather-wrapped midsole is susceptible to scuffing; clean it regularly."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Cleans leather panels and gets into quilted stitching." }, { label: "Leather Cleaner", desc: "Keeps the upper panels clean and prevents cracking." }, { label: "Leather Conditioner", desc: "Maintains suppleness of all leather areas including the midsole wrap." }, { label: "Magic Eraser", desc: "Effective on the leather-wrapped midsole and rubber outsole." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full upper and quilted panels." }, { step: "2", label: "Dry Brush", desc: "Remove loose dirt from quilted stitching and outsole." }],
  careCleaning: [{ step: "1", label: "Clean Quilted Leather", desc: "Apply leather cleaner with soft brush — work into the quilted recesses." }, { step: "2", label: "Clean Midsole Wrap", desc: "Leather cleaner on the leather-wrapped midsole, Magic Eraser on rubber." }, { step: "3", label: "Condition All Leather", desc: "Apply conditioner to both upper and midsole wrap." }, { step: "4", label: "Air Dry", desc: "Dry naturally away from heat." }],
  relatedModels: [{ name: "Air Jordan 3", href: "/encyclopedia/air-jordan-3" }, { name: "Air Jordan 4", href: "/encyclopedia/air-jordan-4" }, { name: "Air Jordan 11", href: "/encyclopedia/air-jordan-11" }, { name: "Nike Dunk Low", href: "/encyclopedia/nike-dunk-low" }],
},

// ─── K ────────────────────────────────────────────────────────────────────────

{
  slug: "gel-kayano-30",
  name: "Asics Gel-Kayano 30",
  tagline: "Three decades of stability running excellence — the Gel-Kayano 30 marks a landmark edition of Asics' flagship motion control shoe, blending heritage engineering with modern foam technology.",
  brand: "Asics", firstRelease: "1993", designer: "Asics", retailPrice: "$160–$175", tier: 2,
  images: [
    { src: "/encyclopedia/gel-kayano-30/hero.jpg", alt: "Asics Gel-Kayano 30" },
    { src: "/encyclopedia/gel-kayano-30/angle-1.jpg", alt: "Asics Gel-Kayano 30 side" },
    { src: "/encyclopedia/gel-kayano-30/angle-2.jpg", alt: "Asics Gel-Kayano 30 angle" },
    { src: "/encyclopedia/gel-kayano-30/detail.jpg", alt: "Asics Gel-Kayano 30 detail" },
  ],
  marketSnapshot: { title: "Asics Gel-Kayano 30 Market Overview", demand: "Strong Demand", avgResale: "$120–$175", trend: "Stable", volatility: "Low", liquidity: "Low", flipScore: "18 / 100", description: "The Gel-Kayano is a performance running shoe purchased overwhelmingly at retail by runners requiring stability support. Virtually no resale market — this is a wear shoe designed for serious runners, not collectors." },
  history: [
    "Asics introduced the Gel-Kayano in 1993, named after designer Toshikazu Kayano — it quickly became the gold standard for stability running shoes among overpronators.",
    "Over 30 versions spanning three decades, the Kayano has refined its stability platform from basic Motion Control to the current FF Blast+ foam with Litetruss technology.",
    "The Kayano 30 introduced a significant design refresh alongside its 30th anniversary — softer underfoot feel with improved stability mechanics appealing to a broader range of runners.",
    "Asics released the Gel-Kayano 14 as a lifestyle retro as the silhouette gained streetwear credibility — but the Kayano 30 remains firmly a performance-first shoe.",
  ],
  designIntro: "The Gel-Kayano 30 features a FF Blast+ midsole foam, Litetruss technology for dynamic stability, Gel cushioning in the heel, and a breathable engineered mesh upper built for long-distance running.",
  designBullets: ["FF Blast+ midsole foam for soft, responsive cushioning", "Litetruss technology replacing traditional medial post for stability", "Gel cushioning in the heel for impact absorption", "Breathable engineered mesh upper", "High-abrasion AHAR+ rubber outsole for durability"],
  colorways: [
    { name: "Black / Graphite Grey", note: "Versatile, understated colorway popular for both running and casual wear", market: "Retail" },
    { name: "White / Pale Blue", note: "Clean light colorway popular with female runners and lifestyle crossover buyers", market: "Retail" },
    { name: "Limited Anniversary Colorways", note: "30th anniversary special editions with modest collector interest", market: "Near retail" },
  ],
  resaleParagraphs: ["The Gel-Kayano is a performance shoe with no meaningful resale market — almost all pairs are purchased at retail for running.", "The Gel-Kayano 14 retro has more lifestyle/collector appeal; the Kayano 30 is strictly a performance purchase."],
  resaleHighlights: [{ label: "Best For", value: "Running performance — no resale market" }, { label: "Risk Level", value: "Very Low — but no upside" }, { label: "Reseller Take", value: "Buy to run, not to flip" }],
  resellerInsight: { flipScore: "18 / 100", liquidity: "Low", typicalMargin: "None", bestUse: "Personal running use", bullets: ["No resale market for the Kayano 30.", "If interested in Asics resale, focus on Gel-Lyte III collabs instead.", "The Kayano 14 retro has more collector potential."] },
  cta: { eyebrow: "Live Market Tool", title: "Check Gel-Kayano 30 Pricing Live", description: "Use SneakPrice to compare current pricing across Gel-Kayano colorways.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare pricing across running stores", "Track anniversary edition availability", "Find the best current retail price"] },
  careIntro: ["The Gel-Kayano 30's engineered mesh upper collects dirt during running — clean regularly to maintain breathability.", "The rubber outsole needs cleaning after trail or wet-road runs to maintain traction."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Removes dirt from mesh upper without distorting the knit." }, { label: "Sneaker Cleaning Solution", desc: "Safe for mesh; dilute well and avoid soaking the midsole foam." }, { label: "Microfiber Cloth", desc: "Wipe the midsole and outsole clean after cleaning." }, { label: "Warm Water", desc: "Helps loosen debris from the outsole lugs." }],
  carePrep: [{ step: "1", label: "Remove Insoles & Laces", desc: "Air the insoles separately; remove laces for full upper access." }, { step: "2", label: "Dry Brush", desc: "Knock off loose dirt before introducing any liquid." }],
  careCleaning: [{ step: "1", label: "Clean Mesh Upper", desc: "Apply diluted solution with soft brush in light circular motions." }, { step: "2", label: "Wipe Midsole", desc: "Damp cloth on the FF Blast+ midsole to remove grime." }, { step: "3", label: "Scrub Outsole", desc: "Firm brush on the AHAR+ rubber outsole to clear traction lugs." }, { step: "4", label: "Air Dry", desc: "Stuff with paper and dry at room temperature — never machine dry." }],
  relatedModels: [{ name: "Asics Gel-Kayano", href: "/encyclopedia/asics-gel-kayano" }, { name: "New Balance Fresh Foam 1080", href: "/encyclopedia/fresh-foam-1080" }, { name: "Brooks Ghost", href: "/encyclopedia/brooks-ghost" }, { name: "Asics Gel-Lyte III", href: "/encyclopedia/gel-lyte-iii" }],
},

{
  slug: "nike-kobe-6",
  name: "Nike Kobe 6",
  tagline: "Inspired by the Black Mamba's relentless mentality and the anatomy of a snake — the Kobe 6 is one of the most technically sophisticated and culturally significant signature shoes in Nike's basketball history.",
  brand: "Nike", firstRelease: "2010", designer: "Nike Basketball", retailPrice: "$180–$200", tier: 1,
  images: [
    { src: "/encyclopedia/nike-kobe-6/hero.jpg", alt: "Nike Kobe 6" },
    { src: "/encyclopedia/nike-kobe-6/angle-1.jpg", alt: "Nike Kobe 6 side" },
    { src: "/encyclopedia/nike-kobe-6/angle-2.jpg", alt: "Nike Kobe 6 angle" },
    { src: "/encyclopedia/nike-kobe-6/detail.jpg", alt: "Nike Kobe 6 detail" },
  ],
  marketSnapshot: { title: "Nike Kobe 6 Market Overview", demand: "Very Strong Demand", avgResale: "$200–$800+", trend: "Rising — demand intensified since Kobe's passing in 2020", volatility: "Medium", liquidity: "High", flipScore: "72 / 100", description: "The Kobe 6 is among the most liquid and collectible Nike basketball shoes. The Protro retro program, combined with strong emotional demand following Kobe's 2020 passing, has made it one of the most active resale targets in the Nike lineup. Grinch and EYBL colorways are the strongest performers." },
  history: [
    "Nike Basketball designed the Kobe 6 in 2010 with input from Kobe Bryant himself — he requested the lowest possible profile and maximum court feel, resulting in a shoe that sat only 4 inches from the floor.",
    "The snake scale pattern on the upper references Kobe's 'Black Mamba' alter ego — a design language woven throughout the Kobe line.",
    "The Kobe 6 Grinch — worn during the 2010 Christmas Day game — became one of the most beloved Kobe colorways and one of the most hyped Nike Protro releases in the retro program.",
    "Following Kobe Bryant's tragic passing in January 2020, demand for Kobe 6 pairs surged significantly across all colorways and has remained elevated since.",
  ],
  designIntro: "The Kobe 6 is defined by its ultra-low profile, dynamic Flywire upper, Zoom Air cushioning, herringbone outsole for multidirectional traction, and snake scale texture detail across the upper.",
  designBullets: ["Ultra-low profile for maximum court feel", "Dynamic Flywire support system in the upper", "Zoom Air cushioning for responsive impact protection", "Herringbone outsole for multidirectional traction", "Snake scale texture detail referencing the Black Mamba"],
  colorways: [
    { name: "Grinch (Black / Green)", note: "Worn on 2010 Christmas Day — the most beloved Kobe 6 colorway with massive demand", market: "Very strong premium" },
    { name: "Black Mamba", note: "The snake-print version of the Kobe 6 — highly collectible among Kobe fans", market: "Strong premium" },
    { name: "EYBL", note: "Limited Elite Youth Basketball League release — among the most coveted Kobe 6 variants", market: "Very strong premium" },
    { name: "Protro 'What The'", note: "Multi-colorway mashup celebrating the Kobe line's history", market: "Above retail" },
  ],
  resaleParagraphs: ["The Kobe 6 has been one of the strongest-performing Nike Protro lines — demand elevated by Kobe's legacy and limited supply windows.", "Grinch and EYBL colorways are among the highest-demand Nike basketball shoes in the modern resale market."],
  resaleHighlights: [{ label: "Best For", value: "Grinch, EYBL, and key Protro releases" }, { label: "Risk Level", value: "Low to Medium — demand is sustained" }, { label: "Reseller Take", value: "Grinch is the safest Kobe 6 flip — demand is reliably very high" }],
  resellerInsight: { flipScore: "72 / 100", liquidity: "High", typicalMargin: "Strong on Grinch and key colorways", bestUse: "Grinch and EYBL targeting", bullets: ["Grinch sells fast and well above retail consistently.", "EYBL is extremely limited — very high demand when available.", "Kobe's passing has permanently elevated baseline demand for all Kobe 6 pairs."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Kobe 6 Pair Live", description: "Use SneakPrice to compare Kobe 6 Protro pricing and identify the strongest resale opportunities.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track Grinch vs standard Protro pricing", "Monitor Kobe 6 release windows", "Compare colorway demand in real time"] },
  careIntro: ["The Kobe 6's Flywire upper and low-profile midsole require careful cleaning — the shoe sits close to the floor, making the outsole particularly prone to grime.", "The snake scale texture detail can trap dirt in its recesses."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Cleans the Flywire upper and gets into snake scale texture." }, { label: "Sneaker Cleaning Solution", desc: "Safe for the synthetic upper materials." }, { label: "Microfiber Cloth", desc: "Wipe the midsole and upper after cleaning." }, { label: "Magic Eraser", desc: "Effective on the low midsole for scuff removal." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full upper and Flywire construction." }, { step: "2", label: "Dry Brush", desc: "Remove loose dirt from snake scale texture and outsole." }],
  careCleaning: [{ step: "1", label: "Clean Upper", desc: "Apply diluted solution with soft brush — work into snake scale texture carefully." }, { step: "2", label: "Wipe Midsole", desc: "Magic Eraser or damp cloth on the low-profile midsole." }, { step: "3", label: "Scrub Outsole", desc: "Firm brush on the herringbone outsole to restore traction pattern." }, { step: "4", label: "Air Dry", desc: "Dry naturally at room temperature." }],
  relatedModels: [{ name: "Air Jordan 11", href: "/encyclopedia/air-jordan-11" }, { name: "Air Jordan 4", href: "/encyclopedia/air-jordan-4" }, { name: "Nike Dunk Low", href: "/encyclopedia/nike-dunk-low" }, { name: "LeBron 21", href: "/encyclopedia/lebron-21" }],
},

// ─── L ────────────────────────────────────────────────────────────────────────

{
  slug: "lebron-21",
  name: "Nike LeBron 21",
  tagline: "LeBron James' 21st signature shoe — a maximum-cushion basketball performance shoe built for the game's greatest player at the peak of his career.",
  brand: "Nike", firstRelease: "2023", designer: "Nike Basketball", retailPrice: "$200", tier: 2,
  images: [
    { src: "/encyclopedia/lebron-21/hero.jpg", alt: "Nike LeBron 21" },
    { src: "/encyclopedia/lebron-21/angle-1.jpg", alt: "Nike LeBron 21 side" },
    { src: "/encyclopedia/lebron-21/angle-2.jpg", alt: "Nike LeBron 21 angle" },
    { src: "/encyclopedia/lebron-21/detail.jpg", alt: "Nike LeBron 21 detail" },
  ],
  marketSnapshot: { title: "Nike LeBron 21 Market Overview", demand: "Moderate Demand", avgResale: "$150–$300", trend: "Stable", volatility: "Medium", liquidity: "Moderate", flipScore: "38 / 100", description: "The LeBron signature line has strong brand loyalty but mixed resale results. Performance-focused colorways trade near retail; player exclusives and limited editions command premiums. LeBron 21 Player Exclusive (PE) colorways are the primary resale target." },
  history: [
    "Nike released the LeBron 21 in 2023 as LeBron James continued to rewrite the NBA record books — designed to support his all-court, power-forward playing style.",
    "The LeBron line has historically tied releases to key LeBron milestones, with PE colorways celebrating achievements like his scoring records generating the most demand.",
    "The LeBron 21 introduced an updated React + Zoom Air cushioning stack and a modernized upper construction designed for LeBron's evolving playing style in his later career years.",
  ],
  designIntro: "The LeBron 21 features a React foam + Zoom Air cushioning stack, a textured knit upper, supportive heel counter, wide stable platform, and bold colorway treatment consistent with LeBron's signature aesthetic.",
  designBullets: ["React + Zoom Air cushioning for maximum impact protection", "Textured knit upper for breathability and fit", "Supportive heel counter for landing stability", "Wide platform for LeBron's power-forward style", "Bold colorblocking consistent with LeBron signature aesthetic"],
  colorways: [
    { name: "Sworn to the Mist", note: "One of the standout GR colorways of the LeBron 21 — distinctive teal/grey treatment", market: "Near retail" },
    { name: "Player Exclusives (PE)", note: "Milestone PEs tied to LeBron's achievements — the primary resale opportunity in the LeBron line", market: "Strong premium on key PEs" },
    { name: "Akron Elites", note: "Gold/burgundy colorway celebrating LeBron's Ohio roots", market: "Modest premium" },
  ],
  resaleParagraphs: ["Standard LeBron 21 GRs trade near or below retail — performance basketball shoes rarely generate mass resale demand.", "Player Exclusives and milestone-tied limited releases are the only meaningful resale opportunities in the LeBron 21 lineup."],
  resaleHighlights: [{ label: "Best For", value: "Key PEs and milestone releases only" }, { label: "Risk Level", value: "Medium — most GRs don't generate margin" }, { label: "Reseller Take", value: "Wait for PEs; skip GRs entirely" }],
  resellerInsight: { flipScore: "38 / 100", liquidity: "Moderate", typicalMargin: "None on GRs, strong on key PEs", bestUse: "PE and milestone release targeting", bullets: ["GRs stay near or below retail — not a flip target.", "PEs tied to LeBron milestones are the only real resale opportunity.", "LeBron brand loyalty supports sustained demand even as GRs underperform."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any LeBron 21 Pair Live", description: "Use SneakPrice to compare LeBron 21 pricing and track PE demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track PE vs GR pricing", "Monitor LeBron milestone release demand", "Compare against earlier LeBron editions"] },
  careIntro: ["The LeBron 21's knit upper needs gentle cleaning — avoid over-wetting the midsole foam stack.", "The wide outsole accumulates court grime; clean regularly to maintain traction."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Gently cleans the textured knit upper." }, { label: "Sneaker Cleaning Solution", desc: "Diluted formula safe for the knit upper." }, { label: "Microfiber Cloth", desc: "Wipe the midsole and outsole after cleaning." }, { label: "Magic Eraser", desc: "Effective on midsole scuffs." }],
  carePrep: [{ step: "1", label: "Remove Insoles & Laces", desc: "Full access to the upper and interior." }, { step: "2", label: "Dry Brush", desc: "Remove loose dirt from knit and outsole before moisture." }],
  careCleaning: [{ step: "1", label: "Clean Knit Upper", desc: "Apply diluted solution with soft brush using light circular motions." }, { step: "2", label: "Wipe Midsole", desc: "Damp cloth on the React foam midsole." }, { step: "3", label: "Scrub Outsole", desc: "Firm brush on the wide rubber outsole to clear court grime." }, { step: "4", label: "Air Dry", desc: "Dry fully at room temperature before re-inserting insoles." }],
  relatedModels: [{ name: "Nike Kobe 6", href: "/encyclopedia/nike-kobe-6" }, { name: "Air Jordan 11", href: "/encyclopedia/air-jordan-11" }, { name: "Air Jordan 4", href: "/encyclopedia/air-jordan-4" }, { name: "New Balance Fresh Foam 1080", href: "/encyclopedia/fresh-foam-1080" }],
},

// ─── M ────────────────────────────────────────────────────────────────────────

{
  slug: "new-balance-m990v6",
  name: "New Balance M990v6",
  tagline: "The pinnacle of New Balance's Made in USA heritage — the M990v6 continues four decades of refined craftsmanship, premium materials, and the most trusted running platform in the brand's history.",
  brand: "New Balance", firstRelease: "1982", designer: "New Balance", retailPrice: "$200", tier: 1,
  images: [
    { src: "/encyclopedia/new-balance-m990v6/hero.jpg", alt: "New Balance M990v6" },
    { src: "/encyclopedia/new-balance-m990v6/angle-1.jpg", alt: "New Balance M990v6 side" },
    { src: "/encyclopedia/new-balance-m990v6/angle-2.jpg", alt: "New Balance M990v6 angle" },
    { src: "/encyclopedia/new-balance-m990v6/detail.jpg", alt: "New Balance M990v6 detail" },
  ],
  marketSnapshot: { title: "New Balance M990v6 Market Overview", demand: "Strong Demand", avgResale: "$180–$350", trend: "Stable — consistent collector demand", volatility: "Low", liquidity: "Moderate", flipScore: "45 / 100", description: "The M990 series has a loyal Made in USA collector base with consistent resale performance on limited colorways and collabs. Standard grey GRs trade modestly above retail; boutique collabs and limited colorways command stronger premiums among NB purists." },
  history: [
    "New Balance introduced the 990 in 1982 as the most expensive running shoe on the market at $100 — a bold statement on craftsmanship and performance.",
    "The 990 series has remained manufactured in the USA throughout its entire run — one of very few American-made athletic shoes still produced domestically.",
    "The v6 update in 2022 refined the midsole cushioning with improved ENCAP technology, updated the upper materials, and continued the 990's legacy as New Balance's premier Made in USA platform.",
    "High-profile collabs with Joe Freshgoods, Teddy Santis, and boutique retailers have elevated the 990 series to the top tier of lifestyle running collector culture.",
  ],
  designIntro: "The M990v6 is defined by its premium suede and mesh upper, ENCAP midsole combining a polyurethane rim with a EVA core, dual-density collar foam, and the N logo on the lateral side.",
  designBullets: ["Premium suede and mesh upper combination", "ENCAP midsole for stability and long-lasting cushioning", "Made in USA construction with premium domestic materials", "Iconic N logo on lateral side", "Reliable widths from 2A (narrow) to 4E (extra wide)"],
  colorways: [
    { name: "Grey / Silver (OG Colorway)", note: "The defining 990 colorway — the grey suede has been the standard since 1982", market: "Near to above retail" },
    { name: "Joe Freshgoods x New Balance 990v6 'Inside Voices'", note: "One of the most celebrated NB collabs of the modern era — strong demand and premium", market: "Strong resale premium" },
    { name: "Teddy Santis Limited Colorways", note: "NB creative director's special editions with boutique-level appeal", market: "Above retail" },
  ],
  resaleParagraphs: ["Standard M990v6 GRs trade modestly above retail — strong demand but limited margin compared to Jordans or Dunks.", "Boutique collabs and Teddy Santis editions drive the strongest resale premiums among Made in USA sneaker collectors."],
  resaleHighlights: [{ label: "Best For", value: "Collab flips and Made in USA collector targeting" }, { label: "Risk Level", value: "Low to Medium" }, { label: "Reseller Take", value: "Joe Freshgoods and boutique collabs are the strongest opportunities" }],
  resellerInsight: { flipScore: "45 / 100", liquidity: "Moderate", typicalMargin: "Modest on GRs, strong on collabs", bestUse: "Boutique collab targeting", bullets: ["Grey GRs move above retail reliably but with modest margin.", "Joe Freshgoods collab is the benchmark Made in USA NB flip.", "Strong collector community ensures sustained demand."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any M990v6 Pair Live", description: "Use SneakPrice to compare M990v6 pricing and track collab demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track collab vs standard GR pricing", "Monitor Made in USA collector demand", "Find boutique releases with real premium"] },
  careIntro: ["The M990v6's premium suede upper needs regular brushing and conditioning to maintain its appearance.", "The ENCAP midsole is durable but can discolor — wipe it clean after each use."],
  careTools: [{ label: "Suede Brush", desc: "Essential for maintaining the suede nap." }, { label: "Suede Eraser", desc: "Lifts scuffs from suede panels." }, { label: "Microfiber Cloth", desc: "Wipe the ENCAP midsole and N logo area." }, { label: "Crep Protect Spray", desc: "Apply to suede after cleaning for protection." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full suede upper." }, { step: "2", label: "Dry Brush", desc: "Brush suede in one direction before cleaning." }],
  careCleaning: [{ step: "1", label: "Treat Suede", desc: "Brush or erase the suede upper — restore nap direction." }, { step: "2", label: "Wipe Midsole", desc: "Damp cloth on the ENCAP midsole." }, { step: "3", label: "Scrub Outsole", desc: "Firm brush on the rubber outsole." }, { step: "4", label: "Protect", desc: "Apply suede protector spray once dry." }],
  relatedModels: [{ name: "New Balance 990v6", href: "/encyclopedia/new-balance-990v6" }, { name: "New Balance 2002R", href: "/encyclopedia/new-balance-2002r" }, { name: "New Balance 574", href: "/encyclopedia/new-balance-574" }, { name: "New Balance Fresh Foam 1080", href: "/encyclopedia/fresh-foam-1080" }],
},

{
  slug: "new-balance-2002r",
  name: "New Balance 2002R",
  tagline: "A retro runner reborn — the New Balance 2002R revived a forgotten 2000s tech-running silhouette and transformed it into one of the most hotly collected New Balance lifestyle models of the 2020s.",
  brand: "New Balance", firstRelease: "2020", designer: "New Balance", retailPrice: "$140–$180", tier: 2,
  images: [
    { src: "/encyclopedia/new-balance-2002r/hero.jpg", alt: "New Balance 2002R" },
    { src: "/encyclopedia/new-balance-2002r/angle-1.jpg", alt: "New Balance 2002R side" },
    { src: "/encyclopedia/new-balance-2002r/angle-2.jpg", alt: "New Balance 2002R angle" },
    { src: "/encyclopedia/new-balance-2002r/detail.jpg", alt: "New Balance 2002R detail" },
  ],
  marketSnapshot: { title: "New Balance 2002R Market Overview", demand: "Strong Demand", avgResale: "$120–$300", trend: "Stable after 2021-2022 peak", volatility: "Low to Medium", liquidity: "Moderate", flipScore: "48 / 100", description: "The 2002R had significant hype through 2021-2022 and has since stabilized. Protection Pack colorways and key collabs remain above retail. Standard GRs trade close to retail; boutique and lifestyle collabs command premiums." },
  history: [
    "The original New Balance 2002 launched in the early 2000s as a high-tech running shoe with N-ergy and ABZORB cushioning but faded from prominence.",
    "New Balance revived it as the 2002R ('R' for retro) in 2020 — recontextualizing the technical running design as a lifestyle shoe at the right moment in the heritage running boom.",
    "The 2002R Protection Pack series (featuring protective overlays and premium materials) became the shoe's breakout collector moment and established it as a New Balance lifestyle staple.",
    "Collaborations with Aime Leon Dore, Joe Freshgoods, and global boutiques have kept the 2002R in the conversation as one of New Balance's top lifestyle runners.",
  ],
  designIntro: "The New Balance 2002R features an N-ergy foam midsole, ABZORB cushioning, suede and mesh upper layers, and the chunky retro runner profile that defined its 2000s tech-running heritage.",
  designBullets: ["N-ergy foam midsole for cushioned daily comfort", "ABZORB cushioning pads for heel impact absorption", "Layered suede and mesh upper for texture and breathability", "Chunky retro runner profile from 2000s tech-running era", "Available in regular and wide widths"],
  colorways: [
    { name: "Protection Pack 'Magnet'", note: "The colorway that launched the 2002R's collector moment — dark grey suede with protective detail", market: "Above retail" },
    { name: "Aime Leon Dore x New Balance 2002R", note: "One of the most successful ALD collabs — drives premium demand with the NYC fashion crowd", market: "Strong resale premium" },
    { name: "Protection Pack 'Rain Cloud'", note: "Light grey version of the Protection Pack — clean lifestyle appeal", market: "Near to above retail" },
  ],
  resaleParagraphs: ["The 2002R's hype has normalized — standard GRs now trade near retail while Protection Pack and collab pairs retain above-retail positioning.", "Boutique collabs (ALD, Stussy) remain the strongest resale opportunities in the 2002R lineup."],
  resaleHighlights: [{ label: "Best For", value: "Protection Pack and key collab flips" }, { label: "Risk Level", value: "Low on standard, Medium on collabs" }, { label: "Reseller Take", value: "ALD collab pairs and Protection Pack are the strongest targets" }],
  resellerInsight: { flipScore: "48 / 100", liquidity: "Moderate", typicalMargin: "Modest on GRs, strong on collabs", bestUse: "Collab targeting and Protection Pack monitoring", bullets: ["Standard 2002R GRs are near retail — modest flip territory.", "ALD and boutique collabs command real premiums.", "Protection Pack colorways remain elevated above standard GRs."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any New Balance 2002R Pair Live", description: "Use SneakPrice to compare 2002R pricing and track collab demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track Protection Pack vs standard GR pricing", "Monitor boutique collab demand", "Compare 2002R vs 990 resale performance"] },
  careIntro: ["The 2002R's suede and mesh upper combo needs regular brushing on suede and light cleaning on mesh panels.", "The chunky midsole collects grime in its recessed areas — clean it regularly."],
  careTools: [{ label: "Suede Brush", desc: "Essential for suede panels." }, { label: "Soft-bristle Brush", desc: "Cleans mesh panels gently." }, { label: "Sneaker Cleaning Solution", desc: "Diluted formula for mesh areas." }, { label: "Microfiber Cloth", desc: "Wipe the midsole and N logo." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Full upper access for thorough cleaning." }, { step: "2", label: "Dry Brush Suede", desc: "Brush suede panels in one direction first." }],
  careCleaning: [{ step: "1", label: "Treat Suede", desc: "Brush or erase suede panels." }, { step: "2", label: "Clean Mesh", desc: "Apply diluted solution with soft brush to mesh sections." }, { step: "3", label: "Clean Midsole", desc: "Damp cloth in the midsole recesses." }, { step: "4", label: "Air Dry & Protect", desc: "Dry naturally then apply suede protector." }],
  relatedModels: [{ name: "New Balance M990v6", href: "/encyclopedia/new-balance-m990v6" }, { name: "New Balance 550", href: "/encyclopedia/new-balance-550" }, { name: "New Balance 574", href: "/encyclopedia/new-balance-574" }, { name: "Adidas EQT Support ADV", href: "/encyclopedia/eqt-support-adv" }],
},

{
  slug: "nike-mayfly",
  name: "Nike Mayfly",
  tagline: "Designed with a 100km lifespan and weighing almost nothing — the Nike Mayfly was a radical 2000s ultra-racing flat that found an unlikely second life as a minimalist lifestyle sneaker.",
  brand: "Nike", firstRelease: "2000", designer: "Nike", retailPrice: "$80–$100", tier: 3,
  images: [
    { src: "/encyclopedia/nike-mayfly/hero.jpg", alt: "Nike Mayfly" },
    { src: "/encyclopedia/nike-mayfly/angle-1.jpg", alt: "Nike Mayfly side" },
    { src: "/encyclopedia/nike-mayfly/angle-2.jpg", alt: "Nike Mayfly angle" },
    { src: "/encyclopedia/nike-mayfly/detail.jpg", alt: "Nike Mayfly detail" },
  ],
  marketSnapshot: { title: "Nike Mayfly Market Overview", demand: "Niche Demand", avgResale: "$60–$150", trend: "Stable — niche lifestyle following", volatility: "Low", liquidity: "Low", flipScore: "20 / 100", description: "The Mayfly is a deeply niche product with a small but passionate following among minimalist sneaker fans and lifestyle buyers. Resale activity is minimal — primarily a wear shoe for those who appreciate its unique design philosophy." },
  history: [
    "Nike designed the Mayfly in 2000 explicitly around a 100-kilometer lifespan — intended as a single-race disposable racing shoe, its extremely thin construction prioritized weight over durability.",
    "The shoe weighed just 100 grams per shoe — one of the lightest running shoes ever produced by a major brand.",
    "Nike revived the Mayfly as a lifestyle model around 2016, leaning into its minimal aesthetic and design story for a fashion-forward audience who valued the shoe's unusual philosophy.",
    "The Mayfly Woven — a version with a woven upper — became a cult favorite among minimal footwear enthusiasts and design-aware lifestyle buyers.",
  ],
  designIntro: "The Nike Mayfly is defined by its tissue-thin construction, minimal EVA foam midsole, translucent mesh or woven upper, and the deliberate absence of excess material — designed to be used up, not preserved.",
  designBullets: ["Ultra-lightweight construction — as little as 100g per shoe", "Thin EVA foam midsole with minimal cushioning", "Translucent mesh or woven upper for breathability", "Low-profile racing flat silhouette", "Minimal branding consistent with its anti-excess design philosophy"],
  colorways: [
    { name: "Mayfly Woven (White/Grey)", note: "The lifestyle version that caught fashion attention — woven upper with clean minimal aesthetic", market: "Near retail" },
    { name: "Premium GR Colorways", note: "Limited premium builds in fashion-forward colorways for the lifestyle market", market: "Near retail" },
  ],
  resaleParagraphs: ["The Mayfly has virtually no active resale market — it's a niche lifestyle purchase for buyers who appreciate its design story.", "Some limited woven versions trade slightly above retail but volume is very thin."],
  resaleHighlights: [{ label: "Best For", value: "Personal wear — no resale market" }, { label: "Risk Level", value: "Low — but no upside" }, { label: "Reseller Take", value: "Skip entirely for resale" }],
  resellerInsight: { flipScore: "20 / 100", liquidity: "Low", typicalMargin: "None", bestUse: "Personal wear for minimalism enthusiasts", bullets: ["Virtually no resale market.", "Niche product for a specific lifestyle buyer.", "Not a flip target under any circumstances."] },
  cta: { eyebrow: "Live Market Tool", title: "Check Mayfly Pricing Live", description: "Use SneakPrice to check current Mayfly pricing and availability.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track current availability", "Compare colorway pricing", "Find the best current price"] },
  careIntro: ["The Mayfly's tissue-thin construction requires extremely gentle care — it is not built to be aggressively cleaned.", "The shoe's design intentionally accepts wear as part of its lifespan — clean lightly and regularly rather than aggressively."],
  careTools: [{ label: "Very Soft Brush", desc: "The gentlest option for cleaning the delicate mesh upper." }, { label: "Damp Cloth", desc: "Lightly wipe surfaces without soaking the thin upper." }, { label: "Mild Soap", desc: "Minimal diluted soap for targeted spot cleaning only." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Handle the shoe very gently throughout." }, { step: "2", label: "Assess Damage First", desc: "The Mayfly's construction cannot recover from aggressive cleaning — evaluate before proceeding." }],
  careCleaning: [{ step: "1", label: "Spot Clean Only", desc: "Target specific dirty areas with a barely damp cloth and mild soap." }, { step: "2", label: "Blot Dry", desc: "Press microfiber gently to absorb moisture — never wring or rub." }, { step: "3", label: "Air Dry", desc: "Let dry fully at room temperature away from heat." }],
  relatedModels: [{ name: "Nike Flyknit Racer", href: "/encyclopedia/flyknit-racer" }, { name: "Nike Air Max 90", href: "/encyclopedia/air-max-90" }, { name: "New Balance Fresh Foam 1080", href: "/encyclopedia/fresh-foam-1080" }, { name: "Adidas Ultra Boost", href: "/encyclopedia/adidas-ultra-boost" }],
},


// ─── N ────────────────────────────────────────────────────────────────────────

{
  slug: "new-balance-550",
  name: "New Balance 550",
  tagline: "A forgotten 1989 basketball shoe rediscovered by Aimé Leon Dore — the New Balance 550 went from obscure archive piece to one of the most coveted lifestyle sneakers of the 2020s.",
  brand: "New Balance", firstRelease: "1989", designer: "New Balance", retailPrice: "$110", tier: 1,
  images: [
    { src: "/encyclopedia/new-balance-550/hero.jpg", alt: "New Balance 550" },
    { src: "/encyclopedia/new-balance-550/angle-1.jpg", alt: "New Balance 550 side" },
    { src: "/encyclopedia/new-balance-550/angle-2.jpg", alt: "New Balance 550 angle" },
    { src: "/encyclopedia/new-balance-550/detail.jpg", alt: "New Balance 550 detail" },
  ],
  marketSnapshot: { title: "New Balance 550 Market Overview", demand: "Very Strong Demand", avgResale: "$100–$400+", trend: "Stable after 2021-2022 peak — strong lifestyle baseline", volatility: "Low to Medium", liquidity: "High", flipScore: "58 / 100", description: "The New Balance 550 is one of the biggest lifestyle sneaker stories of the 2020s. ALD collabs drove initial hype; demand has since broadened with New Balance's expanded 550 GR program. Collab pairs retain strong premiums; standard GRs hover near retail with occasional spikes." },
  history: [
    "New Balance originally produced the 550 in 1989 as a basketball shoe — it sold poorly and was quickly discontinued, remaining largely forgotten for over 30 years.",
    "Aimé Leon Dore designer Teddy Santis rediscovered the 550 in the New Balance archives and collaborated to revive it in 2020, releasing limited colorways that immediately sold out.",
    "The ALD x New Balance 550 became one of the most celebrated sneaker collaborations of 2020-2021, validating the silhouette and triggering massive demand.",
    "New Balance rapidly expanded the 550 into a full GR program, making it one of the brand's flagship lifestyle silhouettes — a remarkable journey from forgotten basketball shoe to global bestseller.",
  ],
  designIntro: "The New Balance 550 is defined by its clean leather upper, padded ankle collar, classic basketball cupsole, bold N logo, and straightforward low-cut silhouette that feels both retro and fresh.",
  designBullets: ["Clean leather upper with minimal overlays", "Padded ankle collar for comfortable everyday wear", "Classic basketball cupsole adapted for lifestyle use", "Bold embossed N logo on lateral side", "Low-cut silhouette versatile across casual and fashion contexts"],
  colorways: [
    { name: "Aimé Leon Dore x New Balance 550 'White/Burgundy'", note: "The original ALD collab that launched the 550's revival — still commands strong premiums", market: "Strong resale premium" },
    { name: "White / Sea Salt", note: "The cleanest standard GR — broadly popular and widely produced", market: "Near retail" },
    { name: "White / Green", note: "Fresh colorway with strong lifestyle appeal across multiple demographics", market: "Near to modest above retail" },
    { name: "Teddy Santis Limited Editions", note: "NB creative director's special 550 builds that command boutique-level premiums", market: "Above retail" },
  ],
  resaleParagraphs: ["The 550's GR program has expanded significantly — standard colorways now trade near retail with limited margin.", "ALD collabs and Teddy Santis editions remain the primary resale targets, often commanding 2x-3x retail."],
  resaleHighlights: [{ label: "Best For", value: "ALD collab and Teddy Santis flips" }, { label: "Risk Level", value: "Low on GRs, Medium on collabs" }, { label: "Reseller Take", value: "ALD originals still hold strong; GRs are saturation plays" }],
  resellerInsight: { flipScore: "58 / 100", liquidity: "High", typicalMargin: "Modest on GRs, strong on ALD and boutique collabs", bestUse: "ALD collab targeting", bullets: ["GRs are produced in volume — near-retail territory only.", "ALD x 550 originals retain real premiums among lifestyle collectors.", "High overall liquidity makes the 550 easy to move even when margins are tight."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any New Balance 550 Pair Live", description: "Use SneakPrice to compare 550 pricing across all colorways and track ALD collab demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track ALD collab vs GR pricing", "Monitor 550 demand by colorway", "Compare against other NB lifestyle models"] },
  careIntro: ["The 550's leather upper is durable and easy to clean — one of the lower-maintenance lifestyle shoes in this guide.", "The cupsole picks up scuffs easily; a quick Magic Eraser treatment keeps it looking fresh."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Removes surface dirt from leather upper." }, { label: "Leather Cleaner", desc: "Keeps the leather panels clean and supple." }, { label: "Leather Conditioner", desc: "Apply periodically to maintain leather quality." }, { label: "Magic Eraser", desc: "Effective on cupsole scuffs." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full leather upper for cleaning." }, { step: "2", label: "Dry Brush", desc: "Remove loose dirt from leather and outsole." }],
  careCleaning: [{ step: "1", label: "Clean Leather", desc: "Apply leather cleaner with soft brush in circular motions." }, { step: "2", label: "Clean Cupsole", desc: "Magic Eraser on scuffed cupsole areas." }, { step: "3", label: "Condition", desc: "Apply leather conditioner after cleaning." }, { step: "4", label: "Air Dry", desc: "Dry naturally away from heat." }],
  relatedModels: [{ name: "New Balance M990v6", href: "/encyclopedia/new-balance-m990v6" }, { name: "New Balance 574", href: "/encyclopedia/new-balance-574" }, { name: "Adidas Forum Low", href: "/encyclopedia/forum-low" }, { name: "Nike Dunk Low", href: "/encyclopedia/nike-dunk-low" }],
},

{
  slug: "new-balance-574",
  name: "New Balance 574",
  tagline: "The most widely sold New Balance model of all time — the 574 blends cross-training heritage, ENCAP cushioning, and an approachable silhouette that has made it a reliable lifestyle staple since 1988.",
  brand: "New Balance", firstRelease: "1988", designer: "New Balance", retailPrice: "$79.99–$95", tier: 2,
  images: [
    { src: "/encyclopedia/new-balance-574/hero.jpg", alt: "New Balance 574" },
    { src: "/encyclopedia/new-balance-574/angle-1.jpg", alt: "New Balance 574 side" },
    { src: "/encyclopedia/new-balance-574/angle-2.jpg", alt: "New Balance 574 angle" },
    { src: "/encyclopedia/new-balance-574/detail.jpg", alt: "New Balance 574 detail" },
  ],
  marketSnapshot: { title: "New Balance 574 Market Overview", demand: "Strong Demand", avgResale: "$60–$150", trend: "Stable", volatility: "Low", liquidity: "Moderate", flipScore: "22 / 100", description: "The New Balance 574 is an everyday lifestyle shoe with near-zero resale upside on standard colorways. It's one of New Balance's best-selling models globally — mass availability keeps margins minimal. A wear shoe, not a flip target." },
  history: [
    "New Balance introduced the 574 in 1988 as a cross-training shoe designed for running, aerobics, and general athletic use — its versatility drove broad adoption.",
    "The 574 became New Balance's most successful lifestyle model globally, selling in tens of millions of pairs across multiple decades.",
    "While typically affordable and mass-market, select premium 574 iterations in suede and leather have attracted modest collector interest.",
    "The 574's role in NB's history is as the democratizing entry point — it opened the brand to buyers who then graduated to the 990 series or specialty models.",
  ],
  designIntro: "The New Balance 574 features an ENCAP midsole combining a durable polyurethane rim with EVA core, a suede and mesh upper combination, and the straightforward N logo — functional heritage design.",
  designBullets: ["ENCAP midsole for stability and cushioning", "Suede and mesh upper combination", "Available in an extensive range of colorways", "Iconic N logo in various sizes across versions", "Wide range of widths available"],
  colorways: [
    { name: "Navy / White", note: "One of the most classic 574 colorways — broad lifestyle appeal", market: "Retail" },
    { name: "Grey / White", note: "Clean neutral — the most versatile everyday option", market: "Retail" },
    { name: "Premium Suede Special Editions", note: "Periodic premium builds in limited colorways with modest collector interest", market: "Near retail" },
  ],
  resaleParagraphs: ["The 574 is a mass-market lifestyle shoe — resale margin is essentially non-existent on standard colorways.", "Premium suede editions and select collabs generate modest interest but the 574 is not a flip target."],
  resaleHighlights: [{ label: "Best For", value: "Personal wear — no resale market" }, { label: "Risk Level", value: "Very Low — but no upside" }, { label: "Reseller Take", value: "Skip entirely for resale" }],
  resellerInsight: { flipScore: "22 / 100", liquidity: "Moderate", typicalMargin: "None on standard pairs", bestUse: "Personal wear", bullets: ["Mass availability kills any resale margin.", "Not a flip target — buy to wear.", "If interested in NB resale, focus on 550, 990, or 2002R instead."] },
  cta: { eyebrow: "Live Market Tool", title: "Check New Balance 574 Pricing Live", description: "Use SneakPrice to compare current 574 pricing across retailers.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare pricing across retailers", "Find the best current price", "Track special edition availability"] },
  careIntro: ["The 574's suede and mesh upper is easy to maintain with regular brushing.", "The ENCAP midsole is durable but can discolor — wipe it down regularly."],
  careTools: [{ label: "Suede Brush", desc: "Maintain the suede nap on the upper panels." }, { label: "Soft-bristle Brush", desc: "Clean mesh sections gently." }, { label: "Microfiber Cloth", desc: "Wipe the midsole and outsole after use." }, { label: "Crep Protect Spray", desc: "Protect suede panels from staining." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full upper for cleaning." }, { step: "2", label: "Dry Brush", desc: "Brush suede in one direction first." }],
  careCleaning: [{ step: "1", label: "Treat Suede", desc: "Brush or erase suede panels." }, { step: "2", label: "Clean Mesh", desc: "Light damp brush on mesh sections." }, { step: "3", label: "Wipe Midsole", desc: "Damp cloth on the ENCAP midsole." }, { step: "4", label: "Air Dry & Protect", desc: "Dry naturally then spray suede protector." }],
  relatedModels: [{ name: "New Balance 550", href: "/encyclopedia/new-balance-550" }, { name: "New Balance M990v6", href: "/encyclopedia/new-balance-m990v6" }, { name: "Adidas Samba", href: "/encyclopedia/adidas-samba" }, { name: "Nike Cortez", href: "/encyclopedia/nike-cortez" }],
},

{
  slug: "new-balance-990v6",
  name: "New Balance 990v6",
  tagline: "The sixth generation of New Balance's flagship Made in USA platform — the 990v6 continues the brand's commitment to domestic craftsmanship, premium materials, and superior running support.",
  brand: "New Balance", firstRelease: "2022", designer: "New Balance", retailPrice: "$200", tier: 1,
  images: [
    { src: "/encyclopedia/new-balance-990v6/hero.jpg", alt: "New Balance 990v6" },
    { src: "/encyclopedia/new-balance-990v6/angle-1.jpg", alt: "New Balance 990v6 side" },
    { src: "/encyclopedia/new-balance-990v6/angle-2.jpg", alt: "New Balance 990v6 angle" },
    { src: "/encyclopedia/new-balance-990v6/detail.jpg", alt: "New Balance 990v6 detail" },
  ],
  marketSnapshot: { title: "New Balance 990v6 Market Overview", demand: "Strong Demand", avgResale: "$180–$350", trend: "Stable", volatility: "Low", liquidity: "Moderate", flipScore: "44 / 100", description: "The 990v6 carries the same Made in USA collector pedigree as the M990v6 with consistent above-retail demand on limited colorways and collabs. Boutique releases and Teddy Santis editions drive the strongest premiums." },
  history: [
    "The New Balance 990 launched in 1982 and has been updated through six versions, each refining the cushioning, upper construction, and stability platform while maintaining Made in USA manufacturing.",
    "The v6 iteration brought updated ENCAP midsole geometry, refined upper materials, and continued the 990 series' reputation as one of the most reliable long-term running platforms.",
    "The 990 series benefits from a strong heritage narrative — owning 990s became synonymous with understated taste in the post-Normcore era, and that cultural cache has only grown.",
    "Joe Freshgoods' 'Inside Voices' collaboration and Teddy Santis editions have made the 990 series one of New Balance's most collector-coveted lines.",
  ],
  designIntro: "The New Balance 990v6 features premium suede and mesh uppers, ENCAP midsole with EVA core and polyurethane rim, a pigskin mesh lining, and the refined N logo — premium Made in USA construction throughout.",
  designBullets: ["Premium suede and mesh upper combination", "ENCAP midsole for long-lasting support and cushioning", "Made in USA with premium domestic materials", "Pigskin mesh interior lining", "Classic N logo embroidered on lateral side"],
  colorways: [
    { name: "Grey / Silver", note: "The definitive 990 colorway — refined grey suede has defined the silhouette since 1982", market: "Near to above retail" },
    { name: "Joe Freshgoods x New Balance 990v6 'Inside Voices'", note: "One of the most celebrated NB collabs — strong premium among Made in USA collectors", market: "Strong resale premium" },
    { name: "Teddy Santis Limited Editions", note: "NB creative director's curated colorways with boutique appeal", market: "Above retail" },
  ],
  resaleParagraphs: ["The 990v6 GRs trade modestly above retail with reliable demand from the Made in USA collector community.", "Boutique collabs and Teddy Santis editions are the strongest resale opportunities."],
  resaleHighlights: [{ label: "Best For", value: "Collab flips and limited edition targeting" }, { label: "Risk Level", value: "Low to Medium" }, { label: "Reseller Take", value: "Joe Freshgoods collab is the 990 benchmark flip" }],
  resellerInsight: { flipScore: "44 / 100", liquidity: "Moderate", typicalMargin: "Modest on GRs, strong on collabs", bestUse: "Boutique collab targeting", bullets: ["Grey GRs move above retail reliably with modest margin.", "Joe Freshgoods collab is the benchmark 990 flip.", "Strong collector community ensures sustained demand."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any New Balance 990v6 Pair Live", description: "Use SneakPrice to compare 990v6 pricing and track collab demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track collab vs GR pricing", "Monitor Made in USA collector demand", "Compare 990v6 vs M990v6 pricing"] },
  careIntro: ["The 990v6's premium suede upper needs regular brushing and periodic conditioning.", "Made in USA shoes deserve extra care — regular maintenance preserves their premium materials."],
  careTools: [{ label: "Suede Brush", desc: "Maintain the suede nap consistently." }, { label: "Suede Eraser", desc: "Lifts scuffs and marks from suede panels." }, { label: "Microfiber Cloth", desc: "Wipe the midsole and N logo area." }, { label: "Crep Protect Spray", desc: "Seal suede after cleaning." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full suede upper." }, { step: "2", label: "Dry Brush", desc: "Brush in one direction before cleaning." }],
  careCleaning: [{ step: "1", label: "Treat Suede", desc: "Brush or erase panels — restore nap direction." }, { step: "2", label: "Wipe Midsole", desc: "Damp cloth on ENCAP midsole." }, { step: "3", label: "Clean Outsole", desc: "Firm brush on rubber outsole." }, { step: "4", label: "Protect", desc: "Apply suede protector spray once dry." }],
  relatedModels: [{ name: "New Balance M990v6", href: "/encyclopedia/new-balance-m990v6" }, { name: "New Balance 2002R", href: "/encyclopedia/new-balance-2002r" }, { name: "New Balance 550", href: "/encyclopedia/new-balance-550" }, { name: "New Balance Fresh Foam 1080", href: "/encyclopedia/fresh-foam-1080" }],
},

// ─── O ────────────────────────────────────────────────────────────────────────

{
  slug: "vans-old-skool",
  name: "Vans Old Skool",
  tagline: "The first Vans shoe to feature the iconic jazz stripe — the Old Skool has evolved from a 1977 skate shoe to one of the most universally recognizable lifestyle sneakers in the world.",
  brand: "Vans", firstRelease: "1977", designer: "Paul Van Doren", retailPrice: "$70–$85", tier: 2,
  images: [
    { src: "/encyclopedia/vans-old-skool/hero.jpg", alt: "Vans Old Skool" },
    { src: "/encyclopedia/vans-old-skool/angle-1.jpg", alt: "Vans Old Skool side" },
    { src: "/encyclopedia/vans-old-skool/angle-2.jpg", alt: "Vans Old Skool angle" },
    { src: "/encyclopedia/vans-old-skool/detail.jpg", alt: "Vans Old Skool detail" },
  ],
  marketSnapshot: { title: "Vans Old Skool Market Overview", demand: "Very Strong Demand", avgResale: "$50–$200", trend: "Stable", volatility: "Low", liquidity: "High", flipScore: "28 / 100", description: "The Vans Old Skool is a globally ubiquitous lifestyle shoe with enormous wear demand and minimal resale upside on standard colorways. Fashion collabs and limited editions generate occasional premiums, but this is overwhelmingly a wear-first shoe." },
  history: [
    "Paul Van Doren originally designed what became the Old Skool in 1977 — the distinctive jazz stripe was reportedly sketched on a paper bag and has appeared on Vans shoes ever since.",
    "The Old Skool became embedded in California skate culture through the 1980s and 1990s before transitioning into a global lifestyle shoe worn by everyone from skaters to fashion editors.",
    "Vans has collaborated with high-fashion brands (Supreme, Marc Jacobs, Comme des Garçons) as well as artists and musicians, occasionally generating real collector demand.",
    "The Old Skool consistently ranks among the best-selling shoes in the world — a testament to its versatile design and accessible price point.",
  ],
  designIntro: "The Vans Old Skool is defined by its canvas and suede upper, signature jazz stripe, padded ankle collar, waffle rubber outsole, and classic low-top silhouette that has remained virtually unchanged since 1977.",
  designBullets: ["Canvas and suede upper combination", "Signature Vans jazz stripe on lateral panel", "Padded ankle collar for skateboarding and everyday comfort", "Iconic waffle rubber outsole for traction", "Classic low-top silhouette unchanged since 1977"],
  colorways: [
    { name: "Black / White", note: "The definitive Old Skool colorway — globally recognized and universally worn", market: "Retail" },
    { name: "True White / True White", note: "Clean all-white option popular for lifestyle and fashion styling", market: "Retail" },
    { name: "Supreme x Vans Old Skool", note: "The most consistently sought-after Old Skool collab", market: "Modest to strong premium" },
  ],
  resaleParagraphs: ["Standard Old Skool GRs are ubiquitous — no resale margin whatsoever on everyday colorways.", "Supreme and high-profile fashion collabs are the only realistic resale opportunities."],
  resaleHighlights: [{ label: "Best For", value: "Wear — no resale market on standard pairs" }, { label: "Risk Level", value: "Very Low — but also no upside" }, { label: "Reseller Take", value: "Skip GRs; only Supreme or major fashion collabs are worth targeting" }],
  resellerInsight: { flipScore: "28 / 100", liquidity: "High", typicalMargin: "None on GRs", bestUse: "Personal wear", bullets: ["GRs have zero resale margin — available everywhere.", "Supreme collabs are the only Old Skool worth flipping.", "High liquidity means secondhand pairs are easy to move but impossible to profit from."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Vans Old Skool Pair Live", description: "Use SneakPrice to compare Old Skool collab pricing and track current market.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track collab vs GR pricing", "Monitor limited edition demand", "Compare against other Vans models"] },
  careIntro: ["The Old Skool's canvas and suede upper requires regular maintenance — the white foxing strip shows dirt quickly.", "The waffle outsole picks up debris; clean it regularly to maintain grip."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Cleans the canvas upper gently." }, { label: "Suede Brush", desc: "For suede panels — maintain the nap." }, { label: "Sneaker Cleaning Solution", desc: "Safe for both canvas and suede." }, { label: "Magic Eraser", desc: "Restores the white foxing strip." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the tongue and all upper panels." }, { step: "2", label: "Dry Brush", desc: "Remove loose dirt from canvas and suede." }],
  careCleaning: [{ step: "1", label: "Clean Canvas", desc: "Apply diluted sneaker solution with soft brush to canvas panels." }, { step: "2", label: "Treat Suede", desc: "Brush or erase suede sections." }, { step: "3", label: "Restore Foxing Strip", desc: "Magic Eraser on the white rubber foxing." }, { step: "4", label: "Air Dry", desc: "Dry naturally away from heat." }],
  relatedModels: [{ name: "Vans Sk8-Hi", href: "/encyclopedia/vans-sk8-hi" }, { name: "Converse Chuck Taylor All Star", href: "/encyclopedia/chuck-taylor-all-star" }, { name: "Adidas Gazelle", href: "/encyclopedia/gazelle" }, { name: "Nike Cortez", href: "/encyclopedia/nike-cortez" }],
},

{
  slug: "converse-one-star",
  name: "Converse One Star",
  tagline: "Kurt Cobain's shoe of choice and a symbol of 1990s alternative culture — the Converse One Star's suede construction and single-star logo have made it an enduring lifestyle icon far beyond its basketball origins.",
  brand: "Converse", firstRelease: "1974", designer: "Converse", retailPrice: "$70–$80", tier: 2,
  images: [
    { src: "/encyclopedia/converse-one-star/hero.jpg", alt: "Converse One Star" },
    { src: "/encyclopedia/converse-one-star/angle-1.jpg", alt: "Converse One Star side" },
    { src: "/encyclopedia/converse-one-star/angle-2.jpg", alt: "Converse One Star angle" },
    { src: "/encyclopedia/converse-one-star/detail.jpg", alt: "Converse One Star detail" },
  ],
  marketSnapshot: { title: "Converse One Star Market Overview", demand: "Moderate Demand", avgResale: "$60–$200", trend: "Stable", volatility: "Low", liquidity: "Moderate", flipScore: "30 / 100", description: "The One Star has a loyal lifestyle following but minimal resale upside on standard colorways. Fashion collabs (Golf Wang, Slam Jam, Supreme) generate real premiums. A wear shoe for most buyers — only key collabs are flip-worthy." },
  history: [
    "Converse introduced the One Star in 1974 as a suede basketball shoe — its clean lines and single star logo on the lateral side set it apart from the canvas Chuck Taylor.",
    "The One Star gained cultural momentum in the 1990s when Kurt Cobain wore a black suede pair, cementing its association with alternative and grunge music culture.",
    "After Nike acquired Converse in 2003, the One Star became a platform for fashion collaborations — notable releases with Golf Wang (Tyler, the Creator), Slam Jam, and Supreme elevated its collector appeal.",
    "The One Star Pro continues as a skate-focused variant while the standard One Star remains a core Converse lifestyle model.",
  ],
  designIntro: "The Converse One Star is defined by its suede upper, single star logo on the lateral panel, vulcanized rubber cup sole, and low-cut silhouette — a cleaner, more elegant take on the Chuck Taylor formula.",
  designBullets: ["Suede upper in a broad range of colorways", "Single five-point star logo on the lateral side", "Vulcanized rubber cupsole for a flat, flexible ride", "Low-cut collar for casual everyday wear", "Converse text branding on the foxing tape"],
  colorways: [
    { name: "Black / White", note: "The colorway associated with Kurt Cobain — the definitive One Star look", market: "Retail" },
    { name: "Golf Wang x One Star (various)", note: "Tyler, the Creator's wildly colored collabs — strong demand and fun collector appeal", market: "Modest to strong premium" },
    { name: "Slam Jam x One Star", note: "Fashion-forward Italian streetwear collab with minimal branding and premium appeal", market: "Above retail" },
  ],
  resaleParagraphs: ["Standard One Star GRs have zero resale margin — a widely available lifestyle shoe.", "Golf Wang, Slam Jam, and Supreme collabs generate collector demand at meaningful premiums."],
  resaleHighlights: [{ label: "Best For", value: "Golf Wang and fashion collab flips" }, { label: "Risk Level", value: "Low" }, { label: "Reseller Take", value: "Only key fashion collabs move above retail" }],
  resellerInsight: { flipScore: "30 / 100", liquidity: "Moderate", typicalMargin: "None on GRs, modest on collabs", bestUse: "Fashion collab targeting", bullets: ["GRs have no resale margin.", "Golf Wang and Slam Jam collabs attract collectors and fashion buyers.", "Small but loyal following ensures sustained demand for limited releases."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Converse One Star Pair Live", description: "Use SneakPrice to compare One Star collab pricing and track demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track collab vs GR pricing", "Monitor Golf Wang release demand", "Compare against Chuck Taylor pricing"] },
  careIntro: ["The One Star's suede upper needs regular brushing to maintain its nap — especially important on darker colorways that show dust easily.", "The vulcanized sole and foxing tape respond well to basic cleaning."],
  careTools: [{ label: "Suede Brush", desc: "Maintain the suede nap on the upper." }, { label: "Suede Eraser", desc: "Lifts scuffs without moisture." }, { label: "Sneaker Cleaning Solution", desc: "Use sparingly on suede if needed." }, { label: "Magic Eraser", desc: "Restores the rubber foxing tape." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full suede upper." }, { step: "2", label: "Dry Brush", desc: "Brush in one direction first." }],
  careCleaning: [{ step: "1", label: "Treat Suede", desc: "Brush or erase the suede upper." }, { step: "2", label: "Clean Foxing", desc: "Magic Eraser on the rubber foxing tape." }, { step: "3", label: "Wipe Sole", desc: "Damp cloth on the vulcanized cupsole." }, { step: "4", label: "Protect", desc: "Apply suede protector spray once dry." }],
  relatedModels: [{ name: "Converse Chuck Taylor All Star", href: "/encyclopedia/chuck-taylor-all-star" }, { name: "Vans Old Skool", href: "/encyclopedia/vans-old-skool" }, { name: "Adidas Samba", href: "/encyclopedia/adidas-samba" }, { name: "Asics Gel-Lyte III", href: "/encyclopedia/gel-lyte-iii" }],
},

// ─── P ────────────────────────────────────────────────────────────────────────

{
  slug: "nike-pegasus-40",
  name: "Nike Pegasus 40",
  tagline: "Four decades of running excellence — the Nike Pegasus 40 marks the 40th anniversary of Nike's most enduring running franchise, refined with React foam and Zoom Air for the modern era.",
  brand: "Nike", firstRelease: "1983", designer: "Nike", retailPrice: "$135", tier: 2,
  images: [
    { src: "/encyclopedia/nike-pegasus-40/hero.jpg", alt: "Nike Pegasus 40" },
    { src: "/encyclopedia/nike-pegasus-40/angle-1.jpg", alt: "Nike Pegasus 40 side" },
    { src: "/encyclopedia/nike-pegasus-40/angle-2.jpg", alt: "Nike Pegasus 40 angle" },
    { src: "/encyclopedia/nike-pegasus-40/detail.jpg", alt: "Nike Pegasus 40 detail" },
  ],
  marketSnapshot: { title: "Nike Pegasus 40 Market Overview", demand: "Strong Demand", avgResale: "$100–$150", trend: "Stable", volatility: "Low", liquidity: "Low", flipScore: "15 / 100", description: "The Pegasus 40 is a flagship running shoe purchased almost entirely at retail by runners. No meaningful resale market — demand is performance-driven, not collector-driven." },
  history: [
    "Nike launched the original Pegasus in 1983 as a versatile daily trainer — named after the mythological winged horse symbolizing speed and elevation.",
    "The Pegasus line became Nike's most consistently updated running franchise, with new versions released almost every year for four decades.",
    "The Pegasus 40 was released in 2023 to celebrate the franchise's 40th anniversary, featuring updated React + Zoom Air cushioning and an engineered mesh upper.",
    "The Pegasus remains Nike's most popular running shoe globally — beloved by recreational runners for its reliable cushioning, durability, and accessible price point.",
  ],
  designIntro: "The Pegasus 40 features a React foam midsole with forefoot Zoom Air, an engineered mesh upper for breathability, Flywire-inspired cables for midfoot lockdown, and a rubber waffle outsole for durable traction.",
  designBullets: ["React foam midsole with forefoot Zoom Air unit", "Engineered mesh upper for breathability and fit", "Midfoot lockdown system for secure fit", "Rubber waffle outsole for durable traction", "40th anniversary branding on the tongue and heel"],
  colorways: [
    { name: "Black / White", note: "Versatile neutral option popular for all running contexts", market: "Retail" },
    { name: "White / Pure Platinum", note: "Clean light colorway popular for gym and lifestyle crossover", market: "Retail" },
    { name: "Anniversary Colorways", note: "Special 40th edition colorways with modest collector interest", market: "Near retail" },
  ],
  resaleParagraphs: ["The Pegasus 40 has no meaningful resale market — it's purchased exclusively at retail by runners.", "A performance shoe for wearing, not flipping."],
  resaleHighlights: [{ label: "Best For", value: "Running — no resale market" }, { label: "Risk Level", value: "Very Low — but no upside" }, { label: "Reseller Take", value: "Skip entirely for resale" }],
  resellerInsight: { flipScore: "15 / 100", liquidity: "Low", typicalMargin: "None", bestUse: "Daily running trainer", bullets: ["No resale market — buy to run.", "One of Nike's most stocked running shoes in every market.", "If interested in Nike running resale, focus on Vaporfly or Alphafly instead."] },
  cta: { eyebrow: "Live Market Tool", title: "Check Pegasus 40 Pricing Live", description: "Use SneakPrice to compare current Pegasus 40 pricing across retailers.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare pricing across running stores", "Track anniversary colorway availability", "Find the best current price"] },
  careIntro: ["The Pegasus 40's engineered mesh upper collects dirt during running — clean regularly to maintain breathability and upper integrity.", "The React foam midsole is durable but can compress over time; replace after 400-500 miles."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Removes dirt from mesh without distorting the knit." }, { label: "Sneaker Cleaning Solution", desc: "Diluted formula safe for mesh." }, { label: "Warm Water", desc: "Loosens debris from the outsole." }, { label: "Microfiber Cloth", desc: "Wipe the midsole and outsole." }],
  carePrep: [{ step: "1", label: "Remove Insoles & Laces", desc: "Air insoles separately; remove laces for full upper access." }, { step: "2", label: "Dry Brush", desc: "Knock off loose dirt before introducing liquid." }],
  careCleaning: [{ step: "1", label: "Clean Mesh", desc: "Apply diluted solution with soft brush in light circular motions." }, { step: "2", label: "Wipe Midsole", desc: "Damp cloth on the React foam midsole." }, { step: "3", label: "Scrub Outsole", desc: "Firm brush on the rubber waffle outsole." }, { step: "4", label: "Air Dry", desc: "Dry fully at room temperature." }],
  relatedModels: [{ name: "New Balance Fresh Foam 1080", href: "/encyclopedia/fresh-foam-1080" }, { name: "Brooks Ghost", href: "/encyclopedia/brooks-ghost" }, { name: "Asics Gel-Kayano", href: "/encyclopedia/asics-gel-kayano" }, { name: "Adidas Ultra Boost", href: "/encyclopedia/adidas-ultra-boost" }],
},

{
  slug: "puma-suede-classic",
  name: "Puma Suede Classic",
  tagline: "One of the most important sneakers in hip-hop history — the Puma Suede's journey from 1968 basketball court to South Bronx street corners to global lifestyle icon spans six decades of cultural relevance.",
  brand: "Puma", firstRelease: "1968", designer: "Puma", retailPrice: "$65–$75", tier: 2,
  images: [
    { src: "/encyclopedia/puma-suede-classic/hero.jpg", alt: "Puma Suede Classic" },
    { src: "/encyclopedia/puma-suede-classic/angle-1.jpg", alt: "Puma Suede Classic side" },
    { src: "/encyclopedia/puma-suede-classic/angle-2.jpg", alt: "Puma Suede Classic angle" },
    { src: "/encyclopedia/puma-suede-classic/detail.jpg", alt: "Puma Suede Classic detail" },
  ],
  marketSnapshot: { title: "Puma Suede Classic Market Overview", demand: "Moderate Demand", avgResale: "$50–$150", trend: "Stable", volatility: "Low", liquidity: "Moderate", flipScore: "26 / 100", description: "The Puma Suede is an enduring lifestyle shoe with minimal resale upside on standard colorways. It's produced in enormous volume globally — primarily a wear shoe with some collab potential." },
  history: [
    "Puma introduced the Suede in 1968 as a basketball training shoe — it gained its first major cultural moment when Tommie Smith wore Pumas on the podium at the 1968 Mexico City Olympics during his silent protest.",
    "The Suede became a foundational shoe of hip-hop culture in the late 1970s and 1980s South Bronx scene — worn by b-boys, DJs, and MCs who helped define the emerging genre.",
    "Run-D.M.C. gave the Puma Suede its hip-hop credibility alongside Adidas Superstars in the 1980s, embedding it in the cultural DNA of street music.",
    "The Suede remains one of Puma's best-selling models globally — never the hottest shoe on the market but always present, always relevant.",
  ],
  designIntro: "The Puma Suede Classic is defined by its clean suede upper, formstripe on the lateral panel, vulcanized rubber cupsole, and straightforward low-top silhouette that has barely changed in 50 years.",
  designBullets: ["Clean suede upper in a wide range of colorways", "Puma formstripe on the lateral side", "Vulcanized rubber cupsole for a flat, flexible feel", "Padded tongue and collar for comfort", "Simple silhouette unchanged since 1968"],
  colorways: [
    { name: "Black / White", note: "The most classic Puma Suede colorway — consistent demand across all demographics", market: "Retail" },
    { name: "White / Navy", note: "Clean heritage colorway with broad lifestyle appeal", market: "Retail" },
    { name: "STAPLE x Puma Suede", note: "Jeff Staple collaborations have produced some of the Suede's strongest limited releases", market: "Modest premium" },
  ],
  resaleParagraphs: ["Standard Puma Suede Classic GRs have zero resale margin — one of the most ubiquitous sneakers on the market.", "Key collabs generate modest premiums but the Puma Suede is primarily a wear shoe."],
  resaleHighlights: [{ label: "Best For", value: "Personal wear" }, { label: "Risk Level", value: "Very Low — but no upside" }, { label: "Reseller Take", value: "Not a resale target" }],
  resellerInsight: { flipScore: "26 / 100", liquidity: "Moderate", typicalMargin: "None on GRs", bestUse: "Personal wear", bullets: ["Enormous volume means no resale margin on standard pairs.", "Collabs generate modest premiums among Puma fans.", "Cultural heritage is strong but resale market is weak."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Puma Suede Classic Pair Live", description: "Use SneakPrice to compare current Suede Classic pricing and track collab demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare pricing across retailers", "Track limited edition availability", "Find the best current price"] },
  careIntro: ["The Puma Suede's suede upper needs regular brushing — especially important since the shoe sits low and the upper is close to the ground.", "The vulcanized cupsole can yellow; clean it regularly with a Magic Eraser."],
  careTools: [{ label: "Suede Brush", desc: "Maintain the nap and remove dry dirt." }, { label: "Suede Eraser", desc: "Targets scuffs on the upper." }, { label: "Crep Protect Spray", desc: "Apply preventatively to repel stains." }, { label: "Magic Eraser", desc: "Brightens the cupsole." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full suede upper." }, { step: "2", label: "Dry Brush", desc: "Brush in one direction first." }],
  careCleaning: [{ step: "1", label: "Erase Scuffs", desc: "Apply suede eraser to marks." }, { step: "2", label: "Restore Nap", desc: "Brush suede to restore texture." }, { step: "3", label: "Clean Cupsole", desc: "Magic Eraser on the vulcanized rubber." }, { step: "4", label: "Protect", desc: "Apply suede spray once dry." }],
  relatedModels: [{ name: "Adidas Samba", href: "/encyclopedia/adidas-samba" }, { name: "Vans Old Skool", href: "/encyclopedia/vans-old-skool" }, { name: "Converse Chuck Taylor All Star", href: "/encyclopedia/chuck-taylor-all-star" }, { name: "Puma RS-X", href: "/encyclopedia/puma-rs-x" }],
},

{
  slug: "puma-rs-x",
  name: "Puma RS-X",
  tagline: "Puma's answer to the chunky dad shoe moment — the RS-X reinvented a 1980s running system into a bold retro lifestyle shoe that became one of the brand's most successful modern releases.",
  brand: "Puma", firstRelease: "2019", designer: "Puma", retailPrice: "$110", tier: 2,
  images: [
    { src: "/encyclopedia/puma-rs-x/hero.jpg", alt: "Puma RS-X" },
    { src: "/encyclopedia/puma-rs-x/angle-1.jpg", alt: "Puma RS-X side" },
    { src: "/encyclopedia/puma-rs-x/angle-2.jpg", alt: "Puma RS-X angle" },
    { src: "/encyclopedia/puma-rs-x/detail.jpg", alt: "Puma RS-X detail" },
  ],
  marketSnapshot: { title: "Puma RS-X Market Overview", demand: "Moderate Demand", avgResale: "$70–$200", trend: "Declining from 2019-2021 peak", volatility: "Low", liquidity: "Low to Moderate", flipScore: "28 / 100", description: "The RS-X rode the chunky runner wave of 2019-2021 and has since normalized. Most colorways trade near or below retail; select collabs and limited colorways retain modest premiums. The hype cycle has largely passed." },
  history: [
    "Puma revived its RS (Running System) technology — originally from the 1980s — in 2019 with the RS-X, a chunky retro lifestyle runner designed to compete with the dad shoe trend.",
    "The RS-X launched with bold color blocking and collaborations with celebrities and brands that drove initial hype through 2019 and 2020.",
    "As the chunky runner trend matured, the RS-X lost momentum to newer silhouettes, with resale demand largely evaporating by 2022.",
    "The RS-X remains in Puma's lineup as a lifestyle option but no longer generates the cultural heat of its launch years.",
  ],
  designIntro: "The RS-X is defined by its chunky midsole unit housing RS foam cushioning technology, layered mesh and textile upper, bold color-blocked paneling, and an exaggerated retro runner profile.",
  designBullets: ["RS foam cushioning in a chunky midsole unit", "Layered mesh and textile upper with material variety", "Bold multi-zone color blocking", "Exaggerated retro runner profile from 1980s running heritage", "Rubber outsole with extended heel for stability"],
  colorways: [
    { name: "Puma White / Puma Black", note: "The cleanest RS-X colorway — understated version of the bold silhouette", market: "Near retail" },
    { name: "Trophy (White / Multi)", note: "The original hyped colorway at launch — bold color blocking that defined the RS-X look", market: "Near to modest above retail" },
    { name: "Celebrity Collabs", note: "Limited celebrity-designed colorways from the peak hype period retain some collector interest", market: "Modest premium on peak-era releases" },
  ],
  resaleParagraphs: ["The RS-X's hype cycle has largely run its course — most colorways trade at or below retail.", "Select limited colorways and peak-era celebrity collabs retain modest premiums among collectors of the trend."],
  resaleHighlights: [{ label: "Best For", value: "Personal wear — hype has passed" }, { label: "Risk Level", value: "Low — but no real upside either" }, { label: "Reseller Take", value: "Skip entirely for resale" }],
  resellerInsight: { flipScore: "28 / 100", liquidity: "Low to Moderate", typicalMargin: "None on current releases", bestUse: "Personal wear", bullets: ["Hype cycle has passed — GRs at or below retail.", "Peak-era collabs may have modest long-term value but very thin market.", "Not a current resale target."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Puma RS-X Pair Live", description: "Use SneakPrice to compare current RS-X pricing and check for any remaining premium opportunities.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare current pricing", "Track any remaining collab demand", "Find the best available price"] },
  careIntro: ["The RS-X's mesh upper is easy to clean but the chunky midsole's recessed areas collect grime — pay extra attention there.", "The textured midsole panels may show yellowing over time."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Cleans mesh panels and midsole recesses." }, { label: "Sneaker Cleaning Solution", desc: "Diluted formula for mesh and rubber." }, { label: "Microfiber Cloth", desc: "Wipe the midsole and outsole clean." }, { label: "Magic Eraser", desc: "Effective on midsole yellowing." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access all upper panels." }, { step: "2", label: "Dry Brush", desc: "Remove loose dirt from mesh and midsole crevices." }],
  careCleaning: [{ step: "1", label: "Clean Mesh Upper", desc: "Apply diluted solution with soft brush." }, { step: "2", label: "Detail Midsole Recesses", desc: "Use a soft brush to clean in the chunky midsole crevices." }, { step: "3", label: "Wipe Midsole", desc: "Damp cloth on all midsole surfaces." }, { step: "4", label: "Air Dry", desc: "Dry naturally away from heat." }],
  relatedModels: [{ name: "Puma Suede Classic", href: "/encyclopedia/puma-suede-classic" }, { name: "Adidas EQT Support ADV", href: "/encyclopedia/eqt-support-adv" }, { name: "Adidas Ultra Boost", href: "/encyclopedia/adidas-ultra-boost" }, { name: "New Balance 2002R", href: "/encyclopedia/new-balance-2002r" }],
},


// ─── R ────────────────────────────────────────────────────────────────────────

{
  slug: "nike-react-infinity-run",
  name: "Nike React Infinity Run",
  tagline: "Designed to reduce running injuries — the Nike React Infinity Run's wide platform and React foam midsole prioritize stability and protection for high-mileage runners.",
  brand: "Nike", firstRelease: "2020", designer: "Nike", retailPrice: "$160", tier: 2,
  images: [
    { src: "/encyclopedia/nike-react-infinity-run/hero.jpg", alt: "Nike React Infinity Run" },
    { src: "/encyclopedia/nike-react-infinity-run/angle-1.jpg", alt: "Nike React Infinity Run side" },
    { src: "/encyclopedia/nike-react-infinity-run/angle-2.jpg", alt: "Nike React Infinity Run angle" },
    { src: "/encyclopedia/nike-react-infinity-run/detail.jpg", alt: "Nike React Infinity Run detail" },
  ],
  marketSnapshot: { title: "Nike React Infinity Run Market Overview", demand: "Moderate Demand", avgResale: "$100–$160", trend: "Stable", volatility: "Low", liquidity: "Low", flipScore: "12 / 100", description: "Performance running shoe with no resale market — purchased at retail by injury-prone runners seeking maximum protection. Not a collector target." },
  history: [
    "Nike launched the React Infinity Run in 2020 with an internal study claiming it reduced running injuries by 52% compared to a traditional stability shoe — a bold performance claim.",
    "The shoe's wide React foam platform and rocker-style outsole were designed to guide the foot through a smooth gait cycle, reducing stress on knees and ankles.",
    "Updated versions have continued to refine the cushioning stack while maintaining the injury-reduction focus that differentiated it at launch.",
  ],
  designIntro: "The React Infinity Run is defined by its full-length React foam midsole, wide stable platform, rocker-style outsole for smooth transitions, and Flyknit upper for a secure breathable fit.",
  designBullets: ["Full-length React foam for soft, responsive cushioning", "Wide stable platform for injury prevention", "Rocker-style outsole geometry for smooth heel-to-toe transitions", "Flyknit upper for breathability and snug fit", "Flared outsole edges for lateral stability"],
  colorways: [
    { name: "Black / White", note: "Neutral option for all running conditions", market: "Retail" },
    { name: "White / Pure Platinum", note: "Clean everyday colorway popular for gym and lifestyle crossover", market: "Retail" },
  ],
  resaleParagraphs: ["The React Infinity Run has no resale market — a performance shoe bought by runners at retail.", "Not a collector or resale target under any circumstances."],
  resaleHighlights: [{ label: "Best For", value: "Injury prevention running" }, { label: "Risk Level", value: "None — no resale market" }, { label: "Reseller Take", value: "Skip entirely" }],
  resellerInsight: { flipScore: "12 / 100", liquidity: "Low", typicalMargin: "None", bestUse: "Daily running", bullets: ["No resale market.", "Performance-only shoe.", "Buy to run, not to flip."] },
  cta: { eyebrow: "Live Market Tool", title: "Check React Infinity Run Pricing Live", description: "Use SneakPrice to compare current pricing across retailers.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare across running stores", "Find the best price", "Track version updates"] },
  careIntro: ["The Flyknit upper needs gentle cleaning — avoid saturation.", "The wide React foam midsole should be wiped clean after each run."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Gentle on Flyknit upper." }, { label: "Sneaker Cleaning Solution", desc: "Diluted formula for knit." }, { label: "Microfiber Cloth", desc: "Wipe midsole and outsole." }, { label: "Warm Water", desc: "Loosens outsole debris." }],
  carePrep: [{ step: "1", label: "Remove Insoles & Laces", desc: "Full access to upper." }, { step: "2", label: "Dry Brush", desc: "Remove loose dirt first." }],
  careCleaning: [{ step: "1", label: "Clean Knit", desc: "Light circular motions with diluted solution." }, { step: "2", label: "Wipe Midsole", desc: "Damp cloth on React foam." }, { step: "3", label: "Scrub Outsole", desc: "Firm brush on rubber." }, { step: "4", label: "Air Dry", desc: "Room temperature, never machine dry." }],
  relatedModels: [{ name: "Nike Pegasus 40", href: "/encyclopedia/nike-pegasus-40" }, { name: "New Balance Fresh Foam 1080", href: "/encyclopedia/fresh-foam-1080" }, { name: "Brooks Ghost", href: "/encyclopedia/brooks-ghost" }, { name: "Asics Gel-Kayano", href: "/encyclopedia/asics-gel-kayano" }],
},

{
  slug: "reebok-classic-leather",
  name: "Reebok Classic Leather",
  tagline: "A 1983 tennis shoe that became one of the most recognizable lifestyle sneakers of all time — the Reebok Classic Leather's clean white upper and understated design have made it a wardrobe staple across four decades.",
  brand: "Reebok", firstRelease: "1983", designer: "Reebok", retailPrice: "$75–$80", tier: 2,
  images: [
    { src: "/encyclopedia/reebok-classic-leather/hero.jpg", alt: "Reebok Classic Leather" },
    { src: "/encyclopedia/reebok-classic-leather/angle-1.jpg", alt: "Reebok Classic Leather side" },
    { src: "/encyclopedia/reebok-classic-leather/angle-2.jpg", alt: "Reebok Classic Leather angle" },
    { src: "/encyclopedia/reebok-classic-leather/detail.jpg", alt: "Reebok Classic Leather detail" },
  ],
  marketSnapshot: { title: "Reebok Classic Leather Market Overview", demand: "Moderate Demand", avgResale: "$60–$150", trend: "Stable", volatility: "Low", liquidity: "Moderate", flipScore: "24 / 100", description: "The Classic Leather is a widely available lifestyle shoe with minimal resale upside on standard colorways. Fashion collabs generate occasional premiums but this is primarily a wear shoe." },
  history: [
    "Reebok introduced the Classic Leather in 1983 as a premium tennis shoe — the full grain leather upper and EVA midsole were positioning statements about quality in a crowded market.",
    "The shoe gained mainstream adoption through the aerobics boom of the 1980s and then transitioned to streetwear through the 1990s as athletic shoes crossed into everyday fashion.",
    "Notable collabs with Palace, Cottweiler, and fashion designers have given the Classic Leather periodic collector moments without fundamentally changing its mass-market positioning.",
  ],
  designIntro: "The Reebok Classic Leather is defined by its full grain leather upper, EVA midsole for lightweight cushioning, die-cut EVA insole, and the simple Reebok Union Jack flag logo on the tongue.",
  designBullets: ["Full grain leather upper for durability and clean aesthetic", "EVA midsole for lightweight cushioning", "Union Jack flag logo on the tongue", "Low-cut silhouette for versatile everyday wear", "Herringbone rubber outsole for traction"],
  colorways: [
    { name: "White / Light Grey", note: "The most classic colorway — clean white leather with minimal detailing", market: "Retail" },
    { name: "All White", note: "Crisp all-white option popular for lifestyle and fashion styling", market: "Retail" },
    { name: "Palace x Reebok Classic Leather", note: "UK skate brand collab with strong collector appeal in European markets", market: "Modest premium" },
  ],
  resaleParagraphs: ["Standard Classic Leather GRs have no resale margin — widely available globally.", "Fashion collabs generate modest premiums among Reebok collectors."],
  resaleHighlights: [{ label: "Best For", value: "Personal wear" }, { label: "Risk Level", value: "Very Low" }, { label: "Reseller Take", value: "Not a resale target" }],
  resellerInsight: { flipScore: "24 / 100", liquidity: "Moderate", typicalMargin: "None on GRs", bestUse: "Personal wear", bullets: ["Mass availability kills any resale margin.", "Fashion collabs are the only flip opportunity.", "Strong wear shoe with long-lasting leather construction."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Reebok Classic Leather Pair Live", description: "Use SneakPrice to compare current pricing and track collab demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare across retailers", "Track collab availability", "Find the best current price"] },
  careIntro: ["The Classic Leather's full grain leather upper is one of the easiest uppers to maintain — leather cleaner and conditioner every few months.", "The EVA midsole can yellow over time; keep it clean to slow the process."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Removes surface dirt from leather." }, { label: "Leather Cleaner", desc: "Keeps the leather clean and bright." }, { label: "Leather Conditioner", desc: "Prevents cracking and maintains suppleness." }, { label: "Magic Eraser", desc: "Effective on midsole yellowing." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full leather upper." }, { step: "2", label: "Dry Brush", desc: "Remove loose dirt before applying any product." }],
  careCleaning: [{ step: "1", label: "Clean Leather", desc: "Apply leather cleaner with soft brush in circular motions." }, { step: "2", label: "Wipe Midsole", desc: "Magic Eraser on yellowed EVA midsole areas." }, { step: "3", label: "Condition", desc: "Apply leather conditioner to the upper." }, { step: "4", label: "Air Dry", desc: "Dry naturally away from heat." }],
  relatedModels: [{ name: "Reebok Club C", href: "/encyclopedia/reebok-club-c" }, { name: "Adidas Stan Smith", href: "/encyclopedia/adidas-stan-smith" }, { name: "Nike Cortez", href: "/encyclopedia/nike-cortez" }, { name: "Reebok Instapump Fury", href: "/encyclopedia/instapump-fury" }],
},

{
  slug: "reebok-club-c",
  name: "Reebok Club C",
  tagline: "Originally a 1985 tennis shoe, the Reebok Club C has quietly become one of the most versatile and consistently popular clean white sneakers in the lifestyle market.",
  brand: "Reebok", firstRelease: "1985", designer: "Reebok", retailPrice: "$75–$80", tier: 2,
  images: [
    { src: "/encyclopedia/reebok-club-c/hero.jpg", alt: "Reebok Club C" },
    { src: "/encyclopedia/reebok-club-c/angle-1.jpg", alt: "Reebok Club C side" },
    { src: "/encyclopedia/reebok-club-c/angle-2.jpg", alt: "Reebok Club C angle" },
    { src: "/encyclopedia/reebok-club-c/detail.jpg", alt: "Reebok Club C detail" },
  ],
  marketSnapshot: { title: "Reebok Club C Market Overview", demand: "Moderate Demand", avgResale: "$60–$140", trend: "Stable", volatility: "Low", liquidity: "Moderate", flipScore: "26 / 100", description: "The Club C is a mass-market lifestyle shoe with minimal resale upside on standard colorways. Fashion and streetwear collabs generate occasional premiums but this is overwhelmingly a wear shoe." },
  history: [
    "Reebok introduced the Club C in 1985 as a tennis shoe — the 'C' stands for 'Court', reflecting its performance origins.",
    "The Club C became a wardrobe staple through the 1990s and 2000s, beloved for its versatility and clean profile that works with almost any outfit.",
    "Notable collaborations with Cardi B, A$AP Nast, and BBC/Billionaire Boys Club have given the Club C periodic streetwear moments.",
  ],
  designIntro: "The Club C features a leather upper, EVA midsole for lightweight cushioning, die-cut foam insole, and the clean Reebok wordmark on the lateral side — a refined court shoe aesthetic.",
  designBullets: ["Leather upper for clean, durable finish", "EVA midsole for lightweight everyday cushioning", "Low-cut court shoe silhouette", "Reebok wordmark on lateral panel", "Herringbone rubber outsole for grip"],
  colorways: [
    { name: "White / Green", note: "The most classic Club C colorway — the original tennis court look", market: "Retail" },
    { name: "All White", note: "The clean everyday option — versatile and widely worn", market: "Retail" },
    { name: "Cardi B x Club C", note: "Bold fashion collaboration with strong consumer demand at launch", market: "Near retail" },
  ],
  resaleParagraphs: ["Standard Club C GRs have zero resale margin — available in virtually every market globally.", "Collab releases generate short-term demand but thin long-term resale."],
  resaleHighlights: [{ label: "Best For", value: "Personal wear" }, { label: "Risk Level", value: "Very Low" }, { label: "Reseller Take", value: "Not a resale target" }],
  resellerInsight: { flipScore: "26 / 100", liquidity: "Moderate", typicalMargin: "None", bestUse: "Personal wear", bullets: ["Mass availability kills resale margin.", "Not worth targeting for resale.", "Reliable wear shoe — buy for use, not profit."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Reebok Club C Pair Live", description: "Use SneakPrice to compare current Club C pricing.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare across retailers", "Track limited edition availability", "Find the best current price"] },
  careIntro: ["The Club C's leather upper is easy to maintain with regular cleaning and conditioning.", "The EVA midsole can yellow — clean it regularly to preserve the fresh look."],
  careTools: [{ label: "Leather Cleaner", desc: "Keeps the leather panels bright and clean." }, { label: "Leather Conditioner", desc: "Prevents drying and cracking." }, { label: "Soft-bristle Brush", desc: "Removes surface dirt from leather." }, { label: "Magic Eraser", desc: "Effective on midsole yellowing." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full upper." }, { step: "2", label: "Dry Brush", desc: "Remove loose dirt before cleaning." }],
  careCleaning: [{ step: "1", label: "Clean Leather", desc: "Apply leather cleaner with soft brush." }, { step: "2", label: "Wipe Midsole", desc: "Magic Eraser on yellowed areas." }, { step: "3", label: "Condition", desc: "Apply leather conditioner." }, { step: "4", label: "Air Dry", desc: "Dry naturally." }],
  relatedModels: [{ name: "Reebok Classic Leather", href: "/encyclopedia/reebok-classic-leather" }, { name: "Adidas Stan Smith", href: "/encyclopedia/adidas-stan-smith" }, { name: "Nike Air Force 1", href: "/encyclopedia/air-force-1" }, { name: "Reebok Instapump Fury", href: "/encyclopedia/instapump-fury" }],
},


// ─── S ────────────────────────────────────────────────────────────────────────

{
  slug: "adidas-samba",
  name: "Adidas Samba",
  tagline: "Born on frozen football pitches in 1950 and reborn on fashion runways in 2022 — the Adidas Samba is the most unlikely comeback story in sneaker history.",
  brand: "Adidas", firstRelease: "1950", designer: "Adidas", retailPrice: "$100", tier: 1,
  images: [
    { src: "/encyclopedia/adidas-samba/hero.jpg", alt: "Adidas Samba" },
    { src: "/encyclopedia/adidas-samba/angle-1.jpg", alt: "Adidas Samba side" },
    { src: "/encyclopedia/adidas-samba/angle-2.jpg", alt: "Adidas Samba angle" },
    { src: "/encyclopedia/adidas-samba/detail.jpg", alt: "Adidas Samba detail" },
  ],
  marketSnapshot: { title: "Adidas Samba Market Overview", demand: "Very Strong Demand", avgResale: "$90–$400+", trend: "Peak 2023-2024 — stabilizing", volatility: "Low to Medium", liquidity: "Very High", flipScore: "52 / 100", description: "The Samba's fashion revival has been the biggest sneaker story of 2022-2024. Standard GRs now often sell above retail in key colorways; fashion collabs (Wales Bonner, Craig Green, Sporty & Rich) command very strong premiums. Trend-driven but with genuine staying power." },
  history: [
    "Adidas designed the Samba in 1950 as a football training shoe for use on frozen or hard winter pitches — its flat gum sole and suede upper were optimized for indoor grip.",
    "The Samba became a staple of European street culture through the 1980s and 1990s, worn by football casuals and eventually adopted as a lifestyle shoe globally.",
    "After decades as a reliable but unfashionable stalwart, the Samba exploded into the center of global fashion in 2022 — driven by fashion editors, influencers, and brand collaborations.",
    "Wales Bonner's Adidas Samba collaborations are widely credited with triggering the revival, bringing premium suede, artistic positioning, and fashion credibility to the silhouette.",
  ],
  designIntro: "The Adidas Samba is defined by its gum rubber T-toe overlay, suede upper, flat crepe rubber outsole, Three Stripes on the lateral panel, and a low-cut profile that balances sport heritage with fashion versatility.",
  designBullets: ["Suede or leather upper in classic and premium colorways", "Gum rubber T-toe overlay — the Samba's signature detail", "Flat crepe rubber outsole from football heritage", "Three Stripes on lateral panel", "Low-cut profile barely changed since 1950"],
  colorways: [
    { name: "Core Black / Cloud White / Gum", note: "The OG and most recognizable Samba colorway — the standard for the current revival", market: "Above retail in peak demand" },
    { name: "Wales Bonner x Adidas Samba 'Cream White'", note: "The collab that ignited the Samba revival — one of the most influential sneaker collabs of the decade", market: "Very strong premium" },
    { name: "Craig Green x Adidas Samba", note: "High-fashion interpretation with deconstructed details and premium materials", market: "Strong premium" },
    { name: "White / Gum", note: "The clean alternative — huge lifestyle appeal with near-Samba-Black demand levels", market: "Near to above retail" },
  ],
  resaleParagraphs: ["The Samba GR market is unusually active — even standard colorways sell above retail in peak demand cycles, driven by the fashion world's embrace.", "Wales Bonner and Craig Green collabs command the strongest premiums, often at 3x-5x retail among fashion buyers."],
  resaleHighlights: [{ label: "Best For", value: "Core colorway flips + fashion collab targeting" }, { label: "Risk Level", value: "Medium — trend-dependent, but Samba has shown staying power" }, { label: "Reseller Take", value: "Black/White GRs and Wales Bonner are the two safest Samba plays" }],
  resellerInsight: { flipScore: "52 / 100", liquidity: "Very High", typicalMargin: "Modest on GRs, strong on fashion collabs", bestUse: "Core colorway and Wales Bonner collab targeting", bullets: ["Even standard Samba GRs move above retail at peak demand.", "Wales Bonner is the benchmark Samba collab — move fast when available.", "Trend has lasted longer than expected — but monitor for cooling."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Adidas Samba Pair Live", description: "Use SneakPrice to compare Samba pricing across colorways and track the fashion demand wave.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track GR vs Wales Bonner collab pricing", "Monitor Samba demand by colorway", "Compare against Gazelle and Handball Spezial"] },
  careIntro: ["The Samba's suede upper requires regular brushing — the T-toe overlay can trap dirt in its edges.", "The flat gum outsole can yellow; clean it regularly with a Magic Eraser to preserve its warm tone."],
  careTools: [{ label: "Suede Brush", desc: "Maintain the suede nap on the upper." }, { label: "Suede Eraser", desc: "Targets scuffs on suede panels." }, { label: "Magic Eraser", desc: "Brightens the gum outsole." }, { label: "Crep Protect Spray", desc: "Seals suede after cleaning." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full upper and T-toe detail." }, { step: "2", label: "Dry Brush", desc: "Brush suede in one direction first." }],
  careCleaning: [{ step: "1", label: "Erase & Brush Suede", desc: "Erase scuffs then restore nap with brush." }, { step: "2", label: "Clean T-Toe Edges", desc: "Detail around the rubber T-toe with a soft brush." }, { step: "3", label: "Restore Gum Sole", desc: "Magic Eraser on the crepe rubber outsole." }, { step: "4", label: "Protect", desc: "Apply suede spray once fully dry." }],
  relatedModels: [{ name: "Adidas Gazelle", href: "/encyclopedia/gazelle" }, { name: "Adidas Handball Spezial", href: "/encyclopedia/handball-spezial" }, { name: "Adidas Forum Low", href: "/encyclopedia/forum-low" }, { name: "Vans Old Skool", href: "/encyclopedia/vans-old-skool" }],
},

{
  slug: "nike-sb-dunk-low",
  name: "Nike SB Dunk Low",
  tagline: "The skate-specific Dunk that launched a thousand grails — the Nike SB Dunk Low's limited distribution and legendary collabs made it the most coveted sneaker of the early 2000s and the template for modern resale culture.",
  brand: "Nike", firstRelease: "2002", designer: "Nike SB", retailPrice: "$100–$110", tier: 1,
  images: [
    { src: "/encyclopedia/nike-sb-dunk-low/hero.jpg", alt: "Nike SB Dunk Low" },
    { src: "/encyclopedia/nike-sb-dunk-low/angle-1.jpg", alt: "Nike SB Dunk Low side" },
    { src: "/encyclopedia/nike-sb-dunk-low/angle-2.jpg", alt: "Nike SB Dunk Low angle" },
    { src: "/encyclopedia/nike-sb-dunk-low/detail.jpg", alt: "Nike SB Dunk Low detail" },
  ],
  marketSnapshot: { title: "Nike SB Dunk Low Market Overview", demand: "Very Strong Demand", avgResale: "$150–$2,000+", trend: "Stable — elite tier maintains premium", volatility: "High", liquidity: "High", flipScore: "78 / 100", description: "The SB Dunk Low is the blueprint for modern sneaker resale culture. Grail releases from the early SB era command four-figure premiums; modern SB collabs regularly trade at 2x-5x retail. The SB line has the highest ceiling and highest variance of any Nike sub-brand." },
  history: [
    "Nike launched the SB (Skateboarding) sub-brand in 2002, releasing the Dunk Low with zoom air insole, thicker padding, and distribution exclusively through skate shops.",
    "The Staple NYC Pigeon Dunk (2005) sparked near-riots outside New York stores — widely cited as the moment sneaker culture became mainstream media.",
    "Supreme, Stüssy, Futura, and Un Entitled collaborations from 2002-2007 created the foundational grail tier that established SB Dunks as the most valuable Nike sneakers of their era.",
    "After a quiet mid-2010s period, SB Dunks returned to cultural dominance in 2019-2021 through collabs with Travis Scott, Ben & Jerry's, and Grateful Dead.",
  ],
  designIntro: "The Nike SB Dunk Low is built on the standard Dunk Low chassis but adds Zoom Air insole, extra collar padding, and often premium materials and creative construction in collab versions.",
  designBullets: ["Zoom Air insole added for impact protection during skating", "Extra collar and tongue padding for skate comfort", "Same two-tone paneled upper as standard Dunk Low", "Often features premium materials in collab builds", "Skateboarding-specific herringbone outsole traction"],
  colorways: [
    { name: "Staple NYC Pigeon (Grey Pigeon)", note: "The most historically significant SB Dunk — sparked the first sneaker riot in 2005", market: "Grail — $1,500+" },
    { name: "Travis Scott x SB Dunk Low", note: "The modern era's most hyped SB Dunk collab — massive demand at launch and sustained premium", market: "Very strong resale" },
    { name: "Ben & Jerry's x SB Dunk Low 'Chunky Dunky'", note: "Ice cream colorway that became a cultural moment — one of the most recognizable modern SB collabs", market: "Strong premium" },
    { name: "Supreme x SB Dunk Low (various)", note: "Multiple Supreme colorways across the SB era — all command premiums among collectors", market: "Strong to very strong premium" },
  ],
  resaleParagraphs: ["The SB Dunk Low is the highest-ceiling resale target in Nike's lineup — grail-tier early SB releases command four-figure prices.", "Modern SB collabs are more accessible but still generate 2x-5x retail premiums with fast sell-through."],
  resaleHighlights: [{ label: "Best For", value: "Top-tier SB collab targeting" }, { label: "Risk Level", value: "Medium — high ceiling but collab-dependent" }, { label: "Reseller Take", value: "The SB line is the most reliable high-premium Nike resale target" }],
  resellerInsight: { flipScore: "78 / 100", liquidity: "High", typicalMargin: "Very strong on key collabs", bestUse: "Elite SB collab targeting", bullets: ["Travis Scott and Ben & Jerry's are the modern benchmarks.", "Early grails (Pigeon, Supreme) are long-hold investments worth 5-figure prices.", "SB-specific shops often have better access — build relationships with skateshops."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any SB Dunk Low Pair Live", description: "Use SneakPrice to compare SB Dunk Low collab pricing and identify top-tier resale opportunities.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track SB collab vs standard Dunk Low pricing", "Compare modern vs early SB era grails", "Identify upcoming SB release opportunities"] },
  careIntro: ["The SB Dunk Low uses the same leather and suede construction as the standard Dunk Low — care is identical.", "The extra padding in the collar and tongue can trap moisture; dry thoroughly after cleaning."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Cleans leather and suede panels." }, { label: "Suede Brush", desc: "For suede-heavy SB colorways." }, { label: "Leather Cleaner", desc: "For leather upper panels." }, { label: "Magic Eraser", desc: "Effective on the midsole and outsole." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access all panels including the extra-padded collar." }, { step: "2", label: "Dry Brush", desc: "Remove loose dirt from all surfaces." }],
  careCleaning: [{ step: "1", label: "Clean Upper Panels", desc: "Leather cleaner on leather; suede brush/eraser on suede." }, { step: "2", label: "Clean Collar Padding", desc: "Light damp cloth inside the padded collar — dry thoroughly." }, { step: "3", label: "Wipe Midsole", desc: "Magic Eraser or damp cloth on the midsole." }, { step: "4", label: "Air Dry Fully", desc: "Ensure the extra collar padding dries completely." }],
  relatedModels: [{ name: "Nike Dunk Low", href: "/encyclopedia/nike-dunk-low" }, { name: "Nike Dunk High", href: "/encyclopedia/nike-dunk-high" }, { name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" }, { name: "Air Jordan 4", href: "/encyclopedia/air-jordan-4" }],
},

{
  slug: "air-jordan-spizike",
  name: "Air Jordan Spizike",
  tagline: "Spike Lee's personal hybrid tribute to Michael Jordan — the Spizike fuses design elements from five different Jordan models into a singular shoe that celebrates both the Jordan legacy and cinematic sneaker culture.",
  brand: "Jordan Brand", firstRelease: "2006", designer: "Spike Lee x Tinker Hatfield", retailPrice: "$185–$200", tier: 2,
  images: [
    { src: "/encyclopedia/air-jordan-spizike/hero.jpg", alt: "Air Jordan Spizike" },
    { src: "/encyclopedia/air-jordan-spizike/angle-1.jpg", alt: "Air Jordan Spizike side" },
    { src: "/encyclopedia/air-jordan-spizike/angle-2.jpg", alt: "Air Jordan Spizike angle" },
    { src: "/encyclopedia/air-jordan-spizike/detail.jpg", alt: "Air Jordan Spizike detail" },
  ],
  marketSnapshot: { title: "Air Jordan Spizike Market Overview", demand: "Moderate Demand", avgResale: "$150–$400", trend: "Stable — niche collector appeal", volatility: "Medium", liquidity: "Moderate", flipScore: "42 / 100", description: "The Spizike has a dedicated niche following among Jordan collectors who appreciate its hybrid design and Spike Lee connection. Retro releases sell above retail; key colorways and OG pairs command meaningful premiums." },
  history: [
    "Jordan Brand created the Spizike in 2006 in partnership with director Spike Lee, who had appeared in iconic Nike commercials alongside Michael Jordan in the late 1980s.",
    "The Spizike fuses design DNA from the Jordan 3 (elephant print), Jordan 4 (mesh), Jordan 5 (lace lock), Jordan 6 (pull tab), and Jordan 9 (sole) into a single cohesive shoe.",
    "The original Brooklyn Nets colorway referenced Spike Lee's famous courtside presence at Madison Square Garden as a Knicks fan — a signature move in the Jordan Brand narrative.",
    "Limited retro releases have periodically brought the Spizike back, maintaining its status as a Jordan Brand curiosity beloved by those who know its origin story.",
  ],
  designIntro: "The Air Jordan Spizike fuses design elements from the Jordan 3, 4, 5, 6, and 9 — elephant print toe box, mesh side panels, lace lock from the 5, heel pull tab from the 6, and the Spizike-adapted sole unit.",
  designBullets: ["Elephant print toe box from the Air Jordan 3", "Mesh side panels referencing the Air Jordan 4", "Lace lock detailing from the Air Jordan 5", "Heel pull tab from the Air Jordan 6", "Composite sole adapted from Air Jordan 9"],
  colorways: [
    { name: "Brooklyn Nets (Black / Green)", note: "The original Spike Lee OG colorway — the most iconic Spizike release", market: "Strong collector premium" },
    { name: "History of Flight (Multi)", note: "Colorway celebrating Jordan's greatest moments — popular among dedicated Jordan collectors", market: "Above retail" },
    { name: "OG Retro Colorways", note: "Periodic retro releases in original colorways consistently sell above retail", market: "Above retail" },
  ],
  resaleParagraphs: ["The Spizike is a collector's Jordan — it trades above retail on retro releases and key colorways among those who know it.", "It lacks the mass market appeal of the 1, 3, 4, or 11, keeping both premiums and liquidity in the moderate range."],
  resaleHighlights: [{ label: "Best For", value: "OG colorway retros for Jordan collectors" }, { label: "Risk Level", value: "Medium — niche market" }, { label: "Reseller Take", value: "Know the Jordan collector community — this is a connoisseur play" }],
  resellerInsight: { flipScore: "42 / 100", liquidity: "Moderate", typicalMargin: "Modest to solid above retail on key colorways", bestUse: "OG colorway targeting for Jordan collectors", bullets: ["Brooklyn Nets colorway is the most coveted Spizike.", "Requires knowing Jordan collector community to sell successfully.", "Less liquid than mainstream Jordans but genuine premiums exist."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Jordan Spizike Pair Live", description: "Use SneakPrice to compare Spizike pricing and track collector demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track OG colorway pricing", "Monitor Jordan collector demand", "Compare against other Jordan retros"] },
  careIntro: ["The Spizike's hybrid construction mixes leather, mesh, and elephant print — each material needs its own care approach.", "The elephant print areas trap dirt in their texture; use a soft brush to detail them."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Cleans leather and elephant print texture." }, { label: "Leather Cleaner", desc: "For the leather panels." }, { label: "Microfiber Cloth", desc: "Wipe the midsole and outsole." }, { label: "Magic Eraser", desc: "For midsole scuff removal." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access all panels including lace lock." }, { step: "2", label: "Dry Brush", desc: "Remove loose dirt from elephant print texture." }],
  careCleaning: [{ step: "1", label: "Clean Leather Panels", desc: "Leather cleaner in circular motions." }, { step: "2", label: "Detail Elephant Print", desc: "Soft brush into the textured recesses." }, { step: "3", label: "Wipe Midsole", desc: "Magic Eraser on any scuffed midsole areas." }, { step: "4", label: "Air Dry", desc: "Dry naturally away from heat." }],
  relatedModels: [{ name: "Air Jordan 3", href: "/encyclopedia/air-jordan-3" }, { name: "Air Jordan 4", href: "/encyclopedia/air-jordan-4" }, { name: "Air Jordan 1", href: "/encyclopedia/air-jordan-1" }, { name: "Air Jordan 11", href: "/encyclopedia/air-jordan-11" }],
},

{
  slug: "puma-speed-cat",
  name: "Puma Speed Cat",
  tagline: "Born from motorsport and adopted by streetwear — the Puma Speed Cat's low-profile suede construction and racing-inspired aesthetic made it one of the most stylish lifestyle sneakers of the early 2000s.",
  brand: "Puma", firstRelease: "1999", designer: "Puma", retailPrice: "$80–$90", tier: 2,
  images: [
    { src: "/encyclopedia/puma-speed-cat/hero.jpg", alt: "Puma Speed Cat" },
    { src: "/encyclopedia/puma-speed-cat/angle-1.jpg", alt: "Puma Speed Cat side" },
    { src: "/encyclopedia/puma-speed-cat/angle-2.jpg", alt: "Puma Speed Cat angle" },
    { src: "/encyclopedia/puma-speed-cat/detail.jpg", alt: "Puma Speed Cat detail" },
  ],
  marketSnapshot: { title: "Puma Speed Cat Market Overview", demand: "Moderate Demand", avgResale: "$70–$180", trend: "Reviving — nostalgia-driven demand returning 2023-2024", volatility: "Low to Medium", liquidity: "Moderate", flipScore: "34 / 100", description: "The Speed Cat is experiencing a nostalgia revival on the back of the broader Y2K and motorsport aesthetic trend. Standard GRs trade near retail; limited colorways and select collabs generate modest premiums." },
  history: [
    "Puma designed the Speed Cat in 1999 for use by racing drivers — its ultra-thin sole allowed drivers to feel pedal feedback while the suede upper provided grip inside the car.",
    "The Speed Cat crossed from motorsport to streetwear in the early 2000s, adopted by fashion-conscious consumers who appreciated its minimal aesthetic and racing heritage.",
    "Ferrari-branded Speed Cats from Puma's motorsport partnership became some of the most sought-after Speed Cat releases — the Ferrari collab remains the most recognized.",
    "A Y2K revival and growing interest in motorsport aesthetics (amplified by Formula 1's mainstream popularity surge) brought the Speed Cat back into fashion conversations from 2022 onward.",
  ],
  designIntro: "The Puma Speed Cat is defined by its ultra-thin flat sole for pedal feedback, suede upper with minimal overlays, low-profile silhouette, and Puma formstripe on the lateral side.",
  designBullets: ["Ultra-thin flat sole optimized for driving pedal feel", "Suede upper with minimal overlays", "Low-cut profile barely clearing the ankle", "Puma formstripe on lateral panel", "Ferrari-branded versions feature motorsport branding"],
  colorways: [
    { name: "Ferrari Speed Cat (Red / Black)", note: "The most iconic Speed Cat colorway — Ferrari branding and vibrant red make it the definitive pair", market: "Above retail" },
    { name: "Black / Black", note: "Understated all-black option with consistent lifestyle demand", market: "Near retail" },
    { name: "White / Peacoat", note: "Clean lifestyle colorway popular with the Y2K-inspired fashion crowd", market: "Near retail" },
  ],
  resaleParagraphs: ["The Speed Cat's revival has pushed some limited colorways above retail, but most GRs trade near retail.", "Ferrari-branded pairs remain the strongest Speed Cat resale target."],
  resaleHighlights: [{ label: "Best For", value: "Ferrari collab and limited colorway flips" }, { label: "Risk Level", value: "Low to Medium — trend-dependent" }, { label: "Reseller Take", value: "Ferrari pairs and limited colorways in peak trend window" }],
  resellerInsight: { flipScore: "34 / 100", liquidity: "Moderate", typicalMargin: "Modest on GRs, stronger on Ferrari colorways", bestUse: "Ferrari and limited motorsport colorway targeting", bullets: ["Ferrari-branded pairs are the primary Speed Cat resale target.", "Y2K/motorsport trend is driving a revival — timing is key.", "Standard GRs have minimal margin."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Puma Speed Cat Pair Live", description: "Use SneakPrice to compare Speed Cat pricing and track the motorsport revival demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track Ferrari vs standard colorway pricing", "Monitor Y2K trend demand", "Compare against other motorsport lifestyle shoes"] },
  careIntro: ["The Speed Cat's suede upper and ultra-thin sole need regular care — the shoe sits very low, making the upper more exposed to ground splash.", "The thin sole is not replaceable; protect it from heavy wear."],
  careTools: [{ label: "Suede Brush", desc: "Maintain the suede nap." }, { label: "Suede Eraser", desc: "Targets scuffs on the upper." }, { label: "Crep Protect Spray", desc: "Seal suede against moisture." }, { label: "Microfiber Cloth", desc: "Wipe the minimal midsole." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full suede upper." }, { step: "2", label: "Dry Brush", desc: "Brush in one direction first." }],
  careCleaning: [{ step: "1", label: "Erase & Brush Suede", desc: "Erase scuffs then restore nap." }, { step: "2", label: "Wipe Sole", desc: "Damp cloth on the thin flat sole." }, { step: "3", label: "Protect", desc: "Apply suede spray once dry." }],
  relatedModels: [{ name: "Puma Suede Classic", href: "/encyclopedia/puma-suede-classic" }, { name: "Adidas Samba", href: "/encyclopedia/adidas-samba" }, { name: "Vans Old Skool", href: "/encyclopedia/vans-old-skool" }, { name: "Puma RS-X", href: "/encyclopedia/puma-rs-x" }],
},


// ─── T ────────────────────────────────────────────────────────────────────────

{
  slug: "timberland-6-inch",
  name: "Timberland 6-Inch Boot",
  tagline: "The wheat nubuck boot that went from New England construction sites to New York rap videos — the Timberland 6-Inch has been a cornerstone of hip-hop culture and streetwear since the early 1990s.",
  brand: "Timberland", firstRelease: "1973", designer: "Timberland", retailPrice: "$200–$230", tier: 2,
  images: [
    { src: "/encyclopedia/timberland-6-inch/hero.jpg", alt: "Timberland 6-Inch Boot" },
    { src: "/encyclopedia/timberland-6-inch/angle-1.jpg", alt: "Timberland 6-Inch Boot side" },
    { src: "/encyclopedia/timberland-6-inch/angle-2.jpg", alt: "Timberland 6-Inch Boot angle" },
    { src: "/encyclopedia/timberland-6-inch/detail.jpg", alt: "Timberland 6-Inch Boot detail" },
  ],
  marketSnapshot: { title: "Timberland 6-Inch Market Overview", demand: "Strong Demand", avgResale: "$150–$350", trend: "Stable — perennial seasonal demand", volatility: "Low", liquidity: "Moderate", flipScore: "30 / 100", description: "The Timberland 6-Inch is a seasonal staple with consistent fall/winter demand. Standard wheat nubuck pairs trade near retail; premium collabs and special editions generate above-retail premiums. Not a primary resale target but maintains consistent lifestyle demand." },
  history: [
    "Timberland introduced the waterproof leather 6-Inch boot in 1973, originally targeting New England outdoor workers and construction crews needing durable weatherproof footwear.",
    "The boot crossed into hip-hop culture in the early 1990s through the Notorious B.I.G., Wu-Tang Clan, Jay-Z, and Nas — NYC rappers who embraced the wheat nubuck boot as a cold-weather staple.",
    "Throughout the 1990s the Timberland became as essential to East Coast hip-hop aesthetics as Air Force 1s — its rugged practicality resonating deeply with the music's working-class themes.",
    "Designer collaborations with Supreme, Off-White, and various fashion houses in the 2010s and 2020s elevated the Timberland into premium fashion territory.",
  ],
  designIntro: "The Timberland 6-Inch Boot is defined by its premium waterproof nubuck leather upper, padded collar, lug rubber outsole, rustproof hardware, and the signature wheat colorway that became iconic in hip-hop culture.",
  designBullets: ["Premium waterproof nubuck leather upper", "Padded ankle collar for comfort and protection", "Lug rubber outsole for traction on varied terrain", "Rustproof eyelets and hardware", "Primaloft insulation for warmth in cold conditions"],
  colorways: [
    { name: "Wheat Nubuck", note: "The original and most iconic Timberland colorway — the one that defined its hip-hop association", market: "Near retail" },
    { name: "Black Nubuck", note: "The versatile all-season alternative with broad lifestyle appeal", market: "Near retail" },
    { name: "Supreme x Timberland 6-Inch Boot", note: "The most recognized Timberland fashion collab — premium materials and strong collector demand", market: "Strong premium" },
    { name: "Off-White x Timberland Boot", note: "Virgil Abloh's deconstructed interpretation with fashion-forward positioning", market: "Strong premium" },
  ],
  resaleParagraphs: ["Standard Timberland 6-Inch pairs trade near retail with seasonal demand spikes in fall/winter — minimal flip margin on everyday colorways.", "Supreme and high-fashion collabs command strong premiums among streetwear and fashion collectors."],
  resaleHighlights: [{ label: "Best For", value: "Fashion collab flips — GRs are low margin" }, { label: "Risk Level", value: "Low on GRs, Medium on collabs" }, { label: "Reseller Take", value: "Supreme collab is the safest Timberland flip" }],
  resellerInsight: { flipScore: "30 / 100", liquidity: "Moderate", typicalMargin: "None on GRs, solid on Supreme/Off-White", bestUse: "Fashion collab targeting", bullets: ["Wheat GRs have minimal resale margin despite strong demand.", "Supreme collabs are the primary Timberland resale target.", "Seasonal demand spikes help liquidity but don't create meaningful margin."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Timberland 6-Inch Pair Live", description: "Use SneakPrice to compare Timberland pricing and track collab demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track collab vs GR pricing", "Monitor seasonal demand spikes", "Compare across colorways"] },
  careIntro: ["Nubuck leather needs regular brushing to maintain its texture — treat it differently from smooth leather.", "Waterproofing spray is essential after cleaning to restore the boot's weather resistance."],
  careTools: [{ label: "Nubuck Brush", desc: "Maintains the nubuck texture — use in one direction." }, { label: "Nubuck Eraser", desc: "Lifts scuffs and marks from nubuck." }, { label: "Waterproofing Spray", desc: "Essential after cleaning to restore water resistance." }, { label: "Microfiber Cloth", desc: "Wipe the rubber outsole and hardware." }],
  carePrep: [{ step: "1", label: "Unlace Fully", desc: "Remove laces to access the collar and tongue." }, { step: "2", label: "Dry Brush Nubuck", desc: "Brush in one direction to remove dry dirt and restore nap." }],
  careCleaning: [{ step: "1", label: "Erase Scuffs", desc: "Apply nubuck eraser to marks on the upper." }, { step: "2", label: "Restore Nap", desc: "Brush nubuck in one direction after erasing." }, { step: "3", label: "Clean Outsole", desc: "Firm brush or damp cloth on the lug rubber outsole." }, { step: "4", label: "Re-waterproof", desc: "Apply waterproofing spray once fully dry — critical after every clean." }],
  relatedModels: [{ name: "Nike Air Force 1", href: "/encyclopedia/air-force-1" }, { name: "Vans Old Skool", href: "/encyclopedia/vans-old-skool" }, { name: "Nike Dunk High", href: "/encyclopedia/nike-dunk-high" }, { name: "Adidas Forum Low", href: "/encyclopedia/forum-low" }],
},

{
  slug: "adidas-terrex-free-hiker",
  name: "Adidas Terrex Free Hiker",
  tagline: "Adidas' flagship trail hiking shoe — the Terrex Free Hiker combines Boost midsole cushioning with aggressive Continental rubber outsole for a shoe that performs on technical trails and looks at home in the city.",
  brand: "Adidas", firstRelease: "2019", designer: "Adidas Terrex", retailPrice: "$200–$220", tier: 2,
  images: [
    { src: "/encyclopedia/adidas-terrex-free-hiker/hero.jpg", alt: "Adidas Terrex Free Hiker" },
    { src: "/encyclopedia/adidas-terrex-free-hiker/angle-1.jpg", alt: "Adidas Terrex Free Hiker side" },
    { src: "/encyclopedia/adidas-terrex-free-hiker/angle-2.jpg", alt: "Adidas Terrex Free Hiker angle" },
    { src: "/encyclopedia/adidas-terrex-free-hiker/detail.jpg", alt: "Adidas Terrex Free Hiker detail" },
  ],
  marketSnapshot: { title: "Adidas Terrex Free Hiker Market Overview", demand: "Moderate Demand", avgResale: "$150–$250", trend: "Stable", volatility: "Low", liquidity: "Low", flipScore: "18 / 100", description: "The Terrex Free Hiker is a performance hiking/outdoor shoe with no meaningful resale market. Purchased at retail by hikers and outdoors enthusiasts. Gorpcore trend has given it minor lifestyle appeal but not resale traction." },
  history: [
    "Adidas Terrex launched the Free Hiker in 2019 as a premium trail shoe combining Boost midsole cushioning — previously limited to running — with a high-cut hiking boot construction.",
    "The Free Hiker's crossover appeal — performance trail credibility with clean lifestyle aesthetics — made it a natural fit for the growing Gorpcore fashion movement.",
    "Limited collaboration colorways with outdoor-adjacent brands have generated modest collector interest among technical outdoor enthusiasts.",
  ],
  designIntro: "The Terrex Free Hiker features Boost midsole cushioning, Primeknit upper for a sock-like fit, Continental rubber outsole for wet-surface traction, and a high-top hiking construction.",
  designBullets: ["Boost midsole for cushioned trail comfort", "Primeknit upper for breathable sock-like fit", "Continental rubber outsole for superior wet traction", "High-top construction for ankle support on technical terrain", "Waterproof options available with Gore-Tex integration"],
  colorways: [
    { name: "Core Black / Carbon", note: "Sleek all-black option popular for urban use and mild trail activity", market: "Retail" },
    { name: "Wonder Steel / Aluminium", note: "Clean earth-tone option with strong Gorpcore lifestyle appeal", market: "Retail" },
  ],
  resaleParagraphs: ["No meaningful resale market — the Terrex Free Hiker is a performance purchase.", "Not a collector target; Gorpcore trend has increased lifestyle demand but not resale activity."],
  resaleHighlights: [{ label: "Best For", value: "Hiking and trail performance" }, { label: "Risk Level", value: "None — no resale market" }, { label: "Reseller Take", value: "Not a resale target" }],
  resellerInsight: { flipScore: "18 / 100", liquidity: "Low", typicalMargin: "None", bestUse: "Trail hiking and outdoor use", bullets: ["No resale market.", "Gorpcore appeal adds lifestyle credibility but no flip potential.", "Buy for performance use only."] },
  cta: { eyebrow: "Live Market Tool", title: "Check Terrex Free Hiker Pricing Live", description: "Use SneakPrice to compare current Terrex Free Hiker pricing across retailers.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare pricing across outdoor retailers", "Find the best current price", "Track colorway availability"] },
  careIntro: ["The Primeknit upper is breathable but collects trail dirt easily — clean after every significant outing.", "The Continental rubber outsole needs regular cleaning to maintain its legendary wet-surface traction."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Removes trail dirt from the Primeknit upper." }, { label: "Sneaker Cleaning Solution", desc: "Safe for the Primeknit fabric." }, { label: "Firm Brush", desc: "Clears mud and debris from the deep Continental outsole lugs." }, { label: "Warm Water", desc: "Helps loosen stubborn trail debris." }],
  carePrep: [{ step: "1", label: "Remove Insoles & Laces", desc: "Air insoles; access the full upper." }, { step: "2", label: "Knock Off Mud", desc: "Remove large debris before washing." }],
  careCleaning: [{ step: "1", label: "Clean Primeknit Upper", desc: "Diluted solution with soft brush on the knit." }, { step: "2", label: "Scrub Outsole Lugs", desc: "Firm brush on Continental rubber to restore traction grooves." }, { step: "3", label: "Rinse Lightly", desc: "Light rinse to remove cleaning solution residue." }, { step: "4", label: "Air Dry", desc: "Dry stuffed with paper at room temperature." }],
  relatedModels: [{ name: "New Balance Fresh Foam 1080", href: "/encyclopedia/fresh-foam-1080" }, { name: "Nike Pegasus 40", href: "/encyclopedia/nike-pegasus-40" }, { name: "Brooks Ghost", href: "/encyclopedia/brooks-ghost" }, { name: "Adidas Ultra Boost", href: "/encyclopedia/adidas-ultra-boost" }],
},

// ─── U ────────────────────────────────────────────────────────────────────────

{
  slug: "adidas-ultra-boost",
  name: "Adidas Ultra Boost",
  tagline: "The shoe that changed running footwear forever — the Adidas Ultra Boost's Boost foam midsole introduced a level of energy return that set a new standard for the industry and sparked a global lifestyle phenomenon.",
  brand: "Adidas", firstRelease: "2015", designer: "Adidas", retailPrice: "$190–$200", tier: 1,
  images: [
    { src: "/encyclopedia/adidas-ultra-boost/hero.jpg", alt: "Adidas Ultra Boost" },
    { src: "/encyclopedia/adidas-ultra-boost/angle-1.jpg", alt: "Adidas Ultra Boost side" },
    { src: "/encyclopedia/adidas-ultra-boost/angle-2.jpg", alt: "Adidas Ultra Boost angle" },
    { src: "/encyclopedia/adidas-ultra-boost/detail.jpg", alt: "Adidas Ultra Boost detail" },
  ],
  marketSnapshot: { title: "Adidas Ultra Boost Market Overview", demand: "Moderate Demand", avgResale: "$120–$300", trend: "Declining from 2016-2018 peak — now a wear shoe", volatility: "Low", liquidity: "Low to Moderate", flipScore: "25 / 100", description: "The Ultra Boost's resale market peaked in 2016-2018 and has since normalized. Most pairs trade at or below retail. A handful of limited colorways and collabs retain modest premiums. The hype cycle has fully passed — this is now a premium running and lifestyle shoe, not a resale target." },
  history: [
    "Adidas launched the Ultra Boost in 2015, introducing Boost midsole technology — a thermoplastic polyurethane foam developed with chemical company BASF that returned energy more efficiently than any previous running foam.",
    "The Ultra Boost became a cultural phenomenon almost immediately — Kanye West was photographed wearing a prototype, triggering massive demand before the shoe officially released.",
    "From 2015 to 2018, the Ultra Boost was the most hyped Adidas lifestyle shoe alongside the Yeezy, driving the 'Adidas is back' narrative that saw the brand reclaim serious market share from Nike.",
    "As production scaled to meet demand, the market normalized — the Ultra Boost is now firmly a premium running and lifestyle shoe rather than a resale commodity.",
  ],
  designIntro: "The Ultra Boost is defined by its full-length Boost midsole, Primeknit upper for a sock-like fit, Torsion System in the midfoot for stability, and Continental rubber outsole for superior traction.",
  designBullets: ["Full-length Boost midsole for maximum energy return", "Primeknit upper for adaptive fit and breathability", "Torsion System for midfoot stability", "Continental rubber outsole for reliable grip", "Heel counter cage for structural support at the back"],
  colorways: [
    { name: "Triple White", note: "The cleanest Ultra Boost colorway — became the universal lifestyle standard", market: "Near retail" },
    { name: "Triple Black", note: "Bold all-black version popular across running and street contexts", market: "Near retail" },
    { name: "All Terrain Ultra Boost Collabs", note: "Limited-edition colorways and collabs from the peak hype era retain modest collector interest", market: "Near to modest above retail" },
  ],
  resaleParagraphs: ["The Ultra Boost's hype cycle has fully passed — standard pairs trade at or below retail in most colorways.", "A small number of early limited releases and peak-era collabs retain modest premiums among Ultra Boost collectors."],
  resaleHighlights: [{ label: "Best For", value: "Personal wear — resale market has largely evaporated" }, { label: "Risk Level", value: "Low — but no upside" }, { label: "Reseller Take", value: "Skip entirely for resale" }],
  resellerInsight: { flipScore: "25 / 100", liquidity: "Low to Moderate", typicalMargin: "None on current releases", bestUse: "Running and lifestyle wear", bullets: ["Hype cycle over — GRs at or below retail.", "Peak-era limited pairs have some collector value but thin market.", "Buy for the Boost cushioning, not the resale potential."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Ultra Boost Pair Live", description: "Use SneakPrice to compare Ultra Boost pricing across colorways.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare current pricing", "Check limited colorway availability", "Find the best price"] },
  careIntro: ["The Ultra Boost's Primeknit upper needs gentle cleaning — the knit can stretch if scrubbed aggressively.", "The Boost midsole can pick up scuffs but never use abrasive cleaners on it."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Gently cleans the Primeknit upper." }, { label: "Sneaker Cleaning Solution", desc: "Diluted formula safe for Primeknit." }, { label: "Microfiber Cloth", desc: "Blot and wipe — never scrub Primeknit." }, { label: "Magic Eraser", desc: "Light use on Boost midsole scuffs." }],
  carePrep: [{ step: "1", label: "Remove Insoles & Laces", desc: "Full access to the upper." }, { step: "2", label: "Dry Brush Gently", desc: "Remove loose debris without distorting the knit." }],
  careCleaning: [{ step: "1", label: "Clean Primeknit", desc: "Apply diluted solution with soft brush in light circular motions." }, { step: "2", label: "Blot Upper", desc: "Use microfiber to absorb moisture — never rub Primeknit." }, { step: "3", label: "Wipe Boost Midsole", desc: "Damp cloth or light Magic Eraser on scuffs." }, { step: "4", label: "Air Dry Fully", desc: "Dry at room temperature — heat degrades Boost foam." }],
  relatedModels: [{ name: "Adidas EQT Support ADV", href: "/encyclopedia/eqt-support-adv" }, { name: "Nike Flyknit Racer", href: "/encyclopedia/flyknit-racer" }, { name: "New Balance Fresh Foam 1080", href: "/encyclopedia/fresh-foam-1080" }, { name: "Nike React Infinity Run", href: "/encyclopedia/nike-react-infinity-run" }],
},

// ─── V ────────────────────────────────────────────────────────────────────────

{
  slug: "vans-sk8-hi",
  name: "Vans Sk8-Hi",
  tagline: "The original high-top skate shoe — the Vans Sk8-Hi's canvas upper and vulcanized waffle sole have made it a skateboarding essential and global lifestyle icon since 1978.",
  brand: "Vans", firstRelease: "1978", designer: "Vans", retailPrice: "$70–$85", tier: 2,
  images: [
    { src: "/encyclopedia/vans-sk8-hi/hero.jpg", alt: "Vans Sk8-Hi" },
    { src: "/encyclopedia/vans-sk8-hi/angle-1.jpg", alt: "Vans Sk8-Hi side" },
    { src: "/encyclopedia/vans-sk8-hi/angle-2.jpg", alt: "Vans Sk8-Hi angle" },
    { src: "/encyclopedia/vans-sk8-hi/detail.jpg", alt: "Vans Sk8-Hi detail" },
  ],
  marketSnapshot: { title: "Vans Sk8-Hi Market Overview", demand: "Very Strong Demand", avgResale: "$60–$200", trend: "Stable", volatility: "Low", liquidity: "High", flipScore: "26 / 100", description: "The Sk8-Hi is a globally ubiquitous lifestyle shoe with enormous wear demand and virtually no resale upside on standard colorways. Fashion and Supreme collabs generate occasional premiums." },
  history: [
    "Vans introduced the Sk8-Hi in 1978 as a high-top companion to the Authentic — the padded ankle collar provided skaters with better support and protection.",
    "The shoe became embedded in California skate culture through the 1980s and 1990s, worn by early pros who valued its board feel and protection.",
    "Supreme x Vans Sk8-Hi collaborations from the 2000s onward elevated the high-top into streetwear collector territory with bold graphic treatments.",
    "The Sk8-Hi remains one of Vans' best-selling silhouettes globally — a consistent performer across skate, street, and lifestyle markets.",
  ],
  designIntro: "The Vans Sk8-Hi is defined by its high canvas upper with padded ankle collar, signature jazz stripe, vulcanized waffle outsole, and the reinforced toe cap for skate durability.",
  designBullets: ["High canvas upper for ankle coverage and support", "Padded ankle collar for comfort during skating", "Signature Vans jazz stripe on lateral panel", "Vulcanized waffle rubber outsole for board feel", "Reinforced toe cap for skate durability"],
  colorways: [
    { name: "Black / White", note: "The most classic Sk8-Hi colorway — universally recognized", market: "Retail" },
    { name: "True White / True White", note: "Clean all-white option popular for lifestyle and fashion contexts", market: "Retail" },
    { name: "Supreme x Vans Sk8-Hi", note: "The most sought-after Sk8-Hi collab — Supreme graphic treatments command premium", market: "Modest to strong premium" },
  ],
  resaleParagraphs: ["Standard Sk8-Hi GRs are ubiquitous — zero resale margin on everyday colorways.", "Supreme collabs are the primary resale opportunity."],
  resaleHighlights: [{ label: "Best For", value: "Wear — no resale market on standard pairs" }, { label: "Risk Level", value: "Very Low" }, { label: "Reseller Take", value: "Only Supreme or major collabs worth targeting" }],
  resellerInsight: { flipScore: "26 / 100", liquidity: "High", typicalMargin: "None on GRs", bestUse: "Personal wear", bullets: ["GRs have zero resale margin — sold everywhere.", "Supreme collabs are the only Sk8-Hi flip worth pursuing.", "High liquidity makes secondhand pairs easy to move but impossible to profit from."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Vans Sk8-Hi Pair Live", description: "Use SneakPrice to compare Sk8-Hi pricing and track collab demand.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track collab vs GR pricing", "Monitor Supreme release demand", "Compare against Old Skool pricing"] },
  careIntro: ["The Sk8-Hi's canvas upper is straightforward to clean — regular maintenance prevents buildup.", "The vulcanized sole and foxing tape respond well to a Magic Eraser."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Cleans canvas upper and toe cap." }, { label: "Sneaker Cleaning Solution", desc: "Safe for canvas." }, { label: "Magic Eraser", desc: "Restores white foxing tape and toe cap." }, { label: "Microfiber Cloth", desc: "Wipe down after cleaning." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the tongue and collar area." }, { step: "2", label: "Dry Brush Canvas", desc: "Remove loose dirt before introducing moisture." }],
  careCleaning: [{ step: "1", label: "Clean Canvas", desc: "Apply diluted sneaker solution with soft brush." }, { step: "2", label: "Clean Toe Cap", desc: "Brush or Magic Eraser on the reinforced toe cap." }, { step: "3", label: "Restore Foxing", desc: "Magic Eraser on white foxing tape." }, { step: "4", label: "Air Dry", desc: "Dry naturally away from heat." }],
  relatedModels: [{ name: "Vans Old Skool", href: "/encyclopedia/vans-old-skool" }, { name: "Nike Dunk High", href: "/encyclopedia/nike-dunk-high" }, { name: "Converse Chuck Taylor All Star", href: "/encyclopedia/chuck-taylor-all-star" }, { name: "Adidas Forum Low", href: "/encyclopedia/forum-low" }],
},

{
  slug: "adidas-zx-8000",
  name: "Adidas ZX 8000",
  tagline: "The pinnacle of Adidas' 1989 ZX running series — the ZX 8000 introduced Torsion technology to the world and became one of the most celebrated archive runners of the modern era.",
  brand: "Adidas", firstRelease: "1989", designer: "Jacques Chassaing", retailPrice: "$120–$130", tier: 2,
  images: [
    { src: "/encyclopedia/adidas-zx-8000/hero.jpg", alt: "Adidas ZX 8000" },
    { src: "/encyclopedia/adidas-zx-8000/angle-1.jpg", alt: "Adidas ZX 8000 side" },
    { src: "/encyclopedia/adidas-zx-8000/angle-2.jpg", alt: "Adidas ZX 8000 angle" },
    { src: "/encyclopedia/adidas-zx-8000/detail.jpg", alt: "Adidas ZX 8000 detail" },
  ],
  marketSnapshot: { title: "Adidas ZX 8000 Market Overview", demand: "Steady Demand", avgResale: "$90–$200", trend: "Stable", volatility: "Low", liquidity: "Moderate", flipScore: "35 / 100", description: "Standard ZX 8000 GRs trade near retail. Limited collaborations — particularly the A-ZX series — command modest premiums. A favourite in European sneaker culture with consistent sell-through." },
  history: [
    "Jacques Chassaing designed the ZX 8000 in 1989 as the apex of the ZX running line — a shoe built for elite performance featuring Torsion System for midfoot support.",
    "Torsion technology, visible through a cutout in the midsole, allowed the forefoot and heel to move independently — a genuine innovation for 1989 running biomechanics.",
    "The ZX 8000 fell into obscurity through the 1990s before becoming one of the most sought-after Adidas archives in the 2000s sneaker revival.",
    "The 2020 A-ZX series revived 26 heritage ZX silhouettes — the ZX 8000 anchored the series as its most iconic entry, collaborating with Lego, South Park, and more.",
  ],
  designIntro: "The ZX 8000 features a multi-panel suede and nylon upper, visible Torsion bridge in the midsole, OG multicolour blocking, and a distinctive bulky running profile.",
  designBullets: ["Multi-panel suede and mesh/nylon upper", "Torsion System midsole bridge for midfoot support", "Bold colour-blocking across toe box, side panels, and heel", "Thick EVA midsole with visible technology window", "Herringbone-inspired rubber outsole"],
  colorways: [
    { name: "Aqua / White", note: "The OG colourway — aqua/teal tones with white and grey panels", market: "Near retail" },
    { name: "A-ZX Series Collabs", note: "2020 A-ZX drops with Lego, South Park, and more", market: "Modest premiums" },
    { name: "Consortium Exclusives", note: "Limited Consortium drops through key retailers", market: "Moderate premium" },
  ],
  resaleParagraphs: ["Standard ZX 8000 GRs have settled near or slightly above retail.", "The A-ZX series collab pairs carried modest premiums — primarily for collectors."],
  resaleHighlights: [{ label: "Best For", value: "Archive collectors" }, { label: "Risk Level", value: "Low" }, { label: "Reseller Take", value: "Near retail on GRs" }],
  resellerInsight: { flipScore: "35 / 100", liquidity: "Moderate", typicalMargin: "Near zero on GRs", bestUse: "Collab flips only", bullets: ["Standard pairs are not profitable — avoid unless buying below retail.", "A-ZX collabs and Consortium drops offer modest upside.", "Strong following in Europe makes liquidity better than most archives."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any ZX 8000 Pair Live", description: "Use SneakPrice to compare ZX 8000 collab pricing and find undervalued pairs.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare A-ZX collab premiums", "Track archive vs GR pricing", "Monitor Consortium drop values"] },
  careIntro: ["The ZX 8000's multi-panel suede upper needs regular brushing to prevent matting.", "The nylon mesh panels are more forgiving but need protection from moisture."],
  careTools: [{ label: "Suede Brush", desc: "Restores nap on suede panels." }, { label: "Suede Protector Spray", desc: "Water and stain repellent for suede." }, { label: "Sneaker Cleaning Solution", desc: "Gentle formula for mesh panels." }, { label: "Microfiber Cloth", desc: "Wipe midsole and outsole." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access all suede panels." }, { step: "2", label: "Dry Brush Suede", desc: "Brush in one direction to lift nap." }],
  careCleaning: [{ step: "1", label: "Clean Suede Panels", desc: "Use suede brush in gentle circular motions." }, { step: "2", label: "Clean Mesh", desc: "Diluted solution on mesh areas." }, { step: "3", label: "Wipe Midsole", desc: "Damp cloth on the foam midsole." }, { step: "4", label: "Protect", desc: "Apply suede protector when dry." }],
  relatedModels: [{ name: "Adidas ZX 8000", href: "/encyclopedia/adidas-zx-8000" }, { name: "Adidas EQT Support ADV", href: "/encyclopedia/eqt-support-adv" }, { name: "New Balance 990v6", href: "/encyclopedia/new-balance-990v6" }, { name: "Nike Waffle Racer", href: "/encyclopedia/nike-waffle-racer" }],
},

{
  slug: "mizuno-wave-rider",
  name: "Mizuno Wave Rider",
  tagline: "Mizuno's flagship neutral running shoe — the Wave Rider has earned a cult following among distance runners for its Parallel Wave plate, smooth ride, and three-decade legacy of performance consistency.",
  brand: "Mizuno", firstRelease: "1997", designer: "Mizuno", retailPrice: "$130–$140", tier: 3,
  images: [
    { src: "/encyclopedia/mizuno-wave-rider/hero.jpg", alt: "Mizuno Wave Rider" },
    { src: "/encyclopedia/mizuno-wave-rider/angle-1.jpg", alt: "Mizuno Wave Rider side" },
    { src: "/encyclopedia/mizuno-wave-rider/angle-2.jpg", alt: "Mizuno Wave Rider angle" },
    { src: "/encyclopedia/mizuno-wave-rider/detail.jpg", alt: "Mizuno Wave Rider detail" },
  ],
  marketSnapshot: { title: "Mizuno Wave Rider Market Overview", demand: "Steady Running Demand", avgResale: "$80–$130", trend: "Stable", volatility: "Very Low", liquidity: "Low", flipScore: "8 / 100", description: "The Wave Rider is a performance running shoe with essentially no resale market. Bought and worn by serious runners — virtually zero speculative buying activity." },
  history: [
    "Mizuno introduced the Wave Rider in 1997 as the neutral complement to its stability-focused Wave line — designed for mid-to-high arched runners seeking cushioning without corrective support.",
    "The Parallel Wave plate — Mizuno's signature technology embedded between midsole layers — disperses impact force laterally and longitudinally, creating the brand's signature smooth transition.",
    "Over 27 iterations, the Wave Rider has remained one of the most consistent performers in running shoes — refined each version without radical redesigns.",
    "The Wave Rider 26 and 27 expanded the shoe's lifestyle crossover appeal with colour-blocked designs that attracted non-runners to the silhouette.",
  ],
  designIntro: "The Wave Rider features a mesh upper with targeted overlays, Mizuno's Parallel Wave plate for cushioning and stability, ENERZY foam core, and a blown rubber outsole.",
  designBullets: ["Engineered mesh upper with welded overlays", "Parallel Wave plate between midsole layers — Mizuno's defining technology", "ENERZY foam core for responsive cushioning", "Blown rubber outsole for lightweight durability", "Heel counter for rear-foot stability"],
  colorways: [
    { name: "Black / White / Silver", note: "Classic performance colourway — the everyday runner's choice", market: "Retail" },
    { name: "Wave Rider 26 — Blue Coral", note: "Lifestyle-crossover colourway driving non-runner interest", market: "Near retail" },
    { name: "Wave Rider 27 — Seasonal Drops", note: "Seasonal launches in fashion-forward tones", market: "Near retail" },
  ],
  resaleParagraphs: ["The Wave Rider has no meaningful resale market — performance running shoes rarely do.", "Buy for the run, not the return."],
  resaleHighlights: [{ label: "Best For", value: "Running performance" }, { label: "Risk Level", value: "None" }, { label: "Reseller Take", value: "Not a resale target" }],
  resellerInsight: { flipScore: "8 / 100", liquidity: "Low", typicalMargin: "None", bestUse: "Personal wear / running", bullets: ["Zero resale market on all colourways.", "Not worth stocking for resale under any circumstance.", "Buy if you're a runner — it's genuinely one of the best daily trainers available."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Wave Rider Pair Live", description: "Use SneakPrice to check current Wave Rider pricing before buying.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare pricing across retailers", "Find discounted previous versions", "Check current stock availability"] },
  careIntro: ["The Wave Rider's mesh upper cleans easily with a soft brush and mild solution.", "Avoid soaking — mesh dries slowly and can hold odour."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Gentle cleaning of mesh upper." }, { label: "Mild Detergent", desc: "Diluted for mesh panels." }, { label: "Microfiber Cloth", desc: "Dry and wipe down." }, { label: "Shoe Deodoriser", desc: "Running shoes need regular deodorising." }],
  carePrep: [{ step: "1", label: "Remove Insoles", desc: "Air them separately after runs." }, { step: "2", label: "Dry Brush", desc: "Remove debris from mesh and outsole." }],
  careCleaning: [{ step: "1", label: "Clean Mesh", desc: "Soft brush with diluted detergent." }, { step: "2", label: "Wipe Midsole", desc: "Damp cloth on Wave midsole." }, { step: "3", label: "Scrub Outsole", desc: "Firm brush on blown rubber." }, { step: "4", label: "Air Dry", desc: "Dry naturally with insoles removed." }],
  relatedModels: [{ name: "Asics Gel-Kayano", href: "/encyclopedia/asics-gel-kayano" }, { name: "Nike Pegasus 40", href: "/encyclopedia/nike-pegasus-40" }, { name: "New Balance Fresh Foam 1080", href: "/encyclopedia/fresh-foam-1080" }, { name: "Nike React Infinity Run", href: "/encyclopedia/nike-react-infinity-run" }],
},

{
  slug: "nike-waffle-racer",
  name: "Nike Waffle Racer",
  tagline: "The shoe born from a waffle iron — Bill Bowerman's 1974 invention that gave Nike its first technological identity and laid the foundation for every performance sole innovation that followed.",
  brand: "Nike", firstRelease: "1974", designer: "Bill Bowerman", retailPrice: "$100–$110", tier: 2,
  images: [
    { src: "/encyclopedia/nike-waffle-racer/hero.jpg", alt: "Nike Waffle Racer" },
    { src: "/encyclopedia/nike-waffle-racer/angle-1.jpg", alt: "Nike Waffle Racer side" },
    { src: "/encyclopedia/nike-waffle-racer/angle-2.jpg", alt: "Nike Waffle Racer angle" },
    { src: "/encyclopedia/nike-waffle-racer/detail.jpg", alt: "Nike Waffle Racer detail" },
  ],
  marketSnapshot: { title: "Nike Waffle Racer Market Overview", demand: "Lifestyle Demand", avgResale: "$70–$150", trend: "Stable", volatility: "Low", liquidity: "Low to Moderate", flipScore: "22 / 100", description: "The Waffle Racer is primarily a lifestyle and heritage shoe with limited resale upside on standard colourways. Archive-focused buyers collect key colourways but the market is niche." },
  history: [
    "Nike co-founder Bill Bowerman poured rubber into his wife's waffle iron in 1971 while searching for a better running sole — the resulting waffle pattern gripped the track far better than anything available.",
    "The Waffle Trainer debuted in 1974 as the first commercial product using Bowerman's waffle sole technology — the Waffle Racer followed as the racing performance variant.",
    "Steve Prefontaine wore early Nike Waffle prototypes during his 1972 Olympic campaign, cementing the shoe's connection to American running culture.",
    "Nike revived the Waffle Racer as a lifestyle silhouette in the late 2010s, capitalising on the nostalgia wave that elevated heritage runners to mainstream fashion.",
  ],
  designIntro: "The Waffle Racer features a low-profile suede and mesh upper, the iconic waffle rubber outsole with multi-directional nubs, and a lightweight flat last — pure 1970s running DNA.",
  designBullets: ["Low-profile suede and mesh upper", "Iconic waffle rubber outsole — Bill Bowerman's breakthrough sole technology", "Flat racing last for a ground-feel ride", "Thin EVA midsole for minimal cushioning", "Brogue-like lacing on heritage colourways"],
  colorways: [
    { name: "Sail / Gum Light Brown", note: "The heritage-accurate colourway closest to the 1974 original", market: "Near retail" },
    { name: "Black / Anthracite", note: "The most commercially accessible modern lifestyle colourway", market: "Near retail" },
    { name: "Oregon Duck — Special Editions", note: "University of Oregon inspired colourways honoring Bowerman's legacy", market: "Modest premium" },
  ],
  resaleParagraphs: ["The Waffle Racer is a wear shoe for heritage enthusiasts — no meaningful resale market on standard releases.", "Niche collector appeal but low turnover."],
  resaleHighlights: [{ label: "Best For", value: "Heritage collectors" }, { label: "Risk Level", value: "Low" }, { label: "Reseller Take", value: "Not a flip target" }],
  resellerInsight: { flipScore: "22 / 100", liquidity: "Low to Moderate", typicalMargin: "None on GRs", bestUse: "Personal wear", bullets: ["No resale market on GRs.", "Deep Nike history makes it collectible but not profitable.", "Buy for the story and the sole — it's a genuinely important shoe."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Waffle Racer Pair Live", description: "Use SneakPrice to check current Waffle Racer pricing.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare colourway pricing", "Find discounted pairs", "Check resale vs retail"] },
  careIntro: ["The Waffle Racer's suede panels need regular brushing and protection.", "The waffle outsole can trap debris — clean the nubs after wear."],
  careTools: [{ label: "Suede Brush", desc: "Maintains the suede upper." }, { label: "Suede Protector Spray", desc: "Repels water and stains." }, { label: "Toothbrush", desc: "Gets into waffle outsole nubs." }, { label: "Microfiber Cloth", desc: "Wipe down midsole." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access the full upper." }, { step: "2", label: "Dry Brush Suede", desc: "Lift nap before cleaning." }],
  careCleaning: [{ step: "1", label: "Clean Suede", desc: "Brush in one direction with suede brush." }, { step: "2", label: "Clean Waffle Sole", desc: "Toothbrush on waffle nubs to clear debris." }, { step: "3", label: "Wipe Midsole", desc: "Damp cloth on the flat midsole." }, { step: "4", label: "Protect", desc: "Apply suede protector spray when dry." }],
  relatedModels: [{ name: "Nike Cortez", href: "/encyclopedia/cortez" }, { name: "Nike Air Max 90", href: "/encyclopedia/air-max-90" }, { name: "Adidas ZX 8000", href: "/encyclopedia/adidas-zx-8000" }, { name: "New Balance 574", href: "/encyclopedia/new-balance-574" }],
},

{
  slug: "nike-zoom-fly-5",
  name: "Nike Zoom Fly 5",
  tagline: "Nike's carbon-plate marathon trainer — the Zoom Fly 5 brings race-day technology to everyday training, bridging the gap between performance and the iconic Vaporfly silhouette.",
  brand: "Nike", firstRelease: "2022", designer: "Nike Running", retailPrice: "$160", tier: 3,
  images: [
    { src: "/encyclopedia/nike-zoom-fly-5/hero.jpg", alt: "Nike Zoom Fly 5" },
    { src: "/encyclopedia/nike-zoom-fly-5/angle-1.jpg", alt: "Nike Zoom Fly 5 side" },
    { src: "/encyclopedia/nike-zoom-fly-5/angle-2.jpg", alt: "Nike Zoom Fly 5 angle" },
    { src: "/encyclopedia/nike-zoom-fly-5/detail.jpg", alt: "Nike Zoom Fly 5 detail" },
  ],
  marketSnapshot: { title: "Nike Zoom Fly 5 Market Overview", demand: "Performance Runner Demand", avgResale: "$110–$160", trend: "Stable", volatility: "Very Low", liquidity: "Low", flipScore: "10 / 100", description: "The Zoom Fly 5 is a pure performance running shoe — essentially zero resale market. Worn by competitive runners who buy directly from Nike or authorised retailers." },
  history: [
    "Nike introduced the Zoom Fly line as a training counterpart to the race-day Vaporfly — allowing runners to train with carbon plate feel at a more accessible price point.",
    "The Zoom Fly 5 added a full-length carbon fibre plate to a ReactX foam midsole — the closest training analogue to the Alphafly and Vaporfly technology stack.",
    "Nike positioned the shoe as a race-pace workout tool, designed specifically for tempo runs, long runs, and marathon-pace training blocks.",
    "The Zoom Fly 5's textured upper and floating tongue design represented a significant aesthetic departure from previous Zoom Fly versions.",
  ],
  designIntro: "The Zoom Fly 5 features a textured knit upper, full-length carbon fibre plate, ReactX foam midsole, and wide base geometry borrowed from the Vaporfly race shoe family.",
  designBullets: ["Textured engineered knit upper with floating tongue", "Full-length carbon fibre plate for propulsive energy return", "ReactX foam midsole — 13% more energy return than standard React", "Wide forefoot platform for stability at race pace", "Rubber pods on outsole for durability"],
  colorways: [
    { name: "Black / White", note: "The default launch colourway — clean and functional", market: "Retail" },
    { name: "Volt / Black", note: "High-visibility training colourway", market: "Near retail" },
    { name: "Seasonal Running Colourways", note: "Regular updates aligned with marathon season", market: "Near retail" },
  ],
  resaleParagraphs: ["The Zoom Fly 5 is a training tool — no resale market exists.", "Runners buy it to run, not to flip."],
  resaleHighlights: [{ label: "Best For", value: "Marathon training" }, { label: "Risk Level", value: "None" }, { label: "Reseller Take", value: "Not a flip target" }],
  resellerInsight: { flipScore: "10 / 100", liquidity: "Low", typicalMargin: "None", bestUse: "High-mileage training", bullets: ["Zero resale upside.", "Buy if you're training for a marathon.", "The carbon plate feel at $160 is genuinely good value versus Vaporfly."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Zoom Fly 5 Pair Live", description: "Use SneakPrice to compare current Zoom Fly 5 pricing.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Find discounted pairs", "Compare vs Vaporfly pricing", "Check current stock"] },
  careIntro: ["The Zoom Fly 5's knit upper is delicate — avoid machine washing.", "Rotate training shoes to extend midsole life."],
  careTools: [{ label: "Soft Brush", desc: "Gentle on knit upper." }, { label: "Mild Detergent", desc: "Diluted for knit fabric." }, { label: "Microfiber Cloth", desc: "Wipe the midsole." }, { label: "Shoe Trees", desc: "Maintain shape when storing." }],
  carePrep: [{ step: "1", label: "Air Out", desc: "Always air shoes after runs before cleaning." }, { step: "2", label: "Remove Insoles", desc: "Clean separately." }],
  careCleaning: [{ step: "1", label: "Spot Clean Knit", desc: "Damp cloth or soft brush — no soaking." }, { step: "2", label: "Wipe Midsole", desc: "Damp cloth on ReactX foam." }, { step: "3", label: "Clean Outsole", desc: "Firm brush on rubber pods." }, { step: "4", label: "Air Dry", desc: "Dry naturally with insoles removed." }],
  relatedModels: [{ name: "Nike Pegasus 40", href: "/encyclopedia/nike-pegasus-40" }, { name: "Nike React Infinity Run", href: "/encyclopedia/nike-react-infinity-run" }, { name: "Asics Gel-Kayano", href: "/encyclopedia/asics-gel-kayano" }, { name: "New Balance Fresh Foam 1080", href: "/encyclopedia/fresh-foam-1080" }],
},

{
  slug: "nike-zoom-freak-5",
  name: "Nike Zoom Freak 5",
  tagline: "Giannis Antetokounmpo's fifth signature Nike basketball shoe — built for the unique demands of the most physically dominant player in the NBA.",
  brand: "Nike", firstRelease: "2023", designer: "Nike Basketball", retailPrice: "$120", tier: 2,
  images: [
    { src: "/encyclopedia/nike-zoom-freak-5/hero.jpg", alt: "Nike Zoom Freak 5" },
    { src: "/encyclopedia/nike-zoom-freak-5/angle-1.jpg", alt: "Nike Zoom Freak 5 side" },
    { src: "/encyclopedia/nike-zoom-freak-5/angle-2.jpg", alt: "Nike Zoom Freak 5 angle" },
    { src: "/encyclopedia/nike-zoom-freak-5/detail.jpg", alt: "Nike Zoom Freak 5 detail" },
  ],
  marketSnapshot: { title: "Nike Zoom Freak 5 Market Overview", demand: "Basketball & Giannis Fan Demand", avgResale: "$90–$180", trend: "Stable", volatility: "Low to Medium", liquidity: "Low to Moderate", flipScore: "28 / 100", description: "Standard Freak 5 GRs trade near or below retail — a performance basketball shoe with limited lifestyle crossover. PE and special edition colourways carry modest premiums among Giannis collectors." },
  history: [
    "Giannis Antetokounmpo signed with Nike in 2017, launching his first signature shoe in 2019 — the Freak line grew alongside his back-to-back MVP and championship career arc.",
    "The Zoom Freak 5 was designed specifically for Giannis' uniquely long stride and aggressive change-of-direction style — a player who moves a 7-foot wingspan at guard speed.",
    "The shoe features a split outsole and asymmetric construction to handle the lateral forces Giannis generates during his 'The Drive' attacking motion.",
    "PE versions worn by Giannis during playoff runs have become collector targets — a growing area of interest for basketball shoe collectors.",
  ],
  designIntro: "The Zoom Freak 5 features a knit upper with welded overlays, Air Zoom Strobel cushioning unit, split outsole for flexibility, and a wide base for stability under Giannis' weight and stride.",
  designBullets: ["Engineered knit upper with reinforced side panels", "Air Zoom Strobel full-length unit for responsive court feel", "Split outsole for multi-directional flexibility", "Wide forefoot base for stability under lateral loads", "Lace closure with inner bootie construction"],
  colorways: [
    { name: "Black / Multi-Color", note: "Standard GR launch colourway", market: "Near to below retail" },
    { name: "Milwaukee Bucks Colourways", note: "Green and cream Bucks-inspired GRs", market: "Near retail" },
    { name: "PE Editions", note: "Player exclusive colourways worn on court — highest collector value", market: "Moderate to strong premium" },
  ],
  resaleParagraphs: ["GRs sell near or below retail — most basketball shoes do.", "PE and special editions for Giannis collectors show the most upside."],
  resaleHighlights: [{ label: "Best For", value: "Basketball players, Giannis collectors" }, { label: "Risk Level", value: "Low" }, { label: "Reseller Take", value: "PE editions only" }],
  resellerInsight: { flipScore: "28 / 100", liquidity: "Low to Moderate", typicalMargin: "None on GRs", bestUse: "Play or collect PEs", bullets: ["Standard GRs have no resale upside.", "PE colourways are the only flip worth considering.", "The shoe performs exceptionally on court — worth buying at retail for hoopers."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Zoom Freak 5 Pair Live", description: "Use SneakPrice to compare Freak 5 colourway pricing.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Track PE vs GR pricing", "Compare colourway demand", "Monitor restocks"] },
  careIntro: ["The Freak 5's knit upper is easy to clean but needs regular attention after court use.", "The wide rubber outsole picks up gym floor debris easily."],
  careTools: [{ label: "Soft Brush", desc: "Cleans knit upper panels." }, { label: "Mild Detergent", desc: "Diluted for the knit fabric." }, { label: "Stiff Brush", desc: "For cleaning the textured outsole." }, { label: "Microfiber Cloth", desc: "Wipe and dry." }],
  carePrep: [{ step: "1", label: "Remove Insoles", desc: "Air separately after play." }, { step: "2", label: "Dry Brush Outsole", desc: "Remove gym floor debris." }],
  careCleaning: [{ step: "1", label: "Spot Clean Knit", desc: "Damp cloth with mild detergent." }, { step: "2", label: "Scrub Outsole", desc: "Stiff brush on traction pattern." }, { step: "3", label: "Wipe Midsole", desc: "Damp cloth on foam sides." }, { step: "4", label: "Air Dry", desc: "Dry naturally — no heat." }],
  relatedModels: [{ name: "Nike LeBron 21", href: "/encyclopedia/lebron-21" }, { name: "Nike Kobe 6", href: "/encyclopedia/nike-kobe-6" }, { name: "Air Jordan 11", href: "/encyclopedia/air-jordan-11" }, { name: "Air Jordan 12", href: "/encyclopedia/air-jordan-12" }],
},

{
  slug: "yeezy-boost-350-v2",
  name: "Yeezy Boost 350 V2",
  tagline: "The shoe that made Kanye's name synonymous with sneaker culture — the Yeezy Boost 350 V2 rewrote the rules of hype, exclusivity, and resale from 2016 onwards.",
  brand: "Adidas / Yeezy", firstRelease: "2016", designer: "Kanye West / Adidas Design", retailPrice: "$220–$230", tier: 1,
  images: [
    { src: "/encyclopedia/yeezy-boost-350-v2/hero.jpg", alt: "Yeezy Boost 350 V2" },
    { src: "/encyclopedia/yeezy-boost-350-v2/angle-1.jpg", alt: "Yeezy Boost 350 V2 side" },
    { src: "/encyclopedia/yeezy-boost-350-v2/angle-2.jpg", alt: "Yeezy Boost 350 V2 angle" },
    { src: "/encyclopedia/yeezy-boost-350-v2/detail.jpg", alt: "Yeezy Boost 350 V2 detail" },
  ],
  marketSnapshot: { title: "Yeezy Boost 350 V2 Market Overview", demand: "Moderate Demand", avgResale: "$150–$400", trend: "Declining from 2019–21 peak", volatility: "Medium", liquidity: "High", flipScore: "45 / 100", description: "The 350 V2 market peaked 2016–2021. Post-Adidas-Kanye split and inventory dump, most colourways trade near or below retail. Zebra, Bred, and Beluga retain the strongest collector demand." },
  history: [
    "Kanye West and Adidas launched the original Yeezy Boost 350 in 2015 — a minimal primeknit runner that sold out in minutes and spawned a resale market unlike anything before it.",
    "The V2 update in 2016 added a stripe with semi-transparent panelling, a more structured Primeknit pattern, and the divisive 'SPLY-350' branding on the stripe.",
    "Colourways including Zebra, Bred, Beluga, and Cream became some of the most recognisable sneakers of the decade — each release causing site crashes and immediate resale premiums.",
    "Following Adidas' termination of the Yeezy partnership in late 2022, the brand sold off remaining Yeezy inventory in 2023 — flooding the market and significantly normalising resale prices.",
  ],
  designIntro: "The Yeezy Boost 350 V2 features a seamless Primeknit upper with a distinctive lateral stripe, Adidas Boost midsole visible at the heel, and a sculpted one-piece sole unit.",
  designBullets: ["Primeknit upper — seamless stretch-knit construction", "Semi-transparent lateral stripe with 'SPLY-350' branding", "Full-length Adidas Boost midsole for maximum cushioning", "Sculpted one-piece rubber outsole", "Pull tab at heel for easy entry"],
  colorways: [
    { name: "Zebra (CP9654)", note: "White/Black Primeknit with red SPLY-350 — one of the most iconic colourways", market: "Strong resale premium on DS" },
    { name: "Bred (CP9652)", note: "Black Primeknit with red stripe — the OG dark colourway", market: "Moderate premium" },
    { name: "Beluga 2.0 (AH2203)", note: "Grey/orange heel flash — the most aesthetically beloved V2", market: "Moderate premium" },
    { name: "Cream/Triple White (CP9366)", note: "All-white/cream — the most wearable GR colourway", market: "Near retail after liquidation" },
  ],
  resaleParagraphs: ["Post-liquidation, the 350 V2 market has normalised dramatically — most GRs trade at or near retail.", "Zebra, Bred, and key early colourways retain demand from core collectors."],
  resaleHighlights: [{ label: "Best For", value: "Key colourway collecting" }, { label: "Risk Level", value: "Medium" }, { label: "Reseller Take", value: "Zebra/Bred only on DS pairs" }],
  resellerInsight: { flipScore: "45 / 100", liquidity: "High", typicalMargin: "Near zero on most GRs post-liquidation", bestUse: "Buy undervalued Zebra/Bred DS pairs only", bullets: ["Most 350 V2s are at or below retail — avoid bulk buying.", "Zebra DS pairs still attract premium from die-hard Yeezy collectors.", "High liquidity means easy to sell but margins have essentially evaporated."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Yeezy 350 V2 Live", description: "Use SneakPrice to compare 350 V2 colourway resale values instantly.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare Zebra vs Cream pricing", "Track Yeezy market post-liquidation", "Find undervalued DS pairs"] },
  careIntro: ["The 350 V2's Primeknit upper is delicate — avoid machine washing and harsh chemicals.", "The Boost midsole can yellow over time — UV exposure accelerates this."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Gently clean Primeknit without snagging fibres." }, { label: "Sneaker Cleaning Solution", desc: "Mild formula safe for Primeknit." }, { label: "Crep Protect Spray", desc: "Water and stain repellent for knit upper." }, { label: "Sole Sauce / Retrobrighting", desc: "To treat Boost yellowing on vintage pairs." }],
  carePrep: [{ step: "1", label: "Remove Insoles", desc: "Air out the footbed after each wear." }, { step: "2", label: "Dry Brush", desc: "Remove loose debris from Primeknit and sole." }],
  careCleaning: [{ step: "1", label: "Spot Clean Primeknit", desc: "Damp soft brush with diluted cleaner — circular motion." }, { step: "2", label: "Clean Stripe Panel", desc: "Careful cleaning around semi-transparent window." }, { step: "3", label: "Clean Sole", desc: "Stiff brush on rubber outsole." }, { step: "4", label: "Address Boost", desc: "Damp cloth on Boost — no harsh products." }, { step: "5", label: "Air Dry", desc: "Dry naturally away from UV light." }],
  relatedModels: [{ name: "Yeezy 500", href: "/encyclopedia/yeezy-500" }, { name: "Adidas Ultra Boost", href: "/encyclopedia/adidas-ultra-boost" }, { name: "Yeezy Slide", href: "/encyclopedia/yeezy-slide" }, { name: "Adidas EQT Support ADV", href: "/encyclopedia/eqt-support-adv" }],
},

{
  slug: "yeezy-500",
  name: "Yeezy 500",
  tagline: "Kanye West's chunky desert boot for Adidas — the Yeezy 500 polarised sneaker culture when it dropped in 2018 and went on to define the 'dad shoe' era alongside the Triple S and 700.",
  brand: "Adidas / Yeezy", firstRelease: "2018", designer: "Kanye West / Adidas Design", retailPrice: "$200", tier: 1,
  images: [
    { src: "/encyclopedia/yeezy-500/hero.jpg", alt: "Yeezy 500" },
    { src: "/encyclopedia/yeezy-500/angle-1.jpg", alt: "Yeezy 500 side" },
    { src: "/encyclopedia/yeezy-500/angle-2.jpg", alt: "Yeezy 500 angle" },
    { src: "/encyclopedia/yeezy-500/detail.jpg", alt: "Yeezy 500 detail" },
  ],
  marketSnapshot: { title: "Yeezy 500 Market Overview", demand: "Moderate Demand", avgResale: "$150–$300", trend: "Declining from 2021–22 peak", volatility: "Medium", liquidity: "Moderate", flipScore: "38 / 100", description: "The Yeezy 500 market normalised significantly post-Kanye controversy. Blush and Utility Black colourways retain some demand. Supply glut from Adidas' Yeezy liquidation suppressed prices." },
  history: [
    "Kanye West and Adidas debuted the Yeezy 500 in February 2018 during New York Fashion Week — a bulky, low-top silhouette that sharply divided opinion.",
    "The chunky, multi-panel suede and mesh upper was controversial from day one — but its sell-through proved the market's appetite for bold, anti-minimalist design.",
    "The Blush colourway — a muted beige-pink — became one of the most recognised Yeezy 500 releases and set the tone for the shoe's earthy palette identity.",
    "Following Adidas' termination of the Yeezy partnership in 2022, the brand liquidated Yeezy inventory — flooding the market with pairs that significantly depressed resale values.",
  ],
  designIntro: "The Yeezy 500 features a suede, leather, and mesh upper across multiple panels, adiPrene cushioning, a thick rubber outsole inspired by hiking boots, and a distinctive dad-shoe silhouette.",
  designBullets: ["Multi-panel suede, leather, and mesh upper construction", "adiPrene foam cushioning in heel for impact absorption", "Thick rubber lug-pattern outsole for traction and bulk", "Low-top silhouette with sock-like interior fit", "Tonal colour-blocking across all panels"],
  colorways: [
    { name: "Blush", note: "The most iconic 500 colourway — muted beige-pink tones", market: "Above retail on DS pairs" },
    { name: "Utility Black", note: "All-black minimal colourway — strong resale performer", market: "Modest premium" },
    { name: "Bone White", note: "Clean, versatile off-white colourway", market: "Near retail" },
    { name: "Salt", note: "Grey-white colourway — popular with lifestyle buyers", market: "Near retail to modest premium" },
  ],
  resaleParagraphs: ["The Yeezy 500 resale market declined sharply after the Adidas-Kanye split and Yeezy stock liquidation.", "Blush and Utility Black retain the most demand — clean DS pairs command premiums."],
  resaleHighlights: [{ label: "Best For", value: "DS Blush / Utility Black flips" }, { label: "Risk Level", value: "Medium" }, { label: "Reseller Take", value: "Buy at right price, target key colourways" }],
  resellerInsight: { flipScore: "38 / 100", liquidity: "Moderate", typicalMargin: "Slim on most, decent on key colourways", bestUse: "Cherry-pick undervalued Blush or Black pairs", bullets: ["Blush DS pairs still command premiums from core Yeezy collectors.", "Avoid GR colourways — too much supply from liquidation.", "Buy below $120 on any 500 and you can likely break even or profit."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Yeezy 500 Pair Live", description: "Use SneakPrice to compare Yeezy 500 colourway resale pricing.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare Blush vs other 500 colourways", "Track Yeezy market post-liquidation", "Identify undervalued pairs"] },
  careIntro: ["The 500's multi-material upper — suede, leather, mesh — requires targeted cleaning per material.", "The thick rubber outsole is durable but attracts dirt in its lug pattern."],
  careTools: [{ label: "Suede Brush", desc: "For suede panels." }, { label: "Leather Cleaner", desc: "For leather panels." }, { label: "Soft-bristle Brush", desc: "For mesh areas." }, { label: "Toothbrush", desc: "For lug-pattern outsole." }],
  carePrep: [{ step: "1", label: "Identify Materials", desc: "Different panels need different cleaning." }, { step: "2", label: "Dry Brush All Panels", desc: "Remove loose dirt first." }],
  careCleaning: [{ step: "1", label: "Clean Suede Panels", desc: "Suede brush in one direction." }, { step: "2", label: "Clean Leather Panels", desc: "Leather cleaner applied with soft cloth." }, { step: "3", label: "Clean Mesh Areas", desc: "Diluted solution with soft brush." }, { step: "4", label: "Scrub Outsole", desc: "Toothbrush on lug pattern grooves." }, { step: "5", label: "Protect Suede", desc: "Suede protector spray when fully dry." }],
  relatedModels: [{ name: "Yeezy Boost 350 V2", href: "/encyclopedia/yeezy-boost-350-v2" }, { name: "Adidas Ultra Boost", href: "/encyclopedia/adidas-ultra-boost" }, { name: "New Balance 574", href: "/encyclopedia/new-balance-574" }, { name: "Adidas EQT Support ADV", href: "/encyclopedia/eqt-support-adv" }],
},

{
  slug: "yeezy-slide",
  name: "Yeezy Slide",
  tagline: "Kanye West's foam slide for Adidas — a single-piece EVA construction that generated massive hype in 2021 and brought the luxury slide concept to the sneaker resale market.",
  brand: "Adidas / Yeezy", firstRelease: "2021", designer: "Kanye West / Adidas Design", retailPrice: "$60–$70", tier: 2,
  images: [
    { src: "/encyclopedia/yeezy-slide/hero.jpg", alt: "Yeezy Slide" },
    { src: "/encyclopedia/yeezy-slide/angle-1.jpg", alt: "Yeezy Slide side" },
    { src: "/encyclopedia/yeezy-slide/angle-2.jpg", alt: "Yeezy Slide angle" },
    { src: "/encyclopedia/yeezy-slide/detail.jpg", alt: "Yeezy Slide detail" },
  ],
  marketSnapshot: { title: "Yeezy Slide Market Overview", demand: "Moderate Demand", avgResale: "$50–$120", trend: "Declining from 2021 peak", volatility: "Medium", liquidity: "High", flipScore: "30 / 100", description: "The Slide's resale market collapsed from early 2021 highs. Adidas Yeezy stock liquidation flooded the market — most colourways now trade near or below retail. High liquidity but thin margins." },
  history: [
    "Adidas and Yeezy introduced the Slide in early 2021 as a single-material foam slip-on — immediately hype-driven by Kanye's brand equity and the simplicity of the silhouette.",
    "At its peak, Yeezy Slides resold for 3x–5x retail — remarkable for a simple foam sandal — driven by scarcity and the Yeezy name.",
    "The slide concept proved popular enough to inspire competitors — most notably Nike's equivalent NOCTA and Jordan Franchise slide releases.",
    "Post-Kanye split and Adidas liquidation, the Slide market normalised sharply — most pairs now sell near or at the original $60–$70 retail price.",
  ],
  designIntro: "The Yeezy Slide is a one-piece injected EVA foam construction with a sculpted footbed, textured outsole, and a single wide strap — zero assembly, maximum minimalism.",
  designBullets: ["Single-piece injected EVA foam construction", "Sculpted contoured footbed for arch support", "Wide single strap with embossed texture", "Textured rubber-like outsole surface", "Available in muted, earthy Yeezy tonal colourways"],
  colorways: [
    { name: "Bone", note: "Off-white — the most recognisable and best-selling Slide colourway", market: "Near retail" },
    { name: "Onyx", note: "Dark grey / near-black — strong secondary colourway", market: "Near retail" },
    { name: "Pure", note: "Light grey — one of the original launch colourways", market: "Near retail" },
    { name: "Ochre / Enflame Orange", note: "Warm-tone colourways with more limited supply", market: "Modest premium on select sizes" },
  ],
  resaleParagraphs: ["The Slide resale market deflated significantly after Adidas' Yeezy inventory dump.", "Bone and Onyx have the most liquidity but margins are essentially zero on most trades."],
  resaleHighlights: [{ label: "Best For", value: "Quick flips if bought under retail" }, { label: "Risk Level", value: "Medium" }, { label: "Reseller Take", value: "Buy deep under retail only" }],
  resellerInsight: { flipScore: "30 / 100", liquidity: "High", typicalMargin: "Near zero unless bought well under retail", bestUse: "Only flip if acquired at significant discount", bullets: ["High liquidity makes them easy to sell — but margins are nearly gone.", "Bone and Onyx are the most in-demand colourways.", "Only buy below $35 to have any realistic profit margin."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Yeezy Slide Pair Live", description: "Use SneakPrice to compare Yeezy Slide colourway pricing.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare colourway demand", "Find pairs priced below market", "Track Yeezy Slide pricing trends"] },
  careIntro: ["The Yeezy Slide's EVA foam is easy to clean but can yellow over time with UV exposure.", "Store away from direct sunlight to preserve the white/off-white colourways."],
  careTools: [{ label: "Soft Cloth", desc: "Wipe down the foam surface." }, { label: "Mild Soap", desc: "Diluted for cleaning the footbed." }, { label: "Toothbrush", desc: "For textured outsole grooves." }, { label: "Shoe Bags", desc: "Store in bags away from UV light." }],
  carePrep: [{ step: "1", label: "Rinse", desc: "Rinse with cool water to remove surface dirt." }, { step: "2", label: "Inspect", desc: "Check for any yellowing or staining." }],
  careCleaning: [{ step: "1", label: "Clean Strap", desc: "Soft cloth with mild soap on the strap." }, { step: "2", label: "Clean Footbed", desc: "Toothbrush or cloth on the contoured footbed." }, { step: "3", label: "Scrub Outsole", desc: "Toothbrush on textured outsole." }, { step: "4", label: "Rinse & Dry", desc: "Rinse with clean water and air dry." }],
  relatedModels: [{ name: "Yeezy Boost 350 V2", href: "/encyclopedia/yeezy-boost-350-v2" }, { name: "Yeezy 500", href: "/encyclopedia/yeezy-500" }, { name: "Adidas Ultra Boost", href: "/encyclopedia/adidas-ultra-boost" }, { name: "Nike React Infinity Run", href: "/encyclopedia/nike-react-infinity-run" }],
},

{
  slug: "vans-era",
  name: "Vans Era",
  tagline: "Co-designed by Tony Alva and Stacy Peralta in 1976 — the Vans Era was the first pro skater-designed sneaker and remains one of the most versatile and enduring low-tops in skate and lifestyle culture.",
  brand: "Vans", firstRelease: "1976", designer: "Tony Alva / Stacy Peralta", retailPrice: "$65–$70", tier: 2,
  images: [
    { src: "/encyclopedia/vans-era/hero.jpg", alt: "Vans Era" },
    { src: "/encyclopedia/vans-era/angle-1.jpg", alt: "Vans Era side" },
    { src: "/encyclopedia/vans-era/angle-2.jpg", alt: "Vans Era angle" },
    { src: "/encyclopedia/vans-era/detail.jpg", alt: "Vans Era detail" },
  ],
  marketSnapshot: { title: "Vans Era Market Overview", demand: "Strong Demand", avgResale: "$50–$150", trend: "Stable", volatility: "Low", liquidity: "Moderate", flipScore: "22 / 100", description: "The Vans Era is a mass-market lifestyle shoe with minimal resale upside. Widely available globally — primarily a wear shoe with some niche collab potential." },
  history: [
    "Pro skaters Tony Alva and Stacy Peralta approached Vans in 1976 requesting a shoe with extra padding in the sole — Vans delivered the Style 95, later known as the Era.",
    "The Era became the first pro skater-designed shoe — a significant milestone in the history of skateboarding and athletic footwear collaboration.",
    "Its lower profile and extra padding distinguished it from the Authentic, making it a preferred choice for both skating performance and casual wear.",
    "The Era has appeared in countless colorways, patterns, and special editions — Vans' most customizable core silhouette.",
  ],
  designIntro: "The Vans Era features a canvas upper with padded lining for extra cushion, vulcanized waffle outsole, jazz stripe on the lateral panel, and a lower profile than the Old Skool.",
  designBullets: ["Canvas upper with padded lining for comfort", "Vulcanized waffle rubber outsole for board feel", "Jazz stripe on lateral side", "Low-cut profile for unrestricted ankle movement", "Available in endless colorways and custom options"],
  colorways: [
    { name: "Black / True White", note: "The most classic Era colorway — clean and versatile", market: "Retail" },
    { name: "Checkerboard", note: "The iconic Vans checkerboard print — synonymous with skateboarding culture", market: "Near retail" },
    { name: "Tie-dye / Limited Prints", note: "Seasonal special prints and collabs with brands and artists", market: "Near retail to modest premium" },
  ],
  resaleParagraphs: ["The Vans Era has no meaningful resale market on standard colorways — a wear shoe available everywhere.", "Limited prints and collabs generate small premiums."],
  resaleHighlights: [{ label: "Best For", value: "Personal wear" }, { label: "Risk Level", value: "Very Low" }, { label: "Reseller Take", value: "Not a resale target" }],
  resellerInsight: { flipScore: "22 / 100", liquidity: "Moderate", typicalMargin: "None", bestUse: "Personal wear", bullets: ["No resale market on GRs.", "Not worth targeting for flipping.", "Buy for wear — it's one of the most comfortable everyday low-tops available."] },
  cta: { eyebrow: "Live Market Tool", title: "Scan Any Vans Era Pair Live", description: "Use SneakPrice to compare current Era pricing.", primaryHref: "/exchange", primaryLabel: "Scan it with SneakPrice →", secondaryHref: "/discover", secondaryLabel: "Open market tools", bullets: ["Compare across retailers", "Find limited print availability", "Check current pricing"] },
  careIntro: ["The Era's canvas upper is easy to clean — regular maintenance keeps it looking fresh.", "The vulcanized sole is durable but the white foxing can yellow."],
  careTools: [{ label: "Soft-bristle Brush", desc: "Cleans canvas panels." }, { label: "Sneaker Cleaning Solution", desc: "Diluted formula for canvas." }, { label: "Magic Eraser", desc: "Restores white foxing tape." }, { label: "Microfiber Cloth", desc: "Wipe and dry." }],
  carePrep: [{ step: "1", label: "Remove Laces", desc: "Access all upper panels." }, { step: "2", label: "Dry Brush", desc: "Remove loose dirt first." }],
  careCleaning: [{ step: "1", label: "Clean Canvas", desc: "Apply diluted solution with soft brush." }, { step: "2", label: "Restore Foxing", desc: "Magic Eraser on white foxing tape." }, { step: "3", label: "Wipe Sole", desc: "Damp cloth on the vulcanized outsole." }, { step: "4", label: "Air Dry", desc: "Dry naturally." }],
  relatedModels: [{ name: "Vans Old Skool", href: "/encyclopedia/vans-old-skool" }, { name: "Vans Sk8-Hi", href: "/encyclopedia/vans-sk8-hi" }, { name: "Converse Chuck Taylor All Star", href: "/encyclopedia/chuck-taylor-all-star" }, { name: "Converse One Star", href: "/encyclopedia/converse-one-star" }],
},
];
