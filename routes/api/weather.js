const router = require('express').Router();

const getWeatherDS = require('../../scripts/get_weather')
const nearbyCities = require('nearby-cities')

router.get('/:lat/:lon', (req, res) => {
  const { lat, lon } = req.params
	const query = {latitude: lat, longitude: lon}
  const city = nearbyCities(query)[0]
  getWeatherDS(lat, lon)
    .then(
      resp => {
        res.status(200).send(JSON.stringify({weather: resp.data, city: city.name}))
      })
    .catch(
      error => res.status(404).send(error)
    )
})

module.exports = router