const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const request = require('request');
const axios = require('axios');

const END_POINT = 'http://datamine.mta.info/mta_esi.php?key=298f7883cba525efccd7eaddf72d31a8&feed_id='
const ID = [1, 26, 16, 21, 2, 11, 31, 36, 51];

function readGTFSRTData() {
  var requestSettings = {
    method: 'GET',
    url: END_POINT + ID[0],
    encoding: null
  };
  request(requestSettings, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
      
      feed.entity.forEach(function(entity) {
        if (entity.trip_update) {
          console.log(entity.trip_update);
        }
      });
    }
  });

  // axios.get(END_POINT+ID[0])
  //   .then(res => console.log(res))
}

readGTFSRTData();

module.exports = readGTFSRTData;
