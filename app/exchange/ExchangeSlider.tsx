"use client";

import { useState, useEffect } from "react";

const DASHBOARDS = [
  { src: "/exchange-dashboard.html", label: "Market Charts" },
  { src: "/exchange-arbitrage.html", label: "Arbitrage Deals" },
];

const INTERVAL_MS = 18_000; // slide every 18 seconds

export default function ExchangeSlider() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let elapsed = 0;
    const tick = 200; // ms

    const progressId = setInterval(() => {
      elapsed += tick;
      setProgress(Math.min((elapsed / INTERVAL_MS) * 100, 100));
    }, tick);

    const slideId = setInterval(() => {
      elapsed = 0;
      setProgress(0);
      setActive((v) => (v + 1) % DASHBOARDS.length);
    }, INTERVAL_MS);

    return () => {
      clearInterval(progressId);
      clearInterval(slideId);
    };
  }, []);

  return (
    <div className="relative flex flex-col" style={{ height: "calc(100vh - 120px)" }}>
      {/* Sliding iframe container */}
      <div className="relative flex-1 overflow-hidden">
        {DASHBOARDS.map((dash, i) => (
          <iframe
            key={dash.src}
            src={dash.src}
            title={dash.label}
            className="absolute inset-0 w-full h-full border-0"
            style={{
              transform: `translateX(${(i - active) * 100}%)`,
              transition: "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        ))}
      </div>

      {/* Indicator bar */}
      <div
        className="flex items-center justify-center gap-4 py-2"
        style={{ background: "#0a0f1c", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        {DASHBOARDS.map((dash, i) => (
          <button
            key={dash.src}
            onClick={() => { setActive(i); setProgress(0); }}
            className="flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full transition-all"
            style={
              active === i
                ? { background: "#2c3e66", color: "#f0f3fa", border: "1px solid rgba(255,255,255,0.2)" }
                : { background: "transparent", color: "#8E9DB2", border: "1px solid rgba(255,255,255,0.06)" }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: active === i ? "#facc15" : "#4a5568" }}
            />
            {dash.label}
          </button>
        ))}

        {/* Progress bar showing time until next slide */}
        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #facc15, #2ecc71)",
            transition: "width 200ms linear",
          }}
        />
      </div>
    </div>
  );
}
