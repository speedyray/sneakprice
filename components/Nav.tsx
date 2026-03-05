import Link from "next/link";
import Image from "next/image";

export default function Nav() {
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

      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/app">Scan</Link>
      </div>

    </nav>
  );
}