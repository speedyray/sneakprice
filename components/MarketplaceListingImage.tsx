"use client";

import { useMemo, useState } from "react";
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
  const sourceKey = imageCandidates.join("|");
  const [imageState, setImageState] = useState({
    sourceKey: "",
    imageIndex: 0,
  });
  const imageIndex = imageState.sourceKey === sourceKey ? imageState.imageIndex : 0;
  const currentSrc = imageCandidates[imageIndex] ?? null;

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentSrc}
        alt={alt}
        className="absolute inset-0 h-full w-full object-contain p-2"
        loading="lazy"
        onError={() => {
          setImageState((current) => {
            const currentIndex = current.sourceKey === sourceKey ? current.imageIndex : 0;

            if (currentIndex + 1 >= imageCandidates.length) {
              return current;
            }

            return {
              sourceKey,
              imageIndex: currentIndex + 1,
            };
          });
        }}
      />
    </div>
  );
}
