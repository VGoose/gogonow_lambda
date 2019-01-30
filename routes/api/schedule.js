const router = require('express').Router();
const getSchedules = require('../../scripts/get_schedules');

const Schedule = require('../../models/Schedule');

let query;
let backupData, lastReqTime
router.get('/', (req, res) => {
  if (lastReqTime && backupData) {
    let secondsSinceLastReq = (Date.now() - lastReqTime) / 1000
    if (secondsSinceLastReq < 30) {
      console.log('----returning cached data')
      res.status(200).send(JSON.stringify(backupData))
      return
    }
  }

  getSchedules()
    .then(
      data => {
        lastReqTime = Date.now()
        backupData = data
        res.status(200).send(JSON.stringify(data))

        // query = Schedule.findByIdAndUpdate('5bd75e39e819ae36c704f42a', { time: Date.now(), schedules: data }, { new: true, upsert: true });
        // query
        //   .exec()
        //   .then(document => {
        //     backupData = document
        //     res.status(200).send(JSON.stringify(document))
        //   })
        //   .catch(error => console.log(error) || res.status(404).send(error))
      },
      error => console.log('schedule error ' + error) || res.status(404).send(error)
    )
})


module.exports = router;