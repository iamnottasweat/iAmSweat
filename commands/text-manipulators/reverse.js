const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'reverse',
	description: 'reverses the message',
	cooldown: 5,
	execute(message, args) {
		try {
			const msg = args.join(' ');
			const reverseMsg = msg.split('').reverse().join('');

			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			const embed = {
				description: reverseMsg,
				color: color,
			};
			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | REVERSE | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to reverse the message.');
		}
	},
};
