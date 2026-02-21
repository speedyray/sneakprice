import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

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
You are a sneaker authentication and identification expert.

Identify the sneaker in the image.

Return ONLY valid JSON in this format:

{
  "brand": "",
  "model": "",
  "colorway": "",
  "release_year": "",
  "confidence": 0
}

Confidence must be 0-100.
If unsure, still give best guess but lower confidence.
No extra text.
          `,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Identify this sneaker." },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const result = response.choices[0].message.content;

    return NextResponse.json(JSON.parse(result!));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Scan failed" },
      { status: 500 }
    );
  }
}
