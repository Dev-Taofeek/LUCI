import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isEmail } from "@/lib/validations";

export async function POST(req) {
  const { reporterName, reporterContact, category, details, isAnonymous } = await req.json();

  if (!category || !details) {
    return NextResponse.json(
      { error: "Please describe the nature of the concern and provide details." },
      { status: 400 }
    );
  }

  const anonymous = isAnonymous === true;
  if (!anonymous) {
    if (reporterContact && !isEmail(reporterContact) && !/^[+\d][\d\s-]{6,}$/.test(String(reporterContact).trim())) {
      return NextResponse.json(
        { error: "Please provide a valid contact email or phone number." },
        { status: 400 }
      );
    }
  }

  try {
    const reference = `SG-${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
    const report = await prisma.safeguardingReport.create({
      data: {
        reference,
        reporterName: anonymous ? null : reporterName || null,
        reporterContact: anonymous ? null : reporterContact || null,
        isAnonymous: anonymous,
        category,
        details,
        status: "OPEN",
      },
    });
    return NextResponse.json({ reference: report.reference }, { status: 201 });
  } catch (err) {
    console.error("POST safeguarding report failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}