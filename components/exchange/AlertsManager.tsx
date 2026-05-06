"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Bell, BellOff, Loader2, Trash2 } from "lucide-react";

type AlertKind =
  | "PRICE_BELOW"
  | "PRICE_ABOVE"
  | "DEAL_MARGIN_OVER"
  | "INDEX_MOVE_OVER";

type Rule = {
  id: string;
  kind: AlertKind;
  target: string;
  threshold: number;
  label: string | null;
  active: boolean;
  lastTriggeredAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type AlertEventRow = {
  id: string;
  triggeredAt: string;
  observedValue: number;
  notifiedAt: string | null;
  rule: { id: string; kind: AlertKind; target: string; label: string | null };
};

type Option = { value: string; label: string };

type Props = {
  initialRules: Rule[];
  initialEvents: AlertEventRow[];
  symbolOptions: Option[];
  indexOptions: Option[];
  /** Active-rule cap for this user; `null` means unlimited (paid tier). Computed server-side. */
  ruleCap: number | null;
};

const KIND_LABELS: Record<AlertKind, string> = {
  PRICE_BELOW: "Price drops below",
  PRICE_ABOVE: "Price rises above",
  DEAL_MARGIN_OVER: "New deal margin exceeds",
  INDEX_MOVE_OVER: "Index daily move exceeds",
};

const KIND_UNIT: Record<AlertKind, string> = {
  PRICE_BELOW: "$",
  PRICE_ABOVE: "$",
  DEAL_MARGIN_OVER: "%",
  INDEX_MOVE_OVER: "%",
};

function formatThreshold(kind: AlertKind, threshold: number) {
  const unit = KIND_UNIT[kind];
  return unit === "$" ? `$${threshold.toFixed(2)}` : `${threshold.toFixed(2)}%`;
}

function formatRelative(iso: string | null) {
  if (!iso) return "never";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export default function AlertsManager({
  initialRules,
  initialEvents,
  symbolOptions,
  indexOptions,
  ruleCap,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [events] = useState<AlertEventRow[]>(initialEvents);
  const [error, setError] = useState<string | null>(null);

  const [kind, setKind] = useState<AlertKind>("DEAL_MARGIN_OVER");
  const [target, setTarget] = useState<string>("*");
  const [threshold, setThreshold] = useState<string>("30");
  const [label, setLabel] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const activeCount = rules.filter((r) => r.active).length;
  const atCap = ruleCap !== null && activeCount >= ruleCap;

  function targetOptionsForKind(k: AlertKind): Option[] {
    if (k === "INDEX_MOVE_OVER") return indexOptions;
    if (k === "PRICE_BELOW" || k === "PRICE_ABOVE") return symbolOptions;
    return [
      { value: "*", label: "* — Any sneaker" },
      ...symbolOptions.map((o) => ({
        value: o.value,
        label: `${o.value} — ${o.label.split(" — ")[1] ?? ""}`,
      })),
    ];
  }

  function handleKindChange(next: AlertKind) {
    setKind(next);
    const opts = targetOptionsForKind(next);
    setTarget(opts[0]?.value ?? "*");
    if (next === "DEAL_MARGIN_OVER" || next === "INDEX_MOVE_OVER") {
      setThreshold("30");
    } else {
      setThreshold("180");
    }
  }

  async function createRule(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const num = parseFloat(threshold);
    if (!Number.isFinite(num)) {
      setError("Threshold must be a number");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/exchange/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, target, threshold: num, label: label || undefined }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? body.error ?? `Failed (HTTP ${res.status})`);
        return;
      }
      const { rule } = await res.json();
      setRules((prev) => [rule, ...prev]);
      setLabel("");
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(rule: Rule) {
    const next = !rule.active;
    setRules((prev) => prev.map((r) => (r.id === rule.id ? { ...r, active: next } : r)));
    const res = await fetch(`/api/exchange/alerts/${rule.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: next }),
    });
    if (!res.ok) {
      // revert
      setRules((prev) => prev.map((r) => (r.id === rule.id ? { ...r, active: rule.active } : r)));
    }
  }

  async function deleteRule(rule: Rule) {
    if (!confirm(`Delete alert "${rule.label ?? rule.kind}"?`)) return;
    const prev = rules;
    setRules((p) => p.filter((r) => r.id !== rule.id));
    const res = await fetch(`/api/exchange/alerts/${rule.id}`, { method: "DELETE" });
    if (!res.ok) setRules(prev);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Get pinged when prices, margins, or indexes cross thresholds you
              care about.
            </p>
          </div>
          <button
            onClick={() => startTransition(() => router.refresh())}
            className="rounded-md border border-zinc-800 px-3 py-1.5 text-sm hover:bg-zinc-900"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
          </button>
        </header>

        <section className="mb-10 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-lg font-semibold">New alert</h2>
          {atCap ? (
            <p className="rounded-md border border-amber-700/40 bg-amber-950/30 p-3 text-sm text-amber-200">
              Free tier limit reached ({ruleCap} active alerts). Pause or delete an
              existing rule, or{" "}
              <a href="/pricing#pro" className="font-medium underline hover:text-amber-100">
                upgrade to Pro for unlimited alerts →
              </a>
            </p>
          ) : (
            <form onSubmit={createRule} className="grid gap-4 md:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block text-zinc-400">Kind</span>
                <select
                  value={kind}
                  onChange={(e) => handleKindChange(e.target.value as AlertKind)}
                  className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2"
                >
                  {(Object.keys(KIND_LABELS) as AlertKind[]).map((k) => (
                    <option key={k} value={k}>
                      {KIND_LABELS[k]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-zinc-400">Target</span>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2"
                >
                  {targetOptionsForKind(kind).map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-zinc-400">
                  Threshold ({KIND_UNIT[kind]})
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2"
                  required
                />
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-zinc-400">Label (optional)</span>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. AJ1 Chicago dip watch"
                  maxLength={200}
                  className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2"
                />
              </label>

              {error && (
                <p className="md:col-span-2 rounded-md border border-red-700/40 bg-red-950/30 p-2 text-sm text-red-200">
                  {error}
                </p>
              )}

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-60"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  Create alert
                </button>
                <span className="ml-3 text-xs text-zinc-500">
                  {ruleCap === null
                    ? `${activeCount} active (unlimited)`
                    : `${activeCount}/${ruleCap} active rules`}
                </span>
              </div>
            </form>
          )}
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold">Your rules</h2>
          {rules.length === 0 ? (
            <p className="text-sm text-zinc-500">No rules yet — create one above.</p>
          ) : (
            <ul className="divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-zinc-900/30">
              {rules.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {r.label ?? KIND_LABELS[r.kind]}
                      </span>
                      {!r.active && (
                        <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] uppercase text-zinc-400">
                          paused
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-zinc-400">
                      {KIND_LABELS[r.kind]} · target{" "}
                      <span className="font-mono">{r.target}</span> ·{" "}
                      {formatThreshold(r.kind, r.threshold)} · last fired{" "}
                      {formatRelative(r.lastTriggeredAt)}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => toggleActive(r)}
                      title={r.active ? "Pause" : "Resume"}
                      className="rounded-md border border-zinc-800 p-2 hover:bg-zinc-800"
                    >
                      {r.active ? (
                        <Bell className="h-4 w-4" />
                      ) : (
                        <BellOff className="h-4 w-4 text-zinc-500" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteRule(r)}
                      title="Delete"
                      className="rounded-md border border-zinc-800 p-2 hover:bg-red-950/30 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">Recent triggers</h2>
          {events.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No alerts have fired yet. Once data crosses one of your thresholds,
              the trigger will land here.
            </p>
          ) : (
            <ul className="divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-zinc-900/30">
              {events.map((e) => (
                <li key={e.id} className="p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {e.rule.label ?? KIND_LABELS[e.rule.kind]}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {formatRelative(e.triggeredAt)}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">
                    {KIND_LABELS[e.rule.kind]} · target{" "}
                    <span className="font-mono">{e.rule.target}</span> · observed{" "}
                    <span className="font-mono">
                      {e.observedValue.toFixed(2)}
                    </span>
                    {e.notifiedAt && " · email sent"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
