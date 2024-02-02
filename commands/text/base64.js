const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'base64',
	description: 'returns the base 64 encoded message',
	usage: ';base64 <message>',
	category: 'text-manipulators',
	cooldown: 5,
	async execute(message) {
		try {
			const messageContent = message.content.replace('gg.base64 ', '').replace(';base64 ', '').trim();
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			const embed = {
				description: Buffer.from(messageContent).toString('base64'),
				color: color,
			};
			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | BASE64 | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get the base 64 encoded message.');
		}
	},
};
