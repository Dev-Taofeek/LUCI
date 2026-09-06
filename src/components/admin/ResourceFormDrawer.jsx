"use client";

import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { Label, Input, Select, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const TYPES = ["GUIDE", "RESEARCH", "VIDEO", "REPORT", "ARTICLE"];

function buildForm(resource) {
  return {
    title: resource?.title ?? "",
    slug: resource?.slug ?? "",
    category: resource?.category ?? "GUIDE",
    summary: resource?.summary ?? "",
    fileUrl: resource?.fileUrl ?? "",
    thumbnail: resource?.thumbnail ?? "",
  };
}

export default function ResourceFormDrawer({ resource, onClose, onSaved }) {
  const isEdit = Boolean(resource?.id);
  const [form, setForm] = useState(() => buildForm(resource));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const endpoint = isEdit
        ? `/api/admin/resources/${resource.id}`
        : "/api/admin/resources";
      const res = await fetch(endpoint, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save this resource.");
      }
      onSaved();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex justify-end"
      onClick={() => !saving && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? "Edit resource" : "New resource"}
        onClick={(e) => e.stopPropagation()}
        className="bg-white h-full w-full max-w-lg flex flex-col"
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-border-light shrink-0">
          <h2 className="text-lg sm:text-xl">{isEdit ? "Edit Resource" : "New Resource"}</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close form"
            className="text-muted hover:text-maroon-deep p-1"
          >
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          <div>
            <Label htmlFor="rf-title">Title</Label>
            <Input id="rf-title" value={form.title} onChange={update("title")} required />
          </div>
          <div>
            <Label htmlFor="rf-slug">Slug</Label>
            <Input id="rf-slug" value={form.slug} onChange={update("slug")} required />
            <span className="text-xs text-muted mt-1 block">
              Used in the URL — lowercase, hyphens. E.g. 2026-engagement-guide.
            </span>
          </div>
          <div>
            <Label htmlFor="rf-category">Type / Category</Label>
            <Select id="rf-category" value={form.category} onChange={update("category")}>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="rf-file">File / Link URL</Label>
            <Input
              id="rf-file"
              placeholder="e.g. /media/report.pdf or https://..."
              value={form.fileUrl}
              onChange={update("fileUrl")}
              required
            />
          </div>
          <div>
            <Label htmlFor="rf-thumb">Cover Image URL</Label>
            <Input id="rf-thumb" value={form.thumbnail} onChange={update("thumbnail")} />
          </div>
          <div>
            <Label htmlFor="rf-summary">Summary</Label>
            <Textarea rows={4} id="rf-summary" value={form.summary} onChange={update("summary")} />
          </div>

          {error && (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          )}

          <footer className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1 justify-center"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 justify-center" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save size={16} /> {isEdit ? "Save Changes" : "Create Resource"}
                </>
              )}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
}