"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Search } from "lucide-react";

export default function Nav() {
  const pathname = usePathname();
  const { user } = useUser();

  const signedInUserName =
    user?.fullName ??
    user?.username ??
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ??
    null;

  const isHomePage = pathname === "/";
  const linkClass = (active: boolean) =>
    active
      ? "font-semibold text-black"
      : "text-black/75 transition hover:text-black";

  return (
    <nav className="relative z-40 w-full border-b border-black/10 bg-[#eee8df] px-6 py-4 text-black">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/sneakprice-logo.png"
              alt="SneakPrice"
              width={32}
              height={32}
            />
            <span className="text-lg font-bold">SneakPrice</span>
          </Link>

          {signedInUserName ? (
            <span className="rounded-full border border-emerald-600/20 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-700">
              {signedInUserName}
            </span>
          ) : null}
        </div>


        <form
  action="/search"
  className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-4 w-full md:max-w-[1200px]"
>
  <Search className="h-4 w-4 text-neutral-500" />
  <input
    type="text"
    name="q"
    placeholder="Search sneakers, brands, colorways..."
    className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
  />
</form>


        <div className="flex flex-wrap items-center gap-6">

         <Link href="/news">News</Link>

          <Link href="/" className={linkClass(isHomePage)}>
            Home
          </Link>


          {!signedInUserName ? (
            <Link href="/login" className="text-black">
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
      </div>
    </nav>
  );
}
