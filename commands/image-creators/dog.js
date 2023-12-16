const axios = require('axios');
const { commandLogger, errorLogger } = require('../../logger.js');
module.exports = {
	name: 'dog',
	description: 'returns a random dog picture',
	cooldown: 5,
	async execute(message) {
		try {
			const resp = await axios.get('https://dog.ceo/api/breeds/image/random');
			const dog = resp.data.message;
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			const embed = {
				image: {
					url: dog,
				},
				color: color,
				footer: {
					text: 'Use `gg.dog` to get a dog image!',
				},
				timestamp: new Date(),
			};

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | DOG | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get a dog picture.');
		}
	},
};
