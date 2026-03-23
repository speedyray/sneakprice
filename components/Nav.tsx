"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Nav() {
  const pathname = usePathname();
  const { user } = useUser();
  const [isScanLoginReturn, setIsScanLoginReturn] = useState(false);
  const signedInUserName =
    user?.fullName ?? user?.username ?? user?.primaryEmailAddress?.emailAddress?.split("@")[0] ?? null;

  useEffect(() => {
    if (pathname.startsWith("/login")) {
      const params = new URLSearchParams(window.location.search);
      setIsScanLoginReturn(params.get("redirect_url") === "/app");
      return;
    }

    setIsScanLoginReturn(false);
  }, [pathname]);

  const showHomeLink =
    pathname === "/app" ||
    pathname === "/discover" ||
    pathname.startsWith("/marketplace") ||
    (pathname.startsWith("/login") && isScanLoginReturn);

  return (
    <nav className="w-full flex flex-col gap-3 border-b border-white/10 bg-black/80 px-6 py-4 text-white md:flex-row md:items-center md:justify-between md:gap-0">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/sneakprice-logo.png"
            alt="SneakPrice"
            width={32}
            height={32}
          />
          <span className="font-bold text-lg">SneakPrice</span>
        </Link>
        {signedInUserName ? (
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-300">
            {signedInUserName}
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-6">
        {showHomeLink ? <Link href="/">Home</Link> : null}
        <Link href="/app">Scan</Link>
        <Link href="/discover">Discover</Link>
        {signedInUserName ? (
          <Link href="/buyer">Buyer portal</Link>
        ) : null}
        {signedInUserName ? (
          <Link href="/marketplace/my-listings">My listings</Link>
        ) : null}
        {signedInUserName ? (
          <Link href="/marketplace/sell">Create listing</Link>
        ) : null}
        {!signedInUserName ? (
          <Link
            href="/login"
            className="text-emerald-300"
          >
            Login / Sign Up
          </Link>
        ) : (
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "h-8 w-8",
              },
            }}
          />
        )}
      </div>
    </nav>
  );
}
