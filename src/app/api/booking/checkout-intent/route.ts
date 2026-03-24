import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { BOOKING_CURRENCY } from "@/lib/booking/config";
import { checkAvailability } from "@/lib/booking/guesty";
import { computeBookingAmountCents } from "@/lib/booking/pricing";
import { upsertCheckoutSession } from "@/lib/booking/store";
import { validateBookingRequest } from "@/lib/booking/validation";

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!stripeSecretKey || !stripePublishableKey) {
      return NextResponse.json(
        { error: "Stripe keys are not configured." },
        { status: 500 }
      );
    }

    const payload = await request.json();
    const booking = validateBookingRequest(payload);

    // Final server-side availability check before payment intent creation.
    const available = await checkAvailability(
      booking.cabinId,
      booking.checkIn,
      booking.checkOut
    );
    if (!available) {
      return NextResponse.json(
        { error: "Selected dates are no longer available." },
        { status: 409 }
      );
    }

    const amount = computeBookingAmountCents(booking);
    const sessionId = randomUUID();
    const idempotencyKey = `checkout-${sessionId}`;

    const stripe = new Stripe(stripeSecretKey);
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount,
        currency: BOOKING_CURRENCY,
        automatic_payment_methods: { enabled: true },
        metadata: {
          checkoutSessionId: sessionId,
          cabinId: booking.cabinId,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          guestEmail: booking.guest.email,
        },
      },
      { idempotencyKey }
    );

    upsertCheckoutSession({
      sessionId,
      paymentIntentId: paymentIntent.id,
      idempotencyKey,
      booking,
      amountCents: amount,
      state: "pending",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      sessionId,
      clientSecret: paymentIntent.client_secret,
      publishableKey: stripePublishableKey,
      amountCents: amount,
      currency: BOOKING_CURRENCY,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
