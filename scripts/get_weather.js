const axios = require('axios') 

//open weather map
const API_KEY='APPID=83db5901e19c8e43cdd5b2eba2136425'
const owmBaseUrl = 'api.openweathermap.org/data/2.5/weather?'
let lat, lon
const url = `${owmBaseUrl}lat=${lat}&lon=${lon}&${API_KEY}`
//dark sky
const DS_API_KEY='3ca5c3d1835b3656e269d978b7006717'
const baseUrl = `https://api.darksky.net/forecast/${DS_API_KEY}/`

const buildUrl = (lat, lon) => {
    return `${baseUrl}${lat},${lon}`
}

const getWeatherDS = (lat, lon) => {
    return axios.get(buildUrl(lat, lon))
}

module.exports = getWeatherDS