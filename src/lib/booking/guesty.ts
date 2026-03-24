import type { BookingRequest, CabinId } from "@/lib/booking/types";

const GUESTY_BASE_URL =
  process.env.GUESTY_BASE_URL || "https://open-api.guesty.com/v1";

const blockedDatesByCabin: Record<CabinId, Set<string>> = {
  "cime-02": new Set(["2026-04-12", "2026-04-13", "2026-04-24"]),
  "station-perchee": new Set(["2026-04-08", "2026-04-09", "2026-04-19"]),
};

function enumerateDates(checkIn: string, checkOut: string): string[] {
  const dates: string[] = [];
  let cursor = new Date(checkIn);
  const end = new Date(checkOut);

  while (cursor < end) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor = new Date(cursor.getTime() + 1000 * 60 * 60 * 24);
  }

  return dates;
}

async function callGuesty<T>(
  path: string,
  method: "GET" | "POST",
  body?: unknown
): Promise<T> {
  const apiKey = process.env.GUESTY_API_KEY;
  if (!apiKey) {
    throw new Error("Guesty API key is not configured.");
  }

  const response = await fetch(`${GUESTY_BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Guesty API error: ${response.status} ${text}`);
  }

  return (await response.json()) as T;
}

export async function checkAvailability(
  cabinId: CabinId,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  // Prototype fallback for local environments without Guesty credentials.
  if (!process.env.GUESTY_API_KEY || !process.env.GUESTY_LISTING_ID_MAP) {
    const requested = enumerateDates(checkIn, checkOut);
    return requested.every((date) => !blockedDatesByCabin[cabinId].has(date));
  }

  const listingMap = JSON.parse(process.env.GUESTY_LISTING_ID_MAP) as Record<
    CabinId,
    string
  >;
  const listingId = listingMap[cabinId];
  if (!listingId) {
    throw new Error(`Missing Guesty listing mapping for cabin ${cabinId}.`);
  }

  const result = await callGuesty<{ available: boolean }>(
    `/availability?listingId=${encodeURIComponent(
      listingId
    )}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(
      checkOut
    )}`,
    "GET"
  );

  return result.available;
}

export async function createReservationFromPayment(
  booking: BookingRequest,
  paymentIntentId: string
): Promise<string> {
  // Prototype fallback when Guesty credentials are unavailable.
  if (!process.env.GUESTY_API_KEY || !process.env.GUESTY_LISTING_ID_MAP) {
    return `local-resv-${paymentIntentId}`;
  }

  const listingMap = JSON.parse(process.env.GUESTY_LISTING_ID_MAP) as Record<
    CabinId,
    string
  >;
  const listingId = listingMap[booking.cabinId];
  if (!listingId) {
    throw new Error(`Missing Guesty listing mapping for cabin ${booking.cabinId}.`);
  }

  const payload = {
    listingId,
    checkInDateLocalized: booking.checkIn,
    checkOutDateLocalized: booking.checkOut,
    guest: {
      firstName: booking.guest.firstName,
      lastName: booking.guest.lastName,
      email: booking.guest.email,
      phone: booking.guest.phone,
    },
    customFields: [
      { key: "stripe_payment_intent", value: paymentIntentId },
      { key: "extras_early_arrival", value: String(booking.extras.earlyArrival) },
      { key: "extras_beer_duo", value: String(booking.extras.beerDuo) },
      { key: "extras_snacks", value: String(booking.extras.snacks) },
    ],
  };

  const result = await callGuesty<{ _id: string }>(
    "/reservations",
    "POST",
    payload
  );
  return result._id;
}
