const axios = require('axios');
const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'affirmations',
	description: 'returns a random affirmation',
	usage: ';affirmations | ;affirmations <target>',
	category: 'fun',
	cooldown: 5,
	async execute(message) {
		try {
			const resp = await axios.get('https://www.affirmations.dev/');
			const affirmation = resp.data.affirmation;
			const users = message.mentions.users;
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			let description;
			if (users.size > 0) {
				const userMentions = users.map((user) => `<@${user.id}>`).join(', ');
				description = `${message.author} **has kind words for** ${userMentions}:\n\n${affirmation}`;
			} else {
				description = `${affirmation}`;
			}

			const embed = {
				description: description,
				color: color,
				timestamp: new Date(),
				image: {
					url: 'https://i.imgur.com/0UOV1M6.gif',
				},
			};

			message.channel.send({ embeds: [embed] });

			commandLogger.info(`${message.guild.name} | ${message.author.username} | AFFIRMATIONS | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error('Error executing affirmation command: ' + error);
			message.channel.send('Sorry, I was unable to get an affirmation.');
		}
	},
};
