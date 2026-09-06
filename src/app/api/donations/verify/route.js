import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPaystackTransaction } from "@/lib/paystack";

export async function POST(req) {
  const { reference } = await req.json();
  if (!reference) {
    return NextResponse.json({ error: "Missing transaction reference." }, { status: 400 });
  }

  try {
    const result = await verifyPaystackTransaction(reference);
    const success = result.data?.status === "success";

    const donation = await prisma.donation.update({
      where: { reference },
      data: {
        status: success ? "SUCCESS" : "FAILED",
        paystackChannel: result.data?.channel || null,
      },
    });

    return NextResponse.json({ donation, success });
  } catch (err) {
    return NextResponse.json({ error: "Could not verify this transaction." }, { status: 500 });
  }
}
