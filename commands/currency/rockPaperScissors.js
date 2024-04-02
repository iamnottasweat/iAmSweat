const functions = process.env.gangFunctionsPath;
const { getUserDoubloons, updateUserDoubloons } = require(functions);
const logger = process.env.loggerPath;
const { commandLogger } = require(logger);

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
		return `### ➢ ...bogus... take the \`${winAmount}\` doubloons, dweeb.`;
	} else {
		if (userDoubloons - lossAmount < 0) {
			userDoubloons = 0;
		} else {
			userDoubloons -= lossAmount;
		}
		await updateUserDoubloons(userId, userDoubloons);
		if (userDoubloons === 0) {
			return `### WOW! You just lost all your doubloons! Better luck next time, pointdexter.`;
		} else {
			return `### OOF! Hand \`${lossAmount}\` doubloons over, punk.`;
		}
	}
}

module.exports = {
	name: 'rps',
	description: 'play rock paper scissors',
	usage: ';rps <rock|paper|scissors> <bet>',
	category: 'currency',
	cooldown: 5,
	async execute(message, args) {
		const betAmount = parseInt(args[1], 10);

		if (isNaN(betAmount) || betAmount <= 0) {
			message.channel.send('Please enter a valid amount of doubloons to bet!');
			return;
		}
		const userId = message.author.id;
		const userDoubloons = await getUserDoubloons(userId);
		if (betAmount > userDoubloons) {
			message.channel.send(`You don't have enough Doubloons! Check your bank, bro.. \`;gang -c\``);
			return;
		}

		const choices = ['rock', 'paper', 'scissors'];
		const shuffledChoices = shuffleArray([...choices]);
		const botChoice = shuffledChoices[0];
		const userChoice = args[0].toLowerCase();
		if (!choices.includes(userChoice)) {
			message.channel.send('Please enter one of the following: rock, paper, or scissors');
		}
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
