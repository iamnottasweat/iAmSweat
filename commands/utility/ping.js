const color = Math.floor(Math.random() * 16777215);
const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'ping',
	description: 'Checks the latency of the bot and the API',
	usage: ';ping',
	category: 'Utility',
	cooldown: 5,
	async execute(message) {
		try {
			const embed = {
				title: 'Pong!',
				color: color,
				timestamp: new Date(),
				fields: [
					{
						name: 'Bot Latency',
						value: `${Math.round(message.client.ws.ping)}ms`,
						inline: true,
					},
					{
						name: 'API Latency',
						value: `${Math.round(message.createdTimestamp - message.createdTimestamp)}ms`,
						inline: true,
					},
				],
			};

			message.delete().catch(console.error);
			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | PING | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to ping the bot.');
		}
	},
};
