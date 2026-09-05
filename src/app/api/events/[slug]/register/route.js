import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req, { params }) {
  const { slug } = await params;
  const body = await req.json();
  const { fullName, email, phone, notes } = body;

  if (!fullName || !email) {
    return NextResponse.json(
      { error: "Full name and email are required." },
      { status: 400 }
    );
  }

  try {
    const event = await prisma.event.findUnique({ where: { slug } });
    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    const registration = await prisma.eventRegistration.create({
      data: { eventId: event.id, fullName, email, phone, notes },
    });

    return NextResponse.json({ registration }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}