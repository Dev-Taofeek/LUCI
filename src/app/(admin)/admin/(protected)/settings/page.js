"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import DataTable from "@/components/admin/DataTable";
import { AdminLoading } from "@/components/admin/AdminUI";
import UserFormDrawer from "@/components/admin/UserFormDrawer";
import { formatDate } from "@/lib/format";
import { ROLE_LABELS } from "@/lib/constants";
import useDataLoad from "@/hooks/useDataLoad";
import { useConfirm } from "@/components/admin/ConfirmProvider";

export default function AdminSettingsPage() {
  const confirm = useConfirm();
  const { data: users, loading, error, setError, reload } = useDataLoad(
    "/api/admin/users",
    (json) => json.users || [],
    "Could not load users. This section is for Super Admins only."
  );
  const [currentUserId, setCurrentUserId] = useState(null);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((s) => {
        if (!cancelled) setCurrentUserId(s?.user?.id ?? null);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(user) {
    if (user.id === currentUserId) {
      await confirm({
        title: "Cannot delete your own account",
        message: "You can't remove the account you're currently signed in with.",
        confirmLabel: "OK",
        cancelLabel: "Close",
      });
      return;
    }
    const ok = await confirm({
      title: `Delete ${user.name || user.email}?`,
      message: "They will immediately lose access.",
      confirmLabel: "Delete",
      variant: "danger",
    });
    if (!ok) return;

    setError("");
    const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Could not delete this user.");
      return;
    }
    reload();
  }

  const columns = [
    { key: "name", label: "Name", render: (row) => row.name || <span className="text-muted">—</span> },
    { key: "email", label: "Email", render: (row) => <span className="font-medium">{row.email}</span> },
    {
      key: "role",
      label: "Role",
      render: (row) => (
        <span className="inline-flex items-center gap-2">
          <span className="rounded-full bg-maroon-deep/10 px-2.5 py-1 text-xs font-semibold text-maroon-deep">
            {ROLE_LABELS[row.role] || row.role}
          </span>
        </span>
      ),
    },
    { key: "createdAt", label: "Created", render: (row) => formatDate(row.createdAt) },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <div className="flex items-center gap-3 justify-end">
          <button onClick={() => setEditing(row)} className="text-muted hover:text-maroon-deep">
            <Pencil size={16} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            disabled={row.id === currentUserId}
            aria-label="Delete user"
            className="text-muted hover:text-maroon-deep disabled:opacity-30 disabled:cursor-not-allowed"
          >
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
          <h1 className="admin-h1 flex items-center gap-2">
            <ShieldCheck size={22} className="text-maroon-deep" /> Settings
          </h1>
          <p>Manage admin accounts and roles (Super Admin only).</p>
        </div>
        <Button as="button" variant="primary" onClick={() => setEditing({})} className="flex items-center gap-2">
          <Plus size={16} /> New User
        </Button>
      </div>

      {error && <p className="text-sm text-maroon-deep">{error}</p>}

      {loading ? <AdminLoading label="Loading users" /> : (
        <DataTable columns={columns} rows={users} emptyMessage="No users yet." />
      )}

      {editing !== null && (
        <UserFormDrawer
          user={editing.id ? editing : null}
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