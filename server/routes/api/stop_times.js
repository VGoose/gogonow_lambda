const router = require('express').Router();

const StopTimes = require('../../models/Stop_Times');

router.get('/', (req, res) => {
  StopTimes.find()
    .then(stopTimes=> res.json(stopTimes))
})

router.post('/', (req, res) => {
  // const newUser = new User({
  //   name: req.body.name
  // });

  // newUser.save().then(user => res.json(user));
})

module.exports = router;