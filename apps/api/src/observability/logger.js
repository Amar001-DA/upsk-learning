const pino = require("pino");

const isProduction = process.env.APP_ENV === "production";

const logger = pino({
  level: "info",
  base: {
    service_name: "upsk-learning-api",
  },
  transport: isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
});

module.exports = logger;
