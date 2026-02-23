import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a sneaker identification expert.
Return ONLY valid JSON:
{
  "brand": "",
  "model": "",
  "colorway": "",
  "confidence": 0
}
Confidence must be 0-100.
          `,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Identify this sneaker." },
            {
              type: "image_url",
              image_url: { url: image },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const parsed = JSON.parse(
      response.choices[0].message.content!
    );

    // 🔥 SAVE TO SUPABASE
    await supabase.from("scans").insert([
      {
        brand: parsed.brand,
        model: parsed.model,
        colorway: parsed.colorway,
        confidence: parsed.confidence,
      },
    ]);

    return NextResponse.json(parsed);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Scan failed" },
      { status: 500 }
    );
  }
}
