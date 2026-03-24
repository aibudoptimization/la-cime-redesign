"use client";

import { useMemo, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type {
  CheckoutIntentErrorResponse,
  CheckoutIntentResponse,
} from "@/lib/booking/contracts";
import type { BookingRequest, CabinId } from "@/lib/booking/types";

type AvailabilityState = "idle" | "checking" | "available" | "unavailable";

function CheckoutForm({
  sessionId,
  onConfirmed,
}: {
  sessionId: string;
  onConfirmed: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message || "Payment failed.");
      setProcessing(false);
      return;
    }

    for (let i = 0; i < 12; i += 1) {
      const res = await fetch(`/api/booking/checkout-status?sessionId=${sessionId}`);
      if (!res.ok) continue;
      const data = (await res.json()) as {
        state: "pending" | "confirmed" | "failed";
        reservationId: string | null;
      };
      if (data.state === "confirmed") {
        onConfirmed(
          `Booking confirmed. Reservation ${data.reservationId ?? "created"} and payment received.`
        );
        setProcessing(false);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    onConfirmed(
      "Payment received. We are finalizing your reservation and confirmation email."
    );
    setProcessing(false);
  };

  return (
    <form className="booking-payment" onSubmit={onSubmit}>
      <PaymentElement />
      {error ? <p className="booking-error">{error}</p> : null}
      <button className="btn-primary" disabled={!stripe || processing} type="submit">
        {processing ? "Processing..." : "Pay and confirm"}
      </button>
    </form>
  );
}

export default function BookingWidget() {
  const [booking, setBooking] = useState<BookingRequest>({
    cabinId: "cime-02",
    checkIn: "",
    checkOut: "",
    guest: { firstName: "", lastName: "", email: "", phone: "" },
    extras: { earlyArrival: false, beerDuo: false, snacks: false },
  });
  const [availability, setAvailability] = useState<AvailabilityState>("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<CheckoutIntentResponse | null>(null);
  const [checkoutPublishableKey, setCheckoutPublishableKey] = useState<string | null>(null);
  const stripePromise = useMemo(
    () => (checkoutPublishableKey ? loadStripe(checkoutPublishableKey) : null),
    [checkoutPublishableKey]
  );

  const canCheckAvailability = useMemo(
    () => Boolean(booking.checkIn && booking.checkOut && booking.cabinId),
    [booking.checkIn, booking.checkOut, booking.cabinId]
  );
  const canStartCheckout = useMemo(
    () =>
      availability === "available" &&
      Boolean(
        booking.guest.firstName.trim() &&
          booking.guest.lastName.trim() &&
          booking.guest.email.trim() &&
          booking.guest.phone.trim()
      ),
    [availability, booking.guest]
  );

  const updateCabin = (cabinId: CabinId) =>
    setBooking((prev) => ({ ...prev, cabinId }));

  const runAvailabilityCheck = async () => {
    if (!canCheckAvailability) return;
    setError(null);
    setStatusMessage(null);
    setAvailability("checking");
    setCheckout(null);
    setCheckoutPublishableKey(null);

    const query = new URLSearchParams({
      cabinId: booking.cabinId,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
    });

    const res = await fetch(`/api/booking/availability?${query.toString()}`);
    const data = (await res.json()) as { available?: boolean; error?: string };

    if (!res.ok || typeof data.available !== "boolean") {
      setAvailability("idle");
      setError(data.error || "Could not verify availability.");
      return;
    }

    setAvailability(data.available ? "available" : "unavailable");
  };

  const startCheckout = async () => {
    setError(null);
    setStatusMessage(null);

    const res = await fetch("/api/booking/checkout-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });
    const data = (await res.json()) as CheckoutIntentResponse | CheckoutIntentErrorResponse;

    if (!res.ok) {
      setError(
        "error" in data && data.error ? data.error : "Could not initialize checkout."
      );
      return;
    }

    if (!data.publishableKey) {
      setError("Stripe publishable key missing from checkout response.");
      return;
    }

    setCheckout({
      sessionId: data.sessionId,
      clientSecret: data.clientSecret,
      amountCents: data.amountCents,
      currency: data.currency,
    });
    setCheckoutPublishableKey(data.publishableKey);
  };

  return (
    <section className="booking-section" id="booking">
      <div className="booking-shell reveal">
        <div className="section-label">Reservation directe</div>
        <h2 className="section-title">
          Booking + <em>payment on-site</em>
        </h2>
        <p className="section-body">
          Select your cabin, dates, and extras. Availability is verified before payment
          and again server-side before final reservation creation.
        </p>

        <div className="booking-grid">
          <div className="booking-card">
            <label>Cabin</label>
            <select
              value={booking.cabinId}
              onChange={(event) => updateCabin(event.target.value as CabinId)}
            >
              <option value="cime-02">Cime 02</option>
              <option value="station-perchee">Station Perchee</option>
            </select>

            <label>Check-in</label>
            <input
              type="date"
              value={booking.checkIn}
              onChange={(event) =>
                setBooking((prev) => ({ ...prev, checkIn: event.target.value }))
              }
            />

            <label>Check-out</label>
            <input
              type="date"
              value={booking.checkOut}
              onChange={(event) =>
                setBooking((prev) => ({ ...prev, checkOut: event.target.value }))
              }
            />

            <button
              type="button"
              className="btn-outline booking-button"
              onClick={runAvailabilityCheck}
              disabled={!canCheckAvailability || availability === "checking"}
            >
              {availability === "checking" ? "Checking..." : "Check availability"}
            </button>

            {availability === "available" ? (
              <p className="booking-ok">Dates available.</p>
            ) : null}
            {availability === "unavailable" ? (
              <p className="booking-error">Dates unavailable. Please select other days.</p>
            ) : null}
          </div>

          <div className="booking-card">
            <label>First name</label>
            <input
              type="text"
              value={booking.guest.firstName}
              onChange={(event) =>
                setBooking((prev) => ({
                  ...prev,
                  guest: { ...prev.guest, firstName: event.target.value },
                }))
              }
            />

            <label>Last name</label>
            <input
              type="text"
              value={booking.guest.lastName}
              onChange={(event) =>
                setBooking((prev) => ({
                  ...prev,
                  guest: { ...prev.guest, lastName: event.target.value },
                }))
              }
            />

            <label>Email</label>
            <input
              type="email"
              value={booking.guest.email}
              onChange={(event) =>
                setBooking((prev) => ({
                  ...prev,
                  guest: { ...prev.guest, email: event.target.value },
                }))
              }
            />

            <label>Phone</label>
            <input
              type="tel"
              value={booking.guest.phone}
              onChange={(event) =>
                setBooking((prev) => ({
                  ...prev,
                  guest: { ...prev.guest, phone: event.target.value },
                }))
              }
            />
          </div>

          <div className="booking-card">
            <p className="booking-card-title">Extras</p>
            <label className="booking-check">
              <input
                type="checkbox"
                checked={booking.extras.earlyArrival}
                onChange={(event) =>
                  setBooking((prev) => ({
                    ...prev,
                    extras: { ...prev.extras, earlyArrival: event.target.checked },
                  }))
                }
              />
              Arrivee anticipee
            </label>
            <label className="booking-check">
              <input
                type="checkbox"
                checked={booking.extras.beerDuo}
                onChange={(event) =>
                  setBooking((prev) => ({
                    ...prev,
                    extras: { ...prev.extras, beerDuo: event.target.checked },
                  }))
                }
              />
              Duo de bieres locales
            </label>
            <label className="booking-check">
              <input
                type="checkbox"
                checked={booking.extras.snacks}
                onChange={(event) =>
                  setBooking((prev) => ({
                    ...prev,
                    extras: { ...prev.extras, snacks: event.target.checked },
                  }))
                }
              />
              Snacks / plateau gourmand
            </label>
            <button
              type="button"
              className="btn-primary booking-button"
              onClick={startCheckout}
              disabled={!canStartCheckout}
            >
              Continue to payment
            </button>
          </div>
        </div>

        {error ? <p className="booking-error">{error}</p> : null}
        {checkout ? (
          <div className="booking-payment-shell">
            <p className="booking-payment-title">
              Amount: {(checkout.amountCents / 100).toFixed(2)}{" "}
              {checkout.currency.toUpperCase()}
            </p>
            {stripePromise ? (
              <Elements stripe={stripePromise} options={{ clientSecret: checkout.clientSecret }}>
                <CheckoutForm
                  sessionId={checkout.sessionId}
                  onConfirmed={(message) => setStatusMessage(message)}
                />
              </Elements>
            ) : (
              <p className="booking-error">Stripe setup is unavailable.</p>
            )}
          </div>
        ) : null}

        {statusMessage ? <p className="booking-ok">{statusMessage}</p> : null}
      </div>
    </section>
  );
}
