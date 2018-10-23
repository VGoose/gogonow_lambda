const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: {
      type: String, 
      index: true,
      required: true, 
      max: 100
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorite_stations: [String]
  }
)

module.exports = User = mongoose.model('user', UserSchema);