const { commandLogger, errorLogger } = require('../../logger.js');
module.exports = {
	name: 'pineapple',
	description: 'global safeword',
	usage: ';pineapple',
	category: 'fun',
	cooldown: 5,
	execute(message) {
		try {
			message.delete().catch(console.error);

			const color = Math.floor(Math.random() * 16777215);

			const embed = {
				title: 'CLICK THE LINKS BELOW IF YOU HAVE THE STONES',
				description:
					"# [If you thought for a second,](https://fortnitetracker.com/profile/all/iAmNottaSweat)\n\n# [that anything about this could,](https://duckduckgo.com/?q=capybara&iax=images&ia=images)\n\n# [be normal I would beg to ask,](https://youtu.be/dQw4w9WgXcQ)\n\n# [do you even know yourself bro?](https://www.crunchyroll.com/series/GR751KNZY/attack-on-titan)\n\n# [I didn't think so. What's this?](https://www.spitecult.com/)\n\n# [Find out, and quit being a poonani, fam.](https://youtu.be/HfW3ssA9LG4)",
				color: color,
				timestamp: new Date(),
			};

			embed.image = { url: 'https://media.discordapp.net/attachments/1159353644785881100/1167320856985358376/Screenshot_20231013_170216_YouTube.jpg' };

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | PINEAPPLE | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to list the commands.');
		}
	},
};
