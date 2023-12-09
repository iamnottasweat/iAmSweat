const axios = require('axios');
const cooldown = new Set();
const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'apod',
	description: 'returns the Astronomy Picture of the Day',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 24 hours before using this command again.');
		} else {
			try {
				const resp = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.nasaKey}`);
				const apod = resp.data;

				message.delete().catch(console.error);

				const color = Math.floor(Math.random() * 16777215);

				const embed = {
					title: apod.title,
					description: apod.explanation,
					color: color,
					footer: {
						text: 'Use `gg.randapod` to get a new one!',
					},
					timestamp: new Date(),
				};

				if (apod.media_type === 'image') {
					embed.image = { url: apod.url };
				} else if (apod.media_type === 'video') {
					embed.description += `\n[Watch Video](${apod.url})`;
				}

				message.channel.send({ embeds: [embed] });

				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 86400000);
				commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | APOD |' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, I was unable to get the Astronomy Picture of the Day.');
			}
		}
	},
};
