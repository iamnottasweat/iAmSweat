const color = Math.floor(Math.random() * 16777215);

module.exports = {
	name: 'pokehelp',
	description: 'lists all available pokétwo commands',
	usage: ';pokehelp',
	category: 'KR3W',
	cooldown: 30,
	execute(message) {
		const embed = {
			title: 'Pokétwo Commands',
			description: 'List of commands for the Pokétwo bot',
			color: color,
			fields: [
				{
					name: '<:pokeball1:1204091810545143878> Battling',
					value:
						'- `@Pokétwo battle <user>`: Battle another trainer with your Pokémon!\n' +
						'- `@Pokétwo learn <search>`: Learn moves for your Pokémon to use in battle.\n' +
						'- `@Pokétwo learnset [args]`: View all Pokémon (including forms) that learn a particular move, or any move if move-name is empty.\n' +
						'- `@Pokétwo moveinfo <search>`: View information about a certain move.\n' +
						'- `@Pokétwo moves <pokemon>`: View current and available moves for your Pokémon.\n' +
						'- `@Pokétwo moveset <search>`: View all moves for your Pokémon and how to get them.\n',
				},
				{
					name: '<:pokeball1:1204091810545143878> Basic Bot Operations',
					value:
						"- `@Pokétwo cleanup [search=100]`: Cleans up the bot's messages from the channel.\n" +
						'- `@Pokétwo donate`: Donate to receive shards.\n' +
						'- `@Pokétwo invite`: View the invite link for the bot.\n' +
						'- `@Pokétwo pick `: Pick a starter Pokémon to get started.\n' +
						"- `@Pokétwo ping`: View the bot's latency.\n" +
						'- `@Pokétwo profile`: View your profile.\n' +
						'- `@Pokétwo start`: View the starter Pokémon.\n' +
						'- `@Pokétwo stats`: View bot info.\n' +
						'- `@Pokétwo vote`: View information on voting rewards.\n',
				},
				{
					name: '<:pokeball1:1204091810545143878> Configuration',
					value: '- `@Pokétwo redirect [channels]`: Redirect Pokémon catches to one or more channels.\n' + '- `@Pokétwo serversilence`: Silence level up messages server-wide.\n' + '- `@Pokétwo silence`: Silence level up messages for yourself.\n',
				},
				{
					name: '<:pokeball1:1204091810545143878> Market',
					value: '- `@Pokétwo market <flags>`: Buy or sell Pokémon on the Pokétwo marketplace.\n',
				},
				{
					name: '<:pokeball1:1204091810545143878> Trade',
					value: '- `@Pokétwo trade <user>`: Trade Pokémon with another trainer.\n' + '- `@Pokétwo trade add [args]`: Add Pokémon to a trade.\n' + '- `@Pokétwo trade addall [args]`: Add multiple Pokémon to a trade.\n' + '- `@Pokétwo trade cancel`: Cancel a trade.\n' + '- `@Pokétwo trade confirm`: Confirm a trade.\n' + '- `@Pokétwo trade info <number>`: View a Pokémon from the trade.\n' + '- `@Pokétwo trade remove [args]`: Remove Pokémon from a trade.\n',
				},
				{
					name: '<:pokeball1:1204091810545143878> Pokémon',
					value:
						'- `@Pokétwo evolve [args]…`: Evolve a Pokémon if it has reached the target level.\n' +
						'- `@Pokétwo favorite [args]…`: Mark a Pokémon as a favorite.\n' +
						'- `@Pokétwo favoriteall [args…]`: Mass favorite selected Pokémon.\n' +
						'- `@Pokétwo info `: View a specific Pokémon from your collection.\n' +
						'- `@Pokétwo nickname [pokemon=False] [nickname…]`: Change the nickname for your Pokémon.\n' +
						'- `@Pokétwo nickall [args…]`: Mass nickname Pokémon from your collection.\n' +
						'- `@Pokétwo order [sort]`: Change how your Pokémon are ordered.\n' +
						'- `@Pokétwo pokedex [args…]`: View your Pokédex, or search for a Pokémon species.\n',
				},
				{
					name: '<:pokeball1:1204091810545143878> Pokémon Cont.',
					value:
						'- `@Pokétwo pokemon [args…]`: View or filter the Pokémon in your collection.\n' +
						'- `@Pokétwo reindex`: Re-number all Pokémon in your collection.\n' +
						'- `@Pokétwo release [args]…`: Release Pokémon from your collection for 2 PC each.\n' +
						'- `@Pokétwo releaseall [args…]`: Mass release Pokémon from your collection for 2 PC each.\n' +
						'- `@Pokétwo select `: Select a specific Pokémon from your collection.\n' +
						'- `@Pokétwo unfavorite [args]…`: Unfavorite a selected Pokémon.\n' +
						'- `@Pokétwo unfavoriteall [args…]`: Mass unfavorite selected Pokémon.\n' +
						'- `@Pokétwo unmega `: Switch a Pokémon back to its non-mega form.\n',
				},
				{
					name: '<:pokeball1:1204091810545143878> Quests',
					value: '- `@Pokétwo quests`: View quests.\n' + '- `@Pokétwo [quests|q]`: Signature command.\n',
				},
				{
					name: '<:pokeball1:1204091810545143878> Spawning',
					value: '- `@Pokétwo catch <guess>`: Catch a wild Pokémon.\n' + '- `@Pokétwo hint`: Get a hint for the wild Pokémon.\n' + '- `@Pokétwo shinyhunt [species=None]`: Hunt for a shiny Pokémon species.\n' + '- `@Pokétwo togglemention`: Toggle getting mentioned when catching a Pokémon.\n',
				},
			],
			timestamp: new Date(),
			footer: {
				text: 'Use these commands to interact with the Pokétwo bot',
			},
		};
		message.channel.send({ embeds: [embed] });
	},
};
