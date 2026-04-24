import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";

const CV_API_URL = process.env.SNEAKER_CV_API_URL;
const CV_MIN_CONFIDENCE = 0.15;
const CV_TIMEOUT_MS = 4000;

// First-match-wins, ordered so more-specific prefixes precede the brands that
// contain them (e.g. "Air Jordan" → Jordan, not Nike). Lowercased substring
// match against the identified sneaker name.
const BRAND_PATTERNS: Array<[needle: string, canonical: string]> = [
  ["air jordan", "Jordan"],
  ["jordan", "Jordan"],
  ["new balance", "New Balance"],
  ["adidas", "Adidas"],
  ["yeezy", "Yeezy"],
  ["nike", "Nike"],
  ["converse", "Converse"],
  ["asics", "ASICS"],
  ["vans", "Vans"],
  ["puma", "Puma"],
  ["reebok", "Reebok"],
  ["hoka", "Hoka"],
  ["salomon", "Salomon"],
  ["balenciaga", "Balenciaga"],
  ["on cloud", "On"],
  ["on running", "On"],
];

function extractBrand(sneakerName: string): string | null {
  const lower = sneakerName.toLowerCase();
  for (const [needle, canonical] of BRAND_PATTERNS) {
    if (lower.includes(needle)) return canonical;
  }
  return null;
}

function formatClassName(cls: string): string {
  return cls
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

interface CvResult {
  name: string;
  confidence: number; // 0..1
}

async function tryCvServer(file: File): Promise<CvResult | null> {
  if (!CV_API_URL) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CV_TIMEOUT_MS);

  try {
    const cvForm = new FormData();
    cvForm.append("file", file);

    const cvResponse = await fetch(`${CV_API_URL}/predict`, {
      method: "POST",
      body: cvForm,
      signal: controller.signal,
    });

    if (!cvResponse.ok) {
      console.warn(`CV server returned ${cvResponse.status}, falling back to Gemini`);
      return null;
    }

    const cvData = (await cvResponse.json()) as {
      predictions?: { class: string; confidence: number }[];
    };
    const top = cvData.predictions?.[0];
    if (!top || top.confidence < CV_MIN_CONFIDENCE) return null;

    const rawName = formatClassName(top.class);
    const name = rawName.toLowerCase().includes("sneaker") ? rawName : `${rawName} sneakers`;
    return { name, confidence: top.confidence };
  } catch (err) {
    console.warn("CV server unreachable, falling back to Gemini:", err instanceof Error ? err.message : err);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function tryGemini(file: File): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const compressedBuffer = await sharp(buffer)
    .resize({ width: 800, withoutEnlargement: true })
    .jpeg({ quality: 70 })
    .toBuffer();
  const base64 = compressedBuffer.toString("base64");

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
    console.error(`Gemini API error ${geminiResponse.status}:`, errText.slice(0, 300));
    throw new Error(`Gemini API error ${geminiResponse.status}`);
  }

  const geminiData = (await geminiResponse.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  return geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? null;
}

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

    const cvResult = await tryCvServer(file);
    const sneakerName = cvResult?.name ?? (await tryGemini(file));

    if (!sneakerName) {
      return NextResponse.json(
        { error: "No sneaker could be identified from this image." },
        { status: 422 }
      );
    }

    // Record the scan for analytics (trending, stats). Fire-and-forget so a DB
    // hiccup doesn't block the user's response.
    const confidence = cvResult
      ? Math.min(100, Math.round(cvResult.confidence * 100))
      : null;
    prisma.scan
      .create({
        data: {
          model: sneakerName,
          brand: extractBrand(sneakerName),
          confidence,
        },
      })
      .catch((err) =>
        console.warn(
          "[scan-photo] scan record insert failed:",
          err instanceof Error ? err.message : err,
        ),
      );

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
            : "Scan failed. Please try again.",
      },
      { status: isRateLimit ? 429 : 500 }
    );
  }
}
