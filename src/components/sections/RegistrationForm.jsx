"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
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
      <div className="bg-warm-white border border-border-light rounded-[12px] p-8 text-center">
        <h3 className="text-maroon-deep mb-2">You&apos;re registered!</h3>
        <p className="text-sm text-muted">
          We&apos;ve sent a confirmation to {form.email}. See you there.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border-mid/50 shadow-[0_4px_10px_rgba(110,15,26,0.04)] rounded-[12px] p-8 flex flex-col gap-6">
      <h3 className="!text-[22px]">Register Now</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          placeholder="Full Name"
          required
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <select
          value={form.attendance}
          onChange={(e) => setForm({ ...form, attendance: e.target.value })}
          className="w-full bg-warm-white border border-border-mid rounded-control px-4 py-3 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep"
        >
          {ATTENDANCE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt} Attendance
            </option>
          ))}
        </select>
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
          <p className="text-sm text-maroon-deep">
            Something went wrong — please try again.
          </p>
        )}
      </form>
    </div>
  );
}