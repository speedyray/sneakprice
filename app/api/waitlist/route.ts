import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Joined waitlist 🎉" });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
