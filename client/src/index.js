import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount() {

  }
  render() {
    return (
      <App />
    )
  }
}


ReactDOM.render(<Index />, document.getElementById('root'));




