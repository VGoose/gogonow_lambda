const fs = require('fs');
const { promisify } = require('util');

//include Id into object
(async function readStops() {
	const readFile = promisify(fs.readFile);
	let stops = {}; 
	const data = await readFile(__dirname + '/GTFS_static_data/stops.txt', 'utf8');
	let lines = data.split('\n');
	let headers = lines[0].split(',');

	for (let i = 1; i < lines.length; i++) {
		let line = lines[i].split(',');
		if(!stops[line[2]]){
			//initializing so don't get undefined error
			stops[line[2]] = {};
			for (let j = 0; j < line.length; j++) {
				stops[line[2]][headers[j]] = line[j];
			}
		}


	}

	fs.writeFile('src/stops.JSON', JSON.stringify(stops), 'utf8', (error) => {
		if (error) throw error;
		console.log('data written');
	})
})();


