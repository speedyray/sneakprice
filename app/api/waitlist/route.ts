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

    // Admin notification — until a sending domain is verified in Resend, the
    // sandbox `onboarding@resend.dev` only delivers to the Resend account owner's
    // address. So we route every signup to that inbox as a "new signup" ping
    // instead of a subscriber welcome. Once `sneakpriceapp.com` is verified in
    // Resend → switch `to: email` and rewrite the body as a real welcome.
    await resend.emails.send({
      from: "SneakPrice <onboarding@resend.dev>",
      to: "zoomzoom@gmx.com",
      subject: `New SneakPrice signup: ${email}`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>New waitlist signup 👟</h2>
          <p><strong>${email}</strong> just joined the SneakPrice waitlist.</p>
          <p>Full list lives in Supabase → <code>waitlist</code> table.</p>
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
