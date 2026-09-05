"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Label, Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password.");
      setStatus("error");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-sm w-full flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="bg-maroon-deep/10 rounded-full size-10 sm:size-12 flex items-center justify-center">
            <Lock size={18} className="text-maroon-deep" />
          </span>
          <h1 className="text-2xl sm:text-3xl">LUCI Admin</h1>
          <p className="text-sm">Sign in to manage the site.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-border-light rounded-card p-6 sm:p-8 flex flex-col gap-4 sm:gap-5 shadow-card"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Signing in..." : "Sign In"}
          </Button>
          {error && (
            <p role="alert" className="text-sm text-danger text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}