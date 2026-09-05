"use client";

import { useState } from "react";
import { Label, Input, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { PROGRAMMES } from "@/lib/data/programmes";
import { cn } from "@/lib/utils";

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

  const parsedCustom = Number(customAmount);
  const customInvalid =
    customAmount !== "" && (!Number.isFinite(parsedCustom) || parsedCustom <= 0);
  const finalAmount = customAmount ? parsedCustom : amount;
  const canSubmit = Number.isFinite(finalAmount) && finalAmount > 0;

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
    <div className="bg-white border border-border-mid rounded-card p-5 sm:p-7 md:p-8 flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Frequency toggle */}
        <div className="flex bg-white border border-border-mid rounded-control p-1">
          {["ONE_TIME", "MONTHLY"].map((freq) => (
            <button
              key={freq}
              type="button"
              aria-pressed={frequency === freq}
              onClick={() => setFrequency(freq)}
              className={cn(
                "flex-1 rounded-[6px] py-3 text-sm font-semibold btn-tracking transition-colors",
                frequency === freq ? "bg-maroon-deep text-white" : "text-muted hover:text-maroon-deep"
              )}
            >
              {freq === "ONE_TIME" ? "One-Time" : "Monthly"}
            </button>
          ))}
        </div>

        {/* Amount presets */}
        <div className="flex flex-col gap-2">
          <Label>Amount (USD)</Label>
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                type="button"
                aria-pressed={!customAmount && amount === preset}
                onClick={() => {
                  setAmount(preset);
                  setCustomAmount("");
                }}
                className={cn(
                  "rounded-control py-3 text-sm font-semibold border transition-colors",
                  !customAmount && amount === preset
                    ? "bg-maroon-deep text-white border-maroon-deep"
                    : "bg-white text-charcoal border-border-mid hover:border-maroon-deep/40"
                )}
              >
                ${preset}
              </button>
            ))}
          </div>
          <Input
            type="number"
            min="1"
            placeholder="Custom amount"
            inputMode="numeric"
            value={customAmount}
            aria-invalid={customInvalid}
            aria-describedby={customInvalid ? "custom-amount-error" : undefined}
            onChange={(e) => setCustomAmount(e.target.value)}
          />
          {customInvalid && (
            <p id="custom-amount-error" role="alert" className="text-sm text-danger">
              Please enter a valid amount greater than 0.
            </p>
          )}
        </div>

        {/* Designation */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="designation">Designate to</Label>
          <Select
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option>General Fund</option>
            {PROGRAMMES.map((p) => (
              <option key={p.slug}>{p.title}</option>
            ))}
          </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="donorName">Full Name</Label>
            <Input
              id="donorName"
              placeholder="Jane Doe"
              autoComplete="name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="donorEmail">Email Address</Label>
            <Input
              id="donorEmail"
              type="email"
              placeholder="jane@example.com"
              required
              autoComplete="email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="secondary"
          className="w-full justify-center"
          disabled={status === "submitting" || !canSubmit}
        >
          {status === "submitting"
            ? "Redirecting to secure checkout..."
            : `Donate $${finalAmount}${
                frequency === "MONTHLY" ? "/month" : ""
              }`}
        </Button>

        {error && (
          <p role="alert" className="text-sm text-danger text-center">
            {error}
          </p>
        )}

        <p className="text-xs text-muted text-center">
          Payments are securely processed by Paystack. LUCI never stores your
          card details.
        </p>
      </form>
    </div>
  );
}