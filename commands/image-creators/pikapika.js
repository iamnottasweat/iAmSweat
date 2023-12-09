const cooldown = new Set();
const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'pikapika',
	description: 'Pikachu!',
	execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 10 seconds before using this command again.');
		} else {
			try {
				message.delete().catch(console.error);

				const color = Math.floor(Math.random() * 16777215);

				const embed = {
					description: 'Pika?',
					image: {
						url: 'https://media.discordapp.net/attachments/1168547708722745445/1170408407421943878/PikaPika.gif?width=966&height=631',
					},
					color: color,
					footer: {
						text: 'Use `gg.pikapika` to get a new one!',
					},
					timestamp: new Date(),
				};

				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 10000);
				commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | PIKAPIKA | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, I was unable to pika-pika... pikachu :(');
			}
		}
	},
};
