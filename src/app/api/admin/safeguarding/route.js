import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRoles } from "@/lib/api";
import { SAFEGUARDING_ROLES } from "@/lib/constants";

export async function GET() {
  const auth = await requireRoles(SAFEGUARDING_ROLES);
  if (auth.error) return auth.response;

  try {
    const reports = await prisma.safeguardingReport.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ reports });
  } catch (err) {
    console.error("GET safeguarding failed:", err);
    return NextResponse.json({ error: "Could not load reports." }, { status: 500 });
  }
}