const axios = require('axios');
const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'nasa',
	description: 'let NASA surprise you with a photo.',
	cooldown: 5,
	async execute(message) {
		try {
			const resp = await axios.get('https://images-api.nasa.gov/search?media_type=image');
			const nasa = resp.data;

			const randomIndex = Math.floor(Math.random() * nasa.collection.items.length);
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			const embed = {
				title: 'NASA Image',
				description: nasa.collection.items[randomIndex].data[0].description,
				color: color,
				footer: {
					text: 'Use `gg.nasa` to get a new one!',
				},
				timestamp: new Date(),
			};

			embed.image = { url: nasa.collection.items[randomIndex].links[0].href };

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | NASA | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get the NASA imagery for you.');
		}
	},
};
