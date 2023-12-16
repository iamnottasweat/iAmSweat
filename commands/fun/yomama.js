const axios = require('axios');
const cooldown = new Set();
const { commandLogger, errorLogger } = require('../../logger.js');
module.exports = {
	name: 'yomama',
	description: 'returns a random yomama joke',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			try {
				const resp = await axios.get('http://api.yomomma.info/');
				const yomama = resp.data.joke;
				const user = message.mentions.users.first();
				const color = Math.floor(Math.random() * 16777215);

				message.delete().catch(console.error);

				const embed = {
					description: user ? `**Hey** ${user}.. ${message.author} **told me**\n\n${yomama}` : `${yomama}`,
					color: color,
					image: { url: 'https://cdn.discordapp.com/attachments/1159353644785881100/1181257499068878918/your-mom-50cent.gif' },
					footer: { text: 'Use `gg.yomama | gg.yomomma @user` to get a new one!' },
					timestamp: new Date(),
				};

				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | YOMAMA | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, I was unable to get a yomama joke.');
			}
		}
	},
};
