Title: GET /api/providers/:id/slots



Context:

Allows users to view available booking slots.



Scope:

Create endpoint for retrieving provider slots.



Interface Contract:

Response:

\[

&#x20; {

&#x20;   "slot\_id": "uuid",

&#x20;   "start\_time": "ISO8601"

&#x20; }

]



Acceptance Criteria:

Given a valid provider

When endpoint is called

Then available slots are returned



Constraints:

Use existing database connection.



Anti-Scope:

Booking creation

Calendar sync

