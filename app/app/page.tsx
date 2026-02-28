"use client";

import imageCompression from "browser-image-compression";



import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const detectBrand = (name: string) => {
  const lower = name.toLowerCase();

  // 🔥 Air Jordan (check FIRST so it doesn't get caught as Nike)
  if (lower.includes("air jordan") || lower.includes("jordan 1") || lower.includes("jordan 4") || lower.includes("jordan")) {
    return "jordan";
  }

  if (lower.includes("yeezy") || lower.includes("adidas")) {
    return "adidas";
  }

  if (lower.includes("nike")) {
    return "nike";
  }

  return null;
};


const brandLogos: Record<string, string> = {
  adidas: "/adidas.svg",
  nike: "/nike.svg",
  jordan: "/jordan.svg",
};


export default function AppPage() {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastScanTime, setLastScanTime] = useState<number | null>(null);

 
  const handleFile = (file: File) => {
  setImage(file);
  setPreview(URL.createObjectURL(file));
  setResults(null);
  setError(null);
  setQuery(""); // clear previous detected name
};


  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const takePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0);

      stream.getTracks().forEach((t) => t.stop());

      canvas.toBlob((blob) => {
        if (blob) {
          handleFile(new File([blob], "photo.jpg", { type: "image/jpeg" }));
        }
      }, "image/jpeg");
    } catch (err) {
      console.error("Camera error:", err);
      setError("Camera access denied or unavailable.");
    }
  };
  

  const handleAnalyze = async () => {
    const now = Date.now();

if (lastScanTime && now - lastScanTime < 3000) {
  setError("Please wait a few seconds before scanning again.");
  return;
}

  if (!query && !image) {
    setError("Upload a photo or type a sneaker name.");
    return;
  }

  if (loading) return;

  setLoading(true);
  setResults(null);
  setError(null);

  try {
    let searchQuery = query;

    if (image) {
      const compressedImage = await imageCompression(image, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("image", compressedImage);

      const scanRes = await fetch("/api/scan-photo", {
        method: "POST",
        body: formData,
      });

      const scanData = await scanRes.json();

      const sneakerName = scanData.sneakerName?.trim();

      if (
        !sneakerName ||
        sneakerName.length < 5 ||
        sneakerName.toLowerCase().includes("don't know") ||
        sneakerName.toLowerCase().includes("not sure") ||
        sneakerName.toLowerCase().includes("cannot") ||
        sneakerName.toLowerCase().includes("no sneaker")
      ) {
        setError("This doesn't appear to be a sneaker. Please upload a clear sneaker photo.");
        setLoading(false);
        return;
      }

      searchQuery = sneakerName;
      setQuery(searchQuery);
    } // ✅ THIS CLOSING BRACE IS IMPORTANT

    // 🔎 Call eBay API
    const ebayRes = await fetch("/api/ebay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: searchQuery }),
    });

    const ebayData = await ebayRes.json();
    setResults(ebayData);

  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  }

  setLoading(false);
  setLastScanTime(now);

};


  const activeMedian = results?.activeMarket?.medianPrice;
 const soldMedian = results?.soldMarket?.overallMedian;

 const chartData =
  typeof activeMedian === "number" &&
  typeof soldMedian === "number"
    ? [
        { name: "Active Median", price: activeMedian },
        { name: "Sold Median", price: soldMedian },
      ]
    : [];


let priceGap: number | null = null;
let gapPercent: number | null = null;

if (
  typeof activeMedian === "number" &&
  typeof soldMedian === "number" &&
  soldMedian !== 0
) {
  priceGap = activeMedian - soldMedian;
  gapPercent = (priceGap / soldMedian) * 100;
}

const activeLowest = results?.activeMarket?.lowestPrice;

let arbitrageSpread: number | null = null;
let arbitragePercent: number | null = null;

if (
  typeof activeLowest === "number" &&
  typeof soldMedian === "number" &&
  activeLowest < soldMedian
) {
  arbitrageSpread = soldMedian - activeLowest;
  arbitragePercent = (arbitrageSpread / activeLowest) * 100;
}

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">

      <h1 className="text-3xl font-bold">
        SneakPrice Market Valuation
      </h1>

      {/* PHOTO SECTION */}
      <div className="flex gap-4">
        <label className="bg-black text-white px-5 py-3 rounded-xl cursor-pointer">
          Upload Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>

        <button
          onClick={takePhoto}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          Take Photo
        </button>
      </div>

      {/* IMAGE PREVIEW */}
      {preview && (
        <img
          src={preview}
          alt="Sneaker preview"
          className="w-full rounded-xl shadow-lg"
        />
      )}

      {/* SEARCH */}
      <div className="flex gap-3">

     {(() => {
  const brand = query ? detectBrand(query) : null;

  return (
    <div className="border px-4 py-3 rounded-xl w-full bg-gray-100 min-h-[52px] flex items-center justify-between">
      {loading ? (
        <span className="text-gray-500 animate-pulse">
          Detecting sneaker...
        </span>
      ) : query ? (
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-900">
            {query}
          </span>

          {brand && (
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border shadow-sm">
              <img
                src={brandLogos[brand]}
                alt={brand}
                className="h-4 w-auto"
              />
              <span className="text-sm font-medium capitalize">
                {brand}
              </span>
            </div>
          )}
        </div>
      ) : (
        <span className="text-gray-400">
          Sneaker name will appear after scanning
        </span>
      )}
    </div>
  );
})()}


        <button
  onClick={handleAnalyze}
  disabled={loading}
  className="bg-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? (
    <>
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Analyzing...
    </>
  ) : (
    "Scan Sneaker"
  )}
