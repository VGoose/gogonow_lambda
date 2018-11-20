import {
	SCHEDULE_REQUEST,
	SCHEDULE_RECEIVE,
	SCHEDULE_DENY
} from '../actions/schedule_actions'

const initialState = {
	isFetching: false,
	schedule: {},
	lastUpdated: null,
	error: null,
}

export default function (state = initialState, action) {
	switch (action.type) {
		case SCHEDULE_REQUEST:
			return {
				...state,
				isFetching: true
			}
		case SCHEDULE_RECEIVE:
			return {
				...state,
				schedule: action.data,
				lastUpdated: action.lastUpdated,
				error: null,
				isFetching: false
			}
		case SCHEDULE_DENY:
			return {
				...state,
				error: action.err,
				isFetching: false
			}
		default:
			return state;
	}
}