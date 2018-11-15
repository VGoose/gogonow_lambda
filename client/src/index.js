import React from 'react';
import ReactDOM from 'react-dom';

//redux
import { Provider } from 'react-redux';
import store from '../store';

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
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}


ReactDOM.render(<Index />, document.getElementById('root'));




