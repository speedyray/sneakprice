import { createClient } from "@supabase/supabase-js";

export default async function HistoryPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from("scans")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Scan History</h1>

      {data?.map((scan) => (
        <div
          key={scan.id}
          className="bg-white shadow-md rounded-xl p-4 mb-4"
        >
          <p><strong>Brand:</strong> {scan.brand}</p>
          <p><strong>Model:</strong> {scan.model}</p>
          <p><strong>Colorway:</strong> {scan.colorway}</p>
          <p><strong>Confidence:</strong> {scan.confidence}%</p>
        </div>
      ))}
    </div>
  );
}
