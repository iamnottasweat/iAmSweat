module.exports = {
	name: '75k',
	description: 'the 75k raffle start',
	usage: ';75k',
	category: 'KR3W',
	async execute(message) {
		const allowedRoleIDs = ['1088145611532021760', '1123669806068023406', '1123687483574587594', '1088145393050726492', '1088541292402843668', '1184008427463245874'];

		if (message.member.roles.cache.some((role) => allowedRoleIDs.includes(role.id))) {
			const embed = {
				title: '**__75K LIKES VBUCK RAFFLE IS OPEN__**',
				description:
					'## <a:checkycheck:1203258087213895680> OPEN TO **EVERYONE**!\n\n## <a:checkycheck:1203258087213895680> YOU MUST BE **FOLLOWING** MANNY ON TIKTOK\n\n## <a:checkycheck:1203258087213895680> YOU MUST BE **ACTIVE** IN THE LIVE TO ENTER\n\n## <a:checkycheck:1203258087213895680> ENTRIES COUNT **AFTER** THE LINE HAS OPENED\n\n## <a:crossycross:1203258085406412810> ALL OTHERS AND DUPLICATES WILL BE **DELETED**\n\n## <a:crossycross:1203258085406412810> IF YOU HAVE WON IN THE LAST `14` DAYS YOU **CANNOT** ENTER THIS RAFFLE!',
			};
			message.channel
				.send({ embeds: [embed] })
				.then(() => message.delete())
				.catch(console.error);
		} else {
			message.delete();
			message.channel.send(`\`${message.author.tag}\`: You are not allowed to use this command.`);
		}
	},
};
