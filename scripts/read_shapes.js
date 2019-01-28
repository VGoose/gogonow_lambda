const fs = require('fs');
const { promisify } = require('util');

const STATIONS = require('./static/stations.json');


//add trains array to STATION object 
(async function readStops() {
  const readFile = promisify(fs.readFile);
  const data = await readFile(__dirname + '/static/GTFS_static_data/shapes.txt', 'utf8');
  let lines = data.split('\n');
  let train, lat, lon;
  let stationValues = Object.values(STATIONS);

  Object.keys(STATIONS).forEach(key => {
    STATIONS[key].trains = [];
  });

  for (let i = 1; i < lines.length; i++) {
    let line = lines[i].split(',');
    train = line[0][0];
    lat = line[1];
    lon = line[2];

    stationValues.forEach(station => {
      if (station.stop_lat == lat && station.stop_lon == lon) {
        if(STATIONS[station.stop_id].trains.indexOf(train) == -1 ){
          STATIONS[station.stop_id].trains.push(train);
        }
      }
    })
  }

  fs.writeFile('scripts/static/stationswithtrains.JSON', JSON.stringify(STATIONS), 'utf8', (error) => {
    if (error) throw error;
    console.log('data written');
  })
})();