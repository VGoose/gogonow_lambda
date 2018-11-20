import React from 'react';
import TopBar from './top_bar';
import CountdownClock from './countdown_clock';


const DashboardPage = ({
  favoriteStations = [],
  userIsFetching,
  schedule,
  scheduleIsFetching,
  scheduleError,
  fetchSchedule,
  fetchUser,

  toggleFavorite }) => {
  let northSchedule, southSchedule
  const stationButtons = favoriteStations.map(station => {
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
      name={station.stop_name}
    />
  })
  return (
    <div className="dashboard-container">
      <TopBar page="Dashboard" />
      <hr></hr>
    
      <div className="dashboard-content bg-light">
        <div className="dashboard-transit list-group-flush bg-light">
        {stationButtons}
        </div>
      </div>
    </div>
  )
}



export default DashboardPage


