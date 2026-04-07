"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Upload,
  Camera,
  Loader2,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Flame,
} from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { ArbitrageDealCard, type ArbDeal } from "@/components/ArbitrageDealCard";

const trendingTitles = [
  "🔥 Trending Sneaker Scans",
  "🔥 Most Scanned Sneakers",
  "🔥 Sneaker Demand Signals",
  "🔥 Hottest Sneakers Right Now",
  "🔥 Real-Time Sneaker Trends",
  "🔥 Sneaker Market Momentum",
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
  { name: "Jordan 1 Retro High OG", demand: "High Demand" },
];

const marketInsightTitles = [
  "Live Sneaker Market Insights",
  "Real-Time Sneaker Market Data",
  "Sneaker Market Intelligence",
  "Live Sneaker Demand Signals",
  "Sneaker Market Activity",
];

const arbitrageTitles = [
  "📈 Highest Arbitrage Opportunities",
  "💰 Top Sneaker Profit Spreads",
  "🔥 Sneaker Arbitrage Signals",
  "🚀 Best Sneaker Flip Opportunities",
  "📊 Reseller Profit Opportunities",
];

// Legacy type for backward compat with existing SSE handler
type LiveDeal = {
  sneaker: string;
  buy_price: number;
  market_price: number;
  profit: number;
  roi: number;
};

type ScanResponse = {
  sneakerName?: string;
  error?: string;
};

type EbayResponse = {
  activeMarket?: {
    medianPrice?: number;
    averagePrice?: number;
    lowestPrice?: number;
    highestPrice?: number;
    totalListings?: number;
    volatility?: number;
    marketLabel?: string;
  } | null;
  soldMarket?: {
    totalSold?: number;
    overallMedian?: number;
    newCount?: number;
    newMedian?: number | null;
    usedCount?: number;
    usedMedian?: number | null;
  } | null;
  deal?: {
    buyPrice?: number;
    marketPrice?: number;
    profit?: number;
    roi?: number;
  } | null;
};

function formatMoney(value?: number | null) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `$${value.toFixed(0)}`;
}

