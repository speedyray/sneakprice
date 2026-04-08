"use client";

import Link from "next/link";
import { useState } from "react";

type VideoCard = {
  title: string;
  subtitle: string;
  src: string;
  poster: string;
  href: string;
};

const videoCards: VideoCard[] = [
  {
    title: "Street Rotation",
    subtitle: "Actor-led city styling clips",
    src: "/videos/marketplace-street-rotation.mp4",
    poster: "/jordan-yellow.png",
    href: "/",
  },
  {
    title: "On-Foot Detail",
    subtitle: "Walking shots and outfit pairings",
    src: "/videos/marketplace-on-foot.mp4",
    poster: "/sneakprice-logo.png",
    href: "/marketplace/sell",
  },
  {
    title: "Launch Energy",
    subtitle: "Sneaker close-ups and product motion",
    src: "/videos/marketplace-launch-energy.mp4",
    poster: "/jordan.svg",
    href: "/buyer",
  },
];

function VideoTile({ card }: { card: VideoCard }) {
  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  return (
    <Link
      href={card.href}
      className="group relative overflow-hidden rounded-[2rem] border border-neutral-800 bg-neutral-900"
    >
      <div className="relative aspect-[4/5] bg-neutral-950">
        {!hasError ? (
          <video
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              isReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setIsReady(true)}
            onError={() => setHasError(true)}
          >
            <source src={card.src} type="video/mp4" />
          </video>
        ) : (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_60%)] p-8">
            <img
              src={card.poster}
              alt={card.title}
              className="max-h-[70%] max-w-[70%] object-contain opacity-90"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-6">
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-emerald-300">
                Video Slot Ready
              </p>
              <p className="mt-2 text-sm text-neutral-200">
                Drop a licensed MP4 into `public/videos` to replace this poster.
              </p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[0.62rem] uppercase tracking-[0.35em] text-emerald-300">
            Featured Motion
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{card.title}</h3>
          <p className="mt-1 text-sm text-neutral-300">{card.subtitle}</p>
        </div>
      </div>
    </Link>
  );
}

export function MarketplaceVideoShowcase() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
            Sneaker Motion
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Bring the marketplace to life
          </h2>
          <p className="mt-3 max-w-3xl text-neutral-400">
            This section is ready for licensed on-foot clips, actor styling reels,
            and launch footage. Drop MP4 files into `public/videos` to turn these
            cards into live autoplay showcase tiles.
          </p>
        </div>
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300"
        >
          Explore stories -&gt;
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {videoCards.map((card) => (
          <VideoTile key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}
