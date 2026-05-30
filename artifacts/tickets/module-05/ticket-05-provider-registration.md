\# AI-READY TICKET



\## Title



POST /api/providers - Register New Provider



\## Context



This ticket enables service providers to join the SkillSwap marketplace. It supports the provider onboarding flow and allows new providers to create profiles that can later appear in marketplace search and booking experiences.



\## Scope



Create a POST endpoint at `/api/providers` that registers a new provider and stores provider information in the database.



\## Interface Contract



Request Body



```json

{

&#x20; "name": "string",

&#x20; "email": "string",

&#x20; "service": "string",

&#x20; "bio": "string (optional, max 1000 chars)"

}

```



Success Response (201)



```json

{

&#x20; "provider\_id": "uuid",

&#x20; "name": "string",

&#x20; "email": "string",

&#x20; "service": "string",

&#x20; "status": "active",

&#x20; "created\_at": "ISO8601 timestamp"

}

```



Error Responses



400 - Missing or invalid fields



```json

{

&#x20; "error": "<field> is required"

}

```



409 - Email already exists



```json

{

&#x20; "error": "provider already exists"

}

```



\## Acceptance Criteria



Given a valid provider registration request

When POST /api/providers is called

Then return 201 with a provider object containing provider\_id and status



Given a missing required field

When the request is submitted

Then return 400 with an error message



Given an email already registered

When the request is submitted

Then return 409 with a duplicate-provider error



Given a successful registration

When the database is queried

Then the provider record exists and matches the submitted data



\## Constraints



\* Use existing PostgreSQL database connection

\* Use UUID v4 for provider\_id

\* Follow the project's existing JSON error response format

\* Follow existing controller/service/repository architecture

\* Email must be unique



\## Anti-Scope



\* Authentication

\* Password management

\* Email verification

\* Provider availability scheduling

\* Provider analytics

\* Reviews and ratings

\* Payment onboarding

\* Profile editing



