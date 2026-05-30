\# AI-READY TICKET



\## Title



POST /api/bookings - Create New Booking



\## Context



Core marketplace transaction. Creates a confirmed booking after a user selects a provider and available slot.



\## Scope



Create a POST endpoint at `/api/bookings`.



\## Interface Contract



Request:



```json

{

&#x20; "provider\_id": "uuid",

&#x20; "slot\_id": "uuid",

&#x20; "user\_id": "uuid",

&#x20; "notes": "string (optional, max 500 chars)"

}

```



Success (201):



```json

{

&#x20; "booking\_id": "uuid",

&#x20; "status": "confirmed",

&#x20; "provider\_id": "uuid",

&#x20; "slot\_id": "uuid",

&#x20; "created\_at": "ISO8601"

}

```



Errors:



\* 400 invalid fields

\* 404 provider or slot not found

\* 409 slot already booked



\## Acceptance Criteria



Given a valid provider and slot

When POST /api/bookings is called

Then return 201 and create a booking



Given a missing provider\_id

When request is submitted

Then return 400



Given a booked slot

When request is submitted

Then return 409



\## Constraints



\* Existing PostgreSQL connection

\* Existing JSON error format

\* UUID v4 identifiers



\## Anti-Scope



\* Payments

\* Email notifications

\* Authentication

\* Cancellations



