import { NextResponse } from "next/server";
import OpenAI from "openai";
import sharp from "sharp";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {

    if (process.env.SITE_LIVE !== "true") {
      return NextResponse.json(
        { error: "Scanning not available yet." },
        { status: 403 }
      );
    }
    
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

  // Resize + compress
   const compressedBuffer = await sharp(buffer)
  .resize({ width: 800 }) // max width 800px
  .jpeg({ quality: 70 })
  .toBuffer();

 const base64 = compressedBuffer.toString("base64");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a sneaker identification expert. Identify the exact sneaker model name in the image. Return only the sneaker name.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Identify this sneaker model.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${file.type};base64,${base64}`,
              },
            },
          ],
        },
      ],
    });

    const sneakerName = response.choices[0].message.content?.trim();

    return NextResponse.json({ sneakerName });
  } catch (err) {
    console.error("Scan error:", err);
    return NextResponse.json({ error: "Scan failed" }, { status: 500 });
  }
}
