const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'pikapika',
	description: 'Pikachu!',
	usage: ';pikapika',
	category: 'image-creators',
	cooldown: 5,
	execute(message) {
		try {
			message.delete().catch(console.error);

			const color = Math.floor(Math.random() * 16777215);

			const embed = {
				description: 'Pika?',
				image: {
					url: 'https://i.imgur.com/JGWWds8.gif',
				},
				color: color,
				timestamp: new Date(),
			};

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | PIKAPIKA | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to pika-pika... pikachu :(');
		}
	},
};
