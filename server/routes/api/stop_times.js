const router = require('express').Router();
const readGTFSRT = require('../../scripts/readGTFSRT');

const StopTimes = require('../../models/Stop_Times');


router.get('/', (req, res) => {
  readGTFSRT().then(
    data => res.json(data),
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