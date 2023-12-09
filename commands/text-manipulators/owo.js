const cooldown = new Set();
const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'owo',
	description: 'inner e-girl',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			try {
				if (message.content.startsWith('gg.owo ')) {
					let messageContent = message.content.replace('gg.owo ', '').trim();
					messageContent = messageContent
						.replace(/(?:r|l)/g, 'w')
						.replace(/(?:R|L)/g, 'W')
						.replace(/n([aeiou])/g, 'ny$1')
						.replace(/N([aeiou])/g, 'Ny$1')
						.replace(/N([AEIOU])/g, 'Ny$1')
						.replace(/ove/g, 'uv');

					const color = Math.floor(Math.random() * 16777215);

					message.delete().catch(console.error);

					const embed = {
						description: messageContent,
						color: color,
					};

					message.channel.send({ embeds: [embed] });
				}
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | OWO | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, an error occurred while processing your request.');
			}
		}
	},
};
