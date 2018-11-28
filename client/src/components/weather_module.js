import React from 'react'
import Snapshot from './snapshot'

const SnapshotList = ({data}) => {
    const { hourlyForecast } = data
    const snapshots = hourlyForecast.map(f => {
        let time = new Date(f.time) //TODO convert to hour
        return <Snapshot 
            time={time}
            precipProb={f.precipProbability}
            iconCode={f.icon}
            temp={f.temperature}
        />
    })
    return (
        <div className="weather-snapshotlist">
            {snapshots}
        </div>
    )
}
const Bar = ({ isF }) => {
    return <div className="weather-weatherblock-bar">{isF ? 'F' &deg : 'C' &deg } Powered By Dark Sky</div>
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