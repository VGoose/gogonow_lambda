'use strict'
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



const schedule = require('../../routes/api/schedule');
const weather = require('../../routes/api/weather')

const app = express();

//cors setup
var corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:3000', 'exp://127.0.0.1:19000'],
  // credentials: true
}
// app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const mongoDB = 'mongodb://vgoose:Password1@ds221242.mlab.com:21242/vgoose_db';
mongoose.connect(mongoDB, {useNewUrlParser: true})
  .then(() => console.log('connected to database'))
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/.netlify/functions/gogonow/api/schedule/', schedule);
app.use('/.netlify/functions/gogonow/api/weather/', weather)
app.get('/.netlify/functions/gogonow', (req, res) => {
  res.status(200).send('hello world')
});

module.exports.handler = serverless(app)

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server started on port ${port}`));

