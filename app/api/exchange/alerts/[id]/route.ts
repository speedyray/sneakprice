import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/current-user";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  const user = await getCurrentDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { active, label, threshold } = body as {
    active?: boolean;
    label?: string | null;
    threshold?: number;
  };

  const existing = await prisma.alertRule.findFirst({
    where: { id, userId: user.id },
    select: { id: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const data: {
    active?: boolean;
    label?: string | null;
    threshold?: number;
  } = {};
  if (typeof active === "boolean") data.active = active;
  if (label === null || typeof label === "string") {
    data.label = label === null ? null : label.slice(0, 200);
  }
  if (typeof threshold === "number" && Number.isFinite(threshold)) {
    data.threshold = threshold;
  }

  const rule = await prisma.alertRule.update({ where: { id }, data });
  return NextResponse.json({ rule });
}

export async function DELETE(_req: Request, { params }: Params) {
  const user = await getCurrentDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const existing = await prisma.alertRule.findFirst({
    where: { id, userId: user.id },
    select: { id: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.alertRule.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
