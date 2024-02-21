const axios = require('axios');
const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'define',
	description: 'defines a word',
	usage: ';define <word>',
	category: 'informational',
	cooldown: 5,
	async execute(message) {
		try {
			const wordToDefine = message.content.split(' ').slice(1).join(' ');
			const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToDefine}`);
			const definition = resp.data[0].meanings[0].definitions[0].definition;
			const color = Math.floor(Math.random() * 16777215);
			const word = resp.data[0].word;

			message.delete().catch(console.error);

			const embed = {
				title: word,
				description: definition,
				color: color,
				timestamp: new Date(),
			};

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | DEFINE | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to find a definition for that word :(');
		}
	},
};
