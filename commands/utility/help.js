const fs = require('fs');
const path = require('path');

module.exports = {
	name: 'help',
	description: 'lists all available commands',
	usage: ';help',
	category: 'utility',
	cooldown: 30,
	execute(message) {
		const embeds = [];
		const categories = {
			Currency: ['gang', 'plunder', 'rockPaperScissors'],
			Fun: ['affirmations', 'boo', 'chuck', 'hello', 'hug', 'joke', 'kiss', 'pineapple', 'punch', 'quote', 'roast', 'trump', 'yomama'],
			Image: ['dog', 'doggos', 'pikapika'],
			Informational: ['apod', 'define', 'dogfact', 'nasa', 'randapod', 'weather'],
			Text: ['base64', 'binary', 'leet', 'mock', 'owo', 'reverse'],
			//			User: ['buzz', 'buzzz', 'eimy', 'evie', 'eviee', 'homies', 'lexi', 'twisty'],
			Utility: ['dm', 'echo', 'embed', 'embedhelp', 'help', 'hex', 'ping', 'pokeHelp', 'vote'],
		};

		Object.keys(categories).forEach((category) => {
			const commandsInfo = categories[category]
				.map((commandName) => {
					const commandPath = path.join(__dirname, '..', category, `${commandName}.js`);
					if (fs.existsSync(commandPath)) {
						const commandFile = require(commandPath);
						return `✧ __**${commandName}**__ - ${commandFile.description}\n\`${commandFile.usage}\`\n`;
					} else {
						console.error(`Command file for '${commandName}' not found.`);
						return `✧ **${commandName}** - No usage info available.`;
					}
				})
				.join('\n');

			const embed = {
				title: `***${category} Commands***`,
				description: commandsInfo,
				color: Math.floor(Math.random() * 16777215),
				timestamp: new Date(),
			};
			embeds.push({ embeds: [embed] });
		});
		let currentPage = 0;

		message.channel.send(embeds[currentPage]).then((msg) => {
			msg.react('◀️');
			msg.react('▶️');

			const filter = (reaction, user) => {
				return ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === message.author.id;
			};

			const collector = msg.createReactionCollector(filter, { time: 300000 });
			collector.on('collect', (reaction) => {
				reaction.users.remove(message.author);
				if (reaction.emoji.name === '▶️') {
					currentPage = (currentPage + 1) % embeds.length;
				} else if (reaction.emoji.name === '◀️') {
					currentPage = (currentPage - 1 + embeds.length) % embeds.length;
				}
				msg.edit(embeds[currentPage]);
			});
			collector.on('end', () => {
				msg.reactions.removeAll().catch((error) => console.error('Failed to clear reactions: ', error));
			});
		});
	},
};
