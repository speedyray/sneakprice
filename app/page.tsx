import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-extrabold mb-6">
        Turn Your <span className="text-green-500">Sneakers</span> <br />
        Into Instant Market Value.
      </h1>

      <p className="text-gray-400 text-lg max-w-2xl mb-10">
        Scan any sneaker. Get real resale value based on verified sold listings.
        No guessing. No hype. Just data.
      </p>

      <div className="flex gap-4">
        <Link
          href="/app"
          className="bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-xl font-semibold transition"
        >
          Scan a Sneaker
        </Link>

        <button className="border border-gray-600 px-8 py-4 rounded-xl hover:bg-gray-800 transition">
          Join Early Access
        </button>
      </div>

      <p className="text-gray-500 text-sm mt-6">
        Free 3 scans per day • No credit card required
      </p>
    </div>
  );
}
