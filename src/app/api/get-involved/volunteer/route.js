import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const { fullName, email, phone, location, skills, message } = await req.json();

  if (!fullName || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  try {
    const application = await prisma.volunteerApplication.create({
      data: { fullName, email, phone, location, skills: skills || [], message: message || "" },
    });
    return NextResponse.json({ application }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}