const gifArray1 = [
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562500310671470/punch1.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562500960780308/punch2.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562501694791710/punch3.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562502374260766/punch4.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562502848229467/punch5.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562503422844958/punch6.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562504114897036/punch7.gif',
	'https://cdn.discordapp.com/attachments/1184198610578059364/1184562510754488430/punch8.gif',
];

const cooldown = new Set();
const { commandLogger, errorLogger } = require('../../logger.js');
module.exports = {
	name: 'punch',
	description: 'punch someone',
	execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			try {
				const target = message.mentions.users.first();
				const color = Math.floor(Math.random() * 16777215);
				const image = gifArray1[Math.floor(Math.random() * gifArray1.length)];

				message.delete().catch(console.error);

				const embed = {
					description: target ? `${message.author} ***jaw-rocked*** ${target}` : `${message.author} ***is randomly assaulting someone***`,
					color: color,
					image: {
						url: image,
					},
					footer: { text: 'Use `gg.punch` to give another punch!' },
					timestamp: new Date(),
				};
				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | PUNCH | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('You were unable to assault someone.');
			}
		}
	},
};
