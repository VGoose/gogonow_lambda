const router = require('express').Router();
const getArrivalTimes = require('../../scripts/get_schedules');

const Schedule = require('../../models/Schedule');

const verifyUser = require('../../scripts/auth/verify')

let query;

router.get('/', verifyUser, (req, res) => {
  getArrivalTimes().then(
    data => {
      query = Schedule.findByIdAndUpdate('5bd75e39e819ae36c704f42a', { time: data.timestamp, schedule: data.schedule }, { new: true });
      query
        .exec()
          .then(document => res.send(JSON.stringify(document)))
          .catch(error => res.send(JSON.stringify(error)))
    },
    error => res.send(error)
  )
})


module.exports = router;