import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireRoles, pickProgramme } from "@/lib/api";

export async function PATCH(req, { params }) {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  try {
    const programme = await prisma.programme.update({
      where: { id },
      data: pickProgramme(body),
    });
    await logAudit({
      userId: auth.session.user.id,
      action: "UPDATE",
      entity: "Programme",
      entityId: programme.id,
      metadata: { title: programme.title },
    });
    return NextResponse.json({ programme });
  } catch (err) {
    console.error("PATCH programmes failed:", err);
    return NextResponse.json({ error: "Could not update programme." }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  const { id } = await params;

  try {
    const programme = await prisma.programme.delete({ where: { id } });
    await logAudit({
      userId: auth.session.user.id,
      action: "DELETE",
      entity: "Programme",
      entityId: programme.id,
      metadata: { title: programme.title },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE programmes failed:", err);
    return NextResponse.json({ error: "Could not delete programme." }, { status: 400 });
  }
}