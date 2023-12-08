const axios = require('axios');
const cooldown = new Set();
//  = require('../../// .js');

module.exports = {
	name: 'dog',
	description: 'returns a random dog picture',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 10 seconds before using this command again.');
		} else {
			try {
				const resp = await axios.get('https://dog.ceo/api/breeds/image/random');
				const dog = resp.data.message;
				const color = Math.floor(Math.random() * 16777215);

				message.delete().catch(console.error);

				const embed = {
					image: {
						url: dog,
					},
					color: color,
					footer: {
						text: 'Use `gg.dog` to get a dog image!',
					},
					timestamp: new Date(),
				};

				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 10000);
				// (message.guild.name + ' | ' + message.author.username + ' | DOG | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				// .error(error);
				message.channel.send('Sorry, I was unable to get a dog picture.');
			}
		}
	},
};
