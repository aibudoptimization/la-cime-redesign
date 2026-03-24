import type { BookingRequest } from "@/lib/booking/types";

export type CheckoutSessionState = "pending" | "confirmed" | "failed";

export type CheckoutSession = {
  sessionId: string;
  paymentIntentId: string;
  idempotencyKey: string;
  booking: BookingRequest;
  amountCents: number;
  state: CheckoutSessionState;
  createdAt: string;
  reservationId?: string;
};

const sessions = new Map<string, CheckoutSession>();
const reservationByPaymentIntent = new Map<string, string>();

export function upsertCheckoutSession(session: CheckoutSession): void {
  sessions.set(session.sessionId, session);
}

export function findSessionByPaymentIntent(
  paymentIntentId: string
): CheckoutSession | undefined {
  for (const session of sessions.values()) {
    if (session.paymentIntentId === paymentIntentId) {
      return session;
    }
  }
  return undefined;
}

export function getSession(sessionId: string): CheckoutSession | undefined {
  return sessions.get(sessionId);
}

export function markSessionConfirmed(
  sessionId: string,
  reservationId: string
): void {
  const current = sessions.get(sessionId);
  if (!current) return;
  current.state = "confirmed";
  current.reservationId = reservationId;
  sessions.set(sessionId, current);
  reservationByPaymentIntent.set(current.paymentIntentId, reservationId);
}

export function getReservationForPaymentIntent(
  paymentIntentId: string
): string | undefined {
  return reservationByPaymentIntent.get(paymentIntentId);
}
