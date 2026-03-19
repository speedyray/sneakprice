import Link from "next/link";
import Image from "next/image";
import { getSignedInUser } from "@/lib/session";

export default async function Nav() {
  const signedInUser = await getSignedInUser();

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
        {signedInUser ? (
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-300">
            {signedInUser.name}
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-6">
        <Link href="/">Home</Link>
        <Link href="/app">Scan</Link>
        <Link href="/marketplace">Marketplace</Link>
        {signedInUser ? (
          <Link href="/buyer">Buyer portal</Link>
        ) : null}
        <Link
          href="/signin"
          className="text-sm uppercase tracking-[0.3em] text-emerald-300"
        >
          {signedInUser ? "Switch Identity" : "Sign in"}
        </Link>
      </div>
    </nav>
  );
}
