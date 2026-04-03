import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getCurrentDbUser } from "@/lib/current-user";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const currentUser = await getCurrentDbUser();

  if (!currentUser) {
    redirect("/login?redirect_url=/dashboard");
  }

  if (currentUser.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <main className="flex-1 overflow-x-hidden bg-neutral-50">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
