import React from 'react';


export default class Toggle extends React.Component {
  state = {
    show: false,
  }

  toggle = () => {
    this.setState((prevState ) => { 
      return { show : !prevState.show }
    })
  }

  render() {
    const { children } = this.props;
    const { show } = this.state
    const { toggle } = this;
    return (
      <div>
        {children({ show, toggle })}
      </div>
    )
  }
}