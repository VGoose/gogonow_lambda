const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let StopTimesSchema = new Schema(
  {
    name: {
      type: String, 
      required: true, 
      max: 100
    }
  }
)

module.exports = StopTimes = mongoose.model('stop_times', StopTimesSchema); 