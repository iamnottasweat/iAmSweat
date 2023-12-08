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

const commandLogger = pino(commandLoggerOptions, pino.destination('command-log.json'));
const errorLogger = pino(errorLoggerOptions, pino.destination('error-log.json'));
const debugLogger = pino(debugLoggerOptions, pino.destination('debug-log.json'));

module.exports = {
	commandLogger,
	errorLogger,
	debugLogger,
};
