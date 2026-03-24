"use client";

import { useEffect, useMemo, useState } from "react";

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function LiveListingBadge({ baseSold }: { baseSold: number }) {
  const [sold, setSold] = useState(baseSold);
  const [watching, setWatching] = useState(randomBetween(5, 18));
  const [minutesAgo, setMinutesAgo] = useState(randomBetween(1, 12));
  const startValue = useMemo(() => baseSold, [baseSold]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSold(startValue + randomBetween(-2, 7));
      setWatching(randomBetween(3, 24));
      setMinutesAgo((prev) => (prev % 12) + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [startValue]);

  const highlight = useMemo(() => `${watching} watching`, [watching]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-300">
      <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[0.6rem] text-emerald-200">
        Sold {sold}
      </span>
      <span className="rounded-full border border-white/10 bg-black/60 px-2 py-1 text-[0.55rem]">
        {minutesAgo} min ago
      </span>
      <span className="rounded-full border border-neutral-700 bg-neutral-900/60 px-2 py-1 text-[0.55rem]">
        {highlight}
      </span>
    </div>
  );
}
