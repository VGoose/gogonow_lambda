const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let StopTimesSchema = new Schema(
  {
    time: Date,
    schedule: Object,
    // [{
    //   stopId: String,
    //   train: String,
    //   direction: String,
    //   headsign: String,
    //   time: Date,
    // }]
  }
)

module.exports = Schedule = mongoose.model('schedules', StopTimesSchema); 