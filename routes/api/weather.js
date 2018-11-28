const router = require('express').Router();

const verifyUser = require('../../scripts/auth/verify')
const getWeatherDS = require('../../scripts/get_weather')

router.get('/', verifyUser, (req, res) => {
  const { lat, lon } = req.body
  getWeatherDS(lat, lon)
    .then(
    resp => res.send(resp.data))
    .catch(
      err => res.send(err)
    )
})

module.exports = router