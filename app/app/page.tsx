"use client";

import { useState } from "react";

export default function AppPage() {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResults(null);
    setError(null);
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
  if (!query && !image) {
    setError("Upload a photo or type a sneaker name.");
    return;
  }

  setLoading(true);
  setResults(null);
  setError(null);

  try {
    // 🖼 IF USER UPLOADED IMAGE
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      // 1️⃣ Send image to OpenAI route
      const scanRes = await fetch("/api/scan-photo", {
        method: "POST",
        body: formData,
      });

      const scanData = await scanRes.json();

      if (!scanData.sneakerName) {
        throw new Error("AI could not identify sneaker.");
      }

      const identifiedName = scanData.sneakerName;
      setQuery(identifiedName);

      // 2️⃣ Automatically call eBay with identified name
      const ebayRes = await fetch("/api/ebay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: identifiedName }),
      });

      const ebayData = await ebayRes.json();
      setResults(ebayData);

    } else {
      // 🔎 MANUAL TEXT SEARCH
      const res = await fetch("/api/ebay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResults(data);
    }

  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  }

  setLoading(false);
};

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

      {/* MANUAL SEARCH */}
      <div className="flex gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Or type sneaker name..."
          className="border px-4 py-3 rounded-xl w-full"
        />
        <button
          onClick={handleAnalyze}
          className="bg-black text-white px-6 rounded-xl"
        >
          {loading ? "Analyzing..." : "Scan Sneaker"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* RESULTS */}
      {results && results.totalListings !== 0 && (
        <div className="bg-gray-100 p-6 rounded-xl space-y-3">
          <h2 className="text-xl font-bold">Market Valuation</h2>

          <p><strong>Median Price:</strong> ${results.medianPrice?.toFixed(2)}</p>
          <p><strong>Average Price:</strong> ${results.averagePrice?.toFixed(2)}</p>
          <p><strong>Lowest Price:</strong> ${results.lowestPrice?.toFixed(2)}</p>
          <p><strong>Highest Price:</strong> ${results.highestPrice?.toFixed(2)}</p>
          <p><strong>Total Listings:</strong> {results.totalListings}</p>
          <p><strong>Market Status:</strong> {results.marketLabel}</p>
        </div>
      )}

      {results && results.totalListings === 0 && (
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-xl">
          No fixed-price new listings found.
        </div>
      )}

    </div>
  );
}
