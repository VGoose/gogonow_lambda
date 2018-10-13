import { combineReducers } from 'redux'
import userReducer from './user_reducer';
import schedulereducer from './schedule_reducers';

export default combineReducers({
    users: userReducer,
    schedules: schedulereducer,
})