import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import { ClerkProvider } from "@clerk/nextjs";



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
        <body className="antialiased">
          <Nav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
