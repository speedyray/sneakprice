import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/current-user";
import { SYMBOLS } from "@/lib/exchange/catalog";
import { INDEXES } from "@/lib/exchange/indexes";
import AlertsManager from "@/components/exchange/AlertsManager";

const FREE_TIER_RULE_CAP = 3;

export const metadata = {
  title: "Alerts | SneakPrice Exchange",
  description: "Configure price, margin, and index movement alerts.",
};

export const dynamic = "force-dynamic";

export default async function AlertsPage() {
  const user = await getCurrentDbUser();
  if (!user) redirect("/sign-in?redirect_url=/exchange/alerts");

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

  const symbolOptions = SYMBOLS.map((s) => ({
    value: s.symbol,
    label: `${s.symbol} — ${s.display}`,
  }));
  const indexOptions = INDEXES.map((i) => ({
    value: i.symbol,
    label: `${i.symbol} — ${i.name}`,
  }));

  return (
    <AlertsManager
      initialRules={rules.map((r) => ({
        ...r,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
        lastTriggeredAt: r.lastTriggeredAt?.toISOString() ?? null,
      }))}
      initialEvents={recentEvents.map((e) => ({
        id: e.id,
        triggeredAt: e.triggeredAt.toISOString(),
        observedValue: e.observedValue,
        notifiedAt: e.notifiedAt?.toISOString() ?? null,
        rule: e.rule,
      }))}
      symbolOptions={symbolOptions}
      indexOptions={indexOptions}
      ruleCap={FREE_TIER_RULE_CAP}
    />
  );
}
