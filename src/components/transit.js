import React from 'react';
import ReactDOM from 'react-dom';

import { getStations } from '../helpers';

class Transit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: undefined,
    }
  }
  componentDidMount(){
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
  
  render() {
    let { stations } = this.state;

    if(!stations) {
      return <p>Loading..</p>
    }
    let stationItems = stations.map(station => {
      return <li><button>{station.stop_name}</button></li>
    })
    return(
      <div>
        <ul>
          {stationItems}
        </ul>
      </div>
    )

  }
}

export default Transit;
