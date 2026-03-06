import Link from "next/link";
import Image from "next/image";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6 py-6">
      <div className="mb-6">
  <Image
    src="/sneakprice-logo.png"
    alt="SneakPrice"
    width={180}
    height={180}
    className="mx-auto"
  />
</div>


      {/* HERO */}
      <h1 className="text-6xl font-extrabold mb-6 leading-tight">
        Make Money from your <span className="text-green-500">Sneakers</span> <br />
      </h1>

      <h2 className="text-3xl font-extrabold mb-3 leading-tight">
        Instantly know their real market value using  <span className="text-green-300">verified resale data</span> <br />
        
      </h2>

      

      <p className="text-gray-400 text-lg max-w-2xl mb-10">
        Scan any sneaker and get real resale market value based on verified sold
        listings. No guessing. No hype. Just data.
      </p>

      {/* CTA BUTTONS */}
      <div className="flex gap-4">
        <Link
          href="/app"
          className="bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-xl font-semibold transition"
        >
          Scan My Sneakers
        </Link>

        <button className="border border-gray-600 px-8 py-4 rounded-xl hover:bg-gray-800 transition">
          Join Early Access
        </button>
      </div>

      <p className="text-gray-500 text-sm mt-6 mb-16">
        Free 3 scans per day • No credit card required
      </p>

      {/* PRODUCT PREVIEW CARD */}
      <div className="bg-white text-black p-6 rounded-xl shadow-xl max-w-md w-full text-left">

        <h3 className="font-bold text-lg mb-3">
          Air Jordan 4 Fire Red
        </h3>

        <div className="space-y-1 text-sm">
          <p>
            <strong>Active Median:</strong> $310
          </p>

          <p>
            <strong>Sold Median:</strong> $287
          </p>

          <p>
            <strong>Market Signal:</strong> Slightly Overpriced
          </p>

          <p className="text-green-600 font-semibold">
            Arbitrage Opportunity: +$23
          </p>
        </div>

      </div>

      {/* SOCIAL PROOF */}

<div className="mt-24 max-w-5xl w-full text-center">

  <h2 className="text-2xl font-semibold mb-10 text-gray-300">
    Sneaker market intelligence powered by real data
  </h2>

  <div className="grid md:grid-cols-3 gap-10">

    <div>
      <p className="text-4xl font-bold text-green-500">12,000+</p>
      <p className="text-gray-400 mt-2">Sneakers Analyzed</p>
    </div>

    <div>
      <p className="text-4xl font-bold text-green-500">$3.2M</p>
      <p className="text-gray-400 mt-2">Resale Value Calculated</p>
    </div>

    <div>
      <p className="text-4xl font-bold text-green-500">2,500+</p>
      <p className="text-gray-400 mt-2">Resellers Using SneakPrice</p>
    </div>

  </div>

</div>




      {/* HOW IT WORKS */}
<div className="mt-24 max-w-5xl w-full">

  <h2 className="text-3xl font-bold mb-12 text-center">
    How SneakPrice Works
  </h2>

  <div className="grid md:grid-cols-3 gap-10 text-center">

    {/* STEP 1 */}
    <div className="bg-gray-900 p-8 rounded-xl">
      <div className="text-4xl mb-4">📸</div>
      <h3 className="font-semibold text-lg mb-2">
        Upload or Take a Photo
      </h3>
      <p className="text-gray-400 text-sm">
        Snap a picture of any sneaker or upload a photo from your phone.
      </p>
    </div>

    {/* STEP 2 */}
    <div className="bg-gray-900 p-8 rounded-xl">
      <div className="text-4xl mb-4">🤖</div>
      <h3 className="font-semibold text-lg mb-2">
        AI Identifies the Sneaker
      </h3>
      <p className="text-gray-400 text-sm">
        Our AI detects the exact sneaker model instantly.
      </p>
    </div>

    {/* STEP 3 */}
    <div className="bg-gray-900 p-8 rounded-xl">
      <div className="text-4xl mb-4">💰</div>
      <h3 className="font-semibold text-lg mb-2">
        Get Real Market Value
      </h3>
      <p className="text-gray-400 text-sm">
        We analyze verified sold listings to calculate the real resale price.
      </p>
    </div>

  </div>

</div>

