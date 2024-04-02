module.exports = {
	name: 'nood',
	description: 'Responds with "You are a noodle, @username."',
	usage: ';nood <user>',
	category: 'Fun',
	cooldown: 5,
	execute(message) {
		const user = message.mentions.users.first();
		const noodleMessage = `You are a noodle, ${user}.`;
		message.delete().catch(console.error);
		message.channel.send(noodleMessage);
	},
};
