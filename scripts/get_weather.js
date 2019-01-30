const axios = require('axios')
let config
try {
    config = require('../config')
}
catch (error) {
}
const key = config ? config.DS_API_KEY : process.env.DS_API_KEY
const baseUrl = `https://api.darksky.net/forecast/${key}/`
const buildUrl = (lat, lon) => {
    return `${baseUrl}${lat},${lon}`
}

const getWeatherDS = (lat, lon) => {
    return axios.get(buildUrl(lat, lon))
}

module.exports = getWeatherDS