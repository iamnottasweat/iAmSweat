const gifArray1 = ['https://i.imgur.com/yqzDVx3.gif', 'https://i.imgur.com/CVxIXKI.gif', 'https://i.imgur.com/dJpZbal.gif', 'https://i.imgur.com/Wnwm9oB.gif', 'https://i.imgur.com/JjS26Qe.gif', 'https://i.imgur.com/CZqOqIu.gif', 'https://i.imgur.com/SGwDUUv.gif', 'https://i.imgur.com/uUh92kC.gif', 'https://i.imgur.com/QFpfod5.gif', 'https://i.imgur.com/9kLRZ3v.gif', 'https://i.imgur.com/hpGyFH8.gif'];

const usedGifs = new Set();
const gifHistorySize = 11;
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
	name: 'boo',
	description: 'congratulate the participant on their poor performance',
	cooldown: 5,
	execute(message) {
		try {
			const title = '🍅🍅🍅 BOOOOOOOOOOOOOOOOO! 🍅🍅🍅';
			const color = Math.floor(Math.random() * 16777215);
			const image = getRandomGif(gifArray1);
			const booedUser = message.mentions.users.first();
			const throwerUserId = booedUser ? message.author.id : process.env.otter;
			const booedUserId = booedUser ? booedUser.id : process.env.sweat;
			const description = `<@${throwerUserId}> ***is throwing tomatoes at*** <@${booedUserId}>`;

			message.delete().catch(console.error);

			const embed = {
				title: title,
				description: description,
				color: color,
				image: { url: image },
				footer: { text: ";boo @user - to let 'em know they suuucccccked!" },
				timestamp: new Date(),
			};
			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | BOO | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry but he did too good to boo right now!');
		}
	},
};
