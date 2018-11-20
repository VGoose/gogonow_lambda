import { connect } from 'react-redux'

import Dashboard from '../components/dashboard'

import { userToggleFavorite, fetchUserIfNeeded } from '../actions/user_actions'
import { fetchScheduleIfNeeded } from '../actions/schedule_actions'

const mapStateToProps = (state) => {
  return {
    favoriteStations: state.user.favoriteStations,
    userIsFetching: state.user.isFetching,
    schedule: state.schedule.schedule,
    scheduleIsFetching: state.schedule.isFetching,
    scheduleError: state.schedule.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleFavorite: id => dispatch(userToggleFavorite(id)),
    fetchUser: fetchUserIfNeeded(),

    fetchSchedule: fetchScheduleIfNeeded(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)