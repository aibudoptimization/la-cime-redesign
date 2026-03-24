---
name: Booking Payment Architecture
overview: Define a lean, on-site booking and payment flow for luxury cabins using Guesty and Stripe with minimal frontend effort, plus an implementation order that avoids double bookings.
todos:
  - id: decide-system-of-record
    content: Confirm Guesty is the single source of truth for availability and reservation state.
    status: completed
  - id: define-checkout-contract
    content: Specify backend API contract for availability check, guest info capture, extras, and payment intent creation.
    status: completed
  - id: design-double-booking-guards
    content: Design final availability re-check + idempotent webhook finalization flow before any production build.
    status: completed
  - id: scope-mvp-frontend
    content: Draft minimal frontend flow with cabin/date selection, guest form, extras, and embedded Stripe payment UI.
    status: completed
  - id: defer-n8n
    content: Postpone n8n unless post-MVP automation requirements exceed backend webhook handlers.
    status: completed
isProject: false
---

# Booking + Payment Sequence Plan

## Recommended Stack (start simple)

- Use **Guesty as source of truth** for inventory, pricing rules, and reservation records.
- Use **Stripe for payments** (Payment Element / Checkout embedded components if available for your UX).
- Use **n8n only if needed later** for advanced automations (multi-system sync, CRM, segmented notifications). Do not start with n8n unless Guesty webhooks + your backend cannot cover required automations.

## Why this is the safest first architecture

- **Double-booking prevention** is primarily an inventory-locking problem; this should be owned by Guesty reservation flow, not frontend state.
- **Frontend should stay thin**: calendar availability + cabin/extras selection + guest form + payment step.
- **Payment confirmation** should be event-driven from Stripe webhook, then reservation finalization + confirmation messaging.

## Core User Flow (on your website, no external redirect)

1. Visitor selects cabin.
2. Frontend requests real-time availability from Guesty API.
3. Visitor selects dates and extras.
4. Frontend sends booking intent to your backend.
5. Backend re-validates availability in Guesty (server-side check right before charging).
6. Backend creates payment intent in Stripe for full amount (base stay + extras + fees).
7. Visitor pays in embedded Stripe UI on your site.
8. Stripe webhook confirms successful payment.
9. Backend creates/finalizes reservation in Guesty and stores guest profile (name, phone, email, extras).
10. Confirmation email/SMS sent (via Guesty messaging or your own provider).

## Data and Responsibility Split

- **Guesty**: cabins, availability calendar, reservation lifecycle, occupancy rules.
- **Stripe**: payment authorization/capture, receipts, payment status webhooks.
- **Your backend**: orchestration layer (validation, amount calculation, idempotency keys, retries, webhook handling, confirmation triggers).
- **Frontend**: display availability, collect guest details, capture extras, host embedded payment UI.

## How to avoid double bookings (non-negotiables)

- Always perform a **final server-side availability check** immediately before creating/confirming payment.
- Use a short-lived **hold/reservation lock** strategy if Guesty supports it; otherwise enforce a strict re-check before charge capture.
- Make booking creation idempotent (idempotency key per checkout session).
- On webhook retries/failures, ensure reservation creation is deduplicated.

## Extras (early check-in, beer, snacks, treatments)

- Model extras as structured line items in your backend catalog.
- Pass selected extras through amount calculation pipeline (server-calculated total only).
- Store extras in reservation metadata in Guesty and in your own order record for reporting.

## Confirmation strategy

- Trigger confirmation only after both conditions are true:
  - Stripe payment status = succeeded
  - Guesty reservation status = confirmed/created
- Send:
  - Immediate booking confirmation (email)
  - Optional SMS summary (date, cabin, check-in instructions)

## MVP Build Order (where to start)

- **Phase 1: Integration skeleton**
  - Guesty availability read endpoint
  - Stripe payment intent creation
  - Basic booking form (name, email, phone)
- **Phase 2: Reservation safety**
  - Final availability check before payment
  - Webhook-based booking finalization
  - Idempotency and retry logic
- **Phase 3: Extras + polish**
  - Extras selection UI and pricing
  - Confirmation templates
  - Admin visibility (booking status dashboard)
- **Phase 4: Optional n8n**
  - Add only for extra automations (CRM sync, advanced messaging, analytics fan-out)

## Practical recommendation on n8n

- **Start without n8n** for MVP.
- Add n8n later if you need many third-party automations and want low-code orchestration.
- Keep payment+reservation critical path in your backend code, not in an automation tool, for reliability and debuggability.

## Decision checklist before implementation

- Confirm Guesty API supports needed hold/finalization behavior.
- Decide payment policy (full payment vs deposit).
- Define cancellation/refund rules and map to Stripe flows.
- Define confirmation ownership (Guesty messaging vs custom email/SMS pipeline).
