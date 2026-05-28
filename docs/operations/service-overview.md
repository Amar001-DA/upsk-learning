# Service Overview

## Purpose

This service provides a production-style backend API with observability, resilience, structured logging, Redis caching, Prometheus metrics, retry orchestration, and graceful degradation workflows.

The platform is designed to demonstrate operational production-engineering concepts including incident response, degradation handling, circuit breakers, bounded retries, and infrastructure-aware recovery behavior.

---

# Dependencies

| Dependency | Type | What happens without it | Fallback |
|---|---|---|---|
| PostgreSQL | Primary datastore | Reads/writes fail | Service returns degraded responses |
| Redis | Cache layer | Increased latency | Requests fall back to database |
| Prometheus Metrics | Observability | Metrics unavailable | Core API still functions |
| Docker | Runtime/containerization | Service unavailable | Manual local execution |
| Node.js Runtime | Application runtime | Complete outage | None |

---

# Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /live | Liveness probe |
| GET | /ready | Readiness validation |
| GET | /metrics | Prometheus metrics endpoint |
| GET | /users | Fetch users with Redis caching |
| GET | /users/:id/resilient | Resilient endpoint protected by circuit breaker |

---

# Configuration

## Important Environment Variables

| Variable | Purpose | Restart Required |
|---|---|---|
| PORT | API server port | Yes |
| REDIS_URL | Redis connection string | Yes |
| DATABASE_URL | PostgreSQL connection string | Yes |
| LOG_LEVEL | Logging verbosity | No |
| CIRCUIT_TIMEOUT_MS | Circuit breaker timeout | Yes |
| RETRY_MAX_ATTEMPTS | Maximum retry count | Yes |

Reference:
- `.env`
- `.env.example`

---

# Deployment

## Automatic Deploy

Deployment occurs automatically after pushing to the main branch.

```bash
git push origin main
