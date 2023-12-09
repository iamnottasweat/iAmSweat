const cooldown = new Set();
const color = Math.floor(Math.random() * 16777215);
const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'help',
	description: 'lists the bot commands',
	execute(message, args) {
		if (cooldown.has(message.author.id)) {
			message.reply('Wait 3 seconds before using this command again.');
		} else {
			try {
				const categories = [
					{
						name: 'Utility',
						commands: [
							{
								name: '**gg.help**',
								value: 'Shows available command categories/commands',
								inline: false,
							},
							//							{
							//								name: '**gg.ce**',
							//								value: 'Custom embed builder. Use `gg.cehelp` for more info.',
							//								inline: false,
							//                            },
							//							{
							//								name: '**gg.cehelp**',
							//								value: 'Shows available arguments for use with `gg.ce`',
							//								inline: false,
							//							},
							{
								name: '**gg.dm**',
								value: 'DM a user. Usage: `gg.dm @user your_message_here`',
								inline: false,
							},
							{
								name: '**gg.hello**',
								value: "Shouldn't be listed but it is",
								inline: false,
							},
							{
								name: '**gg.hex**',
								value: 'Gives a random hex color',
								inline: false,
							},
							{
								name: '**gg.ping**',
								value: 'See the bots latency',
								inline: false,
							},
							{
								name: '**gg.gif**',
								value: 'Get a random gif',
								inline: false,
							},
						],
					},
					{
						name: 'Fun',
						commands: [
							{
								name: '**gg.affirmations**',
								value: 'Sends a random affirmation. Usage: `gg.affirmations @user`',
								inline: false,
							},
							{
								name: '**gg.chuck**',
								value: 'Random Chuck Norris snippets',
								inline: false,
							},
							{
								name: '**gg.hug**',
								value: 'Get/Give a hug from the bot. Usage: `gg.hug | gg.hug @user`',
								inline: false,
							},
							{
								name: '**gg.joke**',
								value: 'Sends a random joke',
								inline: false,
							},
							{
								name: '**gg.pineapple**',
								value: 'Find out for yourself.',
								inline: false,
							},
							{
								name: '**gg.punch**',
								value: 'Jaw-rock someone. Usage: `gg.punch @user`',
								inline: false,
							},
							{
								name: '**gg.quote**',
								value: 'Sends a random quote',
								inline: false,
							},
							{
								name: '**gg.roast**',
								value: 'Roast someone. Usage: `gg.roast | gg.roast @user`',
								inline: false,
							},
							{
								name: '**gg.trump**',
								value: 'Trump, Donald J.',
								inline: false,
							},
							{
								name: '**gg.yomama**',
								value: 'Sends a random Yo Momma joke. Usage: `gg.yomama | gg.yomama @user`',
								inline: false,
							},
						],
					},
					{
						name: 'Informational',
						commands: [
							{
								name: '**gg.apod**',
								value: 'Random Astronomy Picture of the Day',
								inline: false,
							},
							{
								name: '**gg.randapod**',
								value: 'Random Astronomy Picture of the Day',
								inline: false,
							},
							{
								name: '**gg.dogfact**',
								value: 'Random Dog Fact',
								inline: false,
							},
							{
								name: '**gg.define**',
								value: 'Define a word. Usage: `gg.define your_word_here`',
								inline: false,
							},
							{
								name: '**gg.nasa**',
								value: 'Random NASA Picture',
								inline: false,
							},
							{
								name: '**gg.weather**',
								value: 'Get weather info for a location. Usage: `gg.weather your_location_here`',
								inline: false,
							},
						],
					},
					{
						name: 'Text',
						commands: [
							{
								name: '**gg.base64**',
								value: 'Convert text to base64. Usage: `gg.base64 your_text_here`',
								inline: false,
							},
							{
								name: '**gg.binary**',
								value: 'Convert text to binary. Usage: `gg.binary your_text_here`',
								inline: false,
							},
							{
								name: '**gg.reverse**',
								value: 'Reverse text. Usage: `gg.reverse your_text_here`',
								inline: false,
							},
							{
								name: '**gg.leet**',
								value: 'Convert text to leet speak. Usage: `gg.leet your_text_here`',
								inline: false,
							},
							{
								name: '**gg.owo**',
								value: 'Convert text to OwO. Usage: `gg.owo your_text_here`',
								inline: false,
							},
						],
					},
					{
						name: 'Images',
						commands: [
							{
								name: '**gg.dog**',
								value: 'Random dog image',
								inline: false,
							},
							{
								name: '**gg.pikapika**',
								value: 'Pikachu!',
								inline: false,
							},
							{
								name: '**gg.img**',
								value: 'Sends an image. Usage: `gg.img your_query_here`',
								inline: false,
							},
						],
					},
				];

				if (args.length === 0) {
					const availableCategories = categories.map((category) => `\`${category.name}\``).join(', ');
					const helpMessage = `__**Usage**__\n\n\`gg.help category_name\`\n\n__**Available Categories**__\n\n${availableCategories}`;

					const helpEmbed = {
						description: helpMessage,
						color: color,
						footer: {
							text: 'Requested by ' + message.author.username,
							icon_url: message.author.displayAvatarURL({
								dynamic: true,
							}),
						},
						author: {
							name: message.author.username,
							icon_url: message.author.displayAvatarURL({
								dynamic: true,
							}),
						},
						timestamp: new Date(),
						image: {
							url: 'https://media.discordapp.net/attachments/1175806653099167775/1178531508651294771/image.png',
						},
					};

					message.channel.send({ embeds: [helpEmbed] });

					cooldown.add(message.author.id);
					setTimeout(() => {
						cooldown.delete(message.author.id);
					}, 3000);
				} else {
					const category = categories.find((cat) => cat.name.toLowerCase() === args.join(' ').toLowerCase());

					message.delete().catch(console.error);

					if (category) {
						const embed = {
							color: '16711935',
							footer: {
								text: 'Requested by ' + message.author.username,
								icon_url: message.author.displayAvatarURL({
									dynamic: true,
								}),
							},
							author: {
								name: message.author.username,
								icon_url: message.author.displayAvatarURL({
									dynamic: true,
								}),
							},
							fields: category.commands,
							timestamp: new Date(),
							image: {
								url: 'https://media.discordapp.net/attachments/1175806653099167775/1178531508651294771/image.png',
							},
						};

						message.channel.send({ embeds: [embed] });
					} else {
						console.log('Invalid category. Provided:', args[0]);
						message.reply('Invalid category. Please provide a valid category.');
					}
				}

				cooldown.add(message.author.id);
				setTimeout(() => {
					cooldown.delete(message.author.id);
				}, 3000);
				commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | HELP | ' + message.channel.name + ' | ' + message.createdTimestamp);
			} catch (error) {
				errorLogger.error(error);
				message.channel.send('Sorry, I encountered an error. '`${error.message}`, 'Try again later.');
			}
		}
	},
};
