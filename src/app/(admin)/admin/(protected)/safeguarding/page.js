"use client";

import { useState } from "react";
import { ShieldAlert, X, Save, Loader2, EyeOff } from "lucide-react";
import { Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DataTable from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/AdminUI";
import { formatDate } from "@/lib/format";
import { SAFEGUARDING_STATUSES } from "@/lib/constants";
import useDataLoad from "@/hooks/useDataLoad";

const STATUSES = SAFEGUARDING_STATUSES;

function formatDateTime(date) {
  if (!date) return "—";
  const d = new Date(date);
  const p = (n) => String(n).padStart(2, "0");
  return `${formatDate(d)} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default function AdminSafeguardingPage() {
  const { data: reports, loading, error, setError, reload } = useDataLoad(
    "/api/admin/safeguarding",
    (json) => json.reports || [],
    "Could not load safeguarding reports."
  );
  const forbidden = error === "Forbidden";
  const [selected, setSelected] = useState(null);
  const [nextStatus, setNextStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function openReport(report) {
    setSelected(report);
    setNextStatus(report.status);
  }

  async function handleUpdateStatus(e) {
    e.preventDefault();
    if (!selected || nextStatus === selected.status) {
      setSelected(null);
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/safeguarding/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) throw new Error();
      await reload();
      setSelected(null);
    } catch {
      setError("Could not update the report status.");
    } finally {
      setSaving(false);
    }
  }

  if (forbidden) {
    return (
      <div className="bg-white border border-border-light rounded-card p-10 text-center">
        <ShieldAlert size={32} strokeWidth={1.5} className="mx-auto text-maroon-deep mb-3" />
        <p className="font-semibold">Restricted</p>
        <p className="text-sm text-muted">
          Only Safeguarding Officers and Super Admins can view safeguarding reports.
        </p>
      </div>
    );
  }

  const columns = [
    { key: "reference", label: "Reference", render: (row) => <span className="font-medium">{row.reference}</span> },
    { key: "category", label: "Category", render: (row) => row.category || <span className="text-muted">—</span> },
    {
      key: "reporter",
      label: "Reporter",
      render: (row) =>
        row.isAnonymous ? (
          <span className="inline-flex items-center gap-1.5 text-muted">
            <EyeOff size={14} /> Anonymous
          </span>
        ) : (
          row.reporterName || "—"
        ),
    },
    { key: "createdAt", label: "Submitted", render: (row) => formatDateTime(row.createdAt) },
    { key: "status", label: "Status", render: (row) => <StatusPill status={row.status} /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="admin-h1">Safeguarding</h1>
        <p>Restricted — reports are only visible to Safeguarding Officers and Super Admins.</p>
      </div>

      {error && <p className="text-sm text-maroon-deep">{error}</p>}

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : (
        <>
          <p className="text-sm text-muted">
            {reports.length} report{reports.length === 1 ? "" : "s"}
          </p>
          <DataTable
            columns={columns}
            rows={reports}
            emptyMessage="No safeguarding reports yet."
            onRowClick={openReport}
          />
        </>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex justify-end"
          onClick={() => !saving && setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Report details"
            onClick={(e) => e.stopPropagation()}
            className="bg-white h-full w-full max-w-lg flex flex-col"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-border-light shrink-0">
              <h2 className="text-lg sm:text-xl flex items-center gap-2">
                <ShieldAlert size={18} className="text-maroon-deep" />
                {selected.reference}
              </h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                disabled={saving}
                aria-label="Close details"
                className="text-muted hover:text-maroon-deep p-1"
              >
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-muted uppercase tracking-wide">Submitted</span>
                  <p className="text-sm mt-1">{formatDateTime(selected.createdAt)}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted uppercase tracking-wide">Category</span>
                  <p className="text-sm mt-1">{selected.category || "—"}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted uppercase tracking-wide">Reporter</span>
                  <p className="text-sm mt-1">
                    {selected.isAnonymous ? "Anonymous" : selected.reporterName || "—"}
                  </p>
                </div>
                {selected.reporterContact && (
                  <div>
                    <span className="text-xs font-semibold text-muted uppercase tracking-wide">Contact</span>
                    <p className="text-sm mt-1">{selected.reporterContact}</p>
                  </div>
                )}
              </div>

              <div>
                <span className="text-xs font-semibold text-muted uppercase tracking-wide">Details</span>
                <p className="text-sm mt-1 whitespace-pre-wrap bg-warm-white border border-border-light rounded-control p-4">
                  {selected.details}
                </p>
              </div>

              <form onSubmit={handleUpdateStatus} className="flex flex-col gap-4 border-t border-border-light pt-5">
                <div>
                  <label className="text-xs font-semibold text-muted uppercase tracking-wide">Case Status</label>
                  <Select
                    value={nextStatus}
                    onChange={(e) => setNextStatus(e.target.value)}
                    className="mt-2 !w-auto"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </div>
                <Button type="submit" disabled={saving} className="justify-center">
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} /> Update Status
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}