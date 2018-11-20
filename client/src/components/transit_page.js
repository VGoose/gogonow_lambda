import React from 'react';

//components
import TopBar from './top_bar';
import CountdownClock from './countdown_clock';

const TransitPage = ({ userFavoriteStations, toggleFavorite, userStations, schedule, scheduleIsFetching, scheduleError }) => {
  let northSchedule, southSchedule, isFav = false
  let nearbyStations = (userStations && !scheduleIsFetching) ?
    userStations.map((station) => {
      //keys in schedules are stop_id + N/S
      northSchedule = station.stop_id + 'N' in schedule ? schedule[station.stop_id + 'N'] : [];
      southSchedule = station.stop_id + 'S' in schedule ? schedule[station.stop_id + 'S'] : [];
      return (
        <CountdownClock
          key={station.stop_id}
          id={station.stop_id}
          favorite={toggleFavorite}
          schedules={[
            ...northSchedule,
            ...southSchedule
          ]}
          name={station.stop_name}
          isFav={userFavoriteStations.some(s => s.stop_id === station.stop_id)}
        />
      )
    }) : 'Loading...';

  return (
    <div className="transit-container">
      <TopBar page="Transit" />
      <hr></hr>
      <div className="transit-content bg-light">
        <div className="transit-clocklist list-group-flush bg-light">
          {nearbyStations}
        </div>
      </div>
    </div>
  )

}


export default TransitPage

