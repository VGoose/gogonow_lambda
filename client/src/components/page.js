import React from 'react';
import TopBar from './top_bar';


const Page = ({ children, pageName }) => {
  return (
    <div className="page-container">
      <TopBar page={pageName} />
      <hr></hr>
      {children}
      {/* <div className="dashboard-content bg-light">
        <div className="dashboard-transit list-group-flush bg-light">
        {stationButtons}
        </div>
      </div> */}
    </div>
  )
}



export default Page


