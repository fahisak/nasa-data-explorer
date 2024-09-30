// logger.js
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(), // Adds a timestamp
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`; // Custom log format
        })
    ),
    transports: [
        new transports.Console(), // Logs to the console
        new transports.File({ filename: 'app.log' }) // Logs to a file
    ],
});

module.exports = logger;
