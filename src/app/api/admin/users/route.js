import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireRoles, missingField } from "@/lib/api";
import { ROLES } from "@/lib/constants";
import { isEmail, isStrongPassword } from "@/lib/validations";

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

export async function GET() {
  const auth = await requireRoles(["SUPER_ADMIN"]);
  if (auth.error) return auth.response;

  try {
    const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
    return NextResponse.json({ users: users.map(publicUser) });
  } catch (err) {
    console.error("GET users failed:", err);
    return NextResponse.json({ error: "Could not load users." }, { status: 500 });
  }
}

export async function POST(req) {
  const auth = await requireRoles(["SUPER_ADMIN"]);
  if (auth.error) return auth.response;

  const { name, email, password, role } = await req.json().catch(() => ({}));

  const missing = missingField({ name, email, password }, ["name", "email", "password"]);
  if (missing) {
    return NextResponse.json(
      { error: `${missing} is required.` },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!isStrongPassword(password)) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters long." },
      { status: 400 }
    );
  }
  if (role && !ROLES.includes(role)) {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }

  try {
    const bcrypt = await import("bcryptjs");
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, role: role || "EDITOR", passwordHash },
    });
    await logAudit({
      userId: auth.session.user.id,
      action: "CREATE",
      entity: "User",
      entityId: user.id,
      metadata: { email: user.email, role: user.role },
    });
    return NextResponse.json({ user: publicUser(user) }, { status: 201 });
  } catch (err) {
    console.error("POST users failed:", err);
    return NextResponse.json(
      { error: "Could not create user. Email may already be in use." },
      { status: 400 }
    );
  }
}