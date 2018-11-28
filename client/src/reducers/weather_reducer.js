import { weatherTypes } from '../actions/weather_actions'

const { 
  WEATHER_REQUEST,
  WEATHER_RECEIVE,
  WEATHER_ERROR
} = weatherTypes

const initialState = {
  isFetching: false,
  currentForecast: {},
  hourlyForecast: [],
  lastUpdated: null,
  isF: true,
  error: null
}
const weatherReducer = (state = initalState, action) => {
  switch(action.type) {
    case WEATHER_REQUEST: 
      return {
        ...state,
        isFetching: true
      }
    case WEATHER_RECEIVE:
      return {
        ...state,
        currentForecast: action.currentForecast,
        hourlyForecast: action.hourlyForecast,
        lastUpdated: Date.now(),
        isFetching: false,
      }
    case WEATHER_ERROR: 
      return {
        ...state,
        error: action.error,
        isFetching: false,
      }
    default: 
      return state
  }
}