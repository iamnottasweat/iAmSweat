const cooldown = new Set();
const { errorLogger, commandLogger } = require('../../logger.js');

const gifArray1 = [
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180852862834720799/jake-shiny.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180852863291887627/pat-slap.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180852863858130954/roasted-oh.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180852864457904220/shiny-krabs.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180852865078657124/statsgif.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180852866169176074/statsgif2.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180852866613788773/statsgif3.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180852867083538513/statsgif4.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180852867557490688/statsgif5.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853098634285076/statsgif6.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853099099848704/statsgif7.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853099498311770/statsgif8.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853099984846949/statsgif9.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853100370726932/statsgif10.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853100752412783/statsgif11.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853101444464731/statsgif12.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853101838733362/statsgif13.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853102354636870/statsgif14.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853102753087508/statsgif15.gif',
];

const gifArray2 = [
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853211914047508/statsgif16.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853212518023219/statsgif17.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853212853575741/statsgif18.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853213310750800/statsgif19.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853213797294080/statsgif20.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853214199943320/statsgif21.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853214590009374/statsgif23.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853215043002430/statsgif24.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853215454040125/statsgif25.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853215827329034/statsgif26.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853315442053130/statsgif27.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853315832139776/statsgif28.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853316209614889/statsgif29.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180853316624846908/statsgif30.gif',
	'https://cdn.discordapp.com/attachments/1159353644785881100/1180618954323017868/eevee-eevee-wow.gif',
	'https://media.discordapp.net/attachments/1175806653099167775/1179194258801041429/gun-fight.gif',
];

module.exports = {
	name: 'gif',
	description: 'Get a gif',
	async execute(message) {
		try {
			if (cooldown.has(message.author.id)) {
				return message.reply('Wait 5 seconds before using this command again.');
			}
			const image = gifArray1[Math.floor(Math.random() * gifArray1.length)] || gifArray2[Math.floor(Math.random() * gifArray2.length)];

			const color = Math.floor(Math.random() * 16777215);

			const embed = {
				timestamp: new Date(),
				image: { url: image },
				color: color,
			};

			await message.delete().catch(console.error);
			await message.channel.send({ embeds: [embed] });
			cooldown.add(message.author.id);
			setTimeout(() => {
				cooldown.delete(message.author.id);
			}, 5000);
			commandLogger.info(message.guild.name + ' | ' + message.author.username + ' | TESTGIF | ' + message.channel.name + ' | ' + message.createdTimestamp);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry.');
		}
	},
};
