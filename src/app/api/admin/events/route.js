import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireRoles, pickEvent, missingField } from "@/lib/api";

export async function GET() {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: "desc" },
      include: { _count: { select: { registrations: true } } },
    });
    return NextResponse.json({ events });
  } catch (err) {
    console.error("GET events failed:", err);
    return NextResponse.json({ error: "Could not load events." }, { status: 500 });
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
    const event = await prisma.event.create({ data: pickEvent(body) });
    await logAudit({
      userId: auth.session.user.id,
      action: "CREATE",
      entity: "Event",
      entityId: event.id,
      metadata: { title: event.title },
    });
    return NextResponse.json({ event }, { status: 201 });
  } catch (err) {
    console.error("POST events failed:", err);
    return NextResponse.json(
      { error: "Could not create event. Check the slug is unique." },
      { status: 400 }
    );
  }
}