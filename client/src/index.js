import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Provider } from 'react-redux';
import store from '../store';

import Transit from './components/transit';
import AddUser from './components/add_user';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount() {

  }
  render() {
    let { users } = this.state;
    let userNames = users.map((user) => {
      return <li key={user._id}>{user.name}</li>
    })
    return (
      <Provider store={store} >
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/adduser">Add User</Link>
              </li>
            </ul>
            <ul>
              {userNames}
            </ul>
            <Route exact path="/" component={Transit} />
            <Route path="/adduser" component={AddUser} />
          </div>
        </Router>
      </Provider>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));




