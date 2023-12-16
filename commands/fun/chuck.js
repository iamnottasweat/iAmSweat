const axios = require('axios');
const { commandLogger, errorLogger } = require('../../logger.js');

const gifArray1 = [
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181140965029838878/chuck-norris-3.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181140964664946688/chuck-norris-2.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181140965398958112/chuck-norris-4.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181140966430736414/chuck-norris-6.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181140966795661383/chuck-norris-8.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181140964149055509/chuck-norris-1.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181140965814186034/chuck-norris-5.gif',
];

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
				footer: { text: 'Use `gg.chuck` to get a new one!' },
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
