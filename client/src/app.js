import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Provider } from 'react-redux';
import store from '../store';

import Home from './components/home';
import Transit from './components/transit';
import NavBar from './components/nav-bar';
import AddUser from './components/add_user';

import '../scss/base.scss';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <Router>
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/transit" exact component={Transit} />
            </Switch>
            <NavBar />
          </div>
        </Router>
      </Provider>
    )
  }
}







