"use client";

import { useEffect, useMemo, useState } from "react";
import { getMarketplaceImageCandidates } from "@/lib/marketplace-image-fallbacks";

type MarketplaceListingImageProps = {
  src: string | null;
  alt: string;
};

export function MarketplaceListingImage({
  src,
  alt,
}: MarketplaceListingImageProps) {
  const imageCandidates = useMemo(() => getMarketplaceImageCandidates(src, alt), [alt, src]);
  const [imageIndex, setImageIndex] = useState(0);
  const currentSrc = imageCandidates[imageIndex] ?? null;

  useEffect(() => {
    setImageIndex(0);
  }, [imageCandidates]);

  if (!currentSrc) {
    return (
      <div className="relative h-full w-full rounded-[0.9rem] bg-white">
        <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs uppercase tracking-[0.35em] text-neutral-500">
          Sneaker image
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[0.9rem] bg-white">
      <img
        src={currentSrc}
        alt={alt}
        className="absolute inset-0 h-full w-full object-contain p-2"
        loading="lazy"
        onError={() => {
          setImageIndex((current) =>
            current + 1 < imageCandidates.length ? current + 1 : current
          );
        }}
      />
    </div>
  );
}
