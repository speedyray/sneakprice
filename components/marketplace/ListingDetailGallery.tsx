"use client";

import { useState } from "react";
import { MarketplaceListingImage } from "@/components/MarketplaceListingImage";

export type ListingDetailGallerySlide =
  | {
      id: string;
      label: string;
      type: "image";
      src: string | null;
      caption?: string;
    }
  | {
      id: string;
      label: string;
      type: "info";
      eyebrow: string;
      title: string;
      body: string;
      details?: string[];
      tone?: "neutral" | "emerald" | "amber";
    };

type ListingDetailGalleryProps = {
  title: string;
  slides: ListingDetailGallerySlide[];
};

const toneClasses = {
  neutral: {
    panel: "border-neutral-200 bg-neutral-50",
    eyebrow: "text-neutral-500",
    title: "text-neutral-950",
    body: "text-neutral-600",
    detail: "border-neutral-200 bg-white text-neutral-700",
  },
  emerald: {
    panel: "border-emerald-200 bg-emerald-50",
    eyebrow: "text-emerald-700",
    title: "text-emerald-950",
    body: "text-emerald-800/80",
    detail: "border-emerald-200 bg-white/80 text-emerald-900",
  },
  amber: {
    panel: "border-amber-200 bg-amber-50",
    eyebrow: "text-amber-700",
    title: "text-amber-950",
    body: "text-amber-900/75",
    detail: "border-amber-200 bg-white/80 text-amber-900",
  },
} as const;

export function ListingDetailGallery({
  title,
  slides,
}: ListingDetailGalleryProps) {
  const safeSlides =
    slides.length > 0
      ? slides
      : [
          {
            id: "fallback-image",
            label: "Pair",
            type: "image" as const,
            src: null,
            caption: title,
          },
        ];

  const [activeSlideId, setActiveSlideId] = useState(safeSlides[0].id);
  const activeSlide =
    safeSlides.find((slide) => slide.id === activeSlideId) ?? safeSlides[0];

  return (
    <div className="grid gap-4 lg:grid-cols-[96px_minmax(0,1fr)]">
      <div className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {safeSlides.map((slide, index) => {
          const isActive = slide.id === activeSlide.id;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveSlideId(slide.id)}
              className={`group flex min-w-[88px] shrink-0 flex-col gap-2 rounded-2xl border p-2 text-left transition lg:min-w-0 ${
                isActive
                  ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
              }`}
            >
              <div className="overflow-hidden rounded-xl bg-neutral-100">
                {slide.type === "image" ? (
                  <div className="aspect-square">
                    <MarketplaceListingImage
                      src={slide.src}
                      alt={slide.caption ?? `${title} image ${index + 1}`}
                    />
                  </div>
                ) : (
                  <div
                    className={`flex aspect-square items-center justify-center rounded-xl text-xs font-semibold uppercase tracking-[0.28em] ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {slide.label.slice(0, 2)}
                  </div>
                )}
              </div>
              <span
                className={`text-[0.62rem] font-semibold uppercase tracking-[0.26em] ${
                  isActive ? "text-white" : "text-neutral-500"
                }`}
              >
                {slide.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        {activeSlide.type === "image" ? (
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-neutral-100">
              <MarketplaceListingImage src={activeSlide.src} alt={title} />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
              <span>{activeSlide.caption ?? title}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.26em] text-neutral-500">
                Media view
              </span>
            </div>
          </div>
        ) : (
          <div
            className={`flex min-h-[560px] flex-col justify-between rounded-[1.5rem] border p-8 ${
              toneClasses[activeSlide.tone ?? "neutral"].panel
            }`}
          >
            <div className="space-y-5">
              <p
                className={`text-xs font-semibold uppercase tracking-[0.34em] ${
                  toneClasses[activeSlide.tone ?? "neutral"].eyebrow
                }`}
              >
                {activeSlide.eyebrow}
              </p>
              <h3
                className={`max-w-xl text-4xl font-bold tracking-tight ${
                  toneClasses[activeSlide.tone ?? "neutral"].title
                }`}
              >
                {activeSlide.title}
              </h3>
              <p
                className={`max-w-2xl text-base leading-7 ${
                  toneClasses[activeSlide.tone ?? "neutral"].body
                }`}
              >
                {activeSlide.body}
              </p>
            </div>

            {activeSlide.details?.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {activeSlide.details.map((detail) => (
                  <div
                    key={detail}
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                      toneClasses[activeSlide.tone ?? "neutral"].detail
                    }`}
                  >
                    {detail}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
