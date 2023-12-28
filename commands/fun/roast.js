const axios = require('axios');
const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'roast',
	description: 'returns a random roast',
	cooldown: 5,
	async execute(message) {
		try {
			const resp = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
			const roast = resp.data.insult;
			const users = message.mentions.users;
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			let description;
			if (users.size > 0) {
				const userMentions = users.map((user) => `<@${user.id}>`).join(', ');
				description = `${message.author} **roasted** ${userMentions}:\n\n${roast}`;
			} else {
				description = `${roast}`;
			}

			const embed = {
				description: description,
				thumbnail: {
					url: 'https://cdn.discordapp.com/attachments/1159353644785881100/1180650581241630760/roasted-oh.gif',
				},
				color: color,
				footer: { text: 'Use `gg.roast | gg.roast @user` to get a new one!' },
				timestamp: new Date(),
			};

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | ROAST | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get a roast.');
		}
	},
};
