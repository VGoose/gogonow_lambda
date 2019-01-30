const router = require('express').Router();
const getSchedules = require('../../scripts/get_schedules');

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
      },
      error => console.log('schedule error ' + error) || res.status(404).send(error)
    )
})


module.exports = router;