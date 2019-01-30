const STOPS_DATA = require('./static/stations.json');
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const axios = require('axios');

let config
try {
    config = require('../config')
}
catch (error) {
}


const key = config ? config.MTA_API_KEY : process.env.MTA_API_KEY
const URL = `http://datamine.mta.info/mta_esi.php?key=${key}&feed_id=`
//ids correspond to endpoints for data on these trains: 
//[123456S, NQRW, ACEH(FS), BDFM, L, Staten Island Rail, G, JZ, 7]
const IDs =['1', '16', '26', '21', '2', '11', '31', '36', '51']

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
            return GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(res.data)
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


function readFeed(feed, index) {
  if (feed.error) {
    //[123456S, NQRW, ACEH(FS), BDFM, L, Staten Island Rail, G, JZ, 7]
    let id
    switch (index) {
      case 0: id = 1; break;
      case 1: id = 16; break;
      case 2: id = 26; break;
      case 3: id = 21; break;
      case 4: id = 2; break;
      case 5: id = 11; break;
      case 6: id = 31; break;
      case 7: id = 36; break;
      case 8: id = 51; break;
      default: id = 0
    }
    this.error[id] = feed.error
    return
  }
  this.timestamps.push(getDateStringFromTimeStamp(feed.header.timestamp))
  //get schedule from feed
  'entity' in feed && feed.entity.forEach(function readEntity(entity) {
    if (entity.tripUpdate) {
      //ex: trip_id is formatted "090400_1..S03R"
      //train is "1"
      //pathId is S03R
      //direction is South
      let pathId = entity.tripUpdate.trip.tripId.split('..')[1]
      //for trip_ids with no pathId
      if (!pathId) {
        return;
      }
      let train = entity.tripUpdate.trip.tripId.split('..')[0].slice(-1)[0];
      let direction = pathId[0]

      //try to match route ids to get headsign data
      //ineffective method to get headsigns data
      // let headsign = HEADSIGNS_DATA[`${train}${pathId}`]
      //   ? HEADSIGNS_DATA[`${train}${pathId}`].headsign
      //   : (direction === 'N')
      //     ? 'North Bound'
      //     : 'South Bound'

      //trip is defined by all the stops of 1 train
      let trip = entity.tripUpdate.stopTimeUpdate
      //getting the final stop of the train to use as headsign
      let id = trip.slice(-1)[0].stopId
      let headsign = STOPS_DATA[id].stop_name
      //going through each stop, adding the estimated time to schedule
      trip.forEach((stop) => {
        let stop_id = stop.stopId
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
      schedules: {},
      error: {},
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

