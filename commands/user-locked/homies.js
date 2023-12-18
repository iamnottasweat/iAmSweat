const cooldown = new Set();
const color = Math.floor(Math.random() * 16777215);
const { errorLogger, commandLogger } = require('../../logger.js');

const allowedUserIds = [process.env.sweat, process.env.buzz, process.env.banana, process.env.otter, process.env.cactus, process.env.flamingo, process.env.pistol, process.env.alfa, process.env.crazy, process.env.twisty];

module.exports = {
	name: 'homies',
	description: "the homies' special list",
	execute(message) {
		if (!allowedUserIds.includes(message.author.id)) {
			message.reply('Sorry, this command is not for you.');
			return;
		} else {
			try {
				const fields = [
					{
						name: '\u200b',
						value: '\u200b',
						inline: false,
					},
					{
						name: `gg.buzz`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `gg.buzzz`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `gg.evie`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `gg.eviee`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `gg.lexi`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `gg.eimy`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `gg.litt`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `gg.jazzy`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `gg.karen`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `gg.karenn`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `gg.karennn`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `gg.twisty`,
						value: '\u200b',
						inline: true,
					},
				];

				message.delete().catch(console.error);

				const embed = {
					title: "***THE HOMIES' SPECIAL LIST***",
					fields: fields,
					color: color,
					timestamp: new Date(),
					footer: {
						text: "The Homies' Special List",
					},
					image: {
						url: 'https:dn.discordapp.com/attachments/1159353644785881100/1179623658709336135/adventure-time.gif',
					},
				};
				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 3000);
				commandLogger.info(`${message.guild.name} | ${message.author.username} | HOMIES | ${message.channel.name} | ${message.createdTimestamp}`);
			} catch (error) {
				errorLogger.log(error);
				message.channel.send('Sorry, I was unable to give the special list.');
			}
		}
	},
};
