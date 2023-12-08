const cooldown = new Set();

module.exports = {
	name: 'hug',
	description: 'hugs the user',
	execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			try {
				const user = message.mentions.users.first();
				const color = Math.floor(Math.random() * 16777215);

				message.delete().catch(console.error);

				const embed = {
					description: user ? `${message.author} **hugged** ${user}` : 'hug',
					color: color,
					footer: { text: 'Use `gg.hug` to give another squeeze!' },
					timestamp: new Date(),
				};
				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				console.log(message.guild.name + ' | ' + message.author.username + ' | HUG | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				console.error(error);
				message.channel.send('Sorry, I was unable to hug you :(');
			}
		}
	},
};
