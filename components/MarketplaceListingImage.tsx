"use client";

import { useState } from "react";

type MarketplaceListingImageProps = {
  src: string | null;
  alt: string;
};

export function MarketplaceListingImage({
  src,
  alt,
}: MarketplaceListingImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="flex h-full items-center justify-center bg-white px-4 text-center text-xs uppercase tracking-[0.35em] text-neutral-500">
        Sneaker image
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[0.9rem] border border-neutral-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain"
        loading="lazy"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
