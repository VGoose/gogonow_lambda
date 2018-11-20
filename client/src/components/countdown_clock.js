import React from 'react';

import Toggle from './reusable/toggle';
import Time from './reusable/time';

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
    <div  style={{ backgroundColor: hue, color: 'white' }} className="countdownclock__badge align-items-center">{train}</div>
  )
}

const Row = ({ schedule, index }) => {
  return (
    <Time>
      {({ time }) => {
        let seconds = Math.floor((new Date(schedule.time) - time) / 1000);
        let minutes = Math.floor(seconds / 60);
        let countdown = seconds > 60 ? minutes : seconds > 30 ? seconds : 'now';
        return (
          <div
            className="countdownclock__row list-group-item"
            style={{ backgroundColor: index % 2 == 1 ? '#D5D9DA' : '#FFFFFF' }}
          >
            <div className="countdownclock__train"><Badge train={schedule.train} /></div>
            <div className="countdownclock__headsign">{schedule.headsign}</div>
            <div className="countdownclock__time">{countdown} {seconds > 60 ? 'min' : Number.isInteger(seconds) && seconds > 30 ? 'sec' : null}</div>
          </div>)
      }}
    </Time>
  )
}

const CountdownClock = ({ name, schedules, favorite, id }) => {
  let badges = STATIONS[id].trains
    .map(train => <Badge key={train} train={train} />)
  return (
    <Toggle>
      {({ show, toggle }) =>
        <Time>
          {({ time }) => {
            let rows = schedules
              .filter(schedule => new Date(schedule.time) - time > 0)
              .sort((a, b) => new Date(a.time) - new Date(b.time))
              .map((schedule, index) => (
                <Row key={schedule.train + schedule.direction + schedule.time} schedule={schedule} index={index} />
              ))
            return (
              <div className="countdownclock-container list-group-item mb-2 p-1">
                <div className="countdownclock__bar d-flex align-items-center">
                  <div className="countdownclock__name flex-grow-1" onClick={toggle}>{name}</div>
                  <div className="countdownclock__badges d-flex">
                    {badges}
                  </div>
                  <div className="countdownclock__star">
                    <Star favorite={favorite} id={id} />
                  </div>
                </div>
                {show ? <div className="countdownclock__toggle list-group">
                  {rows.slice(0, 3)}
                </div> : null}
              </div>)
          }}
        </Time>
      }
    </Toggle>

  )
}

export default CountdownClock;
