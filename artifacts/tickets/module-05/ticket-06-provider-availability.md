Title: PUT /api/providers/:id/availability



Context:

Allows providers to define availability.



Scope:

Create availability update endpoint.



Interface Contract:

Request:

{

&#x20; "available\_slots": \[]

}



Response:

{

&#x20; "status": "updated"

}



Acceptance Criteria:

Given a valid provider

When availability is updated

Then new slots are stored



Constraints:

Use existing PostgreSQL connection.



Anti-Scope:

Recurring schedules

Calendar integrations

Notifications

