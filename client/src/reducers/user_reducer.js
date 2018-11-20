import {
    USER_REQUEST,
    USER_RECEIVE,
    USER_DENIED,
    USER_LOGOUT,
    USER_ERROR,
    USER_LOCATE,
    USER_LOCATED,
    USER_NEARBY_STATIONS,
} from '../actions/user_actions';

const initialState = {
    location: null,
    isLocating: false,
    nearbyStations: null,
    error: null,
    isAuth: false,
    isFetching: false,
    username: '',
    favoriteStations: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_NEARBY_STATIONS:
            return {
                ...state,
                nearbyStations: action.stations
            }
        case USER_LOCATE:
            return {
                ...state,
                isLocating: true
            }
        case USER_LOCATED:
            return {
                ...state,
                isLocating: false,
                location: {
                    lat: action.lat,
                    lon: action.lon
                } 
            }
            case USER_ERROR: 
            return {
                ...state,
                error: {
                    ...state.user.error,
                    ...action.error
                }
            }
        case USER_DENIED:
            return {
                ...state,
                isAuth: false,
                userIsFetching: false
            }
        case USER_REQUEST:
            return {
                ...state,
                userIsFetching: true
            }
        case USER_RECEIVE:
            return {
                ...state,
                userIsFetching: false,
                isAuth: true,
                username: action.username,
                favoriteStations: action.favoriteStations,
            }

        case USER_LOGOUT:
            return {
                isAuth: false,
                userIsFetching: false,
                favoriteStations: [],
            }
        default:
            return state;
    }
}