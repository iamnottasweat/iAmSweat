const color = Math.floor(Math.random() * 16777215);
const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'hello',
	description: 'says a greeting',
	usage: ';hello',
	category: 'fun',
	cooldown: 5,
	execute(message) {
		try {
			message.delete().catch(console.error);

			const embed = {
				description: 'LMFAO, NERRRRRRDDDD! YOU SUCK EGGS! \n\nHey(:',
				color: color,
			};
			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | HELLO | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to say hello.');
		}
	},
};
