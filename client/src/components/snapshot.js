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
    return <p>{icon}</p>
}
const PrecipProb = ({ precipProb }) => {
    if (precipProb === 0) {
        return null
    } else {
        return (
            <p>{`${Math.round(precipProb * 100)} %`}</p>
        )
    }
}
const Temp = ({temp}) => {
    return <p>{`${temp}`}</p>
}
const Time = ({time}) => {
    const hour = time.getHours()
    let disp
    if(hour > 12) {
        disp = `${hour - 12} PM`
    }else if(hour === 0) {
        disp = '12 AM'
    }else if(hour === 12){
        disp = '12 PM'
    }else {
        disp = `${hour} AM`
    }
    return <p>{disp}</p>
}
const Snapshot = ({ time, precipProb, iconCode, temp }) => {
    return (
        <div className="weather-snapshot d-inline-block">
            <div className="weather-snapshot-time d-block"><Time time={time}/></div>
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