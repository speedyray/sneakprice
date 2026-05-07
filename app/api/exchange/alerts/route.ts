import { NextResponse } from "next/server";
import { AlertKind } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/current-user";
import { isPaid } from "@/lib/subscription";

const ALLOWED_KINDS: AlertKind[] = [
  "PRICE_BELOW",
  "PRICE_ABOVE",
  "DEAL_MARGIN_OVER",
  "INDEX_MOVE_OVER",
];

export async function GET() {
  const user = await getCurrentDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isPaid(user.subscriptionTier)) {
    return NextResponse.json(
      {
        error: "upgrade-required",
        message: "Alerts are a Pro feature. Upgrade to set price, margin, and index alerts.",
      },
      { status: 402 }
    );
  }

  const [rules, recentEvents] = await Promise.all([
    prisma.alertRule.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.alertEvent.findMany({
      where: { rule: { userId: user.id } },
      orderBy: { triggeredAt: "desc" },
      take: 20,
      include: {
        rule: { select: { id: true, kind: true, target: true, label: true } },
      },
    }),
  ]);

  return NextResponse.json({ rules, recentEvents, ruleCap: null });
}

export async function POST(req: Request) {
  const user = await getCurrentDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { kind, target, threshold, label } = body as {
    kind?: string;
    target?: string;
    threshold?: number;
    label?: string;
  };

  if (!kind || !ALLOWED_KINDS.includes(kind as AlertKind)) {
    return NextResponse.json({ error: "Invalid kind" }, { status: 400 });
  }
  if (!target || typeof target !== "string" || target.length > 100) {
    return NextResponse.json({ error: "Invalid target" }, { status: 400 });
  }
  if (typeof threshold !== "number" || !Number.isFinite(threshold)) {
    return NextResponse.json({ error: "Invalid threshold" }, { status: 400 });
  }

  if (!isPaid(user.subscriptionTier)) {
    return NextResponse.json(
      {
        error: "upgrade-required",
        message: "Alerts are a Pro feature. Upgrade to set price, margin, and index alerts.",
      },
      { status: 402 }
    );
  }

  const rule = await prisma.alertRule.create({
    data: {
      userId: user.id,
      kind: kind as AlertKind,
      target,
      threshold,
      label: label?.toString().slice(0, 200) ?? null,
    },
  });

  return NextResponse.json({ rule }, { status: 201 });
}
