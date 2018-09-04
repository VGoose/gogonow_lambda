import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryChart } from 'victory';

import { getStopsData, getUserPosition } from './utils/helpers';

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
    this.loadData();
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
  loadData = async () => {
    try {
      let data = await getStopsData();
      this.setState({ data })
    } catch(error) {
      console.log(error);
    }
  }
  render() {
    let { latitude, longitude, data} = this.state;
    if(!data) {
      return <p>Loading..</p>
    }
    return(
      <VictoryChart data={data} ></VictoryChart>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
