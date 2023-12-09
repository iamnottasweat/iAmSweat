const axios = require('axios');
const cooldown = new Set();
const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'nasa',
	description: 'let NASA suprise you with a photo.',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 3 seconds before using this command again.');
		} else {
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

				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 3000);
				commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | NASA | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, I was unable to get the NASA imagery for you.');
			}
		}
	},
};
