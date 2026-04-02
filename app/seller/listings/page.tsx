import SellerShell from "@/components/seller/SellerShell";
import SellerPageTitle from "@/components/seller/SellerPageTitle";

export default function SellerListingsPage() {
  return (
    <SellerShell>
      <SellerPageTitle
        title="Listings"
        subtitle="Manage active, held, sold, and draft listings."
      />

      <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
        <h3 className="text-lg font-semibold text-white">Listings coming soon</h3>
        <p className="mt-2 text-sm text-neutral-400">
          This section will manage marketplace listings and relisting actions.
        </p>
      </div>
    </SellerShell>
  );
}