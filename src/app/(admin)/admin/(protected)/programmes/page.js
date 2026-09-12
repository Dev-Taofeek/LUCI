"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import DataTable from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/AdminUI";
import ProgrammeFormDrawer from "@/components/admin/ProgrammeFormDrawer";
import useDataLoad from "@/hooks/useDataLoad";
import { useConfirm } from "@/components/admin/ConfirmProvider";

export default function AdminProgrammesPage() {
  const confirm = useConfirm();
  const { data: programmes, loading, error, setError, reload } = useDataLoad(
    "/api/admin/programmes",
    (json) => json.programmes || [],
    "Could not load programmes."
  );
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = edit

  async function handleDelete(id) {
    const ok = await confirm({
      title: "Delete this programme?",
      message: "This cannot be undone.",
      confirmLabel: "Delete",
      variant: "danger",
    });
    if (!ok) return;

    setError("");
    const res = await fetch(`/api/admin/programmes/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Could not delete this programme.");
      return;
    }
    reload();
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "status", label: "Status", render: (row) => <StatusPill status={row.status} /> },
    { key: "location", label: "Location" },
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
          <h1 className="admin-h1">Programmes</h1>
          <p>Manage the programmes shown on the public site.</p>
        </div>
        <Button as="button" variant="primary" onClick={() => setEditing({})} className="flex items-center gap-2">
          <Plus size={16} /> New Programme
        </Button>
      </div>

      {error && <p className="text-sm text-maroon-deep">{error}</p>}

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : (
        <DataTable columns={columns} rows={programmes} emptyMessage="No programmes yet. Create your first one." />
      )}

      {editing !== null && (
        <ProgrammeFormDrawer
          programme={editing.id ? editing : null}
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
