import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireRoles } from "@/lib/api";
import { SAFEGUARDING_ROLES, SAFEGUARDING_STATUSES } from "@/lib/constants";

export async function PATCH(req, { params }) {
  const auth = await requireRoles(SAFEGUARDING_ROLES);
  if (auth.error) return auth.response;

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const status = body.status;

  if (!SAFEGUARDING_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  try {
    const report = await prisma.safeguardingReport.update({
      where: { id },
      data: { status },
    });
    await logAudit({
      userId: auth.session.user.id,
      action: "UPDATE",
      entity: "SafeguardingReport",
      entityId: report.id,
      metadata: { status },
    });
    return NextResponse.json({ report });
  } catch (err) {
    console.error("PATCH safeguarding failed:", err);
    return NextResponse.json({ error: "Could not update report." }, { status: 400 });
  }
}