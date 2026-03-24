import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createReservationFromPayment } from "@/lib/booking/guesty";
import {
  findSessionByPaymentIntent,
  getReservationForPaymentIntent,
  markSessionConfirmed,
} from "@/lib/booking/store";

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!stripeSecretKey || !webhookSecret) {
      return NextResponse.json(
        { error: "Stripe webhook is not configured." },
        { status: 500 }
      );
    }

    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header." },
        { status: 400 }
      );
    }

    const payload = await request.text();
    const stripe = new Stripe(stripeSecretKey);
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const existingReservation = getReservationForPaymentIntent(paymentIntent.id);
      if (existingReservation) {
        return NextResponse.json({ ok: true, duplicate: true });
      }

      const session = findSessionByPaymentIntent(paymentIntent.id);
      if (!session) {
        return NextResponse.json(
          { error: "Checkout session not found for payment intent." },
          { status: 404 }
        );
      }

      const reservationId = await createReservationFromPayment(
        session.booking,
        paymentIntent.id
      );
      markSessionConfirmed(session.sessionId, reservationId);

      // Placeholder for email/SMS provider call.
      console.info(
        `Booking confirmed for ${session.booking.guest.email}; reservation ${reservationId}`
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
