import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRoles } from "@/lib/api";

export async function GET() {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ users });
  } catch (err) {
    console.error("GET authors failed:", err);
    return NextResponse.json({ error: "Could not load authors." }, { status: 500 });
  }
}