const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'hug',
	description: 'hugs the user',
	cooldown: 5,
	execute(message) {
		try {
			const users = message.mentions.users;
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			let description;
			if (users.size > 0) {
				const userMentions = users.map((user) => `<@${user.id}>`).join(', ');
				description = `${message.author} ***gave a tight squeeze to*** ${userMentions}`;
			} else {
				description = `<@${message.client.user.id}> ***gave a tight squeeze to*** ${message.author}`;
			}

			const embed = {
				description: description,
				thumbnail: {
					url: 'https://cdn.discordapp.com/attachments/1159353644785881100/1182824057603883158/hug.gif',
				},
				color: color,
				footer: { text: ';hug|;hug @user' },
				timestamp: new Date(),
			};
			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | HUG | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to hug you :(');
		}
	},
};
