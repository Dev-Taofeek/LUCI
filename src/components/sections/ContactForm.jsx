"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Label, Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const ENQUIRY_TYPES = ["General", "Volunteering", "Partnership", "Media & Press", "Donations"];

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryType: "General",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: `[${form.enquiryType}] ${form.subject}` }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white/85 backdrop-blur-md border border-border-light rounded-[12px] p-6 sm:p-8 text-center">
        <h2 className="text-2xl sm:!text-[28px] mb-2">Message sent!</h2>
        <p className="text-sm sm:text-base">Our team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/85 backdrop-blur-md border border-border-light rounded-[12px] p-5 sm:p-6 md:p-8 flex flex-col gap-2">
      <h2 className="text-2xl sm:!text-[28px]">Send a Message</h2>
      <p className="text-sm">Fill out the form below and our team will get back to you shortly.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Jane Doe"
              required
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
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+234 XXX XXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="enquiryType">Enquiry Type</Label>
            <select
              id="enquiryType"
              value={form.enquiryType}
              onChange={(e) => setForm({ ...form, enquiryType: e.target.value })}
              className="w-full bg-warm-white border border-border-mid rounded-control px-3 sm:px-4 py-3 sm:py-3.5 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep"
            >
              {ENQUIRY_TYPES.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="How can we help you?"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Please provide details..."
            rows={5}
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        <Button
          as="button"
          type="submit"
          variant="primary"
          className="w-full justify-center gap-2"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send Message"} <Send size={14} />
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