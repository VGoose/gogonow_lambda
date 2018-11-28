import { connect } from 'react-redux'

import DashboardPage from '../components/dashboard_page'

import { userToggleFavorite, fetchUserIfNeeded } from '../actions/user_actions'
import { fetchScheduleIfNeeded } from '../actions/schedule_actions'
import { fetchWeatherIfNeeded } from '../actions/weather_actions'

const mapStateToProps = (state) => {
  return {
    favoriteStations: state.user.favoriteStations,
    userIsFetching: state.user.isFetching,
    userError: state.user.error,

    schedule: state.schedule.schedule,
    scheduleIsFetching: state.schedule.isFetching,
    scheduleError: state.schedule.error,

    currentForecast: state.weather.currentForecast,
    hourlyForecast: state.weather.hourlyForecast,
    //TODO give user toggle ability
    isF: state.weather.isF,
    weatherError: state.weather.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleFavorite: id => dispatch(userToggleFavorite(id)),
    fetchUser: fetchUserIfNeeded(),

    fetchSchedule: fetchScheduleIfNeeded(),

    fetchWeather: fetchWeatherIfNeeded(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage)