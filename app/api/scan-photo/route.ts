import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import sharp from "sharp";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const compressedBuffer = await sharp(buffer)
      .resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 70 })
      .toBuffer();

    const hf = new HfInference(process.env.HF_TOKEN ?? undefined);

    const arrayBuffer = compressedBuffer.buffer.slice(
      compressedBuffer.byteOffset,
      compressedBuffer.byteOffset + compressedBuffer.byteLength
    ) as ArrayBuffer;
    const imageBlob = new Blob([arrayBuffer], { type: "image/jpeg" });

    const result = await hf.visualQuestionAnswering({
      model: "Salesforce/blip-vqa-base",
      inputs: {
        image: imageBlob,
        question: "What is the brand and model name of these sneakers?",
      },
    });

    const sneakerName = result.answer?.trim();

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
    const isRateLimit = message.includes("429") || message.toLowerCase().includes("rate limit");

    return NextResponse.json(
      {
        error: isRateLimit
          ? "Sneaker scanning is temporarily unavailable. Please try again in a moment."
          : process.env.NODE_ENV === "development"
            ? message
            : "Scan failed",
      },
      { status: isRateLimit ? 429 : 500 }
    );
  }
}