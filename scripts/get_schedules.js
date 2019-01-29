const STOPS_DATA = require('./static/stations.json');
const HEADSIGNS_DATA = require('./static/headsigns.json');

var GtfsRealtimeBindings = require('../gtfs-realtime-bindings-frk/gtfs-realtime.js');
const axios = require('axios');

const KEY = '298f7883cba525efccd7eaddf72d31a8'
const URL = `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=`
//ids correspond to endpoints for data on these trains: 
//[123456S, NQRW, ACEH(FS), BDFM, L, Staten Island Rail, G, JZ, 7]
const IDs = ['1', '16', '26', '21', '2', '11', '31', '36', '51']

//error:  Missing at least one required field for Message .transit_realtime.FeedMessage: header
//error from one of feed messages, taking down all feeds 
async function getFeeds() {
  const promises = IDs.map(id => {
    return axios.get(URL + id, { responseType: 'arraybuffer' })
  })

  return await Promise.all(promises)
    .then(
      responses => {
        return responses.map(res => {
          if (res.status !== 200) {
            return { error: error }
          }
          try {
            return GtfsRealtimeBindings.FeedMessage.decode(res.data)
          }
          //error:  Missing at least one required field for Message .transit_realtime.FeedMessage: header
          catch (error) {
            return { error }
          }
        })
      }
    ).catch(
      error => {
        throw new Error('getFeeds() error: ' + error)
      }
    )

}

//returns a date string, takes in MTA feed time stamp which is Unix Time
const getDateStringFromTimeStamp = (timestamp) => {
  return new Date(parseInt(timestamp) * 1000).toString()
}


function readFeed(feed) {
  if (feed.error) {
    return { error: 'error empty object test' }
  }

  this.timestamps.push(getDateStringFromTimeStamp(feed.header.timestamp))
  //get schedule from feed
  'entity' in feed && feed.entity.forEach(function readEntity(entity) {
    if (entity.trip_update) {
      //ex: trip_id is formatted "090400_1..S03R"
      //train is "1"
      //pathId is S03R
      //direction is South
      let pathId = entity.trip_update.trip.trip_id.split('..')[1]
      //for trip_ids with no pathId
      if (!pathId) {
        return;
      }
      let train = entity.trip_update.trip.trip_id.split('..')[0].slice(-1)[0];
      let direction = pathId[0]

      //try to match route ids to get headsign data
      //ineffective method to get headsigns data
      // let headsign = HEADSIGNS_DATA[`${train}${pathId}`]
      //   ? HEADSIGNS_DATA[`${train}${pathId}`].headsign
      //   : (direction === 'N')
      //     ? 'North Bound'
      //     : 'South Bound'

      //trip is defined by all the stops of 1 train
      let trip = entity.trip_update.stop_time_update
      //getting the final stop of the train to use as headsign
      let id = trip.slice(-1)[0].stop_id
      let headsign = STOPS_DATA[id].stop_name
      //going through each stop, adding the estimated time to schedule
      trip.forEach((stop) => {
        let stop_id = stop.stop_id
        //first station of a path will sometimes only have either arrival or departure time
        //all other stations have both, when both present the times are equal
        let time = stop.arrival
          ? getDateStringFromTimeStamp(stop.arrival.time)
          : stop.departure
            ? getDateStringFromTimeStamp(stop.departure.time)
            : null
        if (this.schedules[stop_id]) {
          this.schedules[stop_id].push({
            stopId: stop_id,
            train: train,
            direction: direction,
            headsign: headsign,
            time: time
          })
        } else {
          this.schedules[stop_id] = [{
            stopId: stop_id,
            train: train,
            direction: direction,
            headsign: headsign,
            time: time
          }]
        }
      })
    }
  }, this)
}

//returns array of schedule objects {timestamp, schedule: {stopId, train, direction, headsign, time}}
async function getSchedules() {
  try {
    //feeds is an array of decoded arraybuffers 
    let feeds = await getFeeds();
    let data = {
      timestamps: [],
      schedules: {}
    }
    feeds.forEach(readFeed, data)
    return data
  } catch (error) {
    throw new Error('getSchedules(): ' + error)
  }
}

//debugging
getSchedules()

module.exports = getSchedules;

