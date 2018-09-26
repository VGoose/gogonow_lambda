import React from 'react';

import { connect } from 'react-redux';
import { getUsers, setUsersLoading } from '../../actions/user_actions';
import { getStationTimes } from '../../actions/station_actions';

import { getStations } from '../helpers';

class Transit extends React.Component {
  state = {
    stations: undefined,
    time: undefined,
    times: undefined,
  }
  componentDidMount(){
    this.props.getUsers();
    this.loadStationTimes();
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
  loadStationTimes = async () => {
    try {
      let times = await getStationTimes();
      this.setState({ times })
    } catch(error) {
      console.log(error);
    }
  }

  handleClick = (e) => {
    this.setState({ time: this.state.times[e.target.key]})
  }
  
  render() {
    const { stations } = this.state;
    const { users } = this.props.user;
    
    if (!stations) {
      return 'loading...'
    }
    let stationItems = stations.map(station => {
      return <li><button key={station.stop_name} onClick={this.handleClick}>{station.stop_name}</button></li>
    })
    let userItems = users.map(user => <li>{user.name}</li>)
    return(
      <div>
        <ul>
          {stationItems}
          {userItems}
        </ul>
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    user: state.users
  }
}

export default connect(
  mapStateToProps,
  { 
    getUsers,
    getStationTimes
  }
)(Transit);
