const pino = require('pino');
const path = require('path');
const fs = require('fs');

// Ensure the logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir, { recursive: true });
}

function createLogger(name, level) {
	return pino(
		{
			name,
			level: process.env[`LOG_LEVEL_${name.toUpperCase()}`] || level,
			timestamp: pino.stdTimeFunctions.isoTime,
		},
		pino.destination(path.join(logsDir, `${name}Log.json`))
	);
}

const commandLogger = createLogger('command', 'info');
const errorLogger = createLogger('error', 'error');
const debugLogger = createLogger('debug', 'debug');

module.exports = {
	commandLogger,
	errorLogger,
	debugLogger,
};
