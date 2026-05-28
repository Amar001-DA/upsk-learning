async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 100,
    maxDelay = 2000,
    jitter = 50,
    retryableErrors = ["ECONNRESET", "ETIMEDOUT", "ECONNREFUSED"]
  } = options;

  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (
        !retryableErrors.includes(error.code) &&
        !error.message?.toLowerCase().includes("timeout")
      ) {
        throw error;
      }

      if (attempt === maxRetries) {
        break;
      }

      const exponentialDelay = Math.min(
        baseDelay * Math.pow(2, attempt),
        maxDelay
      );

      const jitterOffset =
        Math.floor(Math.random() * jitter * 2) - jitter;

      const delay = Math.max(0, exponentialDelay + jitterOffset);

      console.warn("retry_attempt", {
        attempt: attempt + 1,
        delay_ms: delay,
        error: error.message
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

module.exports = retryWithBackoff;
