import { connect } from 'react-redux'
import TransitPage from '../components/transit_page'

//actions
import { fetchScheduleIfNeeded } from '../actions/schedule_actions'
import { userToggleFavorite } from '../actions/user_actions'

const mapStateToProps = (state) => {
  return {
    //schedule states
    schedule: state.schedule.schedule,
    scheduleIsFetching: state.schedule.isFetching,
    scheduleError: state.schedule.error,
    //user states
    userStations: state.user.nearbyStations,
    userFavoriteStations: state.user.favoriteStations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSchedule: () => dispatch(fetchScheduleIfNeeded()),
    toggleFavorite: id => dispatch(userToggleFavorite(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransitPage)
