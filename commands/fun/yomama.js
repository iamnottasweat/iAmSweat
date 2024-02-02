const axios = require('axios');
const { commandLogger, errorLogger } = require('../../logger.js');
module.exports = {
	name: 'yomama',
	description: 'returns a random yomama joke',
	usage: ';yomama | ;yomomma <target>',
	category: 'fun',
	cooldown: 5,
	async execute(message) {
		try {
			const resp = await axios.get('http://api.yomomma.info/');
			const yomama = resp.data.joke;
			const users = message.mentions.users;
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			let description;
			if (users.size > 0) {
				const userMentions = users.map((user) => `<@${user.id}>`).join(', ');
				description = `Hey, ${userMentions}!\n${message.author} **said** :\n\n${yomama}`;
			} else {
				description = `${yomama}`;
			}

			const embed = {
				description: description,
				color: color,
				image: { url: 'https://cdn.discordapp.com/attachments/1159353644785881100/1181257499068878918/your-mom-50cent.gif' },
				timestamp: new Date(),
			};

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | YOMOMAMA | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get a yomama joke.');
		}
	},
};
