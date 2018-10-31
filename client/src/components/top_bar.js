import React from 'react';

import Time from './reusable/time';

const TopBar = ({ page }) => {
  return (
    <div className="row justify-content-between align-items-center top-bar">
      <h1 className="col-4" >{page} </h1>
      <Time>
        {({ getTimeHHMM, time, day }) => (
          <div className="col-4 ">
            <div className="d-block text-nowrap text-right">
              <h2><time>{getTimeHHMM()}</time></h2>
            </div>
            <div className="text-right">
              <div className="d-inline">{day + ' '}</div>
              <div className="d-inline">{time.getDate()}</div>
            </div>
          </div>
        )}
      </Time>
    </div>
  )
}

export default TopBar;