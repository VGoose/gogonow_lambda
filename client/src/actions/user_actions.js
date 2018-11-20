import axios from '../utils/axios';
import Cookies from 'js-cookie';

import STATIONS from '../stations.json'

import { diff, getEuclideanDist } from '../utils/helpers';

//USERS
export const USER_REQUEST = 'USER_REQUEST'
export const USER_RECEIVE = 'USER_RECEIVE'
export const USER_DENIED = 'USER_DENIED'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_LOCATE = 'USER_LOCATE'
export const USER_LOCATED = 'USER_LOCATED'
export const USER_ERROR = 'USER_ERROR'
export const USER_NEARBY_STATIONS = 'USER_NEARBY_STATIONS'

export const setNearbyStations = (rad) => (dispatch, getState) => {
	const { lat, lon } = getState().user.location
	const stations = getNearbyStations(lat, lon, rad)
	dispatch({
		type: USER_NEARBY_STATIONS,
		stations
	})
}
const getNearbyStations = (lat, lon, rad) => {
	let x, y, dist
	const dists = new Set()
	let _stations = []
	for (let key in STATIONS) {
		let stopLat = parseFloat(STATIONS[key].stop_lat)
		let stopLon = parseFloat(STATIONS[key].stop_lon)
		//constants are rough estimates of miles per degree of lat/lon for NYC
		x = diff(lat, stopLat) * 69.05
		y = diff(lon, stopLon) * 52.35
		dist = getEuclideanDist(x, y)
		//removing N/S stations, same info as parent station
		if (dist < rad
			&& key.split('').slice(-1)[0] !== 'N'
			&& key.split('').slice(-1)[0] !== 'S') {

			STATIONS[key].dist = dist
			_stations.push(STATIONS[key])
			dists.add(dist)
		}
	}
	_stations.sort((a, b) => {
		return a.dist - b.dist;
	})
	return _stations
}
const userLocate = () => {
	return {
		type: USER_LOCATE
	}
}

const userLocated = (lat, lon) => {
	return {
		type: USER_LOCATED,
		lat,
		lon
	}
}

const locateError = (error) => {
	return {
		type: USER_ERROR,
		error: {
			locationError: error
		}
	}
}
export const locateUser = () => dispatch => {
	dispatch(userLocate())
	if (!navigator.geolocation) {
		dispatch(locateError(new Error('Browser does not support location services.')))
	}
	let geo = navigator.geolocation;
	geo.getCurrentPosition(
		pos => dispatch(userLocated(pos.coords.latitude, pos.coords.longitude)),
		err => dispatch(locateError(err))
	)
	
}
const userRequest = () => {
	return {
		type: USER_REQUEST,
	}
}

const userReceive = (user) => {
	return {
		type: USER_RECEIVE,
		username: user.username,
		favoriteStations: user.data.favorite_stations
	}
}

const userDenied = () => {
	return {
		type: USER_DENIED
	}
}


export const userToggleFavorite = (id) => (dispatch, getState) => {
	const stationObj = STATIONS[id]
	const fav = getState().user.favoriteStations
	let data
	if (fav.some(s => s.stop_id === id)) {
		//remove from favorites
		data = {
			favorite_stations: fav.filter(s => s.stop_id !== id)
		}
	} else {
		//add to favorites
		data = {
			favorite_stations: [...getState().user.favoriteStations, stationObj]
		}
	}
	dispatch(userUpdateData(data))
}
export const userAddFavorite = (station) => (dispatch, getState) => {

	const stationObj = STATIONS[station]
	const data = {
		favorite_stations: [...getState().user.favoriteStations, stationObj]
	}
	dispatch(userUpdateData(data))
}
export const userRemoveFavorite = (station) => (dispatch, getState) => {

	const data = {
		favorite_stations: getState().user.favoriteStations.filter(s => s.stop_id !== station.stop_id)
	}
	dispatch(userUpdateData(data))
}
export const userLogout = () => {
	deleteCookie()
	return {
		type: USER_LOGOUT
	}
}

export const userLogin = ({ email, password }) => dispatch => {
	axios.post('/api/user/login', { email, password })
		.then(
			res => {
				setCookie(res.data.token)
				dispatch(fetchUserIfNeeded())
			},
			err => console.log('invalid creds') || dispatch(userDenied())
		)
}

export const fetchUserIfNeeded = () => (dispatch, getState) => {
	if (shouldUserFetch(getState())) {
		dispatch(userFetch())
	}
}

const userFetch = () => dispatch => {
	dispatch(userRequest())
	axios.get('/api/user/data')
		.then(
			res => dispatch(userReceive(res.data)),
			err => dispatch(userDenied())
		)
}
const userUpdateData = (data) => (dispatch, getState) => {
	if (shouldUserPost(getState())) {
		dispatch(userRequest())
		dispatch(userPostData(data))
	}
}
const userPostData = (data) => dispatch => {
	axios.post('/api/user/update', data)
		.then(res => {
			if (res.status !== 200) {
				//TODO
				console.log('something went wrong with posting data')
			}
			dispatch(userReceive(res.data))
		})
}

const shouldUserFetch = (state) => {
	const userIsFetching = state.user.userIsFetching
	if (userIsFetching) {
		return false
	}
	return true
}

const shouldUserPost = (state) => {
	const userIsFetching = state.user.userIsFetching
	if (userIsFetching) {
		return false
	}
	return true
}

const setCookie = (token) => {
	Cookies.set('token', token)
}

const deleteCookie = () => {
	Cookies.remove('token')
}
