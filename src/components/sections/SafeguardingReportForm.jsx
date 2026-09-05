"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Label, Input, Textarea, Select, CheckboxChip } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const CATEGORIES = [
  "Physical Abuse",
  "Emotional Abuse",
  "Neglect",
  "Sexual Abuse",
  "Exploitation",
  "Online Safety Concern",
  "Other",
];

export default function SafeguardingReportForm() {
  const [form, setForm] = useState({
    reporterName: "",
    reporterContact: "",
    category: "",
    dateLocation: "",
    peopleInvolved: "",
    details: "",
    isAnonymous: false,
  });
  const [status, setStatus] = useState("idle");
  const [reference, setReference] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/safeguarding/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          details: `Date/Location: ${form.dateLocation}\nPeople involved: ${form.peopleInvolved}\n\n${form.details}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setReference(data.reference);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-border-mid rounded-card p-6 sm:p-8 md:p-10 text-center flex flex-col items-center gap-3">
        <ShieldAlert className="text-maroon-deep" size={32} />
        <h3 className="text-lg sm:text-xl">Report submitted securely</h3>
        <p className="text-sm sm:text-base">
          Your reference number is <strong className="text-maroon-deep">{reference}</strong>.
          Keep it for your records. Our Safeguarding team will review this
          immediately.
        </p>
      </div>
    );
  }

  return (
    <div className="relative bg-white border border-border-mid rounded-card p-5 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="bg-maroon-deep/10 rounded-control size-10 sm:size-12 flex items-center justify-center shrink-0">
            <ShieldAlert className="text-maroon-deep" size={20} />
          </span>
          <h2 className="text-xl sm:text-2xl leading-snug">Report a Concern</h2>
        </div>

        <div className="bg-border-light/50 border-l-4 border-gold rounded-r-card p-3 sm:p-4">
          <p className="text-sm text-charcoal">
            <strong>Secure &amp; Confidential:</strong> Submissions are stored
            securely and are strictly accessible only to authorized LUCI
            Safeguarding Administrators. Anonymous reports are fully
            permitted and excluded from all general analytics.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          <CheckboxChip
            label="I wish to report this anonymously"
            checked={form.isAnonymous}
            onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })}
          />

          {!form.isAnonymous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <Label htmlFor="reporterName">Name (Optional)</Label>
                <Input
                  id="reporterName"
                  placeholder="Your name"
                  value={form.reporterName}
                  onChange={(e) => setForm({ ...form, reporterName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="reporterContact">Email or Phone (Optional)</Label>
                <Input
                  id="reporterContact"
                  placeholder="How can we reach you?"
                  value={form.reporterContact}
                  onChange={(e) => setForm({ ...form, reporterContact: e.target.value })}
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="category">Nature of concern *</Label>
            <Select
              id="category"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select category...</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="dateLocation">Date / Location *</Label>
            <Input
              id="dateLocation"
              required
              placeholder="When and where did this occur?"
              value={form.dateLocation}
              onChange={(e) => setForm({ ...form, dateLocation: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="peopleInvolved">People involved *</Label>
            <Input
              id="peopleInvolved"
              required
              placeholder="Names or descriptions of those involved"
              value={form.peopleInvolved}
              onChange={(e) => setForm({ ...form, peopleInvolved: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="details">Description *</Label>
            <Textarea
              id="details"
              required
              rows={5}
              placeholder="Please provide as much detail as possible..."
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
            />
          </div>

          <div className="bg-border-light/50 border border-dashed border-border-mid rounded-card p-4 sm:p-5 text-center">
            <p className="text-sm text-muted">
              Screenshots or documents can be requested separately by our
              Safeguarding team and kept strictly confidential.
            </p>
          </div>

          <Button
            as="button"
            type="submit"
            variant="primary"
            className="w-full justify-center"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Submitting..." : "Submit Secure Report"}
          </Button>
          {status === "error" && (
            <p role="alert" className="text-sm text-danger text-center">
              Something went wrong — please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}