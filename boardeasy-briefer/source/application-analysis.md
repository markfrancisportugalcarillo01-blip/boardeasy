# BoardEasy application analysis (source for the project briefer)

Investigated on November 24, 2026 (demo date in the app).

## How it was checked
- **Source:** `index.html` and `README.md` on the `main` branch of github.com/markfrancisportugalcarillo01-blip/boardeasy (commit a1d89fa). The deployed GitHub Pages site serves this same file; it was byte-compared against the checked-out copy.
- **Live behaviour:** the same file was opened in headless Chromium (Playwright). All 37 role screens were visited as Student, Landlord, Parent and Administrator with no script errors. A booking request and a simulated payment were completed end to end. The built-in self-check (`?selftest=1`) passed **38 of 38**.
- The github.io address itself could not be reached from the analysis environment (network policy), so the identical source file was used instead.

## Feature classification

| Feature | Status | Notes |
|---|---|---|
| Listings search, filters (price, amenities, curfew, visitors, occupancy, flood label, campus), sort | Working demo | 15 fictional listings in real Naga City barangays |
| Property details: rooms, rules, illustrative map, reviews, safety tab | Working demo | Map is illustrative, not to scale |
| Favorites and side-by-side compare (up to 3) | Working demo | |
| Booking requests, approve/reject, check-in | Working demo | Approval reserves the room; check-in creates tenancy, rent charges, deposit |
| Inquiries to landlords and replies | Working demo | In-app only |
| Rent tracking, partial payments, overdue status, reminders, manual payment records | Working demo | |
| Electricity bill split (submeter or shared meter with appliance weights) | Working demo | Real CASURECO II rate ₱11.17/kWh (Oct 2026); readings are fictional |
| Water bill split (submeter, equal, occupant-days, custom) | Working demo | Real MNWD residential tiers; usage fictional |
| Meter photo reading (OCR) | Simulated | Labeled "SIMULATED OCR RESULT" |
| Bill edit history, bill questions (disputes) | Working demo | |
| Payments by GCash, Maya, Demo Wallet, manual | Simulated | No gateway; "NO REAL MONEY WAS TRANSFERRED" |
| Receipts (copy reference, save, print) | Working demo | Marked for simulation only |
| Security deposits, deductions, refunds | Working demo (refund simulated) | |
| Move-in / move-out room condition reports with photos, compare | Working demo | Photos compressed in browser |
| Rental Passport (on-time rate, record rating, sharing controls) | Working demo | Not a credit score |
| Parent access: invite code, permissions, revoke, pay on behalf | Working demo (payment simulated) | |
| Announcements, prioritized in-app notifications | Working demo | Nothing sent outside the app (no SMS/email/push) |
| Trash pickup schedules, reminders, prepared marks, missed-pickup reports | Working demo | Not an official city schedule |
| Distance to boarding house and time-limited sharing | Simulated | Six sample points, fictional coordinates; device location never requested |
| Order Food | External link | Opens GrabFood / foodpanda websites; in-app ordering "Partner Integration Not Configured" |
| DEMO VERIFIED badges, listing approval | Simulated status | Not real-world verification |
| Flood-risk labels | Illustrative | Fictional; points to official city hazard maps |
| Admin: users, listings, review moderation, transactions, waste overview, settings, reset, self-check | Working demo | |
| Business model simulation | Illustrative | ₱25/room/month, ₱5/payment, referral fees: untested assumptions |

## Planned platforms (from the project team)
- BoardEasy is planned as an Android app and a web app. A desktop version is under consideration, not decided.
- The current HTML/CSS/JavaScript build is the browser prototype of that product.

## Technical implementation (current prototype)
- One static file (`index.html`, about 500 KB): HTML, CSS and vanilla JavaScript; no framework, no server, no build step.
- Data kept in browser localStorage (per device); versioned schema (v6) with migration and corrupt-data recovery.
- Hash-based router with role-based navigation for four roles; inline SVG icons and illustrations.
- Hosted on GitHub Pages; works on Android phones and laptops.
- Built-in self-check suite: 38 tests.

## Not implemented (would be needed for production)
Server database and real authentication; licensed payment gateway; real identity and listing verification; real device location (with consent); food-delivery partner API; SMS/push/email notifications; official flood hazard data; real listings and users.

## Real vs fictional (from README and code)
- Real: Naga City barangays and campuses (Ateneo de Naga University, University of Nueva Caceres, Naga College Foundation, Universidad de Sta. Isabel); CASURECO II and MNWD rates.
- Estimates: room and bedspace rents (Rent.ph listings, Nov 2026).
- Fictional: every boarding house, person, review, payment, meter reading, badge and flood label.
