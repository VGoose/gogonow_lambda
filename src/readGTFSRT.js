var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const axios = require('axios');

const KEY = '298f7883cba525efccd7eaddf72d31a8'
const URL = `http://datamine.mta.info/mta_esi.php?key=${KEY}&feed_id=`

let data = test();
console.log(data['136S'])

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


async function test() {
  const output = {};
  try {
    let feed = await getFeed();
    4;
    feed.entity.forEach(function(entity) {
      if (entity.trip_update) {
        let trip = entity.trip_update.stop_time_update;
        let train = entity.trip_update.trip.trip_id;
        
        trip.forEach(stop => {
          let station = stop.stop_id;
          let time = stop.arrival.time || undefined;
          if(output[station]) {
            output[station].push({
              train: train,
              time: time,
            })
          }else {
            output[station] = [{train: train, time: time}]
          }
        })
      }
    });
  }catch(e){
    console.log(e);
  }
  
  
  return output;
}

