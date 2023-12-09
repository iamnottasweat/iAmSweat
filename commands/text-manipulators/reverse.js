const cooldown = new Set();
const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'reverse',
	description: 'reverses the message',
	execute(message, args) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
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
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | REVERSE | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, I was unable to reverse the message.');
			}
		}
	},
};
