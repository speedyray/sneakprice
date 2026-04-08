import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import sharp from "sharp";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

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

    const base64 = compressedBuffer.toString("base64");
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Scan is not configured." }, { status: 503 });
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: "Identify the exact sneaker brand and model name in this image. Return only the sneaker name, nothing else." },
                { inline_data: { mime_type: "image/jpeg", data: base64 } },
              ],
            },
          ],
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error(`Gemini API error ${geminiResponse.status}:`, errText.slice(0, 500));
      throw new Error(`Gemini API error ${geminiResponse.status}: ${errText.slice(0, 200)}`);
    }

    const geminiData = await geminiResponse.json() as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };

    const sneakerName = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

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
    const isRateLimit = message.includes("429") || message.toLowerCase().includes("quota");

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
