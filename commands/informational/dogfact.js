const axios = require('axios');
const cooldown = new Set();
const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'dogfact',
	description: 'returns a random dog fact',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 3 seconds before using this command again.');
		} else {
			try {
				const resp = await axios.get('https://dog-api.kinduff.com/api/facts');
				const dogfact = resp.data.facts[0];
				const color = Math.floor(Math.random() * 16777215);

				message.delete().catch(console.error);

				const embed = {
					description: dogfact,
					color: color,
					footer: {
						text: 'Use `gg.dogfact` to get a new one!',
					},
					timestamp: new Date(),
				};

				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 3000);
				commandLogger.info(`${message.guild.name} | ${message.author.username} | DOGFACT | ${message.channel.name} | ${message.createdTimestamp}`);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, I was unable to get a dog fact.');
			}
		}
	},
};
