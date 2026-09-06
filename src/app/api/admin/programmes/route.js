import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireRoles, pickProgramme, missingField } from "@/lib/api";

export async function GET() {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  try {
    const programmes = await prisma.programme.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ programmes });
  } catch (err) {
    console.error("GET programmes failed:", err);
    return NextResponse.json({ error: "Could not load programmes." }, { status: 500 });
  }
}

export async function POST(req) {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  const body = await req.json().catch(() => ({}));

  const missing = missingField(body, ["title", "slug", "startDate"]);
  if (missing) {
    return NextResponse.json(
      { error: `${missing} is required.` },
      { status: 400 }
    );
  }

  try {
    const programme = await prisma.programme.create({ data: pickProgramme(body) });
    await logAudit({
      userId: auth.session.user.id,
      action: "CREATE",
      entity: "Programme",
      entityId: programme.id,
      metadata: { title: programme.title },
    });
    return NextResponse.json({ programme }, { status: 201 });
  } catch (err) {
    console.error("POST programmes failed:", err);
    return NextResponse.json(
      { error: "Could not create programme. Check the slug is unique." },
      { status: 400 }
    );
  }
}