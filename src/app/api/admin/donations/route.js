import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRoles } from "@/lib/api";

export async function GET(req) {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const frequency = searchParams.get("frequency");

  try {
    const donations = await prisma.donation.findMany({
      where: {
        ...(status && status !== "ALL" ? { status } : {}),
        ...(frequency && frequency !== "ALL" ? { frequency } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ donations });
  } catch (err) {
    console.error("GET donations failed:", err);
    return NextResponse.json({ error: "Could not load donations." }, { status: 500 });
  }
}