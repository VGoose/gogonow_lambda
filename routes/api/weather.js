const router = require('express').Router();

const verifyUser = require('../../scripts/auth/verify')
const getWeatherDS = require('../../scripts/get_weather')

router.get('/:lat/:lon', verifyUser, (req, res) => {
  console.log(req.body)
  const { lat, lon } = req.params
  getWeatherDS(lat, lon)
    .then(
    resp => res.send(resp.data))
    .catch(
      err => console.log()
    )
})

module.exports = router