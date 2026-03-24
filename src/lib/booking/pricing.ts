import { CABINS, EXTRAS_CENTS } from "@/lib/booking/config";
import type { BookingRequest, CabinConfig } from "@/lib/booking/types";

const NIGHT_IN_MS = 1000 * 60 * 60 * 24;

function getCabin(cabinId: BookingRequest["cabinId"]): CabinConfig {
  const cabin = CABINS.find((item) => item.id === cabinId);
  if (!cabin) {
    throw new Error("Invalid cabin selected.");
  }
  return cabin;
}

export function getNights(checkIn: string, checkOut: string): number {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffMs = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.ceil(diffMs / NIGHT_IN_MS);
  if (!Number.isFinite(nights) || nights <= 0) {
    throw new Error("Checkout date must be after check-in date.");
  }
  return nights;
}

export function computeBookingAmountCents(booking: BookingRequest): number {
  const nights = getNights(booking.checkIn, booking.checkOut);
  const cabin = getCabin(booking.cabinId);
  const extrasTotal =
    (booking.extras.earlyArrival ? EXTRAS_CENTS.earlyArrival : 0) +
    (booking.extras.beerDuo ? EXTRAS_CENTS.beerDuo : 0) +
    (booking.extras.snacks ? EXTRAS_CENTS.snacks : 0);

  return cabin.baseNightlyCents * nights + cabin.cleaningFeeCents + extrasTotal;
}
