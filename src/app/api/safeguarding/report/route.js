import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const { reporterName, reporterContact, category, details, isAnonymous } = await req.json();

  if (!category || !details) {
    return NextResponse.json(
      { error: "Please describe the nature of the concern and provide details." },
      { status: 400 }
    );
  }

  try {
    const reference = `SG-${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
    const report = await prisma.safeguardingReport.create({
      data: {
        reference,
        reporterName: isAnonymous ? null : reporterName || null,
        reporterContact: isAnonymous ? null : reporterContact || null,
        isAnonymous: !!isAnonymous,
        category,
        details,
        status: "OPEN",
      },
    });
    return NextResponse.json({ reference: report.reference }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}