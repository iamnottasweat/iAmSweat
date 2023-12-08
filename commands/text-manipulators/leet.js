const cooldown = new Set();
//  = require('../../// .js');

module.exports = {
	name: 'leet',
	description: 'returns a leet encoded message',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			try {
				const messageContent = message.content.replace('gg.leet ', '');
				const color = Math.floor(Math.random() * 16777215);

				message.delete().catch(console.error);

				const embed = {
					description: messageContent.replace(/[a-z]/gi, (c) => '4BCD3F6H1JKLMN0PQR57'[parseInt(c, 36) - 10] || c),
					color: color,
				};
				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				// (message.guild.name + ' | ' + message.author.username + ' | LEET | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				// .error(error);
				message.channel.send('Sorry, I was unable to get the leet encoded message.');
			}
		}
	},
};
