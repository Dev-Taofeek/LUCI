"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Email capture form used across the site. Subscribes to `POST {endpoint}`
 * with `{ email }`; shows a success note only when the request succeeds so the
 * component stays honest until the subscription API is wired up.
 * `className` styles the layout wrapper (field + button).
 */
export default function NewsletterForm({
  endpoint = "/api/newsletter",
  className,
  inputId = "newsletter-email",
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className={cn("text-sm font-semibold text-gold", className)} role="status">
        Thank you — please check your inbox to confirm your subscription.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className={cn("flex flex-col gap-3", className)}>
        <input
          id={inputId}
          type="email"
          required
          placeholder="Enter your email address"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white rounded-control px-4 sm:px-6 py-3 sm:py-3.5 text-base text-charcoal placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-gold text-charcoal rounded-control px-6 py-3 text-sm font-semibold btn-tracking transition-colors duration-200 hover:bg-white hover:text-maroon-deep disabled:opacity-60 sm:w-auto sm:px-8"
        >
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
    </form>
  );
}