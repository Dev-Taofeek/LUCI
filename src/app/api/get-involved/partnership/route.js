import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const { organisation, contactName, email, phone, proposalSummary } = await req.json();

  if (!organisation || !contactName || !email) {
    return NextResponse.json(
      { error: "Organisation, contact name, and email are required." },
      { status: 400 }
    );
  }

  try {
    const inquiry = await prisma.partnershipInquiry.create({
      data: { organisation, contactName, email, phone, proposalSummary: proposalSummary || "" },
    });
    return NextResponse.json({ inquiry }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}