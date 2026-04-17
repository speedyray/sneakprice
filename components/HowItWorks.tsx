"use client";

export default function HowItWorks() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .hiw-section {
          --accent: #d6ff3d;
          --ink: #0a0a0a;
          --ink-soft: #2a2a28;
          --muted: #6b6a5e;
          --card: #0e0e0f;
          --line: rgba(255,255,255,0.08);
          --green: #22c55e;
          --red: #ef4444;
          --amber: #f59e0b;
        }

        @keyframes hiw-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes hiw-scan {
          0% { top: 14%; }
          50% { top: 86%; }
          100% { top: 14%; }
        }
        @keyframes hiw-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes hiw-bar-grow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes hiw-gauge-fill {
          from { stroke-dashoffset: 220; }
          to { stroke-dashoffset: 56; }
        }
        @keyframes hiw-count-up {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .hiw-phone {
          transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.3, 1);
        }
        .hiw-phone:hover {
          transform: translateY(-8px);
        }

        .hiw-scan-line {
          position: absolute;
          left: 14%; right: 14%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          box-shadow: 0 0 12px var(--accent);
          animation: hiw-scan 2.2s ease-in-out infinite;
        }

        .hiw-sneaker-float {
          animation: hiw-float 4s ease-in-out infinite;
        }

        .hiw-eyebrow-dot {
          animation: hiw-pulse 2s ease-in-out infinite;
        }

        .hiw-chart-bar {
          transform-origin: bottom;
          animation: hiw-bar-grow 0.8s ease-out forwards;
        }
        .hiw-chart-bar:nth-child(1) { animation-delay: 0.1s; }
        .hiw-chart-bar:nth-child(2) { animation-delay: 0.2s; }
        .hiw-chart-bar:nth-child(3) { animation-delay: 0.3s; }
        .hiw-chart-bar:nth-child(4) { animation-delay: 0.4s; }
        .hiw-chart-bar:nth-child(5) { animation-delay: 0.5s; }
        .hiw-chart-bar:nth-child(6) { animation-delay: 0.6s; }
        .hiw-chart-bar:nth-child(7) { animation-delay: 0.7s; }

        .hiw-gauge-arc {
          animation: hiw-gauge-fill 1.4s ease-out 0.3s forwards;
          stroke-dashoffset: 220;
        }

        .hiw-stat-val {
          animation: hiw-count-up 0.5s ease-out 0.6s both;
        }

        .hiw-phones-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          align-items: end;
          max-width: 1000px;
          margin: 0 auto;
        }

        @media (max-width: 767px) {
          .hiw-phones-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }
      `}</style>

      <section className="hiw-section w-full max-w-6xl mx-auto px-4 mb-16">

        {/* Heading */}
        <div className="text-center mb-14">
          <span style={{
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
          }}>
            <span className="hiw-eyebrow-dot" style={{
              display: "inline-block",
              width: 6, height: 6,
              borderRadius: "50%",
              background: "#ff5722",
            }} />
            4-step scan workflow
          </span>

          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(32px, 5vw, 58px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            margin: "16px 0 12px",
            color: "#0a0a0a",
          }}>
            How SneakPrice{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#6b6a5e" }}>works</em>
          </h2>

          <p style={{
            maxWidth: 520,
            margin: "0 auto",
            fontSize: 15,
            color: "#6b6a5e",
            lineHeight: 1.55,
          }}>
            From shutter to flip score — here&apos;s the full resale intelligence loop on your phone.
          </p>
        </div>

        {/* Phone grid */}
        <div className="hiw-phones-grid">

          {/* ── PHONE 1: SCAN ── */}
          <PhoneWrapper stepNum="01" stepLabel="Scan Sneaker" caption="Snap or upload instantly">
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0 10px 10px" }}>
              <AppHeader />
              <div style={{ padding: "8px 0 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <SectionLabel>Photo Scan</SectionLabel>
                <span style={{ color: "#d6ff3d", fontFamily: "'JetBrains Mono',monospace", fontSize: 7.5, letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#d6ff3d", boxShadow: "0 0 6px #d6ff3d", display: "inline-block" }} />
                  LIVE
                </span>
              </div>
              {/* Scan viewport */}
              <div style={{
                flex: 1,
                background: "radial-gradient(ellipse at center, rgba(214,255,61,0.07), transparent 60%), linear-gradient(180deg, #1a1a1c 0%, #0a0a0a 100%)",
                borderRadius: 12,
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {/* Sneaker */}
                <img
                  src="/AirJordanOne.png"
                  alt="sneaker"
                  className="hiw-sneaker-float"
                  style={{ width: "85%", objectFit: "contain", filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.6)) drop-shadow(0 0 20px rgba(214,255,61,0.1))" }}
                />
                {/* Scan corners */}
                {["tl","tr","bl","br"].map(pos => (
                  <span key={pos} style={{
                    position: "absolute",
                    width: 18, height: 18,
                    border: "2.5px solid #d6ff3d",
                    borderRight: pos.endsWith("l") ? "none" : "2.5px solid #d6ff3d",
                    borderLeft: pos.endsWith("r") ? "none" : "2.5px solid #d6ff3d",
                    borderBottom: pos.startsWith("t") ? "none" : "2.5px solid #d6ff3d",
                    borderTop: pos.startsWith("b") ? "none" : "2.5px solid #d6ff3d",
                    borderTopLeftRadius: pos === "tl" ? 3 : 0,
                    borderTopRightRadius: pos === "tr" ? 3 : 0,
                    borderBottomLeftRadius: pos === "bl" ? 3 : 0,
                    borderBottomRightRadius: pos === "br" ? 3 : 0,
                    top: pos.startsWith("t") ? "12%" : "auto",
                    bottom: pos.startsWith("b") ? "12%" : "auto",
                    left: pos.endsWith("l") ? "12%" : "auto",
                    right: pos.endsWith("r") ? "12%" : "auto",
                  }} />
                ))}
                {/* Scan line */}
                <div className="hiw-scan-line" />
                {/* Hint pill */}
                <div style={{
                  position: "absolute",
                  top: 10, left: "50%", transform: "translateX(-50%)",
                  background: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 7,
                  letterSpacing: "0.08em",
                  padding: "4px 9px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.15)",
                  whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#d6ff3d", display: "inline-block" }} />
                  ALIGN SNEAKER
                </div>
              </div>
              {/* Capture bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 2px 0" }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="9" rx="1.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/><path d="M6 4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/></svg>
                </div>
                <div style={{ width: 34, height: 34, borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#fff" }} />
                </div>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/><path d="M8 5v3l2 2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
              </div>
            </div>
          </PhoneWrapper>

          {/* ── PHONE 2: IDENTIFY ── */}
          <PhoneWrapper stepNum="02" stepLabel="Identify" caption="AI detects the exact pair">
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0 10px 10px" }}>
              <AppHeader />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, paddingTop: 8 }}>
                <SectionLabel>AI Result</SectionLabel>

                {/* Sneaker result card */}
                <div style={{
                  background: "linear-gradient(135deg, #1a1a1c, #111113)",
                  borderRadius: 10,
                  border: "1px solid rgba(214,255,61,0.2)",
                  overflow: "hidden",
                }}>
                  <div style={{ background: "#0e0e0f", padding: "10px 10px 6px", display: "flex", justifyContent: "center" }}>
                    <img src="/AirJordanOne.png" alt="sneaker" style={{ width: "65%", objectFit: "contain", filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.7))" }} />
                  </div>
                  <div style={{ padding: "8px 10px 10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                      <div>
                        <div style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'JetBrains Mono',monospace", fontSize: 7, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>Identified</div>
                        <div style={{ color: "#fff", fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.2 }}>Nike Air Max 90 OG</div>
                      </div>
                      <div style={{
                        background: "rgba(214,255,61,0.12)",
                        border: "1px solid rgba(214,255,61,0.3)",
                        borderRadius: 6,
                        padding: "3px 7px",
                        color: "#d6ff3d",
                        fontFamily: "'Bricolage Grotesque',sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                      }}>$385</div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                      {["Nike", "Air Max", "OG"].map(tag => (
                        <span key={tag} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: "1.5px 6px", color: "rgba(255,255,255,0.5)", fontSize: 7, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.08em" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Confidence row */}
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "7px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'JetBrains Mono',monospace", fontSize: 7.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>AI Confidence</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 50, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                      <div style={{ width: "97%", height: "100%", background: "#d6ff3d", borderRadius: 2 }} />
                    </div>
                    <span style={{ color: "#d6ff3d", fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 10 }}>97%</span>
                  </div>
                </div>

                {/* Marketplace row */}
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "7px 10px" }}>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono',monospace", fontSize: 7, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5 }}>Listed on</div>
                  <div style={{ display: "flex", gap: 5 }}>
                    {["eBay", "StockX", "GOAT"].map((mkt, i) => (
                      <span key={mkt} style={{
                        flex: 1, textAlign: "center",
                        background: i === 0 ? "rgba(255,193,7,0.15)" : i === 1 ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.08)",
                        border: `1px solid ${i === 0 ? "rgba(255,193,7,0.3)" : i === 1 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)"}`,
                        borderRadius: 5, padding: "3px 0",
                        color: i === 0 ? "#fbbf24" : i === 1 ? "#22c55e" : "rgba(255,255,255,0.6)",
                        fontFamily: "'JetBrains Mono',monospace", fontSize: 7.5, fontWeight: 600,
                      }}>{mkt}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </PhoneWrapper>

          {/* ── PHONE 3: MARKET VALUE ── */}
          <PhoneWrapper stepNum="03" stepLabel="Market Value" caption="Real resale data, live">
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0 10px 10px" }}>
              <AppHeader />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, paddingTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <SectionLabel>Market Data</SectionLabel>
                  <span style={{ color: "#d6ff3d", fontFamily: "'JetBrains Mono',monospace", fontSize: 7.5, letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 3 }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#d6ff3d", display: "inline-block" }} />
                    LIVE
                  </span>
                </div>

                {/* Price hero */}
                <div style={{ textAlign: "center", padding: "4px 0" }}>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono',monospace", fontSize: 7, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>Sold Median</div>
                  <div style={{ color: "#fff", fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>$385</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 3, marginTop: 3, background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 5, padding: "2px 7px" }}>
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M5 2L9 8H1L5 2Z" fill="#22c55e"/></svg>
                    <span style={{ color: "#22c55e", fontFamily: "'JetBrains Mono',monospace", fontSize: 7.5, fontWeight: 600 }}>+12.4%</span>
                  </div>
                </div>

                {/* Chart */}
                <div style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "8px 10px 6px",
                  display: "flex",
                  flexDirection: "column",
                }}>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono',monospace", fontSize: 6.5, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>30-day price history</div>
                  {/* Bars */}
                  <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 3 }}>
                    {[42, 60, 38, 75, 55, 88, 70].map((h, i) => (
                      <div key={i} className="hiw-chart-bar" style={{
                        flex: 1,
                        height: `${h}%`,
                        borderRadius: "3px 3px 0 0",
                        background: i === 5
                          ? "linear-gradient(180deg, #d6ff3d, rgba(214,255,61,0.5))"
                          : "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
                      }} />
                    ))}
                  </div>
                  {/* X labels */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    {["3/15","3/19","3/23","3/27","3/31","4/4","4/8"].map(d => (
                      <span key={d} style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'JetBrains Mono',monospace", fontSize: 5.5 }}>{d}</span>
                    ))}
                  </div>
                </div>

                {/* Stats row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                  {[
                    { label: "Active Median", val: "$362", color: "#fff" },
                    { label: "Lowest Ask", val: "$290", color: "#22c55e" },
                  ].map(s => (
                    <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 7, padding: "5px 8px" }}>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono',monospace", fontSize: 6.5, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{s.label}</div>
                      <div style={{ color: s.color, fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 12 }}>{s.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PhoneWrapper>

          {/* ── PHONE 4: FLIP SCORE ── */}
          <PhoneWrapper stepNum="04" stepLabel="Flip Score" caption="Profit & demand insights">
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0 10px 10px" }}>
              <AppHeader />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, paddingTop: 8 }}>
                <SectionLabel>Flip Score</SectionLabel>

                {/* Gauge */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4px 0 0" }}>
                  <div style={{ position: "relative", width: 90, height: 50 }}>
                    <svg width="90" height="52" viewBox="0 0 90 52" fill="none">
                      {/* Track */}
                      <path d="M10 46 A35 35 0 0 1 80 46" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" fill="none"/>
                      {/* Fill — 82/100 ≈ 82% of arc */}
                      <path
                        className="hiw-gauge-arc"
                        d="M10 46 A35 35 0 0 1 80 46"
                        stroke="url(#gaugeGrad)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="220"
                      />
                      <defs>
                        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f59e0b"/>
                          <stop offset="60%" stopColor="#d6ff3d"/>
                          <stop offset="100%" stopColor="#22c55e"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div style={{
                      position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                      textAlign: "center",
                    }}>
                      <span style={{ color: "#fff", fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.04em", lineHeight: 1 }}>82</span>
                      <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, fontFamily: "'JetBrains Mono',monospace" }}>/100</span>
                    </div>
                  </div>
                  <div style={{
                    marginTop: 4,
                    background: "linear-gradient(135deg, rgba(214,255,61,0.15), rgba(34,197,94,0.1))",
                    border: "1px solid rgba(214,255,61,0.3)",
                    borderRadius: 6, padding: "3px 12px",
                    color: "#d6ff3d",
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600,
                  }}>Strong Flip</div>
                </div>

                {/* Profit metrics */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                  {[
                    { label: "Est. Profit", val: "+$124", color: "#22c55e", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)" },
                    { label: "ROI", val: "35.4%", color: "#d6ff3d", bg: "rgba(214,255,61,0.06)", border: "rgba(214,255,61,0.2)" },
                  ].map(m => (
                    <div key={m.label} style={{ background: m.bg, border: `1px solid ${m.border}`, borderRadius: 8, padding: "7px 8px", textAlign: "center" }}>
                      <div style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono',monospace", fontSize: 6.5, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{m.label}</div>
                      <div className="hiw-stat-val" style={{ color: m.color, fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>{m.val}</div>
                    </div>
                  ))}
                </div>

                {/* Signal rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {[
                    { label: "Demand", val: "High", dot: "#22c55e" },
                    { label: "Supply Gap", val: "-4 days", dot: "#d6ff3d" },
                    { label: "Market", val: "Seller's", dot: "#f59e0b" },
                  ].map(row => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: "5px 8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: row.dot, display: "inline-block" }} />
                        <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono',monospace", fontSize: 7, letterSpacing: "0.08em", textTransform: "uppercase" }}>{row.label}</span>
                      </div>
                      <span style={{ color: "#fff", fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 600, fontSize: 9 }}>{row.val}</span>
                    </div>
                  ))}
                </div>

                {/* CTA button */}
                <button style={{
                  width: "100%",
                  background: "#d6ff3d",
                  border: "none",
                  borderRadius: 8,
                  padding: "7px 0",
                  color: "#0a0a0a",
                  fontFamily: "'Bricolage Grotesque',sans-serif",
                  fontWeight: 700,
                  fontSize: 10,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                }}>
                  Groove Flip →
                </button>
              </div>
            </div>
          </PhoneWrapper>
        </div>
      </section>
    </>
  );
}

/* ── Shared sub-components ── */

function PhoneWrapper({ stepNum, stepLabel, caption, children }: {
  stepNum: string;
  stepLabel: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Step tag */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        marginBottom: 14,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#0a0a0a",
      }}>
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 26, height: 26,
          background: "#0a0a0a",
          color: "#d6ff3d",
          borderRadius: 7,
          fontWeight: 700,
          fontSize: 11,
        }}>{stepNum}</span>
        {stepLabel}
      </div>

      {/* Phone frame */}
      <div className="hiw-phone" style={{
        width: "100%",
        aspectRatio: "9 / 19.5",
        background: "#0a0a0a",
        borderRadius: 36,
        padding: 6,
        boxShadow: `
          0 2px 0 rgba(255,255,255,0.12) inset,
          0 -2px 0 rgba(0,0,0,0.5) inset,
          0 20px 40px -10px rgba(0,0,0,0.3),
          0 60px 80px -30px rgba(0,0,0,0.35)
        `,
        position: "relative",
      }}>
        {/* Screen */}
        <div style={{
          width: "100%",
          height: "100%",
          background: "#0e0e0f",
          borderRadius: 30,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Dynamic Island */}
          <div style={{
            position: "absolute",
            top: 9,
            left: "50%",
            transform: "translateX(-50%)",
            width: "33%",
            height: 20,
            background: "#000",
            borderRadius: 999,
            zIndex: 10,
          }} />

          {/* Status bar */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "13px 20px 0",
            fontSize: 10,
            fontWeight: 600,
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            flexShrink: 0,
          }}>
            <span>9:41</span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <svg width="13" height="9" viewBox="0 0 13 9" fill="#fff"><rect x="0" y="3" width="2" height="6" rx="0.5"/><rect x="3" y="2" width="2" height="7" rx="0.5"/><rect x="6" y="1" width="2" height="8" rx="0.5"/><rect x="9" y="0" width="2" height="9" rx="0.5"/></svg>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M7 2C9.5 2 11.7 3.1 13.2 4.9L14 4C12.3 1.9 9.8.7 7 .7 4.2.7 1.7 1.9 0 4l.8.9C2.3 3.1 4.5 2 7 2Z" fill="#fff"/><path d="M7 5C8.7 5 10.2 5.7 11.3 6.8L12.1 6C10.8 4.7 9 3.8 7 3.8S3.2 4.7 1.9 6l.8.8C3.8 5.7 5.3 5 7 5Z" fill="#fff"/><circle cx="7" cy="9" r="1.5" fill="#fff"/></svg>
              <svg width="22" height="10" viewBox="0 0 22 10" fill="none"><rect x="0.5" y="0.5" width="18" height="9" rx="2.5" stroke="rgba(255,255,255,0.35)"/><rect x="1.5" y="1.5" width="13" height="7" rx="1.5" fill="#fff"/><path d="M20 3.5v3c.8-.4 1.3-1 1.3-1.5S20.8 3.9 20 3.5Z" fill="rgba(255,255,255,0.4)"/></svg>
            </div>
          </div>

          {children}
        </div>
      </div>

      {/* Caption */}
      <p style={{
        marginTop: 14,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        color: "#6b6a5e",
        letterSpacing: "0.05em",
        textAlign: "center",
      }}>{caption}</p>
    </div>
  );
}

function AppHeader() {
  return (
    <div style={{
      padding: "16px 10px 10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#fff", fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "-0.02em" }}>
        <div style={{
          width: 20, height: 20,
          borderRadius: 5,
          background: "linear-gradient(135deg, #d6ff3d, #a3cc1f)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#000", fontSize: 9, fontWeight: 800,
        }}>S</div>
        SneakPrice
      </div>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/></svg>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 7.5,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.35)",
    }}>{children}</div>
  );
}
