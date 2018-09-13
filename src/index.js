import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

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
    axios.get('http://localhost:5000/api/user')
      .then(res => {
        this.setState({ users: res.data})
      })
      .catch(err => console.log(err))
  }
  render() {
    let { users } = this.state;
    let userNames = users.map((user) => {
      return <li key={user._id}>{user.name}</li>
    })
    return(
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/adduser">Add User</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
          <ul>
            {userNames}
          </ul>
          <Route exact path="/" component={Transit} />
          <Route path="/adduser" component={AddUser} />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


const Topics = () => (
  <div>
    <h2>Topics</h2>
  </div>
);


