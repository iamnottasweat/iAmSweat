const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'leet',
	description: 'returns a leet encoded message',
	usage: ';leet <message>',
	category: 'text-manipulators',
	cooldown: 5,
	async execute(message) {
		try {
			const messageContent = message.content.replace(/^(;|gg\.)leet\s+/i, '');
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			const leetMap = {
				a: '4',
				b: '8',
				c: '(',
				d: 'D',
				e: '3',
				f: 'F',
				g: '6',
				h: '#',
				i: '!',
				j: 'J',
				k: 'K',
				l: '1',
				m: 'M',
				n: 'N',
				o: '0',
				p: 'P',
				q: 'Q',
				r: 'R',
				s: '$',
				t: '7',
				u: 'U',
				v: 'V',
				w: 'W',
				x: 'X',
				y: 'Y',
				z: '2',
			};

			const leetMessage = messageContent.replace(/[a-z]/gi, (character) => (leetMap[character.toLowerCase()] || character).toUpperCase());

			const embed = {
				description: leetMessage,
				color: color,
			};
			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | LEET | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get the leet encoded message.');
		}
	},
};
