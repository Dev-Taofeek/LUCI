"use client";

import { useState } from "react";
import { ShieldAlert, Upload } from "lucide-react";
import { Label, Input, Textarea, CheckboxChip } from "@/components/ui/Input";
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
      <div className="bg-border-light/40 border border-border-mid rounded-md p-6 sm:p-8 md:p-10 text-center flex flex-col items-center gap-3">
        <ShieldAlert className="text-maroon-deep" size={32} />
        <h3 className="text-lg sm:!text-[22px]">Report submitted securely</h3>
        <p className="text-sm sm:text-base">
          Your reference number is <strong className="text-maroon-deep">{reference}</strong>.
          Keep it for your records. Our Safeguarding team will review this
          immediately.
        </p>
      </div>
    );
  }

  return (
    <div className="relative bg-border-light/40 border border-border-mid rounded-md p-5 sm:p-6 md:p-8 lg:p-10 overflow-hidden">
      <div className="absolute -right-16 -top-16 size-48 sm:size-64 rounded-md bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-5 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="bg-maroon-deep/10 rounded-md size-10 sm:size-12 flex items-center justify-center shrink-0">
            <ShieldAlert className="text-maroon-deep" size={20} />
          </span>
          <h2 className="text-xl sm:text-2xl md:!text-[28px] leading-snug">Report a Concern</h2>
        </div>

        <div className="bg-white border-l-4 border-gold rounded-r-md p-3 sm:p-4">
          <p className="text-sm !text-charcoal mb-0 font-thin">
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
                  className="w-full bg-white border border-border-mid rounded-md px-3 sm:px-4 py-3 sm:py-3.5 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep"
                  onChange={(e) => setForm({ ...form, reporterName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="reporterContact">Email or Phone (Optional)</Label>
                <Input
                  id="reporterContact"
                  placeholder="How can we reach you?"
                  className="w-full bg-white border border-border-mid rounded-md px-3 sm:px-4 py-3 sm:py-3.5 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep"
                  value={form.reporterContact}
                  onChange={(e) => setForm({ ...form, reporterContact: e.target.value })}
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="category">Nature of concern *</Label>
            <select
              id="category"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-white border border-border-mid rounded-md px-3 sm:px-4 py-3 sm:py-3.5 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep"
            >
              <option value="">Select category...</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="dateLocation">Date / Location *</Label>
            <Input
              id="dateLocation"
              required
              placeholder="When and where did this occur?"
              className="w-full bg-white border border-border-mid rounded-md px-3 sm:px-4 py-3 sm:py-3.5 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep"
              value={form.dateLocation}
              onChange={(e) => setForm({ ...form, dateLocation: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="peopleInvolved">People involved *</Label>
            <Input
              id="peopleInvolved"
              required
              className="w-full bg-white border border-border-mid rounded-md px-3 sm:px-4 py-3 sm:py-3.5 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep"
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
              className="w-full bg-white border border-border-mid rounded-md px-3 sm:px-4 py-3 sm:py-3.5 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep"
              rows={5}
              placeholder="Please provide as much detail as possible..."
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
            />
          </div>

          <div className="bg-white border-2 border-dashed border-border-mid rounded-md p-5 sm:p-6 md:p-8 flex flex-col items-center gap-2 text-center">
            <Upload size={18} className="text-muted shrink-0" />
            <span className="text-sm font-semibold text-charcoal btn-tracking">
              Upload supporting information
            </span>
            <span className="text-xs sm:text-sm text-muted">
              Drag and drop files here or click to browse (Optional)
            </span>
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
            <p className="text-sm text-maroon-deep text-center">
              Something went wrong — please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}