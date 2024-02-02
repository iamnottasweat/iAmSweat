module.exports = {
	name: 'close',
	description: 'Sends a closed message with a GIF',
	usage: ';close',
	category: 'KR3W',
	execute(message) {
		const gifUrls = ['https://i.imgur.com/63lb6I0.gif', 'https://i.imgur.com/zxe4L39.gif'];
		const textMessage = '# CLOSED SO SOWWY XOXO';
		const gifUrl = gifUrls[Math.floor(Math.random() * gifUrls.length)];
		const color = Math.floor(Math.random() * 16777215);

		const embed = {
			description: textMessage,
			image: { url: gifUrl },
			color: color,
		};

		message.channel
			.send({ embeds: [embed] })
			.then(() => message.delete())
			.catch(console.error);
	},
};
