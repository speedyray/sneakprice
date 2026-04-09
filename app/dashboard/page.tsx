import { redirect } from "next/navigation";
import { getCurrentDbUser } from "@/lib/current-user";

export default async function DashboardPage() {
  const currentUser = await getCurrentDbUser();

  if (!currentUser) {
    redirect("/login?redirect_url=/dashboard");
  }

  if (currentUser.role === "ADMIN") {
    redirect("/admin");
  }

  redirect("/");
}
