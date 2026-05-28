const CircuitBreaker = require("opossum");
const logger = require("../observability/logger");

async function simulatedDatabaseCall(userId) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      const error = new Error("Database timeout");
      error.code = "ETIMEDOUT";
      reject(error);
    }, 1000);
  });

  const dbPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: "Demo User",
        source: "database"
      });
    }, 100);
  });

  return Promise.race([dbPromise, timeoutPromise]);
}

const breaker = new CircuitBreaker(simulatedDatabaseCall, {
  timeout: 1000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000,
  volumeThreshold: 5
});

breaker.fallback((userId) => {
  logger.warn({
    event: "circuit_open_fallback",
    dependency: "database",
    userId
  });

  return {
    id: userId,
    name: "Fallback User",
    source: "fallback"
  };
});

breaker.on("open", () => {
  logger.error({
    event: "circuit_opened",
    dependency: "database"
  });
});

breaker.on("halfOpen", () => {
  logger.info({
    event: "circuit_half_open",
    dependency: "database"
  });
});

breaker.on("close", () => {
  logger.info({
    event: "circuit_closed",
    dependency: "database"
  });
});

module.exports = breaker;
