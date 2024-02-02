const gangFilePath = process.env.gangFilePath;
const logger = process.env.loggerPath;
const { commandLogger, errorLogger } = require(logger);
const fs = require('fs').promises;

module.exports = {
	name: 'steal',
	description: 'steal doubloons from the homies: **NOT FUNCTIONAL YET**',
	usage: ';steal <user>',
	category: 'currency',
	cooldown: 30,

	async execute(message) {
		try {
			const targetUser = message.mentions.users.first();
			if (!targetUser) {
				message.channel.send('You must mention a user to steal from.');
				return;
			}

			const gangBank = JSON.parse(await fs.readFile(gangFilePath, 'utf8'));

			const victim = gangBank[targetUser.id];
			const thief = gangBank[message.author.id];

			if (!victim || victim.doubloons < 1) {
				message.channel.send("This user doesn't have any doubloons to steal.");
				return;
			}

			const successProbability = 0.5;
			const isSuccess = Math.random() < successProbability;

			if (isSuccess) {
				const stealAmount = Math.floor(Math.random() * victim.doubloons) + 1;
				victim.doubloons -= stealAmount;
				thief.doubloons += stealAmount;

				await fs.writeFile(gangFilePath, JSON.stringify(gangBank, null, 4), 'utf8');

				message.channel.send(`You .
                stole \`${stealAmount}\` doubloons from ${targetUser.username}!`);
				commandLogger.info(`${message.guild.name} | ${message.author.username} stole from ${targetUser.username} | STEAL | ${message.channel.name} | ${message.createdTimestamp}`);
			} else {
				message.channel.send(`Your attempt to steal from ${targetUser.username} failed.`);
			}
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to complete the steal attempt.');
		}
	},
};
