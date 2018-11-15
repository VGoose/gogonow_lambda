import axios from 'axios';
import { SCHEDULE_GET, SCHEDULE_LOADING } from './types';

export const schedulesGet = () => (dispatch, getState) => {
    dispatch(setScheduleLoading());
    axios.get(`http://localhost:5000/api/schedules/`)
    .then(res => {
      dispatch({
          type: SCHEDULE_GET,
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