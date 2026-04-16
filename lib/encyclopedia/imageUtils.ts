// lib/encyclopedia/imageUtils.ts
import type { SneakerStarterEntry } from "./starterSneakers";

export function getSneakerImageSet(entry: SneakerStarterEntry) {
  const base = `/encyclopedia/${entry.slug}`;

  if (entry.tier === 1) {
    return [
      { src: `${base}/hero.jpg`, alt: `${entry.name} hero` },
      { src: `${base}/angle-1.jpg`, alt: `${entry.name} angle 1` },
      { src: `${base}/angle-2.jpg`, alt: `${entry.name} angle 2` },
      { src: `${base}/detail.jpg`, alt: `${entry.name} detail` },
    ];
  }

  if (entry.tier === 2) {
    return [
      { src: `${base}/hero.jpg`, alt: `${entry.name} hero` },
      { src: `${base}/angle-1.jpg`, alt: `${entry.name} alternate angle` },
    ];
  }

  return [
    { src: `${base}/hero.jpg`, alt: `${entry.name} hero` },
  ];
}

export function getFallbackImage() {
  return {
    src: "/encyclopedia/default-sneaker.jpg",
    alt: "Sneaker placeholder",
  };
}