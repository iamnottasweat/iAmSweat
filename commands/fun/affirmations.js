const axios = require('axios');
const cooldown = new Set();
const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'affirmations',
	description: 'returns a random affirmation',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			commandLogger.info('Executing roast command');
			try {
				const resp = await axios.get('https://www.affirmations.dev/');
				const affirmation = resp.data.affirmation;
				const user = message.mentions.users.first();
				const color = Math.floor(Math.random() * 16777215);

				message.delete().catch(console.error);

				const embed = {
					description: user ? `${message.author} **has kind words for** ${user}:\n\n${affirmation}` : `${affirmation}`,
					color: color,
					footer: { text: 'Use `gg.affirmations` to get a new one!' },
					timestamp: new Date(),
					image: {
						url: 'https://cdn.discordapp.com/attachments/1159353644785881100/1180852867083538513/statsgif4.gif',
					},
				};

				message.channel.send({ embeds: [embed] });

				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | AFFIRMATIONS | ' + message.channel.name + ' | ' + message.createdTimestamp);
				commandLogger.debug('Affirmations command executed.');
			} catch (error) {
				errorLogger.error('Error executing affirmation command: ' + error);
				message.channel.send('Sorry, I was unable to get an affirmation.');
			}
		}
	},
};
