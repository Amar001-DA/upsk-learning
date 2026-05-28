const client = require("prom-client");

client.collectDefaultMetrics();

const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.5, 1, 2, 5],
});

const activeConnections = new client.Gauge({
  name: "active_connections",
  help: "Current active connections",
});

module.exports = {
  client,
  httpRequestsTotal,
  httpRequestDuration,
  activeConnections,
};
