import React from 'react';

import Time from './reusable/time';

const TopBar = ({ page }) => {
  return (
    <div className="top-bar">
      <h1>{page} </h1>
      <Time>
        {({ getTimeHHMM }) => (
          <h1><time>{getTimeHHMM()}</time></h1>
        )}
      </Time>
    </div>
  )
}

export default TopBar;