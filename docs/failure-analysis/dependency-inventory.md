# Dependency Inventory

| Dependency | Connection Method | Configured Timeout | Retry Behavior |
|---|---|---|---|
| PostgreSQL | TCP via pg connection pool | No explicit timeout configured | Default retry behavior |
| Redis | TCP via redis client | No explicit timeout configured | Automatic reconnect attempts |
| DNS Resolver | OS resolver | OS default | OS-managed retries |
| File System | Local OS file operations | N/A | None |
| Prometheus Metrics Endpoint | HTTP GET /metrics | Request lifecycle timeout only | None |
| Docker Runtime | Container runtime APIs | Runtime managed | Container restart policy |
| Node.js Runtime | In-process memory and event loop | N/A | Process restart via container |
| External Network | HTTP/TCP outbound connectivity | OS/library defaults | Library retry behavior |
