import type { BookingRequest } from "@/lib/booking/types";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateBookingRequest(payload: unknown): BookingRequest {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid booking payload.");
  }

  const booking = payload as Partial<BookingRequest>;

  if (booking.cabinId !== "cime-02" && booking.cabinId !== "station-perchee") {
    throw new Error("Invalid cabin.");
  }
  if (!booking.checkIn || !DATE_REGEX.test(booking.checkIn)) {
    throw new Error("Invalid check-in date.");
  }
  if (!booking.checkOut || !DATE_REGEX.test(booking.checkOut)) {
    throw new Error("Invalid check-out date.");
  }
  if (!booking.guest || typeof booking.guest !== "object") {
    throw new Error("Guest information is required.");
  }
  if (!booking.guest.firstName?.trim() || !booking.guest.lastName?.trim()) {
    throw new Error("Guest first and last name are required.");
  }
  if (!booking.guest.phone?.trim()) {
    throw new Error("Guest phone is required.");
  }
  if (!booking.guest.email?.trim() || !EMAIL_REGEX.test(booking.guest.email)) {
    throw new Error("Valid guest email is required.");
  }
  if (!booking.extras || typeof booking.extras !== "object") {
    throw new Error("Extras selection is required.");
  }

  return {
    cabinId: booking.cabinId,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    guest: {
      firstName: booking.guest.firstName.trim(),
      lastName: booking.guest.lastName.trim(),
      email: booking.guest.email.trim().toLowerCase(),
      phone: booking.guest.phone.trim(),
    },
    extras: {
      earlyArrival: Boolean(booking.extras.earlyArrival),
      beerDuo: Boolean(booking.extras.beerDuo),
      snacks: Boolean(booking.extras.snacks),
    },
  };
}
