const axios = require('axios');
const { commandLogger, errorLogger } = require('../../logger.js');

const gifArray1 = ['https://i.imgur.com/eSlPOo2.gif', 'https://i.imgur.com/W3rza10.gif', 'https://i.imgur.com/zWTv6bm.gif', 'https://i.imgur.com/eGhYiBZ.gif', 'https://i.imgur.com/u34ky4r.gif', 'https://i.imgur.com/kpoffDo.gif', 'https://i.imgur.com/bMBtAKp.gif'];

const usedGifs = new Set();
const gifHistorySize = 7;
function getRandomGif(gifArray) {
	let gif;
	do {
		gif = gifArray[Math.floor(Math.random() * gifArray.length)];
	} while (usedGifs.has(gif));
	usedGifs.add(gif);
	if (usedGifs.size > gifHistorySize) {
		// Convert Set to Array to easily remove the first (oldest) element.
		const oldestGif = Array.from(usedGifs).shift();
		usedGifs.delete(oldestGif);
	}
	return gif;
}

module.exports = {
	name: 'chuck',
	description: 'returns a random Chuck Norris joke',
	usage: ';chuck',
	category: 'fun',
	cooldown: 5,
	async execute(message) {
		try {
			const resp = await axios.get('https://api.chucknorris.io/jokes/random');
			const chuck = resp.data.value;
			const image = getRandomGif(gifArray1);
			const color = Math.floor(Math.random() * 16777215);
			message.delete().catch(console.error);

			const embed = {
				description: chuck,
				image: { url: image },
				color: color,
				timestamp: new Date(),
			};

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | CHUCK | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get a Chuck Norris joke.');
		}
	},
};
