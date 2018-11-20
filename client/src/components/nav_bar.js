import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../scss/base.scss';

const NavItem = ({ path, name }) => {
  return (
    <NavLink
      className="text-muted navbar__button"
      activeClassName="navbar__button--selected"
      exact 
      to={path}>
      {name}
    </NavLink>
  )
}

const NavBar = ({isAuth}) => {
  if (isAuth) {
    return (
      <div className="navbar bg-light">
        <NavItem path="/" name="Home" />
        <NavItem path="/dashboard" name="Dashboard" />
        <NavItem path="/transit" name="Transit" />
        <NavItem path="/weather" name="Weather" />
       
        <button /**TODO */>Logout</button>
      </div> 
    )
  }
  return (
    <div className="navbar bg-light">
      <NavItem path="/" name="Home" />
      <NavItem path="/transit" name="Transit" />
      <NavItem path="/weather" name="Weather" />
      <NavItem path="/login" name="Login" />
    </div>
  )
}

export default NavBar;