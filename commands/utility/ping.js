const color = Math.floor(Math.random() * 16777215);
const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'ping',
	description: 'pong',
	cooldown: 5,
	async execute(message) {
		try {
			const sentMessage = await message.channel.send('Pinging...');
			const latency = sentMessage.createdTimestamp - message.createdTimestamp;
			const API_latency = Math.round(message.client.ws.ping);
			const botEvaluationTime = Math.round(latency - API_latency);

			message.delete().catch(console.error);

			const embed = {
				title: '**Pong!**',
				description: `Bot Evaluation Time: **${botEvaluationTime}**ms\nLatency: **${latency}**ms.\nAPI Latency: **${API_latency}**ms.`,
				color: color,
				timestamp: new Date(),
				footer: {
					text: ';ping',
				},
			};
			sentMessage.edit({ content: '', embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | PING | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to pong.');
		}
	},
};
