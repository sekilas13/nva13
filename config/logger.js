const path = require("path");
const winston = require("winston");

const options = {
  file: {
    level: "info",
    filename: path.resolve("logs/app.log"),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = new winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
});

logger.stream = {
  write: (message) => logger.info(message),
};

module.exports = logger;
