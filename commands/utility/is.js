const fs = require('fs').promises;
const path = require('path');
const alwaysIllegal = ['Buzz', 'Evie', 'Eimy', 'Lexi', 'Twisty', 'Vicki', 'Esther', 'Nicky', 'Manny', 'Frankie', 'Andy', 'Adrian', 'Erik', 'Deissy', 'Bam', 'Mel', 'Cody', 'Mike', 'Mikaroni', 'Abeka', 'Tom', 'Thomas', 'Renee', 'Mack', 'Pickelz', 'Nique', 'Rennie', 'Melissa'];
async function checkName(name) {
	const lowerCaseName = name.toLowerCase();
	if (alwaysIllegal.map((n) => n.toLowerCase()).includes(lowerCaseName)) {
		return true;
	}
	try {
		const data = await fs.readFile(path.join(__dirname, '../../../iAmSweat/databases/umg.json'), 'utf-8');
		const names = JSON.parse(data).map((storedName) => storedName.toLowerCase());
		return names.includes(lowerCaseName);
	} catch (error) {
		console.error('Error reading from the JSON file:', error);
		return false;
	}
}

module.exports = {
	name: 'is',
	description: 'Checks if a name is in the list',
	usage: ';is <name>',
	category: 'utility',
	cooldown: 0,
	execute(message, args) {
		if (args.length === 0) {
			return message.reply('Please provide a name to check.');
		}

		const nameToCheck = args.join(' ');
		checkName(nameToCheck).then((isInList) => {
			if (isInList) {
				message.reply(`${nameToCheck} is illegal.`);
			} else {
				message.reply(`${nameToCheck} is legal.`);
			}
		});
	},
};
