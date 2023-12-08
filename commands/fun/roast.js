const axios = require('axios');
const cooldown = new Set();

module.exports = {
	name: 'roast',
	description: 'returns a random roast',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			// ('Executing roast command');
			try {
				const resp = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
				const roast = resp.data.insult;
				const user = message.mentions.users.first();
				const color = Math.floor(Math.random() * 16777215);

				message.delete().catch(console.error);

				const embed = {
					description: user ? `${message.author} **roasted** ${user}:\n\n${roast}` : `${roast}`,
					image: {
						url: 'https://cdn.discordapp.com/attachments/1159353644785881100/1180650581241630760/roasted-oh.gif',
					},
					color: color,
					footer: { text: 'Use `gg.roast` to get a new one!' },
					timestamp: new Date(),
				};

				message.channel.send({ embeds: [embed] });

				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
			} catch (error) {
				message.channel.send('Sorry, I was unable to get a roast.');
			}
		}
	},
};
