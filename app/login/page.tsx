"use client";

import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white rounded-xl shadow-lg p-10 w-[420px] text-center">

        <h1 className="text-2xl font-bold mb-6">
          SneakPrice
        </h1>

        {/* Google */}
        <button className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 mb-4 hover:bg-gray-50 transition">

<svg width="18" height="18" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
<path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.2 6.3 14.7z"/>
<path fill="#4CAF50" d="M24 44c5.1 0 9.8-1.9 13.4-5.1l-6.2-5.1C29.2 36 26.7 37 24 37c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C9.6 39.7 16.3 44 24 44z"/>
<path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.9-3 5.3-5.7 6.9l6.2 5.1C39.8 36.7 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"/>
</svg>

Continue with Google
</button>

        {/* Apple */}
        <button className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 mb-6 hover:bg-gray-50 transition">

<svg width="18" height="18" viewBox="0 0 24 24" fill="black">
<path d="M16.365 1.43c0 1.14-.43 2.19-1.14 2.95-.75.8-1.97 1.42-3.03 1.33-.13-1.09.43-2.25 1.11-2.98.76-.82 2.06-1.45 3.06-1.3zM20.7 17.4c-.59 1.34-.87 1.93-1.62 3.07-1.05 1.6-2.52 3.6-4.34 3.62-1.62.02-2.04-1.06-4.23-1.05-2.19.01-2.65 1.07-4.27 1.05-1.82-.02-3.21-1.84-4.26-3.44C.94 18.8.04 15.5 1.27 13.39c.87-1.48 2.46-2.41 4.16-2.43 1.6-.03 3.11 1.09 4.23 1.09 1.12 0 3.02-1.35 5.1-1.15.87.04 3.3.35 4.86 2.64-.12.07-2.9 1.7-2.92 5.06-.03 4.01 3.51 5.34 3.54 5.35-.03.09-.56 1.94-1.54 3.45z"/>
</svg>

Continue with Apple
</button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter email"
          className="w-full border rounded-lg px-4 py-3 mb-4"
        />

        <button className="w-full bg-gray-400 text-white rounded-lg py-3 font-semibold">
          Continue
        </button>

        <p className="text-xs text-gray-500 mt-6">
          By clicking "Continue", you agree to our Terms of Use & Privacy Policy.
        </p>

      </div>

    </div>
  );
}