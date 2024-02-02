const axios = require('axios');
const { commandLogger, errorLogger } = require('../../logger.js');
module.exports = {
	name: 'trump',
	description: 'returns a random trump quote',
	usage: ';trump',
	category: 'fun',
	cooldown: 5,
	async execute(message) {
		try {
			const resp = await axios.get('https://api.whatdoestrumpthink.com/api/v1/quotes/random');
			const trump = resp.data.message;
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			const embed = {
				description: trump,
				image: {
					url: 'https://cdn.discordapp.com/attachments/1159353644785881100/1181307125151059988/trump.gif',
				},
				color: color,
				timestamp: new Date(),
			};

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | TRUMP | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get a trump quote.');
		}
	},
};
