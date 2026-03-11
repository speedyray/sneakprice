"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import { useState, useEffect } from "react";


const trendingTitles = [
  "🔥 Trending Sneaker Scans",
  "🔥 Most Scanned Sneakers",
  "🔥 Sneaker Demand Signals",
  "🔥 Hottest Sneakers Right Now",
  "🔥 Real-Time Sneaker Trends",
  "🔥 Sneaker Market Momentum"
];



const trendingSneakers = [
  { name: "Yeezy Boost 350 V2", demand: "High Demand" },
  { name: "Air Jordan 4", demand: "Trending" },
  { name: "Nike Dunk Low", demand: "Moderate" },
  { name: "New Balance 990", demand: "Growing" },
  { name: "Jordan 1 Chicago", demand: "Hot" },
  { name: "Jordan 4 Military Black", demand: "Trending" },
  { name: "Nike Dunk Panda", demand: "High Demand" },
  { name: "Yeezy 700 Wave Runner", demand: "Growing" },
  { name: "Nike Air Force 1 Low", demand: "Moderate" },
  { name: "Adidas Samba OG", demand: "Trending" },
  { name: "New Balance 550", demand: "Growing" },
  { name: "Jordan 3 White Cement", demand: "Hot" },
  { name: "Nike Dunk Low Grey Fog", demand: "Trending" },
  { name: "Adidas Campus 00s", demand: "Growing" },
  { name: "Jordan 1 Retro High OG", demand: "High Demand" }
];


const marketInsightTitles = [
  "Live Sneaker Market Insights",
  "Real-Time Sneaker Market Data",
  "Sneaker Market Intelligence",
  "Live Sneaker Demand Signals",
  "Sneaker Market Activity"
];

const arbitrageTitles = [
  "📈 Highest Arbitrage Opportunities",
  "💰 Top Sneaker Profit Spreads",
  "🔥 Sneaker Arbitrage Signals",
  "🚀 Best Sneaker Flip Opportunities",
  "📊 Reseller Profit Opportunities"
];



