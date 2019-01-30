'use strict'
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const schedule = require('../../routes/api/schedule');
const weather = require('../../routes/api/weather')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/.netlify/functions/gogonow/schedule', schedule);
app.use('/.netlify/functions/gogonow/weather', weather)

module.exports.handler = serverless(app)



