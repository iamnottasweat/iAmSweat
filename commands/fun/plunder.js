const fs = require('fs').promises;
const path = require('path');
const gangFilePath = path.resolve(__dirname, '..', '..', 'databases', 'gang.json');
const logger = process.env.loggerPath;
const { commandLogger } = require(logger);

async function canPlunder(userId) {
	const data = await fs.readFile(gangFilePath, 'utf8');
	const gangData = JSON.parse(data);
	const now = new Date();
	const userData = gangData[userId];
	if (userData && userData.lastPlunder) {
		const lastPlunderTime = new Date(userData.lastPlunder);
		const timeDiff = now.getTime() - lastPlunderTime.getTime();
		const hoursSincePlunder = timeDiff / 1000 / 60 / 60;
		return hoursSincePlunder >= 4;
	}
	return true;
}

async function updatePlunderTime(userId) {
	const data = await fs.readFile(gangFilePath, 'utf8');
	const gangData = JSON.parse(data);
	gangData[userId] = {
		...gangData[userId],
		lastPlunder: new Date().toISOString(),
	};
	await fs.writeFile(gangFilePath, JSON.stringify(gangData, null, 4), 'utf8');
}

module.exports = {
	name: 'plunder',
	description: 'plunder some doubloons',
	async execute(message) {
		const userId = message.author.id;
		if (await canPlunder(userId)) {
			await updatePlunderTime(userId);
			message.channel.send('Ye have successfully plundered the seas for `200` doubloons! Come back in `4` hours to plunder for more booty.');
			const gangData = JSON.parse(await fs.readFile(gangFilePath, 'utf8'));
			gangData[userId].doubloons += 200;
			await fs.writeFile(gangFilePath, JSON.stringify(gangData, null, 4), 'utf8');

			message.delete().catch(console.error);
			commandLogger.info(`${message.guild.name} | ${message.author.username} | PLUNDER | ${message.channel.name} | ${message.createdTimestamp}`);
		} else {
			message.channel.send('Ye need to wait a bit longer before ye can plunder again, matey.');
		}
	},
};
