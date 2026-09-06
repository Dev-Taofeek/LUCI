"use client";

import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { Label, Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function toDateTimeLocal(date) {
  if (!date) return "";
  const d = new Date(date);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

function parseJsonFallback(value, fallback, label) {
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  try {
    return JSON.parse(trimmed);
  } catch {
    throw new Error(`${label} must be valid JSON.`);
  }
}

function buildForm(event) {
  return {
    title: event?.title ?? "",
    slug: event?.slug ?? "",
    summary: event?.summary ?? "",
    description: event?.description ?? "",
    location: event?.location ?? "",
    startDate: toDateTimeLocal(event?.startDate),
    endDate: toDateTimeLocal(event?.endDate || ""),
    heroImage: event?.heroImage ?? "",
    capacity: event?.capacity != null ? String(event.capacity) : "",
    speakers: JSON.stringify(event?.speakers ?? [], null, 2),
    organisers: JSON.stringify(event?.organisers ?? [], null, 2),
  };
}

export default function EventFormDrawer({ event, onClose, onSaved }) {
  const isEdit = Boolean(event?.id);
  const [form, setForm] = useState(() => buildForm(event));
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
        capacity: form.capacity === "" ? null : form.capacity,
        startDate: new Date(form.startDate).toISOString(),
        endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
        speakers: parseJsonFallback(form.speakers, [], "Speakers"),
        organisers: parseJsonFallback(form.organisers, [], "Organisers"),
      };
      const endpoint = isEdit
        ? `/api/admin/events/${event.id}`
        : "/api/admin/events";
      const res = await fetch(endpoint, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save this event.");
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
        aria-label={isEdit ? "Edit event" : "New event"}
        onClick={(e) => e.stopPropagation()}
        className="bg-white h-full w-full max-w-lg flex flex-col"
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-border-light shrink-0">
          <h2 className="text-lg sm:text-xl">{isEdit ? "Edit Event" : "New Event"}</h2>
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
            <Label htmlFor="ef-title">Title</Label>
            <Input id="ef-title" value={form.title} onChange={update("title")} required />
          </div>
          <div>
            <Label htmlFor="ef-slug">Slug</Label>
            <Input id="ef-slug" value={form.slug} onChange={update("slug")} required />
            <span className="text-xs text-muted mt-1 block">
              Used in the URL — lowercase, hyphens. E.g. annual-summit-2026.
            </span>
          </div>
          <div>
            <Label htmlFor="ef-summary">Summary</Label>
            <Textarea rows={2} id="ef-summary" value={form.summary} onChange={update("summary")} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="ef-start">Start Date &amp; Time</Label>
              <Input type="datetime-local" id="ef-start" value={form.startDate} onChange={update("startDate")} required />
            </div>
            <div>
              <Label htmlFor="ef-end">End Date &amp; Time</Label>
              <Input type="datetime-local" id="ef-end" value={form.endDate} onChange={update("endDate")} />
            </div>
          </div>
          <div>
            <Label htmlFor="ef-location">Venue / Location</Label>
            <Input id="ef-location" value={form.location} onChange={update("location")} />
          </div>
          <div>
            <Label htmlFor="ef-capacity">Capacity</Label>
            <Input
              id="ef-capacity"
              type="number"
              min="0"
              placeholder="e.g. 200 (leave empty for unlimited)"
              value={form.capacity}
              onChange={update("capacity")}
            />
          </div>
          <div>
            <Label htmlFor="ef-hero">Hero Image URL</Label>
            <Input id="ef-hero" value={form.heroImage} onChange={update("heroImage")} />
          </div>
          <div>
            <Label htmlFor="ef-description">Description</Label>
            <Textarea rows={5} id="ef-description" value={form.description} onChange={update("description")} />
          </div>
          <div>
            <Label htmlFor="ef-speakers">Speakers (JSON)</Label>
            <Textarea
              rows={5}
              id="ef-speakers"
              className="font-mono text-xs"
              value={form.speakers}
              onChange={update("speakers")}
            />
            <span className="text-xs text-muted mt-1 block">
              Array of {`{ "name", "role", "photo" }`} objects.
            </span>
          </div>
          <div>
            <Label htmlFor="ef-organisers">Organisers (JSON)</Label>
            <Textarea
              rows={3}
              id="ef-organisers"
              className="font-mono text-xs"
              value={form.organisers}
              onChange={update("organisers")}
            />
            <span className="text-xs text-muted mt-1 block">Array of organisation names.</span>
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
                  <Save size={16} /> {isEdit ? "Save Changes" : "Create Event"}
                </>
              )}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
}