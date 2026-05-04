import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import SecondaryNav from "../components/SecondaryNav";
import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "@/contexts/LanguageContext";



export const metadata: Metadata = {
  metadataBase: new URL("https://sneakpriceapp.com"),
  title: "SneakPrice",
  description: "Sneaker Market Intelligence Platform",
  // Explicit allow so Google can drop the cached "noindex" verdict from
  // an earlier crawl (likely from pre-launch / Vercel deployment-protection
  // era). Pages that should NOT be indexed (admin, dashboard, /api) are
  // gated by Clerk middleware and don't need to override this.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased" style={{ backgroundColor: "#e8e4c8" }}>
          <LanguageProvider>
            <Nav />
            <SecondaryNav />
            {children}
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
