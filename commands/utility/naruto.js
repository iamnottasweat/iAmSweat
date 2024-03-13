const { errorLogger } = require('../../logger.js');

module.exports = {
	name: 'naruto',
	description: 'renders naruto botto commands',
	usage: ';naruto',
	category: 'Utility',
	cooldown: 60,
	execute(message) {
		try {
			const embed1 = {
				description:
					'### Start and Income\n\
        `n start` - Creates your account to begin the ninja road!\n\
        `n guide` - Sends a basic introduction about how to play.\n\
        `n mission` - Sends your team on a mission. You get paid for missions.\n\
        `n report` - Fills the report. Extra rewards.\n\
        `n tower` - Defeat powerful enemies and climb as high as possible!\n\
        `n challenge @user` - Challenge another player with your powerful array!\n\
        `n daily` - Claims daily reward of ryō and special tickets.\n\
        `n weekly` - Claims weekly reward of ryō and special tickets.\n\
        `n quests` - Shows list of all your quests.\n\
        `n quests claim` - Claims claimable quests.',
			};

			const embed2 = {
				description:
					'### Stats and Info\n\n\
        `n list <possible filter> <possible page>` - Shows a gallery of your ninjas.\n\
        `n all <possible filter> <possible page>` - Shows all obtainable ninjas.\n\
        `n profile` - Shows your statistics and items.\n\
        `n cooldown` - Shows cooldowns for all activities.\n\
        `n ready` - Shows all available activities.\n\
        `n inventory` - Shows all your items and their availability.',
			};

			const embed3 = {
				description:
					'### Team Management\n\
        `n pull` - Recruits a random ninja for 300 ryō.\n\
        `n pull <quantity>` to perform a multi-pull (premium or 100+ owned ninjas).\n\
        `n pull special` - recruit a top tier ninja for 500 special tickets.\n\
        `n team` - Shows your current team.\n\
        `n team add <id>` - Adds a ninja into your team.\n\
        `n team add <id,id...>` to add more ninjas at once. (premium feature)\n\
        `n team remove <id>` - Removes a ninja from your team.\n\
        `n team remove <id,id...>` to remove more ninjas at once. (premium feature)',
			};

			const embed4 = {
				description:
					'### Shopping\n\
        `n shop` - Opens gear shop.\n\
        `n shop event` - Opens event shop.\n\
        `n buy <item name> <possible quantity>` - Performs a purchase transaction.\n\
        `n sell <item name> <possible quantity>` - Performs a sell transaction.\n\
        `n equip <ninja ID> <item name>` - Equips the item on specific ninja.\n\
        `n unequip <ninja ID>` - Unequips the item from specific ninja.',
			};

			const embed5 = {
				description:
					'### Other\n\n\
        `n vote` - Renders a vote link (vote for special tickets ^^).\n\
        `n top <weekly> <filter>` - Shows leaderboard of the best weekly players. Replace filter with missions.\n\
        `n top <filter>` - Shows leaderboard of the best players. Replace filter with fame/missions/power/success/characters/votes/challenges/tower/reports/yo.',
			};

			message.channel.send({ embeds: [embed1, embed2, embed3, embed4, embed5] });
		} catch (error) {
			errorLogger.error(error);
		}
	},
};
