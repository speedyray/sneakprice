import SellerShell from "@/components/seller/SellerShell";
import SellerPageTitle from "@/components/seller/SellerPageTitle";

export default function SellerExpensesPage() {
  return (
    <SellerShell>
      <SellerPageTitle
        title="Expenses"
        subtitle="Track fees, shipping costs, packaging, and selling overhead."
      />

      <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
        <h3 className="text-lg font-semibold text-white">Expenses coming soon</h3>
        <p className="mt-2 text-sm text-neutral-400">
          This section will give you cleaner real profit tracking.
        </p>
      </div>
    </SellerShell>
  );
}