import React from 'react';

import Time from './reusable/time';

const TopBar = ({ page }) => {
  const t = `${page} + `
  return (
    <div className="top-bar d-flex justify-content-between align-items-center bg-light">
      <h1 className="d-flex" >{page} </h1>
      <Time>
        {({ getTimeHHMM, time, day }) => (
          <div className="d-flex">
            {/* <div className="">
              <time>{getTimeHHMM()}</time>
            </div> */}
            <div className="">
              <div className="">{`${getTimeHHMM()} ${day} ${time.getDate()}`}</div>

            </div>
          </div>
        )}
      </Time>
    </div>
  )
}

export default TopBar;