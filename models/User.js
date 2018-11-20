const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    data: {
      favorite_stations: [],
      create_date: {
        type: Date,
        default: Date.now()
      }
    }
  }
)
module.exports = User = mongoose.model('user', UserSchema);

//query db, return a promise
User.getUserByEmail = async email => {
  return await User.findOne({ email: email }).exec();
}

User.comparePassword = async (candidatePassword, hash) => {
  return await bcrypt.compare(candidatePassword, hash);
}

User.createNewUser = async user => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  console.log(user);
  user.password = hash;
  return await user.save();
}