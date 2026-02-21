"use client";

import { useState } from "react";

export default function SneakerScanner() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleScan = async () => {
    if (!image) return;
    setLoading(true);

    const base64 = await toBase64(image);

    const res = await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64 }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImage}
      />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-64 rounded-xl shadow-lg"
        />
      )}

      {image && (
        <button
          onClick={handleScan}
          className="bg-black text-white px-6 py-2 rounded-xl"
        >
          {loading ? "Scanning..." : "Scan Sneaker"}
        </button>
      )}

      {result && (
        <div className="bg-white p-4 rounded-xl shadow-lg mt-4">
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
    reader.onerror = error => reject(error);
  });
}
