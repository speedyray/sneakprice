import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { getMaxAge } from "next/dist/server/image-optimizer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    // Handle duplicate email
    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "Already on waitlist" },
          { status: 400 }
        );
      }
      throw error;
    }

    // 🔥 SEND CONFIRMATION EMAIL
    await resend.emails.send({
      from: "SneakPrice <onboarding@resend.dev>",
      to: "zoomzoom@gmx.com",
      subject: "You're on the SneakPrice Waitlist 👟",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Welcome to SneakPrice 👟</h2>
          <p>You’re officially on the early access list.</p>
          <p>When we launch resale pricing, you’ll be the first to know.</p>
          <br/>
          <p>– SneakPrice Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
