const cooldown = new Set();
const color = Math.floor(Math.random() * 16777215);

module.exports = {
	name: 'hex',
	description: 'returns a random hex color',
	execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 3 seconds before using this command again.');
		} else {
			try {
				const hexColor = Math.floor(Math.random() * 16777215).toString(16);
				const decimalColor = parseInt(hexColor, 16);

				message.delete().catch(console.error);

				const embed = {
					title: '# RANDOM COLOR',
					description: `# __**HEX:**__ #${hexColor}\n# __**DECIMAL:**__ ${decimalColor}`,
					color: color,
					thumbnail: {
						url: `https://singlecolorimage.com/get/${hexColor}/400x400`,
					},
				};

				message.channel.send({ embeds: [embed] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 3000);
				console.log(message.guild.name + ' | ' + message.author.username + ' | HEX | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				console.error(error);
				message.channel.send('Sorry, I was unable to get a hex color.');
			}
		}
	},
};
