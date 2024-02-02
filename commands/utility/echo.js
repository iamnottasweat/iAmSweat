const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'echo',
	description: 'Echos a message to a designated channel',
	usage: ';echo <channel> <message>',
	category: 'utility',
	cooldown: 5,

	execute(message, args) {
		try {
			const channel = message.mentions.channels.first();

			if (channel) {
				args = args.filter((arg) => !arg.includes(channel.id));
			}

			const msg = args.join(' ');

			message.delete().catch(console.error);

			if (channel) {
				channel.send(msg);
			} else {
				message.channel.send('Please mention a channel to echo the message.');
				return;
			}

			commandLogger.info(`${message.guild.name} | ${message.author.username} | ECHO | ${channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to echo the message.');
		}
	},
};
