const gifArray1 = ['https://i.imgur.com/sO0HHCc.gif', 'https://i.imgur.com/b0rFWwG.gif', 'https://i.imgur.com/swtG30L.gif', 'https://i.imgur.com/nBU5Jv5.gif', 'https://i.imgur.com/DsFZRVt.gif', 'https://i.imgur.com/dTapjWT.gif', 'https://i.imgur.com/v4hulaJ.gif', 'https://i.imgur.com/lS71XHO.gif'];

const usedGifs = new Set();
const gifHistorySize = 8;

function getRandomGif(gifArray) {
	let gif;
	do {
		gif = gifArray[Math.floor(Math.random() * gifArray.length)];
	} while (usedGifs.has(gif));
	usedGifs.add(gif);
	if (usedGifs.size > gifHistorySize) {
		const oldestGif = Array.from(usedGifs).shift();
		usedGifs.delete(oldestGif);
	}
	return gif;
}
const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'kiss',
	description: 'kiss the homies',
	cooldown: 5,
	async execute(message) {
		try {
			const users = message.mentions.users;
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			let description;
			let image;
			if (users.size > 0) {
				const userMentions = users.map((user) => `<@${user.id}>`).join(', ');
				description = `${message.author} ***is giving a FAT smooch to*** ${userMentions}`;
				image = getRandomGif(gifArray1);
			} else if (message.mentions.members.size > 0) {
				description = `${message.author} ***gave*** ${message.mentions.members.random().user} ***a FAT smooch!***`;
				image = getRandomGif(gifArray1);
			} else {
				description = `${message.author} ***wants to give a FAT smooch but there's no one to lay it on!***`;
				image = 'https://i.imgur.com/lsRGb3L.gif';
			}

			const embed = {
				description: description,
				color: color,
				image: { url: image },
				footer: { text: ';kiss|;kiss @user(s)' },
				timestamp: new Date(),
			};
			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | KISS | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to deliver the smooch for your homies :(');
		}
	},
};
