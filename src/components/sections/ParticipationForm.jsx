"use client";

import { useState } from "react";
import { Label, Input, Textarea, CheckboxChip } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ParticipationForm({ endpoint, fields, skillOptions, submitLabel, successMessage }) {
  const initial = Object.fromEntries(fields.map((f) => [f.name, ""]));
  const [form, setForm] = useState({ ...initial, skills: [] });
  const [status, setStatus] = useState("idle");

  function toggleSkill(skill) {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-border-light rounded-card p-6 sm:p-8 md:p-10 shadow-[0_4px_10px_rgba(110,15,26,0.04)] text-center">
        <h3 className="text-maroon-deep text-lg sm:text-xl mb-2">Thank you!</h3>
        <p className="text-sm text-muted">{successMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border-light rounded-card p-5 sm:p-6 md:p-8 shadow-[0_4px_10px_rgba(110,15,26,0.04)]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {fields.map((field) => (
            <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={form[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                />
              ) : (
                <Input
                  id={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={form[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                />
              )}
            </div>
          ))}
        </div>

        {skillOptions && (
          <div className="flex flex-col gap-2">
            <Label>Skills (Select all that apply)</Label>
            <div className="flex gap-2 flex-wrap">
              {skillOptions.map((skill) => (
                <CheckboxChip
                  key={skill}
                  label={skill}
                  checked={form.skills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                />
              ))}
            </div>
          </div>
        )}

        <Button
          as="button"
          type="submit"
          variant="primary"
          className="w-full justify-center"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting..." : submitLabel}
        </Button>
        {status === "error" && (
          <p className="text-sm text-maroon-deep text-center">
            Something went wrong — please try again.
          </p>
        )}
      </form>
    </div>
  );
}