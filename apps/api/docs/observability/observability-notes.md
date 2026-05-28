# Observability Notes

## Logging Strategy

The service uses structured logging with Pino.

- Development environment:
  - pretty colorized logs
  - human-readable debugging

- Production environment:
  - JSON structured logs
  - centralized aggregation friendly

Each request receives a unique request_id to support request tracing and incident investigation.

---

## Metrics Strategy

The API exposes a Prometheus-compatible `/metrics` endpoint using prom-client.

Metrics include:

- http_requests_total
- http_request_duration_seconds
- active_connections
- Node.js process metrics
- event loop metrics
- heap and garbage collection metrics

---

## Alerting Philosophy

Three core alert categories are monitored:

1. High error rate
2. High latency
3. Service unavailable

Thresholds are intentionally designed to reduce alert fatigue while still surfacing real operational degradation.

---

## Operational Lessons

Observability is not only about debugging failures after they happen.

It exists to:
- detect degradation early
- reduce incident response time
- identify bottlenecks
- support production debugging
- improve reliability over time

Without logs and metrics, production debugging becomes reactive guesswork instead of evidence-driven diagnosis.
