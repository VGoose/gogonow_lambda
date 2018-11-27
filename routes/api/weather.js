const router = require('express').Router();

const verifyUser = require('../../scripts/auth/verify')
const getWeatherDS = require('../../scripts/get_weather')

const {lat, lon} = {lat:40.7534828,lon:-73.98178659999999}

router.get('/', verifyUser, (req, res) => {
    getWeatherDS(lat, lon).then(
      resp => res.send(resp.data),
      error => res.send(error)
    )
  })
  
module.exports = router