const cooldown = new Set();
const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'dm',
	description: 'dm the user',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 3 seconds before using this command again.');
		} else {
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
					cooldown.add(message.author.id);
					setTimeout(() => {
						cooldown.delete(message.author.id);
					}, 3000);
					commandLogger.info(`${message.guild.name} | ${message.author.username} | DM | ${message.channel.name} | ${message.createdTimestamp}`);
				} catch (error) {
					errorLogger.error(error);
					message.author.send('Failed to send the message.');
				}
			}
		}
	},
};
