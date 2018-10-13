import {
	GET_SCHEDULES,
	SCHEDULE_LOADING,
} from '../actions/types';

const initialState = {
	schedules: {},
	loading: false
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_SCHEDULES:
			return {
				...state,
				schedules: action.payload,
				loading: false
			}
		case SCHEDULE_LOADING:
			return {
				...state,
				loading: true
			}
		default:
			return state;
	}
}