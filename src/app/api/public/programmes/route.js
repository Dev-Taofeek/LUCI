import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const programmes = await prisma.programme.findMany({
    select: { slug: true, title: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ programmes });
}