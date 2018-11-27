import React from 'react'

const WeatherIcon = (iconCode) => {
    let icon
    switch (iconCode) {
        case 'clear-day':
        case 'clear-night':
        case 'rain':
        case 'snow':
        case 'sleet':
        case 'wind':
        case 'fog':
        case 'cloudy':
        case 'partly-cloudy-day':
        case 'partly-cloudy-night':
        default: icon = 'TODO'
    }
}
const PrecipProb = ({ precipProb }) => {
    if (precipeProb === 0) {
        return null
    } else {
        return (
            <text>{`${precipProb * 100} %`}</text>
        )
    }
}
const Temp = ({temp}) => {
    return <text>{`${temp}` &deg}</text>
}
const Snapshot = ({ time, precipProb, iconCode, temp }) => {
    return (
        <div className="weather-snapshot d-inline-block">
            <div className="weather-snapshot-time d-block">{time}</div>
            <div className="weather-snapshot-precipProb d-block">
                <PrecipProb precipProb={precipProb} />
            </div>
            <div className="weather-snapshot-icon d-block">
                <WeatherIcon iconCode={iconCode} />
            </div>
            <div className="weather-snapshot-temp"><Temp temp={temp}/></div>
        </div>
    )
}

export default Snapshot