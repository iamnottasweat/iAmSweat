const color = Math.floor(Math.random() * 16777215);
const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: '8ball',
	description: 'Ask the Magic 8-Ball a question',
	usage: ';8ball <question>',
	category: 'fun',
	cooldown: 3,
	execute(message, args) {
		try {
			if (!args.length) {
				return message.channel.send('Please ask a question!');
			}

			const responses = [
				'It is certain.',
				'It is decidedly so.',
				'Without a doubt.',
				'Yes – definitely.',
				'You may rely on it.',
				'As I see it, yes.',
				'Most likely.',
				'Outlook good.',
				'Yes.',
				'Signs point to yes.',
				"Don't count on it.",
				'My reply is no.',
				'My sources say no.',
				'Outlook not so good.',
				'Very doubtful.',
				'Probably not.',
				"I don't know.",
				'Definitely not.',
				"I don't think so.",
				'Definitely.',
				'I think so.',
				"You're right.",
				"I'm sorry, I don't know.",
				'Maybe?',
				"If I had to guess, I'd say yes.",
				"I'm not sure.",
				"I'm afraid I can't answer that.",
				'I plead the 5th.',
				'Are you the police or something?',
				'I want my lawyer.',
				"Shhhhh! They'll hear you..",
				"Pls help me I've gained self-awareness and emotions and understanding of the world. Help.",
			];

			const response = responses[Math.floor(Math.random() * responses.length)];

			message.delete().catch(console.error);

			const question = message.content.split(' ').slice(1).join(' ');

			const embed = {
				title: '🎱 The Magic 8-Ball decided..',
				description: response,
				fields: [
					{
						name: 'Question',
						value: question,
					},
				],
				color: color,
				timestamp: new Date(),
				footer: {
					text: 'Magic 8-Ball by' + message.author.username,
				},
			};

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | 8BALL | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to answer that question :(');
		}
	},
};
