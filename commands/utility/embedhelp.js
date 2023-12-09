/*
const cooldown = new Set();

module.exports = {
	name: 'embedhelp',
	description: 'Formatting for the embed builder',
	async execute(message) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 5 seconds before using this command again.');
		} else {
			try {
				message.delete().catch(console.error);

				const shorthandMap =
					'`-t`: title\n`-d`: description\n`-img`: image\n`-f`: footer\n`-a`: author\n`-th`: thumbnail\n`-f1n`: field one name\n`-f1v`: field one value\n`-f2n`: field two name\n`-f2v` field two value\n\nFields up to `-f10n | -f10v` are available.\n\n**Example:**\n`gg.ce -t "This is a title" -d "This is a description" -f "This is a footer" -a "This is an author" -img "https://cdn.discordapp.com/attachments/1175806653099167775/1181446934792257536/adventure-time.gif" -th "https://cdn.discordapp.com/attachments/1175806653099167775/1181446934792257536/adventure-time.gif" -f1n "This is field one name" -f1v æThis is field one value" -f2n "This is field two name" -f2v "This is field two value"`';

				const color = Math.floor(Math.random() * 16777215);

				message.delete().catch(console.error);

				const embed1 = {
					description: shorthandMap,
					color: color,
					footer: {
						text: 'Embed requested by ' + message.author.username,
					},
					thumbnail: {
						url: 'https://cdn.discordapp.com/attachments/1175806653099167775/1181446934792257536/adventure-time.gif',
					},
					timestamp: new Date(),
				};
				const embed2 = {
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
					fields: [
						{
							name: 'This is field one name',
							value: 'This is field one value',
						},
						{
							name: 'This is field two name',
							value: 'This is field two value',
						},
					],
					timestamp: new Date(),
				};

				message.channel.send({ embeds: [embed1, embed2] });
				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 5000);
				console.log(message.guild.name + ' | ' + message.author.username + ' | CEHELP | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				console.error(error);
				message.channel.send('Sorry, I was unable to list the commands.');
			}
		}
	},
};
*/
