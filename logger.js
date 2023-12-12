const pino = require('pino');

const commandLoggerOptions = {
	name: 'commandLogger',
	level: 'info',
};

const errorLoggerOptions = {
	name: 'errorLogger',
	level: 'error',
};

const debugLoggerOptions = {
	name: 'debugLogger',
	level: 'debug',
};

const commandLogger = pino(commandLoggerOptions, pino.destination('logs/commandLog.json'));
const errorLogger = pino(errorLoggerOptions, pino.destination('logs/errorLog.json'));
const debugLogger = pino(debugLoggerOptions, pino.destination('logs/debugLog.json'));

module.exports = {
	commandLogger,
	errorLogger,
	debugLogger,
};