{/* SNEAKER RESELLER TIPS */}

<div className="mt-24 max-w-4xl w-full">

  <h2 className="text-3xl font-bold mb-10 text-center">
    Sneaker Reseller Tips
  </h2>

  <div className="space-y-6">

    {/* TIP 1 */}
    <div className="bg-gray-900 p-6 rounded-xl flex gap-4 items-start">
      <div className="text-2xl">💰</div>
      <div>
        <h3 className="font-semibold mb-1">
          Check Sold Listings
        </h3>
        <p className="text-gray-400 text-sm">
          Always compare active listings with sold listings. The real market
          value comes from what buyers actually paid.
        </p>
      </div>
    </div>

    {/* TIP 2 */}
    <div className="bg-gray-900 p-6 rounded-xl flex gap-4 items-start">
      <div className="text-2xl">📦</div>
      <div>
        <h3 className="font-semibold mb-1">
          Condition Matters
        </h3>
        <p className="text-gray-400 text-sm">
          Sneakers with original boxes and minimal wear can sell for 20–40%
          more than heavily used pairs.
        </p>
      </div>
    </div>

    {/* TIP 3 */}
    <div className="bg-gray-900 p-6 rounded-xl flex gap-4 items-start">
      <div className="text-2xl">📈</div>
      <div>
        <h3 className="font-semibold mb-1">
          Watch Market Trends
        </h3>
        <p className="text-gray-400 text-sm">
          Some sneakers spike in value after releases sell out. Monitoring
          demand trends can reveal profitable flips.
        </p>
      </div>
    </div>

    {/* LIVE MARKET INSIGHTS */}

<div className="mt-24 max-w-5xl w-full">

  <h2 className="text-3xl font-bold text-center mb-12">
    Live Sneaker Market Insights
  </h2>

  <div className="grid md:grid-cols-2 gap-8">

    {/* TRENDING */}
    <div className="bg-gray-900 p-8 rounded-xl">

      <h3 className="text-xl font-semibold mb-6">
        🔥 Trending Sneaker Scans
      </h3>

      <ul className="space-y-3 text-gray-300">

        <li className="flex justify-between">
          <span>Yeezy Boost 350 V2</span>
          <span className="text-green-400">High Demand</span>
        </li>

        <li className="flex justify-between">
          <span>Air Jordan 4</span>
          <span className="text-green-400">Trending</span>
        </li>

        <li className="flex justify-between">
          <span>Nike Dunk Low</span>
          <span className="text-yellow-400">Moderate</span>
        </li>

        <li className="flex justify-between">
          <span>New Balance 990</span>
          <span className="text-yellow-400">Growing</span>
        </li>

      </ul>

    </div>


    {/* ARBITRAGE */}
    <div className="bg-gray-900 p-8 rounded-xl">

      <h3 className="text-xl font-semibold mb-6">
        📈 Highest Arbitrage Opportunities
      </h3>

      <ul className="space-y-3 text-gray-300">

        <li className="flex justify-between">
          <span>Air Jordan 1 Chicago</span>
          <span className="text-green-400">+$64</span>
        </li>

        <li className="flex justify-between">
          <span>Yeezy 700 Wave Runner</span>
          <span className="text-green-400">+$48</span>
        </li>

        <li className="flex justify-between">
          <span>Nike Dunk Panda</span>
          <span className="text-green-400">+$32</span>
        </li>

        <li className="flex justify-between">
          <span>Jordan 4 Military Black</span>
          <span className="text-green-400">+$29</span>
        </li>

      </ul>

    </div>

  </div>

</div>


  </div>

</div>
{/* FOOTER */}

<footer className="mt-24 border-t border-gray-800 pt-10 pb-6 text-center text-gray-500 text-sm w-full max-w-5xl">

  <div className="flex justify-center gap-6 mb-4">

    <Link href="/privacy" className="hover:text-white transition">
      Privacy
    </Link>

    <Link href="/terms" className="hover:text-white transition">
      Terms
    </Link>

    <Link href="/contact" className="hover:text-white transition">
      Contact
    </Link>

  </div>

  <p>
    © {new Date().getFullYear()} SneakPrice — Sneaker Market Intelligence Platform. All rights reserved.
  </p>

</footer>



    </div>
  );
}
