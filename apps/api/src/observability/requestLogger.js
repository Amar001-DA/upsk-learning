const pinoHttp = require("pino-http");
const { v4: uuidv4 } = require("uuid");

const logger = require("./logger");

const requestLogger = pinoHttp({
  logger,

  genReqId: function (req) {
    const existingId = req.headers["x-request-id"];

    if (existingId) {
      return existingId;
    }

    return uuidv4();
  },

  customProps: function (req) {
    return {
      request_id: req.id,
    };
  },
});

module.exports = requestLogger;
