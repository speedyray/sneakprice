import type { ReactNode } from "react";
import SellerSidebar from "@/components/seller/SellerSidebar";
import SellerHeader from "@/components/seller/SellerHeader";



export default function SellerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex min-h-screen">
        <SellerSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <SellerHeader />

          <main className="flex-1 overflow-x-hidden">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}