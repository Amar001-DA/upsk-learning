
# Technical Explanation: REST-to-GraphQL Migration

## Decision Summary

We are migrating ShopStream’s public-facing API from REST to GraphQL over the next 8 weeks because our current REST architecture is slowing frontend development and creating unnecessary API complexity.

REST is an API style where the server exposes fixed endpoints that return predefined data shapes. GraphQL is a query language for APIs that allows clients to request exactly the data they need in a single request instead of calling multiple fixed endpoints.

The main goal of this migration is to reduce frontend coordination overhead, eliminate duplicate aggregation endpoints, and improve feature delivery speed for both the web and mobile teams.

## Why We Chose This

Our current REST API contains 47 endpoints. Fifteen of those endpoints exist only because the mobile application requires different response shapes than the web application for the same screen.

Frontend engineers currently spend about 30% of each sprint building and maintaining aggregation endpoints. Aggregation endpoints are REST routes that combine data from multiple backend services into a single frontend-friendly response.

GraphQL solves this problem by shifting data selection to the client. Instead of the backend creating separate endpoints for every screen variation, the frontend requests exactly the fields it needs.

Example:
- REST behaves like ordering a fixed combo meal.
- GraphQL behaves like selecting individual items from a buffet.

We considered two alternatives before choosing GraphQL.

### Alternative 1: Backend-for-Frontend (BFF)

A Backend-for-Frontend service is a dedicated API layer built specifically for one frontend application.

We rejected this approach because it would add another production service to deploy, monitor, scale, and maintain. It would reduce some frontend pain, but it would also increase operational complexity.

### Alternative 2: Standardized REST Responses

We also considered keeping REST and enforcing standardized endpoint shapes across platforms.

We rejected this option because the mobile and web applications fundamentally require different data structures and loading patterns. Standardizing the response format would not remove the need for aggregation logic.

## Risks and Mitigations

GraphQL introduces a learning curve for the backend team. Two of the three engineers assigned to the migration have not used GraphQL before.

To reduce onboarding risk, the team will pair experienced engineers with newer contributors during schema design and resolver implementation. A resolver is the backend function responsible for fetching data for a GraphQL field.

Query performance is another risk. Deeply nested GraphQL queries can accidentally generate expensive database operations.

To reduce this risk, the backend team will enforce query depth limits, monitor slow queries, and add performance tracing during development.

Caching is also more difficult with GraphQL. REST endpoints use predictable URLs that infrastructure can cache easily, while GraphQL requests typically use POST bodies that are harder to cache automatically.

To mitigate caching complexity, the team will introduce resolver-level caching and evaluate persisted queries for frequently accessed operations.

During the migration period, both REST and GraphQL APIs will run simultaneously. This reduces rollout risk because frontend teams can migrate screen-by-screen instead of switching all traffic at once.

## What This Means for Priya

Priya will primarily work on GraphQL schema development and resolver implementation during her first few weeks.

A schema defines the structure of the API, including available queries, fields, and relationships between objects.

Priya will also help migrate existing aggregation endpoints into GraphQL queries. The backend team plans to remove the 15 single-purpose aggregation endpoints after frontend migration is complete.

Priya should expect to collaborate closely with the mobile and frontend teams because GraphQL changes how clients request and shape data.

## Next Steps

- The backend team will finish the initial GraphQL schema design this sprint.
- The mobile team will migrate high-traffic screens first to validate performance improvements.
- Priya should review the existing REST aggregation endpoints before her first migration task.
- Priya should schedule onboarding sessions with the API platform team to review GraphQL conventions, resolver patterns, and query performance guidelines.
- The backend team will maintain both REST and GraphQL APIs during the 8-week migration window before beginning REST endpoint deprecation planning.

