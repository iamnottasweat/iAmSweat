const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'owo',
	description: 'inner e-girl',
	usage: ';owo <message>',
	category: 'text-manipulators',
	cooldown: 5,
	async execute(message) {
		try {
			let messageContent = message.content.replace(/^(;|gg\.)owo\s+/i, '').trim();
			messageContent = messageContent
				.replace(/(?:r|l)/g, 'w')
				.replace(/(?:R|L)/g, 'W')
				.replace(/n([aeiou])/g, 'ny$1')
				.replace(/N([aeiou])/g, 'Ny$1')
				.replace(/N([AEIOU])/g, 'Ny$1')
				.replace(/ove/g, 'uv');

			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			const embed = {
				description: messageContent,
				color: color,
			};

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | OWO | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, an error occurred while processing your request.');
		}
	},
};
