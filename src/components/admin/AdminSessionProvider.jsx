"use client";

import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";

export default function AdminSessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}