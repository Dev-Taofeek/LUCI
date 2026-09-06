import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isEmail } from "@/lib/validations";

export async function POST(req) {
  const { fullName, email, phone, location, skills, message } = await req.json();

  if (!fullName || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  try {
    const application = await prisma.volunteerApplication.create({
      data: { fullName, email, phone, location, skills: skills || [], message: message || "" },
    });
    return NextResponse.json({ application }, { status: 201 });
  } catch (err) {
    console.error("POST volunteer failed:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}