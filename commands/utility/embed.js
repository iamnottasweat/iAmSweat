const { command } = require('yargs');
const { commandLogger, errorLogger } = require('../../logger');

module.exports = {
	name: 'embed',
	description: 'Creates a custom embed with optional arguments',
	cooldown: 5,
	execute(message, args) {
		try {
			const argString = args.join(' ');

			const shorthandMap = {
				'-t': {
					pattern: /-t\s+"([^"]+)"/,
					embedProperty: 'title',
				},
				'-d': {
					pattern: /-d\s+"([^"]+)"/,
					embedProperty: 'description',
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

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | ${command} | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error('An error occurred while executing the embed command:', error);
			message.reply('An error occurred while executing the embed command. Please try again later.');
		}
	},
};
