"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import DataTable from "@/components/admin/DataTable";
import EventFormDrawer from "@/components/admin/EventFormDrawer";
import { formatDate } from "@/lib/format";
import useDataLoad from "@/hooks/useDataLoad";
import { useConfirm } from "@/components/admin/ConfirmProvider";

export default function AdminEventsPage() {
  const confirm = useConfirm();
  const { data: events, loading, error, setError, reload } = useDataLoad(
    "/api/admin/events",
    (json) => json.events || [],
    "Could not load events."
  );
  const [editing, setEditing] = useState(null);

  async function handleDelete(id) {
    const ok = await confirm({
      title: "Delete this event?",
      message: "Registrations will also be removed.",
      confirmLabel: "Delete",
      variant: "danger",
    });
    if (!ok) return;

    setError("");
    const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Could not delete this event.");
      return;
    }
    reload();
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "startDate", label: "Starts", render: (row) => formatDate(row.startDate) },
    { key: "location", label: "Venue" },
    {
      key: "registrations",
      label: "Registrations",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 text-sm text-muted">
          <Users size={14} className="shrink-0" /> {row._count?.registrations ?? 0}
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
          <h1 className="admin-h1">Events</h1>
          <p>Manage events and their public registration pages.</p>
        </div>
        <Button as="button" variant="primary" onClick={() => setEditing({})} className="flex items-center gap-2">
          <Plus size={16} /> New Event
        </Button>
      </div>

      {error && <p className="text-sm text-maroon-deep">{error}</p>}

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : (
        <DataTable columns={columns} rows={events} emptyMessage="No events yet. Create your first one." />
      )}

      {editing !== null && (
        <EventFormDrawer
          event={editing.id ? editing : null}
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