</button>

      </div>

      {/* ERROR */}
      {error && (
  <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2">
    <div className="text-red-500 font-bold">⚠</div>
    <div className="text-sm">{error}</div>
  </div>
  )}

      {/* ACTIVE MARKET */}
      {results?.activeMarket && (
        <div className="bg-gray-100 p-6 rounded-xl space-y-2">
  <h2 className="text-xl font-bold">Active Market</h2>

  <p>
    <strong>Median Price:</strong>{" "}
    ${results.activeMarket.medianPrice?.toFixed(2)}
  </p>

  <p>
    <strong>Average Price:</strong>{" "}
    ${results.activeMarket.averagePrice?.toFixed(2)}
  </p>

  <p>
    <strong>Lowest Price:</strong>{" "}
    ${results.activeMarket.lowestPrice?.toFixed(2)}
  </p>

  <p>
    <strong>Highest Price:</strong>{" "}
    ${results.activeMarket.highestPrice?.toFixed(2)}
  </p>

  <p>
    <strong>Total Listings:</strong>{" "}
    {results.activeMarket.totalListings}
  </p>

  <p>
    <strong>Market Status:</strong>{" "}
    {results.activeMarket.marketLabel}
  </p>

  {/* 🔥 PRICE GAP INDICATOR */}
 {priceGap !== null && gapPercent !== null && (
  <div className="mt-4 pt-4 border-t space-y-2">
    <p>
      <strong>Price Gap vs Sold:</strong>{" "}
      ${priceGap.toFixed(2)} (
      {gapPercent > 0 ? "+" : ""}
      {gapPercent.toFixed(1)}%)
    </p>

       {/* 💰 ARBITRAGE DETECTION */}
     {arbitrageSpread !== null && arbitragePercent !== null && (
     <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg space-y-1">
    <p className="font-semibold text-green-800">
      💰 Arbitrage Opportunity Detected
    </p>
    <p>
      Buy at ${activeLowest?.toFixed(2)} → Market Sold Median $
      {soldMedian?.toFixed(2)}
    </p>
    <p>
      Potential Spread: ${arbitrageSpread.toFixed(2)} (
      {arbitragePercent.toFixed(1)}%)
    </p>
  </div>
)}


    {/* 📊 DEMAND BADGE */}
    {/* 📊 PROFESSIONAL TRADING SIGNAL */}
<div>


  {/* STRONG OVERPRICED */}
  {gapPercent > 12 && (
    <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
      🔥 Strong Sell Signal
    </span>
  )}

  {/* MODERATE OVERPRICED */}
  {gapPercent > 5 && gapPercent <= 12 && (
    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
      ⚠ Moderate Overpricing
    </span>
  )}

  {/* MILD OVERPRICED */}
  {gapPercent > 3 && gapPercent <= 5 && (
    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
      Slightly Over Market
    </span>
  )}

  {/* NEUTRAL */}
  {gapPercent >= -3 && gapPercent <= 3 && (
    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
      ⚖ Neutral Market
    </span>
  )}

  {/* MILD UNDERVALUED */}
  {gapPercent < -3 && gapPercent >= -5 && (
    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
      Slightly Undervalued
    </span>
  )}

  {/* MODERATE UNDERVALUED */}
  {gapPercent < -5 && gapPercent >= -12 && (
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
      💎 Moderate Buy Signal
    </span>
  )}

  {/* STRONG UNDERVALUED */}
  {gapPercent < -12 && (
    <span className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-sm font-semibold">
      🚀 Strong Buy Signal
    </span>
  )}
 </div>
</div>
)}

</div>

      )}

      {/* SOLD MARKET */}
      {results?.soldMarket && (
        <div className="bg-gray-50 p-6 rounded-xl space-y-2">
          <h2 className="text-xl font-bold">Sold Market</h2>

          <p><strong>Overall Median:</strong> ${results.soldMarket.overallMedian?.toFixed(2)}</p>
          <p>
            <strong>New Median:</strong>{" "}
            {results.soldMarket.newMedian
              ? `$${results.soldMarket.newMedian.toFixed(2)}`
              : "N/A"}
          </p>
          <p>
            <strong>Used Median:</strong>{" "}
            {results.soldMarket.usedMedian
              ? `$${results.soldMarket.usedMedian.toFixed(2)}`
              : "N/A"}
          </p>
          <p><strong>Total Sold:</strong> {results.soldMarket.totalSold}</p>
        </div>
      )}

      {/* 📊 MARKET COMPARISON CHART */}
      
{chartData.length > 0 && (
  <div className="bg-white p-6 rounded-xl shadow space-y-4">
    <h2 className="text-xl font-bold">Market Comparison</h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, "auto"]} />
        <Tooltip
          formatter={(value: any) =>
            typeof value === "number"
              ? `$${value.toFixed(2)}`
              : value
          }
        />
        <Bar
          dataKey="price"
          fill="#3b82f6"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
   )}
</div>
  );
}
