import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireRoles } from "@/lib/api";
import { ROLES } from "@/lib/constants";

function publicUser(u) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    image: u.image,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}

export async function PATCH(req, { params }) {
  const auth = await requireRoles(["SUPER_ADMIN"]);
  if (auth.error) return auth.response;

  const { id } = await params;
  const { name, email, role, password } = await req.json().catch(() => ({}));

  const data = {};
  if (name !== undefined && name !== null) data.name = name;
  if (email !== undefined && email !== null) data.email = email;
  if (role !== undefined && role !== null) {
    if (!ROLES.includes(role)) {
      return NextResponse.json({ error: "Invalid role." }, { status: 400 });
    }
    data.role = role;
  }
  if (password) {
    const bcrypt = await import("bcryptjs");
    data.passwordHash = await bcrypt.hash(password, 10);
  }

  try {
    const user = await prisma.user.update({ where: { id }, data });
    await logAudit({
      userId: auth.session.user.id,
      action: "UPDATE",
      entity: "User",
      entityId: user.id,
      metadata: { email: user.email, role: user.role },
    });
    return NextResponse.json({ user: publicUser(user) });
  } catch (err) {
    console.error("PATCH users failed:", err);
    return NextResponse.json({ error: "Could not update user." }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const auth = await requireRoles(["SUPER_ADMIN"]);
  if (auth.error) return auth.response;

  const { id } = await params;

  if (id === auth.session.user.id) {
    return NextResponse.json({ error: "You cannot delete your own account." }, { status: 400 });
  }

  try {
    await prisma.user.delete({ where: { id } });
    await logAudit({
      userId: auth.session.user.id,
      action: "DELETE",
      entity: "User",
      entityId: id,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE users failed:", err);
    return NextResponse.json({ error: "Could not delete user." }, { status: 400 });
  }
}