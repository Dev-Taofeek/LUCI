"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

function PaymentStatus() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState(() =>
    reference ? "checking" : "failure"
  );
  const [error, setError] = useState(() =>
    reference ? "" : "No transaction reference was provided."
  );

  useEffect(() => {
    if (!reference) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/donations/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error("Payment could not be verified.");
        }
        if (!cancelled) setStatus("success");
      } catch (err) {
        if (!cancelled) {
          setStatus("failure");
          setError(err.message || "Payment could not be verified.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reference]);

  return (
    <div className="container-luci py-16 sm:py-20 md:py-28 flex justify-center">
      <div
        role="status"
        aria-live="polite"
        className="bg-white border border-border-mid rounded-card p-6 sm:p-10 md:p-12 w-full max-w-lg flex flex-col items-center text-center gap-4 sm:gap-6"
      >
        {status === "checking" && (
          <>
            <Loader2 size={36} className="text-maroon-deep animate-spin" />
            <h1 className="text-2xl sm:text-3xl">Confirming your donation...</h1>
            <p className="text-sm sm:text-base">
              Please wait a moment while we verify your payment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <span className="bg-gold-light/50 rounded-full size-16 flex items-center justify-center">
              <CheckCircle2 size={36} className="text-maroon-deep" />
            </span>
            <h1 className="text-2xl sm:text-3xl">Thank you for your gift!</h1>
            <p className="text-sm sm:text-base">
              Your donation has been received and confirmed. A receipt has
              been recorded — every contribution directly funds our family
              development, community, and youth programmes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
              <Button variant="primary" href="/impact" className="w-full sm:w-auto">
                See Our Impact
              </Button>
              <Button variant="secondary" href="/" className="w-full sm:w-auto">
                Return Home
              </Button>
            </div>
          </>
        )}

        {status === "failure" && (
          <>
            <span className="bg-danger-light rounded-full size-16 flex items-center justify-center">
              <XCircle size={36} className="text-danger" />
            </span>
            <h1 className="text-2xl sm:text-3xl">Payment not completed</h1>
            <p className="text-sm sm:text-base">
              {error ||
                "Your payment was not verified. This can happen if you closed the checkout window early or the payment was declined."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
              <Button variant="primary" href="/donate" className="w-full sm:w-auto">
                Try Again
              </Button>
              <Button variant="secondary" href="/" className="w-full sm:w-auto">
                Return Home
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function DonateCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="container-luci py-16 sm:py-20 md:py-28 flex justify-center">
          <div className="bg-white border border-border-mid rounded-card p-6 sm:p-10 md:p-12 w-full max-w-lg flex flex-col items-center text-center gap-4">
            <Loader2 size={36} className="text-maroon-deep animate-spin" />
            <h1 className="text-2xl sm:text-3xl">Checking your donation…</h1>
          </div>
        </div>
      }
    >
      <PaymentStatus />
    </Suspense>
  );
}