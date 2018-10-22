import React from 'react';

export default class Time extends React.Component {
  state = {
    time: new Date()
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ time: new Date()})
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  getTimeHHMM = () => {
    const { time } = this.state;
    const hour = (time.getHours() > 12) ? time.getHours() - 12 : time.getHours();
    const minute = (time.getMinutes() < 10) ? `0${time.getMinutes()}` : time.getMinutes();
    return `${hour} : ${minute}`
  }

  getTimeHHMMMilitary = () => {
    const { time } = this.state;
    const hour = time.getHours();
    const minute = (time.getMinutes() < 10) ? `0${time.getMinutes()}` : time.getMinutes();
    return `${hour} : ${minute}`
  }

  render() {
    const { time } = this.state;
    const { children } = this.props;
    const { getTimeHHMM, getTimeHHMMMilitary } = this;

    return (
      <div>
        {children({ time, getTimeHHMM, getTimeHHMMMilitary, })}
      </div>
    )
  }
}