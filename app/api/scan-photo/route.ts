import { NextResponse } from "next/server";
import OpenAI from "openai";
import sharp from "sharp";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Sneaker scanning is coming soon." },
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

    const compressedBuffer = await sharp(buffer)
      .resize({ width: 800 })
      .jpeg({ quality: 70 })
      .toBuffer();

    const base64 = compressedBuffer.toString("base64");

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are a sneaker identification expert. Identify the exact sneaker model name in the image. Return only the sneaker name.",
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Identify this sneaker model.",
            },
            {
              type: "input_image",
              image_url: `data:image/jpeg;base64,${base64}`,
              detail: "high",
            },
          ],
        },
      ],
    });

    const sneakerName = response.output_text?.trim();

    if (!sneakerName) {
      return NextResponse.json(
        { error: "No sneaker could be identified from this image." },
        { status: 422 }
      );
    }

    return NextResponse.json({ sneakerName });
  } catch (err) {
    console.error("Scan error:", err);
    const message = err instanceof Error ? err.message : "Scan failed";
    const isQuotaError =
      message.includes("429") ||
      message.toLowerCase().includes("quota") ||
      message.toLowerCase().includes("billing");

    return NextResponse.json(
      {
        error: isQuotaError
          ? "Sneaker scanning is temporarily unavailable because the OpenAI API quota has been exceeded."
          : process.env.NODE_ENV === "development"
            ? message
            : "Scan failed",
      },
      { status: isQuotaError ? 429 : 500 }
    );
  }
}
