import axios from 'axios';
import { GET_SCHEDULES, SCHEDULE_LOADING } from './types';

export const getSchedules = () => (dispatch, getState) => {
    dispatch(setScheduleLoading());
    axios.get(`http://localhost:5000/api/schedules/`)
    .then(res => {
      dispatch({
          type: GET_SCHEDULES,
          payload: res.data
      })
    })
    .catch(err => console.log(err))
}

export const setScheduleLoading = () => {
    return {
        type: SCHEDULE_LOADING,
    }
}