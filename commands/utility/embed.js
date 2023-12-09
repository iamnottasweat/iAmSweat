const cooldown = new Set();
const { command } = require('yargs');
const { commandLogger, errorLogger } = require('../../logger');

module.exports = {
	name: 'embed',
	description: 'Creates a custom embed with optional arguments',
	execute(message, args) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 15 seconds before using this command again.');
			return;
		}

		try {
			const argString = args.join(' ');

			const shorthandMap = {
				'-t': {
					pattern: /-t\s+"([^"]+)"/,
					embedProperty: 'title',
					defaultValue: 'Default Title',
				},
				'-d': {
					pattern: /-d\s+"([^"]+)"/,
					embedProperty: 'description',
					defaultValue: 'Default Description',
				},
				'-c': {
					pattern: /-c\s+"(#[0-9A-Fa-f]{6})"/,
					embedProperty: 'color',
					defaultValue: '#00FFEA',
					postProcess: (value) => parseInt(value.replace('#', ''), 16),
				},
				'-f': {
					pattern: /-f\s+"([^"]+)"/,
					embedProperty: 'footer.text',
				},
				'-th': {
					pattern: /-th\s+"(https?:\/\/\S+)"/,
					embedProperty: 'thumbnail.url',
				},
				'-a': {
					pattern: /-a\s+"([^"]+)"/,
					embedProperty: 'author.name',
				},
				'-img': {
					pattern: /-img\s+"(https?:\/\/\S+)"/,
					embedProperty: 'image.url',
				},
			};

			const getValue = (shorthand) => {
				const match = argString.match(shorthand.pattern);
				return match ? match[1] : shorthand.defaultValue;
			};

			message.delete().catch(console.error);

			const embed = {
				timestamp: new Date(),
			};

			for (const shorthand in shorthandMap) {
				const shorthandDetails = shorthandMap[shorthand];
				const value = getValue(shorthandDetails);
				if (value !== shorthandDetails.defaultValue || shorthandDetails.embedProperty === 'color') {
					const propertyPath = shorthandDetails.embedProperty.split('.');
					let currentLevel = embed;

					while (propertyPath.length > 1) {
						const part = propertyPath.shift();
						currentLevel = currentLevel[part] = currentLevel[part] || {};
					}
					currentLevel[propertyPath[0]] = shorthandDetails.postProcess ? shorthandDetails.postProcess(value) : value;
				}
			}

			message.channel.send({ embeds: [embed] }).then(() => {
				const userIdToPing = process.env.buzz;
				return message.channel.send(`<@${userIdToPing}>`);
			});

			cooldown.add(message.author.id);
			setTimeout(() => {
				cooldown.delete(message.author.id);
			}, 15000);

			commandLogger.info(`${message.guild.name} | ${message.author.username} | ${command} | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error('An error occured while executing the ce command:', error);
			message.reply('An error occured while executing the ce command. Please try again later.');
		}
	},
};
