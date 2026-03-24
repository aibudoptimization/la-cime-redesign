import { NextResponse } from "next/server";
import { checkAvailability } from "@/lib/booking/guesty";
import type { CabinId } from "@/lib/booking/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cabinId = searchParams.get("cabinId") as CabinId | null;
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    if (!cabinId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: "Missing cabinId, checkIn, or checkOut." },
        { status: 400 }
      );
    }

    const available = await checkAvailability(cabinId, checkIn, checkOut);
    return NextResponse.json({ available });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
