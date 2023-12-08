const cooldown = new Set();
//  = require('../../// .js');

module.exports = {
	name: 'punch',
	description: 'punch someone',
	execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			try {
				const user = message.author.username;
				const target = message.mentions.users.first();
				const color = Math.floor(Math.random() * 16777215);

				message.delete().catch(console.error);

				const embed = {
					description: user ? `${message.author} ***jaw-rocked*** ${target}` : `${target}`,
					color: color,
					image: {
						url: 'https://ssb.wiki.gallery/images/thumb/4/47/Captain_Falcon_Neutral_B_SSBU.gif/300px-Captain_Falcon_Neutral_B_SSBU.gif',
					},
					footer: { text: 'Use `gg.punch` to give another punch!' },
					timestamp: new Date(),
				};
				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				// (message.guild.name + ' | ' + message.author.username + ' | PUNCH | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				// .error(error);
				message.channel.send('You were unable to assault someone.');
			}
		}
	},
};
