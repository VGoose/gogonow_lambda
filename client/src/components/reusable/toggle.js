import React from 'react';


export default class Toggle extends React.Component {
  state = {
    show: false,
  }

  toggle = () => {
    this.setState({ show: !show })
  }

  render() {
    const { children } = this.props;
    return children({
      show: this.state.show,
      toggle: this.toggle,
    })
  }
}