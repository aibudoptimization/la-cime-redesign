import type { CabinConfig } from "@/lib/booking/types";

export const CABINS: CabinConfig[] = [
  {
    id: "cime-02",
    label: "Cime 02",
    baseNightlyCents: 89000,
    cleaningFeeCents: 15000,
  },
  {
    id: "station-perchee",
    label: "Station Perchee",
    baseNightlyCents: 72000,
    cleaningFeeCents: 13000,
  },
];

export const EXTRAS_CENTS = {
  earlyArrival: 9500,
  beerDuo: 2800,
  snacks: 4200,
} as const;

export const BOOKING_CURRENCY = "cad";
