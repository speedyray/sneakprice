// components/encyclopedia/SneakerGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
};

export default function SneakerGallery({
  images,
  fallbackSrc = "/encyclopedia/default-sneaker.jpg",
}: {
  images: GalleryImage[];
  fallbackSrc?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {images.map((img, index) => (
        <GalleryCard
          key={`${img.src}-${index}`}
          src={img.src}
          alt={img.alt}
          fallbackSrc={fallbackSrc}
          priority={index === 0}
        />
      ))}
    </div>
  );
}

function GalleryCard({
  src,
  alt,
  fallbackSrc,
  priority,
}: {
  src: string;
  alt: string;
  fallbackSrc: string;
  priority?: boolean;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
      <Image
        src={currentSrc}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 50vw, 25vw"
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        onError={() => {
          if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
        }}
      />
    </div>
  );
}