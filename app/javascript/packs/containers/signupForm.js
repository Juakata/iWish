import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      repeat: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, repeat } = this.state;
    axios.get(`v1/signup?email=${email}&password=${password}&repeat=${repeat}`)
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
    const { email, password, repeat } = this.state;
    const equal = password === repeat;
    return (
      <form className="sign-up-form" onSubmit={this.handleSubmit}>
        <img src={Logo} alt="logo" className="logo" />
        <i className="fas fa-envelope" />
        <i className="fas fa-lock" />
        <i className="fas fa-lock repeat" />
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

        <input
          type="password"
          name="repeat"
          value={repeat}
          placeholder="Repeat password"
          onChange={this.handleChange}
          required
        />
        {equal ? '' : <div className="invalid">Passwords do not match.</div>}
        <button type="submit">Sign Up</button>
        <Link className="link" to="/">Already have an account?</Link>
      </form>
    );
  }
}

export default connect(null, null)(SignupForm);
