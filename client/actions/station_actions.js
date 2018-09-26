import axios from 'axios';
import { GET_STATIONS, STATION_LOADING } from './types';

export const getStationTimes = () => (dispatch, getState) => {
    dispatch(setStationLoading());
    axios.get(`http://localhost:5000/api/stop_times/`)
    .then(res => {
      dispatch({
          type: GET_STATIONS,
          payload: res.data
      })
    })
    .catch(err => console.log(err))
}

export const setStationLoading = () => {
    return {
        type: STATION_LOADING,
    }
}