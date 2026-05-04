import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ALERT_FROM, deliveryAddress, getResend } from "@/lib/resend";

// Alert evaluator. Runs after captureSnapshots() + aggregateIndexes() in the
// hourly cron tick. For each active rule, computes the observed value, checks
// the threshold, and writes an AlertEvent if it fires AND the rule wasn't
// triggered within the debounce window (12h).
//
// Phase 1 kinds:
//   PRICE_BELOW / PRICE_ABOVE  → MarketSnapshot.median for `target` symbol
//   INDEX_MOVE_OVER            → IndexSnapshot.dayChangePct (abs) for `target` index
//   DEAL_MARGIN_OVER           → Deal.profitMargin since last trigger; target="*" any
//
// Threshold semantics: dollars for PRICE_*, percent for *_OVER kinds.

const DEBOUNCE_MS = 12 * 60 * 60 * 1000;

export type EvaluateResult = {
  evaluatedAt: string;
  rulesEvaluated: number;
  fired: number;
  emailed: number;
  durationMs: number;
};

type Snapshot = { median: number; capturedAt: Date };
type IndexLatest = {
  level: number;
  dayChangePct: number | null;
  capturedAt: Date;
};

async function latestSnapshot(symbol: string): Promise<Snapshot | null> {
  return prisma.marketSnapshot.findFirst({
    where: { symbol },
    orderBy: { capturedAt: "desc" },
    select: { median: true, capturedAt: true },
  });
}

async function latestIndex(indexSymbol: string): Promise<IndexLatest | null> {
  return prisma.indexSnapshot.findFirst({
    where: { indexSymbol },
    orderBy: { capturedAt: "desc" },
    select: { level: true, dayChangePct: true, capturedAt: true },
  });
}

async function newestQualifyingDeal(
  target: string,
  threshold: number,
  since: Date
): Promise<{
  id: string;
  sneaker: string | null;
  profitMargin: number;
  buyPrice: number | null;
  sellPrice: number | null;
  buyUrl: string | null;
} | null> {
  const where: Prisma.DealWhereInput = {
    isActive: true,
    profitMargin: { gt: threshold },
    created_at: { gt: since },
  };
  if (target !== "*") {
    where.sneaker = { contains: target, mode: "insensitive" };
  }
  const deal = await prisma.deal.findFirst({
    where,
    orderBy: { profitMargin: "desc" },
    select: {
      id: true,
      sneaker: true,
      profitMargin: true,
      buyPrice: true,
      sellPrice: true,
      buyUrl: true,
    },
  });
  if (!deal || deal.profitMargin === null) return null;
  return { ...deal, profitMargin: deal.profitMargin };
}

type FiringContext = {
  observedValue: number;
  payload: Record<string, unknown>;
};

async function evaluateRule(
  rule: {
    id: string;
    kind: string;
    target: string;
    threshold: number;
    lastTriggeredAt: Date | null;
    createdAt: Date;
  }
): Promise<FiringContext | null> {
  switch (rule.kind) {
    case "PRICE_BELOW": {
      const snap = await latestSnapshot(rule.target);
      if (!snap) return null;
      if (snap.median >= rule.threshold) return null;
      return {
        observedValue: snap.median,
        payload: { kind: rule.kind, symbol: rule.target, median: snap.median, capturedAt: snap.capturedAt },
      };
    }
    case "PRICE_ABOVE": {
      const snap = await latestSnapshot(rule.target);
      if (!snap) return null;
      if (snap.median <= rule.threshold) return null;
      return {
        observedValue: snap.median,
        payload: { kind: rule.kind, symbol: rule.target, median: snap.median, capturedAt: snap.capturedAt },
      };
    }
    case "INDEX_MOVE_OVER": {
      const idx = await latestIndex(rule.target);
      if (!idx || idx.dayChangePct === null) return null;
      if (Math.abs(idx.dayChangePct) <= rule.threshold) return null;
      return {
        observedValue: idx.dayChangePct,
        payload: {
          kind: rule.kind,
          indexSymbol: rule.target,
          level: idx.level,
          dayChangePct: idx.dayChangePct,
          capturedAt: idx.capturedAt,
        },
      };
    }
    case "DEAL_MARGIN_OVER": {
      const since = rule.lastTriggeredAt ?? rule.createdAt;
      const deal = await newestQualifyingDeal(rule.target, rule.threshold, since);
      if (!deal) return null;
      return {
        observedValue: deal.profitMargin,
        payload: { kind: rule.kind, deal },
      };
    }
    default:
      return null;
  }
}

