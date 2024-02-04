module.exports = {
	name: '125k',
	description: 'the 125k raffle start',
	usage: ';125k',
	category: 'KR3W',
	async execute(message) {
		const embed = {
			title: '__**125K LIKES VBUCK RAFFLE IS OPEN**__',
			description: '## <a:checkycheck:1203258087213895680> OPEN TO **SUBSCRIBERS** ONLY!\n\n## <a:checkycheck:1203258087213895680> YOU MUST BE **ACTIVE** IN THE LIVE TO ENTER\n\n## <a:checkycheck:1203258087213895680> ENTRIES COUNT **AFTER** THE LINE HAS OPENED\n\n## <a:crossycross:1203258085406412810> ALL OTHERS AND DUPLICATES WILL BE **DELETED**\n\n## <a:crossycross:1203258085406412810> IF YOU HAVE WON IN THE LAST `14` DAYS YOU **CANNOT** ENTER THIS RAFFLE!',
		};
		message.channel
			.send({ embeds: [embed] })
			.then(() => message.delete())
			.catch(console.error);
	},
};
