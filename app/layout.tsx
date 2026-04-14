import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import SecondaryNav from "../components/SecondaryNav";
import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "@/contexts/LanguageContext";



export const metadata: Metadata = {
  title: "SneakPrice",
  description: "Sneaker Market Intelligence Platform",
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
