import SellerShell from "@/components/seller/SellerShell";
import SellerPageTitle from "@/components/seller/SellerPageTitle";

export default function SellerSalesPage() {
  return (
    <SellerShell>
      <SellerPageTitle
        title="Sales"
        subtitle="View completed sneaker sales, payouts, and net profit."
      />

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-white/10 text-neutral-400">
              <tr>
                <th className="px-4 py-3 font-medium">Sneaker</th>
                <th className="px-4 py-3 font-medium">Platform</th>
                <th className="px-4 py-3 font-medium">Sold Price</th>
                <th className="px-4 py-3 font-medium">Fees</th>
                <th className="px-4 py-3 font-medium">Shipping</th>
                <th className="px-4 py-3 font-medium">Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-200">
              <tr>
                <td className="px-4 py-4">Nike Dunk Low Panda</td>
                <td className="px-4 py-4">eBay</td>
                <td className="px-4 py-4">$180</td>
                <td className="px-4 py-4">$18</td>
                <td className="px-4 py-4">$14</td>
                <td className="px-4 py-4 text-lime-400">+$42</td>
              </tr>
              <tr>
                <td className="px-4 py-4">Air Jordan 4 Bred</td>
                <td className="px-4 py-4">GOAT</td>
                <td className="px-4 py-4">$310</td>
                <td className="px-4 py-4">$31</td>
                <td className="px-4 py-4">$16</td>
                <td className="px-4 py-4 text-lime-400">+$73</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SellerShell>
  );
}