import {
    USER_UPDATE,
    USER_LOADING,
    USER_GET_DATA,
    USER_AUTH,
} from '../actions/types';

const initialState = {
    isAuth: false,
    data: {},
    isLoading: false, 
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_AUTH:
            return {
                ...state,
                isAuth: action.payload,
                isLoading: false
            }
        case USER_GET_DATA:
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        case USER_UPDATE:
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state;
    }
}