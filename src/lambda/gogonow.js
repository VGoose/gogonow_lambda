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
  origin: ['http://localhost:8080', 'https://nervous-newton-e18e8b.netlify.com', 'http://localhost:3000', 'exp://127.0.0.1:19000'],
  // credentials: true
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const mongoDB = 'mongodb://gogonow:gogonow1@ds221242.mlab.com:21242/vgoose_db';

mongoose.connect(mongoDB, { useNewUrlParser: true })
  .then(() => console.log('database connected'))
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection Error:'));

// const router = express.Router();
// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Express.js!</h1>');
//   res.end();
// });

app.use('/.netlify/functions/gogonow/schedule', schedule);
app.use('/.netlify/functions/gogonow/weather', weather)
// app.use('/.netlify/functions/gogonow', router)

// module.exports = app
module.exports.handler = serverless(app)

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server started on port ${port}`));

