const axios = require('axios');
const { commandLogger, errorLogger } = require('../../logger');

module.exports = {
	name: 'weather',
	description: 'Get the weather for a location',
	usage: ';weather <city, state|country>',
	category: 'informational',
	cooldown: 5,
	async execute(message, args) {
		try {
			const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args}&appid=${process.env.weatherKey}&units=imperial`);
			const weather = resp.data;
			const color = Math.floor(Math.random() * 16777215);

			message.delete().catch(console.error);

			const embed = {
				title: `${weather.name}, ${weather.sys.country}`,
				description: `**${weather.weather[0].description}**`,
				thumbnail: {
					url: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
				},
				fields: [
					{
						name: 'Temperature',
						value: `${weather.main.temp}°F`,
						inline: true,
					},
					{
						name: 'Humidity',
						value: `${weather.main.humidity}%`,
						inline: true,
					},
					{
						name: 'Wind Speed',
						value: `${weather.wind.speed}m/s`,
						inline: true,
					},
					{
						name: 'Pressure',
						value: `${weather.main.pressure}hPa`,
						inline: true,
					},
				],
				color: color,
				timestamp: new Date(),
			};

			message.channel.send({ embeds: [embed] });
			commandLogger.info(`${message.guild.name} | ${message.author.username} | WEATHER | ${message.channel.name} | ${message.createdTimestamp}`);
		} catch (error) {
			errorLogger.error(error);
			message.channel.send('Sorry, I was unable to get the weather.');
		}
	},
};
