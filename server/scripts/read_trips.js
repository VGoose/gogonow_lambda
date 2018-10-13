const fs = require('fs');
const { promisify } = require('util');

//include Id into object
(async function readStops() {
  const readFile = promisify(fs.readFile);
  let trips = {};
  const data = await readFile(__dirname + '/static/GTFS_static_data/trips.txt', 'utf8');
  let lines = data.split('\n');

  for (let i = 1; i < lines.length; i++) {
    let line = lines[i].split(',');
    if(line.length > 1) {
      let tripId = line[2].toString();
      let headsign = line[3].toString();
  
      let path = tripId.slice(-4);
      let train = line[0];
      let direction = path[0];

      //multiple instances of trains, and paths.
      let id = train + path;
  
      if (!trips[id]) {
        //initializing so don't get undefined error
        trips[id] = {};
        trips[id].headsign = headsign;
      }
    }
  }

  fs.writeFile('server/scripts/static/headsigns.json', JSON.stringify(trips), 'utf8', (error) => {
    if (error) throw error;
    console.log('data written');
  })
})();