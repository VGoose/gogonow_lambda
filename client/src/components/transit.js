import React from 'react';

import { connect } from 'react-redux';
import { getUsers, setUsersLoading } from '../../actions/user_actions';
import { getSchedules } from '../../actions/schedule_actions';

import { getStations } from '../helpers';

//components
import Toggle from './reusable/toggle';
import TopBar from './top_bar';
import CountdownClock from './countdown_clock';

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
    // console.log(this.props.schedules[id + 'N'])
  }
  addToFavorites = (id) => {
    console.log('favorited' + id)
  }
  render() {
    const { stations } = this.state;
    let stationButtons = stations && !this.props.schedulesLoading ?
      stations.map((station) => {
        return (
          <CountdownClock
            key={station.stop_id}
            id={station.stop_id}
            favorite={this.addToFavorites}
            schedules={[
              //schedule keys are stop_id + N/S for north/south
              ...this.props.schedules[station.stop_id + 'N'],
              ...this.props.schedules[station.stop_id + 'S']
            ]}
            name={station.stop_name}
          />
        )
      }) : 'Loading...';

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
    schedules: state.schedules.schedules,
    schedulesLoading: state.schedules.loading,
  }
}

export default connect(
  mapStateToProps,
  {
    getUsers,
    getSchedules
  }
)(Transit);
