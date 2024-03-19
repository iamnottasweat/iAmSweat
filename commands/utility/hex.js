const color = Math.floor(Math.random() * 16777215);
const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'hex',
	description: 'returns a random hex color',
	usage: ';hex',
	category: 'utility',
	cooldown: 5,
	execute(message) {
		try {
			const hexColor = Math.floor(Math.random() * 16777215).toString(16);
			const decimalColor = parseInt(hexColor, 16);
			message.delete().catch(console.error);
			const embed = {
				description: `__**Random Hex Color**__\n\n**HEX:** __***#${hexColor}***__\n\n**DECIMAL:** __***${decimalColor}***__`,
				color: color,
				thumbnail: {
					url: `https://singlecolorimage.com/get/${hexColor}/400x400`,
				},
				timestamp: new Date(),
			};
			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | HEX | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get a hex color.');
		}
	},
};
