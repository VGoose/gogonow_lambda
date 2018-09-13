const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const user = require('./routes/api/user');
const stopTimes = require('./routes/api/stop_times');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const mongoDB = 'mongodb://vgoose:Password1@ds221242.mlab.com:21242/vgoose_db';

mongoose.connect(mongoDB, {useNewUrlParser: true})
  .then(() => console.log('connected to database'))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use('/api/user/', user);
app.use('/api/stop_times/', stopTimes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

