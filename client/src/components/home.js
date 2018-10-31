import React from 'react';

import TopBar from './top_bar';
import '../../scss/base.scss';

const Home = () => {
  return (
    <div className="home-container">
      <TopBar page="Home" />
      <hr></hr>
      <div className="home__content">
      </div>
    </div>
  )
}

export default Home

