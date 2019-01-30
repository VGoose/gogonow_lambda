'use strict'
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

const schedule = require('../../routes/api/schedule');
const weather = require('../../routes/api/weather')

const app = express();

//cors setup
var corsOptions = {
  origin: ['http://localhost:8080', 'https://nervous-newton-e18e8b.netlify.com', 'http://localhost:3000', 'exp://127.0.0.1:19000'],
  // credentials: true
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/.netlify/functions/gogonow/schedule', schedule);
app.use('/.netlify/functions/gogonow/weather', weather)

module.exports.handler = serverless(app)



