"use client";

import { useState } from "react";
import { Label, Input, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const ATTENDANCE_OPTIONS = ["In-Person", "Virtual"];

export default function RegistrationForm({ slug }) {
  const [form, setForm] = useState({ fullName: "", email: "", attendance: "In-Person" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(`/api/events/${slug}/register`, {
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
      <div className="bg-white border border-border-mid rounded-card p-8 text-center flex flex-col gap-2">
        <h3 className="text-maroon-deep">You&apos;re registered!</h3>
        <p className="text-sm text-muted">
          We&apos;ve sent a confirmation to {form.email}. See you there.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border-mid shadow-card rounded-card p-6 sm:p-8 flex flex-col gap-5">
      <h3>Register Now</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Jane Doe"
            required
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@example.com"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="attendance">Attendance Mode</Label>
          <Select
            id="attendance"
            value={form.attendance}
            onChange={(e) => setForm({ ...form, attendance: e.target.value })}
          >
            {ATTENDANCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt} Attendance
              </option>
            ))}
          </Select>
        </div>
        <Button
          as="button"
          type="submit"
          variant="primary"
          className="w-full justify-center"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Registering..." : "Register for Event"}
        </Button>
        {status === "error" && (
          <p role="alert" className="text-sm text-danger">Something went wrong — please try again.</p>
        )}
      </form>
    </div>
  );
}