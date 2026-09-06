import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isEmail } from "@/lib/validations";

export async function POST(req, { params }) {
  const { id: slug } = await params;
  const body = await req.json().catch(() => ({}));
  const { fullName, email, phone, notes } = body;

  if (!fullName || !email) {
    return NextResponse.json(
      { error: "Full name and email are required." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  try {
    const event = await prisma.event.findUnique({ where: { slug } });
    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    if (event.capacity != null) {
      const count = await prisma.eventRegistration.count({ where: { eventId: event.id } });
      if (count >= event.capacity) {
        return NextResponse.json(
          { error: "This event is fully booked. Please check other upcoming events." },
          { status: 409 }
        );
      }
    }

    const registration = await prisma.eventRegistration.create({
      data: { eventId: event.id, fullName, email, phone, notes },
    });

    return NextResponse.json({ registration }, { status: 201 });
  } catch (err) {
    console.error("POST event registration failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}