import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../scss/base.scss';

const NavItem = ({ path, name }) => {
  return (
    <NavLink
      className="navbar__button"
      activeClassName="navbar__button--selected"
      exact 
      to={path}>
      {name}
    </NavLink>
  )
}

const NavBar = () => {
  return (
    <div className="navbar">
      <NavItem path="/" name="Home" />
      <NavItem path="/transit" name="Transit" />
      <NavItem path="/weather" name="Weather" />
    </div>
  )
}

export default NavBar;