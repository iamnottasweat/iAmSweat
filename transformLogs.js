/*
const fs = require('fs');
const path = require('path');

// Define the paths of the input files and the output file
const logFilePath = path.join(__dirname, 'log.json');
const prettyLogFilePath = path.join(__dirname, 'pretty-log.json');
const outputFilePath = path.join(__dirname, 'readable-command-log.json');

// Helper function to read and parse a JSON file
const readAndParseJsonFile = (filePath) => {
	try {
		const fileContent = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(fileContent);
	} catch (err) {
		console.error(`Error reading or parsing the file ${filePath}:`, err);
		return null;
	}
};

// Read and parse both files
const logData = readAndParseJsonFile(logFilePath);
const prettyLogData = readAndParseJsonFile(prettyLogFilePath);

// Check if both files have been read and parsed successfully
if (logData && prettyLogData) {
	// Transform the data here if needed, otherwise you can simply combine them
	const combinedData = { log: logData, prettyLog: prettyLogData };

	// Write the combined data to the output file
	fs.writeFile(outputFilePath, JSON.stringify(combinedData, null, 2), 'utf8', (err) => {
		if (err) {
			console.error('Error writing the output file:', err);
		} else {
			console.log('The combined log has been written to', outputFilePath);
		}
	});
} else {
	console.error('Failed to read one or both files.');
}
*/
