\# Module 06 Agent Output Bundle



\## Stream A - Booking API



Endpoint:

POST /api/bookings



Response:

{

&#x20; "booking\_id": "uuid",

&#x20; "provider\_id": "uuid",

&#x20; "status": "confirmed"

}



\## Stream B - Provider API



Endpoint:

POST /api/providers



Response:

{

&#x20; "provider\_id": "uuid",

&#x20; "status": "active"

}



\## Seeded Contract Violation



Provider API accidentally returns:



{

&#x20; "provider\_id": 123

}



Contract requires:



{

&#x20; "provider\_id": "uuid"

}



Violation Detected:

provider\_id type mismatch (integer vs UUID string)



Resolution:

Update Provider API to return UUID v4 identifiers.

