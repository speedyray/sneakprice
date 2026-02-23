"use client";

import { useState } from "react";


export default function SneakerScanner() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  

  const handleImage = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleImage(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) {
      handleImage(e.dataTransfer.files[0]);
    }
  };

  const handleScan = async () => {
  if (!image) return;

  try {
    setLoading(true);
    setResult(null);

    const base64 = await toBase64(image);

    const res = await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64 }),
    });

    if (!res.ok) {
      throw new Error("Scan failed");
    }

    const data = await res.json();
    setResult(data);

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-md mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center">SneakPrice Scanner</h1>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer hover:bg-gray-50 transition"
      >
        <label className="cursor-pointer block">
          <p className="text-gray-600">
            Drag & drop or tap to upload
          </p>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {preview && (
        <img
          src={preview}
          className="rounded-2xl shadow-lg"
        />
      )}

      {image && (
        <button
          onClick={handleScan}
          disabled={loading}
          className="bg-black text-white py-3 rounded-xl"
        >
          {loading ? "Scanning..." : "Scan Sneaker"}
        </button>
      )}
         

      {loading && (
        <div className="text-center text-gray-500 animate-pulse">
          AI analyzing sneaker...
        </div>
      )}

      {result && (
        <div className="bg-white rounded-2xl shadow-md p-4">
          <p><strong>Brand:</strong> {result.brand}</p>
          <p><strong>Model:</strong> {result.model}</p>
          <p><strong>Colorway:</strong> {result.colorway}</p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}
