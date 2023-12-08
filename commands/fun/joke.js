const axios = require('axios');
const cooldown = new Set();
//  = require('../../// .js');

module.exports = {
	name: 'joke',
	description: 'returns a random joke',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			try {
				const resp = await axios.get('https://official-joke-api.appspot.com/random_joke');
				const joke = resp.data.setup + '\n' + resp.data.punchline;
				const color = Math.floor(Math.random() * 16777215);

				message.delete().catch(console.error);

				const embed = {
					description: joke,
					color: color,
					footer: { text: 'Use `gg.joke` to get a new one!' },
					timestamp: new Date(),
				};

				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				// (message.guild.name + ' | ' + message.author.username + ' | JOKE | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				// .error(error);
				message.channel.send('Sorry, I was unable to get a joke.');
			}
		}
	},
};
