"use client";

import { useState } from "react";

export default function NewsletterTeaser() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "dup" | "err">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("err");
      setMessage("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("ok");
        setMessage("You're in. Check your inbox for confirmation.");
        setEmail("");
      } else if (data?.message?.toLowerCase().includes("already")) {
        setStatus("dup");
        setMessage("You're already on the list.");
      } else {
        setStatus("err");
        setMessage(data?.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setStatus("err");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 mb-16">
      <div
        style={{
          background: "#fdfcf3",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 24,
          padding: "clamp(24px, 4vw, 48px)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
        }}
      >
        {/* Brand header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <span
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#0a0a0a",
            }}
          >
            SneakPrice
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "#0a0a0a",
              color: "#d6ff3d",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              marginLeft: -4,
            }}
          >
            +
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6b6a5e",
            }}
          >
            Weekly insider picks
          </span>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            margin: "0 0 12px",
            color: "#0a0a0a",
          }}
        >
          Our AI flips: <span style={{ color: "#22c55e" }}>+35.4%</span> avg ROI.
          The sneaker market: <span style={{ color: "#6b6a5e" }}>+4.2%</span>.
          Only insiders get the picks.
        </h2>
        <p style={{ color: "#6b6a5e", fontSize: 15, lineHeight: 1.55, margin: "0 0 24px", maxWidth: 640 }}>
          Same drops, different returns. The only difference? Insiders get the
          weekly buy-low / sell-high picks before the market closes the gap —
          you don&apos;t&hellip; yet.
        </p>

        {/* Chart */}
        <div
          style={{
            background: "#fafaf3",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 14,
            padding: "18px 20px 14px",
            marginBottom: 28,
          }}
        >
          <svg viewBox="0 0 600 180" width="100%" height="180" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="picksFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Picks line — sharp upward */}
            <path
              d="M0,160 C60,150 100,142 140,128 S220,100 260,82 S360,58 410,42 S520,22 600,16 L600,180 L0,180 Z"
              fill="url(#picksFill)"
            />
            <path
              d="M0,160 C60,150 100,142 140,128 S220,100 260,82 S360,58 410,42 S520,22 600,16"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Market line — mostly flat */}
            <path
              d="M0,160 C80,158 160,156 240,154 S400,150 480,148 S570,146 600,145"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="0"
            />
          </svg>
          <div style={{ display: "flex", gap: 24, marginTop: 6, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#0a0a0a" }}>
              <span style={{ width: 10, height: 2, background: "#22c55e", display: "inline-block" }} />
              SneakPrice picks <strong style={{ color: "#22c55e", marginLeft: 4 }}>+35.4%</strong>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#0a0a0a" }}>
              <span style={{ width: 10, height: 2, background: "#9ca3af", display: "inline-block" }} />
              Sneaker market <strong style={{ color: "#0a0a0a", marginLeft: 4 }}>+4.2%</strong>
            </span>
          </div>
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            disabled={status === "loading" || status === "ok"}
            className="flex-1 rounded-lg border border-black/15 bg-white px-4 py-3 text-base text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent disabled:opacity-60"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "ok"}
            className="rounded-lg bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-60 disabled:hover:bg-[#22c55e] text-white px-6 py-3 font-semibold transition flex items-center justify-center gap-2"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            {status === "loading" ? "Joining…" : status === "ok" ? "Joined ✓" : "Become an insider"}
          </button>
        </form>

        {message && (
          <p
            role="status"
            className="text-sm -mt-4 mb-6"
            style={{
              color:
                status === "ok"
                  ? "#16a34a"
                  : status === "dup"
                  ? "#6b6a5e"
                  : "#dc2626",
            }}
          >
            {message}
          </p>
        )}

        {/* Locked sample pick */}
        <div
          style={{
            background: "#fafaf3",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 14,
            padding: "18px 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(0,0,0,0.06)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-hidden="true"
            >
              <LockIcon size={14} />
            </span>
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: "#0a0a0a" }}>
              Air Jordan 1 Retro High &mdash; Pollen
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#22c55e", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 14 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
            <span>+39.7%</span>
            <span style={{ color: "#6b6a5e", fontWeight: 500, fontSize: 13, marginLeft: 6 }}>Target spread</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 14 }}>
            {["Buy price", "Sell price", "Current low", "Confidence"].map(label => (
              <div key={label}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6a5e", marginBottom: 6 }}>
                  {label}
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    background: "rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: 6,
                    padding: "5px 10px",
                    color: "#9ca3af",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}
                >
                  <LockIcon size={10} />
                  &bull;&bull;&bull;&bull;
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6b6a5e",
            }}
          >
            <SparkIcon />
            Unlock weekly picks
          </div>
        </div>
      </div>
    </section>
  );
}

function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#22c55e" aria-hidden="true">
      <path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10z" />
    </svg>
  );
}
