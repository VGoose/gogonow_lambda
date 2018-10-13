import React from 'react';

import Toggle from './reusable/toggle';

const Star = () => {
  return (
    <p>STAR</p>
  )
}

const TransitStation = ({ name, times, direction, favorite }) => {
  this.badges = [1, 2, 3];
  return (
    <div className="transitstation">
      <Toggle>
        {({ show, toggle }) => {
          <div className="transitstation__bar">
            <h1>{name}</h1>
            <Badge/>
            <Star />
          </div>
        }}
      </Toggle>

    </div>
  )
}

export default TransitStation;