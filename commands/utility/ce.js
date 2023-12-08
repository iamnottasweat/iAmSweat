/*
const cooldown = new Set();
const { commandLogger, errorLogger } = require('../../logger.js');

// Define shorthandMap globally
const shorthandMap = {
	t: 'title',
	d: 'description',
	a: 'author',
	f: 'footer',
	m: 'message',
	th: 'thumbnail',
	img: 'imageUrl',
	f1n: 'field1Name',
	f1v: 'field1Value',
	f2n: 'field2Name',
	f2v: 'field2Value',
	// ... add f3n, f3v, and so on up to f10n, f10v
};

module.exports = {
	name: 'ce',
	description: 'custom embed builder',
	async execute(message, args) {
		try {
			if (cooldown.has(message.author.id)) {
				return message.reply('Wait 5 seconds before using this command again.');
			}

			const parsedArgs = parseArgs(args);
			const botMessage = parsedArgs.message;
			const color = Math.floor(Math.random() * 16777215);

			const embed = {
				title: parsedArgs.title,
				description: parsedArgs.description,
				author: parsedArgs.author ? { name: parsedArgs.author } : undefined,
				thumbnail: parsedArgs.thumbnail ? { url: parsedArgs.thumbnail } : undefined,
				image: parsedArgs.imageUrl ? { url: parsedArgs.imageUrl } : undefined,
				footer: parsedArgs.footer ? { text: parsedArgs.footer } : undefined,
				timestamp: new Date(),
				color: color,
				fields: createFields(parsedArgs),
			};

			message.delete().catch(console.error);
			await message.channel.send(botMessage, { embeds: [embed] });
			cooldown.add(message.author.id);
			setTimeout(() => {
				cooldown.delete(message.author.id);
			}, 5000);
			commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | CE | ' + message.channel.name + ' | ' + message.createdTimestamp);

			commandLogger.info('Parsed Args:', parsedArgs);
		} catch (error) {
			errorLogger.error(error);

			const color = Math.floor(Math.random() * 16777215);

			const errorEmbed = {
				title: 'Error',
				description: 'An error occurred. Please check your command syntax.',
				color: color,
				fields: Object.entries(shorthandMap).map(([key, value]) => ({ name: key, value, inline: true })),
			};

			message.channel.send({ embeds: [errorEmbed] });
		}
	},
};

function parseArgs(args) {
	const parsedArgs = {};

	for (let i = 2; i <= 10; i++) {
		shorthandMap[`f${i}n`] = `field${i}Name`;
		shorthandMap[`f${i}v`] = `field${i}Value`;
	}

	const regex = /-(\w+)(n|v)?\s+"([^"]+)"|-(\w+)(n|v)?\s+([^-\s]+)|-th\s+"([^"]+)"|-th\s+([^-\s]+)/g;

	let match;
	while ((match = regex.exec(args.join(' '))) !== null) {
		const key = shorthandMap[match[1] + (match[2] || '')] || match[1];
		const value = match[3] || match[6] || match[7];
		parsedArgs[key] = value;
	}

	return parsedArgs;
}

function createFields(parsedArgs) {
	const fields = [];

	for (let i = 1; i <= 10; i++) {
		const fieldNameKey = `field${i}Name`;
		const fieldValueKey = `field${i}Value`;

		const fieldName = parsedArgs[fieldNameKey];
		const fieldValue = parsedArgs[fieldValueKey];

		if (fieldName && fieldValue) {
			fields.push({
				name: fieldName,
				value: fieldValue,
				inline: true,
			});
		}
	}

	return fields;
}
*/
