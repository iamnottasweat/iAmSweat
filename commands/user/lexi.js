const axios = require('axios');
const { errorLogger, commandLogger } = require('../../logger.js');
const color = Math.floor(Math.random() * 16777215);

let commandUsage = {
	count: 0,
	timestamp: Date.now(),
};

setInterval(() => {
	commandUsage = {
		count: 0,
		timestamp: Date.now(),
	};
}, 3600000);

const allowedUserIds = [process.env.otter, process.env.sweat];

module.exports = {
	name: 'lexi',
	description: 'returns a random image of an otter',
	usage: ';lexi',
	category: 'user-locked',
	cooldown: 5,
	async execute(message) {
		if (!allowedUserIds.includes(message.author.id)) {
			message.reply('Sorry, this command is not for you.');
			return;
		}

		const currentTimestamp = Date.now();
		if (currentTimestamp - commandUsage.timestamp < 3600000 && commandUsage.count >= 10) {
			message.reply('This command has been used 10 times in the last hour. Please wait for a while before using it again.');
		} else {
			if (currentTimestamp - commandUsage.timestamp >= 3600000) {
				commandUsage = {
					count: 1,
					timestamp: Date.now(),
				};
			} else {
				commandUsage.count++;
			}

			try {
				const resp = await axios.get(`https://api.unsplash.com/photos/random?query=otter&client_id=${process.env.accessKey}`);
				const otter = resp.data.urls.small;

				message.delete().catch(console.error);

				const embed = {
					image: { url: otter },
					color: color,
					footer: {
						text: 'I bust muscles open on my belly and eat them.',
					},
					timestamp: new Date(),
				};

				message.channel.send({ embeds: [embed] });
				commandLogger.info(`${message.guild.name} | ${message.author.username} | LEXI | ${message.channel.name} | ${message.createdTimestamp}`);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, I was unable to get an otter image.');
			}
		}
	},
};
