import React from 'react';

import Toggle from './reusable/toggle';

import STATIONS from '../stations.json';

import '../../scss/base.scss';

const Star = ({ favorite, id }) => {
  return (
    <button onClick={() => favorite(id)}><img src="../../assets/BlackStar.png" /></button>
  )
}

const Badge = ({ train }) => {
  let hue;
  switch (train) {
    case '1': case '2': case '3':
      hue = '#EE352E';
      break;
    case '4': case '5': case '6':
      hue = '#00933C';
      break;
    case '7':
      hue = '#B933AD';
      break;
    case 'B': case 'D': case 'F': case 'M':
      hue = '#FF6319';
      break;
    case 'A': case 'C': case 'E':
      hue = '#006699';
      break;
    case 'G':
      hue = '#6CBE45';
      break;
    case 'J': case 'Z':
      hue = '#996633';
      break;
    case 'L':
      hue = '#A7A9AC';
      break;
    case 'N': case 'Q': case 'R': case 'W':
      hue = '#FCCC0A';
      break;
    default: hue = 'black';
  }
  return (
    <div className="countdownclock__badge" style={{ backgroundColor: hue, color: 'white' }}>{train}</div>
  )
}

const Row = ({ schedule, index }) => {
  let seconds = Math.floor((new Date(schedule.time) - new Date())/1000) ;
  let minutes = (seconds / 60) > 1 ? Math.floor(seconds / 60) : 'Now'

  return (
    <div
      className="countdownclock__row"
      style={{ backgroundColor: index % 2 == 0 ? '#F5F9FA' : '#FFFFFFF' }}
    >
      <div className="countdownclock__train"><Badge train={schedule.train} /></div>
      <div className="countdownclock__headsign">{schedule.headsign}</div>
      <div className="countdownclock__time">{minutes} {minutes == 'Now' ? null : 'min'}</div>
    </div>
  )
}

const CountdownClock = ({ name, schedules, favorite, id }) => {
  let rows = schedules
    .sort((a, b) => new Date(a.time) - new Date(b.time))
    .map((schedule, index) => index < 3 && (new Date(schedule.time) - new Date()) > 0 ? 
      <Row key={schedule.train + schedule.direction + schedule.time} schedule={schedule} index={index} />
      : null
      )
  let badges = STATIONS[id].trains
    .map(train => <Badge key={train} train={train} />)
  return (
    <Toggle>
      {({ show, toggle }) =>
        <div className="countdownclock-container">
          <div className="countdownclock__bar">
            <div className="countdownclock__name" onClick={toggle}>{name}</div>
            <div className="countdownclock__badges">
              {badges}
            </div>
            <div className="countdownclock__star">
              <Star favorite={favorite} id={id} />
            </div>
          </div>
          {show ? <div className="countdownclock__toggle">
            {rows}
          </div> : null}
        </div>
      }
    </Toggle>

  )
}

export default CountdownClock;
