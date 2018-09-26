import axios from 'axios';
import { GET_USERS, ADD_USER, DELETE_USER, UPDATE_USER, USERS_LOADING } from './types';

export const getUsers = () => (dispatch, getState) => {
    dispatch(setUsersLoading());
    axios.get('http://localhost:5000/api/user')
    .then(res => {
      dispatch({
          type: GET_USERS,
          payload: res.data
      })
    })
    .catch(err => console.log(err))
}

export const addUser = () => {
    return { 
        type: ADD_USER,
        payload: 'addUser'
    }
}

export const deleteUser = () => {
    return { 
        type: DELETE_USER,
        payload: 'deleteUser'
    }
}

export const updateUser = () => {
    return { 
        type: UPDATE_USER,
        payload: 'updateUser'
    }
}

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING,
    }
}