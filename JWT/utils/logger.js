// utils/logger.js
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;
const path = require("path");

const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

const logger = createLogger({
    level: "info",
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
    ),
    transports: [
        new transports.File({ filename: path.join("logs", "error.log"), level: "error" }),
        new transports.File({ filename: path.join("logs", "combined.log") }),
    ],
});

// Console logging in development
if (process.env.NODE_ENV !== "production") {
    logger.add(new transports.Console({
        format: combine(colorize(), logFormat)
    }));
}

module.exports = logger;
