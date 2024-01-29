const axios = require('axios');
const cooldown = new Set();
const { commandLogger, errorLogger } = require('../../logger.js');
module.exports = {
	name: 'quote',
	description: 'returns a random quote',
	cooldown: 5,
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			try {
				const resp = await axios.get('https://api.quotable.io/random');
				const quote = resp.data.content;
				const color = Math.floor(Math.random() * 16777215);

				message.delete().catch(console.error);

				const embed = {
					description: quote,
					color: color,
					footer: { text: ';quote' },
					timestamp: new Date(),
				};

				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				commandLogger.info(`${message.guild.name} | ${message.author.username} | QUOTE | ${message.channel.name} | ${message.createdTimestamp}`);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, I was unable to get a quote.');
			}
		}
	},
};
