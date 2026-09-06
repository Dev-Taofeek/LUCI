import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireRoles, pickEvent } from "@/lib/api";

export async function PATCH(req, { params }) {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  try {
    const event = await prisma.event.update({
      where: { id },
      data: pickEvent(body),
    });
    await logAudit({
      userId: auth.session.user.id,
      action: "UPDATE",
      entity: "Event",
      entityId: event.id,
      metadata: { title: event.title },
    });
    return NextResponse.json({ event });
  } catch (err) {
    console.error("PATCH events failed:", err);
    return NextResponse.json({ error: "Could not update event." }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  const { id } = await params;

  try {
    const event = await prisma.event.delete({ where: { id } });
    await logAudit({
      userId: auth.session.user.id,
      action: "DELETE",
      entity: "Event",
      entityId: event.id,
      metadata: { title: event.title },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE events failed:", err);
    return NextResponse.json({ error: "Could not delete event." }, { status: 400 });
  }
}