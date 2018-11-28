import axios from '../utils/axios'

export const weatherTypes = {
  WEATHER_REQUEST: 'WEATHER_REQUEST',
  WEATHER_RECEIVE: 'WEATHER_RECEIVE',
  WEATHER_ERROR: 'WEATHER_ERROR'
}
export const getWeatherIfNeeded = () => (dispatch, getState) => {
  shouldWeatherFetch(getState()) 
    ? dispatch(getWeather)
    : null
}
const shouldWeatherFetch = (state) => {
  const { isFetching, lastUpdated } = state.weather
  const secondsSinceLastUpdate = (lastUpdated - Date.now()) * 1000
  console.log(secondsSinceLastUpdate)
  if (isFetching) {
    return false
  }else if (secondsSinceLastUpdate < 30) {
    return false
  }else {
    return true
  }
}
const getWeather = () => (dispatch) => {
  dispatch(weatherRequest())
  axios.get('/api/weather')
    .then(
      res => dispatch(weatherReceive(res.data)),
      err => dispatch(weatherError(err))
    )
}
const weatherRequest = () => {
  return {
    type: WEATHER_REQUEST
  }
}
const weatherReceive = (data) => {
  return {
    type: WEATHER_RECEIVE,
    currentForecast: data.currently,
    hourlyForecast: data.hourly
  }
}

const weatherError = (error) => {
  return {
    type: WEATHER_ERROR,
    error
  }
}