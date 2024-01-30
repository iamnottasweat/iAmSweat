module.exports = {
	name: '125k',
	description: 'the 125k raffle start',
	async execute(message) {
		const embed = {
			description: "# __START OF THE SUBSCRIBER'S-ONLY ITEM SHOP RAFFLE__\n## • YOU MUST BE __**ACTIVE**__ IN THE LIVE TO ENTER\n## • ENTRIES COUNT __**AFTER**__ THE LINE HAS OPENED - ALL OTHERS AND DUPLICATES WILL BE __**DELETED**__\n## ***IF YOU HAVE WON IN THE LAST 14 DAYS YOU __CANNOT__ ENTER THIS RAFFLE!***",
		};
		message.channel
			.send({ embeds: [embed] })
			.then(() => message.delete())
			.catch(console.error);
	},
};
