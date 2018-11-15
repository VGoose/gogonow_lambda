import axios from '../src/utils/axios';
import { USER_LOGIN, USER_AUTH, USER_UPDATE, USER_LOADING, USER_GET_DATA } from './types';

export const userLogin = () => (dispatch, getState) => {
	dispatch(userSetLoading());
	axios.get('/api/user/login') 
		.then(res => {
			if (res.status === 404) {
				//TODO
			}
			dispatch({
				type: USER_LOGIN,
				payload: res.data,
			})
		}) 
}

export const userAuth = () => (dispatch, getState) => {
	dispatch(userSetLoading());
	axios.get('/api/user/status') 
		.then(res => {
			if (res.status === 404) {
				//TODO
			}
			dispatch({
				type: USER_AUTH,
				payload: res.data,
			})
		}) 
}

export const userGetData = () => (dispatch, getState) => {
	dispatch(userSetLoading());
	axios.get('/api/user/data') 
		.then(res => {
			if (res.status === 401 || 403) {
				dispatch(userAuth());
			}
			dispatch({
				type: USER_GET_DATA,
				payload: res.data,
			})
		}) 
		.catch(err => {
			console.log(err);
		})
}
export const userAddStation = (station) => (dispatch, getState) =>{

	axios.post('/api/user/updatestation', { station, add: true })
		.then(res => {
			if (res.status === 401 || 403) {
				dispatch(userAuth());
			}
			dispatch({
				type: USER_UPDATE,
				payload: res.data
			})
		})
}

export const userRemoveStation = (station) =>(dispatch, getState) => {

	axios.post('/user/updatestation', { station, add: false })
		.then(res => {
			if (res.status === 401 || 403) {
				dispatch(userAuth());
			}
			dispatch({
				type: USER_UPDATE,
				payload: res.data
			})
		})

}

export const userSetLoading = () => (dispatch, getState) => {
	return {
		type: USER_LOADING
	}
}
