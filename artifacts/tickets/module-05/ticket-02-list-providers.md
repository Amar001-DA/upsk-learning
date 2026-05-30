Title: GET /api/providers - List Providers



Context:

Allows users to browse available providers.



Scope:

Create GET /api/providers endpoint.



Interface Contract:

Response:

\[

&#x20; {

&#x20;   "provider\_id": "uuid",

&#x20;   "name": "string",

&#x20;   "service": "string"

&#x20; }

]



Acceptance Criteria:

Given providers exist

When GET /api/providers is called

Then return 200 and provider list



Constraints:

Use existing JSON response format.



Anti-Scope:

Search

Filtering

Pagination

