import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireRoles, pickResource, missingField } from "@/lib/api";

export async function GET() {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  try {
    const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ resources });
  } catch (err) {
    console.error("GET resources failed:", err);
    return NextResponse.json({ error: "Could not load resources." }, { status: 500 });
  }
}

export async function POST(req) {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  const body = await req.json().catch(() => ({}));

  const missing = missingField(body, ["title", "slug", "fileUrl"]);
  if (missing) {
    return NextResponse.json(
      { error: `${missing} is required.` },
      { status: 400 }
    );
  }

  try {
    const resource = await prisma.resource.create({ data: pickResource(body) });
    await logAudit({
      userId: auth.session.user.id,
      action: "CREATE",
      entity: "Resource",
      entityId: resource.id,
      metadata: { title: resource.title },
    });
    return NextResponse.json({ resource }, { status: 201 });
  } catch (err) {
    console.error("POST resources failed:", err);
    return NextResponse.json(
      { error: "Could not create resource. Check the slug is unique." },
      { status: 400 }
    );
  }
}