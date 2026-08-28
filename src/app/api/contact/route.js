import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const { fullName, email, subject, message } = await req.json();

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  try {
    const submission = await prisma.contactSubmission.create({
      data: { fullName, email, subject: subject || "General Enquiry", message },
    });
    return NextResponse.json({ submission }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}