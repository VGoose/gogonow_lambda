const router = require('express').Router();
const getWeatherDS = require('../../scripts/get_weather')

router.get('/:lat/:lon', (req, res) => {
  const { lat, lon } = req.params
  getWeatherDS(lat, lon)
    .then(
      resp => {
        res.status(200).send(JSON.stringify({ weather: resp.data }))
      })
    .catch(
      error => res.status(404).send(error)
    )
})

module.exports = router