export default function Landing() {

const [deals, setDeals] = useState<any[]>([]);
const [recentDeals, setRecentDeals] = useState<any[]>([]);
const [flash, setFlash] = useState(false);
const [trending, setTrending] = useState(trendingSneakers.slice(0,4));
const [trendingTitle, setTrendingTitle] = useState(trendingTitles[0]);
const [marketTitle, setMarketTitle] = useState(marketInsightTitles[0]);
const [arbitrageTitle, setArbitrageTitle] = useState(arbitrageTitles[0])
  

useEffect(() => {

  let eventSource = new EventSource("/api/live-deals-stream");

  eventSource.onmessage = (event) => {

    const deal = JSON.parse(event.data);

    setDeals((prev) => {
      const updated = [deal, ...prev];
      return updated.slice(0, 10);
    });

    setRecentDeals((prev) => [deal, ...prev].slice(0, 20));

    setFlash(true);
    setTimeout(() => setFlash(false), 800);

  };

  eventSource.onerror = () => {

    eventSource.close();

    // reconnect after 2 seconds
    setTimeout(() => {
      eventSource = new EventSource("/api/live-deals-stream");
    }, 2000);

  };

  return () => eventSource.close();

}, []);



useEffect(() => {

  const interval = setInterval(() => {

    const shuffled = [...trendingSneakers].sort(() => 0.5 - Math.random());
    setTrending(shuffled.slice(0,4));

  }, 5000);

  return () => clearInterval(interval);

}, []);

useEffect(() => {

  const interval = setInterval(() => {

    const randomTitle =
      trendingTitles[Math.floor(Math.random() * trendingTitles.length)];

    setTrendingTitle(randomTitle);

  }, 4000);

  return () => clearInterval(interval);

}, []);


useEffect(() => {

  const interval = setInterval(() => {

    const newMarketTitle =
      marketInsightTitles[Math.floor(Math.random() * marketInsightTitles.length)];

    const newArbitrageTitle =
      arbitrageTitles[Math.floor(Math.random() * arbitrageTitles.length)];

    setMarketTitle(newMarketTitle);
    setArbitrageTitle(newArbitrageTitle);

  }, 6000);

  return () => clearInterval(interval);

}, []);



  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center text-center px-6 py-6">
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
      Know  your <span className="text-green-500">Sneakers</span> <br/>real market value <br />
      </h1>

      <h2 className="text-3xl font-extrabold mb-3 leading-tight">
        using <span className="text-green-300">verified resale data</span> <br />
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

     <p className="text-gray-500 text-sm mt-6 mb-10">
        Free 3 scans per day • No credit card required
      </p>

  
      
    {/* LIVE DEALS */}
<div className="mt-16 max-w-5xl w-full">


<h2 className="text-3xl font-bold text-center mb-2">
🔥 Live Sneaker Deals
</h2>

<p className="text-green-400 text-sm text-center mb-6">
● Live Market Feed
</p>

{/* LIVE DEAL TICKER */}
<div className="overflow-hidden whitespace-nowrap border-y border-gray-800 py-3 mb-10">
  <div className="animate-[scroll_35s_linear_infinite] inline-block">

    {[...recentDeals, ...recentDeals].map((d, i) => (
      <span key={i} className="mx-6 text-gray-300">
        🔥 {d.sneaker} +${d.profit.toFixed(0)}
      </span>
    ))}

  </div>
</div>



<div className="flex justify-center">

{deals.length > 0 && (
  <div className="bg-white text-black p-10 rounded-2xl w-full max-w-3xl mx-auto border-2 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.6)] overflow-hidden">
    <div className="h-[140px] overflow-hidden">
      <div className="animate-[scrollVertical_12s_linear_infinite] space-y-6">
        {[...deals, ...deals].map((deal, i) => (
          <div key={i} className="text-center">
            <h3 className="font-bold text-lg mb-2">{deal.sneaker}</h3>
            <p>
              <strong>Buy Price:</strong> ${deal.buy_price.toFixed(2)}
            </p>
            <p>
              <strong>Market Price:</strong> ${deal.market_price.toFixed(2)}
            </p>
            <p className="text-green-600 font-semibold">
              Profit: +${deal.profit.toFixed(2)}
            </p>
            <p>
              ROI: {deal.roi.toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}



</div>
</div>

{/* PRODUCT PREVIEW CARD */}







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

<h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
Sneaker Reseller Playbook
</h2>

<p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
Learn where to buy sneakers below market value and how resellers flip them
for profit using real resale market data.
</p>

  <div className="space-y-6">

 {/* BEST PLACES TO BUY */}

<div className="bg-gray-900 p-6 rounded-xl flex gap-4 items-start">
  <div className="text-2xl">🏬</div>

  <div>
    <h3 className="text-xl font-semibold text-white mb-6">
      Best Places to Buy Sneakers Cheap
    </h3>

    <p className="text-gray-400 text-sm mb-3">
      Successful resellers source sneakers below market value from outlets,
      local marketplaces, and clearance sales.
    </p>


    <ul className="text-gray-300 text-sm space-y-4 text-left">

<li>
<a href="https://www.nike.com/retail" target="_blank" className="hover:text-green-400 font-semibold text-green-400">
Nike Outlet Stores
</a>

</li>

<li>
<a href="https://www.adidas.com/us/storefinder" target="_blank" className="hover:text-green-400 font-semibold text-green-400">
Adidas Outlet Clearance
</a>

</li>

<li>
<a href="https://www.footlocker.com/" target="_blank" className="hover:text-green-400 font-semibold text-green-400">
Foot Locker Clearance Walls
</a>

</li>

<li>
<a href="https://www.amazon.com/" target="_blank" className="hover:text-green-400 font-semibold text-green-400">
Amazon Sneaker Deals
</a>

</li>

<li>
<a href="https://www.ebay.com/" target="_blank" className="hover:text-green-400 font-semibold text-green-400">
eBay Auctions Ending Soon
</a>

</li>

<li>
<a href="https://www.facebook.com/marketplace" target="_blank" className="hover:text-green-400 font-semibold text-green-400">
Facebook Marketplace
</a>

</li>

<li>
<a href="https://offerup.com/" target="_blank" className="hover:text-green-400 font-semibold text-green-400">
OfferUp Local Deals
</a>


</li>

<li>
<a href="https://www.mercari.com/" target="_blank" className="hover:text-green-400 font-semibold text-green-400">
Mercari Sneaker Listings
</a>

</li>

<li>
<a href="https://stockx.com/" target="_blank" className="hover:text-green-400 font-semibold text-green-400">
StockX Market Prices
</a>

</li>

<li>
<a href="https://www.goat.com/" target="_blank" className="hover:text-green-400 font-semibold text-green-400">
GOAT Sneaker Marketplace
</a>

</li>

<li>
<a href="https://www.grailed.com/" target="_blank" className="hover:text-green-400 font-semibold text-green-400">
Grailed Sneaker Listings
</a>

</li>

</ul>



  </div>
</div>










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



    <div className="mt-24 max-w-5xl w-full">

<h2 className="text-3xl font-bold text-center mb-8">
Sneaker Reselling Guide
</h2>

<p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
Learn how sneaker resellers find undervalued sneakers, buy them below market value,
and flip them for profit using real resale marketplace data. SneakPrice analyzes
sold listings and active market prices to help identify profitable sneaker
arbitrage opportunities.
</p>

<div className="space-y-8 text-gray-300">

<div>
<h3 className="text-lg font-semibold text-green-400">
Facebook Marketplace Sneaker Deals
</h3>

</div>

<div>
<h3 className="text-lg font-semibold text-green-400">
OfferUp Local Sneaker Deals
</h3>

</div>

<div>
<h3 className="text-lg font-semibold text-green-400">
Mercari Sneaker Listings
</h3>

</div>

<div>
<h3 className="text-lg font-semibold text-green-400">
StockX Market Pricing
</h3>

</div>

<div>
<h3 className="text-lg font-semibold text-green-400">
GOAT Sneaker Marketplace
</h3>

</div>

<div>
<h3 className="text-lg font-semibold text-green-400">
Grailed Sneaker Listings
</h3>

</div>

</div>

</div>



    {/* LIVE MARKET INSIGHTS */}

<div className="mt-24 max-w-5xl w-full">

<h2 className="text-3xl font-bold text-center mb-12  transition-all duration-700 ease-in-out">
  {marketTitle}
</h2>

  <div className="grid md:grid-cols-2 gap-8">

    {/* TRENDING */}
    <div className="bg-gray-900 p-8 rounded-xl">


  
      <h3 className="text-xl font-semibold mb-6 transition-all duration-700 ease-in-out">
       {trendingTitle}
      </h3>

<div className="overflow-hidden h-[120px]">
  <ul className="space-y-3 text-gray-300 animate-[scrollVertical_10s_linear_infinite]">

{trending.map((sneaker, i) => (

<li key={i} className="flex justify-between transition-all duration-500">

<span>{sneaker.name}</span>

<span className="text-green-400">
{sneaker.demand}
</span>

</li>

))}


</ul>

</div>


    </div>

{/* ARBITRAGE */}
<div className="bg-gray-900 p-8 rounded-xl">

<h3 className="text-xl font-semibold mb-6 transition-all duration-500">
  {arbitrageTitle}
</h3>

  <div className="overflow-hidden h-[120px]">

    <ul className="space-y-3 text-gray-300 animate-[scrollVertical_10s_linear_infinite]">

      {[...[
        { name: "Air Jordan 1 Chicago", profit: 64 },
        { name: "Yeezy 700 Wave Runner", profit: 48 },
        { name: "Nike Dunk Panda", profit: 32 },
        { name: "Jordan 4 Military Black", profit: 29 }
      ],
      ...[
        { name: "Air Jordan 1 Chicago", profit: 64 },
        { name: "Yeezy 700 Wave Runner", profit: 48 },
        { name: "Nike Dunk Panda", profit: 32 },
        { name: "Jordan 4 Military Black", profit: 29 }
      ]].map((item, i) => (

        <li key={i} className="flex justify-between">

          <span>{item.name}</span>

          <span className="text-green-400">
            +${item.profit}
          </span>

        </li>

      ))}

    </ul>

  </div>

</div>



  </div>

</div>


  </div>

</div>
{/* FOOTER */}

<footer className="mt-24 border-t border-gray-800 pt-12 pb-8 text-center text-gray-500 text-sm w-full max-w-5xl">

  {/* Logo */}
  <div className="flex justify-center mb-6">
    <Image
      src="/sneakprice-logo.png"
      alt="SneakPrice"
      width={60}
      height={60}
      className="opacity-90"
    />
  </div>

  {/* Links */}
  <div className="flex justify-center gap-6 mb-6 flex-wrap">

    <Link href="/about" className="hover:text-white transition">
      About
    </Link>

    <Link href="/faq" className="hover:text-white transition">
      FAQ
    </Link>

    <Link href="/press" className="hover:text-white transition">
      Press
    </Link>

    <span>•</span>

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

  {/* Social Links */}
<div className="flex justify-center gap-6 mb-6">

  <a
    href="https://twitter.com/sneakprice"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition"
  >
    <Twitter size={20} />
  </a>

  <a
    href="https://instagram.com/sneakprice"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition"
  >
    <Instagram size={20} />
  </a>

  <a
    href="https://youtube.com/@sneakprice"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition"
  >
    <Youtube size={20} />
  </a>
    <a
    href="https://facebook.com/sneakprice"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition transform hover:scale-110"
  >
    <Facebook size={22} />
  </a>

  {/* TikTok */}
  <a
    href="https://tiktok.com/@sneakprice"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition transform hover:scale-110"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M16.5 3c.3 1.7 1.7 3.1 3.5 3.3v3.2c-1.4 0-2.7-.4-3.8-1.1v6.3c0 3.5-2.8 6.3-6.3 6.3S3.6 18.2 3.6 14.7s2.8-6.3 6.3-6.3c.4 0 .8 0 1.2.1v3.3c-.4-.1-.8-.2-1.2-.2-1.7 0-3.1 1.4-3.1 3.1S8.2 18 9.9 18s3.1-1.4 3.1-3.1V3h3.5z"/>
    </svg>
  </a>

</div>


  {/* Copyright */}
  <p>
    © {new Date().getFullYear()} SneakPrice — Sneaker Market Intelligence Platform
  </p>

</footer>



</div>
  );
}
