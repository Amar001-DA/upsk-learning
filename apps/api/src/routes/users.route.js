const express = require("express");
const redisClient = require("../config/redis");

const breaker = require("../resilience/circuitBreaker");
const retryWithBackoff = require("../resilience/retry");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cachedUsers = await redisClient.get("users");

    if (cachedUsers) {
      return res.status(200).json({
        source: "redis-cache",
        data: JSON.parse(cachedUsers),
      });
    }

    const users = [
      { id: 1, name: "Aarav" },
      { id: 2, name: "Rahul" },
    ];

    await redisClient.set("users", JSON.stringify(users), {
      EX: 60,
    });

    res.status(200).json({
      source: "database",
      data: users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/:id/resilient", async (req, res) => {
  try {
    const user = await retryWithBackoff(
      () => breaker.fire(req.params.id),
      {
        maxRetries: 3,
        baseDelay: 100,
      }
    );

    res.json(user);
  } catch (error) {
    res.status(503).json({
      error: "Service temporarily unavailable",
      details: error.message,
    });
  }
});

module.exports = router;
