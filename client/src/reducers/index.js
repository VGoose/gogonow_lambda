import { combineReducers } from 'redux'

import userReducer from './user_reducer'
import scheduleReducer from './schedule_reducer'
import weatherReducer from './weather_reducer'

export default combineReducers({
    user: userReducer,
    schedule: scheduleReducer,
    weather: weatherReducer
})