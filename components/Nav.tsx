import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex justify-between p-4 shadow-md">
      <Link href="/" className="font-bold">
        SneakPrice
      </Link>

      <div className="space-x-4">
        <Link href="/">Scan</Link>
        <Link href="/history">History</Link>
      </div>
    </nav>
  );
}
