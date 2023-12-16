require('dotenv').config();
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});
const fs = require('fs');
const path = require('path');
const prefixes = ['gg.', ';'];
client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands').filter((folder) => {
	return fs.statSync(path.join('./commands', folder)).isDirectory();
});

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const handleMessages = require('./events/messageCreate.js');
handleMessages(client, prefixes);

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on(Events.Warn, (m) => console.warn(m));
client.on(Events.Error, (m) => console.error(m));

client.login(process.env.token);
