const axios = require('axios');
//  = require('../../// .js');
const color = Math.floor(Math.random() * 16777215);
const gifArray1 = [
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181750602154389655/twisty-1.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181750602573824163/twisty-2.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181750603005829140/twisty-3.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181750603416879204/twisty-4.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181750603794358363/twisty-5.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181750604251545600/twisty-6.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181750604624830617/twisty-7.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1181750605002321991/twisty-8.gif',
];

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

const allowedUserIds = [process.env.twisty, process.env.sweat];

module.exports = {
	name: 'twisty',
	description: 'returns a random image of a twisty',
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
				const resp = await axios.get(`https://api.unsplash.com/photos/random?query=ice-cream&client_id=${process.env.accessKey}`);
				const icecream = resp.data.urls.small;
				const thumbnail = gifArray1[Math.floor(Math.random() * gifArray1.length)];

				message.delete().catch(console.error);

				const embed = {
					description: '# **TWISTY TWISTY TWISTY**\n# **TWISTY TWISTY TWISTY**\n# **TWISTY TWISTY TWISTY**\n',
					image: { url: icecream },
					thumbnail: { url: thumbnail },
					color: color,
					footer: { text: 'Use `gg.twisty` to get a new one!' },
					timestamp: new Date(),
				};
				// (message.guild.name + ' | ' + message.author.username + ' | TWISTY | ' + message.channel.name + ' | ' + message.createdTimestamp);

				message.channel.send({ embeds: [embed] });
			} catch (error) {
				// .error(error);
				message.channel.send('Sorry, I was unable to get a sunset/sunrise image.');
			}
		}
	},
};
