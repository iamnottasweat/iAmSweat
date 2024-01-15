const functions = process.env.gangFunctionsPath;
const { getUserDoubloons, updateUserDoubloons } = require(functions);
const logger = process.env.loggerPath;
const { commandLogger } = require(logger);
// const cooldown = new Set();
/*
let responses = [
	'1. Animals that lay eggs don\\’t have belly buttons.',
	'2. Mr. Potato Head was the first toy to be advertised on TV.',
	'3. Boanthropy is the psychological disorder in which patients believe they are a cow.',
	'4. Camels have three eyelids.',
	"5. There is a Mcdonald's on every continent except Antarctica.",
	'6. Mosquitoes are attracted to people who just ate bananas.',
	'7. In South Korea, there is an emergency number to report suspected spies (it\\’s 113!)',
	'8. Cats can make more than 100 vocalizations.',
	'9. Sonic the Hedgehog\\’s full name is Ogilvie Maurice Hedgehog.',
	'10. The world\\’s termites outweigh the world\\’s humans about 10 to 1.',
	'11. Most toilet paper sold in France is pink.',
	'12. The Hawaiian alphabet only has 12 letters.',
	'13. The human nose can remember 50,000 different scents.',
	'14. Children tend to grow faster in the spring.',
	'15. Sliced bread was invented a year after the invention of TV.',
	'16. If you keep a goldfish in a dark room, it will eventually turn white.',
	'17. Bullfrogs do not sleep.',
	'18. A snail breathes through its foot.',
	'19. Fish cough.',
	'20. It took the creator of the Rubik\\’s Cube one month to solve the cube after he created it.',
	'21. Japanese square watermelons aren\\’t edible. They are purely ornamental!',
	'22. An ant\\’s sense of smell is stronger than a dog\\’s.',
	'23. Tigers have striped skin, not just striped fur. The stripes are like fingerprints—no two tigers have the same pattern.',
	'24. Elephants are the only mammal that can\\’t jump.',
	'25. Alligators will give manatees the right of way if they are swimming near each other.',
	'26. Canned baked beans aren\\’t baked, but stewed.',
	'27. Despite its hump, camels have straight spines.',
	'28. Sunsets on Mars are blue.',
	'29. Digging a hole to China is actually possible if you start in Argentina.',
	'30. Mosquitoes have 47 teeth.',
	'31. A quarter of the bones in your body are in your feet.',
	'32. Brain waves can be used to power an electric train.',
	'33. The Boston Marathon didn\\’t allow female runners until 1972.',
	'34. Pigs can get sunburned.',
	'35. A one-day weather forecast requires about 10 billion math calculations.',
	'36. “Bluetooth” technology was named after a 10th-century king, King Harald "Bluetooth" Gormsson. He united Denmark and Norway, just like the technology united computers and cell phones.',
	'37. There are 19 different animal shapes in the animal cracker zoo.',
	'38. Hart Island is the final burial place for over a million of New York City\\’s unclaimed bodies.',
	'39. There\\’s a river called “Big Ugly Creek” in West Virginia.',
	'40. You share your birthday with at least 9 million other people in the world.',
	'41. No piece of A4 paper can be folded more than 7 times.',
	'42. In Slovakia, they have Christmas carp that live in the bathtub for a few days before they are eaten.',
	'43. There are 119 grooves on a quarter.',
	'44. The state of Ohio gives out different colored license plates for those with a DUI conviction.',
	'45. People don\\’t sneeze in their sleep due to their brain shutting down the reflex.',
	'46. Alaska has more caribou than people.',
	'47. Oysters can change from one gender to another (and back again).',
	'48. Dead people can get goosebumps.',
	'49. The Mona Lisa has no eyebrows.',
	'50. A ten-gallon hat holds less than one gallon of liquid.',
	'51. The average raindrop falls at 7 mph.',
	'52. Guy Fawkes is the reason men are called “guys.”',
	'53. Lizards communicate by doing push-ups.',
	'54. A giant squid has eyes the size of a volleyball.',
	'55. The average American will eat 35,000 cookies in their lifetime.',
	'56. Banks have therapists known as "wealth psychologists" who help clients who are unable to mentally cope with their immense wealth.',
	'57. Dogs have been banned from Antarctica since April 1994 out of concern that dogs might spread diseases to seals.',
	'58. Smelling apples or bananas can help you lose weight.',
	'59. In 1998, more than 50% of Iceland\\’s population believed in the existence of elves.',
	'60. The hummingbird is the only bird that can fly backward.',
	'61. Beavers were once the size of bears.',
	'62. A pigeon\\’s feathers weigh more than their bones.',
	'63. A crocodile can\\’t move its tongue.',
	'64. Honeybees navigate using the sun as their compass.',
	'65. If you sneeze traveling 60 mph, your eyes are closed for an average of 50 feet.',
	'66. Hawaii is the only state to grow coffee commercially.',
	'67. The square dance is the official state dance of Washington.',
	'68. When dinosaurs roamed the earth, volcanos were erupting on the moon.',
	"69. The only letters that don't appear on the periodic table are J and Q.",
	'70. A single strand of spaghetti is called a “spaghetto.”',
	'71. At birth, a baby panda is smaller than a mouse.',
	'72. In 1923, a jockey suffered a fatal heart attack mid-race. His horse finished and won the race, making him the first and only jockey to win a race after death.',
	'73. In order to protect themselves from poachers, African elephants have been evolving without tusks.',
	'74. In order to keep Nazis away, a Polish doctor faked a typhus outbreak that saved more than 8,000 people.',
	'75. The spiked dog collar was invented by the ancient Greeks to protect their dogs from wolf attacks.',
	'76. German chocolate cake is named after an American baker named Samuel German.',
	'77. During World War II, Germany planned to collapse the British economy by dropping millions of counterfeit bills over London.',
	'78. The youngest pope in history was Pope Benedict IX. He is also the only person to have been the pope more than once.',
	'79. The tallest man in recorded history was 8\\’11.',
	'80. IKEA is an acronym that stands for Ingvar Kamprad Elmtaryd Agunnaryd: the founder\\’s name, the farm where he grew up, and his hometown.',
	'81. There is a town in Nebraska called Monowi with a population of one. The only resident is a woman who serves as mayor, bartender, and librarian.',
	'82. The unique smell of rain actually comes from plant oils, bacteria, and ozone.',
	"83. Vanilla flavoring is sometimes made with a liquid secreted from beavers' castor glands.",
	'84. The oldest unopened bottle of wine was found in a Roman tomb was is more than 1,650 years old.',
	'85. In 2016, Domino\\’s tested pizza delivery via reindeer in Japan.',
	'86. Helen Keller is related to Robert E. Lee—her paternal grandfather was his second cousin.',
	'87. Starfish don\\’t have blood. They circulate nutrients by using seawater in their vascular system.',
	'88. Adult cats only meow at humans, not other cats.',
	'89. Video games have been found to be more effective at battling depression than some kinds of therapy.',
	"90. It's a common belief in Russia that eating ice cream will keep you warm.",
	'91. Underneath the streets of Beijing, there is around a million people who live in nuclear bunkers.',
	'92. A study from Harvard University finds that having no friends can be just as deadly as smoking. Both affect levels of a blood-clotting protein.',
	'93. All new FBI special agents and intelligence analysts are required to visit the United States Holocaust Memorial Museum.',
	'94. Garlic is known to attract leeches.',
	'95. New York City mob boss Vincent Gigante used to avoid arrest by wandering around in his bathrobe to convince the police he was insane.',
	'96. Bubble wrap was originally invented to be a kind of plastic wallpaper.',
	'97. Jeannette Rankin was elected to the House of Representatives four years before women had won the right to vote.',
	"98. In the Netherlands' version of Sesame Street, there's a bluebird named Pino instead of Big Bird. Pino was later introduced as Big Bird\\’s cousin.",
	'99. Portions of Bible have been translated into more than 3,000 languages. Among those include fictional languages, like Elvish, Klingon and Na\\’vi.',
	'100. The longest hiccup in history lasted for more than 60 years after it began.',
];

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() + (i + 1));
		[array[i], (array[j] = array[i])], array[j];
	}

async function getUniqueRandomResponse() {
	if (responses.length === 0) {
		responses = [
			'1. Animals that lay eggs don’t have belly buttons.',
			'2. Mr. Potato Head was the first toy to be advertised on TV.',
			'3. Boanthropy is the psychological disorder in which patients believe they are a cow.',
			'4. Camels have three eyelids.',
			"5. There is a Mcdonald's on every continent except Antarctica.",
			'6. Mosquitoes are attracted to people who just ate bananas.',
			'7. In South Korea, there is an emergency number to report suspected spies (it\\’s 113!)',
			'8. Cats can make more than 100 vocalizations.',
			'9. Sonic the Hedgehog\\’s full name is Ogilvie Maurice Hedgehog.',
			'10. The world\\’s termites outweigh the world\\’s humans about 10 to 1.',
			'11. Most toilet paper sold in France is pink.',
			'12. The Hawaiian alphabet only has 12 letters.',
			'13. The human nose can remember 50,000 different scents.',
			'14. Children tend to grow faster in the spring.',
			'15. Sliced bread was invented a year after the invention of TV.',
			'16. If you keep a goldfish in a dark room, it will eventually turn white.',
			'17. Bullfrogs do not sleep.',
			'18. A snail breathes through its foot.',
			'19. Fish cough.',
			'20. It took the creator of the Rubik\\’s Cube one month to solve the cube after he created it.',
			'21. Japanese square watermelons aren\\’t edible. They are purely ornamental!',
			'22. An ant\\’s sense of smell is stronger than a dog\\’s.',
			'23. Tigers have striped skin, not just striped fur. The stripes are like fingerprints—no two tigers have the same pattern.',
			'24. Elephants are the only mammal that can\\’t jump.',
			'25. Alligators will give manatees the right of way if they are swimming near each other.',
			'26. Canned baked beans aren\\’t baked, but stewed.',
			'27. Despite its hump, camels have straight spines.',
			'28. Sunsets on Mars are blue.',
			'29. Digging a hole to China is actually possible if you start in Argentina.',
			'30. Mosquitoes have 47 teeth.',
			'31. A quarter of the bones in your body are in your feet.',
			'32. Brain waves can be used to power an electric train.',
			'33. The Boston Marathon didn\\’t allow female runners until 1972.',
			'34. Pigs can get sunburned.',
			'35. A one-day weather forecast requires about 10 billion math calculations.',
			'36. “Bluetooth” technology was named after a 10th-century king, King Harald "Bluetooth" Gormsson. He united Denmark and Norway, just like the technology united computers and cell phones.',
			'37. There are 19 different animal shapes in the animal cracker zoo.',
			'38. Hart Island is the final burial place for over a million of New York City\\’s unclaimed bodies.',
			'39. There\\’s a river called “Big Ugly Creek” in West Virginia.',
			'40. You share your birthday with at least 9 million other people in the world.',
			'41. No piece of A4 paper can be folded more than 7 times.',
			'42. In Slovakia, they have Christmas carp that live in the bathtub for a few days before they are eaten.',
			'43. There are 119 grooves on a quarter.',
			'44. The state of Ohio gives out different colored license plates for those with a DUI conviction.',
			'45. People don\\’t sneeze in their sleep due to their brain shutting down the reflex.',
			'46. Alaska has more caribou than people.',
			'47. Oysters can change from one gender to another (and back again).',
			'48. Dead people can get goosebumps.',
			'49. The Mona Lisa has no eyebrows.',
			'50. A ten-gallon hat holds less than one gallon of liquid.',
			'51. The average raindrop falls at 7 mph.',
			'52. Guy Fawkes is the reason men are called “guys.”',
			'53. Lizards communicate by doing push-ups.',
			'54. A giant squid has eyes the size of a volleyball.',
			'55. The average American will eat 35,000 cookies in their lifetime.',
			'56. Banks have therapists known as "wealth psychologists" who help clients who are unable to mentally cope with their immense wealth.',
			'57. Dogs have been banned from Antarctica since April 1994 out of concern that dogs might spread diseases to seals.',
			'58. Smelling apples or bananas can help you lose weight.',
			'59. In 1998, more than 50% of Iceland\\’s population believed in the existence of elves.',
			'60. The hummingbird is the only bird that can fly backward.',
			'61. Beavers were once the size of bears.',
			'62. A pigeon\\’s feathers weigh more than their bones.',
			'63. A crocodile can\\’t move its tongue.',
			'64. Honeybees navigate using the sun as their compass.',
			'65. If you sneeze traveling 60 mph, your eyes are closed for an average of 50 feet.',
			'66. Hawaii is the only state to grow coffee commercially.',
			'67. The square dance is the official state dance of Washington.',
			'68. When dinosaurs roamed the earth, volcanos were erupting on the moon.',
			"69. The only letters that don't appear on the periodic table are J and Q.",
			'70. A single strand of spaghetti is called a “spaghetto.”',
			'71. At birth, a baby panda is smaller than a mouse.',
			'72. In 1923, a jockey suffered a fatal heart attack mid-race. His horse finished and won the race, making him the first and only jockey to win a race after death.',
			'73. In order to protect themselves from poachers, African elephants have been evolving without tusks.',
			'74. In order to keep Nazis away, a Polish doctor faked a typhus outbreak that saved more than 8,000 people.',
			'75. The spiked dog collar was invented by the ancient Greeks to protect their dogs from wolf attacks.',
			'76. German chocolate cake is named after an American baker named Samuel German.',
			'77. During World War II, Germany planned to collapse the British economy by dropping millions of counterfeit bills over London.',
			'78. The youngest pope in history was Pope Benedict IX. He is also the only person to have been the pope more than once.',
			'79. The tallest man in recorded history was 8\\’11.',
			'80. IKEA is an acronym that stands for Ingvar Kamprad Elmtaryd Agunnaryd: the founder\\’s name, the farm where he grew up, and his hometown.',
			'81. There is a town in Nebraska called Monowi with a population of one. The only resident is a woman who serves as mayor, bartender, and librarian.',
			'82. The unique smell of rain actually comes from plant oils, bacteria, and ozone.',
			"83. Vanilla flavoring is sometimes made with a liquid secreted from beavers' castor glands.",
			'84. The oldest unopened bottle of wine was found in a Roman tomb was is more than 1,650 years old.',
			'85. In 2016, Domino\\’s tested pizza delivery via reindeer in Japan.',
			'86. Helen Keller is related to Robert E. Lee—her paternal grandfather was his second cousin.',
			'87. Starfish don\\’t have blood. They circulate nutrients by using seawater in their vascular system.',
			'88. Adult cats only meow at humans, not other cats.',
			'89. Video games have been found to be more effective at battling depression than some kinds of therapy.',
			"90. It's a common belief in Russia that eating ice cream will keep you warm.",
			'91. Underneath the streets of Beijing, there is around a million people who live in nuclear bunkers.',
			'92. A study from Harvard University finds that having no friends can be just as deadly as smoking. Both affect levels of a blood-clotting protein.',
			'93. All new FBI special agents and intelligence analysts are required to visit the United States Holocaust Memorial Museum.',
			'94. Garlic is known to attract leeches.',
			'95. New York City mob boss Vincent Gigante used to avoid arrest by wandering around in his bathrobe to convince the police he was insane.',
			'96. Bubble wrap was originally invented to be a kind of plastic wallpaper.',
			'97. Jeannette Rankin was elected to the House of Representatives four years before women had won the right to vote.',
			"98. In the Netherlands' version of Sesame Street, there's a bluebird named Pino instead of Big Bird. Pino was later introduced as Big Bird\\’s cousin.",
			'99. Portions of Bible have been translated into more than 3,000 languages. Among those include fictional languages, like Elvish, Klingon and Na\\’vi.',
			'100. The longest hiccup in history lasted for more than 60 years after it began.',
		];
		shuffleArray(responses);
	}
	return responses.pop();
}
*/
function shuffleArray(array) {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}
async function handleGameResult(userId, userChoice, botChoice, betAmount) {
	const winCondition = (userChoice === 'rock' && botChoice === 'scissors') || (userChoice === 'paper' && botChoice === 'rock') || (userChoice === 'scissors' && botChoice === 'paper');
	let userDoubloons = await getUserDoubloons(userId);
	const winAmount = betAmount * 2;
	const lossAmount = betAmount * 2;

	if (winCondition) {
		userDoubloons += winAmount;
		await updateUserDoubloons(userId, userDoubloons);
		return `### ➢ ...bogus... take the \`${winAmount}\` doubloons, Richard`;
	} else {
		userDoubloons -= lossAmount;
		await updateUserDoubloons(userId, userDoubloons);
		return `### ➢ OOF! Hand \`${lossAmount}\` doubloons over, punk`;
	}
}

