const axios = require('axios');
const cooldown = new Set();
const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'define',
	description: 'defines a word',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			const messageContent = message.content.replace('gg.define', '').trim();
			try {
				const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${messageContent}`);
				const definition = resp.data[0].meanings[0].definitions[0].definition;
				const color = Math.floor(Math.random() * 16777215);
				const word = resp.data[0].word;

				message.delete().catch(console.error);

				const embed = {
					title: word,
					description: definition,
					color: color,
					footer: {
						text: 'Use `gg.define` to define another word!',
					},
					timestamp: new Date(),
				};

				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | DEFINE | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, I was unable to find a definition for that word :(');
			}
		}
	},
};
