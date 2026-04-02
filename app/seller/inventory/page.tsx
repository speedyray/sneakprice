import SellerShell from "@/components/seller/SellerShell";
import SellerPageTitle from "@/components/seller/SellerPageTitle";

export default function SellerInventoryPage() {
  return (
    <SellerShell>
      <SellerPageTitle
        title="Inventory"
        subtitle="Track what you own, what it cost, and what it is worth now."
      />

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-white/10 text-neutral-400">
              <tr>
                <th className="px-4 py-3 font-medium">Sneaker</th>
                <th className="px-4 py-3 font-medium">Purchase</th>
                <th className="px-4 py-3 font-medium">Market Value</th>
                <th className="px-4 py-3 font-medium">Unrealized Profit</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-200">
              <tr>
                <td className="px-4 py-4">Air Jordan 1 Chicago</td>
                <td className="px-4 py-4">$220</td>
                <td className="px-4 py-4">$340</td>
                <td className="px-4 py-4 text-lime-400">+$120</td>
                <td className="px-4 py-4">In Inventory</td>
              </tr>
              <tr>
                <td className="px-4 py-4">Yeezy Boost 350 V2 Zebra</td>
                <td className="px-4 py-4">$180</td>
                <td className="px-4 py-4">$260</td>
                <td className="px-4 py-4 text-lime-400">+$80</td>
                <td className="px-4 py-4">Listed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SellerShell>
  );
}