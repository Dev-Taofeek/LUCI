"use client";

export const dynamic = "force-dynamic";


import { SessionProvider } from "next-auth/react";

export default function AdminSessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}