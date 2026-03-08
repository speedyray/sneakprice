"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import { useState, useEffect } from "react";





export default function Landing() {

  const [deals, setDeals] = useState<any[]>([]);
const [recentDeals, setRecentDeals] = useState<any[]>([]);
const [flash, setFlash] = useState(false);
  

useEffect(() => {

  const eventSource = new EventSource("/api/live-deals-stream");

  eventSource.onmessage = (event) => {
  const deal = JSON.parse(event.data);

  setDeals([deal]);

  setRecentDeals((prev) => [deal, ...prev].slice(0, 10));

  setFlash(true);
  setTimeout(() => setFlash(false), 800);
};

  eventSource.onerror = () => {
    eventSource.close();
  };

  return () => eventSource.close();

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
        Make Money from your <span className="text-green-500">Sneakers</span> <br />
      </h1>

      <h2 className="text-3xl font-extrabold mb-3 leading-tight">
        Instantly know their real market value using  <span className="text-green-300">verified resale data</span> <br />
        
      </  h2>

      

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
  <div className="animate-[scroll_20s_linear_infinite] inline-block">

    {[...recentDeals, ...recentDeals].map((d, i) => (
      <span key={i} className="mx-6 text-gray-300">
        🔥 {d.sneaker} +${d.profit.toFixed(0)}
      </span>
    ))}

  </div>
</div>



<div className="flex justify-center">

{deals.length > 0 && (

<div
  className={`bg-white text-black p-10 rounded-2xl shadow-2xl w-full max-w-3xl mx-auto transition-all duration-500
  ${flash ? "border-4 border-green-400 scale-105 shadow-green-500/40" : "border border-gray-200"}`}
>

<h3 className="font-bold text-lg mb-3">
{deals[0].sneaker}
</h3>

<p>
<strong>Buy Price:</strong> ${deals[0].buy_price.toFixed(2)}
</p>

<p>
<strong>Market Price:</strong> ${deals[0].market_price.toFixed(2)}
</p>

<p className="text-green-600 font-semibold">
Profit: +${deals[0].profit.toFixed(2)}
</p>

<p>
ROI: {deals[0].roi.toFixed(1)}%
</p>

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
