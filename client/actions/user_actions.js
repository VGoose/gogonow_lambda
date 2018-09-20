import axios from 'axios';
import { GET_USER, ADD_USER, DELETE_USER, UPDATE_USER, USERS_LOADING } from './types';

export const getUsers = () => (dispatch, getState) => {
    dispatch(setUsersLoading());
    axios.get('http://localhost:5000/api/user')
    .then(res => {
      dispatch({
          type: GET_USER,
          payload: res.data
      })
    })
    .catch(err => console.log(err))
}

export const addUser = () => {
    const data;
    return { 
        type: ADD_USER,
        payload: data
    }
}

export const deleteUser = () => {
    const data;
    return { 
        type: DELETE_USER,
        payload: data
    }
}

export const updateUser = () => {
    const data;
    return { 
        type: UPDATE_USER,
        payload: data
    }
}

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING,
    }
}