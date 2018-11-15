import React from 'react';
import { connect } from 'react-redux';
import TopBar from './top_bar';
import CountdownClock from './countdown_clock';

import { userAddStation, userRemoveStation, userGetData } from "../../actions/user_actions";
import { schedulesGet } from '../../actions/schedule_actions';

/*
  To do: use userData.favorite_stations [] to filter schedules,
  
  display countdownclock for each station
*/
const Dashboard = ({ userData, schedules, userGetData, userIsLoading }) => {
  const stations = userData.favorite_stations || [];
  let northSchedule, southSchedule;
  const stationButtons = stations.map(station => {
    //keys in schedules are stop_id + N/S
    northSchedule = station.stop_id + 'N' in schedules ? schedules[station.stop_id + 'N'] : [];
    southSchedule = station.stop_id + 'S' in schedules ? schedules[station.stop_id + 'S'] : [];
    <CountdownClock
      key={station.stop_id}
      id={station.stop_id}
      favorite={this.addToFavorites}
      schedules={[
        ...northSchedule,
        ...southSchedule
      ]}
      name={station.stop_name}
    />})
  userGetData();
  return (
    <div className="dashboard-container">
      <TopBar page="Dashboard" />
      <hr></hr>
      <div className="dashboard-content">
        <div className="dashboard-transit">
          {stationButtons}
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    userData: state.users.data,
    userIsLoading: state.users.isLoading,
    schedules: state.schedules.schedules,
    schedulesLoading: state.schedules.loading,
  }
}


export default connect(
  mapStateToProps,
  {
    userAddStation,
    userRemoveStation,
    userGetData,
    schedulesGet,
  }
)(Dashboard);


