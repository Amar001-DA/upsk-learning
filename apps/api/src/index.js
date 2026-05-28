const express = require("express");
const cors = require("cors");
require("dotenv").config();

const redisClient = require("./config/redis");

const requestLogger = require("./observability/requestLogger");
const metricsMiddleware = require("./observability/metricsMiddleware");
const { client } = require("./observability/metrics");

const healthRoute = require("./routes/health.route");
const usersRoute = require("./routes/users.route");
const dbRoute = require("./routes/db.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use(metricsMiddleware);

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

app.use("/health", healthRoute);
app.use("/users", usersRoute);
app.use("/db", dbRoute);

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);

  res.end(await client.register.metrics());
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
