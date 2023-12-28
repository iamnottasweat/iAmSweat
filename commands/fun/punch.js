const gifArray1 = [
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562500310671470/punch1.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562500960780308/punch2.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562501694791710/punch3.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562502374260766/punch4.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562502848229467/punch5.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562503422844958/punch6.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562504114897036/punch7.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562510754488430/punch8.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1185194580912648223/punch9.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534654204346408/patrick-punching.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534654590230629/punch10.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534654967726190/punch11.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534655303254046/santa-punching-bag.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534655710109716/stepbrothers-pummel-punch.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534656091799582/weliton-amogos.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534662647484426/anime-fight.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534663427633162/anime-naruto.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534663977078844/anime-punch-anime.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534664614608926/anime-smash.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534664983720026/beating-up-beating-up-lilo.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534665440890880/boxing-tom-and-jerry.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534666376216627/crackhead-homeless-man.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534667076669511/hasbulla-hasbik.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534667579981844/lulugifs-charlie-brown.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1185534668200751204/one-punch-man.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1189382700918919218/kick-swae-lee.gif',
];

const usedGifs = new Set();
const gifHistorySize = 20;
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

const { commandLogger, errorLogger } = require('../../logger.js');
module.exports = {
	name: 'punch',
	description: 'punch someone',
	cooldown: 5,
	execute(message) {
		try {
			const targets = message.mentions.users.map((user) => `<@${user.id}>`).join(' ');
			const color = Math.floor(Math.random() * 16777215);
			const image = getRandomGif(gifArray1);
			const description = targets.length > 0 ? `${message.author} ***jaw-rocked*** ${targets}` : `${message.author} ***is randomly assaulting someone***`;

			message.delete().catch(console.error);

			const embed = {
				description: description,
				color: color,
				image: {
					url: image,
				},
				footer: { text: 'Use `gg.punch | gg.punch @user` to give another punch!' },
				timestamp: new Date(),
			};
			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | PUNCH | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('You were unable to assault someone.');
		}
	},
};
