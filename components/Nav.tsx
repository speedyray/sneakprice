"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Nav() {
  const pathname = usePathname();
  const { user } = useUser();
  const signedInUserName =
    user?.fullName ?? user?.username ?? user?.primaryEmailAddress?.emailAddress?.split("@")[0] ?? null;

  const showHomeLink =
    pathname === "/app" ||
    pathname === "/buyer" ||
    pathname === "/discover" ||
    pathname.startsWith("/marketplace") ||
    pathname.startsWith("/login");
  const isDiscoverPage = pathname === "/discover";
  const isBuyerPage = pathname === "/buyer";

  return (
    <nav
      className="w-full flex flex-col gap-3 border-b border-black/10 bg-[#eee8df] px-6 py-4 text-black md:flex-row md:items-center md:justify-between md:gap-0"
    >
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
          <span
            className="rounded-full border border-emerald-600/20 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-700"
          >
            {signedInUserName}
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-6">
        {showHomeLink ? <Link href="/">Home</Link> : null}
        <Link href="/app">Scan</Link>
        {!isDiscoverPage ? <Link href="/discover">Discover</Link> : null}
        {signedInUserName ? (
          isBuyerPage ? null : <Link href="/buyer">Buyer portal</Link>
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
            className="text-black"
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
