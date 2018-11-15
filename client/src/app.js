import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


//components
import PrivateRoute from './components/reusable/private_route.js';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Transit from './components/transit';
import Login from './components/login';
import Register from './components/register';
import NavBar from './components/nav_bar';

//redux 

import { connect } from 'react-redux';
//actions
import { userAuth } from '../actions/user_actions';

//css
import '../scss/base.scss';

class App extends React.Component {
  componentDidMount() {
    this.props.userAuth()
  }
  render() {
    return (
      <Router>
        <div className="container">
          <NavBar />
          <hr></hr>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/transit" exact component={Transit} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>

        </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(
  mapStateToProps,
  {
    userAuth
  }
)(App);


