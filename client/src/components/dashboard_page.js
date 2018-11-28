import React from 'react'

import Page from './page'
import TopBar from './top_bar'
import CountdownClock from './countdown_clock'
import WeatherModule from './weather_module'

const DashboardPage = ({
  //user props
  favoriteStations = [],
  userIsFetching,
  fetchUser,
  toggleFavorite,
  //schedule props
  schedule,
  scheduleIsFetching,
  scheduleError,
  fetchSchedule,
  //weather props
  isF,
  currentForecast,
  hourlyForecast,
  weatherError,
  fetchWeather,
}) => {

  let northSchedule, southSchedule
  const stations = favoriteStations.map(station => {
    //keys in schedules are stop_id + N/S
    northSchedule = station.stop_id + 'N' in schedule ? schedule[station.stop_id + 'N'] : [];
    southSchedule = station.stop_id + 'S' in schedule ? schedule[station.stop_id + 'S'] : [];
    return <CountdownClock
      key={station.stop_id}
      id={station.stop_id}
      favorite={toggleFavorite}
      schedules={[
        ...northSchedule,
        ...southSchedule
      ]}
      isFav={true}
      name={station.stop_name}
    />
  })
  return (
    <Page pageName="dashboard">
      <div className="dashboard-content bg-light">
        <div className="dashboard-transit list-group-flush bg-light">
          {stations}
          <WeatherModule
            //TODO: use apparent temperature, too
            isF={isF}
            hourlyForecast={hourlyForecast}
          />
        </div>
      </div>
    </Page>
  )
}



export default DashboardPage


