import axios from '../utils/axios'

export const weatherTypes = {
  WEATHER_REQUEST: 'WEATHER_REQUEST',
  WEATHER_RECEIVE: 'WEATHER_RECEIVE',
  WEATHER_ERROR: 'WEATHER_ERROR'
}
export const fetchWeatherIfNeeded = () => (dispatch, getState) => {
  const { lat, lon } = getState().user.location
  shouldWeatherFetch(getState()) 
    ? dispatch(getWeather(lat, lon))
    : null
}
const shouldWeatherFetch = (state) => {
  const { isFetching, lastUpdated } = state.weather
  const secondsSinceLastUpdate = (lastUpdated - Date.now()) * 1000
  console.log(secondsSinceLastUpdate)
  if (isFetching) {
    return false
  }else if (secondsSinceLastUpdate < 30 && lastUpdated) { 
    //less than 30 seconds before last updated AND not the startup request
    return false
  }else {
    return true
  }
}
const getWeather = (lat, lon) => (dispatch) => {
  dispatch(weatherRequest())
  axios.get('/api/weather', {lat, lon})
    .then(
      res => dispatch(weatherReceive(res.data)),
      err => dispatch(weatherError(err))
    )
}
const weatherRequest = () => {
  return {
    type: weatherTypes.WEATHER_REQUEST
  }
}
const weatherReceive = (data) => {
  return {
    type: weatherTypes.WEATHER_RECEIVE,
    currentForecast: data.currently,
    hourlyForecast: data.hourly
  }
}

const weatherError = (error) => {
  return {
    type: weatherTypes.WEATHER_ERROR,
    error
  }
}