const cooldown = new Set();
const color = Math.floor(Math.random() * 16777215);

module.exports = {
	name: 'hello',
	description: 'says a greeting',
	execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 3 seconds before using this command again.');
		} else {
			try {
				message.delete().catch(console.error);

				const embed = {
					description: 'LMFAO, NERRRRRRDDDD! YOU SUCK EGGS! \n\nHey(:',
					color: color,
				};
				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 3000);
				console.log(message.guild.name + ' | ' + message.author.username + ' | HELLO | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				console.error(error);
				message.channel.send('Sorry, I was unable to say hello.');
			}
		}
	},
};
