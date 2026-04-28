"use client";

import { useState } from "react";

const PAGE_BG = "#e8e4c8";

export default function HeroDemoVideo() {
  const [withSound, setWithSound] = useState(false);

  return (
    <div
      className="w-full max-w-6xl mx-auto px-4 mb-16"
      style={{ backgroundColor: PAGE_BG }}
    >
      {/* Heading */}
      <div className="text-center mb-8">
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#2a2a28",
            padding: "6px 14px",
            border: "1px solid rgba(0,0,0,0.15)",
            borderRadius: 999,
            background: "rgba(255,255,255,0.4)",
            marginBottom: 18,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#ff5722",
            }}
          />
          Watch the demo
        </span>
        <h2
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(28px, 4.5vw, 48px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            margin: "10px 0 10px",
            color: "#0a0a0a",
          }}
        >
          See how the SneakPrice{" "}
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              color: "#6b6a5e",
              paddingRight: "0.25em",
            }}
          >
            scanner
          </em>{" "}
          works
        </h2>
        <p
          style={{
            maxWidth: 520,
            margin: "0 auto",
            fontSize: 15,
            color: "#6b6a5e",
            lineHeight: 1.55,
          }}
        >
          A 60-second walkthrough — snap a sneaker, get the live resale price,
          and see your flip score instantly. Tap{" "}
          <strong style={{ color: "#0a0a0a" }}>Watch with sound</strong> to hear
          the narration.
        </p>
      </div>

      {/* Video + overlay button */}
      <div className="relative">
        {withSound ? (
          // Full version with VO + browser-native controls.
          // Only mounted on user gesture, so the heavy file isn't fetched on page load.
          <video
            key="full"
            src="/videos/sneakprice.mp4"
            controls
            autoPlay
            loop
            playsInline
            preload="auto"
            poster="/videos/sneakprice-hero-poster.jpg"
            className="w-full block"
            style={{ backgroundColor: PAGE_BG, mixBlendMode: "multiply" }}
          />
        ) : (
          <>
            {/* Lightweight silent loop. preload="metadata" keeps initial fetch tiny */}
            <video
              key="hero"
              src="/videos/sneakprice-hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/videos/sneakprice-hero-poster.jpg"
              className="w-full block"
              style={{ backgroundColor: PAGE_BG, mixBlendMode: "multiply" }}
            />
            <button
              type="button"
              onClick={() => setWithSound(true)}
              aria-label="Watch demo with sound"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-black"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
              Watch with sound
            </button>
          </>
        )}
      </div>
    </div>
  );
}
