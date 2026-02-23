import { createClient } from "@supabase/supabase-js";

export default async function AdminPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: scans } = await supabase
    .from("scans")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: waitlist } = await supabase
    .from("waitlist")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Total Scans: {scans?.length}
        </h2>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Waitlist Emails: {waitlist?.length}
        </h2>
      </div>
    </div>
  );
}
