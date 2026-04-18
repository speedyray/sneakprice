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