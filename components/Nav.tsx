"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-black text-white">

      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/sneakprice-logo.png"
          alt="SneakPrice"
          width={32}
          height={32}
        />
        <span className="font-bold text-lg">SneakPrice</span>
      </Link>

      <div className="flex gap-6 items-center">

        {pathname === "/" && (
          <Link
            href="/login"
            className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:opacity-90 transition"
          >
            Login or Sign Up
          </Link>
        )}

        {pathname !== "/" && (
          <Link
            href="/"
            className="hover:text-green-400 transition"
          >
            Home
          </Link>
        )}

        <Link href="/app" className="hover:text-green-400 transition">
          Scan
        </Link>

        <UserButton />

      </div>
    </nav>
  );
}