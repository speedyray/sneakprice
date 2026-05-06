import { NextResponse } from "next/server";
import { AlertKind } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/current-user";
import { isPaid, FREE_TIER_RULE_CAP } from "@/lib/subscription";

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

  const effectiveCap = isPaid(user.subscriptionTier) ? null : FREE_TIER_RULE_CAP;
  return NextResponse.json({ rules, recentEvents, ruleCap: effectiveCap });
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
    const activeCount = await prisma.alertRule.count({
      where: { userId: user.id, active: true },
    });
    if (activeCount >= FREE_TIER_RULE_CAP) {
      return NextResponse.json(
        {
          error: "rule-cap-reached",
          message: `Free tier supports ${FREE_TIER_RULE_CAP} active alerts. Upgrade to Pro for unlimited alerts.`,
        },
        { status: 402 }
      );
    }
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
