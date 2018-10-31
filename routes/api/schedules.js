const router = require('express').Router();
const getArrivalTimes = require('../../scripts/get_schedules');

const Schedules = require('../../models/Schedules');

let query; 

router.get('/', (req, res) => {
  getArrivalTimes().then(
    data => { 
      query = Schedules.findByIdAndUpdate('5bd75e39e819ae36c704f42a', { time: new Date(), schedule: data }, { new: true});
      query.select('schedule')
        .exec((schedule) => res.send())
    },
    error => res.send(error)
  )
})

router.post('/', (req, res) => {
  // const newUser = new User({
  //   name: req.body.name
  // });

  // newUser.save().then(user => res.json(user));
})

module.exports = router;