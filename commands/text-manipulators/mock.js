const cooldown = new Set();
//  = require('../../// .js');

module.exports = {
	name: 'mock',
	description: 'mocks the message',
	execute(message, args) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			try {
				const msg = args.join(' ');
				const mockMsg = msg
					.split('')
					.map((c, i) => (i % 2 ? c.toUpperCase() : c.toLowerCase()))
					.join('');
				const color = Math.floor(Math.random() * 16777215);

				message.delete().catch(console.error);

				const embed = {
					description: mockMsg,
					color: color,
					timestamp: new Date(),
					footer: {
						text: 'Mocked by ' + message.author.username,
					},
					thumbnail: {
						url: 'https://cdn.discordapp.com/attachments/1175806653099167775/1179208139262926919/5501444A-48D2-4972-BD1C-506AFF694C0B_4_5005_c.jpeg',
					},
				};
				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				// (message.guild.name + ' | ' + message.author.username + ' | MOCK | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				// .error(error);
				message.channel.send('Sorry, I was unable to mock the message.');
			}
		}
	},
};
