export type CheckoutIntentResponse = {
  sessionId: string;
  clientSecret: string;
  publishableKey: string;
  amountCents: number;
  currency: string;
};

export type CheckoutIntentErrorResponse = {
  error: string;
};
