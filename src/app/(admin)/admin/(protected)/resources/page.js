"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import DataTable from "@/components/admin/DataTable";
import ResourceFormDrawer from "@/components/admin/ResourceFormDrawer";
import { formatDate } from "@/lib/format";
import useDataLoad from "@/hooks/useDataLoad";

export default function AdminResourcesPage() {
  const { data: resources, loading, error, setError, reload } = useDataLoad(
    "/api/admin/resources",
    (json) => json.resources || [],
    "Could not load resources."
  );
  const [editing, setEditing] = useState(null);

  async function handleDelete(id) {
    if (!confirm("Delete this resource? This cannot be undone.")) return;
    setError("");
    const res = await fetch(`/api/admin/resources/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Could not delete this resource.");
      return;
    }
    reload();
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Type", render: (row) => <span className="text-xs font-semibold tracking-[0.05em] text-maroon-deep">{row.category}</span> },
    { key: "createdAt", label: "Added", render: (row) => formatDate(row.createdAt) },
    {
      key: "downloads",
      label: "Downloads",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 text-sm text-muted">
          <Download size={14} className="shrink-0" /> {row.downloads}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <div className="flex items-center gap-3 justify-end">
          <button onClick={() => setEditing(row)} className="text-muted hover:text-maroon-deep">
            <Pencil size={16} />
          </button>
          <button onClick={() => handleDelete(row.id)} className="text-muted hover:text-maroon-deep">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="!text-[28px]">Resources</h1>
          <p>Manage the knowledge-library resources on the public site.</p>
        </div>
        <Button as="button" variant="primary" onClick={() => setEditing({})} className="flex items-center gap-2">
          <Plus size={16} /> New Resource
        </Button>
      </div>

      {error && <p className="text-sm text-maroon-deep">{error}</p>}

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : (
        <DataTable columns={columns} rows={resources} emptyMessage="No resources yet. Upload your first one." />
      )}

      {editing !== null && (
        <ResourceFormDrawer
          resource={editing.id ? editing : null}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      )}
    </div>
  );
}