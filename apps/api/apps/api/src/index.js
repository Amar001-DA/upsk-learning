app.get("/live", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "api",
    message: "Service is live",
  });
});

app.get("/ready", async (req, res) => {
  try {
    await redisClient.ping();

    res.status(200).json({
      status: "ready",
      dependencies: {
        redis: "connected",
      },
    });
  } catch (error) {
    res.status(503).json({
      status: "not-ready",
      error: "Redis unavailable",
    });
  }
});
