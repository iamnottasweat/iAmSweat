require('dotenv').config();

module.exports = (client, prefixes) => {
	const cooldowns = new Map();
	const exemptUserID = process.env.sweat;
	const exemptUserID2 = process.env.otter;
	client.on('messageCreate', (message) => {
		const prefix = prefixes.find((p) => message.content.startsWith(p));
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		if (!client.commands.has(commandName)) return;

		const command = client.commands.get(commandName);
		const now = Date.now();

		if (message.author.id !== exemptUserID) {
			if (!cooldowns.has(commandName)) {
				cooldowns.set(commandName, new Map());
			}

			if (message.author.id !== exemptUserID2) {
				if (!cooldowns.has(commandName)) {
					cooldowns.set(commandName, new Map());
				}
			}

			const timestamps = cooldowns.get(commandName);
			const cooldownAmount = (command.cooldown || 5) * 1000;

			if (timestamps.has(message.author.id)) {
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${commandName}\` command.`);
				}
			}

			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		}

		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply('There was an error trying to execute that command!');
		}
	});
};
