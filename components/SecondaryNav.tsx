"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const encyclopediaItems = [
  { label: "Nike", href: "/encyclopedia/nike" },
  { label: "Adidas / Yeezy", href: "/encyclopedia/adidas" },
  { label: "Jordan Brand", href: "/encyclopedia/jordan" },
  { label: "New Balance", href: "/encyclopedia/new-balance" },
  { label: "Asics", href: "/encyclopedia/asics" },
  { label: "Puma", href: "/encyclopedia/puma" },
];

const careGuideItems = [
  { label: "Cleaning Tips", href: "/care/cleaning" },
  { label: "Storage & Protection", href: "/care/storage" },
  { label: "Deodorizing", href: "/care/deodorizing" },
  { label: "Sole Restoration", href: "/care/sole-restoration" },
  { label: "Crease Prevention", href: "/care/crease-prevention" },
];

function DropdownMenu({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 text-base text-black transition hover:text-black/60">
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-md border border-black/10 bg-white py-1 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-base text-[#7c2d2d] transition hover:bg-black/5 hover:text-black"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SecondaryNav() {
  return (
    <nav className="w-full border-b border-black/10 bg-white px-6 py-3">
      <div className="flex items-center justify-center gap-10">
        <Link
          href="/"
          className="text-base text-black transition hover:text-black/60"
        >
          Home
        </Link>

        <DropdownMenu label="Sneaker Encyclopedia" items={encyclopediaItems} />

        <DropdownMenu label="Sneaker Care Guide" items={careGuideItems} />

        <Link
          href="/identify"
          className="text-base text-black transition hover:text-black/60"
        >
          Identify Sneakers
        </Link>

        <Link
          href="/blog"
          className="text-base text-black transition hover:text-black/60"
        >
          Sneaker Blogs
        </Link>
      </div>
    </nav>
  );
}
