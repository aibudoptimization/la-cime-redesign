export type CabinId = "cime-02" | "station-perchee";

export type GuestInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type BookingExtrasSelection = {
  earlyArrival: boolean;
  beerDuo: boolean;
  snacks: boolean;
};

export type BookingRequest = {
  cabinId: CabinId;
  checkIn: string;
  checkOut: string;
  guest: GuestInfo;
  extras: BookingExtrasSelection;
};

export type CabinConfig = {
  id: CabinId;
  label: string;
  baseNightlyCents: number;
  cleaningFeeCents: number;
};
