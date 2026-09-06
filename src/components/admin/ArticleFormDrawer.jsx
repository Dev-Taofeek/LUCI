"use client";

import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { Label, Input, Select, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function buildForm(article) {
  return {
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    category: article?.category ?? "",
    excerpt: article?.excerpt ?? "",
    content: article?.content ?? "",
    coverImage: article?.coverImage ?? "",
    status: article?.status ?? "DRAFT",
    authorId: article?.authorId ?? article?.author?.id ?? "",
  };
}

export default function ArticleFormDrawer({ article, authors, onClose, onSaved }) {
  const isEdit = Boolean(article?.id);
  const [form, setForm] = useState(() => buildForm(article));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = { ...form };
      if (payload.category === "") payload.category = null;
      const endpoint = isEdit
        ? `/api/admin/news/${article.id}`
        : "/api/admin/news";
      const res = await fetch(endpoint, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save this article.");
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
        aria-label={isEdit ? "Edit article" : "New article"}
        onClick={(e) => e.stopPropagation()}
        className="bg-white h-full w-full max-w-lg flex flex-col"
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-border-light shrink-0">
          <h2 className="text-lg sm:text-xl">{isEdit ? "Edit Article" : "New Article"}</h2>
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
            <Label htmlFor="af-title">Title</Label>
            <Input id="af-title" value={form.title} onChange={update("title")} required />
          </div>
          <div>
            <Label htmlFor="af-slug">Slug</Label>
            <Input id="af-slug" value={form.slug} onChange={update("slug")} required />
            <span className="text-xs text-muted mt-1 block">
              Used in the URL — lowercase, hyphens. E.g. community-initiatives-2026.
            </span>
          </div>
          <div>
            <Label htmlFor="af-category">Category</Label>
            <Input
              id="af-category"
              placeholder="e.g. Education, Culture, Community Impact"
              value={form.category}
              onChange={update("category")}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="af-status">Status</Label>
              <Select id="af-status" value={form.status} onChange={update("status")}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="af-author">Author</Label>
              <Select id="af-author" value={form.authorId} onChange={update("authorId")}>
                {!form.authorId && (
                  <option value="">
                    {isEdit ? "Keep current author" : "Select author..."}
                  </option>
                )}
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.email})
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="af-hero">Cover Image URL</Label>
            <Input id="af-hero" value={form.coverImage} onChange={update("coverImage")} />
          </div>
          <div>
            <Label htmlFor="af-excerpt">Excerpt / Summary</Label>
            <Textarea rows={2} id="af-excerpt" value={form.excerpt} onChange={update("excerpt")} />
          </div>
          <div>
            <Label htmlFor="af-content">Body Content</Label>
            <Textarea
              rows={8}
              id="af-content"
              placeholder="Use a blank line to separate paragraphs."
              value={form.content}
              onChange={update("content")}
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
                  <Save size={16} /> {isEdit ? "Save Changes" : "Create Article"}
                </>
              )}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
}