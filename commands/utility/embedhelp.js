const cooldown = new Set();
const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'embedhelp',
	description: 'Formatting for the embed builder',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			try {
				message.delete().catch(console.error);
				const shorthandMap = '```js\n-t = "title"\n-d = "description"\n-img = "imageURL"\n-th = "thumbnailURL"\n-f = "footer"\n-a = "author"\n```';
				const example1 = '```js\ngg.embed -t "This is a title" -d "This is a description" -f "This is a footer" -img "my_image_URL" -th "my_image_URL"\n```';
				const exampleURL = '```fix\nhttps://cdn.discordapp.com/attachments/1184198610578059364/1184213442345832598/IMG_2368.png\n```';
				const color = Math.floor(Math.random() * 16777215);
				const userMention = `I'm happy to help you, <@${message.author.id}>\nUse any combination of the options, but always at minimum have either a description or an image.\nThe following embed is made using ${example1}\nThese are the available options to use:\n${shorthandMap}\nHere is a URL you can use for testing:\n${exampleURL}`;
				const embed = {
					title: 'This is a title',
					description: 'This is a description',
					color: color,
					thumbnail: {
						url: 'https://cdn.discordapp.com/attachments/1175806653099167775/1181446934792257536/adventure-time.gif',
					},
					image: {
						url: 'https://cdn.discordapp.com/attachments/1175806653099167775/1181446934792257536/adventure-time.gif',
					},
					footer: {
						text: 'This is a footer',
					},
					timestamp: new Date(),
				};
				await message.channel.send({ embeds: [embed], content: userMention });

				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				commandLogger.info(`${message.guild.name} | ${message.author.username} | EMBEDHELP | ${message.channel.name} | ${message.createdTimestamp}`);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, I was unable to help :(');
			}
		}
	},
};
