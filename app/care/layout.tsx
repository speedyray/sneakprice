import CareGuideSidebar from "@/components/CareGuideSidebar";

export default function CareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:flex sm:gap-10 sm:px-6">
        <CareGuideSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
