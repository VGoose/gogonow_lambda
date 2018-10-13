import React from 'react';

import { connect } from 'react-redux';
import { getUsers, setUsersLoading } from '../../actions/user_actions';
import { getSchedules } from '../../actions/schedule_actions';

import { getStations } from '../helpers';

//components
import Toggle from './reusable/toggle';
import TopBar from './top_bar';
import TransitStation from './transit_station';

class Transit extends React.Component {
  state = {
    stations: null,
  }
  componentDidMount() {
    this.props.getSchedules();
    navigator.geolocation ?
      this.loadClosestStations() : alert('Your browser does not have geolocation');

  }
  loadClosestStations = async function loadClosestStations() {
    try {
      let stations = await getStations();
      this.setState({ stations })
    } catch (error) {
      console.log(error);
    }
  }

  getSchedule = (id) => {
    // console.log(this.props.schedule[id])
  }

  render() {
    const { stations } = this.state;
    if(!stations) {
      return (
        <div className="transit-container">
          <TopBar page="Transit" />
          <hr></hr>
        </div>
      ) 
    }
    let stationButtons = stations.map((station) => {
      return <button onClick={this.getSchedule(station.stop_id)}>{station.stop_name}</button>
    })

    return (
      <div className="transit-container">
        <TopBar page="Transit" />
        <hr></hr>
        <div>
          {stationButtons}
        </div>
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    user: state.users.users,
    userLoading: state.users.loading,
    schedule: state.schedules.schedules,
    loading: state.schedules.loading,
  }
}

export default connect(
  mapStateToProps,
  {
    getUsers,
    getSchedules
  }
)(Transit);
