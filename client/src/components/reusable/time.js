import React from 'react';

export default class Time extends React.Component {
  state = {
    time: new Date()
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ time: new Date() })
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

    let day;
    switch (time.getDay()) {
      case 0: day = 'Sunday'; break;
      case 1: day = 'Monday'; break;
      case 2: day = 'Tuesday'; break;
      case 3: day = 'Wednesday'; break;
      case 4: day = 'Thursday'; break;
      case 5: day = 'Friday'; break;
      case 6: day = 'Saturday'; break;
      default: day = null;
    }

    return (
      children({ time, day, getTimeHHMM, getTimeHHMMMilitary, })
    )
  }
}