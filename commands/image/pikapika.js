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
					url: 'https://media.discordapp.net/attachments/1168547708722745445/1170408407421943878/PikaPika.gif?width=966&height=631',
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
