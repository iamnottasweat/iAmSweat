const color = Math.floor(Math.random() * 16777215);
const { commandLogger } = require('../../logger.js');

module.exports = {
	name: 'belt',
	description: 'returns the belt embed for the server roles',
	usage: ';belt',
	category: 'KR3W',
	cooldown: 30,
	execute(message) {
		const allowedRoleIds = process.env.krewRoleIds.split(', ');

		if (!allowedRoleIds.includes(message.member.roles.cache.first().id)) {
			return;
		}

		message.delete().catch(console.error);

		const embed = {
			description:
				`# __KR3WMATES!__\n\n### We want to incorporate new roles for everyone depending on how long you have been a sub for.\n\n` +
				`## 🤍 White belt: new members/followers\n` +
				`## 💛 Yellow belt: 1 full month\n` +
				`## 🧡 Orange belt: 2-3 months\n` +
				`## 💙 Blue belt: 4-5months\n` +
				`## 💚 Green belt: 6-7 months\n` +
				`## ❤️ Red belt: 8-9 months\n` +
				`## 🤎 Brown belt: 10-11 months\n` +
				`## 🖤 Black belt: 1 year\n\n\n` +
				`### Please react with the emojis below to choose your belt. You can check this by going to \`settings > live > manny_2_gunzz\`\n\n` +
				`### __Remember:__ we have a way of checking this so please be honest! How long you have been in the community does not matter, but we do want to give gratification and acknowledgment to those who have stuck with us for so long!\n\n` +
				`### Thank you for being here & we are excited to watch you get darker belts as the months go on! ❣️`,
			color: color,
			footer: { text: 'The 2Gunzz Mod Squad' },
			timestamp: new Date(),
			type: 'rich',
		};

		message.channel.send({ embeds: [embed] });

		commandLogger.info(`${message.guild.name} | ${message.author.username} | BELT | ${message.channel.name} | ${message.createdTimestamp}`);
	},
};