module.exports = {
	name: 'rps',
	description: 'play rock paper scissors',
	cooldown: 5,
	async execute(message, args) {
		const betAmount = parseInt(args[1], 10);

		if (isNaN(betAmount) || betAmount <= 0) {
			message.channel.send('Please enter a valid amount of doubloons to bet!');
			return;
		}
		/*
		const gangData = readGangData();
		const gangMember = gangData[message.author.id];
				if (!gangMember) {
			message.channel.send('You don\'t have a gang! Use \`;gang create\` to create one.');
		*/
		const userId = message.author.id;
		const userDoubloons = await getUserDoubloons(userId);
		if (betAmount > userDoubloons) {
			message.channel.send(`You don't have enough Doubloons! Check your bank, bro.. \`;gang -c\``);
		}

		const choices = ['rock', 'paper', 'scissors'];
		const shuffledChoices = shuffleArray([...choices]);
		const botChoice = shuffledChoices[0];
		const userChoice = args[0].toLowerCase();
		if (!choices.includes(userChoice)) {
			message.channel.send('Please enter one of the following: rock, paper, or scissors');
		}
		// const randomResponse = await getUniqueRandomResponse();
		if (userChoice === botChoice) {
			message.channel.send(`### ➢  ${userChoice}  vs.  ${botChoice}  ➢  It's a tie!`);
		} else {
			handleGameResult(userId, userChoice, botChoice, betAmount)
				.then((resultMessage) => {
					message.reply(resultMessage);
				})
				.catch((error) => {
					console.error(error);
					message.reply('An error occurred so thanks for breaking the game.');
				});
		}

		commandLogger.info(`${message.guild.name} | ${message.author.username} | RPS | ${message.channel.name} | ${message.createdTimestamp}`);
	},
};
