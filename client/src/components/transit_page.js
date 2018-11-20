import React from 'react';

//components
import TopBar from './top_bar';
import CountdownClock from './countdown_clock';

const TransitPage = ({ toggleFavorite, userStations, schedule, scheduleIsFetching, scheduleError }) => {
  let northSchedule, southSchedule;
  let stationButtons = (userStations && !scheduleIsFetching) ?
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
        />
      )
    }) : 'Loading...';

  return (
    <div className="transit-container">
      <TopBar page="Transit" />
      <hr></hr>
      <div className="transit-content">
        <div className="transit-clocklist list-group">
          {stationButtons}
        </div>
      </div>
    </div>
  )

}


export default TransitPage


