const STOPS_DATA = require('./static/stops.json');
const HEADSIGNS_DATA = require('./static/headsigns.json');

var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const axios = require('axios');

const KEY = '298f7883cba525efccd7eaddf72d31a8'
const URL = `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=`

async function getFeed() {
  let url =  URL + '1'
  let feed = await axios.get(url, {responseType: 'arraybuffer'})
    .then(
      res => GtfsRealtimeBindings.FeedMessage.decode(res.data)
    ).catch(
      e => console.log(e)
    )
  return feed;
}

async function getArrivalTimes() {
  const output = {};
  try {
    let feed = await getFeed();
    feed.entity.forEach(function(entity) {
      if (entity.trip_update) {
        let trip = entity.trip_update.stop_time_update;
        //trip_id is formatted "090400_1..S03R"
        let tripId = entity.trip_update.trip.trip_id;
        let train = entity.trip_update.trip.trip_id.split('..')[0].slice(-1)[0];
        let pathId = entity.trip_update.trip.trip_id.split('..')[1];
        if (!pathId || pathId.length === 1){
          return;
        }
        let direction = pathId[0];
        let headsign = HEADSIGNS_DATA[`${train}${pathId}`] ? HEADSIGNS_DATA[`${train}${pathId}`].headsign : null; 
        trip.forEach(stop => {
          let stationId = stop.stop_id
          let time = stop.arrival ? new Date(parseInt(stop.arrival.time)*1000).toString() : null;
          if(output[stationId]) {
            output[stationId].push({
              train: train,
              direction: direction,
              headsign: headsign,
              time: time,
            })
          }else {
            output[stationId] = [{
              train: train,
              direction: direction,
              headsign: headsign,
              time: time,
            }]
          }
        })
      }
    });
  }catch(e){
    console.log(e);
  }
  return output;
}

getArrivalTimes();
module.exports = getArrivalTimes;

