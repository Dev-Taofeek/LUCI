"use client";

import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { Label, Input, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const ROLES = [
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "ADMIN", label: "Admin" },
  { value: "EDITOR", label: "Editor" },
  { value: "SAFEGUARDING_OFFICER", label: "Safeguarding Officer" },
];

function buildForm(user) {
  return {
    name: user?.name ?? "",
    email: user?.email ?? "",
    role: user?.role ?? "EDITOR",
    password: "",
  };
}

export default function UserFormDrawer({ user, onClose, onSaved }) {
  const isEdit = Boolean(user?.id);
  const [form, setForm] = useState(() => buildForm(user));
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
        name: form.name,
        email: form.email,
        role: form.role,
      };
      if (form.password) payload.password = form.password;

      const endpoint = isEdit
        ? `/api/admin/users/${user.id}`
        : "/api/admin/users";
      const res = await fetch(endpoint, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save user.");
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
        aria-label={isEdit ? "Edit user" : "New user"}
        onClick={(e) => e.stopPropagation()}
        className="bg-white h-full w-full max-w-lg flex flex-col"
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-border-light shrink-0">
          <h2 className="text-lg sm:text-xl">{isEdit ? "Edit User" : "New User"}</h2>
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
            <Label htmlFor="uf-name">Full Name</Label>
            <Input id="uf-name" value={form.name} onChange={update("name")} required />
          </div>
          <div>
            <Label htmlFor="uf-email">Email</Label>
            <Input
              id="uf-email"
              type="email"
              value={form.email}
              onChange={update("email")}
              required
            />
          </div>
          <div>
            <Label htmlFor="uf-role">Role</Label>
            <Select id="uf-role" value={form.role} onChange={update("role")}>
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="uf-password">
              {isEdit ? "New Password (leave blank to keep current)" : "Password"}
            </Label>
            <Input
              id="uf-password"
              type="password"
              value={form.password}
              onChange={update("password")}
              required={!isEdit}
              minLength={8}
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
                  <Save size={16} /> {isEdit ? "Save Changes" : "Create User"}
                </>
              )}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
}