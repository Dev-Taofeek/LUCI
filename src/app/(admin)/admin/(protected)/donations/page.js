"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Select } from "@/components/ui/Input";
import DataTable from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/AdminUI";
import { formatDate } from "@/lib/format";

const CURRENCY_SYMBOLS = { NGN: "₦", USD: "$", GBP: "£", EUR: "€" };

function fmtAmount(row) {
  const symbol = CURRENCY_SYMBOLS[row.currency] || "₦";
  return `${symbol}${(Number(row.amount || 0) / 100).toLocaleString("en-NG")}`;
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ status: "ALL", frequency: "ALL" });
  const [refreshing, setRefreshing] = useState(false);

  async function load(next = filters) {
    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams(
        Object.entries(next).filter(([, v]) => v && v !== "ALL")
      ).toString();
      const res = await fetch(`/api/admin/donations?${qs}`);
      const data = await res.json();
      setDonations(data.donations || []);
    } catch {
      setError("Could not load donations.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/donations");
        const data = await res.json();
        if (!cancelled) {
          setDonations(data.donations || []);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError("Could not load donations.");
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function applyFilter(key, value) {
    const next = { ...filters, [key]: value };
    setFilters(next);
    load(next);
  }

  const columns = [
    { key: "reference", label: "Reference", render: (row) => <span className="font-medium">{row.reference}</span> },
    {
      key: "donor",
      label: "Donor",
      render: (row) => (
        <div>
          <div className="font-medium">{row.donorName || "Anonymous"}</div>
          {row.donorEmail && <div className="text-xs text-muted">{row.donorEmail}</div>}
        </div>
      ),
    },
    { key: "amount", label: "Amount", render: (row) => <span className="font-medium">{fmtAmount(row)}</span> },
    { key: "frequency", label: "Frequency", render: (row) => (row.frequency === "MONTHLY" ? "Monthly (Recurring)" : "One-time") },
    { key: "status", label: "Status", render: (row) => <StatusPill status={row.status} /> },
    { key: "designation", label: "Designation", render: (row) => row.designation || <span className="text-muted">—</span> },
    { key: "createdAt", label: "Date", render: (row) => formatDate(row.createdAt) },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <div>
          <h1 className="!text-[28px]">Donations</h1>
          <p>Monitor and filter incoming donor contributions.</p>
        </div>
        <button
          onClick={() => {
            setRefreshing(true);
            load().finally(() => setRefreshing(false));
          }}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 self-start sm:self-auto text-sm font-semibold text-maroon-deep border border-maroon-deep/30 rounded-control px-4 py-2 hover:bg-maroon-deep/5 disabled:opacity-50"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 items-end max-w-2xl">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted">Payment status</label>
          <Select value={filters.status} onChange={(e) => applyFilter("status", e.target.value)}>
            <option value="ALL">All statuses</option>
            <option value="SUCCESS">Successful</option>
            <option value="FAILED">Failed</option>
            <option value="PENDING">Pending</option>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted">Frequency</label>
          <Select value={filters.frequency} onChange={(e) => applyFilter("frequency", e.target.value)}>
            <option value="ALL">All frequencies</option>
            <option value="ONE_TIME">One-time</option>
            <option value="MONTHLY">Monthly</option>
          </Select>
        </div>
      </div>

      {error && <p className="text-sm text-maroon-deep">{error}</p>}

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : (
        <>
          <p className="text-sm text-muted">
            {donations.length} donation{donations.length === 1 ? "" : "s"}
            {filters.status !== "ALL" || filters.frequency !== "ALL" ? " (filtered)" : ""}
          </p>
          <DataTable columns={columns} rows={donations} emptyMessage="No donations match these filters." />
        </>
      )}
    </div>
  );
}