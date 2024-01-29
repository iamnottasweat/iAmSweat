const axios = require('axios');
const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'apod',
	description: 'returns the Astronomy Picture of the Day',
	cooldown: 86400,
	async execute(message) {
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
					text: ';apod',
				},
				timestamp: new Date(),
			};

			if (apod.media_type === 'image') {
				embed.image = { url: apod.url };
			} else if (apod.media_type === 'video') {
				embed.description += `\n[Watch Video](${apod.url})`;
			}

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | APOD | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get the Astronomy Picture of the Day.');
		}
	},
};
