import SellerShell from "@/components/seller/SellerShell";
import SellerPageTitle from "@/components/seller/SellerPageTitle";

export default function SellerPackagesPage() {
  return (
    <SellerShell>
      <SellerPageTitle
        title="Packages"
        subtitle="Track shipping labels, delivery progress, and package status."
      />

      <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
        <h3 className="text-lg font-semibold text-white">Packages coming soon</h3>
        <p className="mt-2 text-sm text-neutral-400">
          This section will handle order fulfillment and shipment tracking.
        </p>
      </div>
    </SellerShell>
  );
}