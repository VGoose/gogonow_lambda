const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

(async function readStops() {
	const readFile = promisify(fs.readFile);
	let stops = {}; 
	const data = await readFile(__dirname + '/GTFS_static_data/stops.txt', 'utf8');
	let lines = data.split('\n');
	let headers = lines[0].split(',');

	for (let i = 1; i < lines.length; i++) {
		let line = lines[i].split(',');
		//initializing so don't get undefined error
		stops[line[0]] = {};
		for (let j = 1; j < line.length; j++) {
			stops[line[0]][headers[j]] = line[j];
		}
	}

	fs.writeFile('src/stops.JSON', JSON.stringify(stops), 'utf8', (error) => {
		if (error) throw error;
		console.log('data written');
	})
})();


