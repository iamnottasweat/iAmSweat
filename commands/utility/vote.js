module.exports = {
	name: 'vote',
	description: 'Reacts with a mailbox emoji for users to vote.',
	async execute(message) {
		const color = Math.floor(Math.random() * 16777215);

		const embed = {
			color: color,
			title: 'Vote for our bot!',
			image: {
				url: 'https://cdn.discordapp.com/attachments/1154686461128491051/1187061090237034506/SPOILER_iAmSweat1.png',
			},
			description: 'React with 📫 to get the voting link!',
			timestamp: new Date(),
		};

		// Send the embed to the channel
		const voteMessage = await message.channel.send({ embeds: [embed] });

		// React to the message with the mailbox emoji
		await voteMessage.react('📫');

		// Set up a reaction collector
		const filter = (reaction, user) => {
			return reaction.emoji.name === '📫' && !user.bot;
		};

		const collector = voteMessage.createReactionCollector({ filter, dispose: true });

		collector.on('collect', async (reaction, user) => {
			// Reset the reaction count
			if (reaction.count > 1) {
				await reaction.users.remove(user.id);
			}

			// Send a direct message to the user with the voting link
			user.send(`[VOTE HERE](<https://top.gg/bot/1169158044148580393/vote>)`).catch(console.error);
		});
	},
};
