const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: {
      type: String, 
      required: true, 
      max: 100
    },
    favorite_stations: [{
      type: String
    }]
  }
)

module.exports = User = mongoose.model('user', UserSchema);