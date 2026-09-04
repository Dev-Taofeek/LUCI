"use client";

import { useState } from "react";
import { Label, Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { PROGRAMMES } from "@/lib/data/programmes";

const PRESET_AMOUNTS = [10, 25, 50, 100];

export default function DonationForm() {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("ONE_TIME");
  const [designation, setDesignation] = useState("General Fund");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const finalAmount = customAmount ? Number(customAmount) : amount;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/donations/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName,
          donorEmail,
          amount: finalAmount,
          frequency,
          designation,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      // Redirect the donor to Paystack's hosted checkout.
      window.location.href = data.authorizationUrl;
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <div className="bg-white border border-border-light rounded-md p-8 shadow-[0_4px_10px_rgba(110,15,26,0.04)] flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Frequency toggle */}
        <div className="flex bg-warm-white border border-border-mid rounded-md p-1">
          {["ONE_TIME", "MONTHLY"].map((freq) => (
            <button
              key={freq}
              type="button"
              onClick={() => setFrequency(freq)}
              className={`flex-1 rounded-md py-3 text-sm font-semibold btn-tracking transition-colors ${
                frequency === freq ? "bg-maroon-deep text-white" : "text-muted"
              }`}
            >
              {freq === "ONE_TIME" ? "One-Time" : "Monthly"}
            </button>
          ))}
        </div>

        {/* Amount presets */}
        <div>
          <Label>Amount (USD)</Label>
          <div className="grid grid-cols-4 gap-3">
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setAmount(preset);
                  setCustomAmount("");
                }}
                className={`rounded-md py-3 text-sm font-semibold border transition-colors ${
                  !customAmount && amount === preset
                    ? "bg-maroon-deep text-white border-maroon-deep"
                    : "bg-warm-white text-charcoal border-border-mid hover:border-maroon-deep/40"
                }`}
              >
                ${preset}
              </button>
            ))}
          </div>
          <Input
            type="number"
            min="1"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="mt-3"
          />
        </div>

        {/* Designation */}
        <div>
          <Label htmlFor="designation">Designate to</Label>
          <select
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full bg-warm-white border border-border-mid rounded-md px-4 py-3.5 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep"
          >
            <option>General Fund</option>
            {PROGRAMMES.map((p) => (
              <option key={p.slug}>{p.title}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="donorName">Full Name</Label>
            <Input id="donorName" placeholder="Jane Doe" value={donorName} onChange={(e) => setDonorName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="donorEmail">Email Address</Label>
            <Input
              id="donorEmail"
              type="email"
              placeholder="jane@example.com"
              required
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
            />
          </div>
        </div>

        <Button
          as="button"
          type="submit"
          variant="secondary"
          className="w-full justify-center"
          disabled={status === "submitting" || !finalAmount}
        >
          {status === "submitting"
            ? "Redirecting to secure checkout..."
            : `Donate $${finalAmount || 0}${frequency === "MONTHLY" ? "/month" : ""}`}
        </Button>

        {error && <p className="text-sm text-maroon-deep text-center">{error}</p>}

        <p className="text-xs text-muted text-center">
          Payments are securely processed by Paystack. LUCI never stores your
          card details.
        </p>
      </form>
    </div>
  );
}