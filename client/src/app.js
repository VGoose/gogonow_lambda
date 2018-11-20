import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


import TransitContainer from './containers/transit_container';
import DashboardContainer from './containers/dashboard_container';

import PrivateRoute from './components/reusable/private_route.js';

//components
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import NavBar from './components/nav_bar';

//redux 
import store from '../store';
import { connect } from 'react-redux';
//actions
import { fetchUserIfNeeded, locateUser, set } from './actions/user_actions';
import { fetchScheduleIfNeeded } from './actions/schedule_actions';

//css
import '../scss/base.scss';
import { setNearbyStations } from './actions/user_actions';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUserIfNeeded())
    this.props.dispatch(fetchScheduleIfNeeded())
    this.props.dispatch(locateUser())

    store.subscribe(() => {
      if (store.getState().user.location && !store.getState().user.nearbyStations) {
        store.dispatch(setNearbyStations(0.5))
      }
    })

  }
  render() {
    return (
      <Router>
        <div className="container">
          <NavBar />
          <hr></hr>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/transit" exact component={TransitContainer} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={DashboardContainer} />
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
  null, 
)(App);


