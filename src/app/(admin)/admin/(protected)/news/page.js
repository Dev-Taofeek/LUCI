"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import DataTable from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/AdminUI";
import ArticleFormDrawer from "@/components/admin/ArticleFormDrawer";
import { formatDate } from "@/lib/format";
import useDataLoad from "@/hooks/useDataLoad";
import { useConfirm } from "@/components/admin/ConfirmProvider";

export default function AdminNewsPage() {
  const confirm = useConfirm();
  const { data: articles, loading, error, setError, reload } = useDataLoad(
    "/api/admin/news",
    (json) => json.articles || [],
    "Could not load articles."
  );
  const [authors, setAuthors] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/authors");
        const data = await res.json();
        if (!cancelled) setAuthors(data.users || []);
      } catch {
        /* authors are optional for the drawer select */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(id) {
    const ok = await confirm({
      title: "Delete this article?",
      message: "This cannot be undone.",
      confirmLabel: "Delete",
      variant: "danger",
    });
    if (!ok) return;

    setError("");
    const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Could not delete this article.");
      return;
    }
    reload();
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category", render: (row) => row.category || <span className="text-muted">—</span> },
    { key: "status", label: "Status", render: (row) => <StatusPill status={row.status} /> },
    { key: "author", label: "Author", render: (row) => row.author?.name || <span className="text-muted">—</span> },
    { key: "createdAt", label: "Created", render: (row) => formatDate(row.createdAt) },
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
          <h1 className="admin-h1">News &amp; Insights</h1>
          <p>Draft and publish articles for the public newsroom.</p>
        </div>
        <Button as="button" variant="primary" onClick={() => setEditing({})} className="flex items-center gap-2">
          <Plus size={16} /> New Article
        </Button>
      </div>

      {error && <p className="text-sm text-maroon-deep">{error}</p>}

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : (
        <DataTable columns={columns} rows={articles} emptyMessage="No articles yet. Write your first one." />
      )}

      {editing !== null && (
        <ArticleFormDrawer
          article={editing.id ? editing : null}
          authors={authors}
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