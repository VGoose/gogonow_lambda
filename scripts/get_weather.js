const axios = require('axios') 

//dark sky
const DS_API_KEY_1='3ca5c3d1835b3656e269d978b7006717'
const baseUrl = `https://api.darksky.net/forecast/${DS_API_KEY_1}/`
console.log('testing env variables: ' + process.env.DS_API_KEY)
const buildUrl = (lat, lon) => {
    return `${baseUrl}${lat},${lon}`
}

const getWeatherDS = (lat, lon) => {
    return axios.get(buildUrl(lat, lon))
}

module.exports = getWeatherDS