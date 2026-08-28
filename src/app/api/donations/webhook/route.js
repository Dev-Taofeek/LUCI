import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Paystack calls this server-to-server regardless of whether the donor's
// browser makes it back to /donate/callback — this is the source of truth
// for payment status, with the /verify route as a fast-path for the UI.
export async function POST(req) {
  const signature = req.headers.get("x-paystack-signature");
  const rawBody = await req.text();

  const expectedHash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY || "")
    .update(rawBody)
    .digest("hex");

  if (expectedHash !== signature) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    await prisma.donation.update({
      where: { reference: event.data.reference },
      data: { status: "SUCCESS", paystackChannel: event.data.channel },
    });
  }

  return NextResponse.json({ received: true });
}