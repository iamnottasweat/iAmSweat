const axios = require('axios');
const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'dogfact',
	description: 'returns a random dog fact',
	cooldown: 5,
	async execute(message) {
		try {
			const resp = await axios.get('https://dog-api.kinduff.com/api/facts');
			const dogfact = resp.data.facts[0];
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			const embed = {
				description: dogfact,
				color: color,
				footer: {
					text: ';dogfact',
				},
				timestamp: new Date(),
			};

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | DOGFACT | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get a dog fact.');
		}
	},
};
