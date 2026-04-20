import Link from "next/link";

export const metadata = {
  title: "Sneaker Encyclopedia A–Z | SneakPrice",
  description:
    "Browse every sneaker alphabetically. From Air Force 1 to Zoom Fly — a comprehensive A–Z reference of sneaker models, history, and market value.",
};

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Sneakers organised by first letter — expand each entry over time
const sneakersByLetter: Record<string, { name: string; slug: string }[]> = {
  A: [
    { name: "Air Force 1", slug: "air-force-1" },
    { name: "Air Jordan 1", slug: "air-jordan-1" },
    { name: "Air Max 90", slug: "air-max-90" },
    { name: "Air Max 95", slug: "air-max-95" },
    { name: "Air Max 97", slug: "air-max-97" },
    { name: "Adidas Superstar", slug: "adidas-superstar" },
    { name: "Adidas Stan Smith", slug: "adidas-stan-smith" },
    { name: "Asics Gel-Kayano", slug: "asics-gel-kayano" },
  ],
  B: [
    { name: "Blazer Mid", slug: "blazer-mid" },
    { name: "Brooks Ghost", slug: "brooks-ghost" },
    { name: "Bottega Veneta Speedster", slug: "bottega-veneta-speedster" },
  ],
  C: [
    { name: "Chuck Taylor All Star", slug: "chuck-taylor-all-star" },
    { name: "Nike Cortez", slug: "cortez" },
  ],
  D: [
    { name: "Nike Dunk Low", slug: "dunk-low" },
    { name: "Nike Dunk High", slug: "dunk-high" },
  ],
  E: [
    { name: "EQT Support ADV", slug: "eqt-support-adv" },
  ],
  F: [
    { name: "Fresh Foam 1080", slug: "fresh-foam-1080" },
    { name: "Flyknit Racer", slug: "flyknit-racer" },
    { name: "Forum Low", slug: "forum-low" },
  ],
  G: [
    { name: "Gel-Lyte III", slug: "gel-lyte-iii" },
    { name: "Gazelle", slug: "gazelle" },
  ],
  H: [
    { name: "Air Huarache", slug: "air-huarache" },
    { name: "Handball Spezial", slug: "handball-spezial" },
  ],
  I: [
    { name: "Instapump Fury", slug: "instapump-fury" },
  ],
  J: [
    { name: "Air Jordan 3", slug: "air-jordan-3" },
    { name: "Air Jordan 4", slug: "air-jordan-4" },
    { name: "Air Jordan 11", slug: "air-jordan-11" },
    { name: "Air Jordan 12", slug: "air-jordan-12" },
  ],
  K: [
    { name: "Gel-Kayano 30", slug: "gel-kayano-30" },
    { name: "Nike Kobe 6", slug: "nike-kobe-6" },
  ],
  L: [
    { name: "LeBron 21", slug: "lebron-21" },
  ],
  M: [
    { name: "New Balance M990v6", slug: "new-balance-m990v6" },
    { name: "New Balance 2002R", slug: "new-balance-2002r" },
    { name: "Nike Mayfly", slug: "nike-mayfly" },
  ],
  N: [
    { name: "New Balance 550", slug: "new-balance-550" },
    { name: "New Balance 574", slug: "new-balance-574" },
    { name: "New Balance 990v6", slug: "new-balance-990v6" },
  ],
  O: [
    { name: "Vans Old Skool", slug: "vans-old-skool" },
    { name: "Converse One Star", slug: "converse-one-star" },
  ],
  P: [
    { name: "Nike Pegasus 40", slug: "nike-pegasus-40" },
    { name: "Puma Suede Classic", slug: "puma-suede-classic" },
    { name: "Puma RS-X", slug: "puma-rs-x" },
  ],
  R: [
    { name: "Nike React Infinity Run", slug: "nike-react-infinity-run" },
    { name: "Reebok Classic Leather", slug: "reebok-classic-leather" },
    { name: "Reebok Club C", slug: "reebok-club-c" },
  ],
  S: [
    { name: "Adidas Samba", slug: "adidas-samba" },
    { name: "Nike SB Dunk Low", slug: "nike-sb-dunk-low" },
    { name: "Air Jordan Spizike", slug: "air-jordan-spizike" },
    { name: "Puma Speed Cat", slug: "puma-speed-cat" },
  ],
  T: [
    { name: "Timberland 6-Inch Boot", slug: "timberland-6-inch" },
    { name: "Adidas Terrex Free Hiker", slug: "adidas-terrex-free-hiker" },
  ],
  U: [
    { name: "Adidas Ultra Boost", slug: "adidas-ultra-boost" },
  ],
  V: [
    { name: "Vans Sk8-Hi", slug: "vans-sk8-hi" },
    { name: "Vans Era", slug: "vans-era" },
  ],
  W: [
    { name: "Nike Waffle Racer", slug: "nike-waffle-racer" },
    { name: "Mizuno Wave Rider", slug: "mizuno-wave-rider" },
  ],
  Y: [
    { name: "Yeezy Boost 350 V2", slug: "yeezy-boost-350-v2" },
    { name: "Yeezy 500", slug: "yeezy-500" },
    { name: "Yeezy Slide", slug: "yeezy-slide" },
  ],
  Z: [
    { name: "Nike Zoom Fly 5", slug: "nike-zoom-fly-5" },
    { name: "Nike Zoom Freak 5", slug: "nike-zoom-freak-5" },
    { name: "Adidas ZX 8000", slug: "adidas-zx-8000" },
  ],
};

export default function SneakerAZPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Sneaker Encyclopedia A–Z</h1>
          <p className="text-lg text-neutral-600">
            Navigate our comprehensive alphabetical index of over a thousand sneakers.
            From Air Force 1 to Zoom Fly — your source for sneaker identification,
            history, and market value. Perfect for collectors and resellers alike.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 border-y border-black/10 py-4">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold transition ${
                sneakersByLetter[letter]?.length
                  ? "bg-black text-white hover:bg-neutral-700"
                  : "bg-neutral-100 text-neutral-400 cursor-default pointer-events-none"
              }`}
            >
              {letter}
            </a>
          ))}
        </div>

        <div className="space-y-12">
          {letters.map((letter) => {
            const sneakers = sneakersByLetter[letter];
            if (!sneakers?.length) return null;

            return (
              <section key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                <h2 className="mb-4 border-b border-black/10 pb-2 text-2xl font-bold text-green-600">
                  {letter}
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {sneakers.map((sneaker) => (
                    <Link
                      key={sneaker.slug}
                      href={`/encyclopedia/${sneaker.slug}`}
                      className="rounded-lg border border-black/10 px-4 py-3 text-sm font-medium text-neutral-800 transition hover:border-green-500/50 hover:bg-green-50 hover:text-green-700"
                    >
                      {sneaker.name}
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="rounded-xl border border-green-500/30 bg-green-50 p-6">
          <h3 className="text-lg font-semibold text-green-700">
            Know your sneaker&apos;s real market value
          </h3>
          <p className="mt-1 text-sm text-neutral-700">
            Use SneakPrice to scan any sneaker and see live resale prices,
            arbitrage opportunities, and market trends instantly.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Scan a Sneaker →
          </Link>
        </div>
      </div>
    </div>
  );
}