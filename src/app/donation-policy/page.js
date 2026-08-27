"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

function CallbackContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const [state, setState] = useState("verifying"); // verifying | success | failed

  useEffect(() => {
    if (!reference) {
      setState("failed");
      return;
    }
    fetch("/api/donations/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference }),
    })
      .then((res) => res.json())
      .then((data) => setState(data.success ? "success" : "failed"))
      .catch(() => setState("failed"));
  }, [reference]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full bg-white border border-border-light rounded-card p-10 flex flex-col items-center text-center gap-4 shadow-[0_4px_10px_rgba(110,15,26,0.04)]">
        {state === "verifying" && (
          <>
            <Loader2 className="animate-spin text-maroon-deep" size={40} />
            <h2 className="!text-[24px]">Confirming your donation...</h2>
            <p>Please don&apos;t close this page.</p>
          </>
        )}
        {state === "success" && (
          <>
            <CheckCircle2 className="text-gold" size={48} />
            <h2 className="!text-[24px]">Thank you for your generosity!</h2>
            <p>
              Your donation has been received and will directly support
              LUCI&apos;s programmes. A receipt has been sent to your email.
            </p>
            <Button variant="primary" href="/" className="mt-2">
              Return Home
            </Button>
          </>
        )}
        {state === "failed" && (
          <>
            <XCircle className="text-maroon-deep" size={48} />
            <h2 className="!text-[24px]">We couldn&apos;t confirm this payment</h2>
            <p>
              If an amount was charged, it will be refunded automatically. No
              charge was completed on our end.
            </p>
            <Button variant="secondary" href="/get-involved#donate" className="mt-2">
              Try Again
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default function DonationCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-maroon-deep" size={40} />
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}