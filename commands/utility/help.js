module.exports = {
	name: 'help',
	description: 'lists all available commands',
	cooldown: 30,
	execute(message) {
		const embeds = [];
		const categories = {
			'Utility': ['dm', 'echo', 'embed', 'embedhelp', 'gang', 'gif', 'hello', 'help', 'hex', 'ping', 'vote'],
			'Text Manipulators': ['base64', 'binary', 'leet', 'mock', 'owo', 'reverse'],
			'Informational': ['apod', 'define', 'dogfact', 'nasa', 'randapod', 'weather'],
			'Image Creators': ['dog', 'doggos', 'img', 'pikapika'],
			'Fun': ['affirmations', 'boo', 'chuck', 'hug', 'joke', 'pineapple', 'punch', 'quote', 'roast', 'rps', 'trump', 'yomama'],
		};

		Object.keys(categories).forEach((category) => {
			const commands = categories[category].map((command) => `### ➢ ${command}`).join('\n');
			const embed = {
				title: `${category} Commands`,
				description: commands,
				color: Math.floor(Math.random() * 16777215),
				timestamp: new Date(),
			};
			embeds.push({ embeds: [embed] });
		});
		let currentPage = 0;

		message.channel.send(embeds[currentPage]).then((msg) => {
			msg.react('◀️');
			msg.react('▶️');

			const filter = (reaction, user) => {
				return ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === message.author.id;
			};

			const collector = msg.createReactionCollector(filter, { time: 60000 });
			collector.on('collect', (reaction) => {
				reaction.users.remove(message.author);
				if (reaction.emoji.name === '▶️') {
					currentPage = (currentPage + 1) % embeds.length;
				} else if (reaction.emoji.name === '◀️') {
					currentPage = (currentPage - 1 + embeds.length) % embeds.length;
				}
				msg.edit(embeds[currentPage]);
			});
			collector.on('end', () => {
				msg.reactions.removeAll().catch((error) => console.error('Failed to clear reactions: ', error));
			});
		});
	},
};
/*
const color = Math.floor(Math.random() * 16777215);
const { errorLogger, commandLogger } = require('../../logger.js');

module.exports = {
	name: 'help',
	description: 'lists the bot commands',
	cooldown: 5,
	execute(message, args) {
		try {
			const categories = [
				{
					name: 'Utility',
					commands: [
						{
							name: '`;help`',
							value: '**Shows available command categories/commands**',
							inline: false,
						},
						{
							name: '`;embed`',
							value: '**Custom embed builder. Use** `;embedhelp` for more info.',
							inline: false,
						},
						{
							name: '`;embedhelp`',
							value: '**Shows available arguments for use with** `;embed`',
							inline: false,
						},
						{
							name: '`;dm`',
							value: '**DM a user. Usage:** `;dm @user your_message_here`',
							inline: false,
						},
						{
							name: ';echo',
							value: 'Echoes a message to send to a channel.',
							inline: false,
						},
						{
							name: '`;hello`',
							value: "**Shouldn't be listed but it is**",
							inline: false,
						},
						{
							name: '`;hex`',
							value: '**Gives a random hex color**',
							inline: false,
						},
						{
							name: '`;ping`',
							value: '**See the bots latency**',
							inline: false,
						},
						{
							name: '`;gif`',
							value: '**Get a random gif. There is not a large variety but there are GIFs.**',
							inline: false,
						},
					],
				},
				{
					name: 'Fun',
					commands: [
						{
							name: '`;affirmations`',
							value: '**Sends a random affirmation. Usage:** `;affirmations @user`',
							inline: false,
						},
						{
							name: '`;chuck`',
							value: '**Random Chuck Norris snippets**',
							inline: false,
						},
						{
							name: '`;hug`',
							value: '**Get/Give a hug from the bot. Usage:** `;hug | ;hug @user`',
							inline: false,
						},
						{
							name: '`;joke`',
							value: '**Sends a random joke**',
							inline: false,
						},
						{
							name: '`;pineapple`',
							value: '**Find out for yourself.**',
							inline: false,
						},
						{
							name: '`;punch`',
							value: '**Jaw-rock someone. Usage:** `;punch | ;punch @user`',
							inline: false,
						},
						{
							name: '`;quote`',
							value: '**Sends a random quote**',
							inline: false,
						},
						{
							name: '`;roast`',
							value: '**Roast someone. Usage:** `;roast | ;roast @user`',
							inline: false,
						},
						{
							name: '`;trump`',
							value: '**Trump, Donald J.**',
							inline: false,
						},
						{
							name: '`;yomama`',
							value: '**Sends a random Yo Momma joke. Usage:** `;yomama | ;yomama @user`',
							inline: false,
						},
						{
							name: 'boo',
							value: "let them know they're buns",
							inline: false,
						},
					],
				},
				{
					name: 'Informational',
					commands: [
						{
							name: '`;apod`',
							value: '**Random Astronomy Picture of the Day**',
							inline: false,
						},
						{
							name: '`;randapod`',
							value: '**Random Astronomy Picture of the Day**',
							inline: false,
						},
						{
							name: '`;dogfact`',
							value: '**Random Dog Fact**',
							inline: false,
						},
						{
							name: '`;define`',
							value: '**Define a word. Usage:** `;define your_word_here`',
							inline: false,
						},
						{
							name: '`;nasa`',
							value: '**Random NASA Picture**',
							inline: false,
						},
						{
							name: '`;weather`',
							value: '**Get weather info for a location. Usage:** `;weather your_location_here`',
							inline: false,
						},
					],
				},
				{
					name: 'Text',
					commands: [
						{
							name: '`;base64`',
							value: '**Convert text to base64. Usage:** `;base64 your_text_here`',
							inline: false,
						},
						{
							name: '`;binary`',
							value: '**Convert text to binary. Usage:** `;binary your_text_here`',
							inline: false,
						},
						{
							name: '`;reverse`',
							value: '**Reverse text. Usage:** `;reverse your_text_here`',
							inline: false,
						},
						{
							name: '`;leet`',
							value: '**Convert text to leet speak. Usage:** `;leet your_text_here`',
							inline: false,
						},
						{
							name: '`;owo`',
							value: '**Convert text to OwO. Usage:** `;owo your_text_here`',
							inline: false,
						},
					],
				},
				{
					name: 'Images',
					commands: [
						{
							name: '`;dog`',
							value: '**Random dog image**',
							inline: false,
						},
						{
							name: '`;pikapika`',
							value: '**Pikachu!**',
							inline: false,
						},
						{
							name: '`;img`',
							value: '**Sends an image. Usage:** `;img your_query_here`',
							inline: false,
						},
						{
							name: ';doggos',
							description: 'Get eight images of my doggos.',
							inline: false,
						},
					],
				},
			];

			if (args.length === 0) {
				const availableCategories = categories.map((category) => `\`${category.name}\``).join(', ');
				const helpMessage = `__**Usage**__\n\n\`;help category_name\`\n\n__**Available Categories**__\n\n${availableCategories}`;

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
				};

				message.channel.send({ embeds: [helpEmbed] });
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
					};

					message.channel.send({ embeds: [embed] });
				} else {
					console.log('Invalid category. Provided:', args[0]);
					message.reply('Invalid category. Please provide a valid category.');
				}
			}
			commandLogger.info(`${message.guild.name} | ${message.author.username} | HELP | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I encountered an error. '`${error.message}`, 'Try again later.');
		}
	},
};
*/
