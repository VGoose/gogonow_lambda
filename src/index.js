import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryChart } from 'victory';

import {getUserPosition} from './utils/helpers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      data: undefined,
    }
  }
  componentDidMount(){
    navigator.geolocation ? 
      this.loadPosition() : alert('Your browser does not have geolocation');
  }
  loadPosition = async function loadPosition() {
    try {
      let position = await getUserPosition();
      let { latitude, longitude } = position.coords;
      this.setState({ latitude, longitude  })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { latitude, longitude} = this.state;
    if(!latitude) {
      return <p>Loading..</p>
    }
    return(
      <div>Lat: {latitude}, Long: {longitude}</div>
    )

  }
}

ReactDOM.render(<App />, document.getElementById('root'));
