const axios = require('axios');
const cooldown = new Set();
const { commandLogger, errorLogger } = require('../../logger.js');

function randomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
	name: 'randapod',
	description: 'returns the Astronomy Picture of the Day',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 3 seconds before using this command again.');
		} else {
			try {
				const randomDay = randomDate(new Date(1995, 5, 16), new Date());
				const dateStr = `${randomDay.getFullYear()}-${randomDay.getMonth() + 1}-${randomDay.getDate()}`;

				const resp = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.nasaKey}&date=${dateStr}`);
				const apod = resp.data;
				const color = Math.floor(Math.random() * 16777215);

				message.delete().catch(console.error);

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
				}, 3000);
				commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | RANDAPOD | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, I was unable to get the Astronomy Picture of the Day.');
			}
		}
	},
};