function formatEmailBody(args: {
  rule: { kind: string; target: string; threshold: number; label: string | null };
  observedValue: number;
  triggeredAt: Date;
  userEmail: string;
}): { subject: string; html: string } {
  const { rule, observedValue, triggeredAt, userEmail } = args;
  const valStr = observedValue.toFixed(2);
  const subject = `[SneakPrice Alert] ${rule.label ?? rule.kind} — ${rule.target} @ ${valStr}`;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 560px;">
      <h2 style="margin:0 0 8px;">SneakPrice Alert fired</h2>
      <p style="margin:0 0 16px; color:#555;">${rule.label ?? "(no label)"}</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding:6px 0;">Kind</td><td><strong>${rule.kind}</strong></td></tr>
        <tr><td style="padding:6px 0;">Target</td><td><strong>${rule.target}</strong></td></tr>
        <tr><td style="padding:6px 0;">Threshold</td><td>${rule.threshold}</td></tr>
        <tr><td style="padding:6px 0;">Observed</td><td><strong>${valStr}</strong></td></tr>
        <tr><td style="padding:6px 0;">Triggered</td><td>${triggeredAt.toISOString()}</td></tr>
        <tr><td style="padding:6px 0;">User</td><td>${userEmail}</td></tr>
      </table>
      <p style="margin:16px 0 0;">
        <a href="https://sneakpriceapp.com/exchange/alerts" style="color:#0070f3;">Manage alerts →</a>
      </p>
    </div>`;
  return { subject, html };
}

export async function evaluateAlerts(): Promise<EvaluateResult> {
  const startedAt = Date.now();
  const evaluatedAt = new Date();
  const debounceCutoff = new Date(Date.now() - DEBOUNCE_MS);

  const rules = await prisma.alertRule.findMany({
    where: {
      active: true,
      OR: [
        { lastTriggeredAt: null },
        { lastTriggeredAt: { lt: debounceCutoff } },
      ],
    },
    include: { user: { select: { email: true } } },
  });

  let fired = 0;
  let emailed = 0;
  const resend = getResend();

  for (const rule of rules) {
    const ctx = await evaluateRule(rule);
    if (!ctx) continue;

    const event = await prisma.alertEvent.create({
      data: {
        ruleId: rule.id,
        observedValue: ctx.observedValue,
        payload: ctx.payload as Prisma.InputJsonValue,
      },
    });
    await prisma.alertRule.update({
      where: { id: rule.id },
      data: { lastTriggeredAt: evaluatedAt },
    });
    fired++;

    if (resend && rule.user.email) {
      try {
        const { subject, html } = formatEmailBody({
          rule: {
            kind: rule.kind,
            target: rule.target,
            threshold: rule.threshold,
            label: rule.label,
          },
          observedValue: ctx.observedValue,
          triggeredAt: evaluatedAt,
          userEmail: rule.user.email,
        });
        await resend.emails.send({
          from: ALERT_FROM,
          to: deliveryAddress(rule.user.email),
          subject,
          html,
        });
        await prisma.alertEvent.update({
          where: { id: event.id },
          data: { notifiedAt: new Date() },
        });
        emailed++;
      } catch (err) {
        console.error("[alerts] email send failed for rule", rule.id, err);
      }
    }
  }

  return {
    evaluatedAt: evaluatedAt.toISOString(),
    rulesEvaluated: rules.length,
    fired,
    emailed,
    durationMs: Date.now() - startedAt,
  };
}
