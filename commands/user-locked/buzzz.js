const axios = require('axios');
//  = require('../../// .js');
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

const allowedUserIds = [process.env.buzz, process.env.sweat];

module.exports = {
	name: 'buzzz',
	description: 'returns a random image of a tank',
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
				const resp = await axios.get(`https://api.unsplash.com/photos/random?query=war-tanks&client_id=${process.env.accessKey}`);
				const tanks = resp.data.urls.small;

				message.delete().catch(console.error);

				const embed = {
					image: { url: tanks },
					color: color,
				};
				// (message.guild.name + ' | ' + message.author.username + ' | BUZZ |' + message.channel.name + ' | ' + message.createdTimestamp);

				message.channel.send({ embeds: [embed] });
			} catch (error) {
				// .error(error);
				message.channel.send('Sorry, I was unable to get a tank image.');
			}
		}
	},
};
