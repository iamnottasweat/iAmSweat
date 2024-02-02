const Scraper = require('images-scraper');
const google = new Scraper({
	puppeteer: {
		headless: true,
	},
});
const { commandLogger, errorLogger } = require('../../logger.js');

module.exports = {
	name: 'img',
	description: 'returns an image',
	usage: ';img <image_name>',
	category: 'image-creators',
	cooldown: 5,
	async execute(message, args) {
		try {
			const image_query = args.join(' ');
			if (!image_query) {
				return message.channel.send('Enter an image name!');
			}
			const image_results = await google.scrape(image_query, 20);
			if (image_results.length === 0) {
				return message.channel.send('No images found.');
			}
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			for (let i = 0; i < 1; i++) {
				const randomIndex = Math.floor(Math.random() * image_results.length);
				const embed = {
					image: {
						url: image_results[randomIndex].url,
					},
					color: color,
					timestamp: new Date(),
				};
				message.channel.send({ embeds: [embed] });
			}
			commandLogger.info(`${message.guild.name} | ${message.author.username} | IMG | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get an image.');
		}
	},
};
