import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initializePaystackTransaction } from "@/lib/paystack";

export async function POST(req) {
  const { donorName, donorEmail, amount, frequency, designation } = await req.json();

  if (!donorEmail || !amount || amount <= 0) {
    return NextResponse.json({ error: "A valid email and amount are required." }, { status: 400 });
  }

  const reference = `luci_${crypto.randomBytes(10).toString("hex")}`;
  const amountKobo = Math.round(Number(amount) * 100);

  try {
    const donation = await prisma.donation.create({
      data: {
        reference,
        donorName: donorName || null,
        donorEmail,
        amount: amountKobo,
        frequency: frequency === "MONTHLY" ? "MONTHLY" : "ONE_TIME",
        designation: designation || "General Fund",
        status: "PENDING",
      },
    });

    const callbackUrl = `${process.env.NEXTAUTH_URL}/donate/callback`;
    const paystackRes = await initializePaystackTransaction({
      email: donorEmail,
      amountKobo,
      reference,
      callbackUrl,
      metadata: { donationId: donation.id, designation: donation.designation },
    });

    if (!paystackRes.status) {
      return NextResponse.json(
        { error: paystackRes.message || "Could not start the transaction." },
        { status: 502 }
      );
    }

    return NextResponse.json({ authorizationUrl: paystackRes.data.authorization_url }, { status: 201 });
  } catch (err) {
    console.error("Donation init error:", err); 
    return NextResponse.json({ error: err.message || "Something went wrong. Please try again." }, { status: 500 }); 
  }
}