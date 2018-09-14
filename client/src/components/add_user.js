import React from 'react';
import axios from 'axios';

export default class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }
  onChange = (e) => {
    this.setState({name: e.target.value})
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name
    }

    axios.post('http://localhost:5000/api/user', newUser)
      .then(
        res => console.log(res.data)
      )
  }
  render() {
    let { name } = this.state;
    return(
      <div>
        <form>
          <label>
            Name:
          <input type="text" name="name" onChange={this.onChange} value={name}/>
          </label>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}