const {
  httpRequestsTotal,
  httpRequestDuration,
} = require("./metrics");

function metricsMiddleware(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;

    httpRequestsTotal.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    });

    httpRequestDuration.observe(
      {
        method: req.method,
        route: req.route?.path || req.path,
        status: res.statusCode,
      },
      duration
    );
  });

  next();
}

module.exports = metricsMiddleware;