function getFlipScore(data: {
  soldMedian?: number;
  activeMedian?: number;
  lowestPrice?: number;
  dealProfit?: number;
  dealRoi?: number;
  volatility?: number;
}) {
  const {
    soldMedian = 0,
    activeMedian = 0,
    lowestPrice = 0,
    dealProfit = 0,
    dealRoi = 0,
    volatility = 0,
  } = data;

  let score = 35;

  if (dealRoi >= 40) score += 30;
  else if (dealRoi >= 25) score += 22;
  else if (dealRoi >= 15) score += 15;
  else if (dealRoi >= 8) score += 8;

  if (dealProfit >= 60) score += 15;
  else if (dealProfit >= 35) score += 10;
  else if (dealProfit >= 20) score += 6;

  if (soldMedian > 0 && lowestPrice > 0 && lowestPrice < soldMedian) {
    score += 10;
  }

  if (activeMedian > 0 && soldMedian > 0) {
    const gapPercent = ((activeMedian - soldMedian) / soldMedian) * 100;

    if (gapPercent < -8) score += 8;
    else if (gapPercent < -3) score += 5;
    else if (gapPercent > 12) score -= 8;
  }

  if (volatility < 0.2) score += 5;
  else if (volatility > 0.5) score -= 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export default function DiscoverPage() {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [deals, setDeals] = useState<LiveDeal[]>([]);

  const [arbDeals, setArbDeals] = useState<ArbDeal[]>([]);
  const [newDealCount, setNewDealCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"all" | "hot" | "good" | "watch">("all");
  const [scanQuery, setScanQuery] = useState("");
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isScanningModel, setIsScanningModel] = useState(false);
  const [scanModalError, setScanModalError] = useState("");
  const [scansRemaining, setScansRemaining] = useState<number | null>(null);
  const [recentDeals, setRecentDeals] = useState<LiveDeal[]>([]);
  const [trending, setTrending] = useState(trendingSneakers.slice(0, 4));
  const [trendingTitle, setTrendingTitle] = useState(trendingTitles[0]);
  const [marketTitle, setMarketTitle] = useState(marketInsightTitles[0]);
  const [arbitrageTitle, setArbitrageTitle] = useState(arbitrageTitles[0]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanError, setScanError] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const [identifiedSneaker, setIdentifiedSneaker] = useState("");
  const [marketData, setMarketData] = useState<EbayResponse | null>(null);

  useEffect(() => {
    let eventSource = new EventSource("/api/live-deals-stream");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Skip status-only messages
      if (data._status) return;

      // New schema deal (has dealScore field)
      if (data.dealScore !== undefined) {
        const deal = data as ArbDeal;
        setArbDeals((prev) => {
          const exists = prev.some((d) => d.id === deal.id);
          if (exists) return prev.map((d) => (d.id === deal.id ? deal : d));
          setNewDealCount((c) => c + 1);
          return [deal, ...prev].slice(0, 50);
        });
        return;
      }

      // Legacy schema (random deals) — keep for backward compat
      const deal = data as LiveDeal;
      setDeals((prev) => [deal, ...prev].slice(0, 10));
      setRecentDeals((prev) => [deal, ...prev].slice(0, 20));
    };

    eventSource.onerror = () => {
      eventSource.close();
      setTimeout(() => {
        eventSource = new EventSource("/api/live-deals-stream");
      }, 2000);
    };

    return () => eventSource.close();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...trendingSneakers].sort(() => 0.5 - Math.random());
      setTrending(shuffled.slice(0, 4));
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




  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);






  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const derived = useMemo(() => {
    const soldMedian = marketData?.soldMarket?.overallMedian;
    const activeMedian =
      marketData?.activeMarket?.medianPrice ?? marketData?.activeMarket?.averagePrice;
    const lowestPrice = marketData?.activeMarket?.lowestPrice;
    const highestPrice = marketData?.activeMarket?.highestPrice;
    const volatility = marketData?.activeMarket?.volatility;
    const marketLabel = marketData?.activeMarket?.marketLabel;
    const dealProfit = marketData?.deal?.profit;
    const dealRoi = marketData?.deal?.roi;

    const fallbackProfit =
      typeof soldMedian === "number" && typeof lowestPrice === "number"
        ? soldMedian - lowestPrice
        : undefined;

    const fallbackRoi =
      typeof fallbackProfit === "number" &&
      typeof lowestPrice === "number" &&
      lowestPrice > 0
        ? (fallbackProfit / lowestPrice) * 100
        : undefined;

    const profit = dealProfit ?? fallbackProfit;
    const roi = dealRoi ?? fallbackRoi;

    const flipScore = getFlipScore({
      soldMedian,
      activeMedian,
      lowestPrice,
      dealProfit: profit,
      dealRoi: roi,
      volatility,
    });

    return {
      soldMedian,
      activeMedian,
      lowestPrice,
      highestPrice,
      volatility,
      marketLabel,
      profit,
      roi,
      flipScore,
    };
  }, [marketData]);

  async function handleAnalyze() {
    if (!selectedFile) {
      setScanError("Please upload a sneaker photo first.");
      return;
    }

    setIsAnalyzing(true);
    setScanError("");
    setIdentifiedSneaker("");
    setMarketData(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const scanRes = await fetch("/api/scan-photo", {
        method: "POST",
        body: formData,
      });

      const scanJson = (await scanRes.json()) as ScanResponse;

      if (!scanRes.ok) {
        throw new Error(scanJson.error || "Sneaker scan failed.");
      }

      if (!scanJson.sneakerName) {
        throw new Error("No sneaker name returned from scan.");
      }

      setIdentifiedSneaker(scanJson.sneakerName);

      const ebayRes = await fetch("/api/ebay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: scanJson.sneakerName,
        }),
      });

      const ebayJson = (await ebayRes.json()) as EbayResponse;

      if (!ebayRes.ok) {
        throw new Error("Market valuation failed.");
      }

      setMarketData(ebayJson);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setScanError(message);
    } finally {
      setIsAnalyzing(false);
    }
  }




  async function startCamera() {
    try {
      setCameraError("");
  
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
  
      streamRef.current = stream;
      setCameraOpen(true);
  
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 0);
    } catch (error) {
      console.error(error);
      setCameraError("Unable to access camera.");
    }
  }
  
  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  
    setCameraOpen(false);
  }
  
  function capturePhoto() {
    const video = videoRef.current;
    if (!video) return;
  
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
  
        const file = new File([blob], "camera-scan.jpg", {
          type: "image/jpeg",
        });
  
        setSelectedFile(file);
        setScanError("");
        stopCamera();
      },
      "image/jpeg",
      0.9
    );
  }









  async function handleScanModel(e: React.FormEvent) {
    e.preventDefault();
    if (!scanQuery.trim()) return;

    setIsScanningModel(true);
    setScanModalError("");

    try {
      const ebayRes = await fetch("/api/ebay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: scanQuery }),
      });

      if (ebayRes.status === 401) {
        setScanModalError("unauthenticated");
        return;
      }

      if (ebayRes.status === 403) {
        setScanModalError("limit_reached");
        return;
      }

      const ebayData = await ebayRes.json();

      if (ebayData.deal) {
        if (ebayData.remaining !== undefined) {
          setScansRemaining(ebayData.remaining);
        }
        const newDeal: ArbDeal = {
          id: `scan-${Date.now()}`,
          sneaker: scanQuery,
          buyPlatform: "ebay",
          buyPrice: ebayData.deal.buyPrice,
          buyUrl: ebayData.deal.cheapestItemId
            ? `https://www.ebay.com/itm/${ebayData.deal.cheapestItemId}`
            : `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(scanQuery)}`,
          sellPlatform: "ebay",
          sellPrice: ebayData.deal.marketPrice,
          sellUrl: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(scanQuery)}`,
          netProfit: ebayData.deal.profit,
          profitMargin: ebayData.deal.roi,
          dealLabel:
            ebayData.deal.roi >= 30
              ? "hot"
              : ebayData.deal.roi >= 15
              ? "good"
              : "watch",
          created_at: new Date().toISOString(),
        };
        setArbDeals((prev) => [newDeal, ...prev].slice(0, 50));
        setIsScanModalOpen(false);
      } else {
        setScanModalError(
          "No arbitrage opportunity found for this model right now."
        );
      }
    } catch {
      setScanModalError("Scan failed. Please try again.");
    } finally {
      setIsScanningModel(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-6 py-6 text-center text-black">
      <div className="mb-6">
        <Image
          src="/sneakprice-logo.png"
          alt="SneakPrice"
          width={180}
          height={180}
          className="mx-auto"
        />
      </div>

      <h1 className="text-6xl font-extrabold mb-6 leading-tight">
        Know your <span className="text-black">Sneakers</span> <br />
        real market value <br />
      </h1>

      <h2 className="text-3xl font-extrabold mb-3 leading-tight">
        using <span className="text-black">verified resale data</span> <br />
      </h2>

      <p className="mb-10 max-w-2xl text-lg text-neutral-600">
        Scan any sneaker and get real resale market value based on verified sold
        listings. No guessing. No hype. Just data.
      </p>

      <div className="flex gap-4">
        <a
          href="#scan-tool"
          className="bg-[#24262b] hover:bg-black text-white px-8 py-4 rounded-xl font-semibold transition"
        >
          Scan My Sneakers
        </a>

        {user ? (
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-black/20 bg-white px-8 py-4 font-semibold text-black transition hover:border-black/35"
          >
            Go to Marketplace
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full border border-black/20 bg-white px-8 py-4 font-semibold text-black transition hover:border-black/35"
          >
            Login or Sign Up
          </Link>
        )}
      </div>

      <p className="mt-6 mb-10 text-sm text-neutral-500">
        Free 3 scans per day • No credit card required
      </p>

      <div className="flex justify-center mb-8">
        <Image
          src="/jordan-yellow.png"
          alt="SneakPrice"
          width={160}
          height={160}
          className="opacity-90"
        />
      </div>

      <section
        id="scan-tool"
        className="w-full max-w-6xl rounded-3xl border border-black/10 bg-gradient-to-b from-white to-neutral-50 p-6 shadow-[0_15px_35px_rgba(0,0,0,0.05)] md:p-8"
      >
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            4-step scan workflow
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Scan → Value → Profit → Flip Score
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
            Upload a sneaker photo and get a live market read on its resale potential.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-black/10 bg-white p-6 text-left">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-full bg-black p-2 text-white">
                <Upload size={18} />
              </div>
              <div>
                <h3 className="font-semibold">Step 1 — Upload sneaker photo</h3>
                <p className="text-sm text-neutral-500">
                  Use a clear image for best identification.
                </p>
              </div>
            </div>

            <label className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/15 bg-neutral-50 p-6 transition hover:border-black/30 hover:bg-neutral-100">
              {previewUrl ? (
                <div className="flex w-full flex-col items-center">
                  <Image
                    src={previewUrl}
                    alt="Sneaker preview"
                    width={280}
                    height={220}
                    className="max-h-[220px] w-auto rounded-xl object-contain"
                    unoptimized
                  />
                  <p className="mt-4 text-sm text-neutral-500">
                    {selectedFile?.name}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-4 rounded-full bg-white p-4 shadow-sm">
                    <Camera size={28} />
                  </div>
                  <p className="font-medium">Click to upload sneaker photo</p>
                  <p className="mt-2 text-sm text-neutral-500">
                    We’ll identify the sneaker and calculate live market value.
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setSelectedFile(file);
                  setScanError("");
                }}
              />
            </label>

<div className="mt-5 flex flex-wrap gap-3">
  <button
    type="button"
    onClick={handleAnalyze}
    disabled={!selectedFile || isAnalyzing}
    className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {isAnalyzing ? (
      <>
        <Loader2 size={18} className="mr-2 animate-spin" />
        Analyzing...
      </>
    ) : (
      "Analyze Sneaker"
    )}
  </button>

  <button
    type="button"
    onClick={startCamera}
    className="rounded-xl border border-black/15 bg-white px-6 py-3 font-semibold text-black transition hover:border-black/30"
  >
    Use Camera
  </button>

  <button
    type="button"
    onClick={() => {
      setSelectedFile(null);
      setPreviewUrl("");
      setIdentifiedSneaker("");
      setMarketData(null);
      setScanError("");
      stopCamera();
    }}
    className="rounded-xl border border-black/15 bg-white px-6 py-3 font-semibold text-black transition hover:border-black/30"
  >
    Reset
  </button>
</div>


{cameraOpen && (
  <div className="mt-5 rounded-2xl border border-black/10 bg-neutral-50 p-4">
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="w-full rounded-xl"
    />

    <div className="mt-4 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={capturePhoto}
        className="rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-neutral-800"
      >
        Capture Photo
      </button>

      <button
        type="button"
        onClick={stopCamera}
        className="rounded-xl border border-black/15 bg-white px-5 py-3 font-semibold text-black transition hover:border-black/30"
      >
        Cancel Camera
      </button>
    </div>
  </div>
)}

{cameraError ? (
  <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
    {cameraError}
  </p>
) : null}
















            {scanError ? (
              <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {scanError}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4">
            <StepCard
              step="Step 2"
              title="AI identifies the sneaker"
              icon={<CheckCircle2 size={18} />}
              value={identifiedSneaker || "Waiting for scan"}
              helper="Detected sneaker model appears here after analysis."
            />

            <StepCard
              step="Step 3"
              title="Market value"
              icon={<DollarSign size={18} />}
              value={formatMoney(derived.soldMedian)}
              helper={
                derived.activeMedian
                  ? `Active market median: ${formatMoney(derived.activeMedian)}`
                  : "Sold and active market pricing will appear here."
              }
            />

            <StepCard
              step="Step 4"
              title="Profit opportunity"
              icon={<TrendingUp size={18} />}
              value={
                typeof derived.profit === "number"
                  ? `+$${derived.profit.toFixed(0)}`
                  : "—"
              }
              helper={
                typeof derived.roi === "number"
                  ? `Estimated ROI: ${derived.roi.toFixed(1)}%`
                  : "Spread versus current listings will appear here."
              }
            />

            <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-left">
              <div className="mb-3 flex items-center gap-2 text-green-800">
                <Flame size={18} />
                <span className="font-semibold">Flip Score</span>
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-4xl font-extrabold text-green-900">
                    {derived.flipScore}
                    <span className="text-xl font-semibold">/100</span>
                  </p>
                  <p className="mt-2 text-sm text-green-800">
                    Higher score means stronger resale edge and flip potential.
                  </p>
                </div>

                <div className="min-w-[120px] rounded-xl bg-white px-4 py-3 text-center shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-neutral-500">
                    Signal
                  </p>
                  <p className="mt-1 font-semibold text-black">
                    {derived.flipScore >= 80
                      ? "Strong Flip"
                      : derived.flipScore >= 60
                      ? "Watchlist"
                      : derived.flipScore >= 40
                      ? "Moderate"
                      : "Low Edge"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
  onClick={async () => {
    await fetch("/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: identifiedSneaker,
        marketPrice: derived.soldMedian,
        brand: identifiedSneaker.split(" ")[0] || null,
        source: "discover",
        status: "unlisted",
      }),
    });
  }}
  className="mt-4 rounded-xl bg-black px-6 py-3 text-white"
>
  Add to Inventory
</button>

        {(identifiedSneaker || marketData) && (
          
          <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 text-left">
            <h3 className="mb-4 text-xl font-bold">Scan summary</h3>

            <div className="grid gap-4 md:grid-cols-4">
              <Metric label="Sneaker" value={identifiedSneaker || "—"} />
              <Metric label="Lowest Ask" value={formatMoney(derived.lowestPrice)} />
              <Metric label="Sold Median" value={formatMoney(derived.soldMedian)} />
              <Metric label="High Price" value={formatMoney(derived.highestPrice)} />
            </div>

            {derived.marketLabel ? (
              <div className="mt-4">
                <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-black">
                  {derived.marketLabel}
                </span>
              </div>
            ) : null}
          </div>
        )}
      </section>

      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-bold mb-12 text-center">
          How SneakPrice Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          <MiniStep
            emoji="📸"
            title="1. Scan sneaker"
            text="Upload a photo from your phone or desktop."
          />
          <MiniStep
            emoji="🤖"
            title="2. Identify model"
            text="AI detects the sneaker model."
          />
          <MiniStep
            emoji="💰"
            title="3. Show market value"
            text="Sold and active listing data are analyzed."
          />
          <MiniStep
            emoji="🔥"
            title="4. Flip Score"
            text="Spot resale spread and profit potential."
          />
        </div>
      </div>

      <div className="mt-16 max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-center mb-2">
          🔥 Live Sneaker Deals
        </h2>

        <p className="text-black text-sm text-center mb-6">● Live Market Feed</p>

        <div className="mb-10 overflow-hidden whitespace-nowrap border-y border-black/10 py-3">
          <div className="animate-[scroll_35s_linear_infinite] inline-block">
            {[...recentDeals, ...recentDeals].map((d, i) => (
              <span key={i} className="mx-6 text-neutral-600">
                🔥 {d.sneaker} +${d.profit.toFixed(0)}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          {deals.length > 0 && (
            <div className="bg-white text-black p-10 rounded-2xl w-full max-w-3xl mx-auto border-2 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.6)] overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10"></div>

              <div className="h-[140px] overflow-hidden">
                <div className="animate-[scrollVertical_12s_linear_infinite] space-y-6">
                  {[...deals, ...deals].map((deal, i) => (
                    <div key={i} className="text-center">
                      <h3 className="font-bold text-lg mb-2">{deal.sneaker}</h3>
                      <p><strong>Buy Price:</strong> ${deal.buy_price.toFixed(2)}</p>
                      <p><strong>Market Price:</strong> ${deal.market_price.toFixed(2)}</p>
                      <p className="text-black font-semibold">
                        Profit: +${deal.profit.toFixed(2)}
                      </p>
                      <p>ROI: {deal.roi.toFixed(1)}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-24 max-w-5xl w-full text-center">
        <h2 className="mb-10 text-2xl font-semibold text-neutral-700">
          Sneaker market intelligence powered by real data
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <p className="text-4xl font-bold text-black">12,000+</p>
            <p className="mt-2 text-neutral-600">Sneakers Analyzed</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-black">$3.2M</p>
            <p className="mt-2 text-neutral-600">Resale Value Calculated</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-black">2,500+</p>
            <p className="mt-2 text-neutral-600">Resellers Using SneakPrice</p>
          </div>
        </div>
      </div>

      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-center mb-12 transition-all duration-700 ease-in-out">
          {marketTitle}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-black/10 bg-white p-8 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
            <h3 className="text-xl font-semibold mb-6 transition-all duration-700 ease-in-out">
              {trendingTitle}
            </h3>

            <div className="overflow-hidden h-[120px]">
              <ul className="animate-[scrollVertical_10s_linear_infinite] space-y-3 text-neutral-700">
                {trending.map((sneaker, i) => (
                  <li key={i} className="flex justify-between transition-all duration-500">
                    <span>{sneaker.name}</span>
                    <span className="text-black">{sneaker.demand}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-black/10 bg-white p-8 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
            <h3 className="text-xl font-semibold mb-6 transition-all duration-500">
              {arbitrageTitle}
            </h3>

            <div className="overflow-hidden h-[120px]">
              <ul className="animate-[scrollVertical_10s_linear_infinite] space-y-3 text-neutral-700">
                {[
                  { name: "Air Jordan 1 Chicago", profit: 64 },
                  { name: "Yeezy 700 Wave Runner", profit: 48 },
                  { name: "Nike Dunk Panda", profit: 32 },
                  { name: "Jordan 4 Military Black", profit: 29 },
                  { name: "Air Jordan 1 Chicago", profit: 64 },
                  { name: "Yeezy 700 Wave Runner", profit: 48 },
                  { name: "Nike Dunk Panda", profit: 32 },
                  { name: "Jordan 4 Military Black", profit: 29 },
                ].map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="text-black">+${item.profit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Arbitrage Deal Feed ─────────────────────────────── */}
      <section className="space-y-4 mt-24 max-w-5xl w-full bg-gray-950 rounded-3xl p-6 border border-gray-800">
        {/* Header row */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-white font-bold text-xl">🔥 Live Arbitrage Deals</h2>
            <p className="text-gray-400 text-sm">
              {arbDeals.length > 0
                ? `${arbDeals.length} active deals · updating live`
                : "Warming up deal engine…"}
            </p>
          </div>
          <button
            onClick={() => setIsScanModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <DollarSign className="w-4 h-4" /> Scan a Shoe
          </button>
        </div>

        {/* New deals banner */}
        {newDealCount > 0 && (
          <button
            onClick={() => setNewDealCount(0)}
            className="w-full text-center bg-blue-600/20 border border-blue-500/40 text-blue-300 text-sm py-2 rounded-xl hover:bg-blue-600/30 transition-colors"
          >
            ↑ {newDealCount} new deal{newDealCount > 1 ? "s" : ""} · click to dismiss
          </button>
        )}

        {/* Tab filters */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "hot", "good", "watch"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {tab === "all"
                ? "All"
                : tab === "hot"
                ? "🔥 Hot"
                : tab === "good"
                ? "✅ Good"
                : "👀 Watch"}
            </button>
          ))}
        </div>

        {/* Deal cards */}
        {arbDeals.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium">
              No deals yet — the scanner is running in the background.
            </p>
            <p className="text-sm mt-1">
              Try &quot;Scan a Shoe&quot; to find deals instantly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {arbDeals
              .filter((d) => activeTab === "all" || d.dealLabel === activeTab)
              .map((deal) => (
                <ArbitrageDealCard key={deal.id} deal={deal} />
              ))}
          </div>
        )}
      </section>

      {/* ── Scan Modal ─────────────────────────────────────────── */}
      {isScanModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold text-lg">Scan a Specific Shoe</h2>
              <button
                onClick={() => {
                  setIsScanModalOpen(false);
                  setScanModalError("");
                }}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              Enter a sneaker model name to find arbitrage opportunities right now.
            </p>
            <form onSubmit={handleScanModel} className="space-y-3">
              <input
                type="text"
                value={scanQuery}
                onChange={(e) => setScanQuery(e.target.value)}
                placeholder="e.g. Air Jordan 4 Bred"
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              {scanModalError === "unauthenticated" && (
                <div className="text-center space-y-3 py-2">
                  <p className="text-white font-semibold">Sign in to scan sneakers</p>
                  <p className="text-gray-400 text-sm">Create a free account to get 3 scans per day.</p>
                  <button
                    onClick={() => openSignIn()}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-xl transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              )}

              {scanModalError === "limit_reached" && (
                <div className="text-center space-y-3 py-2">
                  <p className="text-white font-semibold">You&apos;ve used your 3 free scans today</p>
                  <p className="text-gray-400 text-sm">Your scans reset at midnight UTC.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsScanModalOpen(false)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-xl transition-colors"
                    >
                      Come back tomorrow
                    </button>
                    <a
                      href="/pricing"
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-xl transition-colors text-center"
                    >
                      Upgrade
                    </a>
                  </div>
                </div>
              )}

              {scanModalError && scanModalError !== "unauthenticated" && scanModalError !== "limit_reached" && (
                <p className="text-red-400 text-sm text-center">{scanModalError}</p>
              )}
              {scansRemaining !== null && (
                <p className="text-gray-500 text-xs text-center">
                  {scansRemaining} scan{scansRemaining !== 1 ? "s" : ""} remaining today
                </p>
              )}
              <button
                type="submit"
                disabled={isScanningModel || !scanQuery.trim()}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isScanningModel ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Scanning…
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4" /> Find Deals
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="mt-24 w-full max-w-5xl border-t border-black/10 pb-8 pt-12 text-center text-sm text-neutral-500">
        <div className="flex justify-center mb-6">
          <Image
            src="/sneakprice-logo.png"
            alt="SneakPrice"
            width={60}
            height={60}
            className="opacity-90"
          />
        </div>

        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          <Link href="/about" className="transition hover:text-black">About</Link>
          <Link href="/faq" className="transition hover:text-black">FAQ</Link>
          <Link href="/press" className="transition hover:text-black">Press</Link>
          <span>•</span>
          <Link href="/privacy" className="transition hover:text-black">Privacy</Link>
          <Link href="/terms" className="transition hover:text-black">Terms</Link>
          <Link href="/contact" className="transition hover:text-black">Contact</Link>
        </div>

        <div className="flex justify-center gap-6 mb-6">
          <a href="https://twitter.com/sneakprice" target="_blank" rel="noopener noreferrer" className="text-neutral-500 transition hover:text-black">
            <Twitter size={20} />
          </a>
          <a href="https://instagram.com/sneakprice" target="_blank" rel="noopener noreferrer" className="text-neutral-500 transition hover:text-black">
            <Instagram size={20} />
          </a>
          <a href="https://youtube.com/@sneakprice" target="_blank" rel="noopener noreferrer" className="text-neutral-500 transition hover:text-black">
            <Youtube size={20} />
          </a>
          <a href="https://facebook.com/sneakprice" target="_blank" rel="noopener noreferrer" className="text-neutral-500 transition hover:text-black">
            <Facebook size={22} />
          </a>
        </div>

        <p>
          © {new Date().getFullYear()} SneakPrice — Sneaker Market Intelligence Platform
        </p>
      </footer>
    </div>
  );
}

function StepCard({
  step,
  title,
  icon,
  value,
  helper,
}: {
  step: string;
  title: string;
  icon: React.ReactNode;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 text-left shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-neutral-700">
        <div className="rounded-full bg-neutral-100 p-2">{icon}</div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {step}
          </p>
          <h3 className="font-semibold">{title}</h3>
        </div>
      </div>

      <p className="text-2xl font-bold text-black">{value}</p>
      <p className="mt-2 text-sm text-neutral-500">{helper}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-neutral-50 p-4">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-black">{value}</p>
    </div>
  );
}

function MiniStep({
  emoji,
  title,
  text,
}: {
  emoji: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-8 shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-neutral-600">{text}</p>
    </div>
  );
}