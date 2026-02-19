"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function SneakPriceLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 bg-gradient-to-b from-black via-zinc-900 to-black">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl"
        >
          Turn Your <span className="text-green-400">Sneakers</span> Into
          <br /> Real Instant Market Value.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl"
        >
          Scan any sneaker. Get real resale value based on verified sold listings.
          No guessing. No hype. Just data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button className="bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-4 rounded-2xl shadow-2xl text-lg transition-all duration-300 hover:scale-105">
            Scan a Sneaker
          </button>
          <button className="border border-zinc-700 hover:border-white px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105">
            Join Early Access
          </button>
        </motion.div>

        <p className="mt-4 text-sm text-zinc-600">
          Free 3 scans per day • No credit card required
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28 px-6 bg-zinc-950">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-20"
        >
          Built For Sneaker Culture
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto text-center">
          {["📸", "🤖", "💰"].map((emoji, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 hover:border-green-500 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{emoji}</div>
              <h3 className="text-xl font-semibold mb-2">
                {i === 0 && "Scan Instantly"}
                {i === 1 && "AI Identifies Model"}
                {i === 2 && "See Real Market Value"}
              </h3>
              <p className="text-zinc-400">
                {i === 0 && "Take a photo in seconds."}
                {i === 1 && "Brand, colorway, release year."}
                {i === 2 && "Based on verified sold listings."}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DEMO CARD */}
      <section className="py-28 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto bg-zinc-900 rounded-3xl p-10 shadow-2xl border border-zinc-800"
        >
          <h3 className="text-2xl font-semibold mb-6">
            Air Jordan 1 Retro High OG “Bred Toe” (2018)
          </h3>
          <div className="space-y-3 text-lg">
            <p>
              Estimated Value: <span className="text-green-400 font-bold">$220 – $270</span>
            </p>
            <p>Median Sold Price: $245</p>
            <p>
              Demand: <span className="text-green-400">HIGH</span>
            </p>
            <p>58 pairs sold in last 30 days</p>
          </div>
        </motion.div>
      </section>

      {/* WAITLIST */}
      <section className="py-32 px-6 bg-gradient-to-t from-black to-zinc-900 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-8"
        >
          Get Early Access
        </motion.h2>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-green-500"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <p className="text-green-400 text-xl font-semibold">
            You're on the list 👟🔥
          </p>
        )}
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-zinc-600 text-sm border-t border-zinc-800">
        © {new Date().getFullYear()} SneakPrice. All rights reserved.
      </footer>
    </div>
  );
}
