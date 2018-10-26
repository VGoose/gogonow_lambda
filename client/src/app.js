import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Provider } from 'react-redux';
import store from '../store';

import Home from './components/home';
import Transit from './components/transit';
import Login from './components/login';
import Register from './components/register';

import NavBar from './components/nav_bar';

import '../scss/base.scss';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <Router>
          <div className="container">
          <NavBar />
          <hr></hr>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/transit" exact component={Transit} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
            
          </div>
        </Router>
      </Provider>
    )
  }
}







