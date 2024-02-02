const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'dm',
	description: 'dm the user',
	usage: ';dm <target> <message>',
	category: 'utility',
	cooldown: 5,
	async execute(message) {
		const messageContent = message.content.replace('gg dm', '').trim();
		const user = message.mentions.users.first();

		message.delete().catch(console.error);

		if (!user) {
			message.author.send('You need to mention a user in order to dm them.');
		} else if (messageContent === '') {
			message.author.send('You need to provide a message to send.');
		} else {
			try {
				await user.send(messageContent);
				message.author.send('Message sent successfully!');
				commandLogger.info(`${message.guild.name} | ${message.author.username} | DM | ${message.channel.name} | ${message.createdTimestamp}`);
			} catch (error) {
				errorLogger.error(error);
				message.author.send('Failed to send the message.');
			}
		}
	},
};
