cat > graphql-migration-rewrite.md <<'EOF'
# REST-to-GraphQL Migration

## Decision

We are migrating ShopStream’s API from REST to GraphQL over the next 8 weeks to reduce frontend development overhead and eliminate duplicate aggregation endpoints.

GraphQL is a query language that lets clients request exactly the data they need instead of receiving fixed response shapes from predefined REST endpoints.

## Why We Are Migrating

Our current REST API has 47 endpoints. Fifteen exist only because the mobile and web applications require different response shapes for the same screens.

Frontend (FE) engineers currently spend significant sprint time maintaining aggregation endpoints. Aggregation endpoints combine data from multiple backend services into one frontend-friendly response.

The mobile team is especially affected because the current architecture forces separate purpose-built endpoints for similar data flows.

The Software Development Kit (SDK) team also reported growing API-versioning complexity as endpoint counts increased.

The Site Reliability Engineering (SRE) team found that the mobile application often performs multiple sequential REST calls where a single GraphQL query could replace them.

We evaluated a Backend-for-Frontend (BFF) architecture. A BFF is a dedicated backend service built specifically for one frontend application. We rejected it because it would increase deployment and monitoring overhead.

## Team and Timeline

Three engineers will work full-time on the migration for 8 weeks.

Two engineers are new to GraphQL, so the backend team will use pair programming and dedicated onboarding time during the first two weeks.

The backend team will run REST and GraphQL simultaneously during the migration to avoid frontend disruption.

## Risks

Risk: unpredictable query performance.  
Mitigation: the backend team will track slow queries and enforce query-depth limits.

Risk: caching complexity.  
Mitigation: the team will evaluate resolver-level caching and persisted queries during implementation.

The timeline may shift as implementation findings emerge.

EOF
