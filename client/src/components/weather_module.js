import React from 'react'
import Snapshot from './snapshot'

const SnapshotList = ({data}) => {
    const { hourlyForecast } = data
    const snapshots = hourlyForecast.map(f => {
        let time = new Date(f.time * 1000) //TODO convert to hour
        return <Snapshot 
            key={time}
            time={time}
            precipProb={f.precipProbability}
            iconCode={f.icon}
            temp={f.temperature}
        />
    })
    return (
        <div className="weather-snapshotlist d-flex flex-nowrap">
            {snapshots}
        </div>
    )
}
const Bar = ({ isF }) => {
    return <div className="weather-weatherblock-bar">{isF ? 'F'  : 'C'  } Powered By Dark Sky</div>
}
const WeatherModule = ({ isF, ...rest}) => {
    return(
        <div className="weather-weatherblock">
            <Bar isF={isF} />
            <SnapshotList data={rest} />
        </div>
    )
}

export default WeatherModule