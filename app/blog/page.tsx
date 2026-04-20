import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Sneaker Blog | SneakPrice",
  description:
    "Insights, guides, and market analysis for sneaker collectors and resellers. Stay ahead of the market with SneakPrice.",
};

const categories = ["All", "Reselling", "Market Analysis", "History", "Care & Storage", "How-To"];

const posts = [
  {
    slug: "how-to-flip-sneakers-for-profit",
    title: "How to Flip Sneakers for Profit in 2025: A Beginner's Complete Guide",
    excerpt:
      "From finding undervalued pairs to timing your sell — everything you need to know to start making real money in the sneaker resale market.",
    category: "Reselling",
    categoryColor: "bg-emerald-100 text-emerald-700",
    date: "Apr 18, 2025",
    readTime: "8 min read",
    image: "/encyclopedia/air-jordan-1/hero.jpg",
    imageAlt: "Air Jordan 1",
  },
  {
    slug: "air-jordan-1-history-and-market-value",
    title: "Air Jordan 1: The Full History and Why It Still Dominates the Resale Market",
    excerpt:
      "From Michael Jordan's 1985 NBA ban to a $560,000 auction record — the Air Jordan 1 is the most important sneaker ever made. Here's why.",
    category: "History",
    categoryColor: "bg-blue-100 text-blue-700",
    date: "Apr 15, 2025",
    readTime: "10 min read",
    image: "/encyclopedia/air-jordan-1/AIRJORDAN-1.jpeg",
    imageAlt: "Air Jordan 1",
  },
  {
    slug: "best-sneakers-to-resell-right-now",
    title: "The 10 Best Sneakers to Resell Right Now: April 2025 Market Report",
    excerpt:
      "SneakPrice data reveals which silhouettes are generating the highest ROI on the secondary market this month — and how to find them at the right price.",
    category: "Market Analysis",
    categoryColor: "bg-orange-100 text-orange-700",
    date: "Apr 12, 2025",
    readTime: "6 min read",
    image: "/encyclopedia/dunk-low/hero.jpg",
    imageAlt: "Nike Dunk Low",
  },
  {
    slug: "adidas-samba-rise-explained",
    title: "Why the Adidas Samba Became the Sneaker of the Decade",
    excerpt:
      "A football training shoe from 1950 is now the most hyped silhouette on the planet. We break down exactly how it happened — and whether the market still has legs.",
    category: "Market Analysis",
    categoryColor: "bg-orange-100 text-orange-700",
    date: "Apr 10, 2025",
    readTime: "7 min read",
    image: "/encyclopedia/adidas-samba/hero.jpg",
    imageAlt: "Adidas Samba",
  },
  {
    slug: "how-to-spot-fake-sneakers",
    title: "How to Spot Fake Sneakers: The Ultimate Authentication Guide",
    excerpt:
      "Legit check tips for the most faked silhouettes on the market — Air Jordan 1, Yeezy Boost 350 V2, Nike Dunk Low, and more. Know what to look for before you buy.",
    category: "How-To",
    categoryColor: "bg-purple-100 text-purple-700",
    date: "Apr 8, 2025",
    readTime: "9 min read",
    image: "/encyclopedia/yeezy-boost-350-v2/hero.jpg",
    imageAlt: "Yeezy Boost 350 V2",
  },
  {
    slug: "how-to-clean-sneakers-at-home",
    title: "How to Clean Any Sneaker at Home Without Ruining Them",
    excerpt:
      "A step-by-step guide for cleaning canvas, leather, suede, mesh, and knit uppers — with the exact tools you need and the mistakes to avoid.",
    category: "Care & Storage",
    categoryColor: "bg-cyan-100 text-cyan-700",
    date: "Apr 5, 2025",
    readTime: "5 min read",
    image: "/encyclopedia/air-force-1/hero.jpg",
    imageAlt: "Nike Air Force 1",
  },
  {
    slug: "new-balance-550-complete-guide",
    title: "New Balance 550: From Forgotten Archive to Cultural Phenomenon",
    excerpt:
      "Aimé Leon Dore found a shoe nobody remembered and turned it into one of the most coveted silhouettes of the 2020s. Here's the full story — and where the market stands today.",
    category: "History",
    categoryColor: "bg-blue-100 text-blue-700",
    date: "Apr 3, 2025",
    readTime: "7 min read",
    image: "/encyclopedia/new-balance-550/hero.jpg",
    imageAlt: "New Balance 550",
  },
  {
    slug: "sneaker-resale-tax-guide",
    title: "Sneaker Reselling and Taxes: What Every Flipper Needs to Know in 2025",
    excerpt:
      "The IRS is watching the secondary market more closely than ever. Here's what counts as taxable income, how to track your sales, and how to protect yourself.",
    category: "Reselling",
    categoryColor: "bg-emerald-100 text-emerald-700",
    date: "Apr 1, 2025",
    readTime: "8 min read",
    image: "/encyclopedia/nike-sb-dunk-low/hero.jpg",
    imageAlt: "Nike SB Dunk Low",
  },
  {
    slug: "yeezy-market-after-kanye",
    title: "The Yeezy Market Two Years After Adidas Ended the Partnership",
    excerpt:
      "Prices collapsed, inventory flooded the market, and collectors panicked. Two years on, we look at which Yeezy colourways survived — and which are worth buying today.",
    category: "Market Analysis",
    categoryColor: "bg-orange-100 text-orange-700",
    date: "Mar 28, 2025",
    readTime: "9 min read",
    image: "/encyclopedia/yeezy-500/hero.jpg",
    imageAlt: "Yeezy 500",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#e8e4c8" }}>

      {/* Hero header */}
      <div className="border-b border-black/10 bg-white px-6 py-16 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
          SneakPrice Editorial
        </p>
        <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-6xl">
          Insights for Sneaker Enthusiasts
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-600">
          Market analysis, reselling guides, sneaker history, and care tips — written for collectors and flippers alike.
        </p>

        {/* Category filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition ${
                cat === "All"
                  ? "bg-black text-white"
                  : "bg-black/5 text-black hover:bg-black/10"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Featured post */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link href={`/blog/${posts[0].slug}`} className="group block">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:shadow-md">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[16/9] md:aspect-auto">
                <Image
                  src={posts[0].image}
                  alt={posts[0].imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="mb-4 flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${posts[0].categoryColor}`}>
                    {posts[0].category}
                  </span>
                  <span className="text-sm text-neutral-400">Featured</span>
                </div>
                <h2 className="text-2xl font-bold leading-snug text-black transition group-hover:text-neutral-700 md:text-3xl">
                  {posts[0].title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  {posts[0].excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm text-neutral-400">
                  <span>{posts[0].date}</span>
                  <span>·</span>
                  <span>{posts[0].readTime}</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-black">
                  Read article
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Card grid */}
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-8 text-xl font-bold text-black">Latest Articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Card image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${post.categoryColor}`}>
                    {post.category}
                  </span>
                </div>
                <h3 className="flex-1 text-base font-bold leading-snug text-black transition group-hover:text-neutral-700">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-neutral-400">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming soon banner */}
        <div className="mt-16 rounded-2xl border border-black/10 bg-white p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
            More coming soon
          </p>
          <h3 className="mt-3 text-2xl font-bold text-black">
            New articles every week
          </h3>
          <p className="mx-auto mt-3 max-w-md text-neutral-600">
            We&apos;re building out the full editorial — resale guides, market deep-dives, authentication tips, and sneaker histories. Check back soon.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Scan a sneaker instead →
          </Link>
        </div>
      </div>
    </div>
  );
}
