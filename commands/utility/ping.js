const cooldown = new Set();
const color = Math.floor(Math.random() * 16777215);
const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'ping',
	description: 'pong',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 3 seconds before using this command again.');
		} else {
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
				};
				sentMessage.edit({ content: '', embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 3000);
				commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | PING | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, I was unable to pong.');
			}
		}
	},
};
