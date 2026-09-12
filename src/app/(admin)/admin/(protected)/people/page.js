"use client";

import { useEffect, useState } from "react";
import { Inbox, Trash2, Loader2 } from "lucide-react";
import { Select } from "@/components/ui/Input";
import { StatusPill } from "@/components/admin/AdminUI";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import { useConfirm } from "@/components/admin/ConfirmProvider";

const TABS = [
  {
    key: "volunteers",
    label: "Volunteers",
    endpoint: "/api/admin/volunteers",
    statuses: ["NEW", "REVIEWED", "CONTACTED", "ONBOARDED"],
    statusField: "status",
    deleteLabel: "volunteer application",
    title: (row) => row.fullName,
    subtitle: (row) => row.email,
    extra: (row) => [row.location, row.phone].filter(Boolean).join(" · "),
  },
  {
    key: "memberships",
    label: "Memberships",
    endpoint: "/api/admin/memberships",
    statuses: ["NEW", "REVIEWED", "CONTACTED", "ONBOARDED"],
    statusField: "status",
    deleteLabel: "membership application",
    title: (row) => row.fullName,
    subtitle: (row) => row.email,
    extra: (row) => row.reason?.slice(0, 70) || "",
  },
  {
    key: "partnerships",
    label: "Partnerships",
    endpoint: "/api/admin/partnerships",
    statuses: ["NEW", "REVIEWED", "CONTACTED", "CONVERTED"],
    statusField: "status",
    deleteLabel: "partnership inquiry",
    title: (row) => row.organisation,
    subtitle: (row) => row.contactName,
    extra: (row) => [row.email, row.phone].filter(Boolean).join(" · "),
  },
  {
    key: "contacts",
    label: "Contacts",
    endpoint: "/api/admin/contacts",
    statuses: ["NEW", "REVIEWED", "RESOLVED", "ARCHIVED"],
    statusField: "status",
    deleteLabel: "contact submission",
    title: (row) => row.fullName,
    subtitle: (row) => row.email,
    extra: (row) => `${row.subject} — ${(row.message || "").slice(0, 60)}${(row.message || "").length > 60 ? "…" : ""}`,
  },
  {
    key: "subscribers",
    label: "Subscribers",
    endpoint: "/api/admin/subscribers",
    statuses: [],
    statusField: null,
    deleteLabel: "subscriber",
    title: (row) => row.email,
    subtitle: () => "",
    extra: (row) => (row.chapter ? `Chapter: ${row.chapter}` : "Newsletter"),
  },
];

export default function AdminPeoplePage() {
  const confirm = useConfirm();
  const [active, setActive] = useState("volunteers");
  const [data, setData] = useState({});
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");

  async function fetchAll() {
    const entries = await Promise.all(
      TABS.map(async (tab) => {
        const res = await fetch(tab.endpoint);
        const json = await res.json();
        return { key: tab.key, list: json[tab.key] || [] };
      })
    );
    const results = {};
    const nextCounts = {};
    for (const { key, list } of entries) {
      results[key] = list;
      nextCounts[key] = list.length;
    }
    return { results, nextCounts };
  }

  async function loadAll() {
    setLoading(true);
    setError("");
    try {
      const { results, nextCounts } = await fetchAll();
      setData(results);
      setCounts(nextCounts);
    } catch {
      setError("Could not load people records.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { results, nextCounts } = await fetchAll();
        if (!cancelled) {
          setData(results);
          setCounts(nextCounts);
        }
      } catch {
        if (!cancelled) setError("Could not load people records.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const tab = TABS.find((t) => t.key === active);
  const rows = data[active] || [];

  async function handleStatus(row, next) {
    setSavingId(row.id);
    setError("");
    try {
      const res = await fetch(`${tab.endpoint}/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      await loadAll();
    } catch {
      setError(`Could not update this ${tab.deleteLabel}.`);
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(row) {
    const ok = await confirm({
      title: `Delete this ${tab.deleteLabel}?`,
      message: "Recipients are not notified.",
      confirmLabel: "Delete",
      variant: "danger",
    });
    if (!ok) return;

    setSavingId(row.id);
    setError("");
    try {
      const res = await fetch(`${tab.endpoint}/${row.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await loadAll();
    } catch {
      setError(`Could not delete this ${tab.deleteLabel}.`);
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="admin-h1">People</h1>
          <p>Volunteers, members, partners, and contact inbox.</p>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="People records"
        className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 -mb-1"
      >
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={active === t.key}
            onClick={() => setActive(t.key)}
            className={cn(
              "shrink-0 inline-flex items-center gap-2 rounded-control px-3 sm:px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
              active === t.key
                ? "bg-maroon-deep text-white"
                : "bg-white text-maroon-deep border border-border-light hover:bg-warm-white"
            )}
          >
            {t.label}
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold",
                active === t.key ? "bg-white/20 text-white" : "bg-maroon-deep/10 text-maroon-deep"
              )}
            >
              {counts[t.key] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-maroon-deep">{error}</p>}

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : rows.length === 0 ? (
        <div className="bg-white border border-border-light rounded-card p-10 text-center">
          <Inbox size={32} strokeWidth={1.5} className="mx-auto text-border-mid mb-3" />
          <p className="text-sm text-muted">No {tab.label.toLowerCase()} records yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-border-light rounded-card overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-warm-white text-xs text-muted tracking-[0.05em] uppercase">
                <th className="px-4 sm:px-6 py-3 font-semibold whitespace-nowrap">{tab.label.slice(0, -1)}</th>
                <th className="px-4 sm:px-6 py-3 font-semibold hidden md:table-cell">Details</th>
                <th className="px-4 sm:px-6 py-3 font-semibold">Received</th>
                <th className="px-4 sm:px-6 py-3 font-semibold">Status</th>
                <th className="px-4 sm:px-6 py-3 font-semibold" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-border-light/80 hover:bg-warm-white/60 transition-colors">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="font-medium">{tab.title(row)}</div>
                    {tab.subtitle(row) && <div className="text-xs text-muted">{tab.subtitle(row)}</div>}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-xs text-muted hidden md:table-cell">{tab.extra(row)}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{formatDate(row.createdAt)}</td>
                  <td className="px-4 sm:px-6 py-4">
                    {tab.statusField ? (
                      <div className="flex items-center gap-2">
                        <StatusPill status={row[tab.statusField]} />
                        <Select
                          aria-label="Change status"
                          value={row[tab.statusField]}
                          onChange={(e) => handleStatus(row, e.target.value)}
                          disabled={savingId === row.id}
                          className="!w-auto !min-w-[110px] py-1 !text-xs"
                        >
                          {tab.statuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </Select>
                      </div>
                    ) : (
                      <StatusPill status="NEW" />
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(row)}
                      disabled={savingId === row.id}
                      aria-label={`Delete ${tab.deleteLabel}`}
                      className="text-muted hover:text-maroon-deep disabled:opacity-40"
                    >
                      {savingId === row.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}