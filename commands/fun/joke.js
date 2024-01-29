const axios = require('axios');
const { commandLogger, errorLogger } = require('../../logger.js');
module.exports = {
	name: 'joke',
	description: 'returns a random joke',
	cooldown: 5,
	async execute(message) {
		try {
			const resp = await axios.get('https://official-joke-api.appspot.com/random_joke');
			const joke = resp.data.setup + '\n' + resp.data.punchline;
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			const embed = {
				description: joke,
				color: color,
				footer: { text: ';joke' },
				timestamp: new Date(),
			};

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | JOKE | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get a joke.');
		}
	},
};
