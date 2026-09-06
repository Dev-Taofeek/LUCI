import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireRoles, pickResource } from "@/lib/api";

export async function PATCH(req, { params }) {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  try {
    const resource = await prisma.resource.update({
      where: { id },
      data: pickResource(body),
    });
    await logAudit({
      userId: auth.session.user.id,
      action: "UPDATE",
      entity: "Resource",
      entityId: resource.id,
      metadata: { title: resource.title },
    });
    return NextResponse.json({ resource });
  } catch (err) {
    console.error("PATCH resources failed:", err);
    return NextResponse.json({ error: "Could not update resource." }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  const { id } = await params;

  try {
    const resource = await prisma.resource.delete({ where: { id } });
    await logAudit({
      userId: auth.session.user.id,
      action: "DELETE",
      entity: "Resource",
      entityId: resource.id,
      metadata: { title: resource.title },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE resources failed:", err);
    return NextResponse.json({ error: "Could not delete resource." }, { status: 400 });
  }
}