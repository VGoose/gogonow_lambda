import {
    GET_USERS,
    UPDATE_USERS,
    DELETE_USER,
    ADD_USERS,
    USERS_LOADING
} from '../actions/types';

const initialState = {
    users: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case ADD_USERS:
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            }
        case UPDATE_USERS:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user._id === action.payload._id) {
                        return action.payload;
                    }
                })
            }
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}