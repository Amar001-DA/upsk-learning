Title: Seed Database with Test Providers



Context:

Create three test providers for marketplace validation.



Scope:

Insert three provider records into the database.



Interface Contract:

Provider fields:

\- provider\_id (UUID)

\- name

\- service

\- bio



Acceptance Criteria:

Given an empty database

When the seed script runs

Then three providers exist



Constraints:

Use existing PostgreSQL connection.



Anti-Scope:

No provider registration flow.

No authentication.

