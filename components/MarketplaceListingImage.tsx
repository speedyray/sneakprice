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
      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_55%)] px-6 text-center text-xs uppercase tracking-[0.35em] text-neutral-500">
        Sneaker image
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover transition duration-300 hover:scale-105"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
