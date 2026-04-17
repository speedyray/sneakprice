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