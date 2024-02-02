const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'vote',
	description: 'get the vote link for the bot',
	usage: ';vote',
	category: 'utility',
	cooldown: 5,
	async execute(message) {
		try {
			const color = Math.floor(Math.random() * 16777215);
			const voteEmbed = {
				description: 'Upvote iAmSweat on top.gg!',
				color: color,
				image: {
					url: 'https://cdn.discordapp.com/attachments/1154686461128491051/1187061090237034506/SPOILER_iAmSweat1.png',
				},
				timestamp: new Date(),
			};

			message.channel.send({
				embeds: [voteEmbed],
				components: [
					{
						type: 1,
						components: [
							{
								type: 2,
								label: 'Bot Vote',
								style: 5,
								url: 'https://top.gg/bot/1169158044148580393/vote',
							},
							{
								type: 2,
								label: 'Server Vote',
								style: 5,
								url: 'https://top.gg/servers/1154686460394483782/vote',
							},
						],
					},
				],
			});

			message.delete().catch(errorLogger.error);
			commandLogger.info(`${message.guild.name} | ${message.author.username} | VOTE | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
		}
	},
};
