import React from 'react';
import ReactDOM from 'react-dom';

import Transit from './components/transit';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Transit />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
