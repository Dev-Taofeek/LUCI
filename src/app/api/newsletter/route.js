import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isEmail } from "@/lib/validations";

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: "Please provide an email address." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  try {
    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email },
    });
    return NextResponse.json({ subscriber }, { status: 201 });
  } catch (err) {
    if (err?.code === "P2002") {
      return NextResponse.json(
        { message: "You're already on the list — thank you!" },
        { status: 200 }
      );
    }
    console.error("POST newsletter failed:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}