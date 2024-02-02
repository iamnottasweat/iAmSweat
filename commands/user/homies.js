const cooldown = new Set();
const color = Math.floor(Math.random() * 16777215);
const { errorLogger, commandLogger } = require('../../logger.js');

const allowedUserIds = [process.env.sweat, process.env.buzz, process.env.banana, process.env.otter, process.env.alfa, process.env.crazy, process.env.twisty];

module.exports = {
	name: 'homies',
	description: "the homies' special list",
	usage: ';homies',
	category: 'user-locked',
	cooldown: 5,
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
						name: `;buzz`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `;buzzz`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `;evie`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `;eviee`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `;lexi`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `;eimy`,
						value: '\u200b',
						inline: true,
					},
					{
						name: `;twisty`,
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
						text: 'Gang Gang',
					},
					image: {
						url: 'https://cdn.discordapp.com/attachments/1159353644785881100/1187089411914072175/chost-machine.gif',
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
