"use client";

import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { Label, Input, Select, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const EMPTY = {
  title: "",
  slug: "",
  category: "",
  status: "ACTIVE",
  summary: "",
  description: "",
  location: "",
  startDate: "",
  endDate: "",
  impactStat: "",
  heroImage: "",
};

function toDateTimeLocal(date) {
  if (!date) return "";
  const d = new Date(date);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default function ProgrammeFormDrawer({ programme, onClose, onSaved }) {
  const isEdit = Boolean(programme?.id);
  const [form, setForm] = useState(() =>
    programme?.id
      ? {
          ...programme,
          status: programme.status || "ACTIVE",
          startDate: toDateTimeLocal(programme.startDate),
          endDate: toDateTimeLocal(programme.endDate || ""),
        }
      : EMPTY
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        startDate: new Date(form.startDate).toISOString(),
        endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
      };
      const endpoint = isEdit
        ? `/api/admin/programmes/${programme.id}`
        : "/api/admin/programmes";
      const res = await fetch(endpoint, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save this programme.");
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
        aria-label={isEdit ? "Edit programme" : "New programme"}
        onClick={(e) => e.stopPropagation()}
        className="bg-white h-full w-full max-w-lg flex flex-col"
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-border-light shrink-0">
          <h2 className="text-lg sm:text-xl">{isEdit ? "Edit Programme" : "New Programme"}</h2>
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
            <Label htmlFor="pf-title">Title</Label>
            <Input id="pf-title" value={form.title} onChange={update("title")} required />
          </div>
          <div>
            <Label htmlFor="pf-slug">Slug</Label>
            <Input id="pf-slug" value={form.slug} onChange={update("slug")} required />
            <span className="text-xs text-muted mt-1 block">
              Used in the URL — lowercase, hyphens. E.g. family-cohesion.
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="pf-category">Category</Label>
              <Input id="pf-category" value={form.category} onChange={update("category")} />
            </div>
            <div>
              <Label htmlFor="pf-status">Status</Label>
              <Select id="pf-status" value={form.status} onChange={update("status")}>
                <option value="ACTIVE">Active</option>
                <option value="UPCOMING">Upcoming</option>
                <option value="COMPLETED">Completed</option>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="pf-location">Location</Label>
            <Input id="pf-location" value={form.location} onChange={update("location")} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="pf-start">Start Date &amp; Time</Label>
              <Input
                type="datetime-local"
                id="pf-start"
                value={form.startDate}
                onChange={update("startDate")}
                required
              />
            </div>
            <div>
              <Label htmlFor="pf-end">End Date &amp; Time</Label>
              <Input type="datetime-local" id="pf-end" value={form.endDate} onChange={update("endDate")} />
            </div>
          </div>
          <div>
            <Label htmlFor="pf-impact">Impact Stat</Label>
            <Input
              id="pf-impact"
              placeholder="e.g. 500+ families supported"
              value={form.impactStat}
              onChange={update("impactStat")}
            />
          </div>
          <div>
            <Label htmlFor="pf-hero">Hero Image URL</Label>
            <Input id="pf-hero" value={form.heroImage} onChange={update("heroImage")} />
          </div>
          <div>
            <Label htmlFor="pf-summary">Summary</Label>
            <Textarea
              id="pf-summary"
              rows={3}
              value={form.summary}
              onChange={update("summary")}
            />
          </div>
          <div>
            <Label htmlFor="pf-description">Description</Label>
            <Textarea
              id="pf-description"
              rows={5}
              value={form.description}
              onChange={update("description")}
            />
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
                  <Save size={16} /> {isEdit ? "Save Changes" : "Create Programme"}
                </>
              )}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
}