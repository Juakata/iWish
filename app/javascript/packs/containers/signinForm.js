import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    axios.get(`v1/signin?email=${email}&password=${password}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => console.log(error));
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <form className="sign-in-form" onSubmit={this.handleSubmit}>
        <img src={Logo} alt="logo" className="logo" />
        <i className="fas fa-envelope" />
        <i className="fas fa-lock" />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={this.handleChange}
          required
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={this.handleChange}
          required
        />
        <button type="submit">Sign In</button>
        <Link className="link" to="/signup">Or create a new account!</Link>
      </form>
    );
  }
}

export default withRouter(connect(null, null)(SigninForm));
